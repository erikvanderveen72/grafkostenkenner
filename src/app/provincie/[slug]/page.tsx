import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import FAQSchema from '@/components/FAQSchema';
import GrafkostenVergelijker from '@/components/GrafkostenVergelijker';
import {
  provincies,
  begraafplaatsenPerProvincie,
  gemeenten as alleGemeenten,
  formatCurrency,
  Begraafplaats,
} from '@/lib/fallback-data';
import Link from 'next/link';
import { MapPin, TrendingDown, Clock, Shield, ArrowRight } from 'lucide-react';

// Statically generate all province pages
export function generateStaticParams() {
  // Exclude groningen and drenthe — they have custom pages
  return provincies
    .filter((p) => p.beschikbaar && p.slug !== 'groningen' && p.slug !== 'drenthe')
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const provincie = provincies.find((p) => p.slug === slug);
  if (!provincie) return {};

  const begraafplaatsen = begraafplaatsenPerProvincie[slug] || [];
  const alleTarieven = begraafplaatsen.flatMap((bp) =>
    bp.grafTarieven.filter((t) => t.grafType === 'enkel').map((t) => t.tarief)
  );
  const min = alleTarieven.length > 0 ? Math.min(...alleTarieven) : 0;
  const max = alleTarieven.length > 0 ? Math.max(...alleTarieven) : 0;

  return {
    title: `Grafkosten ${provincie.naam} 2026 - Vergelijk Grafrechten per Gemeente`,
    description: `Vergelijk grafkosten en grafrechten in ${begraafplaatsen.length} gemeenten in de provincie ${provincie.naam}. Van ${formatCurrency(min)} tot ${formatCurrency(max)}. Onafhankelijk en actueel.`,
  };
}

export const revalidate = 3600;

function getProvincieStats(begraafplaatsen: Begraafplaats[]) {
  const enkelTarieven = begraafplaatsen.flatMap((bp) =>
    bp.grafTarieven.filter((t) => t.grafType === 'enkel').map((t) => t.tarief)
  );

  const allLooptijden = new Set<number>();
  begraafplaatsen.forEach((bp) =>
    bp.grafTarieven.forEach((t) => allLooptijden.add(t.looptijd))
  );

  const looptijdenSorted = Array.from(allLooptijden).sort((a, b) => a - b);

  return {
    aantalGemeenten: begraafplaatsen.length,
    min: enkelTarieven.length > 0 ? Math.min(...enkelTarieven) : 0,
    max: enkelTarieven.length > 0 ? Math.max(...enkelTarieven) : 0,
    looptijdRange:
      looptijdenSorted.length > 0
        ? `${looptijdenSorted[0]}-${looptijdenSorted[looptijdenSorted.length - 1]} jaar`
        : 'onbekend',
    goedkoopsteGemeente:
      enkelTarieven.length > 0
        ? begraafplaatsen.reduce((best, bp) => {
            const minTarief = Math.min(
              ...bp.grafTarieven.filter((t) => t.grafType === 'enkel').map((t) => t.tarief),
              Infinity
            );
            const bestMin = Math.min(
              ...best.grafTarieven.filter((t) => t.grafType === 'enkel').map((t) => t.tarief),
              Infinity
            );
            return minTarief < bestMin ? bp : best;
          })
        : null,
  };
}

