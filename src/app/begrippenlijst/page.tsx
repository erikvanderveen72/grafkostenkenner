import { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import FAQSchema from '@/components/FAQSchema';
import { BookOpen, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Begrippenlijst Grafrechten & Begraven - Alle Termen Uitgelegd',
  description:
    'Compleet overzicht van alle begrippen rond grafrechten, begraven en begraafplaatsen. Van algemeen graf tot urnenmuur, helder uitgelegd.',
};

interface Begrip {
  term: string;
  uitleg: string;
  categorie: 'graftypen' | 'rechten' | 'kosten' | 'begraafplaats' | 'overig';
}

const begrippen: Begrip[] = [
  // Graftypen
  { term: 'Algemeen graf', uitleg: 'Een graf waarvan de gemeente bepaalt wie erin begraven wordt. U heeft geen zeggenschap over wie er naast of boven u begraven wordt. Na de wettelijke grafrusttermijn (minimaal 10 jaar) kan het graf worden geruimd. Algemene graven zijn goedkoper dan particuliere graven.', categorie: 'graftypen' },
  { term: 'Particulier graf', uitleg: 'Een graf waarover u het exclusieve recht heeft. U bepaalt zelf wie erin begraven wordt en u kunt het graf laten verlengen. Een particulier graf wordt ook wel een \"eigen graf\" of \"familiograf\" genoemd. De rechthebbende kan het grafrecht overdragen aan erfgenamen.', categorie: 'graftypen' },
  { term: 'Enkeldiep graf', uitleg: 'Een graf met ruimte voor één overledene. Dit is het meest voorkomende en goedkoopste type particulier graf. De kist wordt op één niveau geplaatst.', categorie: 'graftypen' },
  { term: 'Dubbeldiep graf', uitleg: 'Een graf met ruimte voor twee overledenen boven elkaar. De eerste kist wordt dieper geplaatst, zodat er later een tweede kist bovenop kan. Handig voor partners die bij elkaar begraven willen worden. Kost gemiddeld 40-75% meer dan een enkeldiep graf.', categorie: 'graftypen' },
  { term: 'Drielaags graf', uitleg: 'Een graf met ruimte voor drie overledenen boven elkaar. Niet overal beschikbaar vanwege grondwaterstand. Wordt soms aangeboden op grotere begraafplaatsen in West-Nederland.', categorie: 'graftypen' },
  { term: 'Kindergraf', uitleg: 'Een kleiner graf, bestemd voor kinderen tot 12 jaar. De tarieven zijn aanzienlijk lager dan voor volwassenengraven, meestal 30-50% van het reguliere tarief. Sommige gemeenten maken onderscheid tussen kinderen van 1-12 jaar en zuigelingen.', categorie: 'graftypen' },
  { term: 'Urnengraf', uitleg: 'Een kleiner graf in een urnentuin of urnenveldje, bestemd voor het bijzetten van een of meerdere urnen met as na crematie. De tarieven zijn doorgaans 40-60% lager dan voor een regulier graf.', categorie: 'graftypen' },
  { term: 'Urnennis', uitleg: 'Een nis in een urnenmuur (columbarium) waar een urn geplaatst kan worden. De nis wordt afgesloten met een plaat waarop een inscriptie kan. Urnenissen zijn beschikbaar met looptijden van 10 tot 30 jaar.', categorie: 'graftypen' },
  { term: 'Urnenmuur / Columbarium', uitleg: 'Een muur met nissen waarin urnen worden bijgezet. Het columbarium biedt een beschutte plek voor urnen en is een alternatief voor een urnengraf in de grond. De kosten variëren van €400 tot €2.000 voor 10 jaar.', categorie: 'graftypen' },
  { term: 'Keldergraf', uitleg: 'Een gemetseld of betonnen graf onder de grond, voorzien van een dekplaat. Keldergraven zijn duurder dan reguliere graven maar bieden betere bescherming. Niet op alle begraafplaatsen beschikbaar.', categorie: 'graftypen' },
  { term: 'Bovengronds graf / Mausoleum', uitleg: 'Een graf dat geheel of gedeeltelijk boven de grond is gebouwd. Dit kan variëren van een eenvoudig bovengronds monument tot een volledig mausoleum. Niet op alle begraafplaatsen toegestaan.', categorie: 'graftypen' },
  { term: 'Natuurgraf', uitleg: 'Een graf op een natuurbegraafplaats, waarbij de natuur het graf overneemt. Er is geen traditioneel grafmonument; in plaats daarvan wordt bijvoorbeeld een boom geplant of een boomschijf geplaatst. Vaak met eeuwig grafrecht.', categorie: 'graftypen' },
  { term: 'Islamitisch graf', uitleg: 'Een graf dat voldoet aan islamitische begrafenisvoorschriften: het lichaam wordt op de rechterzij gelegd met het gezicht naar Mekka. Veel gemeentelijke begraafplaatsen hebben een apart islamitisch gedeelte ingericht.', categorie: 'graftypen' },

  // Rechten & juridisch
  { term: 'Grafrecht', uitleg: 'Het recht om een overledene te begraven in een bepaald graf op een begraafplaats. Grafrecht wordt verleend voor een bepaalde periode (meestal 10 tot 30 jaar) en kan daarna worden verlengd. Het grafrecht is vastgelegd in de Wet op de lijkbezorging.', categorie: 'rechten' },
  { term: 'Eeuwig grafrecht', uitleg: 'Grafrecht dat voor onbepaalde tijd (\"eeuwig\") wordt verleend. Het graf wordt nooit geruimd. Dit is gebruikelijk bij natuurbegraafplaatsen en sommige kerkelijke begraafplaatsen. Eenmalig hoger bedrag, maar geen verlenging nodig.', categorie: 'rechten' },
  { term: 'Grafrusttermijn', uitleg: 'De wettelijke minimumperiode dat een graf niet mag worden geruimd na de laatste begraving. In Nederland is dit minimaal 10 jaar (Wet op de lijkbezorging, artikel 31). De meeste gemeenten hanteren langere termijnen.', categorie: 'rechten' },
  { term: 'Verlenging grafrecht', uitleg: 'Het verlengen van het grafrecht na afloop van de oorspronkelijke termijn. De kosten voor verlenging zijn meestal lager dan de oorspronkelijke grafrechten. Als u niet verlengt, kan het graf na de grafrusttermijn worden geruimd.', categorie: 'rechten' },
  { term: 'Rechthebbende', uitleg: 'De persoon aan wie het grafrecht is verleend. De rechthebbende beslist wie in het graf begraven of bijgezet mag worden. Bij overlijden van de rechthebbende gaat het recht over op de erfgenamen.', categorie: 'rechten' },
  { term: 'Grafakte', uitleg: 'Het officiële document dat bewijst dat u het recht op een graf heeft. De grafakte vermeldt de locatie, het grafnummer, de looptijd en de naam van de rechthebbende.', categorie: 'rechten' },
  { term: 'Wet op de lijkbezorging', uitleg: 'De Nederlandse wet die de regels rondom begraven en cremeren vastlegt. De wet bepaalt onder andere de minimale grafrusttermijn (10 jaar), de verplichting tot begraven of cremeren binnen 6 werkdagen, en de eisen aan begraafplaatsen.', categorie: 'rechten' },
  { term: 'Grafruiming', uitleg: 'Het verwijderen van stoffelijke resten uit een graf nadat de grafrechten zijn verlopen en niet verlengd. De gemeente is verplicht de rechthebbende minimaal een jaar van tevoren te waarschuwen. Stoffelijke resten worden herbegraven in een verzamelgraf.', categorie: 'rechten' },

  // Kosten
  { term: 'Grafrechten (kosten)', uitleg: 'De vergoeding die u betaalt voor het recht om een graf te gebruiken gedurende een bepaalde periode. Dit is de grootste kostenpost bij begraven. Tarieven variëren van circa €500 voor 10 jaar tot meer dan €8.000 voor 30 jaar, afhankelijk van gemeente en type graf.', categorie: 'kosten' },
  { term: 'Begraafkosten / Begrafenisrechten', uitleg: 'De kosten die de gemeente in rekening brengt voor de daadwerkelijke begrafenis (het delven en dichten van het graf). Deze kosten komen bovenop de grafrechten. Gemiddeld €800 tot €1.500 voor een volwassene.', categorie: 'kosten' },
  { term: 'Onderhoudskosten', uitleg: 'Kosten voor het onderhoud van het graf en de grafbedekking. Dit kan gaan om een jaarlijks bedrag (€30-€120/jaar) of een eenmalig afkoopbedrag. Bij sommige begraafplaatsen is onderhoud verplicht, bij andere optioneel of zelf te regelen.', categorie: 'kosten' },
  { term: 'Grafbedekking', uitleg: 'De steen, plaat of ander monument dat op het graf geplaatst wordt. De kosten hiervan (€1.500 tot €5.000+) zijn niet inbegrepen in de grafrechten en worden meestal betaald aan een steenhouwer. De begraafplaats heeft vaak regels over afmetingen en materiaal.', categorie: 'kosten' },
  { term: 'Legesverordening', uitleg: 'De gemeentelijke verordening waarin alle tarieven voor gemeentelijke diensten zijn vastgelegd, waaronder de grafrechten en begraafkosten. De legesverordening wordt jaarlijks vastgesteld door de gemeenteraad.', categorie: 'kosten' },
  { term: 'Grafdelving', uitleg: 'Het graven (delven) van het graf voorafgaand aan de begrafenis en het dichten ervan na afloop. De kosten hiervoor zijn apart van de grafrechten en bedragen gemiddeld €800 tot €1.200.', categorie: 'kosten' },
  { term: 'Afkoopsom onderhoud', uitleg: 'Een eenmalig bedrag waarmee u het onderhoud van het graf voor de gehele looptijd vooruit betaalt. Dit is vaak voordeliger dan jaarlijks betalen. Niet bij alle begraafplaatsen beschikbaar.', categorie: 'kosten' },

  // Begraafplaats
  { term: 'Gemeentelijke begraafplaats', uitleg: 'Een begraafplaats die eigendom is van en beheerd wordt door de gemeente. De tarieven worden vastgesteld in de gemeentelijke legesverordening en zijn openbaar. Elke gemeente met meer dan 30.000 inwoners is verplicht een begraafplaats te hebben.', categorie: 'begraafplaats' },
  { term: 'Kerkelijke begraafplaats', uitleg: 'Een begraafplaats die eigendom is van een kerkgenootschap of parochie. De tarieven worden door het kerkbestuur vastgesteld en zijn vaak niet publiek beschikbaar. Soms alleen toegankelijk voor leden van de kerkgemeenschap.', categorie: 'begraafplaats' },
  { term: 'Natuurbegraafplaats', uitleg: 'Een begraafplaats in een natuurlijke omgeving (bos, heide, weide) waar de natuur het graf overneemt. Kenmerken: biologisch afbreekbare kist verplicht, geen traditioneel grafmonument, vaak eeuwig grafrecht. Er zijn circa 30 natuurbegraafplaatsen in Nederland.', categorie: 'begraafplaats' },
  { term: 'Particuliere begraafplaats', uitleg: 'Een begraafplaats die eigendom is van een stichting, vereniging, kerkgenootschap of particulier. De eigenaar bepaalt zelf de tarieven en de regels. Particuliere begraafplaatsen zijn er in diverse vormen, van kerkelijke tot commerciële.', categorie: 'begraafplaats' },
  { term: 'Urnentuin', uitleg: 'Een speciaal ingericht gedeelte van de begraafplaats waar urnen in de grond worden bijgezet. Vaak met kleinere grafruimtes en lagere tarieven dan reguliere graven.', categorie: 'begraafplaats' },
  { term: 'Strooiveld', uitleg: 'Een aangewezen gedeelte van de begraafplaats of een aparte locatie waar as kan worden verstrooid. De kosten zijn doorgaans laag (€50-€200). Op veel begraafplaatsen is een strooiveld gratis beschikbaar.', categorie: 'begraafplaats' },
  { term: 'Gedenkplaats', uitleg: 'Een plek op de begraafplaats waar nabestaanden een overledene kunnen gedenken, bijvoorbeeld met een naamplaatje op een gedenkmuur. Wordt soms gebruikt wanneer de overledene elders begraven of gecremeerd is.', categorie: 'begraafplaats' },

  // Overig
  { term: 'Uitvaart', uitleg: 'Het geheel van handelingen rondom het overlijden: van de verzorging van de overledene, de rouwdienst en de begrafenis of crematie tot het condoleancebezoek. De totale kosten van een uitvaart in Nederland liggen gemiddeld tussen €7.000 en €10.000.', categorie: 'overig' },
  { term: 'Lijkbezorging', uitleg: 'De formeel-juridische term voor het begraven, cremeren of op andere wijze (sinds 2024 ook resomeren en composteren) ter aarde bestellen van een overledene. De Wet op de lijkbezorging regelt dit.', categorie: 'overig' },
  { term: 'Crematie', uitleg: 'Het verbranden van het lichaam van een overledene in een crematorium. Na crematie resteert as, die in een urn wordt bewaard, bijgezet, verstrooid of op andere wijze wordt bewaard. Circa 70% van de Nederlanders kiest voor crematie.', categorie: 'overig' },
  { term: 'Resomeren', uitleg: 'Een relatief nieuwe vorm van lijkbezorging waarbij het lichaam door middel van water en loog wordt afgebroken. Sinds 2024 wettelijk toegestaan in Nederland. Wordt gezien als een milieuvriendelijker alternatief voor crematie.', categorie: 'overig' },
  { term: 'Opbaren', uitleg: 'Het gekoeld bewaren en ter bezichtiging leggen van het lichaam van de overledene voorafgaand aan de uitvaart. Dit kan thuis, in een uitvaartcentrum of in een rouwcentrum op de begraafplaats.', categorie: 'overig' },
  { term: 'Rouwvervoer', uitleg: 'Het transport van de overledene van de plaats van overlijden naar het uitvaartcentrum, en van daaruit naar de begraafplaats of het crematorium. Dit kan per rouwauto, rouwkoets of op andere wijze.', categorie: 'overig' },
  { term: 'Uitvaartverzekering', uitleg: 'Een verzekering die (een deel van) de uitvaartkosten dekt. Er zijn natura-verzekeringen (uitvaart in natura) en sommenverzekeringen (geldbedrag). De gemiddelde premie is €10-€30 per maand afhankelijk van leeftijd en dekking.', categorie: 'overig' },
];

const categorieLabels: Record<string, string> = {
  graftypen: 'Graftypen',
  rechten: 'Rechten & Juridisch',
  kosten: 'Kosten & Tarieven',
  begraafplaats: 'Begraafplaats & Locatie',
  overig: 'Overige Begrippen',
};

const categorieVolgorde = ['graftypen', 'rechten', 'kosten', 'begraafplaats', 'overig'];

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
];

