---
name: wohnungs-texte
description: >-
  Schreibt Texte der Ferienwohnung Alpine Siesta auf Deutsch, Englisch,
  Französisch und Italienisch, sinngemäss für Familien, die direkt buchen.
  Nutzen bei Wohnungstext, Übersetzung, Locale, hreflang, Startseite, FAQ,
  Bildtext oder wenn Fakten in den Text sollen.
---

# Texte der Wohnung

Deutsch ist die Quelle. Englisch, Französisch und Italienisch sind eigene Seiten, keine automatische Sprachumleitung.

## Fakten, die gelten

Nicht wieder offen lassen und nicht umformulieren, als wären sie unklar:

- 65 m², 1. OG, Lift, ohne Stufen
- 3 Zimmer mit je 2 Schlafplätzen: Doppelzimmer, Kinderzimmer mit 2 Einzelbetten, Wohnzimmer mit Schlafsofa für 2, plus Babybett zum Ausklappen
- Bad: Wanne, Spiegelschrank, Toilette, Föhn, Waage, frisch renoviert
- Küche frisch renoviert: Induktion, schnellheizender Backofen, Spülmaschine, grosses Becken, Fondue auf Induktion, Raclette, CoffeeB, Mokka-Kanne
- 2 Balkone: einer zum Sitzen mit Gemmiblick, einer mit Elektrogrill. Rauchen nur auf dem Balkon
- Check-in ab 15:00, Check-out bis 11:00. Stubenreine Haustiere ja
- 1 Aussenparkplatz, Gästekarten inklusive
- Wege: Therme 10 Min. zu Fuss, Zentrum oder Sportarena 10, Gemmibahn 5, La Boheme 2, Torrent-Bahn 7 Min. mit dem Bus
- Kurtaxe bei Direktbuchung enthalten, bei Booking.com und Airbnb nicht

Was nicht in dieser Liste steht, bleibt `[TODO]` im sichtbaren Text. Nichts erfinden.

## Sprache

Zielgruppe: Familien (auch mit Grosseltern oder Freunden), die in Leukerbad ankommen und abschalten wollen. Sie buchen lieber direkt, die Therme und die Gemmi sind nah, die Kinder haben ein eigenes Zimmer.

Nicht Satz für Satz übersetzen. Dieselbe Tatsache in der Sprache sagen, in der diese Familie den Text lesen würde. Idiome, Wortstellung und Länge dürfen sich ändern. Fakten, Zahlen und `[TODO]` bleiben.

- Deutsch: Schweizer Rechtschreibung, du, Gastgeber-Stimme. Quelle in `site/`, nicht in `src/i18n`.
- Englisch: warm, direkt, you. «Kurtaxe» heisst visitor’s tax, einmal erklärt. «Gästekarte» heisst guest card, mit dem Nutzen (Rabatt in der Region).
- Französisch (Schweiz): tu. Ort im Fliesstext «Loèche-les-Bains», in Adresse und Name «Leukerbad». «Taxe de séjour», «carte d’hôte».
- Italienisch (Schweiz): tu. «Tassa di soggiorno», «carta ospite». Leukerbad bleibt Leukerbad.
- Nichts dazuerfinden, nichts weglassen, was eine Buchung verändert (Schlafplätze, Zeiten, Kurtaxe, Haustiere, Rauchen, Parkplatz).
- Bildtexte beschreiben das Foto und sagen den Nutzen für diese Familie, nicht eine wörtliche Bildunterschrift.
- Eine URL pro Sprache. Deutsch ohne Präfix, die anderen mit `/en/`, `/fr/`, `/it/`. `hreflang` auf jeder Seite, `x-default` auf Deutsch. Keine Sprachumleitung, kein `/de/`.
- Sichtbare Oberfläche (Navigation, Formular, Galerie, Einwilligung) steht in `src/i18n/ui.ts`, Wohnungstexte in `src/i18n/wohnung.ts`, Startseite in `src/i18n/home.ts`.

## Locale

Keine Weiterleitung nach Browsersprache. Der Sprachwechsel ist ein normaler Link. Deutsch nicht zusätzlich unter `/de/` anbieten.
