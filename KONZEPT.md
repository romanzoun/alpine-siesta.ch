# Alpine Siesta – Konzept

Schlanke Astro-Website für die Ferienwohnung «Alpine Siesta» in Leukerbad.
Vier Bausteine, ein Ziel: **mehr Direktbuchungen** (ohne Provision von Booking/Airbnb) und eine eigene Marke, die auch ausserhalb der Wohnung Geld verdient.

| Baustein | Zweck | Umsatzhebel |
|---|---|---|
| 1. Startseite + Buchung | «Bester Ort der Schweiz» erzählen, direkt buchen | Direktbuchung statt 15–18 % OTA-Provision |
| 2. SEO-Bereich (5 Pillars × 5 Unterseiten) | Organischer Traffic über Google | Gäste finden die Wohnung beim Recherchieren |
| 3. Discovery («Was mache ich in Leukerbad?») | Filter nach Monat + Gästetyp → Empfehlungen | Längere Verweildauer, Inspiration → Buchung |
| 4. Print-on-Demand-Shop | Merch Alpine Siesta / Leukerbad, Grand-Tour-Poster | Zusatzumsatz ohne Lager |

---

## 1. Grundprinzipien

- **Statisch zuerst.** Alle Inhaltsseiten werden zur Build-Zeit als HTML generiert. JavaScript nur dort, wo es interaktiv wird (Buchungs-Widget, Discovery-Filter, Warenkorb) – als Astro-Islands.
- **Wenige Abhängigkeiten.** Astro + Content Collections + etwas CSS. Kein CMS, keine Datenbank. Inhalte sind Markdown-Dateien im Repo.
- **Beds24 ist die Wahrheit für Buchungen**, der POD-Anbieter für Produkte, Stripe für Zahlungen. Die Website hält keinen eigenen Zustand.
- **Performance-Budget:** < 30 KB JS auf Startseite und SEO-Seiten, Lighthouse ≥ 95 in allen Kategorien, LCP < 2 s mobil.

## 2. Tech-Stack

| Bereich | Wahl | Begründung |
|---|---|---|
| Framework | **Astro 5** (`output: 'static'` + einzelne Server-Routen) | Null-JS-Standard, Content Collections, Islands |
| Hosting | **Cloudflare Pages** (Adapter `@astrojs/cloudflare`) | Gratis-Tier reicht, Edge-Functions für API-Routen, gutes Caching |
| Styling | Plain CSS mit Custom Properties (optional Tailwind 4) | Schlank, keine Build-Magie |
| Islands | **Preact** (3 KB) oder Vanilla-Web-Components | Nur für Filter, Kalender, Warenkorb |
| State im Client | `nanostores` (Warenkorb, Discovery-Auswahl) | < 1 KB, framework-unabhängig |
| Bilder | `astro:assets` (AVIF/WebP, responsive) | LCP, automatische Grössen |
| Buchung | **Beds24 API v2** | Channel-Manager für Booking.com, Airbnb, Direkt |
| Zahlungen Shop | **Stripe Checkout** (TWINT, Karte, Apple/Google Pay) | Kein eigenes Payment-UI, TWINT für CH |
| POD | **Gelato** (bevorzugt) oder Printful | siehe Kapitel 7 |
| Mehrsprachigkeit | Astro i18n-Routing: **DE** (Standard) + **EN**, FR später | Wallis ist zweisprachig, viele internationale Gäste |
| Analytics | Plausible oder Umami (cookielos) | Kein Cookie-Banner nötig |

## 3. Seitenstruktur (Sitemap)

