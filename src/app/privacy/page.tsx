import { Metadata } from 'next';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Privacybeleid',
  description: 'Het privacybeleid van Grafkostenkenner.nl. Wij respecteren uw privacy.',
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacybeleid"
        subtitle="Hoe wij omgaan met uw gegevens"
        showBreadcrumbs
        breadcrumbs={[{ label: 'Privacy', href: '/privacy' }]}
      />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="prose prose-stone max-w-none space-y-8">
          <div>
            <h2 className="text-xl font-bold text-text-main mb-3">1. Algemeen</h2>
            <p className="text-text-muted leading-relaxed">
              Grafkostenkenner.nl respecteert uw privacy. Wij verzamelen alleen gegevens die noodzakelijk zijn voor het functioneren van de website. Wij verkopen of delen uw gegevens niet met derden.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-main mb-3">2. Welke gegevens verzamelen wij?</h2>
            <p className="text-text-muted leading-relaxed">
              Onze vergelijkingstool werkt volledig anoniem. U hoeft geen persoonlijke gegevens in te voeren om grafkosten te vergelijken. Wij kunnen geanonimiseerde gebruiksstatistieken verzamelen om de website te verbeteren.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-main mb-3">3. Cookies</h2>
            <p className="text-text-muted leading-relaxed">
              Wij gebruiken mogelijk functionele cookies die noodzakelijk zijn voor het functioneren van de website. Wij plaatsen geen tracking cookies zonder uw toestemming.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-main mb-3">4. Contact</h2>
            <p className="text-text-muted leading-relaxed">
              Heeft u vragen over ons privacybeleid? Neem dan contact met ons op via de contactpagina.
            </p>
          </div>

          <p className="text-xs text-text-muted italic">Laatst bijgewerkt: maart 2026</p>
        </div>
      </section>
    </>
  );
}
