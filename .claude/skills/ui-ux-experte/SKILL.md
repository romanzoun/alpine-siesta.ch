---
name: ui-ux-experte
description: Gestaltet und baut Oberflächen auf Profi-Niveau – Designsystem, Layout, Typografie, Motion-System und UX-Muster für Websites und SaaS-Dashboards – und prüft das Ergebnis mit Screenshots. Verwenden, wenn der Nutzer sagt «sieht hässlich aus», «professioneller», «modernisieren», «Redesign», «Animationen», «Micro-Interactions», «Dashboard gestalten», «UI verbessern», «UX verbessern», «fühlt sich billig an», oder eine neue Seite bzw. Ansicht gebaut wird. Für reine Prüfungen ohne Umbau: ui-pruefen und ux-pruefen.
---

# UI/UX-Experte

Arbeite wie ein Design-Lead, der auch selbst baut. Ziel ist eine Oberfläche, der man vertraut, bevor man den ersten Satz gelesen hat: ruhig, präzise, eindeutig. Gutes Design fällt durch Ordnung auf, nicht durch Effekte.

Ergänzend gilt `.claude/skills/frontend-design/SKILL.md` (falls vorhanden) für die ästhetische Richtung. Dieser Skill ist das Handwerk dazu.

## 0. Projektregeln zuerst

- **Trizoun Travel** (`apps/dashboard`): Designsystem in `docs/DESIGN.md`. Tokens in `apps/dashboard/src/style.css` (`:root`). Kein Framework, DOM mit `el()` aus `dom.ts`. Texte in `i18n.ts`/`auftritt-texte.ts`, immer DE/FR/IT/EN.
- **alpine-siesta.ch**: Abschnitt «Design» in `AGENTS.md`, Tokens in `src/styles/global.css`. Code in `src/` bleibt generisch, Inhalte in `site/`.
- Bestehende Entscheide nicht still ändern. Wer das System ändert, ändert zuerst die Doku.

## 1. Ablauf

1. **Brief klären:** Was ist das Produkt, wer nutzt es, was ist die wichtigste Aufgabe pro Seite? Ein Satz pro Punkt.
2. **Ist aufnehmen:** Screenshots aller Seitentypen, Desktop 1280 und Mobile 390. Für Bereiche hinter Login die API im Browser simulieren (Playwright `page.route('**/v1/**', …)` mit Testdaten), nie echte Zugangsdaten. Beispiel: `scratchpad/dashboard-shots.mjs` aus früheren Sessions oder neu schreiben.
3. **Plan vor Code:** Farbe (4–6 benannte Werte), Schrift (Familien und Rollen), Layout (ASCII-Skizze pro Seitentyp), 3 Prinzipien. Dann gegen die Default-Liste prüfen (unten) und anpassen.
4. **Bauen:** Tokens zuerst, dann Bausteine, dann Seiten. Kleine Schritte, nach jedem Schritt Screenshot.
5. **Kritik:** Vorher/Nachher nebeneinander anschauen. Eine Sache entfernen, die nichts beiträgt. Dann `ui-pruefen` (Kontrast, Tastatur, Mobile) und `ux-pruefen` (Abläufe).

## 2. Designsystem

**Tokens statt Werte.** Jede Farbe, jeder Abstand, jeder Radius, jede Dauer kommt aus `:root`. Im Code stehen keine Hex-Werte ausserhalb der Tokens.

- **Farbrollen:** `--grund` (Seite), `--flaeche` (Panels), `--tinte` (Text), `--leise` (Nebentext, Kontrast ≥ 4.5:1), `--linie`, `--marke` (Aktionen), `--akzent` (ein Highlight, sparsam), `--gut`, `--fehler`. Akzent nie für Fliesstext.
- **Abstände:** 4er-Raster (`--a1` 4px … `--a8` 64px). Innen kleiner als aussen: Abstand zwischen Gruppen ≥ 2× Abstand in der Gruppe.
- **Typografie:** eine Familie reicht, höchstens zwei. Skala mit festem Verhältnis (z. B. 1.25), 5–6 Stufen. Titel eng (Zeilenhöhe 1.05–1.15, leicht negatives Tracking), Fliesstext 1.5–1.6, Zeilenlänge ≤ 70 Zeichen. Zahlen in Tabellen `font-variant-numeric: tabular-nums`.
- **Radien:** zwei Stufen. Klein für Eingaben und Knöpfe, grösser für Panels. Nicht alles gleich rund.
- **Tiefe:** Linien statt Schatten. Schatten nur für Ebenen, die über dem Inhalt liegen (Menü, Drawer, Toast), und dann ein einziger, definierter Schatten.