```
/                               Startseite – Story + Buchungs-Widget
/wohnung/                       Die Wohnung: Räume, Ausstattung, Galerie, Hausregeln
/buchen/                        Verfügbarkeit, Preise, Buchung (Beds24)
/leukerbad/                     SEO-Hub: Übersicht der 5 Pillars
/leukerbad/[pillar]/            Pillar-Page (5×)
/leukerbad/[pillar]/[thema]/    Unterseite (25×)
/entdecken/                     Discovery: Filter Monat × Gästetyp × Kategorie
/entdecken/[aktivitaet]/        Einzelne Aktivität (eigene SEO-Longtail-Seite)
/shop/                          Produktübersicht
/shop/[produkt]/                Produktseite
/shop/warenkorb/                Warenkorb → Stripe Checkout
/shop/danke/                    Bestellbestätigung
/kontakt/  /impressum/  /datenschutz/  /agb/
/en/...                         Englische Spiegelung
```

### Navigation

`Wohnung · Leukerbad · Entdecken · Shop · [Jetzt buchen]` – der Buchen-Button ist auf jeder Seite sichtbar (sticky auf Mobile).

## 4. Startseite

Ziel: In 5 Sekunden verstehen *wo*, *was* und *wie buchen*.

1. **Hero** – Vollbild Leukerbad (Gemmiwand / Thermalbad im Schnee), Claim z. B. *«Thermalwasser, Gemmiwand, Siesta. Der schönste Ort der Schweiz zum Abschalten.»* + **Buchungsleiste** (An-/Abreise, Gäste → «Verfügbarkeit prüfen»).
2. **Warum Leukerbad** – 3–4 Kacheln: Europas grösster alpiner Thermalort · Sommer & Winter · Ruhe statt Rummel · Familienfreundlich. Jede Kachel verlinkt auf eine Pillar-Page (interne Verlinkung!).
3. **Die Wohnung** – Galerie, Kernfakten (Personen, Zimmer, Distanz zum Bad, Parkplatz), Link zu `/wohnung/`.
4. **Direkt buchen lohnt sich** – Bestpreis-Garantie, z. B. 10 % günstiger als auf Booking/Airbnb, persönlicher Kontakt, flexible Storno.
5. **Discovery-Teaser** – «Wann kommst du? Wer bist du?» Mini-Version des Filters → leitet auf `/entdecken/?monat=…&wer=…`.
6. **Bewertungen** – kuratierte Zitate aus Airbnb/Booking (manuell gepflegt).
7. **Shop-Teaser** – 3 Produkte, Grand-Tour-Poster prominent.
8. **FAQ** – Anreise, Check-in, Haustiere, Parkplatz (mit `FAQPage`-Schema).

## 5. Buchung mit Beds24

Beds24 bleibt der Channel-Manager: Booking.com, Airbnb und Direktbuchungen teilen sich einen Kalender, keine Doppelbuchungen.

### Stufe 1 – schnell live (empfohlen für den Start)

- Eigene Buchungsleiste auf der Website (Datum + Gäste).
- Server-Route `GET /api/availability?from=…&to=…&guests=…` fragt die **Beds24 API v2** ab (`/inventory/rooms/offers` bzw. `/inventory/rooms/calendar`) und liefert Preis + Verfügbarkeit.
- Gesperrte Tage werden im Kalender ausgegraut, der Preis wird live angezeigt.
- Klick auf «Buchen» → Weiterleitung auf die **Beds24-Buchungsseite** mit vorausgefüllten Parametern (`propid`, `checkin`, `numnight`, `numadult`). Bezahlung und Bestätigung laufen über Beds24 (Stripe-Anbindung dort konfigurieren).

### Stufe 2 – voll integriert (später)

- Checkout komplett auf alpine-siesta.ch: Gastdaten-Formular → Stripe Payment Intent → `POST /bookings` an Beds24.
- Webhook von Beds24 für Bestätigungen/Stornos.

### Technische Details

- Beds24 v2 nutzt einen **Refresh-Token**, aus dem kurzlebige Access-Tokens erzeugt werden. Beide liegen nur als Secrets in Cloudflare – nie im Client.
- Verfügbarkeiten 5–10 min an der Edge cachen (Cloudflare Cache API), damit die API-Limits von Beds24 nicht erreicht werden.
- Preise immer aus Beds24 – keine Preise hart im Code.

