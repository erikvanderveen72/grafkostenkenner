// ============================================================
// Grafkostenkenner.nl — Fallback Data
// Bron: Gemeentelijke verordeningen 2025, particuliere begraafplaatsen
// ============================================================

// --- Interfaces ---

export type BegraafplaatsType =
  | 'gemeentelijk'
  | 'kerkelijk'
  | 'particulier'
  | 'natuur'
  | 'islamitisch'
  | 'joods'
  | 'urnen'
  | 'zee';

export type GrafType =
  | 'enkel'      // 1-laags graf
  | 'dubbel'     // 2-laags graf
  | 'kindergraf'
  | 'urnengraf'
  | 'urnennis'   // columbarium
  | 'asverstrooiing';

export interface GrafTarief {
  grafType: GrafType;
  grafTypeLabel: string;
  looptijd: number;       // in jaren
  tarief: number;         // in euro's
  verlengingPer?: number; // kosten per verlenging (per x jaar)
  verlengingJaren?: number; // per hoeveel jaar verlengd wordt
}

export interface OnderhoudTarief {
  type: 'verplicht' | 'optioneel' | 'niet_beschikbaar';
  perJaar?: number;        // kosten per jaar
  afkoopMogelijk?: boolean;
  afkoopBedrag?: number;   // eenmalig afkopen voor hele periode
  toelichting?: string;
}

export interface Begraafplaats {
  id: string;
  naam: string;
  type: BegraafplaatsType;
  typeLabel: string;
  gemeente: string;
  provincie: string;
  adres?: string;
  postcode?: string;
  plaats: string;
  latitude?: number;
  longitude?: number;
  website?: string;
  telefoon?: string;
  tariefJaar: number;      // jaartal van de tarieven
  grafTarieven: GrafTarief[];
  onderhoud: OnderhoudTarief;
  bijzonderheden?: string;
  eeuwigeGrafrust: boolean;
  bronVermelding?: string;
}

export interface Provincie {
  id: string;
  naam: string;
  slug: string;
  aantalBegraafplaatsen: number;
  beschikbaar: boolean;
}

// --- Provincies ---

export const provincies: Provincie[] = [
  { id: 'groningen', naam: 'Groningen', slug: 'groningen', aantalBegraafplaatsen: 13, beschikbaar: true },
  { id: 'friesland', naam: 'Friesland', slug: 'friesland', aantalBegraafplaatsen: 0, beschikbaar: false },
  { id: 'drenthe', naam: 'Drenthe', slug: 'drenthe', aantalBegraafplaatsen: 0, beschikbaar: false },
  { id: 'overijssel', naam: 'Overijssel', slug: 'overijssel', aantalBegraafplaatsen: 0, beschikbaar: false },
  { id: 'flevoland', naam: 'Flevoland', slug: 'flevoland', aantalBegraafplaatsen: 0, beschikbaar: false },
  { id: 'gelderland', naam: 'Gelderland', slug: 'gelderland', aantalBegraafplaatsen: 0, beschikbaar: false },
  { id: 'utrecht', naam: 'Utrecht', slug: 'utrecht', aantalBegraafplaatsen: 0, beschikbaar: false },
  { id: 'noord-holland', naam: 'Noord-Holland', slug: 'noord-holland', aantalBegraafplaatsen: 0, beschikbaar: false },
  { id: 'zuid-holland', naam: 'Zuid-Holland', slug: 'zuid-holland', aantalBegraafplaatsen: 0, beschikbaar: false },
  { id: 'zeeland', naam: 'Zeeland', slug: 'zeeland', aantalBegraafplaatsen: 0, beschikbaar: false },
  { id: 'noord-brabant', naam: 'Noord-Brabant', slug: 'noord-brabant', aantalBegraafplaatsen: 0, beschikbaar: false },
  { id: 'limburg', naam: 'Limburg', slug: 'limburg', aantalBegraafplaatsen: 0, beschikbaar: false },
];

