# Verbesserungsplan UI/UX – alpine-siesta.ch und Trizoun Travel

Stand 28.10.2026. Getestet lokal (Docker: Website :4321, Dashboard :5173) mit den Skills `ui-pruefen` und `ux-pruefen`, Mobile 375 px und Desktop, hell und dunkel. Nicht getestet: Büro (`/wohnungen`, `/personen`, `/zugang`), weil es Passkey-Login braucht.

Was gut ist und so bleiben soll: Kein horizontales Scrollen, keine Konsolenfehler auf der Website, ein `h1` pro Seite, `lang` pro Sprache korrekt, alle Bilder mit `alt` und lazy geladen, Schrift selbst gehostet (Archivo), Sprachwechsel bleibt auf derselben Seite, Wohnungsseite mit sehr gutem, konkretem Text. Trizoun-Rechner ist eine starke Idee.

---

## alpine-siesta.ch

### Sofort (vor dem Bewerben der Website)

| # | Befund | Fix |
|---|---|---|
| A1 | **7× `[TODO]` sichtbar** auf der Startseite, in allen Sprachen: «Ruhe statt Rummel», «Ideal für Familien», «Flexible Stornierung», beide Gäste-Zitate. Zerstört Vertrauen sofort. | Echte Texte und 2–3 echte Bewertungen (Airbnb/Booking) in `site/` eintragen. Solange nicht vorhanden: Block per Config ausblenden. `npm run checkliste` als Build-Gate für `[TODO]` im Produktions-Build. |
| A2 | **Anfrageformular ist `mailto:`**. Auf Handys ohne eingerichtete Mail-App passiert nach «Anfrage senden» nichts – Sackgasse bei der wichtigsten Aktion. Die Wohnungsseite lädt bereits `/v1/public/listings/alpine-siesta` von Trizoun. | Formular an `POST /v1/public/listings/:slug/anfragen` bzw. `/kontakt` anschliessen (Endpunkte existieren), `mailto` nur als Fallback ohne `PUBLIC_TRIZOUN_KEY`. Erfolgsseite: «Danke, wir antworten bis morgen Abend.» |
| A3 | **Hero ohne Foto der Wohnung.** Desktop 800×600: nur die Illustration, Titel unter dem Falz. Das erste echte Bild kommt nach ~1,5 Bildschirmhöhen. | Balkonfoto mit Gemmiwand (`alpine-siesta-balkon-gemmiwand-leukerbad`) in oder direkt unter den Hero; Titel und «Verfügbarkeit & Preise» auf jedem Viewport über dem Falz. Dampf-Animation bleibt der Höhepunkt. |
| A4 | **Mobiles Menü**: Panel hat keinen deckenden Hintergrund bis unten, Seiteninhalt scheint unter «DE EN FR IT» durch. **Esc schliesst das Menü nicht** (`aria-expanded` bleibt `true`). | Panel volle Höhe mit `background: var(--nacht)`, Esc-Handler und Fokus zurück auf den Menüknopf (`src/layouts/Base.astro`). |

### Danach (Conversion)

| # | Befund | Fix |
|---|---|---|
| A5 | Kein Preis-Hinweis irgendwo. «Verfügbarkeit & Preise» führt zu einem Formular ohne Preis – Gäste vergleichen mit Booking und springen ab. | «ab CHF … / Nacht, Mindestaufenthalt …» in Fakten und Buchungsband (`site/wohnungen/alpine-siesta/`). Später Live-Preis über Trizoun. |
| A6 | Formular: Gäste-Auswahl ohne Kinder/Baby, Nachricht ist Pflicht. | Erwachsene + Kinder (Babybett ist ein Verkaufsargument), Nachricht optional. |
| A7 | Direktbuchungs-Vorteil nur behauptet («Bestpreis»). | Konkrete Ersparnis nennen (z. B. «ca. 15 % günstiger, Kurtaxe inklusive») – die Kurtaxe-Info steht schon im Formular, gehört in den Block «Direkt buchen lohnt sich». |
| A8 | Reiseführer `/leukerbad/` hat `h1` «Leukerbad mit Kindern», enthält aber auch Zermatt und Wein. **Kein einziger Link zur Wohnung** auf der Seite. | `h1`/Title zu «Reiseführer Leukerbad und Wallis»; am Ende jeder Pillar- und Artikelseite ein Wohnungs-Band (`BuchungsBand.astro` existiert bereits). |
| A9 | 404 ist nur «Seite nicht gefunden – Zur Startseite». | Links auf Wohnung, Reiseführer, Kontakt. |
| A10 | Mobile: Footer-Links (E-Mail, Impressum, Datenschutz, AGB) unter 44 px Tippfläche. | Zeilenhöhe/Padding im Footer erhöhen. |

### Prüfen

