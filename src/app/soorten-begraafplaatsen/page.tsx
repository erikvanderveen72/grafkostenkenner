import { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import FAQSchema from '@/components/FAQSchema';
import { Landmark, Church, Trees, Building2, Waves, Users, Shield, Clock, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Soorten Begraafplaatsen in Nederland 2026 - Overzicht & Kosten',
  description:
    'Overzicht van alle soorten begraafplaatsen in Nederland: gemeentelijk, kerkelijk, natuur, islamitisch, joods, urnen en zee. Vergelijk kosten en voorwaarden.',
};

export const revalidate = 3600;

const soorten = [
  {
    icon: Landmark,
    title: 'Algemene (gemeentelijke) begraafplaatsen',
    color: 'from-slate-50 to-slate-100',
    textColor: 'text-slate-700',
    beschrijving:
      'Beheerd door de gemeente en toegankelijk voor iedereen, ongeacht geloof of achtergrond. De tarieven zijn vastgelegd in de gemeentelijke legesverordening en zijn openbaar.',
    kenmerken: [
      'Tarieven transparant en openbaar',
      'Grafrechten voor 10-30 jaar, daarna verlengbaar',
      'Onderhoud meestal niet verplicht (wel onderhoudsplicht)',
      'Toegankelijk voor alle inwoners',
    ],
    kosten: 'Grafrechten variëren van €480 tot €11.203 voor 30 jaar, afhankelijk van gemeente en type graf.',
  },
  {
    icon: Church,
    title: 'Kerkelijke (bijzondere) begraafplaatsen',
    color: 'from-amber-50 to-amber-100',
    textColor: 'text-amber-700',
    beschrijving:
      'Beheerd door kerkgenootschappen, parochies of stichtingen. De tarieven worden door de eigenaar bepaald en zijn vaak niet publiek beschikbaar.',
    kenmerken: [
      'Tarieven op aanvraag (niet altijd openbaar)',
      'Onderhoud vaak verplicht',
      'Langere looptijden mogelijk (40-80 jaar)',
      'Soms lagere tarieven dan gemeentelijk',
    ],
    kosten: 'Indicatie: €1.200-€5.000 voor 20-30 jaar grafrechten, plus verplicht onderhoud.',
  },
  {
    icon: Trees,
    title: 'Natuurbegraafplaatsen',
    color: 'from-emerald-50 to-emerald-100',
    textColor: 'text-emerald-700',
    beschrijving:
      'Gericht op duurzaamheid en respect voor de natuur. De overledene wordt begraven in een biologisch afbreekbare kist zonder grafmonument. De natuur neemt het graf op.',
    kenmerken: [
      'Eeuwige grafrust (graf wordt nooit geruimd)',
      'Geen grafmonument - natuur neemt het over',
      'Geen onderhoudskosten',
      'Biologisch afbreekbare materialen verplicht',
    ],
    kosten: 'Eenmalig €2.400-€9.200 inclusief eeuwig grafrecht. Geen jaarlijkse kosten.',
  },
  {
    icon: Building2,
    title: 'Islamitische en Joodse begraafplaatsen',
    color: 'from-blue-50 to-blue-100',
    textColor: 'text-blue-700',
    beschrijving:
      'Ingericht volgens religieuze voorschriften. Bij de islam en het jodendom geldt dat een graf niet mag worden geruimd, daarom is eeuwige grafrust gebruikelijk.',
    kenmerken: [
      'Eeuwige grafrust (religieus voorschrift)',
      'Specifieke ligging en oriëntatie van het graf',
      'Rituele wassing en begrafenis',
      'Beperkt beschikbaar in Nederland',
    ],
    kosten: 'Variërend per locatie. Eeuwig grafrecht is gebruikelijk, wat de eenmalige kosten verhoogt.',
  },
  {
    icon: Users,
    title: 'Urnenbegraafplaatsen en columbaria',
    color: 'from-purple-50 to-purple-100',
    textColor: 'text-purple-700',
    beschrijving:
      'Voor het bijzetten van urnen na crematie. Een urnengraf is een kleiner graf in de grond, een urnennis is een ruimte in een urnenmuur (columbarium).',
    kenmerken: [
      'Goedkoper dan een regulier graf',
      'Urnengraf in de grond of nis in urnenmuur',
      'Kortere en langere looptijden beschikbaar (5-50 jaar)',
      'Beschikbaar op veel begraafplaatsen',
    ],
    kosten: 'Urnengraf vanaf €158 (10 jaar). Urnennis (columbarium) vanaf €640 (10 jaar).',
  },
  {
    icon: Waves,
    title: 'Zeebegraafplaatsen',
    color: 'from-cyan-50 to-cyan-100',
    textColor: 'text-cyan-700',
    beschrijving:
      'Asverstrooiing op zee of in aangewezen wateren. Dit kan op volle zee, op de Waddenzee, op het IJsselmeer of in een rivier. Een speciale vergunning is nodig.',
    kenmerken: [
      'Geen grafrechten nodig',
      'Geen onderhoudskosten',
      'Speciale vergunning vereist',
      'Kosten voor de asverstrooiingsdienst',
    ],
    kosten: 'Kosten voor asverstrooiing op zee: €500-€2.500 inclusief vaart en ceremonie.',
  },
];

const faqItems = [
  {
    question: 'Wat is het verschil tussen een gemeentelijke en particuliere begraafplaats?',
    answer:
      'Gemeentelijke begraafplaatsen zijn openbaar en hebben transparante tarieven via de legesverordening. Particuliere begraafplaatsen (kerkelijk, stichting) bepalen zelf hun tarieven, die vaak niet publiek beschikbaar zijn.',
  },
  {
    question: 'Wat is eeuwige grafrust en waar is dat mogelijk?',
    answer:
      'Eeuwige grafrust betekent dat het graf nooit wordt geruimd. Dit is standaard op natuurbegraafplaatsen en islamitische/joodse begraafplaatsen. Op gemeentelijke begraafplaatsen is het meestal niet mogelijk.',
  },
  {
    question: 'Welk type begraafplaats is het goedkoopst?',
    answer:
      'Urnengraven zijn over het algemeen het goedkoopst (vanaf €158 voor 10 jaar). Gemeentelijke begraafplaatsen in kleinere gemeenten zijn vaak voordeliger dan in grote steden. Natuurbegraafplaatsen zijn eenmalig duurder maar hebben geen jaarlijkse kosten.',
  },
  {
    question: 'Mag ik zelf kiezen op welke begraafplaats ik begraven word?',
    answer:
      'Ja, u mag in principe kiezen op welke begraafplaats u begraven wilt worden, ook buiten uw eigen gemeente. De kosten kunnen dan wel hoger zijn (niet-inwonertarief).',
  },
  {
    question: 'Wat gebeurt er als de grafrechten verlopen?',
    answer:
      'Na afloop van de grafrechten kunt u deze meestal verlengen. Als u niet verlengt, kan de begraafplaats het graf na een wachttijd ruimen. De grafbedekking wordt verwijderd en de resten worden herbegraven in een verzamelgraf.',
  },
];

export default function SoortenBegraafplaatsenPage() {
  return (
    <>
      <PageHero
        title="Soorten Begraafplaatsen"
        badge="Overzicht Nederland"
        highlightedSubtitle="Typen, kosten en voorwaarden"
        subtitle="Nederland kent verschillende soorten begraafplaatsen, elk met eigen tarieven, voorwaarden en kenmerken."
        showBreadcrumbs
        breadcrumbs={[{ label: 'Soorten begraafplaatsen', href: '/soorten-begraafplaatsen' }]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="space-y-8">
          {soorten.map((soort) => (
            <div
              key={soort.title}
              className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 bg-gradient-to-br ${soort.color} rounded-xl shrink-0`}>
                    <soort.icon size={28} className={soort.textColor} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-text-main">{soort.title}</h2>
                    <p className="text-text-muted mt-2">{soort.beschrijving}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h3 className="text-sm font-semibold text-text-main mb-3 flex items-center gap-2">
                      <Shield size={16} className="text-primary" /> Kenmerken
                    </h3>
                    <ul className="space-y-2">
                      {soort.kenmerken.map((k) => (
                        <li key={k} className="flex items-start gap-2 text-sm text-text-muted">
                          <span className="text-accent font-bold mt-0.5">•</span>
                          <span>{k}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-text-main mb-3 flex items-center gap-2">
                      <Clock size={16} className="text-warning" /> Kostenindicatie
                    </h3>
                    <div className="bg-surface rounded-xl p-4">
                      <p className="text-sm text-text-muted">{soort.kosten}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FAQSchema items={faqItems} />
    </>
  );
}
