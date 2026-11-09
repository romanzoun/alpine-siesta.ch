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

1. **Jetzt:** Wohnung, Reiseführer (Pillar Pages), Kontaktformular (vorerst als vorausgefüllte E-Mail), Links zu Booking.com/Airbnb pro Wohnung (`plattformen` in `site/wohnungen/<slug>/index.md`).
2. **Entdecken:** `module.entdecken: true` und Katalog-Sync (siehe unten).
3. **Online-Buchung:** Trizoun Travel mit Beds24 (`.env`), Kalender ersetzt das Anfrageformular; Plattform-Links bleiben als «Auch buchbar auf».
4. **Shop.**

## Kontaktformular

`src/components/Anfrage.astro` (Wohnungsseite und `/kontakt/`). Ohne `site.kontakt.endpunkt` öffnet «E-Mail vorbereiten» eine fertig ausgefüllte E-Mail an `site.email` – kein Server nötig. Sobald das Backend läuft, dort die URL eintragen: das Formular sendet dann JSON (`name`, `email`, `nachricht`, `wohnung`, `anreise`, `abreise`, `gaeste`, `t`, `website` = Spam-Falle) und erwartet `{ ok: true }`.

## Entdecken (Aktivitäten)

Ausgeschaltet, solange `module.entdecken: false` (keine Seiten, kein Menüpunkt, Sync macht nichts).

Zusatzdienst «Entdecken»: Aktivitäten und Events der Region (mit Quelle) werden zentral in **Trizoun Travel** gespeichert. Der Katalog-Sync holt sie bei aktivem Discovery-Modul per API und rendert sie statisch – mit Filter, Themenseiten und Detailseite pro Eintrag. Ohne API-Konfiguration bleibt der Git-Sync als Übergang verfügbar.

```sh
npm run katalog:sync                          # Region aus site.config.ts (katalog) nach site/katalog/ spiegeln
KATALOG_DIR=../trizoun-katalog npm run katalog:sync   # aus lokalem Checkout
```

Täglich läuft `.github/workflows/katalog-sync.yml`: API-Sync, Build und SEO-Check, dann ein PR mit den Änderungen. Dafür braucht das Repo die Variablen `PUBLIC_TRIZOUN_API_URL` und `PUBLIC_TRIZOUN_KEY` sowie die Discovery-Freischaltung für die Organisation. Ohne API-Konfiguration nutzt der Übergangsweg das Secret `KATALOG_TOKEN` (nur Lesezugriff auf `trizoun-katalog`). Anpassungen pro Website: `site/entdecken.yaml`; eigene Aktivitäten: `site/aktivitaeten/`.

Den kompletten Datenweg lokal und ohne Produktionsschlüssel prüfen:

```sh
git submodule update --init --recursive
npm ci
npm ci --prefix trizoun-travel
npm ci --prefix trizoun-katalog/backoffice
npm run katalog:e2e
```

Der Test importiert einen echten Katalogeintrag in eine temporäre Travel-Testdatenbank und prüft Discovery-Freigabe, API-Abruf, Bild und Website-Sync. Er ändert keine Live-Daten. Für einen Website-Build mit Aktivitäten `module.entdecken` in `site/site.config.ts` einschalten, `npm run katalog:sync` und danach `npm run build` ausführen. Dafür braucht der echte Sync entweder die Travel-API mit freigeschaltetem Discovery-Modul oder den lokalen Katalog über `KATALOG_DIR=trizoun-katalog`.

## Online-Buchung

Das Buchungs-Widget (`src/components/Buchung.astro`, auf jeder Wohnungsseite unter `#buchen`) zeigt freie Tage, berechnet den Preis und leitet zur Beds24-Buchungsseite weiter. Die Daten kommen von **Trizoun Travel** (Repo `trizoun-travel`), wo Beds24 verbunden ist. Konfiguration in `.env`: `PUBLIC_TRIZOUN_API_URL`, `PUBLIC_TRIZOUN_KEY`. Ohne diese Werte zeigt das Widget die Mail-Anfrage.

```sh
npm run checkliste        # was fehlt noch? (Platzhalter, [TODO], Pillar Pages, Rechtliches …)
npm run build:entwuerfe   # Build inklusive Entwürfe zur Kontrolle
npm run seo-check         # nach dem Build: Titel, Descriptions, H1, Alt-Texte, tote Links, JSON-LD
```
