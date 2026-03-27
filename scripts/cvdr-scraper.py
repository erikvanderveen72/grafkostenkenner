#!/usr/bin/env python3
"""
CVDR Grafrechten Scraper
========================
Haalt alle gemeentelijke verordeningen lijkbezorgingsrechten op via de CVDR Zoekdienst API,
download de XML-bestanden en parseert de tarieventabellen naar gestructureerde JSON.

Gebruik:
    python3 scripts/cvdr-scraper.py                     # Alle gemeenten
    python3 scripts/cvdr-scraper.py --gemeente Groningen  # Eén gemeente
    python3 scripts/cvdr-scraper.py --jaar 2026           # Specifiek jaar
    python3 scripts/cvdr-scraper.py --only-active         # Alleen geldende verordeningen

Output: scripts/output/grafrechten.json
"""

import argparse
import json
import os
import re
import sys
import time
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
from datetime import datetime
from typing import Optional

# === Constanten ===
SRU_BASE = "https://zoekdienst.overheid.nl/sru/Search"
XML_REPO = "https://repository.officiele-overheidspublicaties.nl/cvdr"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
MAX_RECORDS_PER_PAGE = 50

# XML Namespaces
NS = {
    "srw": "http://www.loc.gov/zing/srw/",
    "gzd": "http://standaarden.overheid.nl/sru",
    "dc": "http://purl.org/dc/terms/",
    "rg": "http://standaarden.overheid.nl/cvdr/terms/",
    "meta": "http://standaarden.overheid.nl/cvdr/meta/",
}


def log(msg: str):
    print(f"[{datetime.now().strftime('%H:%M:%S')}] {msg}", flush=True)


def fetch_url(url: str, retries: int = 3) -> str:
    """Fetch URL with retries and polite delay."""
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={
                "User-Agent": "Grafkostenkenner.nl CVDR Scraper (contact: info@grafkostenkenner.nl)"
            })
            with urllib.request.urlopen(req, timeout=30) as resp:
                return resp.read().decode("utf-8")
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(2 ** attempt)
            else:
                raise RuntimeError(f"Fout bij ophalen {url}: {e}")
    return ""


# ==========================================
# Stap 1: Zoek alle verordeningen via SRU
# ==========================================

def search_verordeningen(gemeente: Optional[str] = None, jaar: Optional[int] = None, only_active: bool = False) -> list[dict]:
    """Zoek verordeningen lijkbezorgingsrechten via CVDR SRU API."""

    query_parts = ['dcterms.title = "lijkbezorgingsrechten"']

    if gemeente:
        query_parts.append(f'dcterms.creator = "{gemeente}"')

    if jaar:
        query_parts.append(f'dcterms.title = "{jaar}"')

    query = " AND ".join(query_parts)

    results = []
    start = 1
    total = None

    while total is None or start <= total:
        params = urllib.parse.urlencode({
            "version": "1.2",
            "operation": "searchRetrieve",
            "x-connection": "cvdr",
            "maximumRecords": MAX_RECORDS_PER_PAGE,
            "startRecord": start,
            "query": query,
        })
        url = f"{SRU_BASE}?{params}"
        log(f"Ophalen pagina (start={start})...")

        xml_text = fetch_url(url)
        root = ET.fromstring(xml_text)

        if total is None:
            total = int(root.findtext("{http://www.loc.gov/zing/srw/}numberOfRecords", "0"))
            log(f"Totaal gevonden: {total} verordeningen")

        for rec in root.findall(".//{http://www.loc.gov/zing/srw/}record"):
            try:
                record = parse_sru_record(rec)
                if record:
                    # Filter op alleen actieve (geldende) verordeningen
                    if only_active and record.get("uitwerkingtreding"):
                        uitwerking = datetime.strptime(record["uitwerkingtreding"], "%Y-%m-%d")
                        if uitwerking < datetime.now():
                            continue
                    results.append(record)
            except Exception as e:
                log(f"  Waarschuwing: record overgeslagen ({e})")

        start += MAX_RECORDS_PER_PAGE
        time.sleep(0.5)  # Polite delay

    return results


