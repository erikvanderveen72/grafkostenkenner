// ============================================================
// Grafkostenkenner.nl — Fallback Data
// Bron: Gemeentelijke verordeningen, particuliere begraafplaatsen
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
  { id: 'groningen', naam: 'Groningen', slug: 'groningen', aantalBegraafplaatsen: 2, beschikbaar: true },
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
// Bron: Gemeentelijke legesverordeningen 2026, RK Kerkhof Groningen

export const begraafplaatsenGroningen: Begraafplaats[] = [
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
    website: undefined,
    telefoon: undefined,
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
      {
        grafType: 'enkel',
        grafTypeLabel: 'Enkel graf (1-laags)',
        looptijd: 40,
        tarief: 7486.85,
        verlengingPer: 1958.40,
        verlengingJaren: 20,
      },
      {
        grafType: 'enkel',
        grafTypeLabel: 'Enkel graf (1-laags)',
        looptijd: 60,
        tarief: 9445.25,
        verlengingPer: 1958.40,
        verlengingJaren: 20,
      },
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
  // Zoek de juiste tariefregel
  const tarief = begraafplaats.grafTarieven.find(
    (t) => t.grafType === grafType && t.looptijd === looptijd,
  );

  if (!tarief) {
    return { grafrechten: 0, onderhoud: 0, totaal: 0, perJaar: 0, gevonden: false };
  }

  const grafrechten = tarief.tarief;

  let onderhoud = 0;
  if (inclusiefOnderhoud && begraafplaats.onderhoud.perJaar) {
    onderhoud = begraafplaats.onderhoud.perJaar * looptijd;
  }

  const totaal = grafrechten + onderhoud;
  const perJaar = totaal / looptijd;

  return { grafrechten, onderhoud, totaal, perJaar, gevonden: true };
}
