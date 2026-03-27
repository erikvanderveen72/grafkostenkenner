#!/usr/bin/env python3
"""
Genereer fallback-data.ts vanuit grafrechten_all.json
=====================================================
Transformeert de CVDR scraper output naar TypeScript data voor de website.
Mapt gemeenten naar provincies en genereert per-provincie exports.
"""

import importlib
import json
import os
import re
import unicodedata

# === Gemeente → Provincie mapping (alle 342 gemeenten 2025) ===
GEMEENTE_PROVINCIE = {
    # Groningen
    "Groningen": "Groningen", "Het Hogeland": "Groningen", "Westerkwartier": "Groningen",
    "Midden-Groningen": "Groningen", "Oldambt": "Groningen", "Pekela": "Groningen",
    "Veendam": "Groningen", "Westerwolde": "Groningen", "Stadskanaal": "Groningen",
    "Eemsdelta": "Groningen",
    # Friesland
    "Leeuwarden": "Friesland", "Súdwest-Fryslân": "Friesland", "De Fryske Marren": "Friesland",
    "Noardeast-Fryslân": "Friesland", "Smallingerland": "Friesland", "Opsterland": "Friesland",
    "Heerenveen": "Friesland", "Weststellingwerf": "Friesland", "Ooststellingwerf": "Friesland",
    "Tytsjerksteradiel": "Friesland", "Achtkarspelen": "Friesland", "Dantumadiel": "Friesland",
    "Harlingen": "Friesland", "Waadhoeke": "Friesland", "Vlieland": "Friesland",
    "Terschelling": "Friesland", "Ameland": "Friesland", "Schiermonnikoog": "Friesland",
    # Drenthe
    "Assen": "Drenthe", "Emmen": "Drenthe", "Hoogeveen": "Drenthe", "Meppel": "Drenthe",
    "Coevorden": "Drenthe", "Borger-Odoorn": "Drenthe", "Aa en Hunze": "Drenthe",
    "Tynaarlo": "Drenthe", "Noordenveld": "Drenthe", "Westerveld": "Drenthe",
    "De Wolden": "Drenthe", "Midden-Drenthe": "Drenthe",
    # Overijssel
    "Zwolle": "Overijssel", "Deventer": "Overijssel", "Enschede": "Overijssel",
    "Hengelo": "Overijssel", "Almelo": "Overijssel", "Kampen": "Overijssel",
    "Hardenberg": "Overijssel", "Hof van Twente": "Overijssel", "Olst-Wijhe": "Overijssel",
    "Raalte": "Overijssel", "Dalfsen": "Overijssel", "Staphorst": "Overijssel",
    "Steenwijkerland": "Overijssel", "Twenterand": "Overijssel", "Rijssen-Holten": "Overijssel",
    "Hellendoorn": "Overijssel", "Wierden": "Overijssel", "Tubbergen": "Overijssel",
    "Dinkelland": "Overijssel", "Losser": "Overijssel", "Oldenzaal": "Overijssel",
    "Borne": "Overijssel", "Haaksbergen": "Overijssel",
    # Flevoland
    "Almere": "Flevoland", "Lelystad": "Flevoland", "Dronten": "Flevoland",
    "Noordoostpolder": "Flevoland", "Urk": "Flevoland", "Zeewolde": "Flevoland",
    # Gelderland
    "Arnhem": "Gelderland", "Nijmegen": "Gelderland", "Apeldoorn": "Gelderland",
    "Ede": "Gelderland", "Barneveld": "Gelderland", "Doesburg": "Gelderland",
    "Duiven": "Gelderland", "Elburg": "Gelderland", "Ermelo": "Gelderland",
    "Harderwijk": "Gelderland", "Hattem": "Gelderland", "Heerde": "Gelderland",
    "Brummen": "Gelderland", "Buren": "Gelderland", "Berg en Dal": "Gelderland",
    "Druten": "Gelderland", "Heumen": "Gelderland", "Lingewaard": "Gelderland",
    "Maasdriel": "Gelderland", "Neder-Betuwe": "Gelderland", "Overbetuwe": "Gelderland",
    "Renkum": "Gelderland", "Rheden": "Gelderland", "Rozendaal": "Gelderland",
    "Scherpenzeel": "Gelderland", "Wageningen": "Gelderland", "West Betuwe": "Gelderland",
    "Westervoort": "Gelderland", "Wijchen": "Gelderland", "Zaltbommel": "Gelderland",
    "Zevenaar": "Gelderland", "Zutphen": "Gelderland", "Aalten": "Gelderland",
    "Berkelland": "Gelderland", "Bronckhorst": "Gelderland", "Doetinchem": "Gelderland",
    "Lochem": "Gelderland", "Montferland": "Gelderland", "Oost Gelre": "Gelderland",
    "Oude IJsselstreek": "Gelderland", "Winterswijk": "Gelderland", "Voorst": "Gelderland",
    "Beuningen": "Gelderland", "Tiel": "Gelderland", "Culemborg": "Gelderland",
    "Putten": "Gelderland", "Ermelo": "Gelderland", "Nunspeet": "Gelderland",
    "Oldebroek": "Gelderland", "Epe": "Gelderland", "Nijkerk": "Gelderland",
    # Utrecht
    "Utrecht": "Utrecht", "Amersfoort": "Utrecht", "Veenendaal": "Utrecht",
    "Houten": "Utrecht", "Leusden": "Utrecht", "Soest": "Utrecht",
    "Utrechtse Heuvelrug": "Utrecht", "Vijfheerenlanden": "Utrecht",
    "Montfoort": "Utrecht", "Oudewater": "Utrecht", "Woerden": "Utrecht",
    "De Bilt": "Utrecht", "Bunnik": "Utrecht", "Wijk bij Duurstede": "Utrecht",
    "Zeist": "Utrecht", "Baarn": "Utrecht", "De Ronde Venen": "Utrecht",
    "Stichtse Vecht": "Utrecht", "IJsselstein": "Utrecht", "Lopik": "Utrecht",
    "Nieuwegein": "Utrecht", "Bunschoten": "Utrecht", "Rhenen": "Utrecht",
    "Renswoude": "Utrecht",
    # Noord-Holland
    "Amsterdam": "Noord-Holland", "Haarlem": "Noord-Holland", "Zaanstad": "Noord-Holland",
    "Haarlemmermeer": "Noord-Holland", "Amstelveen": "Noord-Holland", "Alkmaar": "Noord-Holland",
    "Den Helder": "Noord-Holland", "Hoorn": "Noord-Holland", "Purmerend": "Noord-Holland",
    "Hilversum": "Noord-Holland", "Heerhugowaard": "Noord-Holland", "Diemen": "Noord-Holland",
    "Bergen (NH)": "Noord-Holland", "Bloemendaal": "Noord-Holland", "Castricum": "Noord-Holland",
    "Heemstede": "Noord-Holland", "Heiloo": "Noord-Holland", "Hollands Kroon": "Noord-Holland",
    "Huizen": "Noord-Holland", "Koggenland": "Noord-Holland", "Landsmeer": "Noord-Holland",
    "Medemblik": "Noord-Holland", "Oostzaan": "Noord-Holland", "Opmeer": "Noord-Holland",
    "Texel": "Noord-Holland", "Uitgeest": "Noord-Holland", "Waterland": "Noord-Holland",
    "Wijdemeren": "Noord-Holland", "Wormerland": "Noord-Holland", "Aalsmeer": "Noord-Holland",
    "Ouder-Amstel": "Noord-Holland", "Uithoorn": "Noord-Holland", "Gooise Meren": "Noord-Holland",
    "Blaricum": "Noord-Holland", "Laren": "Noord-Holland", "Edam-Volendam": "Noord-Holland",
    "Enkhuizen": "Noord-Holland", "Stede Broec": "Noord-Holland", "Drechterland": "Noord-Holland",
    "Schagen": "Noord-Holland", "Velsen": "Noord-Holland", "Beverwijk": "Noord-Holland",
    "Heemskerk": "Noord-Holland",
    # Zuid-Holland
    "Rotterdam": "Zuid-Holland", "Den Haag": "Zuid-Holland", "'s-Gravenhage": "Zuid-Holland",
    "Leiden": "Zuid-Holland", "Dordrecht": "Zuid-Holland", "Zoetermeer": "Zuid-Holland",
    "Delft": "Zuid-Holland", "Vlaardingen": "Zuid-Holland", "Schiedam": "Zuid-Holland",
    "Maassluis": "Zuid-Holland", "Gorinchem": "Zuid-Holland", "Leiderdorp": "Zuid-Holland",
    "Albrandswaard": "Zuid-Holland", "Barendrecht": "Zuid-Holland", "Ridderkerk": "Zuid-Holland",
    "Hendrik-Ido-Ambacht": "Zuid-Holland", "Papendrecht": "Zuid-Holland",
    "Krimpen aan den IJssel": "Zuid-Holland", "Krimpenerwaard": "Zuid-Holland",
    "Hardinxveld-Giessendam": "Zuid-Holland", "Bodegraven-Reeuwijk": "Zuid-Holland",
    "Waddinxveen": "Zuid-Holland", "Voorschoten": "Zuid-Holland", "Noordwijk": "Zuid-Holland",
    "Leidschendam-Voorburg": "Zuid-Holland", "Westland": "Zuid-Holland",
    "Hoeksche Waard": "Zuid-Holland", "Voorne aan Zee": "Zuid-Holland",
    "Nissewaard": "Zuid-Holland", "Hillegom": "Zuid-Holland",
    "Kaag en Braassem": "Zuid-Holland", "Sliedrecht": "Zuid-Holland",
    "Zwijndrecht": "Zuid-Holland", "Alblasserdam": "Zuid-Holland",
    "Molenlanden": "Zuid-Holland", "Goeree-Overflakkee": "Zuid-Holland",
    # Zeeland
    "Middelburg": "Zeeland", "Vlissingen": "Zeeland", "Goes": "Zeeland",
    "Terneuzen": "Zeeland", "Hulst": "Zeeland", "Sluis": "Zeeland",
    "Schouwen-Duiveland": "Zeeland", "Borsele": "Zeeland", "Kapelle": "Zeeland",
    "Reimerswaal": "Zeeland", "Noord-Beveland": "Zeeland", "Veere": "Zeeland",
    "Tholen": "Zeeland",
    # Noord-Brabant
    "Eindhoven": "Noord-Brabant", "'s-Hertogenbosch": "Noord-Brabant", "Tilburg": "Noord-Brabant",
    "Breda": "Noord-Brabant", "Bergen op Zoom": "Noord-Brabant", "Etten-Leur": "Noord-Brabant",
    "Alphen-Chaam": "Noord-Brabant", "Altena": "Noord-Brabant", "Asten": "Noord-Brabant",
    "Best": "Noord-Brabant", "Boekel": "Noord-Brabant", "Heeze-Leende": "Noord-Brabant",
    "Heusden": "Noord-Brabant", "Land van Cuijk": "Noord-Brabant",
    "Nuenen, Gerwen en Nederwetten": "Noord-Brabant", "Rucphen": "Noord-Brabant",
    "Sint-Michielsgestel": "Noord-Brabant", "Steenbergen": "Noord-Brabant",
    "Valkenswaard": "Noord-Brabant", "Vught": "Noord-Brabant", "Waalre": "Noord-Brabant",
    "Woensdrecht": "Noord-Brabant", "Zundert": "Noord-Brabant",
    "Bernheze": "Noord-Brabant", "Cranendonck": "Noord-Brabant",
    "Geertruidenberg": "Noord-Brabant", "Geldrop-Mierlo": "Noord-Brabant",
    "Bladel": "Noord-Brabant", "Boxtel": "Noord-Brabant", "Deurne": "Noord-Brabant",
    "Dongen": "Noord-Brabant", "Drimmelen": "Noord-Brabant", "Eersel": "Noord-Brabant",
    "Gilze en Rijen": "Noord-Brabant", "Goirle": "Noord-Brabant", "Halderberge": "Noord-Brabant",
    "Hilvarenbeek": "Noord-Brabant", "Laarbeek": "Noord-Brabant", "Loon op Zand": "Noord-Brabant",
    "Meierijstad": "Noord-Brabant", "Moerdijk": "Noord-Brabant", "Oirschot": "Noord-Brabant",
    "Oisterwijk": "Noord-Brabant", "Oss": "Noord-Brabant", "Roosendaal": "Noord-Brabant",
    "Rucphen": "Noord-Brabant", "Someren": "Noord-Brabant", "Son en Breugel": "Noord-Brabant",
    "Waalwijk": "Noord-Brabant",
    # Limburg
    "Maastricht": "Limburg", "Venlo": "Limburg", "Heerlen": "Limburg",
    "Sittard-Geleen": "Limburg", "Roermond": "Limburg", "Kerkrade": "Limburg",
    "Brunssum": "Limburg", "Beekdaelen": "Limburg", "Gulpen-Wittem": "Limburg",
    "Horst aan de Maas": "Limburg", "Maasgouw": "Limburg", "Nederweert": "Limburg",
    "Peel en Maas": "Limburg", "Simpelveld": "Limburg", "Valkenburg aan de Geul": "Limburg",
    "Venray": "Limburg", "Voerendaal": "Limburg", "Weert": "Limburg",
    "Beesel": "Limburg", "Bergen (L)": "Limburg", "Echt-Susteren": "Limburg",
    "Eijsden-Margraten": "Limburg", "Gennep": "Limburg", "Landgraaf": "Limburg",
    "Leudal": "Limburg", "Meerssen": "Limburg", "Mook en Middelaar": "Limburg",
    "Stein": "Limburg", "Vaals": "Limburg",
}


