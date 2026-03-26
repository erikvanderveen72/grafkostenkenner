'use client';

import { useState, useMemo } from 'react';
import { MapPin, Filter, ArrowUpDown, Info, ChevronDown, ChevronUp } from 'lucide-react';
import {
  type Begraafplaats,
  type GrafType,
  formatCurrency,
  berekenTotaalKosten,
} from '@/lib/fallback-data';

interface GrafkostenVergelijkerProps {
  begraafplaatsen: Begraafplaats[];
  provincie: string;
}

const looptijdOpties = [20, 40, 60, 80];
const grafTypeOpties: { value: GrafType; label: string }[] = [
  { value: 'enkel', label: 'Enkel graf (1-laags)' },
  { value: 'dubbel', label: 'Dubbel graf (2-laags)' },
  { value: 'urnengraf', label: 'Urnengraf' },
  { value: 'urnennis', label: 'Urnennis (columbarium)' },
];

type SortKey = 'naam' | 'totaal' | 'perJaar' | 'grafrechten';
type SortDir = 'asc' | 'desc';

export default function GrafkostenVergelijker({
  begraafplaatsen,
  provincie,
}: GrafkostenVergelijkerProps) {
  const [looptijd, setLooptijd] = useState(20);
  const [grafType, setGrafType] = useState<GrafType>('enkel');
  const [inclusiefOnderhoud, setInclusiefOnderhoud] = useState(true);
  const [sortKey, setSortKey] = useState<SortKey>('totaal');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Bereken kosten voor alle begraafplaatsen
  const resultaten = useMemo(() => {
    return begraafplaatsen
      .map((bp) => {
        const kosten = berekenTotaalKosten(bp, grafType, looptijd, inclusiefOnderhoud);
        return { begraafplaats: bp, kosten };
      })
      .filter((r) => r.kosten.gevonden)
      .sort((a, b) => {
        let valA: number | string;
        let valB: number | string;

        switch (sortKey) {
          case 'naam':
            valA = a.begraafplaats.naam;
            valB = b.begraafplaats.naam;
            return sortDir === 'asc'
              ? String(valA).localeCompare(String(valB))
              : String(valB).localeCompare(String(valA));
          case 'totaal':
            valA = a.kosten.totaal;
            valB = b.kosten.totaal;
            break;
          case 'perJaar':
            valA = a.kosten.perJaar;
            valB = b.kosten.perJaar;
            break;
          case 'grafrechten':
            valA = a.kosten.grafrechten;
            valB = b.kosten.grafrechten;
            break;
          default:
            valA = a.kosten.totaal;
            valB = b.kosten.totaal;
        }

        return sortDir === 'asc'
          ? (valA as number) - (valB as number)
          : (valB as number) - (valA as number);
      });
  }, [begraafplaatsen, grafType, looptijd, inclusiefOnderhoud, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const goedkoopste = resultaten.length > 0 ? resultaten[0] : null;

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Filter size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-main">Vergelijkingsopties</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Graftype */}
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">
              Type graf
            </label>
            <select
              value={grafType}
              onChange={(e) => setGrafType(e.target.value as GrafType)}
              className="w-full px-4 py-2.5 border border-border rounded-xl text-text-main bg-white focus:border-primary focus:ring-1 focus:ring-primary"
            >
              {grafTypeOpties.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Looptijd */}
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">
              Looptijd grafrechten
            </label>
            <div className="flex gap-2">
              {looptijdOpties.map((jaren) => (
                <button
                  key={jaren}
                  onClick={() => setLooptijd(jaren)}
                  className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    looptijd === jaren
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-surface border border-border text-text-muted hover:border-primary'
                  }`}
                >
                  {jaren} jr
                </button>
              ))}
            </div>
          </div>

          {/* Onderhoud toggle */}
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">
              Onderhoud meenemen
            </label>
            <button
              onClick={() => setInclusiefOnderhoud(!inclusiefOnderhoud)}
              className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                inclusiefOnderhoud
                  ? 'bg-accent text-white border-accent shadow-md'
                  : 'bg-surface border-border text-text-muted hover:border-primary'
              }`}
            >
              {inclusiefOnderhoud ? '✓ Inclusief onderhoud' : 'Zonder onderhoud'}
            </button>
          </div>
        </div>
      </div>

      {/* Resultaten tabel */}
      {resultaten.length === 0 ? (
        <div className="bg-warning-light border border-warning rounded-2xl p-8 text-center">
          <Info size={32} className="text-warning mx-auto mb-3" />
          <p className="text-text-main font-medium">Geen resultaten gevonden</p>
          <p className="text-text-muted text-sm mt-1">
            Er zijn geen begraafplaatsen met een {grafTypeOpties.find(o => o.value === grafType)?.label.toLowerCase()} en een looptijd van {looptijd} jaar in {provincie}.
          </p>
        </div>
      ) : (
        <>
          {/* Goedkoopste highlight */}
          {goedkoopste && (
            <div className="bg-accent-light border border-accent rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <div className="bg-accent/20 p-2 rounded-lg">
                  <MapPin size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent">Voordeligste optie</p>
                  <p className="text-lg font-bold text-text-main">
                    {goedkoopste.begraafplaats.naam} — {formatCurrency(goedkoopste.kosten.totaal)}
                  </p>
                  <p className="text-sm text-text-muted">
                    {goedkoopste.begraafplaats.typeLabel} in {goedkoopste.begraafplaats.plaats} •{' '}
                    {formatCurrency(goedkoopste.kosten.perJaar)} per jaar
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Desktop tabel */}
          <div className="hidden lg:block bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-white">
                  {[
                    { key: 'naam' as SortKey, label: 'Begraafplaats' },
                    { key: 'grafrechten' as SortKey, label: 'Grafrechten' },
                    { key: 'totaal' as SortKey, label: inclusiefOnderhoud ? 'Totaal (incl. onderhoud)' : 'Totaal' },
                    { key: 'perJaar' as SortKey, label: 'Per jaar' },
                  ].map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-primary-dark transition-colors"
                    >
                      <div className="flex items-center gap-1">
                        {col.label}
                        <ArrowUpDown size={14} className={sortKey === col.key ? 'text-white' : 'text-white/50'} />
                      </div>
                    </th>
                  ))}
                  <th className="px-6 py-4 text-left text-sm font-semibold">Details</th>
                </tr>
              </thead>
              <tbody>
                {resultaten.map((r, idx) => (
                  <>
                    <tr
                      key={r.begraafplaats.id}
                      className={`border-b border-border hover:bg-surface transition ${
                        idx === 0 ? 'bg-accent/5' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-text-main">{r.begraafplaats.naam}</div>
                        <div className="text-xs text-text-muted flex items-center gap-1 mt-0.5">
                          <MapPin size={12} />
                          {r.begraafplaats.plaats} • {r.begraafplaats.typeLabel}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-text-main">
                        {formatCurrency(r.kosten.grafrechten)}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-lg font-bold text-primary">
                          {formatCurrency(r.kosten.totaal)}
                        </span>
                        {inclusiefOnderhoud && r.kosten.onderhoud > 0 && (
                          <div className="text-xs text-text-muted mt-0.5">
                            waarvan {formatCurrency(r.kosten.onderhoud)} onderhoud
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium text-text-muted">
                        {formatCurrency(r.kosten.perJaar)}/jr
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            setExpandedId(expandedId === r.begraafplaats.id ? null : r.begraafplaats.id)
                          }
                          className="text-primary hover:text-primary-dark transition-colors text-sm font-medium flex items-center gap-1"
                        >
                          {expandedId === r.begraafplaats.id ? (
                            <>Minder <ChevronUp size={14} /></>
                          ) : (
                            <>Meer <ChevronDown size={14} /></>
                          )}
                        </button>
                      </td>
                    </tr>
                    {expandedId === r.begraafplaats.id && (
                      <tr key={`${r.begraafplaats.id}-detail`}>
                        <td colSpan={5} className="px-6 py-4 bg-surface">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="font-medium text-text-main mb-1">Onderhoud</p>
                              <p className="text-text-muted">
                                {r.begraafplaats.onderhoud.type === 'verplicht'
                                  ? `Verplicht: ${formatCurrency(r.begraafplaats.onderhoud.perJaar || 0)}/jaar`
                                  : r.begraafplaats.onderhoud.type === 'optioneel'
                                  ? `Optioneel: ${formatCurrency(r.begraafplaats.onderhoud.perJaar || 0)}/jaar`
                                  : 'Niet beschikbaar'}
                              </p>
                            </div>
                            <div>
                              <p className="font-medium text-text-main mb-1">Type</p>
                              <p className="text-text-muted">{r.begraafplaats.typeLabel}</p>
                              <p className="text-text-muted">
                                Eeuwige grafrust: {r.begraafplaats.eeuwigeGrafrust ? 'Ja' : 'Nee'}
                              </p>
                            </div>
                            <div>
                              <p className="font-medium text-text-main mb-1">Bijzonderheden</p>
                              <p className="text-text-muted">
                                {r.begraafplaats.bijzonderheden || 'Geen bijzonderheden'}
                              </p>
                              {r.begraafplaats.bronVermelding && (
                                <p className="text-xs text-text-muted mt-1 italic">
                                  Bron: {r.begraafplaats.bronVermelding}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="lg:hidden space-y-4">
            {resultaten.map((r, idx) => (
              <div
                key={r.begraafplaats.id}
                className={`bg-white border rounded-2xl overflow-hidden shadow-sm ${
                  idx === 0 ? 'border-accent' : 'border-border'
                }`}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-text-main">{r.begraafplaats.naam}</h4>
                      <p className="text-xs text-text-muted flex items-center gap-1 mt-0.5">
                        <MapPin size={12} />
                        {r.begraafplaats.plaats} • {r.begraafplaats.typeLabel}
                      </p>
                    </div>
                    {idx === 0 && (
                      <span className="bg-accent text-white text-xs font-medium px-2 py-1 rounded-full">
                        Voordeligst
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-surface rounded-lg p-3">
                      <p className="text-xs text-text-muted">Grafrechten</p>
                      <p className="font-bold text-text-main">{formatCurrency(r.kosten.grafrechten)}</p>
                    </div>
                    <div className="bg-primary-light rounded-lg p-3">
                      <p className="text-xs text-text-muted">Totaal</p>
                      <p className="font-bold text-primary">{formatCurrency(r.kosten.totaal)}</p>
                    </div>
                  </div>

                  {inclusiefOnderhoud && r.kosten.onderhoud > 0 && (
                    <p className="text-xs text-text-muted mt-2">
                      Waarvan {formatCurrency(r.kosten.onderhoud)} onderhoud ({formatCurrency(r.kosten.perJaar)}/jaar)
                    </p>
                  )}

                  <button
                    onClick={() =>
                      setExpandedId(expandedId === r.begraafplaats.id ? null : r.begraafplaats.id)
                    }
                    className="mt-3 text-primary text-sm font-medium flex items-center gap-1"
                  >
                    {expandedId === r.begraafplaats.id ? (
                      <>Minder details <ChevronUp size={14} /></>
                    ) : (
                      <>Meer details <ChevronDown size={14} /></>
                    )}
                  </button>
                </div>

                {expandedId === r.begraafplaats.id && (
                  <div className="border-t border-border bg-surface px-5 py-4 space-y-3 text-sm">
                    <div>
                      <p className="font-medium text-text-main">Onderhoud</p>
                      <p className="text-text-muted">{r.begraafplaats.onderhoud.toelichting}</p>
                    </div>
                    {r.begraafplaats.bijzonderheden && (
                      <div>
                        <p className="font-medium text-text-main">Bijzonderheden</p>
                        <p className="text-text-muted">{r.begraafplaats.bijzonderheden}</p>
                      </div>
                    )}
                    {r.begraafplaats.bronVermelding && (
                      <p className="text-xs text-text-muted italic">
                        Bron: {r.begraafplaats.bronVermelding}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Disclaimer */}
      <div className="bg-surface border border-border rounded-xl p-4 text-xs text-text-muted">
        <p>
          <strong>Let op:</strong> De getoonde tarieven zijn indicatief en gebaseerd op de meest recente informatie.
          Neem altijd contact op met de betreffende begraafplaats voor de actuele tarieven.
          Grafkostenkenner.nl is niet verantwoordelijk voor afwijkingen.
        </p>
      </div>
    </div>
  );
}