## 6. SEO-Bereich: 5 Pillars × 5 Unterseiten

Hub-and-Spoke-Modell: Jede Pillar-Page ist ein langer Übersichtsartikel (1500–2500 Wörter), die 5 Unterseiten vertiefen je ein Thema (800–1500 Wörter) und verlinken zurück auf die Pillar und auf `/buchen/`.

| # | Pillar | Unterseiten (Arbeitstitel) |
|---|---|---|
| 1 | **Thermen & Wellness** `/leukerbad/thermen/` | Leukerbad Therme (Eintritt, Tipps) · Walliser Alpentherme & Spa · Thermalbad im Winter · Wellness-Wochenende planen · Thermalquellen: Geschichte & Wirkung |
| 2 | **Familienferien** `/leukerbad/familie/` | Leukerbad mit Kleinkindern · Spielplätze & Indoor bei Regen · Familienwanderungen (kinderwagentauglich) · Skifahren lernen in Leukerbad · Familienferien-Budget |
| 3 | **Wandern & Sommer** `/leukerbad/sommer/` | Gemmipass (Seilbahn & Wanderung) · Klettersteige Leukerbad · Torrent-Wanderungen & Rinderhütte · Albinenleitern · Bike & E-Bike |
| 4 | **Winter & Ski** `/leukerbad/winter/` | Skigebiet Torrent · Langlauf & Winterwandern · Schneeschuhtouren · Daubensee im Winter · Ski & Therme kombinieren |
| 5 | **Anreise & Wallis-Ausflüge** `/leukerbad/reisetipps/` | Anreise mit ÖV und Auto (inkl. Parkieren) · Beste Reisezeit nach Monat · Restaurants & Raclette · Ausflüge im Wallis (Sion, Leuk, Pfynwald, Weinregion) · Leukerbad an einem Wochenende |

> Die Liste ist ein Startpunkt. Vor dem Schreiben pro Seite mit Keyword-Recherche (Google Search Console, Ahrefs/Ubersuggest, «Ähnliche Fragen») die Haupt-Suchbegriffe festlegen und die Titel daran ausrichten.

### On-Page-Standards (Template-Ebene, einmal gebaut)

- Eindeutiger `<title>` (≤ 60 Zeichen) und Meta-Description pro Seite aus dem Frontmatter.
- Breadcrumbs + `BreadcrumbList`-Schema.
- Schema.org: `VacationRental`/`LodgingBusiness` (Wohnung), `Article`, `FAQPage`, `TouristAttraction` (Aktivitäten), `Product` (Shop).
- `hreflang` für DE/EN, Canonical-Tags, automatische `sitemap.xml` (`@astrojs/sitemap`).
- Jede SEO-Seite: Inhaltsverzeichnis, 1 Buchungs-CTA mittig, 1 am Ende, «Passende Aktivitäten» aus Discovery (automatisch über gemeinsame Tags).
- OG-Bilder automatisch generieren (Satori / `astro-og-canvas`).

## 7. Discovery: «Was kann ich in Leukerbad machen?»

Gast wählt **Monat** und **wer er ist** – die Seite zeigt passende Aktivitäten, sortiert nach Relevanz.

### Datenmodell (Content Collection `aktivitaeten`)

```yaml
# src/content/aktivitaeten/gemmipass.md
title: Gemmipass mit Seilbahn und Daubensee
kurz: Mit der Gondel auf 2350 m, Spaziergang zum Daubensee.
monate: [6, 7, 8, 9, 10]          # wann sinnvoll
zielgruppen: [familie, paar, senioren, aktiv]
kategorie: [natur, aussicht]
wetter: outdoor                     # outdoor | indoor | beides
dauer: halbtag                      # kurz | halbtag | ganztag
anstrengung: leicht                 # leicht | mittel | anspruchsvoll
preis: "$$"                         # gratis | $ | $$ | $$$
distanz_min: 5                      # Gehminuten / Fahrminuten ab Wohnung
kinderwagen: false
hund: true
geheimtipp: false
bild: ./gemmi.jpg
pillar: sommer                      # Verknüpfung zum SEO-Bereich
```