- Abschnitt «Design» in `AGENTS.md` nennt Dampf `#F5F8F7` als Hintergrund; im Dark Mode ist die ganze Seite Nacht. Bewusst? Dann in `AGENTS.md` dokumentieren.
- «Die Wohnung» auf der Startseite: das Bild-Raster blendet per Scroll ein und lässt dabei grosse Leerflächen (`src/scripts/text-bild.ts`). Laut Designsystem ist der Hero die einzige Bewegung ohne Aktion.

---

## Trizoun Travel (Verkaufsseiten und Anmeldung, `apps/dashboard`)

### Sofort

| # | Befund | Fix |
|---|---|---|
| T1 | **Unbekannte URL leitet auf `/anmelden`** statt 404 (`/gibtsnicht` → Anmelden). Verwirrt Besucher und Suchmaschinen. | Echte 404-Seite im Router (`main.ts`), Weiterleitung auf Anmelden nur für Büro-Pfade (`istBuero`). |
| T2 | **Technik-Jargon in Verkaufstexten**: «konto+mandant+wohnung», «AI EO», «Mandant», «Gebiet, in dem der Mandant aktiv ist». | In `auftritt-texte.ts`/`i18n.ts` z. B.: «Antworten der Gäste landen in deinem Postfach, sortiert nach Wohnung.» – «gefunden auf Google und in ChatGPT». |
| T3 | **Rechner rechnet zu schön**: Miete minus Hypothekarzins = «Es bleiben CHF 14'200». Fehlen: Plattformgebühren, Reinigung, Nebenkosten, Unterhalt (~1 %), Amortisation, Steuern. Wer kauft und darauf vertraut, verliert Vertrauen in Trizoun. | Mindestens Unterhalt, Nebenkosten und Gebühren als vorbelegte, änderbare Felder; Ergebnis als Spanne. Tausendertrennzeichen in den Feldern (`inputmode="numeric"` statt `type=number`). |
| T4 | **Hero-Versprechen** «Wir machen dich mit deiner Ferienwohnung reich.» plus unbelegte «40 % ohne Booking». Für Vermieter, die einer Firma ihre Buchungen anvertrauen, eher unseriös (UWG-Risiko bei Werbeaussagen). | Konkret statt gross: «Deine eigene Website, die Direktbuchungen bringt. 100 Franken im Monat.» 40 % mit Zeitraum und Quelle belegen («Alpine Siesta, Saison 2026»). |
| T5 | **Seitentitel**: Start, Registrieren, Anmelden heissen nur «Trizoun». Verkaufsseiten sind eine reine SPA – Google sieht wenig. | Titel und Description pro Route; mittelfristig Verkaufsseiten als statische Seiten (Astro wie alpine-siesta) und das Dashboard nur fürs Büro. |
| T6 | **Google Fonts** von `fonts.googleapis.com` (Newsreader, Source Sans 3) – Datenschutzthema in CH/EU, für ein Datenschutz-bewusstes SaaS unpassend. | Schriften selbst hosten (`@fontsource`), wie auf alpine-siesta. |

### Danach

| # | Befund | Fix |
|---|---|---|
| T7 | Registrieren beginnt mit einer Sicherheitswarnung zum Postfach, vor dem ersten Feld. Wirkt abschreckend. | Hinweis nach «Code senden» bzw. beim Passkey-Schritt zeigen. Felder Name/E-Mail mit `autocomplete="name"`/`"email"`; Telefon-Feld hat kein zugeordnetes `label`. |
| T8 | Registrieren fragt «Region» und «Gemeinden» ab, bevor der Nutzer überhaupt weiss, was er bekommt. | Auf Name + E-Mail reduzieren, Region/Gemeinden im Onboarding nach der Anmeldung. |
| T9 | `/preise`: kein nächster Schritt (kein Knopf «Schreib uns»/«Registrieren»), «Anteil» ohne Zahl, Überschrift halb unter der sticky Leiste. | CTA am Ende jeder Verkaufsseite; Prozentsatz oder «auf Anfrage»; `scroll-margin-top` / Abstand oben. |
| T10 | Mobile: Navigation (Produkt, Preise, …) nur 27 px hoch; Sprachknopf «Deutsch» nimmt Platz neben «Anmelden». | Tippflächen ≥ 44 px; Sprache als Kürzel «DE». |
| T11 | Hero-Titel startet mit `opacity: 0` (`.versprechen`, `animation: satz`). Im Test-Browser blieb er unsichtbar, solange die Animation nicht lief. Verzögert auch das LCP. | Nur `transform` animieren, Titel nie unsichtbar machen. |
| T12 | `401` auf `/v1/auth/me` bei jedem Besuch der Verkaufsseite als Konsolenfehler. | Auf öffentlichen Seiten nicht abfragen oder `204`/`{user:null}` zurückgeben. |

