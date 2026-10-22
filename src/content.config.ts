import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import * as L from './lib/labels';

const wohnung = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/wohnung' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
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
  loader: glob({ pattern: '[^_]*.md', base: './src/content/aktivitaeten' }),
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
      bild: image().optional(),
      bild_alt: z.string().optional(),
      geprueft: z.boolean().default(false),
    }),
});

export const collections = { wohnung, seiten, aktivitaeten };
