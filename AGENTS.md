# Hinweise für KI-Assistenten

Inhalte dieser Website sind Markdown-Dateien mit strengem Frontmatter-Schema. Beim Build wird jedes Feld geprüft – ungültige Labels brechen den Build ab.

## Neue Aktivität anlegen

Rohinhalte (Texte + Bilder) werden mit dem Skill `.claude/skills/aktivitaeten-import/` verarbeitet – Eingang in `inbox/aktivitaeten/`.

1. `src/content/aktivitaeten/_vorlage.md` kopieren nach `src/content/aktivitaeten/<slug>/index.md` (kebab-case, ohne Umlaute, z. B. `torrent-skigebiet/index.md`), Bilder in denselben Ordner. Der Ordnername wird zur URL `/entdecken/<slug>/`.
2. Für alle Labels **nur Werte aus `src/lib/labels.ts`** verwenden. Keine neuen Werte erfinden. Wenn ein Wert fehlt, im Text darauf hinweisen statt ihn einzutragen.
3. `geprueft: false` setzen. Fakten, die sich ändern können (Preise, Öffnungszeiten, Fahrpläne), im Text mit `[PRÜFEN]` markieren statt Zahlen zu raten.
4. Text: Deutsch mit Schweizer Rechtschreibung (ss statt ß), du-Form, persönlich aus Gastgeber-Sicht. Abschnitte wie in der Vorlage.
5. `npm run build` ausführen – muss ohne Fehler durchlaufen.

## Neue Wohnung anlegen

1. `src/content/wohnungen/alpine-siesta.md` kopieren nach `src/content/wohnungen/<slug>.md`. URL wird `/wohnungen/<slug>/`.
2. Bilder in einen eigenen Ordner `src/assets/<slug>/` legen und in `galerie` eintragen.
3. `reihenfolge` setzen und unter `beds24` die `propertyId` und `roomId` aus Beds24 eintragen. Der Beds24-Token in `.env` gilt für alle Wohnungen.
4. Startseite, Navigation («Wohnung» → «Wohnungen») und Übersicht `/wohnungen/` passen sich automatisch an.

## Labels richtig wählen

- `monate`: nur Monate, in denen die Aktivität tatsächlich möglich ist (Bergbahnen haben Revisionspausen, Skigebiete eine Saison).
- `zielgruppen`: nur Gruppen, für die die Aktivität wirklich passt. Lieber weniger, dafür treffend – davon hängen die Empfehlungen ab.
- `pillar`: das Pillar-Thema, auf dessen Seite die Aktivität verlinkt wird.
- `anreise_min` / `anreise_wie`: ab der Wohnung im Dorfzentrum von Leukerbad.

## Design

Gestaltet nach `.claude/skills/frontend-design/SKILL.md`. Festgelegtes System – bei neuen Seiten beibehalten:

- **Farben** (`src/styles/global.css`): Dampf `#F5F8F7` (Hintergrund), Kalk `#DCE3E0` (Linien), Nacht `#16233A` (Text, dunkle Bänder), Thermal `#0F7470` (Links, Buttons), Glut `#F0B38C` (Alpenglühen – nur Hero und Buttons auf dunklem Grund).
- **Schrift**: nur Archivo. Titel extrem schmal (`font-stretch: 62%`, Gewicht 800) im Stil Schweizer Reiseplakate, Fliesstext normal breit.
- **Struktur**: gleichrangige Einträge mit Linie oben (`.liste`) statt Karten. Linksbündig. Keine Grossbuchstaben-Labels, keine Mittelpunkte als Trenner.
- **Bewegung**: Ein Höhepunkt – der Hero (Dampf + Titel Zeile für Zeile). Sonst nur Bewegung als Reaktion auf Aktionen (Seitenübergänge, FAQ öffnen, Hover auf Bildern). `prefers-reduced-motion` wird respektiert.