### Filter-Labels

| Dimension | Werte |
|---|---|
| Monat | Jan–Dez (Einzelauswahl, Standard: aktueller Monat) |
| Wer bist du? | Familie mit Kleinkind · Familie mit Teenagern · Paar · Solo · Freunde · Senioren · Sportlich |
| Kategorie | Wellness · Natur · Sport · Kultur · Kulinarik · Regenprogramm |
| Optional | Gratis · Kinderwagen · Hund · Indoor · Geheimtipp |

### Funktionsweise

- Alle Aktivitäten werden zur Build-Zeit als kleines JSON (~10–20 KB) ins Island gegeben. Kein Server nötig.
- **Scoring statt hartem Filter:** Monat und Zielgruppe sind Pflicht-Treffer, Kategorien/Optionen erhöhen den Score. So gibt es nie eine leere Ergebnisliste.
- Ergebnis-Blöcke: «Unsere Top 3 für dich», darunter alle weiteren Treffer.
- Filter stehen in der URL (`/entdecken/?monat=2&wer=familie`) → teilbar, vom Teaser auf der Startseite verlinkbar.
- SEO: Gefilterte URLs bekommen `noindex`; dafür hat jede Aktivität eine eigene, indexierbare Seite `/entdecken/[aktivitaet]/`.
- Unter den Ergebnissen: «Im Februar ist die Wohnung noch frei an diesen Daten» → Buchungs-CTA mit vorausgewähltem Monat.

**Erweiterung später:** Wetter-Hinweis (MeteoSwiss), saisonale Events (Collection `events` mit Datum), «Mein Ferienplan» als Merkliste.

Startumfang: **30–40 Aktivitäten**, damit jede Kombination aus Monat × Zielgruppe mind. 5 Treffer liefert.

## 8. Print-on-Demand-Shop

### Sortiment (Start)

| Produkt | Beschaffung | Anbieter |
|---|---|---|
| T-Shirts | Print-on-Demand | Gelato |
| Tassen | Print-on-Demand | Gelato |
| Metallplatten (Alu-Druck, Poster-Motive) | Print-on-Demand | Gelato (Alu-Prints) |
| Bilderrahmen (gerahmte Poster) | Print-on-Demand | Gelato (Framed Posters) |
| Magnete | **Eigenes Kleinlager** | Kleinserie bei Schweizer Druckerei |
| Holzkugelschreiber (graviert) | **Eigenes Kleinlager** | Kleinserie Lasergravur, Schweizer Werbeartikel-Anbieter |

Motive über alle Produkte: **Alpine Siesta** (Logo/Claim «Siesta auf 1411 m»), **Leukerbad** (Gemmiwand, Thermalbad) und **Grand-Tour-Poster** (Vintage-Serie, siehe Rechtliches unten).

**Warum Magnete und Kugelschreiber nicht POD:** Graviertes Holz und Magnete gibt es bei den grossen POD-Anbietern kaum, und wenn, dann nicht aus CH. Da alle Stücke dasselbe Motiv tragen (keine Personalisierung), ist eine Kleinserie (z. B. 100–250 Stück) pro Stück viel günstiger. Beide Produkte passen in einen Briefumschlag → Versand als B-Post-Brief, ohne Lagerlogistik. Zusätzlich in der Wohnung als Mitnahme-Artikel verkaufen (QR-Code → Shop oder TWINT).

**Gemischte Bestellungen:** Der Stripe-Webhook trennt den Warenkorb: POD-Artikel → Gelato-API, Lagerartikel → Bestell-Mail mit Packliste an dich. Bei Bestellungen nur mit Lagerartikeln reduzierte Versandkosten (Brief statt Paket).

