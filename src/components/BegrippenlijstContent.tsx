'use client';

import { useState, useMemo } from 'react';
import { BookOpen, Search } from 'lucide-react';

interface Begrip {
  term: string;
  uitleg: string;
  categorie: 'graftypen' | 'rechten' | 'kosten' | 'begraafplaats' | 'uitvaart' | 'overig';
}

const begrippen: Begrip[] = [
  // Graftypen
  { term: 'Algemeen graf', uitleg: 'Een graf waarvan de gemeente bepaalt wie erin begraven wordt. U heeft geen zeggenschap over wie er naast of boven u begraven wordt. Na de wettelijke grafrusttermijn (minimaal 10 jaar) kan het graf worden geruimd. Algemene graven zijn goedkoper dan particuliere graven.', categorie: 'graftypen' },
  { term: 'Particulier graf', uitleg: 'Een graf waarover u het exclusieve recht heeft. U bepaalt zelf wie erin begraven wordt en u kunt het graf laten verlengen. Een particulier graf wordt ook wel een "eigen graf" of "familiograf" genoemd. De rechthebbende kan het grafrecht overdragen aan erfgenamen.', categorie: 'graftypen' },
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
  { term: 'Verzamelgraf', uitleg: 'Een graf waarin de stoffelijke resten van meerdere overledenen worden herbegraven na ruiming van andere graven. Verzamelgraven zijn anoniem en worden niet gemarkeerd met individuele monumenten.', categorie: 'graftypen' },

  // Rechten & juridisch
  { term: 'Grafrecht', uitleg: 'Het recht om een overledene te begraven in een bepaald graf op een begraafplaats. Grafrecht wordt verleend voor een bepaalde periode (meestal 10 tot 30 jaar) en kan daarna worden verlengd. Het grafrecht is vastgelegd in de Wet op de lijkbezorging.', categorie: 'rechten' },
  { term: 'Eeuwig grafrecht', uitleg: 'Grafrecht dat voor onbepaalde tijd ("eeuwig") wordt verleend. Het graf wordt nooit geruimd. Dit is gebruikelijk bij natuurbegraafplaatsen en sommige kerkelijke begraafplaatsen. Eenmalig hoger bedrag, maar geen verlenging nodig.', categorie: 'rechten' },
  { term: 'Grafrusttermijn', uitleg: 'De wettelijke minimumperiode dat een graf niet mag worden geruimd na de laatste begraving. In Nederland is dit minimaal 10 jaar (Wet op de lijkbezorging, artikel 31). De meeste gemeenten hanteren langere termijnen.', categorie: 'rechten' },
  { term: 'Verlenging grafrecht', uitleg: 'Het verlengen van het grafrecht na afloop van de oorspronkelijke termijn. De kosten voor verlenging zijn meestal lager dan de oorspronkelijke grafrechten. Als u niet verlengt, kan het graf na de grafrusttermijn worden geruimd.', categorie: 'rechten' },
  { term: 'Rechthebbende', uitleg: 'De persoon aan wie het grafrecht is verleend. De rechthebbende beslist wie in het graf begraven of bijgezet mag worden. Bij overlijden van de rechthebbende gaat het recht over op de erfgenamen.', categorie: 'rechten' },
  { term: 'Grafakte', uitleg: 'Het officiële document dat bewijst dat u het recht op een graf heeft. De grafakte vermeldt de locatie, het grafnummer, de looptijd en de naam van de rechthebbende.', categorie: 'rechten' },
  { term: 'Wet op de lijkbezorging', uitleg: 'De Nederlandse wet die de regels rondom begraven en cremeren vastlegt. De wet bepaalt onder andere de minimale grafrusttermijn (10 jaar), de verplichting tot begraven of cremeren binnen 6 werkdagen, en de eisen aan begraafplaatsen.', categorie: 'rechten' },
  { term: 'Grafruiming', uitleg: 'Het verwijderen van stoffelijke resten uit een graf nadat de grafrechten zijn verlopen en niet verlengd. De gemeente is verplicht de rechthebbende minimaal een jaar van tevoren te waarschuwen. Stoffelijke resten worden herbegraven in een verzamelgraf.', categorie: 'rechten' },
  { term: 'Verordening lijkbezorgingsrechten', uitleg: 'Een gemeentelijk besluit waarin de tarieven voor begraven op gemeentelijke begraafplaatsen zijn vastgelegd. De gemeenteraad stelt deze jaarlijks vast. De verordening is openbaar en te vinden via de CVDR (Centrale Voorziening Decentrale Regelgeving).', categorie: 'rechten' },
  { term: 'CVDR', uitleg: 'De Centrale Voorziening Decentrale Regelgeving: een landelijke database van alle gemeentelijke, provinciale en waterschapsverordeningen. Hier zijn alle tarieven voor grafrechten publiek in te zien. Te bereiken via zoekdienst.overheid.nl.', categorie: 'rechten' },
  { term: 'Provisieverbod (Wft)', uitleg: 'Het verbod op het ontvangen van provisie (vergoeding) voor het doorverwijzen van consumenten naar financiële producten. Dit geldt ook voor uitvaartverzekeringen. Vergelijkingssites mogen geen provisie ontvangen van uitvaartverzekeraars.', categorie: 'rechten' },

  // Kosten
  { term: 'Grafrechten (kosten)', uitleg: 'De vergoeding die u betaalt voor het recht om een graf te gebruiken gedurende een bepaalde periode. Dit is de grootste kostenpost bij begraven. Tarieven variëren van circa €80 voor 10 jaar tot meer dan €9.000 voor 30 jaar, afhankelijk van gemeente en type graf.', categorie: 'kosten' },
  { term: 'Begraafkosten / Begrafenisrechten', uitleg: 'De kosten die de gemeente in rekening brengt voor de daadwerkelijke begrafenis (het delven en dichten van het graf). Deze kosten komen bovenop de grafrechten. Gemiddeld €800 tot €1.500 voor een volwassene.', categorie: 'kosten' },
  { term: 'Onderhoudskosten', uitleg: 'Kosten voor het onderhoud van het graf en de grafbedekking. Dit kan gaan om een jaarlijks bedrag (€30-€120/jaar) of een eenmalig afkoopbedrag. Bij sommige begraafplaatsen is onderhoud verplicht, bij andere optioneel of zelf te regelen.', categorie: 'kosten' },
  { term: 'Grafbedekking', uitleg: 'De steen, plaat of ander monument dat op het graf geplaatst wordt. De kosten hiervan (€1.500 tot €5.000+) zijn niet inbegrepen in de grafrechten en worden meestal betaald aan een steenhouwer. De begraafplaats heeft vaak regels over afmetingen en materiaal.', categorie: 'kosten' },
  { term: 'Legesverordening', uitleg: 'De gemeentelijke verordening waarin alle tarieven voor gemeentelijke diensten zijn vastgelegd, waaronder de grafrechten en begraafkosten. De legesverordening wordt jaarlijks vastgesteld door de gemeenteraad.', categorie: 'kosten' },
  { term: 'Grafdelving', uitleg: 'Het graven (delven) van het graf voorafgaand aan de begrafenis en het dichten ervan na afloop. De kosten hiervoor zijn apart van de grafrechten en bedragen gemiddeld €800 tot €1.200.', categorie: 'kosten' },
  { term: 'Afkoopsom onderhoud', uitleg: 'Een eenmalig bedrag waarmee u het onderhoud van het graf voor de gehele looptijd vooruit betaalt. Dit is vaak voordeliger dan jaarlijks betalen. Niet bij alle begraafplaatsen beschikbaar.', categorie: 'kosten' },
  { term: 'Tarieventabel', uitleg: 'De bijlage bij een verordening lijkbezorgingsrechten met alle specifieke bedragen per graftype, looptijd en dienst. Hier staan de exacte kosten die een gemeente hanteert.', categorie: 'kosten' },

  // Begraafplaats
  { term: 'Gemeentelijke begraafplaats', uitleg: 'Een begraafplaats die eigendom is van en beheerd wordt door de gemeente. De tarieven worden vastgesteld in de gemeentelijke legesverordening en zijn openbaar. Elke gemeente met meer dan 30.000 inwoners is verplicht een begraafplaats te hebben.', categorie: 'begraafplaats' },
  { term: 'Kerkelijke begraafplaats', uitleg: 'Een begraafplaats die eigendom is van een kerkgenootschap of parochie. De tarieven worden door het kerkbestuur vastgesteld en zijn vaak niet publiek beschikbaar. Soms alleen toegankelijk voor leden van de kerkgemeenschap.', categorie: 'begraafplaats' },
  { term: 'Natuurbegraafplaats', uitleg: 'Een begraafplaats in een natuurlijke omgeving (bos, heide, weide) waar de natuur het graf overneemt. Kenmerken: biologisch afbreekbare kist verplicht, geen traditioneel grafmonument, vaak eeuwig grafrecht. Er zijn circa 30 natuurbegraafplaatsen in Nederland.', categorie: 'begraafplaats' },
  { term: 'Particuliere begraafplaats', uitleg: 'Een begraafplaats die eigendom is van een stichting, vereniging, kerkgenootschap of particulier. De eigenaar bepaalt zelf de tarieven en de regels. Particuliere begraafplaatsen zijn er in diverse vormen, van kerkelijke tot commerciële.', categorie: 'begraafplaats' },
  { term: 'Urnentuin', uitleg: 'Een speciaal ingericht gedeelte van de begraafplaats waar urnen in de grond worden bijgezet. Vaak met kleinere grafruimtes en lagere tarieven dan reguliere graven.', categorie: 'begraafplaats' },
  { term: 'Strooiveld', uitleg: 'Een aangewezen gedeelte van de begraafplaats of een aparte locatie waar as kan worden verstrooid. De kosten zijn doorgaans laag (€50-€200). Op veel begraafplaatsen is een strooiveld gratis beschikbaar.', categorie: 'begraafplaats' },
  { term: 'Gedenkplaats', uitleg: 'Een plek op de begraafplaats waar nabestaanden een overledene kunnen gedenken, bijvoorbeeld met een naamplaatje op een gedenkmuur. Wordt soms gebruikt wanneer de overledene elders begraven of gecremeerd is.', categorie: 'begraafplaats' },
  { term: 'Aula', uitleg: 'Een ruimte op de begraafplaats of bij het crematorium waar de afscheidsplechtigheid plaatsvindt. Het gebruik van de aula brengt aparte kosten met zich mee, meestal €200-€500.', categorie: 'begraafplaats' },
  { term: 'Grafvak / Grafveld', uitleg: 'Een afgebakend gedeelte van de begraafplaats waar graven bij elkaar liggen. Begraafplaatsen zijn vaak ingedeeld in meerdere vakken, soms per graftype of periode.', categorie: 'begraafplaats' },

  // Uitvaart
  { term: 'Uitvaart', uitleg: 'Het geheel van handelingen rondom het overlijden: van de verzorging van de overledene, de rouwdienst en de begrafenis of crematie tot het condoleancebezoek. De totale kosten van een uitvaart in Nederland liggen gemiddeld tussen €7.000 en €10.000.', categorie: 'uitvaart' },
  { term: 'Lijkbezorging', uitleg: 'De formeel-juridische term voor het begraven, cremeren of op andere wijze (sinds 2024 ook resomeren en composteren) ter aarde bestellen van een overledene. De Wet op de lijkbezorging regelt dit.', categorie: 'uitvaart' },
  { term: 'Crematie', uitleg: 'Het verbranden van het lichaam van een overledene in een crematorium. Na crematie resteert as, die in een urn wordt bewaard, bijgezet, verstrooid of op andere wijze wordt bewaard. Circa 70% van de Nederlanders kiest voor crematie.', categorie: 'uitvaart' },
  { term: 'Resomeren', uitleg: 'Een relatief nieuwe vorm van lijkbezorging waarbij het lichaam door middel van water en loog wordt afgebroken. Sinds 2024 wettelijk toegestaan in Nederland. Wordt gezien als een milieuvriendelijker alternatief voor crematie.', categorie: 'uitvaart' },
  { term: 'Composteren (humane compostering)', uitleg: 'Een nieuwe vorm van lijkbezorging waarbij het lichaam op natuurlijke wijze wordt omgezet in compost. Sinds 2024 wettelijk toegestaan in Nederland naast begraven, cremeren en resomeren.', categorie: 'uitvaart' },
  { term: 'Opbaren', uitleg: 'Het gekoeld bewaren en ter bezichtiging leggen van het lichaam van de overledene voorafgaand aan de uitvaart. Dit kan thuis, in een uitvaartcentrum of in een rouwcentrum op de begraafplaats.', categorie: 'uitvaart' },
  { term: 'Rouwvervoer', uitleg: 'Het transport van de overledene van de plaats van overlijden naar het uitvaartcentrum, en van daaruit naar de begraafplaats of het crematorium. Dit kan per rouwauto, rouwkoets of op andere wijze.', categorie: 'uitvaart' },
  { term: 'Uitvaartverzekering', uitleg: 'Een verzekering die (een deel van) de uitvaartkosten dekt. Er zijn natura-verzekeringen (uitvaart in natura) en sommenverzekeringen (geldbedrag). De gemiddelde premie is €10-€30 per maand afhankelijk van leeftijd en dekking.', categorie: 'uitvaart' },
  { term: 'Uitvaartondernemer', uitleg: 'Een bedrijf of persoon die de uitvaart organiseert en begeleidt. De uitvaartondernemer regelt onder andere het vervoer, de rouwdienst, de drukwerk en de contacten met de begraafplaats of het crematorium.', categorie: 'uitvaart' },
  { term: 'Asbestemming', uitleg: 'De keuze wat er met de as na crematie gebeurt. Mogelijkheden zijn onder andere: bijzetten in een urnengraf, plaatsen in een urnennis, verstrooien op een strooiveld, meenemen naar huis, of verstrooien op zee of in de natuur.', categorie: 'uitvaart' },

  // Overig
  { term: 'Begraafplaatsreglement', uitleg: 'De regels die gelden op een begraafplaats, vastgelegd door de eigenaar (gemeente, kerk of particulier). Hierin staan regels over grafmonumenten, beplanting, openingstijden en gedragsregels.', categorie: 'overig' },
  { term: 'Grafmonument', uitleg: 'Een gedenkteken op of bij een graf, zoals een grafsteen, liggende plaat of staande steen. De kosten (€1.000-€5.000+) zijn niet inbegrepen in de grafrechten. De begraafplaats stelt regels aan het formaat en materiaal.', categorie: 'overig' },
  { term: 'Herbegraving', uitleg: 'Het opgraven en opnieuw begraven van stoffelijke resten op een andere locatie. Hiervoor is toestemming nodig van de burgemeester. De kosten worden bepaald door zowel de oude als nieuwe begraafplaats.', categorie: 'overig' },
  { term: 'Schudden', uitleg: 'Het dieper plaatsen van bestaande stoffelijke resten in een graf om ruimte te maken voor een nieuwe bijzetting bovenop. Niet overal toegestaan en alleen na de grafrusttermijn. Kosten variëren per begraafplaats.', categorie: 'overig' },
  { term: 'Bijzetting', uitleg: 'Het plaatsen van een tweede (of derde) kist of urn in een bestaand graf. Bij een dubbeldiep graf wordt de nieuwe kist boven de bestaande geplaatst. Hiervoor betaalt u bijzettingskosten bovenop eventuele grafdelving.', categorie: 'overig' },
];