// --- Begraafplaatsen Provincie Groningen ---
// Bron: Verordening begrafenisrechten 2025 gemeente Groningen, Midden-Groningen, RK Kerkhof, Natuurbegraafplaats Hoogengraven

export const begraafplaatsenGroningen: Begraafplaats[] = [
  // ===== GEMEENTE GRONINGEN =====
  {
    id: 'selwerderhof-groningen',
    naam: 'Selwerderhof',
    type: 'gemeentelijk',
    typeLabel: 'Gemeentelijke begraafplaats',
    gemeente: 'Groningen',
    provincie: 'Groningen',
    adres: 'Iepenlaan 204',
    postcode: '9741 GH',
    plaats: 'Groningen',
    latitude: 53.2381,
    longitude: 6.5500,
    website: 'https://gemeente.groningen.nl/begraafplaatsen',
    tariefJaar: 2025,
    grafTarieven: [
      // Enkel (1 verdieping) - 30 jaar
      { grafType: 'enkel', grafTypeLabel: 'Enkel graf (1-laags)', looptijd: 30, tarief: 2667 },
      // Dubbel (2 verdiepingen) - 30 jaar
      { grafType: 'dubbel', grafTypeLabel: 'Dubbel graf (2-laags)', looptijd: 30, tarief: 3734 },
      // Kindergraf
      { grafType: 'kindergraf', grafTypeLabel: 'Kindergraf', looptijd: 30, tarief: 1068 },
      // Urnengraf urnenveld - diverse looptijden
      { grafType: 'urnengraf', grafTypeLabel: 'Urnengraf (urnenveld)', looptijd: 10, tarief: 617 },
      { grafType: 'urnengraf', grafTypeLabel: 'Urnengraf (urnenveld)', looptijd: 20, tarief: 1233 },
      { grafType: 'urnengraf', grafTypeLabel: 'Urnengraf (urnenveld)', looptijd: 30, tarief: 1850 },
    ],
    onderhoud: {
      type: 'optioneel',
      perJaar: 70,
      afkoopMogelijk: false,
      toelichting: 'Onderhoud grafbedekking optioneel, vanaf €54-€264/jaar afhankelijk van type monument. Liggende steen €70/jaar.',
    },
    bijzonderheden: 'Grootste gemeentelijke begraafplaats van Groningen. Verlenging grafrecht kost 1/3 van het 30-jaar tarief per 10 jaar. Vrij-veld opties beschikbaar voor hogere tarieven.',
    eeuwigeGrafrust: false,
    bronVermelding: 'Verordening begrafenisrechten 2025, gemeente Groningen',
  },
  {
    id: 'esserveld-groningen',
    naam: 'Esserveld',
    type: 'gemeentelijk',
    typeLabel: 'Gemeentelijke begraafplaats',
    gemeente: 'Groningen',
    provincie: 'Groningen',
    adres: 'Esserweg',
    postcode: '9722 RB',
    plaats: 'Groningen',
    latitude: 53.2050,
    longitude: 6.5600,
    website: 'https://gemeente.groningen.nl/begraafplaatsen',
    tariefJaar: 2025,
    grafTarieven: [
      { grafType: 'enkel', grafTypeLabel: 'Enkel graf (1-laags)', looptijd: 30, tarief: 8002 },
      { grafType: 'dubbel', grafTypeLabel: 'Dubbel graf (2-laags)', looptijd: 30, tarief: 11203 },
      { grafType: 'kindergraf', grafTypeLabel: 'Kindergraf', looptijd: 30, tarief: 1068 },
      { grafType: 'urnengraf', grafTypeLabel: 'Urnengraf', looptijd: 10, tarief: 1850 },
      { grafType: 'urnengraf', grafTypeLabel: 'Urnengraf', looptijd: 20, tarief: 3699 },
      { grafType: 'urnengraf', grafTypeLabel: 'Urnengraf', looptijd: 30, tarief: 5549 },
    ],
    onderhoud: {
      type: 'optioneel',
      perJaar: 70,
      afkoopMogelijk: false,
      toelichting: 'Onderhoud grafbedekking optioneel, zelfde tarieven als Selwerderhof. Liggende steen €70/jaar.',
    },
    bijzonderheden: 'Exclusieve begraafplaats met de hoogste tarieven in gemeente Groningen. Gelegen in de wijk Helpman. Verlenging kost 1/3 van actueel 30-jaar tarief per 10 jaar.',
    eeuwigeGrafrust: false,
    bronVermelding: 'Verordening begrafenisrechten 2025, gemeente Groningen',
  },
  {
    id: 'noorder-zuiderbegraafplaats-groningen',
    naam: 'Noorder-/Zuiderbegraafplaats',
    type: 'gemeentelijk',
    typeLabel: 'Gemeentelijke begraafplaats',
    gemeente: 'Groningen',
    provincie: 'Groningen',
    plaats: 'Groningen',
    latitude: 53.2245,
    longitude: 6.5720,
    website: 'https://gemeente.groningen.nl/begraafplaatsen',
    tariefJaar: 2025,
    grafTarieven: [
      { grafType: 'enkel', grafTypeLabel: 'Enkel graf (1-laags)', looptijd: 30, tarief: 4001 },
      { grafType: 'dubbel', grafTypeLabel: 'Dubbel graf (2-laags)', looptijd: 30, tarief: 5601 },
      { grafType: 'kindergraf', grafTypeLabel: 'Kindergraf', looptijd: 30, tarief: 1068 },
      { grafType: 'urnengraf', grafTypeLabel: 'Urnengraf', looptijd: 10, tarief: 927 },
      { grafType: 'urnengraf', grafTypeLabel: 'Urnengraf', looptijd: 20, tarief: 1854 },
      { grafType: 'urnengraf', grafTypeLabel: 'Urnengraf', looptijd: 30, tarief: 2780 },
    ],
    onderhoud: {
      type: 'optioneel',
      perJaar: 70,
      afkoopMogelijk: false,
      toelichting: 'Onderhoud niet verplicht. U heeft wel een onderhoudsplicht. Optioneel onderhoudscontract vanaf €54/jaar.',
    },
    bijzonderheden: 'Historische begraafplaatsen in het centrum van Groningen. Zelfde tarief als Eshof en Harenerhof. Verlenging 1/3 van 30-jaar tarief per 10 jaar.',
    eeuwigeGrafrust: false,
    bronVermelding: 'Verordening begrafenisrechten 2025, gemeente Groningen',
  },
  // ===== R.K. KERKHOF (KERKELIJK) =====
  {
    id: 'rk-kerkhof-hereweg-groningen',
    naam: 'R.K. Kerkhof Hereweg',
    type: 'kerkelijk',
    typeLabel: 'Kerkelijke begraafplaats',
    gemeente: 'Groningen',
    provincie: 'Groningen',
    adres: 'Hereweg',
    postcode: '9725 AA',
    plaats: 'Groningen',
    latitude: 53.2014,
    longitude: 6.5700,
    tariefJaar: 2026,
    grafTarieven: [
      { grafType: 'enkel', grafTypeLabel: 'Enkel graf (1-laags)', looptijd: 20, tarief: 1200 },
      { grafType: 'enkel', grafTypeLabel: 'Enkel graf (1-laags)', looptijd: 40, tarief: 2200 },
      { grafType: 'enkel', grafTypeLabel: 'Enkel graf (1-laags)', looptijd: 60, tarief: 3000 },
    ],
    onderhoud: {
      type: 'verplicht',
      perJaar: 56,
      afkoopMogelijk: false,
      toelichting: 'Onderhoud is verplicht, €56 per jaar voor de gehele looptijd.',
    },
    bijzonderheden: 'Particuliere kerkelijke begraafplaats. Tarieven niet publiek online beschikbaar. Relatief betaalbaar vergeleken met gemeentelijke begraafplaatsen.',
    eeuwigeGrafrust: false,
    bronVermelding: 'Stichting R.K. Kerkhof Groningen (2026)',
  },
  // ===== GEMEENTE MIDDEN-GRONINGEN =====
  {
    id: 'stille-hof-hoogezand',
    naam: 'De Stille Hof',
    type: 'gemeentelijk',
    typeLabel: 'Gemeentelijke begraafplaats',
    gemeente: 'Midden-Groningen',
    provincie: 'Groningen',
    plaats: 'Hoogezand',
    latitude: 53.1614,
    longitude: 6.7628,
    website: 'https://www.midden-groningen.nl/begraven-midden-groningen',
    tariefJaar: 2025,
    grafTarieven: [
      { grafType: 'enkel', grafTypeLabel: 'Enkel graf (1-laags)', looptijd: 10, tarief: 480 },
      { grafType: 'enkel', grafTypeLabel: 'Enkel graf (1-laags)', looptijd: 20, tarief: 960 },
      { grafType: 'enkel', grafTypeLabel: 'Enkel graf (1-laags)', looptijd: 30, tarief: 1440 },
      { grafType: 'enkel', grafTypeLabel: 'Enkel graf (1-laags)', looptijd: 50, tarief: 2400 },
      { grafType: 'kindergraf', grafTypeLabel: 'Kindergraf', looptijd: 20, tarief: 480 },
      { grafType: 'kindergraf', grafTypeLabel: 'Kindergraf', looptijd: 30, tarief: 720 },
      { grafType: 'urnengraf', grafTypeLabel: 'Urnengraf (urnentuin)', looptijd: 10, tarief: 158 },
      { grafType: 'urnengraf', grafTypeLabel: 'Urnengraf (urnentuin)', looptijd: 20, tarief: 316 },
      { grafType: 'urnengraf', grafTypeLabel: 'Urnengraf (urnentuin)', looptijd: 30, tarief: 474 },
      { grafType: 'urnennis', grafTypeLabel: 'Urnennis (urnenmuur)', looptijd: 10, tarief: 640 },
      { grafType: 'urnennis', grafTypeLabel: 'Urnennis (urnenmuur)', looptijd: 20, tarief: 1280 },
      { grafType: 'urnennis', grafTypeLabel: 'Urnennis (urnenmuur)', looptijd: 30, tarief: 1920 },
    ],
    onderhoud: {
      type: 'optioneel',
      perJaar: 118,
      afkoopMogelijk: true,
      toelichting: 'Onderhoud optioneel. €118/jaar of afkopen: €1.176 (10 jr), €2.352 (20 jr), €3.528 (30 jr). Knijpslaan Oost slechts €15/jaar.',
    },
    bijzonderheden: 'Laagste grafkosten in de provincie Groningen. Enige begraafplaats in Midden-Groningen met dubbeldiepe mogelijkheid. Verlenging per 5, 10 of 20 jaar mogelijk.',
    eeuwigeGrafrust: false,
    bronVermelding: 'Verordening lijkbezorgingsrechten 2025, gemeente Midden-Groningen',
  },
  // ===== GEMEENTE TYNAARLO =====
  {
    id: 'walakker-tynaarlo',
    naam: 'Begraafplaats De Walakker',
    type: 'gemeentelijk',
    typeLabel: 'Gemeentelijke begraafplaats',
    gemeente: 'Tynaarlo',
    provincie: 'Groningen',
    adres: 'De Walakker',
    plaats: 'Vries',
    latitude: 53.0833,
    longitude: 6.5833,
    tariefJaar: 2026,
    grafTarieven: [
      { grafType: 'enkel', grafTypeLabel: 'Enkel graf (1-laags)', looptijd: 20, tarief: 5528.45 },
      { grafType: 'enkel', grafTypeLabel: 'Enkel graf (1-laags)', looptijd: 40, tarief: 7486.85, verlengingPer: 1958.40, verlengingJaren: 20 },
      { grafType: 'enkel', grafTypeLabel: 'Enkel graf (1-laags)', looptijd: 60, tarief: 9445.25, verlengingPer: 1958.40, verlengingJaren: 20 },
    ],
    onderhoud: {
      type: 'optioneel',
      perJaar: 110.50,
      afkoopMogelijk: true,
      toelichting: 'Onderhoud is optioneel maar kan vooruitbetaald worden. €110,50 per jaar.',
    },
    bijzonderheden: 'Grafrechten worden per 20 jaar verleend. Verlenging kost €1.958,40 per 20 jaar extra.',
    eeuwigeGrafrust: false,
    bronVermelding: 'Gemeente Tynaarlo, Legesverordening 2026',
  },
  // ===== NATUURBEGRAAFPLAATS =====
  {
    id: 'hoogengraven-natuurbegraafplaats',
    naam: 'Natuurbegraafplaats Hoogengraven',
    type: 'natuur',
    typeLabel: 'Natuurbegraafplaats',
    gemeente: 'Noordenveld',
    provincie: 'Groningen',
    plaats: 'Norg',
    latitude: 53.0600,
    longitude: 6.4500,
    website: 'https://www.natuurbegraafplaatshoogengraven.nl',
    tariefJaar: 2026,
    grafTarieven: [
      // Eeuwig grafrecht - looptijd 99 als indicator
      { grafType: 'enkel', grafTypeLabel: 'Enkel bosgraf (eeuwig)', looptijd: 99, tarief: 4500 },
      { grafType: 'dubbel', grafTypeLabel: 'Dubbeldiep bosgraf (eeuwig)', looptijd: 99, tarief: 8000 },
      { grafType: 'urnengraf', grafTypeLabel: 'Urngraf bos (eeuwig)', looptijd: 99, tarief: 2400 },
      { grafType: 'enkel', grafTypeLabel: 'Enkel heide/poelengraf (eeuwig)', looptijd: 99, tarief: 5300 },
      { grafType: 'dubbel', grafTypeLabel: 'Dubbeldiep heide/poelengraf (eeuwig)', looptijd: 99, tarief: 9200 },
      { grafType: 'urnengraf', grafTypeLabel: 'Urngraf heide/poelen (eeuwig)', looptijd: 99, tarief: 2950 },
    ],
    onderhoud: {
      type: 'niet_beschikbaar',
      toelichting: 'Geen onderhoud nodig. De natuur neemt het graf op. Gedenktekens in de vorm van boomschijven zijn kostenloos.',
    },
    bijzonderheden: 'Eeuwig grafrecht inclusief. Geen onderhoud nodig, geen grafmonument. Boomschijf als gedenkteken. Begraafkosten (grafdelving) apart: €875 voor bosgraf, €395 voor urngraf.',
    eeuwigeGrafrust: true,
    bronVermelding: 'Natuurbegraafplaats Hoogengraven, tarievenlijst 2026',
  },
  // ===== GEMEENTE HET HOGELAND =====
  {
    id: 'het-hogeland-begraafplaatsen',
    naam: 'Begraafplaatsen Het Hogeland',
    type: 'gemeentelijk',
    typeLabel: 'Gemeentelijke begraafplaats',
    gemeente: 'Het Hogeland',
    provincie: 'Groningen',
    plaats: 'Winsum',
    website: 'https://www.hethogeland.nl',
    tariefJaar: 2025,
    grafTarieven: [
      { grafType: 'enkel', grafTypeLabel: 'Enkel graf (1-laags)', looptijd: 10, tarief: 788 },
      { grafType: 'enkel', grafTypeLabel: 'Enkel graf (1-laags)', looptijd: 30, tarief: 2364 },
      { grafType: 'enkel', grafTypeLabel: 'Enkel graf (1-laags)', looptijd: 50, tarief: 3941 },
      { grafType: 'kindergraf', grafTypeLabel: 'Kindergraf', looptijd: 30, tarief: 1182 },
      { grafType: 'kindergraf', grafTypeLabel: 'Kindergraf', looptijd: 50, tarief: 1970 },
      { grafType: 'urnengraf', grafTypeLabel: 'Urnengraf', looptijd: 10, tarief: 524 },
      { grafType: 'urnengraf', grafTypeLabel: 'Urnengraf', looptijd: 30, tarief: 1575 },
      { grafType: 'urnennis', grafTypeLabel: 'Urnennis (columbarium)', looptijd: 30, tarief: 788 },
      { grafType: 'urnennis', grafTypeLabel: 'Urnennis (columbarium)', looptijd: 50, tarief: 1314 },
    ],
    onderhoud: {
      type: 'optioneel',
      toelichting: 'Onderhoud niet verplicht. Grafbedekking is eigen verantwoordelijkheid.',
    },
    bijzonderheden: 'Meerdere begraafplaatsen verspreid over de gemeente. Zelfde tarief op alle locaties.',
    eeuwigeGrafrust: false,
    bronVermelding: 'Verordening lijkbezorgingsrechten 2025, gemeente Het Hogeland',
  },
  // ===== GEMEENTE EEMSDELTA =====
  {
    id: 'eemsdelta-begraafplaatsen',
    naam: 'Begraafplaatsen Eemsdelta',
    type: 'gemeentelijk',
    typeLabel: 'Gemeentelijke begraafplaats',
    gemeente: 'Eemsdelta',
    provincie: 'Groningen',
    plaats: 'Appingedam',
    website: 'https://www.eemsdelta.nl/regels-en-tarieven-voor-begraven',
    tariefJaar: 2025,
    grafTarieven: [
      { grafType: 'enkel', grafTypeLabel: 'Enkel graf (1-laags)', looptijd: 10, tarief: 977 },
      { grafType: 'enkel', grafTypeLabel: 'Enkel graf (1-laags)', looptijd: 30, tarief: 2442 },
      { grafType: 'kindergraf', grafTypeLabel: 'Kindergraf (< 12 jaar)', looptijd: 10, tarief: 488 },
      { grafType: 'kindergraf', grafTypeLabel: 'Kindergraf (< 12 jaar)', looptijd: 30, tarief: 1221 },
      { grafType: 'urnengraf', grafTypeLabel: 'Urnengraf', looptijd: 10, tarief: 407 },
      { grafType: 'urnennis', grafTypeLabel: 'Urnennis', looptijd: 10, tarief: 407 },
    ],
    onderhoud: {
      type: 'optioneel',
      toelichting: 'Onderhoud niet verplicht. 14 begraafplaatsen verspreid over de gemeente (o.a. De Wierde, Rusthof, Stilleweer, Maarhof).',
    },
    bijzonderheden: '14 begraafplaatsen in de gemeente (Appingedam, Delfzijl, Loppersum e.o.). Grafrechten voor 10 of 30 jaar.',
    eeuwigeGrafrust: false,
    bronVermelding: 'Verordening begraafrechten Eemsdelta 2025',
  },
  // ===== GEMEENTE WESTERKWARTIER =====
  {
    id: 'westerkwartier-begraafplaatsen',
    naam: 'Begraafplaatsen Westerkwartier',
    type: 'gemeentelijk',
    typeLabel: 'Gemeentelijke begraafplaats',
    gemeente: 'Westerkwartier',
    provincie: 'Groningen',
    plaats: 'Leek',
    website: 'https://www.westerkwartier.nl/begraven-of-cremeren',
    tariefJaar: 2024,
    grafTarieven: [
      { grafType: 'enkel', grafTypeLabel: 'Enkel graf (1-laags)', looptijd: 20, tarief: 2035 },
      { grafType: 'enkel', grafTypeLabel: 'Enkel graf (1-laags)', looptijd: 30, tarief: 3053 },
      { grafType: 'dubbel', grafTypeLabel: 'Dubbel graf (2-laags)', looptijd: 20, tarief: 4071 },
      { grafType: 'dubbel', grafTypeLabel: 'Dubbel graf (2-laags)', looptijd: 30, tarief: 6106 },
      { grafType: 'kindergraf', grafTypeLabel: 'Kindergraf (1-12 jaar)', looptijd: 20, tarief: 1018 },
      { grafType: 'kindergraf', grafTypeLabel: 'Kindergraf (1-12 jaar)', looptijd: 30, tarief: 1526 },
    ],
    onderhoud: {
      type: 'optioneel',
      toelichting: 'Algemeen onderhoud van de begraafplaats is inbegrepen in de grafrechten. Onderhoud van de grafbedekking is eigen verantwoordelijkheid.',
    },
    bijzonderheden: '27 gemeentelijke begraafplaatsen in het Westerkwartier. Alle locaties hanteren hetzelfde tarief.',
    eeuwigeGrafrust: false,
    bronVermelding: 'Verordening lijkbezorgingsrechten 2024, gemeente Westerkwartier',
  },
  // ===== GEMEENTE STADSKANAAL =====
  {
    id: 'stadskanaal-begraafplaatsen',
    naam: 'Begraafplaatsen Stadskanaal',
    type: 'gemeentelijk',
    typeLabel: 'Gemeentelijke begraafplaats',
    gemeente: 'Stadskanaal',
    provincie: 'Groningen',
    plaats: 'Stadskanaal',
    website: 'https://www.stadskanaal.nl',
    tariefJaar: 2026,
    grafTarieven: [
      { grafType: 'enkel', grafTypeLabel: 'Enkel graf (1-laags)', looptijd: 25, tarief: 2176 },
      { grafType: 'kindergraf', grafTypeLabel: 'Kindergraf (1-12 jaar)', looptijd: 25, tarief: 1088 },
      { grafType: 'urnengraf', grafTypeLabel: 'Urnengraf', looptijd: 25, tarief: 1088 },
    ],
    onderhoud: {
      type: 'optioneel',
      toelichting: 'Algemeen onderhoud inbegrepen. Verlenging per 10 jaar: €516 (volwassene).',
    },
    bijzonderheden: 'Grafrechten worden verleend voor 25 jaar. Verlenging per 10 jaar mogelijk (€516,25 volwassene, €258,13 kind).',
    eeuwigeGrafrust: false,
    bronVermelding: 'Verordening begrafenisrechten Stadskanaal 2026',
  },
  // ===== GEMEENTE WESTERWOLDE =====
  {
    id: 'westerwolde-begraafplaatsen',
    naam: 'Begraafplaatsen Westerwolde',
    type: 'gemeentelijk',
    typeLabel: 'Gemeentelijke begraafplaats',
    gemeente: 'Westerwolde',
    provincie: 'Groningen',
    plaats: 'Vlagtwedde',
    website: 'https://www.westerwolde.nl/begraven-en-begraafplaatsen',
    tariefJaar: 2025,
    grafTarieven: [
      { grafType: 'enkel', grafTypeLabel: 'Enkel graf (1-laags)', looptijd: 10, tarief: 645 },
      { grafType: 'enkel', grafTypeLabel: 'Enkel graf (1-laags)', looptijd: 20, tarief: 1286 },
      { grafType: 'enkel', grafTypeLabel: 'Enkel graf (1-laags)', looptijd: 30, tarief: 1932 },
      { grafType: 'kindergraf', grafTypeLabel: 'Kindergraf (< 12 jaar)', looptijd: 10, tarief: 257 },
      { grafType: 'kindergraf', grafTypeLabel: 'Kindergraf (< 12 jaar)', looptijd: 20, tarief: 513 },
      { grafType: 'urnengraf', grafTypeLabel: 'Urnengraf', looptijd: 10, tarief: 278 },
      { grafType: 'urnengraf', grafTypeLabel: 'Urnengraf', looptijd: 20, tarief: 551 },
      { grafType: 'urnengraf', grafTypeLabel: 'Urnengraf', looptijd: 30, tarief: 825 },
    ],
    onderhoud: {
      type: 'optioneel',
      toelichting: 'Onderhoud niet verplicht. Verlenging in stappen van 10 jaar mogelijk.',
    },
    bijzonderheden: 'Meerdere begraafplaatsen in Vlagtwedde, Bellingwolde en omgeving. Verlenging per 10 jaar na afloop termijn.',
    eeuwigeGrafrust: false,
    bronVermelding: 'Verordening lijkbezorgingsrechten 2025, gemeente Westerwolde',
  },
  // ===== GEMEENTE PEKELA =====
  {
    id: 'pekela-begraafplaatsen',
    naam: 'Begraafplaatsen Pekela',
    type: 'gemeentelijk',
    typeLabel: 'Gemeentelijke begraafplaats',
    gemeente: 'Pekela',
    provincie: 'Groningen',
    plaats: 'Oude Pekela',
    tariefJaar: 2024,
    grafTarieven: [
      { grafType: 'enkel', grafTypeLabel: 'Enkel graf (1-laags)', looptijd: 30, tarief: 2751 },
      { grafType: 'dubbel', grafTypeLabel: 'Dubbel graf (2-laags)', looptijd: 30, tarief: 3944 },
      { grafType: 'kindergraf', grafTypeLabel: 'Kindergraf (1-12 jaar)', looptijd: 30, tarief: 1435 },
      { grafType: 'urnengraf', grafTypeLabel: 'Urnengraf', looptijd: 30, tarief: 3212 },
      { grafType: 'urnennis', grafTypeLabel: 'Urnennis', looptijd: 10, tarief: 778 },
      { grafType: 'urnennis', grafTypeLabel: 'Urnennis', looptijd: 20, tarief: 1503 },
    ],
    onderhoud: {
      type: 'optioneel',
      toelichting: 'Onderhoud niet verplicht. Verlenging enkel graf: €498 per 5 jaar of €985 per 10 jaar.',
    },
    bijzonderheden: 'Begraafplaatsen Wedderweg en H.B. Hulsmanstraat. Grafrechten standaard voor 30 jaar. Verlenging per 5 of 10 jaar.',
    eeuwigeGrafrust: false,
    bronVermelding: 'Verordening lijkbezorgingsrechten 2024, gemeente Pekela',
  },
];

