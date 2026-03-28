import { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import FAQSchema from '@/components/FAQSchema';
import { BookOpen, Clock, Euro, FileText, RefreshCw, Shield, AlertTriangle, ArrowRight, Landmark, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Grafrechten Uitleg 2026 - Wat Zijn Grafrechten en Wat Kosten Ze?',
  description:
    'Alles over grafrechten in Nederland: wat zijn het, hoeveel kosten ze, hoe lang duren ze en hoe verleng je ze? Complete uitleg met actuele informatie.',
};

export const revalidate = 3600;

const faqItems = [
  {
    question: 'Wat zijn grafrechten?',
    answer:
      'Grafrechten zijn het exclusieve recht om een overledene te laten begraven in een bepaald graf op een begraafplaats. De grond blijft eigendom van de gemeente of beheerder — u krijgt een gebruiksrecht voor een bepaalde periode.',
  },
  {
    question: 'Hoe lang duren grafrechten?',
    answer:
      'Op gemeentelijke begraafplaatsen worden grafrechten meestal verleend voor 10 tot 30 jaar. Na afloop kunt u de grafrechten verlengen. Eeuwigdurende grafrechten worden vrijwel niet meer uitgegeven.',
  },
  {
    question: 'Wat is het verschil tussen een algemene en een bijzondere begraafplaats?',
    answer:
      'Een algemene (openbare) begraafplaats wordt beheerd door de gemeente en is toegankelijk voor iedereen. Een bijzondere (particuliere) begraafplaats wordt beheerd door bijvoorbeeld een kerk of stichting en kan specifieke voorwaarden hanteren.',
  },
  {
    question: 'Wat kost het om grafrechten te verlengen?',
    answer:
      'De kosten voor verlenging variëren per begraafplaats. Bij gemeente Groningen kost verlenging 1/3 van het actuele 30-jaar tarief per 10 jaar. Bij andere gemeenten gelden eigen tarieven.',
  },
  {
    question: 'Wat gebeurt er als ik de grafrechten niet verleng?',
    answer:
      'Als de grafrechten verlopen en niet worden verlengd, kan de begraafplaats het graf na een wachttijd (meestal 10 jaar na laatste bijzetting) ruimen. De stoffelijke resten worden dan herbegraven in een verzamelgraf.',
  },
  {
    question: 'Bestaan eeuwigdurende grafrechten nog?',
    answer:
      'Bijna alle gemeenten geven geen eeuwigdurende grafrechten meer uit. U kunt het nog tegenkomen bij oude graven (vaak van vóór ±1970–1990), historische of kerkelijke begraafplaatsen, en soms bij particuliere of bijzondere begraafplaatsen.',
  },
];

export default function GrafrechtenUitlegPage() {
  return (
    <>
      <PageHero
        title="Grafrechten Uitleg"
        badge="Informatie 2026"
        highlightedSubtitle="Alles wat u moet weten"
        subtitle="Wat zijn grafrechten, hoeveel kosten ze en hoe werkt verlenging? Een complete uitleg."
        showBreadcrumbs
        breadcrumbs={[{ label: 'Grafrechten uitleg', href: '/grafrechten-uitleg' }]}
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Wat is een grafrecht? */}
        <div className="prose prose-stone max-w-none mb-16">
          <h2 className="text-2xl font-bold text-text-main mb-4">Wat is een grafrecht?</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            De grond van een begraafplaats blijft altijd eigendom van de gemeente of beheerder. U krijgt als nabestaande alleen een <strong>gebruiksrecht</strong> — het grafrecht. Daarom spreekt men officieel van grafrecht, niet van eigendom.
          </p>
          <p className="text-text-muted leading-relaxed mb-4">
            In de praktijk lijkt grafrecht sterk op huren: u krijgt het recht om een graf te gebruiken voor een bepaalde periode (vaak 10 tot 30 jaar) en betaalt daarvoor een eenmalig bedrag. Na afloop kunt u het grafrecht verlengen of het graf laten vervallen.
          </p>
        </div>

        {/* Stappen uitleg */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {[
            {
              icon: Euro,
              title: 'Kosten grafrechten',
              text: 'De kosten variëren sterk per gemeente: van €480 (Midden-Groningen, 10 jaar) tot meer dan €11.000 (Esserveld Groningen, 30 jaar). De locatie, het type graf en de looptijd bepalen de prijs.',
            },
            {
              icon: Clock,
              title: 'Looptijd',
              text: 'U krijgt het grafrecht voor een vaste termijn, meestal 10, 20 of 30 jaar. Na afloop kunt u verlengen. Vrijwel alle gemeenten geven tegenwoordig alleen grafrechten voor een vaste termijn uit.',
            },
            {
              icon: RefreshCw,
              title: 'Verlenging',
              text: 'Na afloop kunt u grafrechten verlengen, meestal per 5, 10 of 20 jaar. De verlengingskosten zijn vaak een fractie van de oorspronkelijke grafrechten (bijv. 1/3 per 10 jaar).',
            },
            {
              icon: FileText,
              title: 'Onderhoud',
              text: 'Bij gemeentelijke begraafplaatsen is onderhoud meestal niet verplicht maar heeft u wel een onderhoudsplicht. Bij particuliere begraafplaatsen is onderhoud vaak verplicht en moet vooraf worden betaald.',
            },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-border rounded-2xl p-6">
              <div className="bg-primary-light p-3 rounded-xl w-fit mb-4">
                <item.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-semibold text-text-main mb-2">{item.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Eeuwigdurende grafrechten */}
        <div className="bg-white border border-border rounded-2xl p-6 mb-16">
          <h3 className="font-semibold text-text-main mb-3">Eeuwigdurende grafrechten</h3>
          <p className="text-text-muted text-sm leading-relaxed mb-3">
            Bijna alle gemeenten geven tegenwoordig geen eeuwigdurende grafrechten meer uit. Nieuwe graven worden vrijwel altijd uitgegeven voor een vaste termijn die u steeds kunt verlengen.
          </p>
          <p className="text-text-muted text-sm leading-relaxed">
            Eeuwigdurende grafrechten komt u nog wel tegen bij oude graven (vaak van vóór ±1970–1990), historische of kerkelijke begraafplaatsen, en soms bij particuliere of bijzondere begraafplaatsen.
          </p>
        </div>

        {/* Waarschuwing */}
        <div className="bg-warning-light border border-warning rounded-2xl p-6 mb-16">
          <div className="flex items-start gap-3">
            <AlertTriangle size={24} className="text-warning shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-text-main mb-2">Belangrijk om te weten</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                De kosten voor grafrechten zijn slechts een deel van de totale begrafeniskosten. Daarnaast betaalt u ook voor de grafdelving (het openen en sluiten van het graf), eventueel onderhoud, en de grafbedekking (gedenksteen). Deze site richt zich uitsluitend op grafrechten en onderhoudskosten, niet op de totale uitvaartkosten.
              </p>
            </div>
          </div>
        </div>

        {/* Soorten begraafplaatsen */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-text-main mb-4">Soorten begraafplaatsen in Nederland</h2>
          <p className="text-text-muted leading-relaxed mb-8">
            In hoofdlijnen zijn er in Nederland twee soorten begraafplaatsen: algemene (openbare) begraafplaatsen en bijzondere (particuliere) begraafplaatsen. Op deze website vergelijken we enkel de grafrechtkosten voor algemene (openbare) begraafplaatsen. Voor actuele tarieven van bijzondere begraafplaatsen dient u contact op te nemen met de beheerder van de betreffende begraafplaats.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Algemene begraafplaatsen */}
            <div className="bg-white border border-border rounded-2xl overflow-hidden">
              <div className="bg-primary p-5 flex items-center gap-3">
                <Landmark size={24} className="text-white" />
                <h3 className="text-lg font-semibold text-white">Algemene (openbare) begraafplaatsen</h3>
              </div>
              <div className="p-6">
                <p className="text-text-muted text-sm leading-relaxed mb-4">
                  Een gemeentelijke begraafplaats wordt beheerd door de gemeente en is voor iedereen toegankelijk.
                </p>
                <ul className="space-y-2 text-sm text-text-muted mb-5">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Beheer:</strong> door de gemeente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Toegankelijkheid:</strong> openbaar voor iedereen, ongeacht geloof</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Kosten:</strong> meestal lager dan particulier</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Grafrechten:</strong> u &quot;huurt&quot; het graf voor een bepaalde periode (bijv. 10, 20 of 30 jaar)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Regels:</strong> vastgesteld door de gemeente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Onderhoud:</strong> vaak (gedeeltelijk) door de gemeente geregeld</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Neutraal karakter, vaak verschillende delen (algemeen, kindergraven, urnenvelden)</span>
                  </li>
                </ul>
                <p className="text-xs text-text-muted italic">
                  Voorbeelden: algemene begraafplaatsen in dorpen en steden
                </p>
              </div>
            </div>

            {/* Bijzondere begraafplaatsen */}
            <div className="bg-white border border-border rounded-2xl overflow-hidden">
              <div className="bg-earth-mid p-5 flex items-center gap-3">
                <Building2 size={24} className="text-white" />
                <h3 className="text-lg font-semibold text-white">Bijzondere (particuliere) begraafplaatsen</h3>
              </div>
              <div className="p-6">
                <p className="text-text-muted text-sm leading-relaxed mb-4">
                  Een particuliere begraafplaats is in handen van een private organisatie, stichting of bijvoorbeeld een kerk.
                </p>
                <ul className="space-y-2 text-sm text-text-muted mb-5">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Beheer:</strong> door een stichting, kerk of particulier</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Toegankelijkheid:</strong> soms beperkter of met specifieke voorwaarden</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Kosten:</strong> vaak hoger, afhankelijk van locatie en exclusiviteit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Grafrechten:</strong> vaak flexibeler, soms zelfs eeuwigdurend</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Regels:</strong> bepaald door de eigenaar (bijv. religieuze voorschriften)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Sfeer:</strong> kan persoonlijker of thematisch zijn (bijv. natuur, religie)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Niet altijd volledig openbaar voor iedereen</span>
                  </li>
                </ul>
                <p className="text-xs text-text-muted italic">
                  Voorbeelden: kerkelijke begraafplaatsen, natuurbegraafplaatsen
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vergelijkingstabel */}
        <div className="bg-white border border-border rounded-2xl overflow-hidden mb-16">
          <div className="bg-primary text-white p-6">
            <h3 className="text-lg font-semibold">Belangrijkste verschillen in één oogopslag</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-left font-semibold text-text-main">Kenmerk</th>
                  <th className="px-6 py-3 text-left font-semibold text-text-main">Gemeentelijk (algemeen)</th>
                  <th className="px-6 py-3 text-left font-semibold text-text-main">Particulier (bijzonder)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Beheer', 'Gemeente', 'Privé / stichting / kerk'],
                  ['Kosten', 'Lager', 'Vaak hoger'],
                  ['Regels', 'Vast (gemeente)', 'Flexibeler / eigen regels'],
                  ['Grafduur', 'Tijdelijk (verlengbaar)', 'Soms langdurig / onbeperkt'],
                  ['Onderhoud', 'Vaak optioneel', 'Vaak verplicht'],
                  ['Toegankelijkheid', 'Voor iedereen', 'Soms beperkter'],
                ].map(([kenmerk, gemeentelijk, particulier]) => (
                  <tr key={kenmerk} className="border-b border-border hover:bg-surface transition">
                    <td className="px-6 py-3 font-medium text-text-main">{kenmerk}</td>
                    <td className="px-6 py-3 text-text-muted">{gemeentelijk}</td>
                    <td className="px-6 py-3 text-text-muted">{particulier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-semibold hover:bg-primary-dark hover:shadow-xl transition-all"
          >
            Vergelijk grafrechtkosten
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <FAQSchema items={faqItems} />
    </>
  );
}
