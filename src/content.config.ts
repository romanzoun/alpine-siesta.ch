import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import * as L from './lib/labels';
import { entdeckenLoader } from './lib/entdecken-loader';
import { ortszeit, teile } from './lib/zeit';
import { site } from '../site/site.config';

// Alle Inhalte liegen in site/ (pro Website verschieden), siehe site/README.md.
// Ordner/index.md → ID ist der Ordnerpfad ohne «/index.md»
const ordnerId = ({ entry }: { entry: string }) => entry.replace(/\/index\.md$/, '');

const wohnungen = defineCollection({
  loader: glob({ pattern: '[^_]*/index.md', base: './site/wohnungen', generateId: ordnerId }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      // Sortierung auf Startseite und Übersicht (kleinste zuerst)
      reihenfolge: z.number().int().default(0),
      // Kurzname der Wohnung in Trizoun Travel (dort ist sie mit Beds24 verknüpft). Standard: Ordnername.
      trizounSlug: z.string().optional(),
      claim: z.string(),
      beschreibung: z.string(),
      fakten: z.object({
        personen: z.number(),
        schlafzimmer: z.number(),
        betten: z.string(),
        badezimmer: z.number(),
        flaeche_m2: z.number(),
        stockwerk: z.string().optional(),
      }),
      lage: z.object({
        ort: z.string(),
        hoehe_m: z.number(),
        distanzen: z.array(z.object({ ziel: z.string(), minuten: z.number(), wie: z.enum(['zu Fuss', 'Auto', 'Bus']) })),
        parkplatz: z.string(),
      }),
      ausstattung: z.array(z.object({ kategorie: z.string(), items: z.array(z.string()) })),
      hausregeln: z.object({
        checkin: z.string(),
        checkout: z.string(),
        haustiere: z.string(),
        rauchen: z.string(),
        weitere: z.array(z.string()).default([]),
      }),
      galerie: z.array(z.object({ bild: image(), alt: z.string(), raum: z.string().optional() })).min(1),
      // Inserate auf Buchungsplattformen (solange es keine Online-Buchung gibt bzw. zusätzlich)
      plattformen: z.object({ booking: z.url().optional(), airbnb: z.url().optional() }).default({}),
    }),
});

const seiten = defineCollection({
  loader: glob({ pattern: 'startseite.md', base: './site' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      hero: z
        .object({ titel: z.array(z.string()).min(1), untertitel: z.string(), bild: image().optional(), alt: z.string().optional() })
        .optional(),
      highlights: z.array(z.object({ titel: z.string(), text: z.string() })).default([]),
      vorteile: z.array(z.string()).default([]),
      bewertungen: z.array(z.object({ text: z.string(), name: z.string(), quelle: z.string() })).default([]),
      faq: z.array(z.object({ frage: z.string(), antwort: z.string() })).default([]),
    }),
});