def parse_sru_record(rec_element) -> Optional[dict]:
    """Parse één SRU record naar een dict."""
    # Zoek binnen de gzd namespace
    gzd = rec_element.find(".//{http://standaarden.overheid.nl/sru}gzd")
    if gzd is None:
        return None

    def find_text(tag, default=""):
        # Zoek in alle namespaces
        for ns_prefix, ns_uri in [("dc", "http://purl.org/dc/terms/"), ("rg", "http://standaarden.overheid.nl/cvdr/terms/")]:
            el = gzd.find(f".//{{{ns_uri}}}{tag}")
            if el is not None and el.text:
                return el.text.strip()
        return default

    def find_enriched(tag):
        el = gzd.find(f".//{{{NS['gzd']}}}{tag}")
        return el.text.strip() if el is not None and el.text else ""

    identifier = find_text("identifier")
    if not identifier:
        return None

    return {
        "cvdr_id": identifier,
        "titel": find_text("title"),
        "gemeente": find_text("creator"),
        "modified": find_text("modified"),
        "inwerkingtreding": find_text("inwerkingtredingDatum"),
        "uitwerkingtreding": find_text("uitwerkingtredingDatum"),
        "xml_url": find_enriched("publicatieurl_xml"),
        "preferred_url": find_enriched("preferred_url"),
    }


# ==========================================
# Stap 2: Download en parse XML
# ==========================================

def download_and_parse(record: dict) -> dict:
    """Download XML van een verordening en parse de tarieventabel."""
    xml_url = record.get("xml_url", "")
    if not xml_url:
        # Construeer URL uit CVDR ID
        cvdr_id = record["cvdr_id"]
        base_id = cvdr_id.split("_")[0]
        xml_url = f"{XML_REPO}/{base_id}/{cvdr_id.split('_')[1] if '_' in cvdr_id else '1'}/xml/{cvdr_id}.xml"

    log(f"  Downloaden: {record['gemeente']} - {record['titel'][:60]}...")

    try:
        xml_text = fetch_url(xml_url)
    except Exception as e:
        log(f"  FOUT bij downloaden: {e}")
        return {**record, "tarieven": [], "parse_error": str(e)}

    time.sleep(0.3)  # Polite delay

    tarieven = parse_tarieventabel(xml_text, record["gemeente"])

    return {
        **record,
        "tarieven": tarieven,
        "parse_success": len(tarieven) > 0,
    }


# ==========================================
# Stap 3: Parse tarieventabel uit XML
# ==========================================

