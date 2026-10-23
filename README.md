# alpine-siesta.ch

Website der Ferienwohnung Alpine Siesta in Leukerbad. Gebaut mit [Astro](https://astro.build). Konzept: [KONZEPT.md](KONZEPT.md).

## Entwickeln

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # statische Seite in dist/
```

## Inhalte bearbeiten

Alle Inhalte und Einstellungen dieser Website liegen in **`site/`** – siehe [site/README.md](site/README.md) für die Übersicht, welches Bild und welcher Text wohin gehört. Der Code in `src/` ist für alle Websites gleich.

```sh
npm run checkliste        # was fehlt noch? (Platzhalter, [TODO], Pillar Pages, Rechtliches …)
npm run build:entwuerfe   # Build inklusive Entwürfe zur Kontrolle
```
