import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import FAQSchema from '@/components/FAQSchema';
import {
  gemeenten,
  gemeenteBySlug,
  formatCurrency,
  GrafType,
  Begraafplaats,
} from '@/lib/fallback-data';
import { begraafplaatsLocaties } from '@/lib/begraafplaats-locaties';
import { MapPin, TrendingDown, Clock, Shield, ArrowRight, FileText, Info, Landmark } from 'lucide-react';

// Statically generate all 153 gemeente pages
export function generateStaticParams() {
  return gemeenten.map((g) => ({ slug: g.slug }));
}

const grafTypeLabels: Record<string, string> = {
  enkel: 'Enkel graf',
  dubbel: 'Dubbel graf',
  kindergraf: 'Kindergraf',
  urnengraf: 'Urnengraf',
  urnennis: 'Urnennis',
  asverstrooiing: 'Asverstrooiing',
};

function getGemeenteStats(bp: Begraafplaats) {
  const enkelTarieven = bp.grafTarieven.filter((t) => t.grafType === 'enkel').map((t) => t.tarief);
  const alleTarieven = bp.grafTarieven.map((t) => t.tarief);
  // Looptijden alleen voor reguliere graven (niet kindergraven — die hebben leeftijdsgerelateerde periodes)
  const reguliereTarieven = bp.grafTarieven.filter((t) => t.grafType !== 'kindergraf');
  const looptijden = [...new Set(reguliereTarieven.map((t) => t.looptijd))].sort((a, b) => a - b);
  const grafTypes = [...new Set(bp.grafTarieven.map((t) => t.grafType))];

  return {
    min: alleTarieven.length > 0 ? Math.min(...alleTarieven) : 0,
    max: alleTarieven.length > 0 ? Math.max(...alleTarieven) : 0,
    minEnkel: enkelTarieven.length > 0 ? Math.min(...enkelTarieven) : null,
    maxEnkel: enkelTarieven.length > 0 ? Math.max(...enkelTarieven) : null,
    looptijden,
    grafTypes,
    aantalTarieven: bp.grafTarieven.length,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const info = gemeenteBySlug[slug];
  if (!info) return {};

  const stats = getGemeenteStats(info.begraafplaats);
  const minStr = stats.minEnkel ? formatCurrency(stats.minEnkel) : formatCurrency(stats.min);
  const maxStr = stats.maxEnkel ? formatCurrency(stats.maxEnkel) : formatCurrency(stats.max);

  return {
    title: `Grafkosten ${info.naam} 2026 - Tarieven Grafrechten Gemeente ${info.naam}`,
    description: `Bekijk alle grafkosten in gemeente ${info.naam} (${info.provincie}). Tarieven van ${minStr} tot ${maxStr}. ${stats.aantalTarieven} tarieven voor ${stats.grafTypes.length} graftypen. Actuele data uit de gemeentelijke verordening.`,
    openGraph: {
      title: `Grafkosten ${info.naam} 2026`,
      description: `Vergelijk grafrechten in gemeente ${info.naam}. Van ${minStr} tot ${maxStr}.`,
    },
  };
}

export const revalidate = 3600;

export default async function GemeentePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const info = gemeenteBySlug[slug];

  if (!info) {
    notFound();
  }

  const bp = info.begraafplaats;
  const stats = getGemeenteStats(bp);

  // Groepeer tarieven per graftype
  const tarievenPerType: Record<string, typeof bp.grafTarieven> = {};
  bp.grafTarieven.forEach((t) => {
    if (!tarievenPerType[t.grafType]) tarievenPerType[t.grafType] = [];
    tarievenPerType[t.grafType].push(t);
  });

  // Sorteer binnen elke groep op looptijd
  Object.values(tarievenPerType).forEach((arr) =>
    arr.sort((a, b) => a.looptijd - b.looptijd)
  );

  const typeOrder: GrafType[] = ['enkel', 'dubbel', 'kindergraf', 'urnengraf', 'urnennis', 'asverstrooiing'];
  const sortedTypes = Object.keys(tarievenPerType).sort(
    (a, b) => typeOrder.indexOf(a as GrafType) - typeOrder.indexOf(b as GrafType)
  );

  // Andere gemeenten in dezelfde provincie
  const andereGemeenten = gemeenten
    .filter((g) => g.provincie === info.provincie && g.slug !== slug)
    .sort((a, b) => a.naam.localeCompare(b.naam));

  const faqItems = [
    {
      question: `Hoeveel kosten grafrechten in ${info.naam}?`,
      answer: stats.minEnkel
        ? `De kosten voor een enkel graf in ${info.naam} variëren van ${formatCurrency(stats.minEnkel)} tot ${formatCurrency(stats.maxEnkel!)}. De prijs hangt af van het type graf en de looptijd die u kiest.`
        : `De grafrechten in ${info.naam} variëren van ${formatCurrency(stats.min)} tot ${formatCurrency(stats.max)}. De prijs hangt af van het type graf en de looptijd.`,
    },
    {
      question: `Welke graftypen zijn beschikbaar in ${info.naam}?`,
      answer: `In ${info.naam} kunt u kiezen uit ${stats.grafTypes.length} graftypen: ${stats.grafTypes.map((t) => grafTypeLabels[t] || t).join(', ')}. Elk type heeft eigen tarieven en looptijden.`,
    },
    ...(stats.looptijden.length > 0
      ? [{
          question: `Voor welke looptijden kan ik grafrechten krijgen in ${info.naam}?`,
          answer: `De gemeente ${info.naam} biedt grafrechten aan voor de volgende looptijden: ${stats.looptijden.join(', ')} jaar. Bij de meeste begraafplaatsen kunt u de grafrechten na afloop verlengen.`,
        }]
      : []),
    {
      question: `Waar komen de tarieven van ${info.naam} vandaan?`,
      answer: `De tarieven komen uit de officiële Verordening lijkbezorgingsrechten van de gemeente ${info.naam}, gepubliceerd in de Centrale Voorziening Decentrale Regelgeving (CVDR). We controleren deze regelmatig op actualiteit.`,
    },
  ];

  return (
    <>
      <PageHero
        title={`Grafkosten ${info.naam}`}
        badge={`Tarieven ${bp.tariefJaar}`}
        highlightedSubtitle={`Gemeente ${info.naam}, ${info.provincie}`}
        subtitle={`Alle tarieven voor grafrechten in de gemeente ${info.naam}. ${stats.aantalTarieven} tarieven voor ${stats.grafTypes.length} graftypen.`}
        showBreadcrumbs
        breadcrumbs={[
          { label: 'Provincies', href: '/#provincies' },
          { label: info.provincie, href: `/provincie/${info.provincieSlug}` },
          { label: info.naam, href: `/gemeente/${slug}` },
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
                <p className="text-2xl font-bold text-text-main">{info.provincie}</p>
                <p className="text-sm text-text-muted">provincie</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-accent-light p-3 rounded-xl">
                <TrendingDown size={24} className="text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-main">{formatCurrency(stats.min)}</p>
                <p className="text-sm text-text-muted">laagste tarief</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-warning-light p-3 rounded-xl">
                <Clock size={24} className="text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-main">
                  {stats.looptijden.length > 0
                    ? `${stats.looptijden[0]}-${stats.looptijden[stats.looptijden.length - 1]} jaar`
                    : `${stats.grafTypes.length} typen`}
                </p>
                <p className="text-sm text-text-muted">
                  {stats.looptijden.length > 0 ? 'looptijden' : 'graftypen'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary-light p-3 rounded-xl">
                <Shield size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-main">{stats.grafTypes.length}</p>
                <p className="text-sm text-text-muted">graftypen</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tarieventabellen per graftype */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h2 className="text-3xl font-bold text-text-main mb-2">
          Alle tarieven grafrechten {info.naam}
        </h2>
        <p className="text-text-muted mb-4 max-w-3xl">
          Onderstaande tarieven zijn afkomstig uit de{' '}
          <span className="font-medium text-text-main">{bp.bronVermelding}</span>. Alle bedragen zijn in euro&apos;s.
        </p>
        {bp.onderhoud.type !== 'niet_beschikbaar' && bp.onderhoud.perJaar && (
          <div className="inline-flex items-center gap-2 bg-primary-light border border-primary/20 rounded-xl px-4 py-2 mb-10 text-sm">
            <Info size={16} className="text-primary shrink-0" />
            <span className="text-text-main">
              Onderhoud: <span className="font-medium">{formatCurrency(bp.onderhoud.perJaar)}/jaar</span>
              {bp.onderhoud.type === 'optioneel' ? ' (optioneel)' : ' (verplicht)'}
              {' — '}inclusief onderhoud is hieronder berekend.
            </span>
          </div>
        )}

        <div className="space-y-10">
          {sortedTypes.map((type) => {
            const tarieven = tarievenPerType[type];
            const label = grafTypeLabels[type] || type;
            const isKindergraf = type === 'kindergraf';
            const heeftOnderhoud = bp.onderhoud.type !== 'niet_beschikbaar' && bp.onderhoud.perJaar && bp.onderhoud.perJaar > 0 && !isKindergraf;

            return (
              <div key={type}>
                <h3 className="text-xl font-semibold text-text-main mb-4 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  {label}
                </h3>
                <div className="bg-white rounded-2xl border border-border overflow-x-auto">
                  <table className="w-full text-sm min-w-[480px]">
                    <thead>
                      <tr className="bg-surface-alt border-b border-border">
                        <th className="px-4 sm:px-6 py-3 text-left font-semibold text-text-main">
                          {isKindergraf ? 'Leeftijdscategorie' : 'Looptijd'}
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-right font-semibold text-text-main">
                          {heeftOnderhoud ? 'Excl. onderhoud' : 'Tarief'}
                        </th>
                        {heeftOnderhoud && (
                          <th className="px-4 sm:px-6 py-3 text-right font-semibold text-primary">
                            Incl. onderhoud
                          </th>
                        )}
                        <th className="px-4 sm:px-6 py-3 text-right font-semibold text-text-main">
                          {isKindergraf ? '' : 'Per jaar'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tarieven.map((t, i) => {
                        const looptijdLabel = isKindergraf
                          ? t.looptijd <= 1
                            ? 'Jonger dan 1 jaar'
                            : `Tot ${t.looptijd} jaar`
                          : `${t.looptijd} jaar`;
                        const inclOnderhoud = heeftOnderhoud
                          ? t.tarief + bp.onderhoud.perJaar! * t.looptijd
                          : t.tarief;
                        return (
                          <tr
                            key={i}
                            className={`border-b border-border last:border-0 hover:bg-surface transition ${
                              i === 0 && !isKindergraf ? 'bg-accent/5' : ''
                            }`}
                          >
                            <td className="px-4 sm:px-6 py-3 font-medium text-text-main">
                              {looptijdLabel}
                              {i === 0 && !isKindergraf && (
                                <span className="ml-2 text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">
                                  Voordeligst
                                </span>
                              )}
                            </td>
                            <td className={`px-4 sm:px-6 py-3 text-right ${heeftOnderhoud ? 'text-text-muted' : 'font-semibold text-text-main'}`}>
                              {formatCurrency(t.tarief)}
                            </td>
                            {heeftOnderhoud && (
                              <td className="px-4 sm:px-6 py-3 text-right font-semibold text-primary">
                                {formatCurrency(inclOnderhoud)}
                              </td>
                            )}
                            <td className="px-4 sm:px-6 py-3 text-right text-text-muted">
                              {isKindergraf ? '—' : `${formatCurrency(Math.round(inclOnderhoud / t.looptijd))}/jaar`}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bron */}
        <div className="mt-8 flex items-start gap-3 text-sm text-text-muted">
          <FileText size={16} className="mt-0.5 shrink-0" />
          <p>
            Bron: {bp.bronVermelding}. Gepubliceerd in de Centrale Voorziening Decentrale Regelgeving (CVDR).
            Tarieven onder voorbehoud van wijzigingen.
          </p>
        </div>
      </section>

      {/* Begraafplaatsen in deze gemeente (RCE data) */}
      {begraafplaatsLocaties[info.naam] && begraafplaatsLocaties[info.naam].length > 0 && (
        <section className="bg-earth-light py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-2">
              <Landmark size={28} className="text-primary" />
              <h2 className="text-3xl font-bold text-text-main">
                Begraafplaatsen in {info.naam}
              </h2>
            </div>
            <p className="text-text-muted mb-8 max-w-3xl">
              De gemeente {info.naam} heeft {begraafplaatsLocaties[info.naam].length} gemeentelijke{' '}
              {begraafplaatsLocaties[info.naam].length === 1 ? 'begraafplaats' : 'begraafplaatsen'}.
              De tarieven op deze pagina gelden voor al deze locaties.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {begraafplaatsLocaties[info.naam].map((loc, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-text-main mb-1">{loc.naam}</h3>
                  <div className="flex items-center gap-1.5 text-sm text-text-muted">
                    <MapPin size={14} className="text-primary shrink-0" />
                    <span>{loc.plaats}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-text-muted mt-6">
              Bron: Rijksdienst voor het Cultureel Erfgoed (RCE) — Landschapsatlas
            </p>
          </div>
        </section>
      )}

      {/* Toelichting */}
      <section className="bg-stone-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-main mb-8">
            Begraven in {info.naam}: wat u moet weten
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-border">
              <h3 className="text-lg font-semibold text-text-main mb-4">Grafrechten kiezen</h3>
              <p className="text-text-muted mb-4">
                Bij het kiezen van grafrechten in {info.naam} zijn er {stats.grafTypes.length} typen beschikbaar
                {stats.looptijden.length > 0
                  ? ` met looptijden van ${stats.looptijden[0]} tot ${stats.looptijden[stats.looptijden.length - 1]} jaar`
                  : ''}.
                Een langere looptijd is per jaar vaak voordeliger, maar vraagt een hogere eenmalige investering.
              </p>
              <div className="bg-primary-light rounded-xl p-4">
                <p className="text-sm text-primary font-medium">Tip:</p>
                <p className="text-sm text-text-muted mt-1">
                  Vergelijk de kosten per jaar om een eerlijke vergelijking te maken tussen verschillende looptijden.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-border">
              <h3 className="text-lg font-semibold text-text-main mb-4">Vergelijk met andere gemeenten</h3>
              <p className="text-text-muted mb-4">
                De tarieven voor grafrechten verschillen sterk per gemeente in {info.provincie}. Het loont om ook
                de tarieven van omliggende gemeenten te bekijken voordat u een keuze maakt.
              </p>
              <Link
                href={`/provincie/${info.provincieSlug}`}
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                Vergelijk alle gemeenten in {info.provincie}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Andere gemeenten in deze provincie */}
      {andereGemeenten.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h2 className="text-2xl font-bold text-text-main mb-6">
            Andere gemeenten in {info.provincie}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {andereGemeenten.map((g) => {
              const gStats = getGemeenteStats(g.begraafplaats);
              return (
                <Link
                  key={g.slug}
                  href={`/gemeente/${g.slug}`}
                  className="bg-white border border-border rounded-xl p-3 hover:shadow-md hover:border-primary transition-all group text-center"
                >
                  <p className="font-medium text-text-main group-hover:text-primary transition-colors text-sm">
                    {g.naam}
                  </p>
                  <p className="text-xs text-text-muted mt-1">
                    vanaf {formatCurrency(gStats.min)}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-stone-50 py-16 md:py-24">
        <FAQSchema items={faqItems} />
      </section>
    </>
  );
}
