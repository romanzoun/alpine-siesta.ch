---
name: text-bild-balance
description: >-
  Setzt Text und Bilder so, dass keine leere Fläche bleibt: der Text läuft
  um das Bild, und ohne Bild nutzt er die ganze Breite. Nutzen bei Pillar,
  Artikel, Reiseführer, Layout, leere Spalte, Bild höher als Text oder
  Text ohne Bild.
---

# Text und Bild im Gleichgewicht

Gilt für Fliesstext mit Bildern, vor allem `.guide .prose` (Pillar und Artikel). Die Galerie der Wohnung ist ein anderes Muster (`ferienwohnung-galerie`).

## Die Fläche

Eine feste zweite Spalte für alle Absätze ist falsch. Sie bleibt leer, wenn ein Abschnitt kein Bild hat, und sie bleibt neben einem hohen Bild leer, wenn nur ein kurzer Absatz daneben steht.

- Der Container ist eine Fläche, kein Zweispalt-Raster.
- Ein Bild floatet rechts, etwa 44 % breit, höchstens 34rem, und räumt sich nach rechts (`clear: right`), damit zwei Bilder nicht nebeneinander quetschen. Das gilt für ein nacktes `img` (Locale-Blöcke), ein `picture` und einen Absatz, der nur ein Bild enthält (Markdown). Eine Sprache bekommt keine eigene Variante.
- Der Text davor und danach läuft neben dem Bild und darunter über die ganze Breite. Dafür steht das Bild im DOM vor dem Absatz, zu dem es gehört (`src/scripts/text-bild.ts`).
- Ist das Bild höher als der Text bis zur nächsten Überschrift, wird es auf diese Texthöhe beschnitten (`object-fit: cover`), damit links unten keine leere Fläche bleibt. Gibt es dort keinen Text, geht das Bild über die ganze Breite.
- Eine Überschrift und eine Tabelle räumen das Bild weg (`clear: both`) und gehen über die ganze Breite.
- Ohne Bild gibt es keine reservierte Bildspalte. Der Absatz ist so breit wie der Container.
- Unter 52rem stacken die Bilder unter dem Text, volle Breite, kein Float.
- Das Titelbild über dem Text bleibt volle Breite und floatet nicht.
- Bewegung bleibt das eine Einblenden der Bilder. `prefers-reduced-motion` schaltet es ab.

## Nicht wieder einbauen

Kein `grid-template-columns` auf `.prose`, das jeden Absatz in Spalte 1 und jedes Bild in Spalte 2 zwingt. Das ist die leere Fläche.
