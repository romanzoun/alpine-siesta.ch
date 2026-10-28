---
name: ui-pruefen
description: Prüft die Oberfläche einer Website oder App im Browser auf Darstellung, Designsystem, Responsiveness, Barrierefreiheit und Performance und liefert priorisierte Befunde mit Datei und Fix. Verwenden, wenn der Nutzer «UI testen», «Frontend prüfen», «sieht das gut aus?», «mobile kaputt?», «Design-Review», «Barrierefreiheit», «Lighthouse», «Layout-Fehler» sagt, nach grösseren Änderungen an Komponenten oder CSS, und vor einem Release von alpine-siesta.ch oder dem Trizoun-Dashboard.
---

# UI prüfen

Ziel: Fehler finden, die echte Gäste oder Vermieter sehen – nicht Geschmacksfragen. Jeder Befund braucht einen Beleg (Screenshot, gemessener Wert, DOM-Stelle) und einen konkreten Fix mit Datei.

## Vorbereitung

1. Designsystem lesen, bevor du urteilst – es ist der Massstab, nicht dein Geschmack:
   - alpine-siesta.ch: Abschnitt «Design» in `AGENTS.md`, Tokens in `src/styles/global.css`, `.claude/skills/frontend-design/SKILL.md`.
   - trizoun-travel Dashboard: `apps/dashboard/src/style.css` (Tokens in `:root`).
2. Server finden: `lsof -iTCP -sTCP:LISTEN -P | grep -E ':(4321|5173|8787)'`. Lokal laufen meist Website :4321, Dashboard :5173, API :8787 (Docker). Sonst `npm run dev` bzw. `.claude/launch.json`.
3. Seitenliste machen: alle Seitentypen, nicht alle Seiten. Website: Start, Wohnung, Wohnungsübersicht, Pillar, Artikel, Kontakt, 404, je eine Fremdsprache (`/en/`, `/fr/`, `/it/`). Dashboard: Verkaufsseiten (`/`, `/preise`, `/produkt`, `/faq`, `/kontakt`, `/rechner`), Anmelden/Registrieren, Büro (`/wohnungen`, `/personen`, `/zugang`).

## Durchgang pro Seitentyp

Im eingebauten Browser (`mcp__Claude_Browser__*`). Text mit `get_page_text`/`read_page`, Screenshots nur für Layout.

**Viewports**: 375×812 (`resize_window preset mobile`), 768×1024, 1280 Desktop. Danach `preset desktop` zurücksetzen.

Pro Viewport prüfen:
- Horizontales Scrollen: `document.documentElement.scrollWidth > innerWidth`. Täter finden mit dem Messskript unten.
- Abgeschnittene oder überlappende Texte, Buttons unter 44×44 px Tippfläche auf Mobile, Navigation erreichbar.
- Bilder: verzerrt, zu gross geladen (`naturalWidth` > 2× angezeigte Breite), fehlendes `alt`, Layout-Sprung beim Laden (fehlende `width`/`height`).
- Typografie: Zeilenlänge Fliesstext ≤ ~80 Zeichen, keine Hurenkinder in Titeln, Schmalschnitt nur für Titel.
- Designsystem: nur Farben aus den Tokens, keine Grossbuchstaben-Labels, keine Karten wo `.liste` vorgesehen ist (Website), eine Schriftfamilie.

**Barrierefreiheit** (WCAG 2.2 AA):
- Kontrast Text ≥ 4.5:1, grosser Text und UI-Elemente ≥ 3:1. Glut auf hellem Grund ist fast immer zu schwach.
- Tastatur: Tab durch die Seite – Fokus sichtbar, Reihenfolge logisch, Menüs und Dialoge mit Esc schliessbar, kein Fokus hinter geschlossenen Menüs.
- Ein `h1`, Überschriften ohne Sprünge, `lang` stimmt pro Sprache, Formularfelder mit `label`, Fehlermeldungen per `aria-live` oder `aria-describedby`.
- `prefers-reduced-motion`: Animationen aus? (per CSS-Inspektion prüfen).

**Technik**:
- `read_console_messages onlyErrors` – jede Konsolenmeldung ist ein Befund.
- `read_network_requests` – 404, doppelte Font-Ladevorgänge, Drittanbieter (Google Fonts = Datenschutz-Thema in CH/EU, lieber selbst hosten).
- Performance grob: `performance.getEntriesByType('navigation')[0]`, LCP via `PerformanceObserver`, Gesamtgewicht der Bilder.

## Messskript (im Browser ausführen)

```js
(() => {
  const w = innerWidth, r = { breiter: [], kleineZiele: [], ohneAlt: [], grosseBilder: [] };
  for (const e of document.querySelectorAll('body *')) {
    const b = e.getBoundingClientRect();
    if (b.right > w + 1 && getComputedStyle(e).position !== 'fixed') r.breiter.push(e.tagName + '.' + e.className);
    if (e.matches('a,button,input,select,summary') && b.width && (b.width < 44 || b.height < 44) && w < 500) r.kleineZiele.push((e.textContent || e.getAttribute('aria-label') || '').trim().slice(0, 30));
  }
  for (const i of document.images) {
    if (!i.hasAttribute('alt')) r.ohneAlt.push(i.src);
    if (i.naturalWidth > 2 * i.clientWidth * devicePixelRatio && i.clientWidth) r.grosseBilder.push(i.src.split('/').pop() + ' ' + i.naturalWidth + '→' + i.clientWidth);
  }
  r.h1 = document.querySelectorAll('h1').length; r.lang = document.documentElement.lang;
  r.scroll = document.documentElement.scrollWidth > w;
  for (const k in r) if (Array.isArray(r[k])) r[k] = [...new Set(r[k])].slice(0, 15);
  return r;
})()
```

Kontrast für ein Paar Farben: relative Luminanz nach WCAG rechnen (kleine Funktion im Browser oder Node), nicht schätzen.

## Ergebnis

Tabelle, sortiert nach Schwere:

| Schwere | Seite / Viewport | Befund | Beleg | Fix (Datei) |
|---|---|---|---|---|

- **Kritisch**: blockiert Buchung, Anfrage, Anmeldung oder Lesbarkeit; Konsolenfehler; horizontales Scrollen auf Mobile.
- **Hoch**: WCAG-AA-Verstoss, kaputtes Layout auf einem Viewport, Bruch im Designsystem auf der Startseite.
- **Mittel/Niedrig**: Feinschliff.

Keine Befunde ohne Beleg. Wenn etwas gut ist, kurz sagen – das schützt es vor «Verbesserungen». Fixes nur umsetzen, wenn der Nutzer es will; danach dieselbe Messung wiederholen. Code in `src/` (Website) bleibt generisch – Alpine-Siesta-Spezifisches gehört nach `site/`.

Für Abläufe, Texte und Conversion: Skill `ux-pruefen`.