def slugify(text: str) -> str:
    """Maak een URL-veilige slug van tekst."""
    text = unicodedata.normalize('NFKD', text)
    text = text.encode('ascii', 'ignore').decode('ascii')
    text = text.lower().strip()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s]+', '-', text)
    text = re.sub(r'-+', '-', text)
    return text


def map_graf_type(scrape_type: str) -> tuple[str, str]:
    """Map scraper graf type naar GrafType en label."""
    mapping = {
        'enkel': ('enkel', 'Enkel graf (1-laags)'),
        'dubbel': ('dubbel', 'Dubbel graf (2-laags)'),
        'kindergraf': ('kindergraf', 'Kindergraf'),
        'urnengraf': ('urnengraf', 'Urnengraf'),
        'urnennis': ('urnennis', 'Urnennis (columbarium)'),
        'asverstrooiing': ('asverstrooiing', 'Asverstrooiing'),
        'keldergraf': ('dubbel', 'Keldergraf'),
        'algemeen': ('enkel', 'Algemeen graf'),
        'onderhoud': ('enkel', 'Onderhoud'),
        'onbekend': ('enkel', 'Grafrecht'),
    }
    return mapping.get(scrape_type, ('enkel', 'Grafrecht'))


def extract_jaar_from_titel(titel: str) -> int:
    """Haal het jaartal uit de verordening-titel."""
    match = re.search(r'20\d{2}', titel)
    if match:
        return int(match.group())
    return 2025