const categorieLabels: Record<string, string> = {
  graftypen: 'Graftypen',
  rechten: 'Rechten & Juridisch',
  kosten: 'Kosten & Tarieven',
  begraafplaats: 'Begraafplaats & Locatie',
  uitvaart: 'Uitvaart & Lijkbezorging',
  overig: 'Overige Begrippen',
};

const categorieVolgorde = ['graftypen', 'rechten', 'kosten', 'begraafplaats', 'uitvaart', 'overig'];

export default function BegrippenlijstContent() {
  const [zoekterm, setZoekterm] = useState('');

  const gefilterdeTermen = useMemo(() => {
    if (!zoekterm.trim()) return begrippen;
    const lower = zoekterm.toLowerCase();
    return begrippen.filter(
      (b) =>
        b.term.toLowerCase().includes(lower) ||
        b.uitleg.toLowerCase().includes(lower)
    );
  }, [zoekterm]);

  const categorieenMetResultaten = useMemo(() => {
    return categorieVolgorde.filter((cat) =>
      gefilterdeTermen.some((b) => b.categorie === cat)
    );
  }, [gefilterdeTermen]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Zoekbalk */}
      <div className="mb-10 max-w-xl">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            type="text"
            placeholder="Zoek een begrip, bijv. 'grafrecht' of 'crematie'..."
            value={zoekterm}
            onChange={(e) => setZoekterm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-white text-text-main placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
          />
          {zoekterm && (
            <button
              onClick={() => setZoekterm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-sm"
            >
              Wis
            </button>
          )}
        </div>
        {zoekterm && (
          <p className="mt-2 text-sm text-text-muted">
            {gefilterdeTermen.length} {gefilterdeTermen.length === 1 ? 'resultaat' : 'resultaten'} gevonden
          </p>
        )}
      </div>

      {/* Snelnavigatie */}
      {!zoekterm && (
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
      )}

      {/* Begrippen per categorie */}
      {categorieenMetResultaten.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-text-muted text-lg">
            Geen begrippen gevonden voor &ldquo;{zoekterm}&rdquo;
          </p>
          <button
            onClick={() => setZoekterm('')}
            className="mt-4 text-primary font-medium hover:underline"
          >
            Toon alle begrippen
          </button>
        </div>
      ) : (
        categorieenMetResultaten.map((cat) => {
          const items = gefilterdeTermen.filter((b) => b.categorie === cat);
          return (
            <div key={cat} id={cat} className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-bold text-text-main mb-6 flex items-center gap-3">
                <BookOpen size={24} className="text-primary" />
                {categorieLabels[cat]}
                <span className="text-sm font-normal text-text-muted">
                  ({items.length})
                </span>
              </h2>
              <div className="space-y-4">
                {items.map((begrip) => (
                  <div
                    key={begrip.term}
                    className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-text-main text-lg mb-2">
                      {begrip.term}
                    </h3>
                    <p className="text-text-muted leading-relaxed">{begrip.uitleg}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}

      {/* Totaal */}
      <div className="mt-12 bg-primary-light rounded-2xl p-6 text-center">
        <p className="text-primary font-medium">
          {begrippen.length} begrippen in {categorieVolgorde.length} categorieën — regelmatig bijgewerkt
        </p>
      </div>
    </section>
  );
}
