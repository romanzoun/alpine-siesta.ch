---
name: ux-pruefen
description: Prüft Abläufe, Texte und Entscheidungswege einer Website oder App aus Sicht echter Nutzer (Gast, Vermieter) – Anfrage, Buchung, Registrierung, Onboarding – und liefert priorisierte UX-Befunde mit Fix. Verwenden, wenn der Nutzer «UX testen», «Nutzerfluss», «Conversion», «warum fragt niemand an?», «Onboarding verbessern», «ist das verständlich?», «Formular zu kompliziert», «User Journey» sagt, oder bevor ein neuer Ablauf (Buchung, Anmeldung, Kampagne) live geht.
---

# UX prüfen

Ziel: Nutzer sollen ihr Ziel ohne Nachdenken erreichen. Gemessen wird an Aufgaben, nicht an Seiten. Für Darstellung und Barrierefreiheit gibt es `ui-pruefen` – hier geht es um Verständnis, Reibung und Vertrauen.

## 1. Personas und Aufgaben festlegen

Vorher Kontext lesen: `AGENTS.md`, bei Trizoun `docs/KONZEPT.md`/`docs/VISION.md` und Skill `produkt-kompass` (was ist gewollt, was kommt erst später).

**alpine-siesta.ch – Gast**
- G1 «Passt die Wohnung für uns (2 Erw., 2 Kinder, Juli)?» – Belegung, Ausstattung, Preis-Hinweis, Lage finden.
- G2 «Ich will anfragen/buchen» – Startseite → Anfrage abgeschickt bzw. Plattform-Link. Klicks zählen.
- G3 «Was kann man in Leukerbad machen?» – Reiseführer/Pillar → passende Wohnung.
- G4 Fremdsprachiger Gast (EN/FR/IT) – gleiche Aufgaben, Sprache bleibt durchgehend.

**Trizoun Travel – Vermieter**
- V1 «Was kostet das und lohnt es sich für mich?» – Verkaufsseite, Preise, Rechner.
- V2 «Ich registriere mich» – bis Passkey eingerichtet und erste Wohnung angelegt.
- V3 «Beds24 verbinden und Website-Schlüssel holen» – im Büro.
- V4 Wiederkehrender Vermieter – anmelden, Anfragen ansehen.

Nur Aufgaben testen, die in der aktuellen Phase existieren. Fehlende Features sind keine Befunde, ausser ein Text verspricht sie.

## 2. Aufgaben im Browser durchspielen

Im eingebauten Browser, Mobile (375 px) zuerst – die meisten Gäste kommen per Handy. Pro Aufgabe notieren:
- Schritte/Klicks bis zum Ziel, Stellen mit Zögern («wo klicke ich jetzt?»).
- Was muss der Nutzer wissen, das die Seite nicht sagt?
- Sackgassen: Seiten ohne nächsten Schritt, Fehler ohne Ausweg.

**Formulare nie absenden, ausser lokal mit Testdaten** (localhost, Test-E-Mail aus Seed/Fixtures). Für Anmeldecodes: `docker compose logs api` im trizoun-travel-Ordner. Echte Passkeys/Passwörter nicht eingeben – an der Stelle anhalten und dem Nutzer sagen.

## 3. Heuristiken (pro Aufgabe abhaken)

- **Erster Eindruck (5 Sekunden)**: Ist klar, was das ist, für wen, und was der nächste Schritt ist? Hauptaktion über dem Falz auf Mobile?
- **Vertrauen**: echte Fotos, Gastgeber mit Gesicht/Name, Bewertungen, klare Preise oder Preisspanne, Storno/Bedingungen, Impressum. Direktbuchung muss sich sicherer anfühlen als Booking.com, nicht riskanter.
- **Entscheidungshilfe**: Verfügbarkeit/Preis sichtbar bevor man ein Formular füllt. Vergleich Direkt vs. Plattform (Preisvorteil) ausgesprochen.
- **Formulare**: nur nötige Felder, passende Tastatur (`type=email/tel/date`, `inputmode`), Fehler direkt am Feld und verständlich, Eingaben bleiben bei Fehler erhalten, Erfolgsseite sagt was als Nächstes passiert und wann.
- **Sprache**: Begriffe der Nutzer statt der Technik («Website-Schlüssel» statt «Publishable Key»), eine Aktion heisst überall gleich, du-Form/Schweizer Rechtschreibung (Website), Fremdsprachen vollständig ohne deutsche Reste.
- **Leere und Fehlerzustände**: Leeres Büro lädt zum ersten Schritt ein; API weg → verständliche Meldung statt Endlos-Laden.
- **Orientierung**: Wo bin ich (aktive Navigation, Breadcrumbs), wie komme ich zurück, Sprachwechsel bleibt auf derselben Seite.
- **SEO-Pfad**: Pillar/Artikel führen sichtbar zur Wohnung (interne Links, CTA am Ende), nicht nur zu weiteren Artikeln.

## 4. Ergebnis

Pro Aufgabe ein Kurzbefund: geschafft ja/nein, Schritte, grösste Hürde. Dann eine Tabelle:

| Wirkung | Aufwand | Aufgabe | Befund | Vorschlag (Datei/Ort) |
|---|---|---|---|---|

Sortierung: hohe Wirkung + kleiner Aufwand zuerst («Quick Wins»), dann grosse Hebel, dann Feinschliff. Vorschläge, die die Roadmap berühren (neue Features, Buchung, Payment), mit `produkt-kompass` gegenprüfen und so markieren. Texte als konkrete Neuformulierung liefern, nicht als «Text verbessern».
