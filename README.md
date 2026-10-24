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

## Online-Buchung

Das Buchungs-Widget (`src/components/Buchung.astro`, auf jeder Wohnungsseite unter `#buchen`) zeigt freie Tage, berechnet den Preis und leitet zur Beds24-Buchungsseite weiter. Die Daten kommen von **Trizoun Travel** (Repo `trizoun-travel`), wo Beds24 verbunden ist. Konfiguration in `.env`: `PUBLIC_TRIZOUN_API_URL`, `PUBLIC_TRIZOUN_KEY`. Ohne diese Werte zeigt das Widget die Mail-Anfrage.

```sh
npm run checkliste        # was fehlt noch? (Platzhalter, [TODO], Pillar Pages, Rechtliches …)
npm run build:entwuerfe   # Build inklusive Entwürfe zur Kontrolle
npm run seo-check         # nach dem Build: Titel, Descriptions, H1, Alt-Texte, tote Links, JSON-LD
```
