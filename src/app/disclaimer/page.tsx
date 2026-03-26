import { Metadata } from 'next';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer van Grafkostenkenner.nl. Informatie over aansprakelijkheid en bronnen.',
};

export default function DisclaimerPage() {
  return (
    <>
      <PageHero
        title="Disclaimer"
        subtitle="Aansprakelijkheid en bronvermelding"
        showBreadcrumbs
        breadcrumbs={[{ label: 'Disclaimer', href: '/disclaimer' }]}
      />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="prose prose-stone max-w-none space-y-8">
          <div>
            <h2 className="text-xl font-bold text-text-main mb-3">1. Informatie</h2>
            <p className="text-text-muted leading-relaxed">
              De informatie op Grafkostenkenner.nl is met grote zorgvuldigheid samengesteld op basis van officiële bronnen zoals gemeentelijke verordeningen en informatie van begraafplaatsen. Ondanks deze zorgvuldigheid is het mogelijk dat informatie onvolledig of onjuist is.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-main mb-3">2. Aansprakelijkheid</h2>
            <p className="text-text-muted leading-relaxed">
              Grafkostenkenner.nl aanvaardt geen aansprakelijkheid voor schade die voortvloeit uit het gebruik van de informatie op deze website. De getoonde tarieven zijn indicatief. Neem altijd contact op met de betreffende begraafplaats voor actuele en bindende tarieven.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-main mb-3">3. Bronnen</h2>
            <p className="text-text-muted leading-relaxed">
              Onze tariefgegevens zijn afkomstig uit gemeentelijke verordeningen op begrafenisrechten (gepubliceerd via lokaleregelgeving.overheid.nl) en informatie van begraafplaatsen zelf. Bij elk tarief vermelden wij de bron.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-main mb-3">4. Actualiteit</h2>
            <p className="text-text-muted leading-relaxed">
              Wij streven ernaar de tarieven actueel te houden, maar kunnen niet garanderen dat alle informatie op elk moment up-to-date is. Gemeenten en begraafplaatsen kunnen tussentijds hun tarieven wijzigen.
            </p>
          </div>

          <p className="text-xs text-text-muted italic">Laatst bijgewerkt: maart 2026</p>
        </div>
      </section>
    </>
  );
}
