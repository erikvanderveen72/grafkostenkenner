# begraafplaatskosten.nl

## Project overview
Nederlandse vergelijkingssite voor grafkosten en grafrechten. Toont tarieven van 153 gemeenten in 12 provincies, gebaseerd op officiële gemeentelijke verordeningen (CVDR). Domein: **begraafplaatskosten.nl**. Slogan: **"geeft rust"**.

## Tech stack
- Next.js 16 App Router + TypeScript + Turbopack
- Tailwind CSS v4 (met `@theme` in globals.css)
- Geen database — alle data in `src/lib/fallback-data.ts` (5544 regels, 335KB)
- Begraafplaats locaties in `src/lib/begraafplaats-locaties.ts` (RCE data, 706 locaties)
- Fonts: Inter (sans) + Playfair Display (serif, voor hero titels)
- SSG: `generateStaticParams()` voor 153 gemeente + 12 provincie pagina's (178 totaal)
- Deploy: Vercel

## Color palette (globals.css @theme)
Groene tinten, GEEN bruin:
- `earth-dark: #1e2e1e` / `earth-mid: #2a3d2a` — donkergroen voor nav/footer/dark sections
- `earth-light: #f0f5ed` — lichtgroen achtergrond
- `surface: #f8faf7` / `surface-alt: #eef2ec` — body/alt achtergronden
- `primary: #5e8a5e` — sage green accent
- `text-main: #1e2b1e` / `text-muted: #4a5a48`

## Folder structure
```
src/
  app/
    page.tsx                    — Homepage (full-width hero foto, serif titel)
    layout.tsx                  — Root layout, metadata, fonts
    globals.css                 — Tailwind @theme, animations
    gemeente/[slug]/page.tsx    — 153 gemeente pagina's (tarieven, RCE locaties, FAQ)
    provincie/[slug]/page.tsx   — 10 dynamische provincie pagina's
    provincie/groningen/page.tsx — Handmatige Groningen pagina
    provincie/drenthe/page.tsx  — Handmatige Drenthe pagina
    begrippenlijst/page.tsx     — Begrippenlijst met zoekfunctie
    grafrechten-uitleg/page.tsx
    grafkosten-besparen/page.tsx
    uitvaartkosten/page.tsx     — Uitvaartkosten + TCO calculator
    soorten-begraafplaatsen/page.tsx
    over-ons/ disclaimer/ privacy/
  components/
    Navbar.tsx         — Fixed nav, logo + "geeft rust" slogan, provincie dropdown
    Footer.tsx         — Logo + slogan, 4 kolommen, trust badges
    PageHero.tsx       — Herbruikbare hero voor subpagina's
    GrafkostenVergelijker.tsx — Vergelijker tool (bar chart, filters, dynamische looptijden)
    UitvaartCalculator.tsx    — TCO calculator
    Calculator.tsx
    BegrippenlijstContent.tsx — Client-side zoekfunctie
    FAQSchema.tsx      — FAQ met JSON-LD structured data
    Breadcrumbs.tsx
  lib/
    fallback-data.ts           — 153 gemeenten, tarieven, interfaces
    begraafplaats-locaties.ts  — RCE data: naam + plaats per gemeente
```

## Key data structures (fallback-data.ts)
```typescript
interface Begraafplaats {
  id, naam, type, typeLabel, gemeente, provincie, plaats,
  tariefJaar, grafTarieven: GrafTarief[], onderhoud: OnderhoudTarief,
  bronVermelding, eeuwigeGrafrust
}
interface GrafTarief { grafType, grafTypeLabel, looptijd, tarief, verlengingPer?, verlengingJaren? }
interface OnderhoudTarief { type: 'verplicht'|'optioneel'|'niet_beschikbaar', perJaar?, afkoopBedrag? }
```

## Design decisions
- **Kindergraven**: looptijden worden APART getoond met label "Leeftijdscategorie" (niet "Looptijd"). Niet meegenomen in reguliere looptijd-statistieken.
- **Tarieven tabel**: toont "Excl. onderhoud" en "Incl. onderhoud" kolommen als de gemeente onderhoudskosten heeft. Per-jaar berekening is op basis van incl. onderhoud.
- **Vergelijker**: looptijden zijn dynamisch per geselecteerde gemeente, niet alle gemeenten.
- **Hero**: full-width panoramafoto (`/images/hero-foto.png`), serif titel, frosted glass subtitel.
- **RCE begraafplaatsen**: sectie op elke gemeentepagina met echte begraafplaatsnamen uit Rijksdienst Cultureel Erfgoed WFS data.

## Git workflow
- Commit vanuit VM (deze omgeving)
- Push vanuit Mac terminal: `cd /Users/erikvanderveen/Kenner/grafkostenkenner && git push origin main`
- GitHub repo: grafkostenkenner (onder Erik's account)

## Images
- `/public/images/hero-foto.png` — Panoramisch duinen zonsondergang (actieve hero)
- `/public/images/hero-duinen.png` — Gemini-gegenereerd ouder echtpaar (niet meer in gebruik)

## Known issues / open items
- 3 fusiegemeenten (Land van Cuijk, Voorne aan Zee, Zundert) hebben RCE data van voormalige gemeenten
- Grote bestanden in root die niet gecommit zijn: foto.png, foto2.png, Gemini_Generated_Image, Grafrechten xlsx
- `scripts/output/` bevat scraper output (niet gecommit)

## Erik's voorkeuren
- Taal: Nederlands
- Geen bruin/brown in het design
- Slogan "geeft rust" altijd onder het logo
- Serif font voor hero titels
- Overheidsdata boven commerciële bronnen (RCE boven begraafplaatsinformatie.nl)
- Foto's: panoramische duinen/natuur sfeer