def generate_begraafplaats(record: dict) -> dict | None:
    """Genereer een Begraafplaats object uit een scraped record."""
    gemeente = record['gemeente']
    provincie = GEMEENTE_PROVINCIE.get(gemeente)
    if not provincie:
        print(f"  SKIP: gemeente '{gemeente}' niet in mapping")
        return None

    tarieven = record.get('tarieven', [])
    if not tarieven:
        return None

    # Filter out onderhoud-tarieven en duplicaten
    graf_tarieven = []
    onderhoud_bedrag = None
    seen = set()

    for t in tarieven:
        if t['type'] == 'onderhoud':
            if onderhoud_bedrag is None or t['bedrag_euro'] > onderhoud_bedrag:
                onderhoud_bedrag = t['bedrag_euro']
            continue

        graf_type, label = map_graf_type(t['type'])
        key = (graf_type, t['looptijd_jaren'], t['bedrag_euro'])
        if key in seen:
            continue
        seen.add(key)

        if t.get('is_verlenging'):
            continue  # Skip verlengingstarieven voor nu

        graf_tarieven.append({
            'grafType': graf_type,
            'grafTypeLabel': label,
            'looptijd': t['looptijd_jaren'],
            'tarief': round(t['bedrag_euro']),
        })

    if not graf_tarieven:
        return None

    # Sorteer: enkel eerst, dan dubbel, etc.
    type_order = {'enkel': 0, 'dubbel': 1, 'kindergraf': 2, 'urnengraf': 3, 'urnennis': 4, 'asverstrooiing': 5}
    graf_tarieven.sort(key=lambda x: (type_order.get(x['grafType'], 9), x['looptijd']))

    tarief_jaar = extract_jaar_from_titel(record.get('titel', ''))
    slug = slugify(f"gemeente-{gemeente}")

    return {
        'id': slug,
        'naam': f'Gemeentelijke begraafplaats {gemeente}',
        'type': 'gemeentelijk',
        'typeLabel': 'Gemeentelijke begraafplaats',
        'gemeente': gemeente,
        'provincie': provincie,
        'plaats': gemeente,
        'tariefJaar': tarief_jaar,
        'grafTarieven': graf_tarieven,
        'onderhoud': {
            'type': 'optioneel' if onderhoud_bedrag else 'niet_beschikbaar',
            'perJaar': round(onderhoud_bedrag) if onderhoud_bedrag else None,
        },
        'eeuwigeGrafrust': False,
        'bronVermelding': record.get('titel', ''),
    }


