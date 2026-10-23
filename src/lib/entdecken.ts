import type { CollectionEntry } from 'astro:content';
import * as L from './labels';
import { site } from '../config';

type Aktivitaet = CollectionEntry<'aktivitaeten'>;

// Dimensionen mit eigener, indexierbarer Themenseite: /entdecken/<pfad>/<wert>/
export const dimensionen = {
  saison: {
    pfad: 'saison',
    name: 'Saison',
    werte: L.saisons,
    passt: (a: Aktivitaet, w: string) => a.data.monate.some((m) => L.saisonMonate[w as keyof typeof L.saisons].includes(m)),
    h1: { winter: `${site.ort} im Winter`, fruehling: `${site.ort} im Frühling`, sommer: `${site.ort} im Sommer`, herbst: `${site.ort} im Herbst` },
  },
  fuer: {
    pfad: 'fuer',
    name: 'Für wen',
    werte: L.zielgruppen,
    passt: (a: Aktivitaet, w: string) => a.data.zielgruppen.includes(w as never),
    h1: {
      'familie-klein': `${site.ort} mit Kleinkind`,
      'familie-gross': `${site.ort} mit Teenagern`,
      paar: `${site.ort} zu zweit`,
      solo: `${site.ort} allein entdecken`,
      freunde: `${site.ort} mit Freunden`,
      senioren: `${site.ort} für Senioren`,
      sportlich: `Sportliches ${site.ort}`,
    },
  },
  thema: {
    pfad: 'thema',
    name: 'Thema',
    werte: L.kategorien,
    passt: (a: Aktivitaet, w: string) => a.data.kategorien.includes(w as never),
    h1: {
      wellness: `Wellness in ${site.ort}`,
      natur: `Natur erleben in ${site.ort}`,
      sport: `Sport in ${site.ort}`,
      kultur: `Kultur in ${site.ort}`,
      kulinarik: `Essen und Trinken in ${site.ort}`,
      aussicht: `Aussichtspunkte in ${site.ort}`,
    },
  },
} as const;

export type DimensionKey = keyof typeof dimensionen;

export const themenUrl = (d: DimensionKey, wert: string) => `/entdecken/${dimensionen[d].pfad}/${wert}/`;

export const themenH1 = (d: DimensionKey, wert: string) => (dimensionen[d].h1 as Record<string, string>)[wert];

// Themenseiten erst ab so vielen Treffern erzeugen, damit keine dünnen Seiten entstehen.
export const MIN_TREFFER = 1;

export function themenseiten(alle: Aktivitaet[]) {
  return (Object.keys(dimensionen) as DimensionKey[]).flatMap((d) =>
    Object.keys(dimensionen[d].werte)
      .map((wert) => ({ d, wert, treffer: alle.filter((a) => dimensionen[d].passt(a, wert)) }))
      .filter((s) => s.treffer.length >= MIN_TREFFER),
  );
}

// Saisons einer Aktivität, für Links von der Detailseite auf Themenseiten
export const saisonsVon = (a: Aktivitaet) =>
  (Object.keys(L.saisons) as (keyof typeof L.saisons)[]).filter((s) => dimensionen.saison.passt(a, s));

export const sortiert = (alle: Aktivitaet[]) =>
  [...alle].sort((a, b) => Number(b.data.geheimtipp) - Number(a.data.geheimtipp) || a.data.title.localeCompare(b.data.title, 'de'));
