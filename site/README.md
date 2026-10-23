# site/ – alles, was zu dieser Website gehört

Der Code in `src/` ist für alle Websites gleich. Hier liegen nur Inhalte und Einstellungen von **Alpine Siesta**. Für eine neue Website wird dieser Ordner ersetzt.

**Was fehlt noch?** → `npm run checkliste`

## Übersicht

```
site/
├── site.config.ts            Name, Domain, Ort, E-Mail, Buchungslink, Pillar-Themen, Menü
├── startseite.md             Hero-Text, «Warum …», Vorteile, Bewertungen, FAQ
├── bilder/
│   ├── hero.jpg              Hero-Foto Startseite (optional, sonst Illustration)
│   └── og.jpg                Vorschaubild für Social Media (geplant)
├── wohnungen/
│   └── alpine-siesta/        eine Wohnung = ein Ordner → /wohnungen/alpine-siesta/
│       ├── index.md          Fakten, Ausstattung, Lage, Hausregeln, Beds24-IDs, Text
│       ├── wohnzimmer.jpg    erstes Galeriebild = grosses Bild + Startseite
│       ├── kueche.jpg
│       ├── schlafzimmer-1.jpg
│       ├── schlafzimmer-2.jpg
│       ├── bad.jpg
│       └── balkon.jpg
├── pillars/                  SEO-Bereich → /leukerbad/…
│   └── thermen/
│       ├── index.md          Pillar Page /leukerbad/thermen/
│       └── therme-guide/
│           ├── index.md      Unterseite /leukerbad/thermen/therme-guide/
│           └── titel.jpg     Bilder der Unterseite
├── aktivitaeten/             «Entdecken» → /entdecken/<ordner>/  (Import: inbox/ + Skill)
│   └── gemmipass-daubensee/
│       ├── index.md
│       └── titel.jpg
├── themenseiten/             optionale Texte für /entdecken/saison/winter/ usw. (saison-winter.md)
├── rechtliches/              impressum.md, datenschutz.md, agb.md → /impressum/ usw.
└── public/                   favicon.svg, robots.txt – wird 1:1 ausgeliefert
```

## Bilder

| Platz | Datei | Format | Mindestgrösse |
|---|---|---|---|
| Hero Startseite | `bilder/hero.jpg` | Querformat, Motiv unten mittig (Text liegt links unten) | 2400 × 1350 px |
| Wohnung | `wohnungen/<wohnung>/*.jpg` | Querformat 3:2 | 1600 × 1067 px |
| Pillar / Unterseite | `pillars/<pillar>/[<artikel>/]titel.jpg` | Querformat | 2000 px breit |
| Aktivität | `aktivitaeten/<aktivität>/titel.jpg`, `galerie-1.jpg` … | Querformat 3:2 | 1600 px breit |

- **Platzhalter ersetzen:** eigenes Foto mit genau dem gleichen Dateinamen darüberkopieren – fertig.
- Originale in voller Auflösung ablegen; beim Build werden sie automatisch verkleinert und als WebP ausgeliefert.
- Jedes Bild braucht einen Alt-Text (beschreibt, was zu sehen ist) – der Build bricht sonst ab.

## Entwürfe

Pillar Pages und Unterseiten haben `entwurf: true`, bis sie fertig sind:

- `npm run dev` zeigt Entwürfe (mit Hinweis «Entwurf – nicht öffentlich»)
- `npm run build` lässt sie weg
- `npm run build:entwuerfe` baut sie zur Kontrolle trotzdem

Der Menüpunkt «Leukerbad» erscheint, sobald die erste Pillar Page live ist.
