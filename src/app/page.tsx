import Link from 'next/link';
import Image from 'next/image';
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
import GemeenteZoeken from '@/components/GemeenteZoeken';
import { provincies, gemeenten, formatCurrency } from '@/lib/fallback-data';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grafkosten Vergelijken 2026 — 153 Gemeenten | Begraafplaatskosten.nl',
  description:
    'Vergelijk grafkosten en grafrechten van 153 gemeenten in 12 provincies. Bekijk tarieven, looptijden en onderhoudskosten. 100% onafhankelijk en gratis.',
  alternates: {
    canonical: 'https://begraafplaatskosten.nl',
  },
};

export const revalidate = 3600;

const soorten = [
  {
    title: 'Gemeentelijk',
    description: 'Openbare begraafplaatsen beheerd door de gemeente, toegankelijk voor iedereen',
    icon: Landmark,
    color: 'from-stone-50 to-stone-100',
    textColor: 'text-stone-700',
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
    color: 'from-green-50 to-green-100',
    textColor: 'text-green-700',
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
      {/* Hero — full-width foto */}
      <div className="relative overflow-hidden min-h-[60vh] md:min-h-[70vh]">
        {/* Background image */}
        <Image
          src="/images/hero-foto.png"
          alt="Panoramisch uitzicht over de Nederlandse duinen bij zonsondergang"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        {/* Content — centered with frosted effect */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] md:min-h-[70vh] px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-light text-white leading-tight mb-3 drop-shadow-lg">
              Begraafplaats&shy;kosten
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-serif font-light text-white/80 mb-6 drop-shadow-md">
              vergelijken in Nederland
            </p>

            {/* Frosted subtitle */}
            <div className="inline-block bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-4 mb-10 border border-white/10">
              <p className="text-white/90 text-base sm:text-lg max-w-xl">
                Vergelijk grafrechten per gemeente en begraafplaats.
                Transparant, onafhankelijk en gratis.
              </p>
            </div>

            {/* Zoekfunctie */}
            <GemeenteZoeken gemeenten={gemeenten.map((g) => ({ naam: g.naam, slug: g.slug, provincie: g.provincie }))} />

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Link
                href="#provincies"
                className="inline-flex items-center justify-center gap-2 bg-white text-stone-900 px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all shadow-xl"
              >
                <Search size={20} />
                Vergelijk grafkosten
              </Link>
              <Link
                href="#provincies"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/20 transition-all"
              >
                Bekijk alle provincies
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg border border-border p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MapPin, label: 'Gemeenten', value: '153', sub: 'in 12 provincies' },
              { icon: TrendingDown, label: 'Prijsverschil', value: '> 11.000%', sub: 'tussen gemeenten' },
              { icon: Clock, label: 'Looptijden', value: '10-99 jaar', sub: 'grafrechten' },
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
              className="bg-white border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary transition-all group"
            >
              <div className={`p-3 bg-gradient-to-br ${soort.color} rounded-xl w-fit mb-4`}>
                <soort.icon size={24} className={soort.textColor} />
              </div>
              <h3 className="text-xl font-bold text-text-main mb-2">{soort.title}</h3>
              <p className="text-text-muted text-sm">{soort.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Uitvaartkosten inzicht */}
      <section className="bg-gradient-to-br from-earth-dark to-earth-mid py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-amber-400 rounded-full" />
                <span className="text-stone-300 text-sm font-medium">Marktinzicht</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Bijna 40% van de Nederlanders onderschat de uitvaartkosten
              </h2>
              <p className="text-stone-400 mb-6">
                De gemiddelde uitvaart kost €8.000 tot €12.000. Grafrechten variëren met meer dan 700% tussen
                gemeenten. 90% van de uitvaartverzorgers deelt geen tarieven online. Wij brengen transparantie.
              </p>
              <Link
                href="/uitvaartkosten"
                className="inline-flex items-center gap-2 bg-white text-earth-dark px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all"
              >
                Bekijk het kostenoverzicht
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { waarde: '€8.000–€12.000', label: 'Gemiddelde uitvaart', kleur: 'bg-green-500/20 text-green-300' },
                { waarde: '> 700%', label: 'Prijsvariatie grafrechten', kleur: 'bg-amber-500/20 text-amber-300' },
                { waarde: '40%', label: 'Onderschat de kosten', kleur: 'bg-rose-500/20 text-rose-300' },
                { waarde: '€861–€8.895', label: 'Spreiding particulier graf', kleur: 'bg-blue-500/20 text-blue-300' },
              ].map((item) => (
                <div key={item.label} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5">
                  <p className={`text-lg font-bold ${item.kleur.split(' ')[1]}`}>{item.waarde}</p>
                  <p className="text-stone-400 text-sm mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Provincies */}
      <section id="provincies" className="bg-earth-light py-16 md:py-24">
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
                    className="block bg-white border border-border rounded-xl p-4 hover:shadow-lg hover:border-primary transition-all group text-center"
                  >
                    <MapPin size={20} className="text-primary mx-auto mb-2" />
                    <h3 className="font-semibold text-text-main group-hover:text-primary transition-colors">
                      {prov.naam}
                    </h3>
                    <p className="text-xs text-text-muted mt-1">
                      {prov.aantalBegraafplaatsen} gemeente{prov.aantalBegraafplaatsen !== 1 ? 'n' : ''}
                    </p>
                    <ArrowRight
                      size={16}
                      className="text-primary mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                ) : (
                  <div className="bg-surface-alt border border-border rounded-xl p-4 text-center opacity-60">
                    <MapPin size={20} className="text-text-muted mx-auto mb-2" />
                    <h3 className="font-semibold text-text-muted">{prov.naam}</h3>
                    <p className="text-xs text-text-muted mt-1">Binnenkort</p>
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
      <section className="bg-earth-light py-8">
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
