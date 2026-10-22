# alpine-siesta.ch

Website der Ferienwohnung Alpine Siesta in Leukerbad. Gebaut mit [Astro](https://astro.build). Konzept: [KONZEPT.md](KONZEPT.md).

## Entwickeln

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # statische Seite in dist/
```

## Inhalte bearbeiten

| Was | Datei |
|---|---|
| Wohnung (Fakten, Ausstattung, Lage, Hausregeln, Galerie, Beschreibung) | `src/content/wohnung/alpine-siesta.md` |
| Startseite (Hero, Highlights, Vorteile, Bewertungen, FAQ) | `src/content/seiten/startseite.md` |
| Bilder der Wohnung | `src/assets/wohnung/` (Dateiname dann in der Galerie eintragen) |
| E-Mail, Buchungslink, Navigation | `src/config.ts` |

Alle Stellen mit `[TODO]` müssen noch mit echten Angaben gefüllt werden. Bilder werden beim Build automatisch verkleinert und als WebP ausgeliefert – Originale in voller Auflösung ablegen.
