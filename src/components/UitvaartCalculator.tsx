'use client';

import { useState, useMemo } from 'react';
import { Calculator, Euro, TrendingDown, TrendingUp, Info } from 'lucide-react';

type UitvaartType = 'begrafenis' | 'crematie';
type GrafTypeCalc = 'zandgraf' | 'keldergraf' | 'urnengraf' | 'asverstrooiing';
type KistType = 'eenvoudig' | 'standaard' | 'luxe';
type OpbaringType = 'thuis' | 'rouwcentrum';

interface KostenResultaat {
  grafrechten: number;
  begraafkosten: number;
  onderhoud: number;
  uitvaartverzorger: number;
  verzorgingVervoer: number;
  opbaring: number;
  kist: number;
  totaal: number;
}

const grafRechtPrijzen: Record<GrafTypeCalc, { min: number; gem: number; max: number }> = {
  zandgraf: { min: 1500, gem: 3500, max: 8000 },
  keldergraf: { min: 2500, gem: 4500, max: 10000 },
  urnengraf: { min: 150, gem: 800, max: 2000 },
  asverstrooiing: { min: 100, gem: 300, max: 600 },
};

const kistPrijzen: Record<KistType, number> = {
  eenvoudig: 600,
  standaard: 1500,
  luxe: 4000,
};

function formatBedrag(bedrag: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(bedrag);
}

