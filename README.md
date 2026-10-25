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

## Phasen

Die Website wächst in Stufen; was aktiv ist, steht in `site/site.config.ts`:

1. **Jetzt:** Wohnung, Reiseführer (Pillar Pages), Kontaktformular (`kontakt.php`, braucht Hosting mit PHP, z. B. Infomaniak), Links zu Booking.com/Airbnb pro Wohnung (`plattformen` in `site/wohnungen/<slug>/index.md`).
2. **Entdecken:** `module.entdecken: true` und Katalog-Sync (siehe unten).
3. **Online-Buchung:** Trizoun Travel mit Beds24 (`.env`), Kalender ersetzt das Anfrageformular; Plattform-Links bleiben als «Auch buchbar auf».
4. **Shop.**

## Kontaktformular

Beim Build entsteht `dist/kontakt.php` aus `src/server/kontakt.php` mit Empfänger und Absender aus `site.kontakt` – die Empfängeradresse steht nie im Formular. Schutz: Spam-Falle, Mindestzeit, 5 Anfragen pro Stunde und IP. Der Absender muss eine Adresse der eigenen Domain sein, damit die Mail nicht im Spam landet. `npm run dev` hat kein PHP – Formular nach dem Deploy testen.

## Entdecken (Aktivitäten)

Ausgeschaltet, solange `module.entdecken: false` (keine Seiten, kein Menüpunkt, Sync macht nichts).

Zusatzdienst «Entdecken»: Aktivitäten und Events der Region (mit Quelle) kommen aus dem Git-Repo **`trizoun-katalog`** und werden statisch gerendert – mit Filter, Themenseiten und Detailseite pro Eintrag.

```sh
npm run katalog:sync                          # Region aus site.config.ts (katalog) nach site/katalog/ spiegeln
KATALOG_DIR=../trizoun-katalog npm run katalog:sync   # aus lokalem Checkout
```

Täglich läuft `.github/workflows/katalog-sync.yml`: Sync, Build und SEO-Check, dann ein PR mit den Änderungen. Für ein privates Katalog-Repo braucht das Repo das Secret `KATALOG_TOKEN` (Fine-grained Token, nur Lesezugriff auf `trizoun-katalog`). Anpassungen pro Website: `site/entdecken.yaml`; eigene Aktivitäten: `site/aktivitaeten/`.

## Online-Buchung

Das Buchungs-Widget (`src/components/Buchung.astro`, auf jeder Wohnungsseite unter `#buchen`) zeigt freie Tage, berechnet den Preis und leitet zur Beds24-Buchungsseite weiter. Die Daten kommen von **Trizoun Travel** (Repo `trizoun-travel`), wo Beds24 verbunden ist. Konfiguration in `.env`: `PUBLIC_TRIZOUN_API_URL`, `PUBLIC_TRIZOUN_KEY`. Ohne diese Werte zeigt das Widget die Mail-Anfrage.

```sh
npm run checkliste        # was fehlt noch? (Platzhalter, [TODO], Pillar Pages, Rechtliches …)
npm run build:entwuerfe   # Build inklusive Entwürfe zur Kontrolle
npm run seo-check         # nach dem Build: Titel, Descriptions, H1, Alt-Texte, tote Links, JSON-LD
```
