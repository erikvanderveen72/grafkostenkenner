import { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import FAQSchema from '@/components/FAQSchema';
import GrafkostenVergelijker from '@/components/GrafkostenVergelijker';
import { begraafplaatsenGroningen, formatCurrency } from '@/lib/fallback-data';
import { MapPin, Info, TrendingDown, Clock, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Grafkosten Groningen 2026 - Vergelijk Grafrechten per Begraafplaats',
  description:
    'Vergelijk grafkosten en grafrechten op begraafplaatsen in de provincie Groningen. Bekijk tarieven, looptijden en onderhoudskosten. Onafhankelijk en actueel.',
};

export const revalidate = 3600;

const faqItems = [
  {
    question: 'Hoeveel kosten grafrechten in de gemeente Groningen?',
    answer:
      'De kosten voor grafrechten in Groningen variëren per begraafplaats en looptijd. Op gemeentelijke begraafplaatsen betaalt u voor 20 jaar grafrechten gemiddeld rond de €2.500-€5.500, afhankelijk van het type graf.',
  },
  {
    question: 'Wat is het verschil tussen de RK Kerkhof Hereweg en De Walakker?',
    answer:
      'Het RK Kerkhof Hereweg is een kerkelijke begraafplaats met relatief lage tarieven maar verplicht onderhoud. De Walakker is een gemeentelijke begraafplaats met hogere grafrechten maar optioneel onderhoud. De totaalkosten voor 20 jaar inclusief onderhoud zijn €2.320 vs €7.738.',
  },
  {
    question: 'Is onderhoud van een graf verplicht in Groningen?',
    answer:
      'Dat verschilt per begraafplaats. Bij gemeentelijke begraafplaatsen is een onderhoudscontract meestal niet verplicht, maar bij kerkelijke begraafplaatsen zoals het RK Kerkhof Hereweg is onderhoud wel verplicht (€56/jaar).',
  },
  {
    question: 'Kan ik grafrechten verlengen in Groningen?',
    answer:
      'Ja, bij de meeste begraafplaatsen kunt u grafrechten verlengen per periode van 10 of 20 jaar. Op De Walakker kost verlenging €1.958,40 per 20 jaar. Bij het RK Kerkhof zijn langere looptijden direct beschikbaar.',
  },
  {
    question: 'Welke begraafplaats in Groningen is het goedkoopst?',
    answer:
      'Het RK Kerkhof Hereweg biedt de laagste totaalkosten: €2.320 voor 20 jaar inclusief verplicht onderhoud. De Walakker kost minimaal €5.528 voor dezelfde periode zonder onderhoud.',
  },
];

export default function GroningenPage() {
  return (
    <>
      <PageHero
        title="Grafkosten Groningen"
        badge="Tarieven 2026"
        highlightedSubtitle="Vergelijk grafrechten per begraafplaats"
        subtitle="Bekijk en vergelijk de grafkosten op gemeentelijke en particuliere begraafplaatsen in de provincie Groningen."
        showBreadcrumbs
        breadcrumbs={[
          { label: 'Provincies', href: '/#provincies' },
          { label: 'Groningen', href: '/provincie/groningen' },
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
                <p className="text-2xl font-bold text-text-main">{begraafplaatsenGroningen.length}</p>
                <p className="text-sm text-text-muted">begraafplaatsen</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-accent-light p-3 rounded-xl">
                <TrendingDown size={24} className="text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-main">{formatCurrency(1200)}</p>
                <p className="text-sm text-text-muted">vanaf (20 jaar)</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-warning-light p-3 rounded-xl">
                <Clock size={24} className="text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-main">20-60 jaar</p>
                <p className="text-sm text-text-muted">looptijden</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary-light p-3 rounded-xl">
                <Shield size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-main">2026</p>
                <p className="text-sm text-text-muted">actuele tarieven</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vergelijkingstool */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-text-main mb-4">Vergelijk grafkosten</h2>
          <p className="text-text-muted max-w-3xl">
            Gebruik de filters om de grafkosten te vergelijken. Kies een type graf, looptijd en of u onderhoudskosten wilt meenemen in de vergelijking.
          </p>
        </div>

        <GrafkostenVergelijker
          begraafplaatsen={begraafplaatsenGroningen}
          provincie="Groningen"
        />
      </section>

      {/* Toelichting */}
      <section className="bg-stone-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-main mb-8">Grafkosten in Groningen: wat u moet weten</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-border">
              <h3 className="text-lg font-semibold text-text-main mb-4">Gemeentelijke begraafplaatsen</h3>
              <p className="text-text-muted mb-4">
                Tarieven van gemeentelijke begraafplaatsen zijn vastgelegd in de gemeentelijke legesverordening en zijn openbaar beschikbaar. Grafrechten worden verleend per periode van 10 tot 20 jaar en kunnen daarna verlengd worden.
              </p>
              <div className="bg-primary-light rounded-xl p-4">
                <p className="text-sm text-primary font-medium">Kenmerken:</p>
                <p className="text-sm text-text-muted mt-1">
                  Transparante tarieven, onderhoud meestal niet verplicht, grafrechten voor beperkte periode
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 border border-border">
              <h3 className="text-lg font-semibold text-text-main mb-4">Kerkelijke & particuliere begraafplaatsen</h3>
              <p className="text-text-muted mb-4">
                Bij particuliere begraafplaatsen bepalen de eigenaren (kerken, stichtingen) zelf de tarieven. Deze zijn vaak niet publiek beschikbaar en moeten worden opgevraagd. Onderhoud is hier vaak verplicht.
              </p>
              <div className="bg-warning-light rounded-xl p-4">
                <p className="text-sm text-warning font-medium">Kenmerken:</p>
                <p className="text-sm text-text-muted mt-1">
                  Tarieven op aanvraag, onderhoud vaak verplicht, langere looptijden mogelijk
                </p>
              </div>
            </div>
          </div>

          {/* Vergelijkingstabel samenvatting */}
          <div className="mt-12 bg-white rounded-2xl overflow-hidden border border-border">
            <div className="bg-primary text-white p-6">
              <h3 className="text-lg font-semibold">Overzicht: Grafkosten Groningen 2026</h3>
              <p className="text-slate-200 text-sm mt-1">Totaalkosten inclusief onderhoud (indien van toepassing)</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-text-main">Begraafplaats</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-text-main">20 jaar</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-text-main">40 jaar</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-text-main">60 jaar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border hover:bg-surface transition">
                    <td className="px-6 py-3">
                      <div className="font-medium text-text-main">R.K. Kerkhof Hereweg</div>
                      <div className="text-xs text-text-muted">Kerkelijk • onderhoud verplicht</div>
                    </td>
                    <td className="px-6 py-3 font-bold text-accent">{formatCurrency(2320)}</td>
                    <td className="px-6 py-3 font-bold text-accent">{formatCurrency(4440)}</td>
                    <td className="px-6 py-3 font-bold text-accent">{formatCurrency(6360)}</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-surface transition">
                    <td className="px-6 py-3">
                      <div className="font-medium text-text-main">De Walakker (zonder onderhoud)</div>
                      <div className="text-xs text-text-muted">Gemeentelijk • onderhoud optioneel</div>
                    </td>
                    <td className="px-6 py-3 font-medium text-text-main">{formatCurrency(5528.45)}</td>
                    <td className="px-6 py-3 font-medium text-text-main">{formatCurrency(7486.85)}</td>
                    <td className="px-6 py-3 font-medium text-text-main">{formatCurrency(9445.25)}</td>
                  </tr>
                  <tr className="hover:bg-surface transition">
                    <td className="px-6 py-3">
                      <div className="font-medium text-text-main">De Walakker (met onderhoud)</div>
                      <div className="text-xs text-text-muted">Gemeentelijk • onderhoud meegerekend</div>
                    </td>
                    <td className="px-6 py-3 font-medium text-text-main">{formatCurrency(7738.45)}</td>
                    <td className="px-6 py-3 font-medium text-text-main">{formatCurrency(11906.85)}</td>
                    <td className="px-6 py-3 font-medium text-text-main">{formatCurrency(16075.25)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Inzicht */}
          <div className="mt-8 bg-accent/10 border border-accent rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-3">
              <Info size={24} className="text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-text-main mb-2">Belangrijkste inzicht</h4>
                <p className="text-text-muted">
                  Het R.K. Kerkhof Hereweg is voor elke looptijd goedkoper dan De Walakker, zelfs inclusief het verplichte onderhoud.
                  Bij 60 jaar bedraagt het verschil meer dan €3.000 (zonder onderhoud bij De Walakker) tot bijna €10.000 (met onderhoud).
                  Dit illustreert hoe belangrijk het is om niet alleen naar grafrechten te kijken, maar naar de totale kosten.
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
