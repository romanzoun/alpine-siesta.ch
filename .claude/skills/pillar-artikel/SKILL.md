---
name: pillar-artikel
description: Schreibt SEO-Artikel für den Reiseführer-Bereich (Pillar Pages und Unterseiten unter site/pillars/) aus Briefings, Notizen, Stichworten oder Fotos. Verwenden, wenn der Nutzer eine Pillar Page oder Unterseite schreiben, überarbeiten oder ausbauen will, Stichworte zu einem Thema wie Thermen, Familie, Sommer, Winter, Anreise liefert, oder sagt «Artikel schreiben», «SEO-Seite», «Pillar fertig machen», «Unterseite zu …».
---

# Pillar Pages und Unterseiten schreiben

Struktur (siehe `AGENTS.md`, Abschnitt Pillar Pages):

| Datei | URL | Umfang |
|---|---|---|
| `site/pillars/<pillar>/index.md` | `/<seoPfad>/<pillar>/` | Übersicht, 1500–2500 Wörter |
| `site/pillars/<pillar>/<artikel>/index.md` | `/<seoPfad>/<pillar>/<artikel>/` | Vertiefung, 800–1500 Wörter |

Das Schema (`src/content.config.ts`, Collections `pillars` und `artikel`) ist massgeblich. Unterseiten, passende Aktivitäten, FAQ, Brotkrumen, strukturierte Daten und Buchungsband erzeugt das Layout automatisch – **nicht** im Text wiederholen.

## 1. Vorbereiten

1. Bestehende Datei lesen (Titelvorschlag, Platzhalter), `site/site.config.ts` (Ort, Pillar-Namen) und die Aktivitäten mit `pillar: <pillar>` in `site/aktivitaeten/`.
2. Material des Nutzers vollständig lesen. Fehlt Material für Fakten, nicht raten.
3. Suchintention festlegen und im Kopf behalten: Was will jemand, der z. B. «Leukerbad Therme» sucht, wissen? (Eintritt, Öffnungszeiten, welche Therme, mit Kindern, im Winter …). Der Artikel beantwortet diese Fragen der Reihe nach.

## 2. Frontmatter

- `title` ≤ 60 Zeichen (Seitenname wird nicht angehängt), Hauptbegriff vorne: «Thermen in Leukerbad: Bäder, Preise und Tipps».
- `description` 70–160 Zeichen, ein ganzer Satz mit Nutzen.
- `h1` darf länger und natürlicher sein als `title`.
- `lead` (Pillar) bzw. `kurz` (Unterseite): 1–2 Sätze, Kernaussage.
- `faq`: 3–6 echte Fragen von Gästen, Antworten 1–3 Sätze. Nur beantworten, was belegt ist.
- `aktualisiert`: heutiges Datum.
- `bild`/`bild_alt` nur mit gelieferten Bildern (im Ordner der Datei ablegen).
- `entwurf: true` lassen – live schaltet der Nutzer.

## 3. Text

- Stimme nach dem Skill `engagierte-texte`: natürlich, positiv, konkret. Nach dem Lesen sind die Zweifel weg. Keine Absätze darüber, was die Seite nicht verspricht.
- Deutsch, Schweizer Rechtschreibung (ss statt ß), du-Form, aus Sicht der Gastgeber. Keine Werbefloskeln («atemberaubend», «unvergesslich»).
- Kein H1 im Text. Gliederung mit `##` (und sparsam `###`). Jede Zwischenüberschrift benennt, was an dem Tag geht.
- Erster Absatz: Hauptbegriff natürlich nennen und die wichtigste Antwort sofort geben.
- Fakten, die sich ändern (Preise, Öffnungszeiten, Fahrpläne), nur aus Material des Nutzers. Fehlt die Zahl, fällt der Satz weg. Im Text, den der Gast liest, steht kein `[PRÜFEN]`. Eine Notiz für uns nur als HTML-Kommentar am Dateianfang.
- Konkrete Hinweise aus Gastgeber-Sicht: Weg ab der Wohnung, beste Zeit, Insider-Tipp.
- Kurze Absätze, Listen für Aufzählbares, Tabellen für Vergleiche (z. B. zwei Thermen).
- **Interne Links** nur auf Seiten, die live sind: Aktivitäten (`/entdecken/<slug>/`), Themenseiten (`/entdecken/thema/<wert>/`), Wohnung. Auf Unterseiten im Entwurf **nicht** verlinken – die Pillar Page listet Unterseiten automatisch, sobald sie live sind.
- Am Ende kein eigener Buchungsaufruf (kommt automatisch).

## 4. Prüfen

1. `npm run build:entwuerfe` – muss fehlerfrei laufen.
2. `npm run seo-check` – keine Fehler; Warnungen zu Länge beheben.
3. Bericht an den Nutzer: Suchintention, Gliederung, Fakten die bewusst weggefallen sind, fehlende Bilder.
