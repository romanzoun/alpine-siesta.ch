---
name: aktivitaeten-import
description: Macht aus rohen Inhalten (Markdown-Notizen, Texte, Bilder) fertige Aktivitäten für die Entdecken-Seite mit Filter, Themenseiten und SEO. Verwenden, wenn der Nutzer Inhalte in inbox/aktivitaeten/ legt oder Aktivitäten, Ausflüge, Tipps, Elemente für «Entdecken» liefert und sagt «importieren», «neue Aktivität», «mach daraus Seiten», «Inbox verarbeiten».
---

# Aktivitäten importieren

Ziel: Jedes gelieferte Element wird zu einem Ordner `site/aktivitaeten/<slug>/` mit `index.md` (strenges Frontmatter) und Bildern daneben. Daraus erzeugt Astro automatisch die Detailseite, die Karte in der Filterliste, die Themenseiten (`/entdecken/saison|fuer|thema/<wert>/`), Brotkrumen und strukturierte Daten. **Du schreibst keine Astro-Komponenten** – nur Inhalte. Die Komponenten sind fertig:

| Datei | Zweck |
|---|---|
| `src/content.config.ts` | Schema `aktivitaeten` – massgeblich für Pflichtfelder und Längen |
| `src/lib/labels.ts` | einzig erlaubte Label-Werte |
| `site/aktivitaeten/_vorlage.md` | Aufbau von Frontmatter und Text |
| `src/lib/entdecken.ts` | welche Themenseiten aus den Labels entstehen |

## 1. Eingang lesen

Eingang liegt in `inbox/aktivitaeten/`. Ein Element ist entweder
- ein Unterordner (eine `.md`/`.txt`-Datei + Bilder), oder
- eine einzelne `.md`-Datei; Bilder sind darin verlinkt oder liegen mit gleichem Namensanfang daneben.

Lies alles vollständig, auch Bilder ansehen (Read-Tool), bevor du schreibst. Fehlt der Eingang, frage nach dem Ort statt zu raten.

Lies vor dem ersten Element `src/lib/labels.ts`, das Schema in `src/content.config.ts`, `_vorlage.md` und `AGENTS.md`.

## 2. Slug festlegen

kebab-case aus dem Titel, Umlaute umschreiben (ä→ae, ö→oe, ü→ue), ohne Füllwörter, max. ~5 Wörter: `torrent-skigebiet`, `albinenleitern`. Existiert der Ordner schon: Nutzer fragen, ob aktualisiert oder neu angelegt werden soll.

## 3. Bilder übernehmen

- Nur gelieferte Bilder verwenden, nie eigene erfinden oder aus dem Netz holen.
- Kopieren nach `site/aktivitaeten/<slug>/`: das beste Querformat als `titel.<ext>`, weitere als `galerie-1.<ext>`, `galerie-2.<ext>` …
- Erlaubt: jpg, jpeg, png, webp, avif. Andere Formate (HEIC, TIFF) mit `convert` nach jpg umwandeln.
- Bilder unter 1200 px Breite trotzdem übernehmen, aber im Bericht melden.
- Alt-Texte auf Deutsch beschreiben, was zu sehen ist (nicht «Bild von …», keine Keyword-Listen), max. ~125 Zeichen.
- Im Frontmatter: `bild: ./titel.jpg`, `bild_alt: …`, `galerie: [{ bild: ./galerie-1.jpg, alt: … }]`.

## 4. Frontmatter ausfüllen

Nur Werte aus `labels.ts`. Herleitung:

| Feld | Woher |
|---|---|
| `title` | ≤ 70 Zeichen, Hauptbegriff zuerst, wie Gäste suchen würden («Albinenleitern: Klettersteig-Abenteuer bei Leukerbad») |
| `description` | 70–160 Zeichen, Nutzen + Ort, ein ganzer Satz |
| `kurz` | ≤ 120 Zeichen für die Karte |
| `monate` | aus Saisonangaben im Eingang; Bergbahnen/Skigebiete nur in Betriebsmonaten. Unklar → konservativ und im Bericht melden |
| `zielgruppen` | nur wo es wirklich passt (Albinenleitern ≠ `familie-klein`) |
| `kategorien` | 1–2, die wichtigste zuerst (bestimmt die Brotkrumen) |
| `pillar` | thematisch nächste Pillar-Seite (Werte: `pillars` in `site/site.config.ts`) |
| `wetter`, `dauer`, `anstrengung`, `preis` | aus dem Eingang ableiten; bei Unsicherheit melden |
| `anreise_min`, `anreise_wie` | ab Dorfzentrum Leukerbad; unbekannt → Schätzung im Bericht ausweisen |
| `kinderwagen`, `hund` | nur `true`, wenn der Eingang es nahelegt; sonst `false` und melden |
| `ort` | nur setzen, wenn nicht Leukerbad |
| `website` | nur offizielle URL aus dem Eingang |
| `geprueft` | immer `false` |

Fehlt ein passender Label-Wert, **nicht** `labels.ts` ändern, sondern den nächstbesten Wert nehmen und den Vorschlag im Bericht nennen.

## 5. Text schreiben

- Aufbau wie `_vorlage.md`: «Darum lohnt es sich», «Praktische Infos», «Unser Tipp».
- Deutsch, Schweizer Rechtschreibung (ss statt ß), du-Form, persönlich aus Sicht der Gastgeber. Konkret statt Werbesprache.
- Fakten nur aus dem Eingang. Preise, Öffnungszeiten, Fahrpläne, die fehlen oder veralten können: `[PRÜFEN]` statt erfundener Zahlen.
- SEO: Hauptbegriff natürlich in der ersten Zeile und in einer Zwischenüberschrift; Synonyme statt Wiederholung; keine Keyword-Listen.
- Interne Links: auf verwandte bestehende Aktivitäten verlinken (`[Gemmipass](/entdecken/gemmipass-daubensee/)`), nur auf Slugs, die es gibt.
- Kein H1 im Text (kommt aus `title`).

## 6. Prüfen

1. `npm run build` – muss fehlerfrei laufen. Schemafehler beheben, nicht das Schema lockern.
2. In der Build-Ausgabe kontrollieren, dass `/entdecken/<slug>/` und die erwarteten Themenseiten entstehen.
3. Wenn möglich `npx astro preview` starten und Detailseite plus `/entdecken/?…` mit passenden Filtern als Screenshot ansehen (Desktop und 390 px).

## 7. Aufräumen und berichten

- Verarbeitete Eingänge nach `inbox/_erledigt/<JJJJ-MM-TT>/` verschieben (nicht löschen).
- Bericht an den Nutzer, eine Zeile pro Element: Slug/URL, gewählte Labels, unsichere Felder, Anzahl `[PRÜFEN]`, Bildhinweise, neue Themenseiten.
- Für neue Themenseiten anbieten, einen eigenen Einleitungstext in `site/themenseiten/<dimension>-<wert>.md` zu schreiben (Felder siehe Schema `themenseiten`), damit die Seite nicht nur aus der Liste besteht.
