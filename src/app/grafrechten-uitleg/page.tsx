import { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import FAQSchema from '@/components/FAQSchema';
import { BookOpen, Clock, Euro, FileText, RefreshCw, Shield, AlertTriangle, ArrowRight } from 'lucide-react';

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
      'Grafrechten zijn het exclusieve recht om een overledene te laten begraven in een bepaald graf op een begraafplaats. Dit recht wordt verleend voor een bepaalde periode en kan daarna verlengd worden.',
  },
  {
    question: 'Hoe lang duren grafrechten?',
    answer:
      'Op gemeentelijke begraafplaatsen worden grafrechten meestal verleend voor 10 tot 30 jaar. Bij particuliere begraafplaatsen zijn langere periodes mogelijk, tot 80 jaar. Op natuurbegraafplaatsen geldt vaak eeuwig grafrecht.',
  },
  {
    question: 'Wat is het verschil tussen een particulier graf en een algemeen graf?',
    answer:
      'Bij een particulier graf heeft u exclusief recht op het graf en bepaalt u wie er begraven wordt. Bij een algemeen graf bepaalt de begraafplaats de locatie en kunnen er na verloop van tijd ook anderen begraven worden.',
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
    question: 'Zijn grafrechten overdraagbaar?',
    answer:
      'Ja, grafrechten kunnen worden overgedragen aan een nabestaande. Dit moet schriftelijk worden vastgelegd bij de begraafplaats. Er kunnen administratiekosten aan verbonden zijn.',
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
        {/* Introductie */}
        <div className="prose prose-stone max-w-none mb-12">
          <h2 className="text-2xl font-bold text-text-main mb-4">Wat zijn grafrechten?</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Grafrechten geven u het exclusieve recht om een overledene te laten begraven in een specifiek graf op een begraafplaats.
            U koopt hiermee niet het stukje grond, maar het recht om het graf voor een bepaalde periode te gebruiken.
            Na afloop van die periode kunt u de grafrechten verlengen.
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
              text: 'Gemeentelijke begraafplaatsen verlenen grafrechten voor 10-30 jaar. Particuliere begraafplaatsen bieden vaak langere termijnen (40-80 jaar). Natuurbegraafplaatsen geven eeuwig grafrecht.',
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

        {/* Vergelijking soorten */}
        <div className="bg-white border border-border rounded-2xl overflow-hidden mb-16">
          <div className="bg-primary text-white p-6">
            <h3 className="text-lg font-semibold">Vergelijking: soorten graven</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-left font-semibold text-text-main">Kenmerk</th>
                  <th className="px-6 py-3 text-left font-semibold text-text-main">Particulier graf</th>
                  <th className="px-6 py-3 text-left font-semibold text-text-main">Algemeen graf</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Keuze locatie', 'Ja, u kiest zelf', 'Nee, wordt toegewezen'],
                  ['Bijzettingen', 'Meerdere mogelijk', 'Meestal 1 persoon'],
                  ['Verlenging', 'Ja, na afloop', 'Meestal niet'],
                  ['Grafbedekking', 'Eigen keuze', 'Beperkte opties'],
                  ['Kosten', 'Hoger', 'Lager'],
                  ['Overdraagbaar', 'Ja', 'Nee'],
                ].map(([kenmerk, particulier, algemeen]) => (
                  <tr key={kenmerk} className="border-b border-border hover:bg-surface transition">
                    <td className="px-6 py-3 font-medium text-text-main">{kenmerk}</td>
                    <td className="px-6 py-3 text-text-muted">{particulier}</td>
                    <td className="px-6 py-3 text-text-muted">{algemeen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/provincie/groningen"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-semibold hover:bg-primary-dark hover:shadow-xl transition-all"
          >
            Vergelijk grafkosten in Groningen
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <FAQSchema items={faqItems} />
    </>
  );
}
