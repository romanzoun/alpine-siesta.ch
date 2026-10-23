import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import * as L from './lib/labels';

const wohnungen = defineCollection({
  loader: glob({ pattern: '[^_]*.md', base: './src/content/wohnungen' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      // Sortierung auf Startseite und Übersicht (kleinste zuerst)
      reihenfolge: z.number().int().default(0),
      // IDs aus Beds24 → Properties. Kein Geheimnis, darum hier statt in .env.
      beds24: z.object({ propertyId: z.number().int(), roomId: z.number().int() }).optional(),
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
    }),
});

const seiten = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/seiten' }),
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
  loader: glob({ pattern: '[^_]*/index.md', base: './src/content/aktivitaeten', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(70),
      description: z.string().min(70).max(160),
      kurz: z.string().max(120),
      monate: z.array(z.number().int().min(1).max(12)).min(1),
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
      ort: z.string().default('Leukerbad'),
      bild: image().optional(),
      bild_alt: z.string().optional(),
      galerie: z.array(z.object({ bild: image(), alt: z.string() })).default([]),
      geprueft: z.boolean().default(false),
    }).refine((a) => !a.bild || a.bild_alt, { message: 'bild_alt fehlt: jedes Bild braucht einen Alternativtext', path: ['bild_alt'] }),
});

// Optionaler eigener Text für Themenseiten, Dateiname = <dimension>-<wert>.md (z. B. saison-winter.md)
const themenseiten = defineCollection({
  loader: glob({ pattern: '[^_]*.md', base: './src/content/themenseiten' }),
  schema: z.object({
    title: z.string().max(70).optional(),
    description: z.string().min(70).max(160).optional(),
    h1: z.string().optional(),
    intro: z.string(),
  }),
});

export const collections = { wohnungen, seiten, aktivitaeten, themenseiten };