export default function BegrippenlijstPage() {
  return (
    <>
      <PageHero
        title="Begrippenlijst"
        badge="A-Z"
        highlightedSubtitle="Alle termen rond begraven uitgelegd"
        subtitle="Van grafrechten tot urnenmuur: een compleet overzicht van alle begrippen die u tegenkomt bij het vergelijken van grafkosten."
        showBreadcrumbs
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Begrippenlijst', href: '/begrippenlijst' },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Snelnavigatie */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categorieVolgorde.map((cat) => (
            <a
              key={cat}
              href={`#${cat}`}
              className="px-4 py-2 bg-stone-100 hover:bg-primary hover:text-white rounded-full text-sm font-medium text-text-muted transition-colors"
            >
              {categorieLabels[cat]}
            </a>
          ))}
        </div>

        {/* Begrippen per categorie */}
        {categorieVolgorde.map((cat) => {
          const items = begrippen.filter((b) => b.categorie === cat);
          return (
            <div key={cat} id={cat} className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-bold text-text-main mb-6 flex items-center gap-3">
                <BookOpen size={24} className="text-primary" />
                {categorieLabels[cat]}
              </h2>
              <div className="space-y-4">
                {items.map((begrip) => (
                  <div
                    key={begrip.term}
                    className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-text-main text-lg mb-2">{begrip.term}</h3>
                    <p className="text-text-muted leading-relaxed">{begrip.uitleg}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Totaal */}
        <div className="mt-12 bg-primary-light rounded-2xl p-6 text-center">
          <p className="text-primary font-medium">
            {begrippen.length} begrippen in {categorieVolgorde.length} categorieën — regelmatig bijgewerkt
          </p>
        </div>
      </section>

      <FAQSchema items={faqItems} />
    </>
  );
}
