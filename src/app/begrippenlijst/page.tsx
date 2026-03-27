import { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import FAQSchema from '@/components/FAQSchema';
import BegrippenlijstContent from '@/components/BegrippenlijstContent';

export const metadata: Metadata = {
  title: 'Begrippenlijst Grafrechten & Begraven - 50+ Termen Uitgelegd',
  description:
    'Compleet overzicht van 50+ begrippen rond grafrechten, begraven en begraafplaatsen. Van algemeen graf tot urnenmuur, helder uitgelegd voor iedereen.',
};

const faqItems = [
  {
    question: 'Wat is het verschil tussen grafrechten en begraafkosten?',
    answer:
      'Grafrechten zijn de kosten voor het recht om een graf te gebruiken gedurende een bepaalde periode. Begraafkosten (ook wel begrafenisrechten) zijn de kosten voor de daadwerkelijke begrafenis: het delven en dichten van het graf. Beide zijn apart te betalen aan de gemeente of begraafplaats.',
  },
  {
    question: 'Wat is het verschil tussen een algemeen graf en een particulier graf?',
    answer:
      'Bij een algemeen graf bepaalt de gemeente wie erin begraven wordt. U heeft geen keuze en het graf kan na de grafrusttermijn geruimd worden. Bij een particulier (eigen) graf heeft u het exclusieve recht: u bepaalt wie erin begraven wordt en kunt het grafrecht verlengen.',
  },
  {
    question: 'Hoelang moet een graf minimaal blijven liggen?',
    answer:
      'De wettelijke minimale grafrusttermijn in Nederland is 10 jaar (Wet op de lijkbezorging). De meeste gemeenten hanteren langere termijnen van 15 tot 20 jaar. Daarna mag het graf worden geruimd als de grafrechten niet verlengd worden.',
  },
  {
    question: 'Wat is een verordening lijkbezorgingsrechten?',
    answer:
      'Een verordening lijkbezorgingsrechten is een gemeentelijk besluit waarin de tarieven voor begraven zijn vastgelegd. De gemeenteraad stelt deze jaarlijks vast. De verordening is openbaar en te vinden via de CVDR (Centrale Voorziening Decentrale Regelgeving).',
  },
];

export default function BegrippenlijstPage() {
  return (
    <>
      <PageHero
        title="Begrippenlijst"
        badge="50+ termen"
        highlightedSubtitle="Alle termen rond begraven uitgelegd"
        subtitle="Van grafrechten tot urnenmuur: een compleet overzicht van alle begrippen die u tegenkomt bij het vergelijken van grafkosten."
        showBreadcrumbs
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Begrippenlijst', href: '/begrippenlijst' },
        ]}
      />

      <BegrippenlijstContent />

      <FAQSchema items={faqItems} />
    </>
  );
}
