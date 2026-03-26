import { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import FAQSchema from '@/components/FAQSchema';
import GrafkostenVergelijker from '@/components/GrafkostenVergelijker';
import { begraafplaatsenGroningen, formatCurrency } from '@/lib/fallback-data';
import { MapPin, Info, TrendingDown, Clock, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Grafkosten Groningen 2026 - Vergelijk Grafrechten per Begraafplaats',
  description:
    'Vergelijk grafkosten en grafrechten op 13 begraafplaatsen in 9 gemeenten in de provincie Groningen. Van €480 tot €8.002. Onafhankelijk en actueel.',
};

export const revalidate = 3600;

const faqItems = [
  {
    question: 'Hoeveel kosten grafrechten in de provincie Groningen?',
    answer:
      'De kosten voor grafrechten in de provincie Groningen variëren sterk: van €480 voor 10 jaar op De Stille Hof in Hoogezand tot €11.203 voor 30 jaar op Esserveld in Groningen. Het type graf, de looptijd en de begraafplaats bepalen de prijs.',
  },
  {
    question: 'Welke begraafplaats in Groningen is het goedkoopst?',
    answer:
      'De Stille Hof in Hoogezand (gemeente Midden-Groningen) is het voordeligst met een enkeldiep graf vanaf €480 voor 10 jaar. Ook urnengraven zijn hier het goedkoopst: vanaf €158 voor 10 jaar.',
  },
  {
    question: 'Welke begraafplaats in Groningen is het duurst?',
    answer:
      'Esserveld in de stad Groningen is veruit het duurst: een dubbeldiep graf kost hier €11.203 voor 30 jaar. Een enkeldiep graf kost €8.002 voor 30 jaar. De Walakker in Tynaarlo is ook relatief duur met €5.528 voor 20 jaar.',
  },
  {
    question: 'Is onderhoud van een graf verplicht in Groningen?',
    answer:
      'Dat verschilt per begraafplaats. Bij gemeentelijke begraafplaatsen (Selwerderhof, Esserveld, De Stille Hof) is onderhoud meestal niet verplicht. Bij kerkelijke begraafplaatsen zoals het RK Kerkhof Hereweg is onderhoud wel verplicht (€56/jaar).',
  },
  {
    question: 'Kan ik kiezen voor eeuwig grafrecht in Groningen?',
    answer:
      'Ja, op Natuurbegraafplaats Hoogengraven in Noordenveld kunt u eeuwig grafrecht krijgen. De kosten variëren van €4.500 tot €9.200 afhankelijk van de locatie op de begraafplaats. Het graf wordt nooit geruimd.',
  },
  {
    question: 'Kan ik grafrechten verlengen in Groningen?',
    answer:
      'Ja, bij de meeste begraafplaatsen kunt u grafrechten verlengen. De voorwaarden en kosten verschillen per begraafplaats. Op De Stille Hof kunt u per 10 jaar verlengen, bij De Walakker per 20 jaar.',
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
                <p className="text-2xl font-bold text-text-main">{formatCurrency(480)}</p>
                <p className="text-sm text-text-muted">vanaf (10 jaar)</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-warning-light p-3 rounded-xl">
                <Clock size={24} className="text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-main">10-99 jaar</p>
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
              <h3 className="text-lg font-semibold">Overzicht: Enkeldiep graf — 13 begraafplaatsen in 9 gemeenten</h3>
              <p className="text-slate-200 text-sm mt-1">Grafrechten (exclusief onderhoud) per begraafplaats, gesorteerd op prijs</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-3 text-left font-semibold text-text-main">Begraafplaats</th>
                    <th className="px-6 py-3 text-left font-semibold text-text-main">Gemeente</th>
                    <th className="px-6 py-3 text-left font-semibold text-text-main">Type</th>
                    <th className="px-6 py-3 text-right font-semibold text-text-main">Tarief</th>
                    <th className="px-6 py-3 text-right font-semibold text-text-main">Looptijd</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { naam: 'De Stille Hof', gemeente: 'Midden-Groningen', type: 'Gemeentelijk', tarief: 480, looptijd: '10 jaar', voordeligst: true },
                    { naam: 'Westerwolde', gemeente: 'Westerwolde', type: 'Gemeentelijk', tarief: 645, looptijd: '10 jaar', voordeligst: false },
                    { naam: 'Het Hogeland', gemeente: 'Het Hogeland', type: 'Gemeentelijk', tarief: 788, looptijd: '10 jaar', voordeligst: false },
                    { naam: 'De Stille Hof', gemeente: 'Midden-Groningen', type: 'Gemeentelijk', tarief: 960, looptijd: '20 jaar', voordeligst: false },
                    { naam: 'Eemsdelta', gemeente: 'Eemsdelta', type: 'Gemeentelijk', tarief: 977, looptijd: '10 jaar', voordeligst: false },
                    { naam: 'R.K. Kerkhof Hereweg', gemeente: 'Groningen', type: 'Kerkelijk', tarief: 1200, looptijd: '20 jaar', voordeligst: false },
                    { naam: 'Westerwolde', gemeente: 'Westerwolde', type: 'Gemeentelijk', tarief: 1932, looptijd: '30 jaar', voordeligst: false },
                    { naam: 'Westerkwartier', gemeente: 'Westerkwartier', type: 'Gemeentelijk', tarief: 2035, looptijd: '20 jaar', voordeligst: false },
                    { naam: 'Stadskanaal', gemeente: 'Stadskanaal', type: 'Gemeentelijk', tarief: 2176, looptijd: '25 jaar', voordeligst: false },
                    { naam: 'Het Hogeland', gemeente: 'Het Hogeland', type: 'Gemeentelijk', tarief: 2364, looptijd: '30 jaar', voordeligst: false },
                    { naam: 'Eemsdelta', gemeente: 'Eemsdelta', type: 'Gemeentelijk', tarief: 2442, looptijd: '30 jaar', voordeligst: false },
                    { naam: 'Selwerderhof', gemeente: 'Groningen', type: 'Gemeentelijk', tarief: 2667, looptijd: '30 jaar', voordeligst: false },
                    { naam: 'Pekela', gemeente: 'Pekela', type: 'Gemeentelijk', tarief: 2751, looptijd: '30 jaar', voordeligst: false },
                    { naam: 'Noorder-/Zuiderbegraafplaats', gemeente: 'Groningen', type: 'Gemeentelijk', tarief: 4001, looptijd: '30 jaar', voordeligst: false },
                    { naam: 'Hoogengraven', gemeente: 'Noordenveld', type: 'Natuur', tarief: 4500, looptijd: 'Eeuwig', voordeligst: false },
                    { naam: 'De Walakker', gemeente: 'Tynaarlo', type: 'Gemeentelijk', tarief: 5528, looptijd: '20 jaar', voordeligst: false },
                    { naam: 'Esserveld', gemeente: 'Groningen', type: 'Gemeentelijk', tarief: 8002, looptijd: '30 jaar', voordeligst: false },
                  ].map((row, i) => (
                    <tr key={i} className={`border-b border-border hover:bg-surface transition ${row.voordeligst ? 'bg-accent/5' : ''}`}>
                      <td className="px-6 py-3">
                        <span className="font-medium text-text-main">{row.naam}</span>
                        {row.voordeligst && <span className="ml-2 text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">Voordeligst</span>}
                      </td>
                      <td className="px-6 py-3 text-text-muted">{row.gemeente}</td>
                      <td className="px-6 py-3 text-text-muted">{row.type}</td>
                      <td className="px-6 py-3 text-right font-semibold text-text-main">{formatCurrency(row.tarief)}</td>
                      <td className="px-6 py-3 text-right text-text-muted">{row.looptijd}</td>
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
                <h4 className="font-semibold text-text-main mb-2">Belangrijkste inzichten</h4>
                <p className="text-text-muted">
                  De prijsverschillen zijn enorm: het goedkoopste graf (De Stille Hof, €480 voor 10 jaar) kost meer dan 16× minder dan het duurste (Esserveld, €8.002 voor 30 jaar).
                  Zelfs binnen de stad Groningen zijn de verschillen groot: Selwerderhof is 3× goedkoper dan Esserveld voor een vergelijkbaar graf.
                  Vergelijken loont dus zeker de moeite, ook als u al weet in welke gemeente u wilt begraven.
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
