import { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { Shield, Eye, Search, Clock, Mail, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Over Ons - Begraafplaatskosten.nl',
  description:
    'Begraafplaatskosten.nl maakt grafkosten in Nederland transparant en vergelijkbaar. Onafhankelijk, gratis en regelmatig bijgewerkt.',
};

export default function OverOnsPage() {
  return (
    <>
      <PageHero
        title="Over Begraafplaatskosten"
        highlightedSubtitle="Transparantie in grafkosten"
        subtitle="Waarom wij grafkosten vergelijkbaar willen maken."
        showBreadcrumbs
        breadcrumbs={[{ label: 'Over ons', href: '/over-ons' }]}
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="prose prose-stone max-w-none mb-12">
          <h2 className="text-2xl font-bold text-text-main mb-4">Waarom Begraafplaatskosten?</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            In Nederland verschillen de kosten voor grafrechten sterk per gemeente en per begraafplaats. Op sommige begraafplaatsen betaalt u minder dan €500 voor 10 jaar, terwijl u elders meer dan €11.000 betaalt voor 30 jaar. Deze informatie is vaak moeilijk te vinden en lastig te vergelijken.
          </p>
          <p className="text-text-muted leading-relaxed mb-6">
            Begraafplaatskosten.nl maakt deze informatie overzichtelijk en transparant. Wij verzamelen tarieven van gemeentelijke en particuliere begraafplaatsen en presenteren deze op een manier die het eenvoudig maakt om te vergelijken.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {[
            { icon: Shield, title: 'Onafhankelijk', text: 'Wij hebben geen banden met begraafplaatsen, uitvaartondernemers of verzekeraars. Onze vergelijkingen zijn objectief.' },
            { icon: Eye, title: 'Transparant', text: 'Alle tarieven zijn gebaseerd op officiële bronnen: gemeentelijke verordeningen en informatie van begraafplaatsen zelf.' },
            { icon: Search, title: 'Gratis', text: 'Het vergelijken van grafkosten is en blijft gratis. Wij vragen geen vergoeding voor het gebruik van onze vergelijkingstool.' },
            { icon: Clock, title: 'Actueel', text: 'Wij werken onze tarieven regelmatig bij op basis van de meest recente gemeentelijke verordeningen en tarievenlijsten.' },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-border rounded-2xl p-6">
              <div className="bg-accent/10 p-3 rounded-xl w-fit mb-4">
                <item.icon size={24} className="text-accent" />
              </div>
              <h3 className="font-semibold text-text-main mb-2">{item.title}</h3>
              <p className="text-text-muted text-sm">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 mb-12">
          <h3 className="text-lg font-semibold text-text-main mb-4 flex items-center gap-2">
            <Mail size={20} className="text-primary" /> Contact
          </h3>
          <p className="text-text-muted text-sm leading-relaxed">
            Heeft u vragen, opmerkingen of actuele tarieven die u met ons wilt delen? Neem gerust contact op via e-mail.
            Wij stellen het bijzonder op prijs als begraafplaatsen hun tarieven met ons willen delen, zodat we de vergelijking zo compleet mogelijk kunnen maken.
          </p>
        </div>

        <div className="text-center">
          <Link
            href="/provincie/groningen"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-semibold hover:bg-primary-dark transition-all"
          >
            Bekijk grafkosten Groningen
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
