---
name: ferienwohnung-galerie
description: >-
  Entwirft die Bildgalerie einer Ferienwohnung. Nutzen, wenn eine Galerie,
  ein Mosaik, eine Lightbox, «alle Fotos» oder die mobile Grossansicht
  gebaut oder geändert wird.
---

# Galerie für eine Ferienwohnung

Fünf Fotos auf der Seite, der Rest in der Grossansicht. Die Buchung bleibt sichtbar.

## Mosaik

Reihenfolge, je das erste Foto dieser Räume: Balkon, Wohnzimmer, Schlafzimmer, Küche, Kinderzimmer.

Die Raumnamen für diese Auswahl bleiben deutsch, auch wenn die Beschriftung auf der Seite übersetzt ist. Sonst bleibt die Vorschau in den anderen Sprachen leer.

- Desktop: ein grosses Bild links, vier kleine rechts. Knopf «Alle N Fotos» öffnet Bild 1.
- Mobil: nur das grosse Bild und derselbe Knopf. Kein langes Raster.

Weihnachts-, Fondue- und Umgebungsfotos (Strasse, Gemmi, Grill) bleiben in der Grossansicht, nicht im Mosaik.

## Grossansicht

- Kein Wechsel auf die nackte Bilddatei. Dialog auf derselben Seite.
- Mobil: volle Breite und Höhe, `max-width: 100%` (sonst lässt der Browser einen Rand). «Schliessen» oben, «Zurück» und «Weiter» unten, immer im Bild. Wischen über das Foto.
- Text des Bildes (`text`, sonst `alt`) und der Raumname stehen unter dem Foto.
- Keine Vorschauliste, die per JavaScript erzeugt wird. Solche Bilder bekommen kein CSS und werden zu grauen Strichen.

## Kopfzeile dazu

Mobil: Logo und «Buchen» bleiben. Die übrigen Links hinter einem Menü aus drei Strichen, nicht drei Punkten.