def format_onderhoud_ts(onderhoud: dict) -> str:
    """Format onderhoud object als TypeScript."""
    if onderhoud.get('perJaar'):
        return f"""{{
      type: '{onderhoud['type']}',
      perJaar: {onderhoud['perJaar']},
    }}"""
    else:
        return f"{{ type: '{onderhoud['type']}' }}"


def format_begraafplaats_ts(bp: dict) -> str:
    """Format een Begraafplaats object als TypeScript."""
    tarieven_str = ',\n'.join([
        f"      {{ grafType: '{t['grafType']}', grafTypeLabel: '{t['grafTypeLabel']}', looptijd: {t['looptijd']}, tarief: {t['tarief']} }}"
        for t in bp['grafTarieven']
    ])

    lines = [
        f"  {{",
        f"    id: '{bp['id']}',",
        f"    naam: '{bp['naam']}',",
        f"    type: '{bp['type']}',",
        f"    typeLabel: '{bp['typeLabel']}',",
        f"    gemeente: '{bp['gemeente']}',",
        f"    provincie: '{bp['provincie']}',",
        f"    plaats: '{bp['plaats']}',",
        f"    tariefJaar: {bp['tariefJaar']},",
        f"    grafTarieven: [\n{tarieven_str}\n    ],",
        f"    onderhoud: {format_onderhoud_ts(bp['onderhoud'])},",
        f"    eeuwigeGrafrust: {str(bp['eeuwigeGrafrust']).lower()},",
        f"    bronVermelding: '{bp['bronVermelding'].replace(chr(39), chr(92)+chr(39))}',",
        f"  }}",
    ]
    return '\n'.join(lines)


