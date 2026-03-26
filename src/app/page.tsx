import Link from 'next/link';
import {
  MapPin,
  Shield,
  Search,
  ArrowRight,
  Church,
  Trees,
  Building2,
  Landmark,
  Waves,
  Users,
  TrendingDown,
  Clock,
  Eye,
} from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import { provincies, formatCurrency } from '@/lib/fallback-data';

export const revalidate = 3600;

const soorten = [
  {
    title: 'Gemeentelijk',
    description: 'Openbare begraafplaatsen beheerd door de gemeente, toegankelijk voor iedereen',
    icon: Landmark,
    color: 'from-slate-50 to-slate-100',
    textColor: 'text-slate-700',
  },
  {
    title: 'Kerkelijk',
    description: 'Particuliere begraafplaatsen van kerkgenootschappen en parochies',
    icon: Church,
    color: 'from-amber-50 to-amber-100',
    textColor: 'text-amber-700',
  },
  {
    title: 'Natuur',
    description: 'Duurzame begraafplaatsen in de natuur, vaak met eeuwige grafrust',
    icon: Trees,
    color: 'from-emerald-50 to-emerald-100',
    textColor: 'text-emerald-700',
  },
  {
    title: 'Islamitisch & Joods',
    description: 'Ingericht volgens religieuze voorschriften, vaak eeuwige grafrust',
    icon: Building2,
    color: 'from-blue-50 to-blue-100',
    textColor: 'text-blue-700',
  },
  {
    title: 'Urnenbegraafplaats',
    description: 'Voor het bijzetten van urnen in urnennissen of urnengraven',
    icon: Users,
    color: 'from-purple-50 to-purple-100',
    textColor: 'text-purple-700',
  },
  {
    title: 'Zeebegraafplaats',
    description: 'Asverstrooiing op zee of in aangewezen wateren',
    icon: Waves,
    color: 'from-cyan-50 to-cyan-100',
    textColor: 'text-cyan-700',
  },
];

const faqItems = [
  {
    question: 'Wat zijn grafrechten precies?',
    answer:
      'Grafrechten zijn de kosten die u betaalt voor het recht om een overledene te laten begraven op een begraafplaats. Dit recht wordt meestal verleend voor een bepaalde periode (bijv. 10, 20 of 30 jaar) en kan daarna verlengd worden.',
  },
  {
    question: 'Hoeveel kosten grafrechten gemiddeld in Nederland?',
    answer:
      'De kosten variëren sterk per gemeente en type begraafplaats. Gemeentelijke begraafplaatsen rekenen gemiddeld tussen de €1.500 en €6.000 voor 20 jaar grafrechten. Particuliere en natuurbegraafplaatsen kunnen aanzienlijk duurder zijn.',
  },
  {
    question: 'Wat is het verschil tussen gemeentelijke en particuliere begraafplaatsen?',
    answer:
      'Gemeentelijke begraafplaatsen zijn openbaar en worden beheerd door de gemeente. Tarieven zijn transparant vastgelegd in de legesverordening. Particuliere begraafplaatsen worden beheerd door kerken, stichtingen of families en bepalen hun eigen tarieven.',
  },
  {
    question: 'Moet ik verplicht onderhoud betalen voor een graf?',
    answer:
      'Dit verschilt per begraafplaats. Bij gemeentelijke begraafplaatsen is een onderhoudscontract meestal niet verplicht, maar heeft u wel een onderhoudsplicht. Bij particuliere begraafplaatsen is het onderhoud vaak verplicht en moet dit vooraf worden afgekocht.',
  },
  {
    question: 'Kan ik grafrechten verlengen na afloop van de termijn?',
    answer:
      'Ja, bij de meeste begraafplaatsen kunt u grafrechten verlengen. De kosten voor verlenging zijn vaak lager dan de oorspronkelijke grafrechten. Als u niet verlengt, kan het graf worden geruimd.',
  },
  {
    question: 'Wat is eeuwige grafrust en waar is dat mogelijk?',
    answer:
      'Eeuwige grafrust betekent dat het graf nooit wordt geruimd. Dit is gebruikelijk op natuurbegraafplaatsen, islamitische en joodse begraafplaatsen. Op gemeentelijke begraafplaatsen is eeuwige grafrust meestal niet mogelijk.',
  },
];

