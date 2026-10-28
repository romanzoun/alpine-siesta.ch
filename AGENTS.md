# Hinweise für KI-Assistenten

Inhalte dieser Website sind Markdown-Dateien mit strengem Frontmatter-Schema. Beim Build wird jedes Feld geprüft – ungültige Labels brechen den Build ab.

**Alles Website-spezifische liegt in `site/`** (Einstellungen in `site/site.config.ts`, Inhalte, Bilder, `public/`). Übersicht: `site/README.md`. Der Code in `src/` muss für jede Website funktionieren: keine Namen, Orte oder Texte von Alpine Siesta in `src/` fest einbauen, sondern aus `site` lesen. Offene Punkte: `npm run checkliste`.

**Phase 1 (aktuell):** Wohnung, Pillar Pages, Kontaktformular (`src/components/Anfrage.astro`, ohne Backend als vorausgefüllte E-Mail) und Links zu Booking.com/Airbnb (`plattformen` pro Wohnung). «Entdecken» ist mit `module.entdecken` in `site/site.config.ts` ausgeschaltet; Online-Buchung kommt erst mit Trizoun Travel (`.env`). Neue Bausteine immer abschaltbar bauen.

Vision der Gesamtplattform (Website → Trizoun Travel mit Mandanten und Payment-Layer → dahinter Trizoun Katalog): `docs/VISION.md` im Repo `trizoun-travel`. Getroffene Entscheide: Skill `produkt-kompass` – vor grösseren neuen Features damit prüfen. Massgebliche Fassung im Repo `trizoun-travel`, hier eine Kopie.

## Neue Aktivität anlegen

**«Entdecken» ist ein Zusatzdienst**: Aktivitäten und Events der Region kommen aus dem zentralen Git-Repo `trizoun-katalog` (`regionen/<region>/`), das zentrale KI-Jobs pflegen. `npm run katalog:sync` spiegelt die Region nach `site/katalog/` (nie von Hand ändern); der Workflow `.github/workflows/katalog-sync.yml` macht das täglich und öffnet einen PR. Gebaut wird alles statisch (`src/lib/entdecken-loader.ts`).

- **Regionale Inhalte** (für alle Websites der Region) gehören ins Katalog-Repo, nicht hierher. Events (`typ: event`) brauchen `termine` und `quelle`; vergangene Events fallen beim Build automatisch weg.
- **Pro Website**: `site/entdecken.yaml` – Katalogeinträge ausblenden, eigenen Tipp anhängen, Anreise ab der Wohnung, Geheimtipp.
- **Eigene Aktivitäten** (nur für diese Website) in `site/aktivitaeten/<slug>/`; gleicher Slug wie im Katalog ersetzt den Katalogeintrag.

Rohinhalte (Texte + Bilder) in `inbox/aktivitaeten/` verarbeitet der Skill `.claude/skills/aktivitaeten-import/`.

1. `site/aktivitaeten/_vorlage.md` kopieren nach `site/aktivitaeten/<slug>/index.md` (kebab-case, ohne Umlaute, z. B. `torrent-skigebiet/index.md`), Bilder in denselben Ordner. Der Ordnername wird zur URL `/entdecken/<slug>/`.
2. Für alle Labels **nur Werte aus `src/lib/labels.ts`** verwenden. Keine neuen Werte erfinden. Wenn ein Wert fehlt, im Text darauf hinweisen statt ihn einzutragen.
3. `geprueft: false` setzen. Fakten, die sich ändern können (Preise, Öffnungszeiten, Fahrpläne), im Text mit `[PRÜFEN]` markieren statt Zahlen zu raten.
4. Text: Deutsch mit Schweizer Rechtschreibung (ss statt ß), du-Form, persönlich aus Gastgeber-Sicht. Abschnitte wie in der Vorlage.
5. `npm run build` ausführen – muss ohne Fehler durchlaufen.

## Neue Wohnung anlegen

1. Ordner `site/wohnungen/alpine-siesta/` kopieren nach `site/wohnungen/<slug>/`. URL wird `/wohnungen/<slug>/`.
2. Bilder im selben Ordner ersetzen bzw. ergänzen und in `galerie` eintragen.
3. `reihenfolge` setzen. Online-Buchung: In Trizoun Travel eine Wohnung mit gleichem Kurznamen (= Ordnername) anlegen und mit Beds24 verknüpfen; abweichender Name → `trizounSlug`. Die Website braucht nur `PUBLIC_TRIZOUN_API_URL` und `PUBLIC_TRIZOUN_KEY` (siehe `.env.example`).
4. Startseite, Navigation («Wohnung» → «Wohnungen») und Übersicht `/wohnungen/` passen sich automatisch an.

## Pillar Pages

- Pillar: `site/pillars/<pillar>/index.md` → `/<seoPfad>/<pillar>/`; Unterseite: `site/pillars/<pillar>/<artikel>/index.md` mit Bildern im selben Ordner.
- Pillar-Schlüssel müssen in `site/site.config.ts` unter `pillars` stehen.
- `entwurf: true`, bis der Text fertig ist (im Build ausgeblendet, in `npm run dev` sichtbar).
- Unterseiten und passende Aktivitäten werden automatisch verlinkt. FAQ im Frontmatter erzeugt FAQPage-Daten.

## Labels richtig wählen

- `monate`: nur Monate, in denen die Aktivität tatsächlich möglich ist (Bergbahnen haben Revisionspausen, Skigebiete eine Saison).
- `zielgruppen`: nur Gruppen, für die die Aktivität wirklich passt. Lieber weniger, dafür treffend – davon hängen die Empfehlungen ab.
- `pillar`: das Pillar-Thema, auf dessen Seite die Aktivität verlinkt wird.
- `anreise_min` / `anreise_wie`: ab der Wohnung im Dorfzentrum von Leukerbad.

## Design

Gestaltet nach `.claude/skills/frontend-design/SKILL.md`. Bauen und Umbauen mit dem Skill `ui-ux-experte`, prüfen mit `ui-pruefen` und `ux-pruefen`. Festgelegtes System – bei neuen Seiten beibehalten:

- **Farben** (`src/styles/global.css`): Dampf `#F5F8F7` (Hintergrund), Kalk `#DCE3E0` (Linien), Nacht `#16233A` (Text, dunkle Bänder), Thermal `#0F7470` (Links, Buttons), Glut `#F0B38C` (Alpenglühen – nur Hero und Buttons auf dunklem Grund).
- **Schrift**: nur Archivo. Titel extrem schmal (`font-stretch: 62%`, Gewicht 800) im Stil Schweizer Reiseplakate, Fliesstext normal breit.
- **Struktur**: gleichrangige Einträge mit Linie oben (`.liste`) statt Karten. Linksbündig. Keine Grossbuchstaben-Labels, keine Mittelpunkte als Trenner.
- **Bewegung**: Ein Höhepunkt – der Hero (Dampf + Titel Zeile für Zeile). Sonst nur Bewegung als Reaktion auf Aktionen (Seitenübergänge, FAQ öffnen, Hover auf Bildern). `prefers-reduced-motion` wird respektiert.