def parse_tarieventabel(xml_text: str, gemeente: str) -> list[dict]:
    """Parse tarieventabel uit CVDR XML. Zoekt naar euro-bedragen met bijbehorende context."""
    tarieven = []

    # Vind het tarieventabel-gedeelte (na "bijlage" of "Tarieventabel")
    tabel_start = -1
    for marker in ["Tarieventabel behorende", "tabel behorende", "TARIEVENTABEL", "H 1", "Hoofdstuk 1"]:
        idx = xml_text.find(marker)
        if idx > 0:
            tabel_start = idx
            break

    if tabel_start < 0:
        # Fallback: zoek vanaf eerste euro-teken
        idx = xml_text.find("€")
        if idx > 0:
            tabel_start = max(0, idx - 500)
        else:
            return tarieven

    tabel_text = xml_text[tabel_start:]

    # Strip XML tags, behoud structuur
    clean = re.sub(r"<[^>]+>", " ", tabel_text)
    clean = re.sub(r"\s+", " ", clean).strip()

    # Zoek patronen: "voor de tijd van X jaar € Y"
    pattern = r"(?:voor\s+(?:de\s+)?tijd\s+van\s+)?(\d+)\s*jaar[^€]*€\s*([\d.,]+)"

    # Context: wat voor type graf/recht wordt er beschreven
    sections = re.split(r"((?:\d+\.\d+(?:\.\d+)?)\s+[A-Z]|H\s*\d+\s+\w+)", clean)

    current_section = ""
    for i, section in enumerate(sections):
        if re.match(r"(?:\d+\.\d+(?:\.\d+)?)\s+[A-Z]|H\s*\d+\s+\w+", section or ""):
            current_section = section.strip()
            continue

        if not section:
            continue

        # Bepaal type recht
        graf_type = bepaal_graf_type(current_section + " " + section[:200])
        is_verlenging = "verlenging" in (current_section + " " + section[:200]).lower()

        for match in re.finditer(pattern, section, re.IGNORECASE):
            jaren = int(match.group(1))
            bedrag_str = match.group(2).replace(".", "").replace(",", ".")
            try:
                bedrag = float(bedrag_str)
            except ValueError:
                continue

            if bedrag < 10 or bedrag > 50000:  # Sanity check
                continue

            tarieven.append({
                "type": graf_type,
                "looptijd_jaren": jaren,
                "bedrag_euro": bedrag,
                "is_verlenging": is_verlenging,
                "sectie": current_section[:100] if current_section else "",
                "gemeente": gemeente,
            })

    # Zoek ook onderhoudskosten
    onderhoud_patterns = [
        r"onderhoud[^€]*€\s*([\d.,]+)\s*(?:per\s+jaar|/jaar|p\.j\.)",
        r"€\s*([\d.,]+)\s*per\s+jaar[^€]*onderhoud",
        r"onderhoudsrecht[^€]*€\s*([\d.,]+)",
    ]

    for pattern in onderhoud_patterns:
        for match in re.finditer(pattern, clean, re.IGNORECASE):
            bedrag_str = match.group(1).replace(".", "").replace(",", ".")
            try:
                bedrag = float(bedrag_str)
                if 5 < bedrag < 5000:
                    tarieven.append({
                        "type": "onderhoud",
                        "looptijd_jaren": 1,
                        "bedrag_euro": bedrag,
                        "is_verlenging": False,
                        "sectie": "onderhoud",
                        "gemeente": gemeente,
                    })
            except ValueError:
                pass

    return tarieven


def bepaal_graf_type(context: str) -> str:
    """Bepaal het type graf op basis van de context-tekst."""
    context_lower = context.lower()

    if "urnennis" in context_lower or "urnenmuur" in context_lower or "columbarium" in context_lower:
        return "urnennis"
    if "urnengraf" in context_lower or "urnentuin" in context_lower or "urn" in context_lower:
        return "urnengraf"
    if "kindergraf" in context_lower or "kind" in context_lower:
        return "kindergraf"
    if "asverstrooiing" in context_lower or "verstrooien" in context_lower:
        return "asverstrooiing"
    if "dubbeldiep" in context_lower or "dubbel" in context_lower or "2-laags" in context_lower:
        return "dubbel"
    if "keldergraf" in context_lower:
        return "keldergraf"
    if "algemeen graf" in context_lower:
        return "algemeen"
    if "particulier" in context_lower or "grafruimte" in context_lower or "begraven" in context_lower:
        return "enkel"

    return "onbekend"


# ==========================================
# Stap 4: Filter meest recente per gemeente
# ==========================================

def filter_meest_recente(records: list[dict]) -> list[dict]:
    """Houd per gemeente alleen de meest recente geldende verordening."""
    per_gemeente = {}

    for rec in records:
        gemeente = rec["gemeente"]

        # Vergelijk op inwerkingtreding datum
        inwerking = rec.get("inwerkingtreding", "1900-01-01")

        if gemeente not in per_gemeente or inwerking > per_gemeente[gemeente].get("inwerkingtreding", ""):
            per_gemeente[gemeente] = rec

    return list(per_gemeente.values())