### Anbieter & Routing CH / EU

Ziel: Schweizer Bestellungen in der Schweiz produzieren, EU-Bestellungen in der EU – keine Zollgebühren und kurze Lieferzeiten.

**Variante A – ein Anbieter, automatisches Routing (Start):**
**Gelato** führt die Schweiz als eigenen Produktionsstandort und leitet jede Bestellung selbst an die nächstgelegene Druckerei weiter. Wir schicken nur die Lieferadresse, Gelato wählt CH oder EU. Eine API, ein Katalog, ein Mockup-Set.
Vorbehalt: Nicht jedes Produkt wird an jedem Standort hergestellt. Pro Produkt prüfen, ob es in CH produziert wird (sonst kommt es aus der EU, mit Zoll).

**Variante B – zwei Anbieter, eigenes Routing:**
Schweizer Anbieter (z. B. **Dropshirt.ch**, API + White-Label-Versand) für Lieferungen in die Schweiz, **Gelato/Printful/Prodigi** für die EU.
Der Stripe-Webhook entscheidet anhand des Lieferlandes:

```ts
const provider = order.shipping.country === 'CH' || order.shipping.country === 'LI'
  ? swissProvider   // z. B. Dropshirt
  : euProvider;     // z. B. Gelato
```

Nachteil: Zwei Kataloge, zwei Mockup-Sets, unterschiedliche Druckqualität, Produkte müssen bei beiden Anbietern existieren.

**Empfehlung:** Mit Gelato starten (Variante A). Nur wenn Probebestellungen zeigen, dass wichtige Produkte nicht in CH produziert werden, einen Schweizer Anbieter für diese Produkte dazunehmen. Vor dem Launch Probebestellungen nach CH und in ein EU-Land machen (Farbe, Lieferzeit, Zoll).

**MWST beim Verkauf in die EU:** Als Schweizer Verkäufer an EU-Privatkunden fällt EU-Mehrwertsteuer an (ggf. Registrierung über IOSS). Vor dem EU-Launch mit Treuhänder klären. Alternativ zum Start nur CH + LI beliefern.

### Architektur

```
Build-Zeit:  POD-API (Produkte, Varianten, Mockups) ──► statische Produktseiten
Client:      Warenkorb in nanostores + localStorage
Checkout:    POST /api/checkout ──► Stripe Checkout Session (Preise serverseitig geprüft)
Bezahlt:     Stripe-Webhook /api/stripe-webhook ──► Bestellung bei Gelato/Printful anlegen
Versand:     POD-Webhook ──► Versandmail (über Stripe oder Resend)
```

- Produktdaten werden beim Build gezogen (plus nächtlicher Rebuild per Cloudflare Cron/Deploy-Hook), damit die Produktseiten statisch und schnell bleiben.
- Preise in CHF, Stripe übernimmt TWINT und Karten.
- Optional: Gutschein für Gäste («10 % auf Merch nach deinem Aufenthalt»), Code wird in der Beds24-Bestätigungsmail mitgeschickt.

### ⚠️ Rechtliches zum Grand-Tour-Poster

«Grand Tour of Switzerland» ist eine **geschützte Marke von Schweiz Tourismus**. Vor dem Verkauf entweder eine Lizenz anfragen oder einen eigenen Namen verwenden (z. B. «Alpine Siesta Swiss Route», «Schweizer Rundreise»). Ebenso bei Logos der Leukerbad Therme, Seilbahnen usw. nur eigene Illustrationen ohne fremde Marken.

## 9. Projektstruktur