export default function HomePage() {
  const beschikbareProvincies = provincies.filter((p) => p.beschikbaar);

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden bg-stone-950">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-slate-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-stone-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-emerald-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
        <div className="absolute inset-0 plus-pattern opacity-40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-emerald-400 rounded-full" />
            <span className="text-stone-300 text-sm font-medium">Tarieven 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-7xl font-extrabold text-white leading-tight mb-4">
            Grafkosten
          </h1>
          <p className="text-2xl sm:text-3xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400 bg-clip-text text-transparent mb-6">
            vergelijken in Nederland
          </p>
          <p className="text-stone-400 text-lg sm:text-xl max-w-2xl mb-10">
            Vergelijk grafrechten per gemeente en begraafplaats.
            Ontdek de kosten, looptijden en voorwaarden — transparant en onafhankelijk.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/provincie/groningen"
              className="inline-flex items-center justify-center gap-2 bg-white text-stone-900 px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all shadow-xl"
            >
              <Search size={20} />
              Vergelijk grafkosten
            </Link>
            <Link
              href="#provincies"
              className="inline-flex items-center justify-center gap-2 bg-white/5 backdrop-blur border border-white/15 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all"
            >
              Bekijk alle provincies
            </Link>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg border border-border p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MapPin, label: 'Provincies', value: '12', sub: 'heel Nederland' },
              { icon: TrendingDown, label: 'Prijsverschil', value: 'tot 3x', sub: 'per gemeente' },
              { icon: Clock, label: 'Looptijden', value: '10-80 jaar', sub: 'grafrechten' },
              { icon: Eye, label: 'Transparant', value: '100%', sub: 'onafhankelijk' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <div className="bg-primary-light p-3 rounded-xl">
                  <stat.icon size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text-main">{stat.value}</p>
                  <p className="text-sm text-text-muted">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Soorten begraafplaatsen */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-main mb-4">Soorten begraafplaatsen</h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Nederland kent verschillende soorten begraafplaatsen, elk met eigen tarieven en voorwaarden.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {soorten.map((soort) => (
            <div
              key={soort.title}
              className="bg-white border border-stone-200 rounded-2xl p-6 hover:shadow-lg hover:border-primary transition-all group"
            >
              <div className={`p-3 bg-gradient-to-br ${soort.color} rounded-xl w-fit mb-4`}>
                <soort.icon size={24} className={soort.textColor} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">{soort.title}</h3>
              <p className="text-stone-600 text-sm">{soort.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Provincies */}
      <section id="provincies" className="bg-stone-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-main mb-4">Vergelijk per provincie</h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Selecteer een provincie om de grafkosten van gemeentelijke en particuliere begraafplaatsen te vergelijken.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {provincies.map((prov) => (
              <div key={prov.id}>
                {prov.beschikbaar ? (
                  <Link
                    href={`/provincie/${prov.slug}`}
                    className="block bg-white border border-stone-200 rounded-xl p-4 hover:shadow-lg hover:border-primary transition-all group text-center"
                  >
                    <MapPin size={20} className="text-primary mx-auto mb-2" />
                    <h3 className="font-semibold text-stone-900 group-hover:text-primary transition-colors">
                      {prov.naam}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      {prov.aantalBegraafplaatsen} begraafplaats{prov.aantalBegraafplaatsen !== 1 ? 'en' : ''}
                    </p>
                    <ArrowRight
                      size={16}
                      className="text-primary mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                ) : (
                  <div className="bg-stone-100 border border-stone-200 rounded-xl p-4 text-center opacity-60">
                    <MapPin size={20} className="text-stone-400 mx-auto mb-2" />
                    <h3 className="font-semibold text-stone-500">{prov.naam}</h3>
                    <p className="text-xs text-stone-400 mt-1">Binnenkort</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Shield, title: 'Onafhankelijk', desc: 'Geen banden met begraafplaatsen of uitvaartondernemers' },
            { icon: Eye, title: 'Transparant', desc: 'Alle tarieven en bronnen openbaar vermeld' },
            { icon: Search, title: 'Gratis', desc: 'Vergelijken kost niets, geen verborgen kosten' },
            { icon: Clock, title: 'Actueel', desc: 'Regelmatig bijgewerkt met de nieuwste tarieven' },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <div className="bg-accent/10 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <item.icon size={28} className="text-accent" />
              </div>
              <h3 className="font-bold text-text-main mb-2">{item.title}</h3>
              <p className="text-text-muted text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-stone-50 py-8">
        <FAQSchema items={faqItems} />
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <h2 className="text-3xl font-bold text-text-main mb-4">
          Begin met vergelijken
        </h2>
        <p className="text-text-muted max-w-xl mx-auto mb-8">
          Ontdek welke begraafplaats bij u in de buurt de beste prijs-kwaliteitverhouding biedt.
        </p>
        <Link
          href="/provincie/groningen"
          className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-semibold hover:bg-primary-dark hover:shadow-xl transition-all"
        >
          <Search size={20} />
          Vergelijk grafkosten in Groningen
          <ArrowRight size={20} />
        </Link>
      </section>
    </>
  );
}