def main():
    script_dir = os.path.dirname(__file__)
    input_path = os.path.join(script_dir, 'output', 'grafrechten_all.json')
    output_path = os.path.join(script_dir, '..', 'src', 'lib', 'fallback-data-generated.ts')

    with open(input_path) as f:
        data = json.load(f)

    # Transformeer alle records
    per_provincie = {}
    skipped = 0

    for record in data:
        bp = generate_begraafplaats(record)
        if bp is None:
            skipped += 1
            continue
        prov = bp['provincie']
        if prov not in per_provincie:
            per_provincie[prov] = []
        per_provincie[prov].append(bp)

    print(f"\nResultaat:")
    print(f"  Provincies: {len(per_provincie)}")
    total = sum(len(v) for v in per_provincie.values())
    print(f"  Gemeenten met data: {total}")
    print(f"  Overgeslagen: {skipped}")

    for prov in sorted(per_provincie):
        print(f"  {prov}: {len(per_provincie[prov])} gemeenten")

    # Genereer TypeScript
    ts_parts = []

    # Header + interfaces (copy from original)
    ts_parts.append("""// ============================================================
// Grafkostenkenner.nl — Fallback Data (auto-generated)
// Bron: CVDR Zoekdienst API scrape + handmatige data
// Gegenereerd: """ + importlib.import_module('datetime').datetime.now().strftime('%Y-%m-%d %H:%M') + """
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
""")

    # Provincies array
    prov_order = [
        'Groningen', 'Friesland', 'Drenthe', 'Overijssel', 'Flevoland',
        'Gelderland', 'Utrecht', 'Noord-Holland', 'Zuid-Holland',
        'Zeeland', 'Noord-Brabant', 'Limburg'
    ]

    prov_entries = []
    for prov in prov_order:
        slug = slugify(prov)
        count = len(per_provincie.get(prov, []))
        beschikbaar = count > 0
        prov_entries.append(
            f"  {{ id: '{slug}', naam: '{prov}', slug: '{slug}', aantalBegraafplaatsen: {count}, beschikbaar: {str(beschikbaar).lower()} }}"
        )

    prov_joined = ',\n'.join(prov_entries)
    ts_parts.append(f"""// --- Provincies ---

export const provincies: Provincie[] = [
{prov_joined},
];
""")

    # Begraafplaatsen per provincie
    var_names = {}
    for prov in prov_order:
        begraafplaatsen = per_provincie.get(prov, [])
        if not begraafplaatsen:
            continue

        var_name = f"begraafplaatsen{prov.replace('-', '').replace(' ', '')}"
        var_names[prov] = var_name

        # Sorteer op gemeente naam
        begraafplaatsen.sort(key=lambda x: x['gemeente'])

        bp_strings = [format_begraafplaats_ts(bp) for bp in begraafplaatsen]

        bp_joined = ',\n'.join(bp_strings)
        ts_parts.append(f"""// --- Begraafplaatsen Provincie {prov} ---
// Bron: CVDR Zoekdienst API, gemeentelijke verordeningen lijkbezorgingsrechten

export const {var_name}: Begraafplaats[] = [
{bp_joined},
];
""")

    # Alle begraafplaatsen combined
    all_var_refs = [var_names[p] for p in prov_order if p in var_names]
    ts_parts.append(f"""// --- Alle begraafplaatsen gecombineerd ---

export const alleBegraafplaatsen: Begraafplaats[] = [
  ...{', ...'.join(all_var_refs)},
];
""")

    # Lookup helper
    lookup_entries = []
    for p in prov_order:
        if p in var_names:
            lookup_entries.append(f"  '{slugify(p)}': {var_names[p]},")
    lookup_joined = '\n'.join(lookup_entries)
    ts_parts.append(f"""// --- Lookup per provincie ---

export const begraafplaatsenPerProvincie: Record<string, Begraafplaats[]> = {{
{lookup_joined}
}};
""")

    # Utility functions
    ts_parts.append("""// --- Utility functions ---

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function berekenTotaalKosten(
  begraafplaats: Begraafplaats,
  grafType: GrafType,
  looptijd: number,
  inclusiefOnderhoud: boolean = true
): { grafrechten: number; onderhoud: number; totaal: number; perJaar: number; gevonden: boolean } {
  const tarief = begraafplaats.grafTarieven.find(
    (t) => t.grafType === grafType && t.looptijd === looptijd
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
""")

    # Schrijf output
    output_content = '\n'.join(ts_parts)
    with open(output_path, 'w') as f:
        f.write(output_content)

    print(f"\nOutput: {output_path}")
    print(f"Grootte: {len(output_content):,} bytes")


if __name__ == '__main__':
    main()