export default async function ProvinciePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const provincie = provincies.find((p) => p.slug === slug);

  if (!provincie || !provincie.beschikbaar) {
    notFound();
  }

  // Redirect to custom pages for groningen and drenthe
  if (slug === 'groningen' || slug === 'drenthe') {
    notFound();
  }

  const begraafplaatsen = begraafplaatsenPerProvincie[slug] || [];
  const stats = getProvincieStats(begraafplaatsen);

  const faqItems = [
    {
      question: `Hoeveel kosten grafrechten in ${provincie.naam}?`,
      answer: `De kosten voor grafrechten in ${provincie.naam} variëren sterk: van ${formatCurrency(stats.min)} tot ${formatCurrency(stats.max)} voor een enkel graf. Het tarief hangt af van de gemeente, het type graf en de looptijd.`,
    },
    {
      question: `Welke gemeente in ${provincie.naam} is het goedkoopst?`,
      answer: stats.goedkoopsteGemeente
        ? `${stats.goedkoopsteGemeente.gemeente} heeft de laagste tarieven in ${provincie.naam}. Vergelijk alle ${stats.aantalGemeenten} gemeenten met onze vergelijker.`
        : `Gebruik onze vergelijker om de goedkoopste gemeente in ${provincie.naam} te vinden.`,
    },
    {
      question: `Hoeveel gemeenten kan ik vergelijken in ${provincie.naam}?`,
      answer: `Op dit moment hebben we tariefgegevens van ${stats.aantalGemeenten} gemeenten in ${provincie.naam}. De data komt uit de officiële gemeentelijke verordeningen lijkbezorgingsrechten.`,
    },
    {
      question: 'Waar komen de tarieven vandaan?',
      answer:
        'Alle tarieven komen uit de officiële gemeentelijke verordeningen, gepubliceerd in de Centrale Voorziening Decentrale Regelgeving (CVDR). We controleren deze regelmatig op actualiteit.',
    },
  ];

  return (
    <>
      <PageHero
        title={`Grafkosten ${provincie.naam}`}
        badge="Tarieven 2026"
        highlightedSubtitle="Vergelijk grafrechten per gemeente"
        subtitle={`Bekijk en vergelijk de grafkosten in ${stats.aantalGemeenten} gemeenten in de provincie ${provincie.naam}.`}
        showBreadcrumbs
        breadcrumbs={[
          { label: 'Provincies', href: '/#provincies' },
          { label: provincie.naam, href: `/provincie/${slug}` },
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
                <p className="text-2xl font-bold text-text-main">{stats.aantalGemeenten}</p>
                <p className="text-sm text-text-muted">gemeenten</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-accent-light p-3 rounded-xl">
                <TrendingDown size={24} className="text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-main">{formatCurrency(stats.min)}</p>
                <p className="text-sm text-text-muted">vanaf (enkel graf)</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-warning-light p-3 rounded-xl">
                <Clock size={24} className="text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-main">{stats.looptijdRange}</p>
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
          <h2 className="text-3xl font-bold text-text-main mb-4">
            Vergelijk grafkosten in {provincie.naam}
          </h2>
          <p className="text-text-muted max-w-3xl">
            Gebruik de filters om de grafkosten te vergelijken. Kies een type graf, looptijd en
            of u onderhoudskosten wilt meenemen in de vergelijking.
          </p>
        </div>

        <GrafkostenVergelijker begraafplaatsen={begraafplaatsen} provincie={provincie.naam} />
      </section>

      {/* Gemeenten in deze provincie */}
      <section className="bg-white py-16 md:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text-main mb-2">
            Gemeenten in {provincie.naam}
          </h2>
          <p className="text-text-muted mb-8">
            Klik op een gemeente voor alle tarieven en details.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {alleGemeenten
              .filter((g) => g.provincieSlug === slug)
              .sort((a, b) => a.naam.localeCompare(b.naam))
              .map((g) => {
                const min = Math.min(...g.begraafplaats.grafTarieven.map((t) => t.tarief));
                return (
                  <Link
                    key={g.slug}
                    href={`/gemeente/${g.slug}`}
                    className="bg-stone-50 border border-border rounded-xl p-4 hover:shadow-md hover:border-primary transition-all group"
                  >
                    <p className="font-medium text-text-main group-hover:text-primary transition-colors text-sm">
                      {g.naam}
                    </p>
                    <p className="text-xs text-text-muted mt-1">
                      vanaf {formatCurrency(min)}
                    </p>
                    <ArrowRight
                      size={14}
                      className="text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      {/* Toelichting */}
      <section className="bg-stone-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-main mb-8">
            Grafkosten in {provincie.naam}: wat u moet weten
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-border">
              <h3 className="text-lg font-semibold text-text-main mb-4">
                Grote prijsverschillen
              </h3>
              <p className="text-text-muted mb-4">
                In {provincie.naam} variëren de grafkosten van {formatCurrency(stats.min)} tot{' '}
                {formatCurrency(stats.max)} voor een enkel graf. De tarieven worden vastgesteld
                door de gemeenteraad via de verordening lijkbezorgingsrechten en kunnen per jaar
                wijzigen.
              </p>
              <div className="bg-primary-light rounded-xl p-4">
                <p className="text-sm text-primary font-medium">Tip:</p>
                <p className="text-sm text-text-muted mt-1">
                  Vergelijk altijd meerdere gemeenten. Het prijsverschil kan oplopen tot
                  duizenden euro&apos;s.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 border border-border">
              <h3 className="text-lg font-semibold text-text-main mb-4">
                Officiële bronnen
              </h3>
              <p className="text-text-muted mb-4">
                Alle tarieven op deze pagina komen uit de officiële gemeentelijke verordeningen,
                gepubliceerd in de Centrale Voorziening Decentrale Regelgeving (CVDR). We
                controleren de data regelmatig op actualiteit.
              </p>
              <div className="bg-warning-light rounded-xl p-4">
                <p className="text-sm text-warning font-medium">Let op:</p>
                <p className="text-sm text-text-muted mt-1">
                  Naast grafrechten komen er kosten bij voor de uitvaart zelf, de kist,
                  opbaring en eventueel onderhoud van het graf.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h2 className="text-3xl font-bold text-text-main mb-8">
          Veelgestelde vragen over grafkosten in {provincie.naam}
        </h2>

        <div className="space-y-4">
          {faqItems.map((faq, i) => (
            <details
              key={i}
              className="group bg-white rounded-2xl border border-border overflow-hidden"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-surface transition">
                <h3 className="text-base font-semibold text-text-main pr-4">{faq.question}</h3>
                <span className="text-text-muted group-open:rotate-45 transition-transform text-xl shrink-0">
                  +
                </span>
              </summary>
              <div className="px-6 pb-6 text-text-muted">{faq.answer}</div>
            </details>
          ))}
        </div>

        <FAQSchema items={faqItems} />
      </section>
    </>
  );
}
