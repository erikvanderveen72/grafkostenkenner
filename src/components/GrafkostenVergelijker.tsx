'use client';

import { useState, useMemo, useEffect } from 'react';
import { MapPin, Filter, ArrowUpDown, Info, ChevronDown, ChevronUp, BarChart3 } from 'lucide-react';
import {
  type Begraafplaats,
  type GrafType,
  formatCurrency,
  berekenTotaalKosten,
  getUniekeLooptijden,
  getUniekeGrafTypes,
} from '@/lib/fallback-data';

interface GrafkostenVergelijkerProps {
  begraafplaatsen: Begraafplaats[];
  provincie: string;
}

const grafTypeLabels: Record<GrafType, string> = {
  enkel: 'Enkel graf (1-laags)',
  dubbel: 'Dubbel graf (2-laags)',
  kindergraf: 'Kindergraf',
  urnengraf: 'Urnengraf',
  urnennis: 'Urnennis (columbarium)',
  asverstrooiing: 'Asverstrooiing',
};

type SortKey = 'naam' | 'totaal' | 'perJaar' | 'grafrechten';
type SortDir = 'asc' | 'desc';

function looptijdLabel(l: number): string {
  return l === 99 ? 'Eeuwig' : `${l} jr`;
}

export default function GrafkostenVergelijker({
  begraafplaatsen,
  provincie,
}: GrafkostenVergelijkerProps) {
  const beschikbareGrafTypes = useMemo(() => getUniekeGrafTypes(begraafplaatsen), [begraafplaatsen]);
  const [grafType, setGrafType] = useState<GrafType>(beschikbareGrafTypes[0] || 'enkel');
  const [filterGemeente, setFilterGemeente] = useState<string>('alle');

  // Filter begraafplaatsen op gemeente
  const gefilterdeBps = useMemo(
    () => filterGemeente === 'alle' ? begraafplaatsen : begraafplaatsen.filter((bp) => bp.gemeente === filterGemeente),
    [begraafplaatsen, filterGemeente],
  );

  // Looptijden op basis van gefilterde begraafplaatsen (niet alle)
  const beschikbareLooptijden = useMemo(
    () => getUniekeLooptijden(gefilterdeBps, grafType),
    [gefilterdeBps, grafType],
  );

  const [looptijd, setLooptijd] = useState(() => beschikbareLooptijden.find((l) => l === 30) || beschikbareLooptijden[0] || 20);
  const inclusiefOnderhoud = false;
  const [sortKey, setSortKey] = useState<SortKey>('totaal');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showChart, setShowChart] = useState(true);

  // Reset looptijd als grafType of gemeente wijzigt
  useEffect(() => {
    if (!beschikbareLooptijden.includes(looptijd)) {
      setLooptijd(beschikbareLooptijden.find((l) => l === 30) || beschikbareLooptijden[0] || 20);
    }
  }, [beschikbareLooptijden, looptijd]);

  const handleGrafTypeChange = (newType: GrafType) => {
    setGrafType(newType);
  };

  // Unieke gemeenten
  const gemeenten = useMemo(() => {
    const set = new Set(begraafplaatsen.map((bp) => bp.gemeente));
    return Array.from(set).sort();
  }, [begraafplaatsen]);

  // Filter en bereken
  const resultaten = useMemo(() => {
    return gefilterdeBps
      .map((bp) => ({
        begraafplaats: bp,
        kosten: berekenTotaalKosten(bp, grafType, looptijd, inclusiefOnderhoud),
      }))
      .filter((r) => r.kosten.gevonden)
      .sort((a, b) => {
        if (sortKey === 'naam') {
          const cmp = a.begraafplaats.naam.localeCompare(b.begraafplaats.naam);
          return sortDir === 'asc' ? cmp : -cmp;
        }
        const valA = a.kosten[sortKey as keyof typeof a.kosten] as number;
        const valB = b.kosten[sortKey as keyof typeof b.kosten] as number;
        return sortDir === 'asc' ? valA - valB : valB - valA;
      });
  }, [gefilterdeBps, grafType, looptijd, inclusiefOnderhoud, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const goedkoopste = resultaten.length > 0 ? resultaten[0] : null;
  const maxTotaal = Math.max(...resultaten.map((r) => r.kosten.totaal), 1);

  // Korte naam voor grafiek: gebruik gemeente + type
  function korteNaam(bp: Begraafplaats): string {
    const type = bp.typeLabel.replace('Gemeentelijke begraafplaats', 'Gem.').replace('Algemene begraafplaats', 'Alg.');
    return `${bp.gemeente} — ${type}`;
  }

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Filter size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-main">Vergelijkingsopties</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Graftype */}
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Type graf</label>
            <select
              value={grafType}
              onChange={(e) => handleGrafTypeChange(e.target.value as GrafType)}
              className="w-full px-4 py-2.5 border border-border rounded-xl text-text-main bg-white focus:border-primary focus:ring-1 focus:ring-primary"
            >
              {beschikbareGrafTypes.map((t) => (
                <option key={t} value={t}>{grafTypeLabels[t]}</option>
              ))}
            </select>
          </div>

          {/* Looptijd — dynamisch op basis van gekozen gemeente */}
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">
              {grafType === 'kindergraf' ? 'Periode' : 'Looptijd'}
            </label>
            {beschikbareLooptijden.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {beschikbareLooptijden.map((jaren) => (
                  <button
                    key={jaren}
                    onClick={() => setLooptijd(jaren)}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      looptijd === jaren
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-surface border border-border text-text-muted hover:border-primary'
                    }`}
                  >
                    {looptijdLabel(jaren)}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-text-muted py-2">Geen looptijden beschikbaar</p>
            )}
          </div>

          {/* Gemeente filter */}
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Gemeente</label>
            <select
              value={filterGemeente}
              onChange={(e) => setFilterGemeente(e.target.value)}
              className="w-full px-4 py-2.5 border border-border rounded-xl text-text-main bg-white focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="alle">Alle gemeenten</option>
              {gemeenten.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Geen resultaten */}
      {resultaten.length === 0 ? (
        <div className="bg-warning-light border border-warning rounded-2xl p-8 text-center">
          <Info size={32} className="text-warning mx-auto mb-3" />
          <p className="text-text-main font-medium">Geen resultaten gevonden</p>
          <p className="text-text-muted text-sm mt-1">
            Pas de filters aan om begraafplaatsen te vinden met dit graftype en deze looptijd.
          </p>
        </div>
      ) : (
        <>
          {/* Goedkoopste highlight */}
          {goedkoopste && (
            <div className="bg-accent-light border border-accent rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <div className="bg-accent/20 p-2 rounded-lg shrink-0">
                  <MapPin size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent">Voordeligste optie</p>
                  <p className="text-lg font-bold text-text-main">
                    {goedkoopste.begraafplaats.gemeente} — {formatCurrency(goedkoopste.kosten.totaal)}
                  </p>
                  <p className="text-sm text-text-muted">
                    {goedkoopste.begraafplaats.naam} • {goedkoopste.begraafplaats.typeLabel} •{' '}
                    {looptijd === 99 ? 'eeuwig grafrecht' : `${formatCurrency(goedkoopste.kosten.perJaar)} per jaar`}
                    {goedkoopste.begraafplaats.onderhoud.type === 'verplicht' && ' • onderhoud verplicht'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Chart toggle */}
          <div className="flex justify-end">
            <button
              onClick={() => setShowChart(!showChart)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                showChart ? 'bg-primary text-white' : 'bg-surface border border-border text-text-muted'
              }`}
            >
              <BarChart3 size={16} />
              {showChart ? 'Grafiek verbergen' : 'Toon grafiek'}
            </button>
          </div>

          {/* Bar chart */}
          {showChart && (
            <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
              <h4 className="text-sm font-semibold text-text-muted mb-4">
                Grafrechten vergelijking ({looptijdLabel(looptijd)}, excl. onderhoud)
              </h4>
              <div className="space-y-3">
                {resultaten.map((r, idx) => {
                  const pct = (r.kosten.totaal / maxTotaal) * 100;
                  const heeftVerplichtOnderhoud = r.begraafplaats.onderhoud.type === 'verplicht';
                  return (
                    <div key={r.begraafplaats.id} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                      <div className="text-sm text-text-main font-medium sm:w-48 md:w-64 sm:shrink-0 truncate">
                        {korteNaam(r.begraafplaats)}
                      </div>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="flex-1 bg-surface rounded-full h-8 overflow-hidden">
                          <div
                            className={`h-full rounded-full flex items-center px-3 transition-all duration-500 ${
                              idx === 0 ? 'bg-accent' : 'bg-primary'
                            }`}
                            style={{ width: `${Math.max(pct, 12)}%` }}
                          >
                            <span className="text-white text-xs font-bold whitespace-nowrap">
                              {formatCurrency(r.kosten.totaal)}
                            </span>
                          </div>
                        </div>
                        {heeftVerplichtOnderhoud && (
                          <span className="text-xs text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                            + onderhoud verplicht
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
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
                    { key: 'totaal' as SortKey, label: 'Totaal' },
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
                      className={`border-b border-border hover:bg-surface transition ${idx === 0 ? 'bg-accent/5' : ''}`}
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-text-main">{r.begraafplaats.gemeente}</div>
                        <div className="text-xs text-text-muted flex items-center gap-1 mt-0.5">
                          <MapPin size={12} />
                          {r.begraafplaats.naam} • {r.begraafplaats.typeLabel}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-text-main">{formatCurrency(r.kosten.grafrechten)}</td>
                      <td className="px-6 py-4">
                        <span className="text-lg font-bold text-primary">{formatCurrency(r.kosten.totaal)}</span>
                        {r.begraafplaats.onderhoud.type === 'verplicht' && (
                          <div className="text-xs text-amber-600 mt-0.5">
                            + onderhoud verplicht{r.begraafplaats.onderhoud.perJaar ? ` (${formatCurrency(r.begraafplaats.onderhoud.perJaar)}/jr)` : ''}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium text-text-muted">
                        {looptijd === 99 ? 'eenmalig' : `${formatCurrency(r.kosten.perJaar)}/jr`}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setExpandedId(expandedId === r.begraafplaats.id ? null : r.begraafplaats.id)}
                          className="text-primary hover:text-primary-dark transition-colors text-sm font-medium flex items-center gap-1"
                        >
                          {expandedId === r.begraafplaats.id ? <>Minder <ChevronUp size={14} /></> : <>Meer <ChevronDown size={14} /></>}
                        </button>
                      </td>
                    </tr>
                    {expandedId === r.begraafplaats.id && (
                      <tr key={`${r.begraafplaats.id}-detail`}>
                        <td colSpan={5} className="px-6 py-4 bg-surface">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="font-medium text-text-main mb-1">Onderhoudscontract</p>
                              <p className={`text-sm font-medium mb-1 ${r.begraafplaats.onderhoud.type === 'verplicht' ? 'text-rose-600' : 'text-emerald-600'}`}>
                                {r.begraafplaats.onderhoud.type === 'verplicht' ? 'Verplicht' : 'Niet verplicht'}
                              </p>
                              <p className="text-text-muted">{r.begraafplaats.onderhoud.toelichting || ''}</p>
                            </div>
                            <div>
                              <p className="font-medium text-text-main mb-1">Kenmerken</p>
                              <p className="text-text-muted">{r.begraafplaats.typeLabel}</p>
                              <p className="text-text-muted">Eeuwige grafrust: {r.begraafplaats.eeuwigeGrafrust ? 'Ja' : 'Nee'}</p>
                              {r.begraafplaats.website && (
                                <a href={r.begraafplaats.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs mt-1 inline-block">Website bezoeken</a>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-text-main mb-1">Bijzonderheden</p>
                              <p className="text-text-muted">{r.begraafplaats.bijzonderheden || 'Geen'}</p>
                              {r.begraafplaats.bronVermelding && (
                                <p className="text-xs text-text-muted mt-1 italic">Bron: {r.begraafplaats.bronVermelding}</p>
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
              <div key={r.begraafplaats.id} className={`bg-white border rounded-2xl overflow-hidden shadow-sm ${idx === 0 ? 'border-accent' : 'border-border'}`}>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="min-w-0 flex-1 mr-2">
                      <h4 className="font-semibold text-text-main">{r.begraafplaats.gemeente}</h4>
                      <p className="text-xs text-text-muted flex items-center gap-1 mt-0.5">
                        <MapPin size={12} className="shrink-0" />
                        <span className="truncate">{r.begraafplaats.naam} • {r.begraafplaats.typeLabel}</span>
                      </p>
                    </div>
                    {idx === 0 && <span className="bg-accent text-white text-xs font-medium px-2 py-1 rounded-full shrink-0">Voordeligst</span>}
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
                  {r.begraafplaats.onderhoud.type === 'verplicht' && (
                    <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 mt-2">
                      + Onderhoud verplicht{r.begraafplaats.onderhoud.perJaar ? ` (${formatCurrency(r.begraafplaats.onderhoud.perJaar)}/jr)` : ''}
                    </p>
                  )}
                  <button
                    onClick={() => setExpandedId(expandedId === r.begraafplaats.id ? null : r.begraafplaats.id)}
                    className="mt-3 text-primary text-sm font-medium flex items-center gap-1"
                  >
                    {expandedId === r.begraafplaats.id ? <>Minder <ChevronUp size={14} /></> : <>Meer details <ChevronDown size={14} /></>}
                  </button>
                </div>
                {expandedId === r.begraafplaats.id && (
                  <div className="border-t border-border bg-surface px-5 py-4 space-y-3 text-sm">
                    <div>
                      <p className="font-medium text-text-main">Onderhoudscontract</p>
                      <p className={`text-sm font-medium ${r.begraafplaats.onderhoud.type === 'verplicht' ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {r.begraafplaats.onderhoud.type === 'verplicht' ? 'Verplicht' : 'Niet verplicht'}
                      </p>
                      {r.begraafplaats.onderhoud.toelichting && <p className="text-text-muted">{r.begraafplaats.onderhoud.toelichting}</p>}
                    </div>
                    {r.begraafplaats.bijzonderheden && (
                      <div>
                        <p className="font-medium text-text-main">Bijzonderheden</p>
                        <p className="text-text-muted">{r.begraafplaats.bijzonderheden}</p>
                      </div>
                    )}
                    {r.begraafplaats.bronVermelding && <p className="text-xs text-text-muted italic">Bron: {r.begraafplaats.bronVermelding}</p>}
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
          <strong>Let op:</strong> De getoonde tarieven zijn gebaseerd op officiële gemeentelijke verordeningen en informatie van begraafplaatsen.
          Neem altijd contact op met de betreffende begraafplaats voor de actuele tarieven.
          Begraafplaatskosten.nl is niet verantwoordelijk voor afwijkingen.
        </p>
      </div>
    </div>
  );
}
