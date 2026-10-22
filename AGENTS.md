# Hinweise für KI-Assistenten

Inhalte dieser Website sind Markdown-Dateien mit strengem Frontmatter-Schema. Beim Build wird jedes Feld geprüft – ungültige Labels brechen den Build ab.

## Neue Aktivität anlegen

1. `src/content/aktivitaeten/_vorlage.md` kopieren nach `src/content/aktivitaeten/<slug>.md` (kebab-case, ohne Umlaute, z. B. `torrent-skigebiet.md`). Der Dateiname wird zur URL `/entdecken/<slug>/`.
2. Für alle Labels **nur Werte aus `src/lib/labels.ts`** verwenden. Keine neuen Werte erfinden. Wenn ein Wert fehlt, im Text darauf hinweisen statt ihn einzutragen.
3. `geprueft: false` setzen. Fakten, die sich ändern können (Preise, Öffnungszeiten, Fahrpläne), im Text mit `[PRÜFEN]` markieren statt Zahlen zu raten.
4. Text: Deutsch mit Schweizer Rechtschreibung (ss statt ß), du-Form, persönlich aus Gastgeber-Sicht. Abschnitte wie in der Vorlage.
5. `npm run build` ausführen – muss ohne Fehler durchlaufen.

## Labels richtig wählen

- `monate`: nur Monate, in denen die Aktivität tatsächlich möglich ist (Bergbahnen haben Revisionspausen, Skigebiete eine Saison).
- `zielgruppen`: nur Gruppen, für die die Aktivität wirklich passt. Lieber weniger, dafür treffend – davon hängen die Empfehlungen ab.
- `pillar`: das Pillar-Thema, auf dessen Seite die Aktivität verlinkt wird.
- `anreise_min` / `anreise_wie`: ab der Wohnung im Dorfzentrum von Leukerbad.
