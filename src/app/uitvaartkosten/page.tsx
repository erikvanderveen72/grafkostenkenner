import { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import FAQSchema from '@/components/FAQSchema';
import UitvaartCalculator from '@/components/UitvaartCalculator';
import {
  Euro,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Landmark,
  Users,
  Flower2,
  Church,
  Scale,
  Percent,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Wat Kost een Uitvaart in 2026? Compleet Kostenoverzicht',
  description:
    'Wat kost een uitvaart in Nederland? Bekijk de totale kosten: grafrechten, begraven, onderhoud en uitvaartverzorger. Gemiddeld €8.000 - €12.000. Bereken uw kosten.',
};

export const revalidate = 3600;

const faqItems = [
  {
    question: 'Wat kost een uitvaart gemiddeld in Nederland?',
    answer:
      'De gemiddelde totale kosten van een uitvaart in Nederland liggen tussen €8.000 en €12.000. Dit is inclusief de uitvaartverzorger, grafrechten, begraven of crematie, en overige kosten. Een crematie (€7.500 - €9.500) is gemiddeld goedkoper dan een begrafenis (€9.000 - €12.000).',
  },
  {
    question: 'Waaruit bestaan de kosten van een begrafenis?',
    answer:
      'De kosten bestaan uit: grafrechten (recht op een graf, €1.000 - €8.000+), begraafkosten/grafdelving (€500 - €1.200), onderhoud (€50 - €150/jaar), het aannametarief van de uitvaartverzorger (€1.500 - €2.800), verzorging en vervoer (€1.125 - €1.500), opbaring (€400 - €1.200) en een kist (€600 - €5.000+).',
  },
  {
    question: 'Wat is het verschil in kosten tussen begraven en cremeren?',
    answer:
      'Crematie is gemiddeld €1.500 tot €3.000 goedkoper dan begraven. Bij crematie betaalt u geen langdurige grafrechten of onderhoud. De crematie zelf kost €500 - €900, plus eventueel een urn (€50 - €500) en bijzetting in een urnengraf of columbarium.',
  },
  {
    question: 'Waarom verschillen de grafkosten zo sterk per gemeente?',
    answer:
      'De prijsverschillen (tot meer dan 700%) worden veroorzaakt door lokale marktomstandigheden, grondprijzen en gemeentelijk beleid. Gemeenten stellen zelf hun tarieven vast in de legesverordening. Er is geen landelijke maximumprijs voor grafrechten.',
  },
  {
    question: 'Wat zijn verborgen kosten bij een begrafenis?',
    answer:
      'Verborgen kosten zijn onder meer: onderhoudskosten (vaak verplicht bij kerkelijke begraafplaatsen), grafbedekking/monument (€500 - €5.000), toeslagen voor begraven op zaterdag (+25%), kosten voor het overschrijven van grafrechten, en eventuele verlengingskosten na afloop van de termijn.',
  },
  {
    question: 'Moet ik een uitvaartverzekering afsluiten?',
    answer:
      'Een uitvaartverzekering is niet verplicht, maar kan helpen om de kosten te spreiden. Let op: vergelijkingssites voor uitvaartverzekeringen mogen wettelijk geen provisie ontvangen per afgesloten polis (provisieverbod sinds 2013). Vergelijk daarom altijd onafhankelijk.',
  },
];

const kostenOpbouw = [
  {
    categorie: 'Grafrechten',
    omschrijving: 'Recht op een grafplaats (10-30 jaar)',
    vanPrijs: 1000,
    totPrijs: 8000,
    toelichting: 'Sterk afhankelijk van gemeente en type begraafplaats',
    icon: Landmark,
    color: 'bg-slate-100 text-slate-700',
  },
  {
    categorie: 'Begraafkosten (grafdelving)',
    omschrijving: 'Het delven en dichten van het graf',
    vanPrijs: 500,
    totPrijs: 1200,
    toelichting: 'Toeslag voor zaterdag (+25%) bij veel gemeenten',
    icon: Flower2,
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    categorie: 'Uitvaartverzorger',
    omschrijving: 'Aannametarief, coördinatie en organisatie',
    vanPrijs: 1500,
    totPrijs: 2800,
    toelichting: 'Vast bedrag, onafhankelijk van de uitvaart',
    icon: Users,
    color: 'bg-blue-100 text-blue-700',
  },
  {
    categorie: 'Verzorging & vervoer',
    omschrijving: 'Laatste verzorging en overbrenging',
    vanPrijs: 1125,
    totPrijs: 1500,
    toelichting: 'Incl. opbaring thuis (€400-€700) of rouwcentrum (€600-€1.200)',
    icon: Church,
    color: 'bg-amber-100 text-amber-700',
  },
  {
    categorie: 'Kist',
    omschrijving: 'Van eenvoudig populierenhout tot luxe',
    vanPrijs: 600,
    totPrijs: 5000,
    toelichting: 'Grootste spreiding in kosten; eenvoudig is prima',
    icon: Scale,
    color: 'bg-purple-100 text-purple-700',
  },
  {
    categorie: 'Onderhoud graf',
    omschrijving: 'Jaarlijks onderhoud gedurende looptijd',
    vanPrijs: 50,
    totPrijs: 150,
    toelichting: 'Per jaar. Bij 20 jaar = €1.000 - €3.000 totaal',
    icon: Percent,
    color: 'bg-rose-100 text-rose-700',
  },
];

function formatCurrency(bedrag: number): string {
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(bedrag);
}

export default function UitvaartKostenPage() {
  return (
    <>
      <PageHero
        title="Wat Kost een Uitvaart?"
        badge="Kostenoverzicht 2026"
        highlightedSubtitle="Compleet overzicht van alle kosten"
        subtitle="Van grafrechten tot uitvaartverzorger: ontdek waar u op moet letten en bereken de totale kosten."
        showBreadcrumbs
        breadcrumbs={[{ label: 'Uitvaartkosten', href: '/uitvaartkosten' }]}
      />

      {/* Intro + marktcijfers */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="prose prose-stone max-w-none">
          <p className="text-lg text-stone-600 leading-relaxed">
            De kosten van een uitvaart worden door bijna 40% van de Nederlanders structureel te laag ingeschat.
            De werkelijke kosten liggen gemiddeld tussen de <strong>€8.000 en €12.000</strong>, afhankelijk van
            de keuzes die u maakt. Bovendien verschilt de prijs van grafrechten tot meer dan 700% tussen gemeenten —
            een particulier graf varieert van €861 tot meer dan €8.895 afhankelijk van de locatie.
          </p>
        </div>

        {/* Statistieken grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {[
            { waarde: '€8.000 - €12.000', label: 'Gemiddelde uitvaartkosten', icon: Euro, kleur: 'bg-emerald-50 text-emerald-600' },
            { waarde: '> 700%', label: 'Prijsvariatie grafrechten', icon: TrendingUp, kleur: 'bg-amber-50 text-amber-600' },
            { waarde: '40%', label: 'Onderschat de kosten', icon: AlertTriangle, kleur: 'bg-rose-50 text-rose-600' },
            { waarde: '90%', label: 'Uitvaartverzorgers deelt geen prijs', icon: Scale, kleur: 'bg-blue-50 text-blue-600' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-stone-200 rounded-2xl p-5 text-center"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${stat.kleur}`}>
                <stat.icon size={22} />
              </div>
              <p className="text-xl font-bold text-stone-900">{stat.waarde}</p>
              <p className="text-sm text-stone-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Kostenopbouw */}
      <section className="bg-stone-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-stone-900 mb-3">Kostenopbouw van een begrafenis</h2>
          <p className="text-stone-600 mb-10 max-w-2xl">
            Een grafprijs is geen enkelvoudig bedrag. De totale kosten bestaan uit grafrechten, begraafkosten,
            de uitvaartverzorger en onderhoud. Hieronder vindt u een overzicht van alle kostenposten.
          </p>

          <div className="space-y-4">
            {kostenOpbouw.map((item) => (
              <div
                key={item.categorie}
                className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl shrink-0 ${item.color}`}>
                    <item.icon size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-stone-900">{item.categorie}</h3>
                      <span className="text-lg font-bold text-primary whitespace-nowrap">
                        {formatCurrency(item.vanPrijs)} – {formatCurrency(item.totPrijs)}
                      </span>
                    </div>
                    <p className="text-stone-600 text-sm">{item.omschrijving}</p>
                    <p className="text-stone-400 text-xs mt-1">{item.toelichting}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Totaal */}
          <div className="mt-6 bg-gradient-to-r from-stone-900 to-stone-800 rounded-2xl p-6 text-white">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-stone-400 text-sm font-medium">Totale kosten begrafenis (indicatief)</p>
                <p className="text-2xl sm:text-3xl font-bold mt-1">€4.775 – €18.700+</p>
              </div>
              <div className="text-sm text-stone-400 text-right">
                <p>Crematie: €7.500 – €9.500</p>
                <p>Begrafenis: €9.000 – €12.000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voorbeeld Waddinxveen */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h2 className="text-3xl font-bold text-stone-900 mb-3">Voorbeeld: kostenopbouw gemeente Waddinxveen</h2>
        <p className="text-stone-600 mb-8 max-w-2xl">
          De legesverordening van een gemeente laat zien hoe complex de kosten zijn opgebouwd.
          Hieronder een concreet voorbeeld op basis van de verordening lijkbezorgingsrechten.
        </p>

        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold text-stone-700">Onderdeel</th>
                  <th className="text-left px-5 py-3 font-semibold text-stone-700">Specifieke dienst</th>
                  <th className="text-right px-5 py-3 font-semibold text-stone-700">Tarief</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {[
                  { cat: 'Grafrechten', dienst: 'Particulier zandgraf (20 jaar)', tarief: '€2.212' },
                  { cat: 'Grafrechten', dienst: 'Particulier keldergraf (20 jaar)', tarief: '€3.224' },
                  { cat: 'Grafrechten', dienst: 'Verlenging (10 jaar)', tarief: '€806' },
                  { cat: 'Begraafkosten', dienst: 'Persoon > 12 jaar', tarief: '€1.062' },
                  { cat: 'Begraafkosten', dienst: 'Kind < 12 jaar', tarief: '€531' },
                  { cat: 'Begraafkosten', dienst: 'Toeslag zaterdag (+25%)', tarief: '€266' },
                  { cat: 'Onderhoud', dienst: 'Particulier zandgraf (20 jaar)', tarief: '€1.620' },
                  { cat: 'Onderhoud', dienst: 'Urnenplaats (20 jaar)', tarief: '€506' },
                  { cat: 'Asbezorging', dienst: 'Plaatsen urn', tarief: '€486' },
                  { cat: 'Asbezorging', dienst: 'Verstrooien as', tarief: '€162' },
                  { cat: 'Diversen', dienst: 'Overboeken grafrecht', tarief: '€35' },
                ].map((rij, i) => (
                  <tr key={i} className="hover:bg-stone-50 transition-colors">
                    <td className="px-5 py-3 text-stone-500 font-medium">{rij.cat}</td>
                    <td className="px-5 py-3 text-stone-800">{rij.dienst}</td>
                    <td className="px-5 py-3 text-right font-semibold text-stone-900">{rij.tarief}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-primary/5 border-t-2 border-primary">
                <tr>
                  <td className="px-5 py-3 font-bold text-stone-900" colSpan={2}>
                    Totaal (grafrecht + begraven + onderhoud, 20 jaar)
                  </td>
                  <td className="px-5 py-3 text-right font-bold text-primary text-lg">€4.894</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="px-5 py-3 bg-amber-50 border-t border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>Let op:</strong> Zonder onderhoudskosten en begraafkosten zou u denken dat een graf slechts €2.212 kost.
              De werkelijke minimale verplichting is €4.894. Vergelijk daarom altijd de totaalprijs.
            </p>
          </div>
        </div>
      </section>

      {/* Begraven vs Crematie */}
      <section className="bg-stone-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-stone-900 mb-3">Begraven vs. crematie: kostenvergelijking</h2>
          <p className="text-stone-600 mb-10 max-w-2xl">
            De groeiende populariteit van crematies wordt mede gedreven door de lagere kosten en het ontbreken
            van langdurige grafrechten.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Begraven */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-stone-100 rounded-xl">
                  <Landmark size={24} className="text-stone-700" />
                </div>
                <h3 className="text-xl font-bold text-stone-900">Begrafenis</h3>
              </div>
              <p className="text-3xl font-bold text-stone-900 mb-2">€9.000 – €12.000</p>
              <p className="text-sm text-stone-500 mb-4">Gemiddelde totaalkosten</p>
              <ul className="space-y-2 text-sm text-stone-600">
                <li className="flex items-start gap-2">
                  <span className="text-stone-400 mt-0.5">•</span>
                  <span>Grafrechten voor 20-30 jaar nodig</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-stone-400 mt-0.5">•</span>
                  <span>Jaarlijks onderhoud (€50 - €150/jaar)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-stone-400 mt-0.5">•</span>
                  <span>Verlengingskosten na afloop termijn</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-stone-400 mt-0.5">•</span>
                  <span>Grafmonument extra (€500 - €5.000)</span>
                </li>
              </ul>
            </div>

            {/* Crematie */}
            <div className="bg-white border border-emerald-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <Flower2 size={24} className="text-emerald-700" />
                </div>
                <h3 className="text-xl font-bold text-stone-900">Crematie</h3>
              </div>
              <p className="text-3xl font-bold text-emerald-700 mb-2">€7.500 – €9.500</p>
              <p className="text-sm text-stone-500 mb-4">Gemiddelde totaalkosten</p>
              <ul className="space-y-2 text-sm text-stone-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  <span>Geen langdurige grafrechten nodig</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  <span>Crematie zelf: €500 - €900</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  <span>Urn bijzetten: €150 - €500</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  <span>Asverstrooiing ook mogelijk</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TCO Calculator */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h2 className="text-3xl font-bold text-stone-900 mb-3">Bereken uw totale uitvaartkosten</h2>
        <p className="text-stone-600 mb-8 max-w-2xl">
          Gebruik onze calculator om een realistische inschatting te maken van de totale kosten.
          Alle bedragen zijn indicatief op basis van landelijke gemiddelden.
        </p>
        <UitvaartCalculator />
      </section>

      {/* Provisieverbod sectie */}
      <section className="bg-stone-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-stone-900 mb-3">Onafhankelijk vergelijken: het provisieverbod</h2>
          <p className="text-stone-600 mb-8 max-w-2xl">
            Sinds 2013 geldt in Nederland een wettelijk provisieverbod voor financiële producten, waaronder
            uitvaartverzekeringen. Dit heeft gevolgen voor hoe vergelijkingssites werken.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-red-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-red-700 mb-3">Niet toegestaan</h3>
              <ul className="space-y-2 text-sm text-stone-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">✗</span>
                  <span>Provisie per afgesloten uitvaartverzekering</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">✗</span>
                  <span>Beloning gekoppeld aan premie of poliswaarde</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">✗</span>
                  <span>Doorsturen klantgegevens naar verzekeraar voor vergoeding</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-emerald-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-emerald-700 mb-3">Wel toegestaan</h3>
              <ul className="space-y-2 text-sm text-stone-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  <span>Vaste advertentiekosten (banners) zonder bemiddeling</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  <span>Leadvergoeding voor uitvaartverzorgers (niet-financieel)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  <span>Onafhankelijke tariefvergelijking op basis van openbare data</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="text-sm text-stone-500 mt-6">
            Grafkostenkenner.nl is 100% onafhankelijk. Wij ontvangen geen provisie van verzekeraars of
            uitvaartondernemers. Onze vergelijkingen zijn gebaseerd op openbare gemeentelijke verordeningen (Artikel 11 Auteurswet).
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <h2 className="text-3xl font-bold text-stone-900 mb-4">Vergelijk grafkosten in uw regio</h2>
        <p className="text-stone-600 max-w-xl mx-auto mb-8">
          Nu u weet waaruit de kosten bestaan, kunt u gericht vergelijken. Bekijk de tarieven per provincie.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/provincie/groningen"
            className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-semibold hover:bg-primary-dark hover:shadow-xl transition-all"
          >
            Vergelijk in Groningen
            <ArrowRight size={20} />
          </Link>
          <Link
            href="/grafkosten-besparen"
            className="inline-flex items-center justify-center gap-2 bg-stone-100 text-stone-700 px-8 py-4 rounded-2xl font-semibold hover:bg-stone-200 transition-all"
          >
            Bekijk bespaartips
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-stone-50 py-8">
        <FAQSchema items={faqItems} />
      </section>
    </>
  );
}