// --- Helperfuncties ---

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function berekenTotaalKosten(
  begraafplaats: Begraafplaats,
  grafType: GrafType,
  looptijd: number,
  inclusiefOnderhoud: boolean,
): {
  grafrechten: number;
  onderhoud: number;
  totaal: number;
  perJaar: number;
  gevonden: boolean;
} {
  const tarief = begraafplaats.grafTarieven.find(
    (t) => t.grafType === grafType && t.looptijd === looptijd,
  );

  if (!tarief) {
    return { grafrechten: 0, onderhoud: 0, totaal: 0, perJaar: 0, gevonden: false };
  }

  const grafrechten = tarief.tarief;

  let onderhoud = 0;
  if (inclusiefOnderhoud && begraafplaats.onderhoud.perJaar) {
    const effectieveLooptijd = looptijd === 99 ? 1 : looptijd; // eeuwig = eenmalig
    onderhoud = begraafplaats.onderhoud.perJaar * effectieveLooptijd;
  }

  const totaal = grafrechten + onderhoud;
  const effectieveLooptijd = looptijd === 99 ? 50 : looptijd; // eeuwig ≈ 50 jaar voor per-jaar berekening
  const perJaar = totaal / effectieveLooptijd;

  return { grafrechten, onderhoud, totaal, perJaar, gevonden: true };
}

export function getUniekeLooptijden(begraafplaatsen: Begraafplaats[], grafType: GrafType): number[] {
  const looptijden = new Set<number>();
  begraafplaatsen.forEach((bp) => {
    bp.grafTarieven
      .filter((t) => t.grafType === grafType)
      .forEach((t) => looptijden.add(t.looptijd));
  });
  return Array.from(looptijden).sort((a, b) => a - b);
}

export function getUniekeGrafTypes(begraafplaatsen: Begraafplaats[]): GrafType[] {
  const types = new Set<GrafType>();
  begraafplaatsen.forEach((bp) => {
    bp.grafTarieven.forEach((t) => types.add(t.grafType));
  });
  return Array.from(types);
}