```
src/
  components/        BookingBar.astro, Calendar.tsx, ActivityCard.astro, CartButton.tsx …
  layouts/           Base.astro, Article.astro (SEO), Product.astro
  content/
    pillars/         thermen.md, familie.md …               (5)
    artikel/         thermen/leukerbad-therme.md …          (25)
    aktivitaeten/    gemmipass.md …                          (30–40)
    seiten/          wohnung.md, faq.md
  content.config.ts  Zod-Schemas für alle Collections
  lib/
    beds24.ts        Token-Handling, Availability, Offers
    pod.ts           Gelato/Printful-Client
    stripe.ts
    discovery.ts     Scoring-Logik (auch für Tests)
  pages/
    index.astro
    wohnung.astro
    buchen.astro
    leukerbad/[pillar]/index.astro
    leukerbad/[pillar]/[slug].astro
    entdecken/index.astro
    entdecken/[slug].astro
    shop/…
    api/availability.ts      (server)
    api/checkout.ts          (server)
    api/stripe-webhook.ts    (server)
  i18n/              de.json, en.json
public/              Favicons, robots.txt
```

Nur die Dateien unter `pages/api/` laufen serverseitig (`export const prerender = false`), alles andere ist statisch.

## 10. Rechtliches & Betrieb (Schweiz)

- **Impressum** und **Datenschutzerklärung nach revDSG** (Beds24, Stripe, POD-Anbieter, Analytics als Auftragsbearbeiter nennen).
- **AGB** für Buchungen (Storno, Hausordnung) und separat für den Shop (Widerruf, Lieferzeiten).
- **Kurtaxe** Leukerbad im Buchungspreis ausweisen oder separat angeben.
- **MWST:** Pflicht erst ab CHF 100 000 Umsatz – Vermietung + Shop zusammenrechnen.
- Kein Cookie-Banner nötig, solange nur cookielose Analytics eingesetzt werden.

## 11. Roadmap

Reihenfolge festgelegt: zuerst alles auf Dateibasis, Integrationen danach.

| Phase | Inhalt | Status |
|---|---|---|
| **1 – Wohnung (Dateibasis)** | Astro-Grundgerüst, Layout, Startseite, Wohnungsseite. Texte und Bilder als Dateien in `src/content/` und `src/assets/` | ✅ Grundgerüst steht, Inhalte (`[TODO]`) folgen |
| **2 – Pillar Pages** | 5 Pillar-Pages, danach 25 Unterseiten als Markdown | ⏳ |
| **3 – Discovery mit CMS** | Aktivitäten werden über ein CMS gepflegt. Empfehlung: git-basiertes CMS (z. B. Keystatic oder Decap), das die Einträge weiterhin als Dateien im Repo speichert – kein Server, keine Datenbank | ⏳ |
| **4 – Beds24** | Verfügbarkeit + Preise live, Weiterleitung zur Beds24-Buchung; ersetzt die Mail-Anfrage hinter «Jetzt buchen» | ⏳ |
| **5 – Shop** | POD (Gelato) + Kleinlager, Stripe Checkout, Webhooks | ⏳ |
| **6 – Ausbau** | Integrierter Checkout (Beds24 Stufe 2), EN/FR, Events, Gäste-Gutscheine | ⏳ |

## 12. Offene Fragen

1. Eckdaten der Wohnung: Personen, Zimmer, Lage/Distanz zur Therme, Parkplatz, Haustiere?
2. Sprachen zum Start: nur DE + EN oder direkt auch FR?
3. Beds24: Gibt es schon einen API-v2-Zugang (Refresh-Token) und ist eine Zahlungsart (Stripe) in Beds24 aktiv?
4. Direktbuchungsrabatt: Wie viel günstiger als auf den Plattformen?
5. Shop: Mit Gelato starten (Routing CH/EU automatisch) oder direkt Schweizer Anbieter + EU-Anbieter? Shop zum Start nur CH/LI oder auch EU?
6. Grand-Tour-Poster: Lizenz bei Schweiz Tourismus anfragen oder eigener Name?
7. Bildmaterial: Eigene Fotos vorhanden oder Fotograf/Leukerbad Tourismus (Bildrechte)?
8. Domain-Setup: `alpine-siesta.ch` bereits bei Cloudflare oder anderem Registrar?
