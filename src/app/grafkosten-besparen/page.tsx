import { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import FAQSchema from '@/components/FAQSchema';
import { Lightbulb, ArrowRight, PiggyBank, Clock, MapPin, Scale } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Grafkosten Besparen - 8 Tips om te Besparen op Grafrechten',
  description:
    'Praktische tips om te besparen op grafrechten en begraafkosten. Vergelijk gemeenten, kies de juiste looptijd en type graf. Bespaar tot duizenden euro\'s.',
};

const tips = [
  {
    icon: MapPin,
    titel: 'Vergelijk verschillende gemeenten',
    tekst: 'De prijsverschillen tussen gemeenten zijn enorm. In de provincie Groningen varieert een enkeldiep graf van €480 (Midden-Groningen) tot €8.002 (Esserveld, Groningen) voor vergelijkbare perioden. U bent niet verplicht om te begraven in uw eigen gemeente — vergelijken loont.',
    besparing: 'Tot €7.500 verschil',
  },
  {
    icon: Clock,
    titel: 'Kies een kortere looptijd',
    tekst: 'U hoeft niet meteen voor 30 of 50 jaar grafrechten te kiezen. Bij veel gemeenten kunt u starten met 10 of 20 jaar en later verlengen. Dit spreidt de kosten en u betaalt alleen voor de periode die u daadwerkelijk gebruikt.',
    besparing: 'Tot 60% besparing',
  },
  {
    icon: Scale,
    titel: 'Overweeg een algemeen graf',
    tekst: 'Een algemeen graf is aanzienlijk goedkoper dan een particulier (eigen) graf. Het nadeel is dat u geen zeggenschap heeft over wie er nog meer in het graf begraven wordt, en het graf kan na de grafrusttermijn geruimd worden. Voor wie vooral de kosten wil beperken is dit een optie.',
    besparing: 'Tot 70% goedkoper',
  },
  {
    icon: PiggyBank,
    titel: 'Kies voor crematie + urnengraf',
    tekst: 'Een urnengraf is gemiddeld 40-60% goedkoper dan een regulier graf. Crematie gevolgd door bijzetting in een urnentuin of urnenmuur is financieel een stuk voordeliger. Op De Stille Hof in Hoogezand kost een urnengraf slechts €158 voor 10 jaar.',
    besparing: 'Tot 60% goedkoper',
  },
  {
    icon: Lightbulb,
    titel: 'Let op de totaalkosten inclusief onderhoud',
    tekst: 'Een begraafplaats met lage grafrechten maar verplicht duur onderhoud kan uiteindelijk duurder uitvallen. Reken altijd de totaalkosten uit: grafrechten + onderhoud + grafdelving + grafbedekking. Ons vergelijkingstool berekent dit automatisch.',
    besparing: 'Voorkom verborgen kosten',
  },
  {
    icon: Lightbulb,
    titel: 'Onderhandel bij particuliere begraafplaatsen',
    tekst: 'Bij kerkelijke en particuliere begraafplaatsen zijn de tarieven niet altijd in steen gebeiteld. Vraag naar mogelijke kortingen, betaalregelingen of combinatiepakketten. Als lid van de kerkgemeenschap kunt u soms gunstigere tarieven krijgen.',
    besparing: 'Onderhandelbaar',
  },
  {
    icon: Lightbulb,
    titel: 'Overweeg een natuurbegraafplaats',
    tekst: 'Hoewel de initiële kosten hoger lijken (€4.500-€9.200), biedt een natuurbegraafplaats eeuwig grafrecht én geen onderhoudskosten. Over een periode van 50+ jaar kan dit voordeliger zijn dan een gemeentelijk graf met herhaalde verlengingen.',
    besparing: 'Voordelig op lange termijn',
  },
  {
    icon: Lightbulb,
    titel: 'Sluit een uitvaartverzekering af',
    tekst: 'Een uitvaartverzekering dekt (een deel van) de grafkosten. Hoe jonger u de verzekering afsluit, hoe lager de premie. Vergelijk natura-verzekeringen (uitvaart in natura) met sommenverzekeringen (geldbedrag). Let op de dekking voor grafrechten.',
    besparing: 'Spreidt de kosten',
  },
];

const faqItems = [
  {
    question: 'Mag ik begraven worden in een andere gemeente?',
    answer:
      'Ja, u bent vrij om te kiezen op welke begraafplaats u begraven wordt, ongeacht uw woonplaats. Sommige gemeenten rekenen wel een hoger tarief voor niet-inwoners, maar dit verschilt per gemeente. Vergelijken kan dus zeker lonen.',
  },
  {
    question: 'Wat gebeurt er als ik de grafrechten niet verleng?',
    answer:
      'Als u de grafrechten niet verlengt en de grafrusttermijn is verstreken, kan de gemeente het graf ruimen. De gemeente is verplicht u minimaal één jaar van tevoren te waarschuwen. Stoffelijke resten worden herbegraven in een verzamelgraf.',
  },
  {
    question: 'Zijn grafkosten aftrekbaar van de belasting?',
    answer:
      'Grafkosten zijn in principe niet fiscaal aftrekbaar. De kosten van een uitvaart kunnen onder bepaalde voorwaarden als bijzondere last worden opgevoerd, maar alleen het deel dat niet door een verzekering wordt gedekt en dat boven een bepaalde drempel uitkomt.',
  },
];

export default function GrafkostenBesparenPage() {
  return (
    <>
      <PageHero
        title="Grafkosten besparen"
        badge="8 tips"
        highlightedSubtitle="Zo bespaart u op grafrechten"
        subtitle="Praktische tips en strategieën om de kosten van begraven te beperken, zonder in te leveren op een waardige laatste rustplaats."
        showBreadcrumbs
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Grafkosten besparen', href: '/grafkosten-besparen' },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((tip, i) => (
            <div key={i} className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-primary-light p-3 rounded-xl flex-shrink-0">
                  <tip.icon size={24} className="text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-text-main text-lg">{tip.titel}</h3>
                  </div>
                  <p className="text-text-muted mb-3 leading-relaxed">{tip.tekst}</p>
                  <div className="inline-flex items-center gap-1 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                    <PiggyBank size={14} />
                    {tip.besparing}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-stone-900 to-stone-800 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Vergelijk nu de grafkosten in uw regio
          </h2>
          <p className="text-stone-300 max-w-2xl mx-auto mb-8">
            Gebruik ons gratis vergelijkingstool om de grafkosten in uw provincie te vergelijken. Filter op type graf, looptijd en inclusief of exclusief onderhoud.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/provincie/groningen"
              className="inline-flex items-center gap-2 bg-white text-stone-900 px-6 py-3 rounded-xl font-semibold hover:bg-stone-100 transition"
            >
              Groningen vergelijken <ArrowRight size={18} />
            </Link>
            <Link
              href="/provincie/drenthe"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition"
            >
              Drenthe vergelijken <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <FAQSchema items={faqItems} />
    </>
  );
}