const aktivitaeten = defineCollection({
  // Zentraler Katalog (site/katalog/) + eigene Aktivitäten + Anpassungen (site/entdecken.yaml), siehe lib/entdecken-loader.ts
  loader: entdeckenLoader(),
  schema: ({ image }) =>
    z.object({
      typ: z.enum(L.keys(L.typen)).default('aktivitaet'),
      title: z.string().max(70),
      description: z.string().min(70).max(160),
      kurz: z.string().max(120),
      // Bei Events aus den Terminen abgeleitet, wenn nicht angegeben
      monate: z.array(z.number().int().min(1).max(12)).min(1).optional(),
      // Events: ein oder mehrere Termine (Datum oder Datum mit Uhrzeit, Ortszeit)
      termine: z.array(z.object({ beginn: z.union([z.string(), z.date()]).transform(ortszeit), ende: z.union([z.string(), z.date()]).transform(ortszeit).optional() })).default([]),
      veranstaltungsort: z.string().optional(),
      // Woher die Information stammt (Pflicht bei Events und bei KI-gesammelten Einträgen)
      quelle: z.object({ name: z.string(), url: z.url(), abgerufen: z.coerce.date() }).optional(),
      zielgruppen: z.array(z.enum(L.keys(L.zielgruppen))).min(1),
      kategorien: z.array(z.enum(L.keys(L.kategorien))).min(1),
      pillar: z.enum(L.keys(L.pillars)),
      wetter: z.enum(L.keys(L.wetter)),
      dauer: z.enum(L.keys(L.dauer)),
      anstrengung: z.enum(L.keys(L.anstrengung)),
      preis: z.enum(L.keys(L.preis)),
      anreise_min: z.number().int().nonnegative(),
      anreise_wie: z.enum(['zu Fuss', 'Auto', 'Bus', 'Bahn']),
      kinderwagen: z.boolean(),
      hund: z.boolean(),
      geheimtipp: z.boolean().default(false),
      website: z.url().optional(),
      ort: z.string().default(site.ort),
      bild: image().optional(),
      bild_alt: z.string().optional(),
      galerie: z.array(z.object({ bild: image(), alt: z.string() })).default([]),
      geprueft: z.boolean().default(false),
    })
      .refine((a) => !a.bild || a.bild_alt, { message: 'bild_alt fehlt: jedes Bild braucht einen Alternativtext', path: ['bild_alt'] })
      .refine((a) => a.typ !== 'event' || a.termine.length > 0, { message: 'Events brauchen mindestens einen Termin', path: ['termine'] })
      .refine((a) => a.typ !== 'event' || a.quelle, { message: 'Events brauchen eine Quelle (name, url, abgerufen)', path: ['quelle'] })
      .refine((a) => a.typ === 'event' || a.monate, { message: 'Aktivitäten brauchen «monate»', path: ['monate'] })
      .transform((a) => ({ ...a, monate: a.monate ?? [...new Set(a.termine.map((t) => teile(t.beginn).month))].sort((x, y) => x - y) })),
});

// Optionaler eigener Text für Themenseiten, Dateiname = <dimension>-<wert>.md (z. B. saison-winter.md)
const themenseiten = defineCollection({
  loader: glob({ pattern: '[^_]*.md', base: './site/themenseiten' }),
  schema: z.object({
    title: z.string().max(70).optional(),
    description: z.string().min(70).max(160).optional(),
    h1: z.string().optional(),
    intro: z.string(),
  }),
});

// Pillar Pages: site/pillars/<pillar>/index.md
const pillars = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './site/pillars', generateId: ordnerId }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(70),
      description: z.string().min(70).max(160),
      h1: z.string(),
      lead: z.string(),
      aktualisiert: z.coerce.date().optional(),
      bild: image().optional(),
      bild_alt: z.string().optional(),
      faq: z.array(z.object({ frage: z.string(), antwort: z.string() })).default([]),
      entwurf: z.boolean().default(true),
    }).refine((a) => !a.bild || a.bild_alt, { message: 'bild_alt fehlt', path: ['bild_alt'] }),
});

// Unterseiten: site/pillars/<pillar>/<artikel>/index.md
const artikel = defineCollection({
  loader: glob({ pattern: '*/*/index.md', base: './site/pillars', generateId: ordnerId }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(70),
      description: z.string().min(70).max(160),
      h1: z.string(),
      kurz: z.string().max(160),
      reihenfolge: z.number().int().default(0),
      aktualisiert: z.coerce.date().optional(),
      bild: image().optional(),
      bild_alt: z.string().optional(),
      faq: z.array(z.object({ frage: z.string(), antwort: z.string() })).default([]),
      entwurf: z.boolean().default(true),
    }).refine((a) => !a.bild || a.bild_alt, { message: 'bild_alt fehlt', path: ['bild_alt'] }),
});

// Impressum, Datenschutz, AGB: site/rechtliches/<seite>.md → /<seite>/
const rechtliches = defineCollection({
  loader: glob({ pattern: '[^_]*.md', base: './site/rechtliches' }),
  schema: z.object({ title: z.string(), description: z.string(), reihenfolge: z.number().int().default(0) }),
});

export const collections = { wohnungen, seiten, aktivitaeten, themenseiten, pillars, artikel, rechtliches };