# ==========================================
# Main
# ==========================================

def main():
    parser = argparse.ArgumentParser(description="CVDR Grafrechten Scraper")
    parser.add_argument("--gemeente", help="Filter op specifieke gemeente")
    parser.add_argument("--jaar", type=int, help="Filter op specifiek jaar in titel")
    parser.add_argument("--only-active", action="store_true", help="Alleen geldende verordeningen")
    parser.add_argument("--max", type=int, default=0, help="Maximum aantal gemeenten (0=alles)")
    parser.add_argument("--skip-download", action="store_true", help="Sla XML download over, gebruik eerder opgehaalde index")
    args = parser.parse_args()

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Stap 1: Zoek verordeningen
    log("=== Stap 1: Zoeken in CVDR ===")
    records = search_verordeningen(
        gemeente=args.gemeente,
        jaar=args.jaar,
        only_active=args.only_active,
    )
    log(f"Gevonden: {len(records)} verordeningen van {len(set(r['gemeente'] for r in records))} gemeenten")

    # Stap 2: Filter meest recente per gemeente
    log("\n=== Stap 2: Filter meest recente per gemeente ===")
    recent = filter_meest_recente(records)
    log(f"Na filter: {len(recent)} verordeningen (1 per gemeente)")

    if args.max > 0:
        recent = recent[:args.max]
        log(f"Gelimiteerd tot {args.max} gemeenten")

    # Sla index op
    index_path = os.path.join(OUTPUT_DIR, "cvdr_index.json")
    with open(index_path, "w") as f:
        json.dump(recent, f, indent=2, ensure_ascii=False)
    log(f"Index opgeslagen: {index_path}")

    if args.skip_download:
        log("Download overgeslagen (--skip-download)")
        return

    # Stap 3: Download en parse XML
    log(f"\n=== Stap 3: Download en parse {len(recent)} verordeningen ===")
    results = []
    success = 0
    failed = 0

    for i, rec in enumerate(recent, 1):
        log(f"[{i}/{len(recent)}] {rec['gemeente']}")
        result = download_and_parse(rec)
        results.append(result)

        if result.get("parse_success"):
            success += 1
            log(f"  ✓ {len(result['tarieven'])} tarieven gevonden")
        else:
            failed += 1
            log(f"  ✗ Geen tarieven gevonden")

    # Stap 4: Sla resultaten op
    log(f"\n=== Resultaat ===")
    log(f"Succesvol geparsed: {success}/{len(results)} gemeenten")
    log(f"Mislukt: {failed}/{len(results)} gemeenten")

    total_tarieven = sum(len(r.get("tarieven", [])) for r in results)
    log(f"Totaal tarieven gevonden: {total_tarieven}")

    output_path = os.path.join(OUTPUT_DIR, "grafrechten.json")
    with open(output_path, "w") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    log(f"\nResultaten opgeslagen: {output_path}")

    # Samenvattend overzicht
    summary_path = os.path.join(OUTPUT_DIR, "samenvatting.txt")
    with open(summary_path, "w") as f:
        f.write(f"CVDR Grafrechten Scraper - {datetime.now().strftime('%Y-%m-%d %H:%M')}\n")
        f.write(f"{'='*60}\n\n")
        f.write(f"Gemeenten verwerkt: {len(results)}\n")
        f.write(f"Succesvol geparsed: {success}\n")
        f.write(f"Mislukt: {failed}\n")
        f.write(f"Totaal tarieven: {total_tarieven}\n\n")

        for r in sorted(results, key=lambda x: x["gemeente"]):
            status = "✓" if r.get("parse_success") else "✗"
            n = len(r.get("tarieven", []))
            f.write(f"{status} {r['gemeente']:<30} {n:>3} tarieven  ({r.get('titel', '')[:50]})\n")

    log(f"Samenvatting: {summary_path}")


if __name__ == "__main__":
    main()