### Noch zu testen

- Büro-Ablauf V2–V4 (Registrieren → Passkey → erste Wohnung → Beds24 → Website-Schlüssel) mit Testkonto über `docker compose logs api`. Erwartete Schwerpunkte: leere Zustände, Fehlermeldungen bei Beds24, Begriffe «Publishable/Secret Key».

---

## Reihenfolge

1. **Woche 1 – Vertrauen und Sackgassen**: A1, A2, A4, T1, T2, T4. Erledigt am 28.10.2026 (nicht committet):
   - A1: Einträge mit `[TODO]` sind im Build ausgeblendet, in `npm run dev` sichtbar (`src/pages/index.astro`). Offen: echte Texte und Bewertungen eintragen.
   - A2: Korrektur zum Befund – die Wohnungsseite sendet bereits an Trizoun, wenn die E-Mail-Buchung aktiv ist. Neu prüft jedes Formular selbst (auch `/kontakt/`) und nutzt `trizounSlug` (`src/components/Anfrage.astro`).
   - A4: Esc, Klick daneben, Fokus zurück, saubere Sprachzeile (`src/layouts/Base.astro`).
   - T1: Unbekannte Pfade zeigen «Diese Seite gibt es nicht», nur Büro-Pfade leiten zur Anmeldung.
   - T2/T4: Hero «Mehr Direktbuchungen für deine Ferienwohnung.», Jargon in allen vier Sprachen ersetzt. Offen: 40 % mit Zeitraum belegen; «Mandant» im Büro.
2. **Woche 2 – Conversion**: A3, A5, A6, A8, T3, T9. Erledigt am 28.10.2026 (nicht committet):
   - A3: Balkonfoto mit Gemmiwand im Hero (`site/startseite.md`), Alt-Text pro Sprache, Titelgrösse nach Bildschirmhöhe, stärkerer Verlauf für Lesbarkeit.
   - A5: Neues Feld `fakten.preis_ab_chf` (erscheint bei den Fakten als «ab … Franken pro Nacht»), Punkt in `npm run checkliste`. Offen: Betrag in `site/wohnungen/alpine-siesta/index.md` eintragen.
   - A6: Erwachsene und Kinder statt «Gäste», Nachricht optional. API `/kontakt` nimmt `kinder` und eine leere Nachricht an (mit Test). API vor der Website ausrollen, sonst lehnt die alte API Anfragen ohne Nachricht ab (die Website fällt dann auf die Mail-App zurück).
   - A8: Übersicht heisst «Leukerbad und das Wallis» und hat das Wohnungs-Band. Pillar- und Artikelseiten hatten es schon (Befund war zu breit).
   - T3: Rechner rechnet mit Zins, Gebühren und Reinigung (20 %), Nebenkosten und Unterhalt (11'500), Amortisation der 2. Hypothek und Trizoun (1'200); Aufstellung unter dem Ergebnis, Felder mit Tausendertrennzeichen. Mit den Leukerbad-Ansätzen fehlen jetzt CHF 6'873 im Jahr – Ansätze prüfen.
   - T9: «Schreib uns» am Ende von `/preise`; nach jedem Klick beginnt die neue Seite oben; Abstand unter der Kopfleiste. Zusätzlich: Hero-Titel passt auf 320 px.
3. **Woche 3 – Technik und SEO**: T5, T6, T11, T12, A9, A10, T10. Erledigt am 28.10.2026 (nicht committet):
   - T5: Startseite «Trizoun: Website und Direktbuchung für Ferienwohnungen» (4 Sprachen), Anmelde-Seiten mit eigenem Titel; Anmeldung, Büro und «nicht gefunden» mit `noindex`. Offen: statische Verkaufsseiten (Punkt 4).
   - T6: Newsreader und Source Sans 3 über `@fontsource-variable`, keine Anfrage an Google mehr.
   - T11: Hero-Titel bewegt sich nur noch, Deckkraft bleibt 1.
   - T12: Verkaufsseiten fragen `/v1/auth/me` nur, wenn dieser Browser schon angemeldet war (Hinweis in `localStorage`, die API prüft weiterhin jede Sitzung).
   - T10: Navigation, Fusszeile, Sprachknopf und «Anmelden» mindestens 44 px; Sprachknopf zeigt «DE» mit vollem Namen für Screenreader.
   - A9: 404 mit Wegen zu Wohnung, Reiseführer, Kontakt und Startseite, `noindex`, Name aus `site` statt fest «Alpine Siesta».
   - A10: Links in der Fusszeile 47 px hoch.
4. **Danach**: Büro mit `ux-pruefen` durchspielen; Verkaufsseiten als statische Seiten (vorher mit `produkt-kompass` prüfen).

Nach jedem Schritt dieselben Messungen mit `ui-pruefen` wiederholen.
