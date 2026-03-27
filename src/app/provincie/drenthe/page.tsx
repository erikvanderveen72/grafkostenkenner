import { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import FAQSchema from '@/components/FAQSchema';
import GrafkostenVergelijker from '@/components/GrafkostenVergelijker';
import { begraafplaatsenDrenthe, formatCurrency } from '@/lib/fallback-data';
import { MapPin, Info, TrendingDown, Clock, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Grafkosten Drenthe 2025 - Vergelijk Grafrechten per Gemeente',
  description:
    'Vergelijk grafkosten en grafrechten op 10 begraafplaatsen in de provincie Drenthe. Van €820 tot €6.264. Tarieven van Assen, Emmen, Hoogeveen, Coevorden en meer.',
};

export const revalidate = 3600;

const faqItems = [
  {
    question: 'Hoeveel kosten grafrechten in Drenthe?',
    answer:
      'De kosten voor grafrechten in Drenthe variëren van €820 voor 10 jaar in Midden-Drenthe tot €6.264 voor een dubbeldiep graf van 40 jaar in Westerveld. Gemiddeld betaalt u in Drenthe tussen de €2.000 en €3.000 voor 30 jaar grafrechten voor een enkel graf.',
  },
  {
    question: 'Welke gemeente in Drenthe is het goedkoopst voor begraven?',
    answer:
      'Midden-Drenthe (Beilen, Westerbork, Smilde) heeft de laagste tarieven: een enkel graf kost €820 voor 10 jaar of €2.460 voor 30 jaar. Ook Hoogeveen is relatief voordelig met €1.044 voor 10 jaar.',
  },
  {
    question: 'Welke gemeente in Drenthe is het duurst?',
    answer:
      'Assen heeft de hoogste tarieven voor een enkel graf: €4.805 voor 50 jaar. Westerveld is het duurst voor dubbeldiepgraven: €6.264 voor 40 jaar. De Wolden is relatief duur voor 20 jaar met €2.521.',
  },
  {
    question: 'Is onderhoud verplicht op begraafplaatsen in Drenthe?',
    answer:
      'Bij de meeste gemeenten in Drenthe is onderhoud niet verplicht. Een uitzondering is Assen, waar onderhoud is inbegrepen in de grafrechten. Bij de overige gemeenten is het grafonderhoud uw eigen verantwoordelijkheid.',
  },
  {
    question: 'Hoe lang worden grafrechten verleend in Drenthe?',
    answer:
      'De standaard looptijd verschilt per gemeente: 20 tot 30 jaar is gebruikelijk. Hoogeveen biedt de meeste flexibiliteit met looptijden van 10 tot 50 jaar. Midden-Drenthe biedt 10 tot 40 jaar. Verlenging is bij alle gemeenten mogelijk.',
  },
  {
    question: 'Kan ik grafrechten verlengen in Drenthe?',
    answer:
      'Ja, bij alle gemeenten in Drenthe kunt u grafrechten verlengen. De kosten variëren: in De Wolden €720 per 10 jaar, in Meppel €540 per 10 jaar, en in Coevorden €963 per 10 jaar.',
  },
];

export default function DrenthePage() {
  return (
    <>
      <PageHero
        title="Grafkosten Drenthe"
        badge="Tarieven 2025"
        highlightedSubtitle="Vergelijk grafrechten per gemeente"
        subtitle="Bekijk en vergelijk de grafkosten op gemeentelijke begraafplaatsen in alle gemeenten van de provincie Drenthe."
        showBreadcrumbs
        breadcrumbs={[
          { label: 'Provincies', href: '/#provincies' },
          { label: 'Drenthe', href: '/provincie/drenthe' },
        ]}
      />

      {/* Quick stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg border border-border p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary-light p-3 rounded-xl">
                <MapPin size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-main">{begraafplaatsenDrenthe.length}</p>
                <p className="text-sm text-text-muted">gemeenten</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-accent-light p-3 rounded-xl">
                <TrendingDown size={24} className="text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-main">{formatCurrency(820)}</p>
                <p className="text-sm text-text-muted">vanaf (10 jaar)</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-warning-light p-3 rounded-xl">
                <Clock size={24} className="text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-main">10-50 jaar</p>
                <p className="text-sm text-text-muted">looptijden</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary-light p-3 rounded-xl">
                <Shield size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-main">2025</p>
                <p className="text-sm text-text-muted">actuele tarieven</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vergelijkingstool */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-text-main mb-4">Vergelijk grafkosten in Drenthe</h2>
          <p className="text-text-muted max-w-3xl">
            Gebruik de filters om de grafkosten te vergelijken. Kies een type graf, looptijd en of u onderhoudskosten wilt meenemen in de vergelijking.
          </p>
        </div>

        <GrafkostenVergelijker
          begraafplaatsen={begraafplaatsenDrenthe}
          provincie="Drenthe"
        />
      </section>

      {/* Toelichting */}
      <section className="bg-stone-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-main mb-8">Grafkosten in Drenthe: wat u moet weten</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-border">
              <h3 className="text-lg font-semibold text-text-main mb-4">Gemiddeld goedkoper dan Groningen</h3>
              <p className="text-text-muted mb-4">
                Drenthe is over het algemeen voordeliger dan de provincie Groningen. De gemiddelde kosten voor een enkel graf van 30 jaar liggen rond de €2.600, terwijl dit in Groningen fors hoger kan uitvallen door dure begraafplaatsen als Esserveld.
              </p>
              <div className="bg-primary-light rounded-xl p-4">
                <p className="text-sm text-primary font-medium">Voordeligst:</p>
                <p className="text-sm text-text-muted mt-1">
                  Midden-Drenthe (€820/10 jr) en Hoogeveen (€1.044/10 jr)
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 border border-border">
              <h3 className="text-lg font-semibold text-text-main mb-4">Flexibele looptijden</h3>
              <p className="text-text-muted mb-4">
                Veel Drentse gemeenten bieden flexibele looptijden aan, van 10 tot 50 jaar. Dit is handig als u niet direct voor een lange periode wilt vastleggen. Hoogeveen biedt de meeste opties met looptijden van 5 tot 50 jaar.
              </p>
              <div className="bg-warning-light rounded-xl p-4">
                <p className="text-sm text-warning font-medium">Let op:</p>
                <p className="text-sm text-text-muted mt-1">
                  Verlenging is altijd mogelijk, maar de kosten per jaar zijn bij verlenging vaak hoger dan bij de eerste termijn.
                </p>
              </div>
            </div>
          </div>

          {/* Vergelijkingstabel */}
          <div className="mt-12 bg-white rounded-2xl overflow-hidden border border-border">
            <div className="bg-primary text-white p-6">
              <h3 className="text-lg font-semibold">Overzicht: Enkeldiep graf — 10 gemeenten in Drenthe</h3>
              <p className="text-slate-200 text-sm mt-1">Grafrechten (exclusief onderhoud) per gemeente, gesorteerd op prijs</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-3 text-left font-semibold text-text-main">Gemeente</th>
                    <th className="px-6 py-3 text-right font-semibold text-text-main">10 jaar</th>
                    <th className="px-6 py-3 text-right font-semibold text-text-main">20 jaar</th>
                    <th className="px-6 py-3 text-right font-semibold text-text-main">30 jaar</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { gemeente: 'Midden-Drenthe', t10: 820, t20: 1640, t30: 2460, voordeligst: true },
                    { gemeente: 'Hoogeveen', t10: 1044, t20: 1827, t30: 2610, voordeligst: false },
                    { gemeente: 'Emmen', t10: null, t20: 1546, t30: 2319, voordeligst: false },
                    { gemeente: 'Borger-Odoorn', t10: null, t20: 1680, t30: 2520, voordeligst: false },
                    { gemeente: 'Assen', t10: null, t20: 1922, t30: 2884, voordeligst: false },
                    { gemeente: 'Meppel', t10: null, t20: 2160, t30: 3240, voordeligst: false },
                    { gemeente: 'Westerveld', t10: null, t20: null, t30: 2349, voordeligst: false },
                    { gemeente: 'De Wolden', t10: null, t20: 2521, t30: 2844, voordeligst: false },
                    { gemeente: 'Aa en Hunze', t10: null, t20: null, t30: 2617, voordeligst: false },
                    { gemeente: 'Coevorden', t10: null, t20: null, t30: 2892, voordeligst: false },
                  ].map((row, i) => (
                    <tr key={i} className={`border-b border-border hover:bg-surface transition ${row.voordeligst ? 'bg-accent/5' : ''}`}>
                      <td className="px-6 py-3">
                        <span className="font-medium text-text-main">{row.gemeente}</span>
                        {row.voordeligst && <span className="ml-2 text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">Voordeligst</span>}
                      </td>
                      <td className="px-6 py-3 text-right text-text-muted">{row.t10 ? formatCurrency(row.t10) : '—'}</td>
                      <td className="px-6 py-3 text-right text-text-muted">{row.t20 ? formatCurrency(row.t20) : '—'}</td>
                      <td className="px-6 py-3 text-right font-semibold text-text-main">{row.t30 ? formatCurrency(row.t30) : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Inzicht */}
          <div className="mt-8 bg-accent/10 border border-accent rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-3">
              <Info size={24} className="text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-text-main mb-2">Belangrijkste inzichten Drenthe</h4>
                <p className="text-text-muted">
                  De prijsverschillen in Drenthe zijn minder extreem dan in Groningen, maar toch aanzienlijk.
                  Voor 30 jaar grafrechten betaalt u in Midden-Drenthe €2.460, terwijl Coevorden €2.892 rekent — een verschil van ruim €400.
                  Midden-Drenthe en Hoogeveen zijn de enige gemeenten die grafrechten al vanaf 10 jaar aanbieden, wat interessant is als u de kosten wilt spreiden.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSchema items={faqItems} />
    </>
  );
}