export default function UitvaartCalculator() {
  const [type, setType] = useState<UitvaartType>('begrafenis');
  const [grafType, setGrafType] = useState<GrafTypeCalc>('zandgraf');
  const [looptijd, setLooptijd] = useState(20);
  const [kistType, setKistType] = useState<KistType>('standaard');
  const [opbaring, setOpbaring] = useState<OpbaringType>('rouwcentrum');
  const [inclOnderhoud, setInclOnderhoud] = useState(true);
  const [onderhoudPerJaar, setOnderhoudPerJaar] = useState(80);
  const [zaterdag, setZaterdag] = useState(false);

  const resultaat = useMemo<KostenResultaat>(() => {
    const grafrechten =
      type === 'crematie' && (grafType === 'asverstrooiing' || grafType === 'urnengraf')
        ? grafRechtPrijzen[grafType].gem
        : grafRechtPrijzen[grafType].gem;

    const begraafkosten = type === 'begrafenis' ? (zaterdag ? 1062 * 1.25 : 1062) : 650;
    const onderhoud = inclOnderhoud ? onderhoudPerJaar * looptijd : 0;
    const uitvaartverzorger = 2100;
    const verzorgingVervoer = 1300;
    const opbaringKosten = opbaring === 'thuis' ? 550 : 900;
    const kist = kistPrijzen[kistType];

    const totaal =
      grafrechten + begraafkosten + onderhoud + uitvaartverzorger + verzorgingVervoer + opbaringKosten + kist;

    return {
      grafrechten,
      begraafkosten,
      onderhoud,
      uitvaartverzorger,
      verzorgingVervoer,
      opbaring: opbaringKosten,
      kist,
      totaal,
    };
  }, [type, grafType, looptijd, kistType, opbaring, inclOnderhoud, onderhoudPerJaar, zaterdag]);

  return (
    <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-earth-dark to-earth-mid p-6">
        <div className="flex items-center gap-3">
          <Calculator size={24} className="text-white" />
          <div>
            <h3 className="text-lg font-semibold text-white">Uitvaartkosten Calculator</h3>
            <p className="text-stone-400 text-sm">Bereken de indicatieve totaalkosten</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Invoer */}
        <div className="p-6 space-y-5">
          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Type uitvaart</label>
            <div className="grid grid-cols-2 gap-2">
              {(['begrafenis', 'crematie'] as UitvaartType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setType(t);
                    if (t === 'crematie') setGrafType('urnengraf');
                    else setGrafType('zandgraf');
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    type === t
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {t === 'begrafenis' ? 'Begrafenis' : 'Crematie'}
                </button>
              ))}
            </div>
          </div>

          {/* Graf type */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Type graf</label>
            <select
              value={grafType}
              onChange={(e) => setGrafType(e.target.value as GrafTypeCalc)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            >
              {type === 'begrafenis' ? (
                <>
                  <option value="zandgraf">Particulier zandgraf</option>
                  <option value="keldergraf">Particulier keldergraf</option>
                </>
              ) : (
                <>
                  <option value="urnengraf">Urnengraf</option>
                  <option value="asverstrooiing">Asverstrooiing</option>
                </>
              )}
            </select>
          </div>

          {/* Looptijd */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Looptijd grafrechten: <strong>{looptijd} jaar</strong>
            </label>
            <input
              type="range"
              min={10}
              max={60}
              step={10}
              value={looptijd}
              onChange={(e) => setLooptijd(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-stone-400 mt-1">
              <span>10 jaar</span>
              <span>60 jaar</span>
            </div>
          </div>

          {/* Kist */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Kist</label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { key: 'eenvoudig', label: 'Eenvoudig', prijs: '€600' },
                { key: 'standaard', label: 'Standaard', prijs: '€1.500' },
                { key: 'luxe', label: 'Luxe', prijs: '€4.000' },
              ] as const).map((k) => (
                <button
                  key={k.key}
                  onClick={() => setKistType(k.key)}
                  className={`px-3 py-2 rounded-xl text-sm transition-all ${
                    kistType === k.key
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  <div className="font-medium">{k.label}</div>
                  <div className="text-xs opacity-75">{k.prijs}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Opbaring */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Opbaring</label>
            <div className="grid grid-cols-2 gap-2">
              {([
                { key: 'thuis', label: 'Thuis (€550)' },
                { key: 'rouwcentrum', label: 'Rouwcentrum (€900)' },
              ] as const).map((o) => (
                <button
                  key={o.key}
                  onClick={() => setOpbaring(o.key)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    opbaring === o.key
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          {/* Onderhoud */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={inclOnderhoud}
                onChange={(e) => setInclOnderhoud(e.target.checked)}
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="text-sm font-medium text-stone-700">Inclusief onderhoudskosten</span>
            </label>
            {inclOnderhoud && (
              <div>
                <label className="block text-xs text-stone-500 mb-1">
                  Onderhoud per jaar: {formatBedrag(onderhoudPerJaar)}
                </label>
                <input
                  type="range"
                  min={30}
                  max={200}
                  step={10}
                  value={onderhoudPerJaar}
                  onChange={(e) => setOnderhoudPerJaar(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            )}
          </div>

          {/* Zaterdag */}
          {type === 'begrafenis' && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={zaterdag}
                onChange={(e) => setZaterdag(e.target.checked)}
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="text-sm text-stone-700">Begraven op zaterdag (+25% toeslag)</span>
            </label>
          )}
        </div>

        {/* Resultaat */}
        <div className="p-6 bg-stone-50 border-t lg:border-t-0 lg:border-l border-stone-200">
          <p className="text-sm font-medium text-stone-500 mb-4">Kostenoverzicht</p>

          <div className="space-y-3">
            {[
              { label: 'Grafrechten', bedrag: resultaat.grafrechten },
              { label: type === 'begrafenis' ? 'Begraafkosten' : 'Crematiekosten', bedrag: resultaat.begraafkosten },
              ...(resultaat.onderhoud > 0
                ? [{ label: `Onderhoud (${looptijd} jaar)`, bedrag: resultaat.onderhoud }]
                : []),
              { label: 'Uitvaartverzorger', bedrag: resultaat.uitvaartverzorger },
              { label: 'Verzorging & vervoer', bedrag: resultaat.verzorgingVervoer },
              { label: 'Opbaring', bedrag: resultaat.opbaring },
              { label: 'Kist', bedrag: resultaat.kist },
            ].map((post) => (
              <div key={post.label} className="flex items-center justify-between">
                <span className="text-sm text-stone-600">{post.label}</span>
                <span className="text-sm font-medium text-stone-900">{formatBedrag(post.bedrag)}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t-2 border-primary">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-stone-900">Totaal indicatief</span>
              <span className="text-2xl font-bold text-primary">{formatBedrag(resultaat.totaal)}</span>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="flex items-start gap-2">
              <Info size={16} className="text-amber-600 mt-0.5 shrink-0" />
              <div className="text-xs text-amber-800">
                <p className="font-medium mb-1">Dit is een indicatieve berekening</p>
                <p>
                  De werkelijke kosten hangen af van uw gemeente, begraafplaats en uitvaartverzorger.
                  Grafrechten variëren tot meer dan 700% tussen gemeenten. Gebruik onze{' '}
                  <a href="/provincie/groningen" className="underline">
                    vergelijker
                  </a>{' '}
                  voor exacte lokale tarieven.
                </p>
              </div>
            </div>
          </div>

          {/* Vergelijking */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-white border border-stone-200 rounded-xl p-3 text-center">
              <TrendingDown size={18} className="text-emerald-600 mx-auto mb-1" />
              <p className="text-xs text-stone-500">Besparing mogelijk</p>
              <p className="text-sm font-bold text-emerald-700">
                {formatBedrag(Math.max(0, resultaat.totaal - 6000))}
              </p>
            </div>
            <div className="bg-white border border-stone-200 rounded-xl p-3 text-center">
              <TrendingUp size={18} className="text-amber-600 mx-auto mb-1" />
              <p className="text-xs text-stone-500">Per maand (60 mnd)</p>
              <p className="text-sm font-bold text-amber-700">{formatBedrag(resultaat.totaal / 60)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