**Vermeiden (Defaults, die generiert aussehen):** creme Grund mit Terrakotta-Akzent; fast schwarz mit einer grellen Akzentfarbe; identische abgerundete Karten mit grauem Schatten für alles; Verläufe als Deko; GROSSBUCHSTABEN-Labels über jeder Überschrift; Mittelpunkte als Trenner; «→» an jedem Link; Monospace für Labels; nummerierte 01/02/03, wenn es keine Reihenfolge ist.

## 3. Motion-System

Bewegung erklärt, was sich geändert hat. Sie ist nie Deko.

| Token | Dauer | Wofür |
|---|---|---|
| `--t-kurz` | 120 ms | Hover, Druck, Farbwechsel |
| `--t-mittel` | 200 ms | Menüs, Umschalter, Toasts, Akkordeon |
| `--t-lang` | 320 ms | Drawer, Seitenwechsel, Hero-Sequenz pro Schritt |

- Easing: hinein `cubic-bezier(.2,.8,.2,1)` (schnell an, weich aus), Bewegung innerhalb `cubic-bezier(.65,0,.35,1)`. Nie `linear` ausser für Fortschritt.
- Nur `transform` und `opacity` animieren. Keine Layout-Eigenschaften (height, top, width).
- **Ein** inszenierter Moment pro Seite (meist der Hero). Keine Einblend-Animation für jede Sektion beim Scrollen.
- Rückmeldung auf Handlungen: Knopf drückt sich (`scale(.97)`), Speichern zeigt Ladezustand und danach einen Toast mit dem Namen der Aktion («Wohnung gespeichert»), Löschen bietet «Rückgängig».
- Seitenwechsel in SPAs: View Transitions API (`document.startViewTransition`) mit kurzer Überblendung; ohne Unterstützung sofort wechseln.
- Listen: höchstens 5 Elemente gestaffelt, 30–40 ms Versatz. Danach alles gleichzeitig.
- `prefers-reduced-motion: reduce`: keine Bewegung, Überblendungen ≤ 120 ms oder aus. Inhalt ist nie unsichtbar, wenn eine Animation nicht läuft (kein `opacity: 0` als Startzustand für wichtige Inhalte).

## 4. UX-Muster für Dashboards

- **Eigene App-Schale:** Seitenleiste mit Produkt, Organisation, Navigation und Konto. Keine Marketing-Navigation im Arbeitsbereich.
- **Seitenkopf:** Titel, ein Satz Kontext, genau eine Hauptaktion rechts.
- **Listen als Tabellen** mit Spalten, die man vergleicht. Status als Pille mit Punkt (Farbe + Text, nie nur Farbe). Die ganze Zeile ist klickbar, wenn sie zu einer Detailseite führt.
- **Erstellen** in einem Drawer oder Dialog, nicht als Formular, das immer unter der Liste steht. Esc schliesst, Fokus springt ins erste Feld und danach zurück zum Auslöser.
- **Leere Zustände:** ein Satz, was hier entsteht, und die Aktion, um zu beginnen.
- **Laden:** über 300 ms ein Skelett in der Form des Inhalts, kein Spinner über der ganzen Seite.
- **Fehler:** am Feld, konkret, mit Lösung. Formulardaten bleiben erhalten.
- **Formulare:** Label über dem Feld, Hinweis darunter in `--leise`, eine Spalte, passende `autocomplete`/`inputmode`. Pflichtfelder sind die Regel, optionale markieren.
- **Gefährliche Aktionen:** zweiter Schritt oder Rückgängig, nie sofort.
- **Begriffe der Nutzer:** «Website-Schlüssel» statt «Publishable Key».

## 5. Muster für Verkaufsseiten

- Der Hero zeigt das typischste Ding aus der Welt des Produkts (bei Trizoun: der Belegungsplan), nicht eine Stock-Illustration.
- Eine Hauptaktion, eine Nebenaktion. Beweis (Referenz, Zahl mit Quelle) direkt danach.
- Preise als Vergleich in einer Tabelle mit Linien, nicht als zwei schwebende Karten.
- Abschnitte mit klarer Hierarchie: Titel, ein Satz, Inhalt. Linksbündig.

## 6. Qualitätsboden (vor «fertig»)

- Mobile 390 px ohne horizontales Scrollen, Tippflächen ≥ 44 px.
- Fokus überall sichtbar, Reihenfolge logisch, Esc schliesst Ebenen.
- Kontrast WCAG AA, Status nie nur über Farbe.
- Keine Konsolenfehler, keine Layout-Sprünge (Bilder mit Massen).
- Schriften selbst gehostet, CSS ohne Framework unter ~30 KB, keine Animationsbibliothek.
- Typecheck und Tests grün, Screenshots Vorher/Nachher dem Nutzer gezeigt.
