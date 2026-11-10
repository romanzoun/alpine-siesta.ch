import { site } from '../../config';
import * as L from './labels';
import type { Eintrag } from './typen';

export const dimensionen = {
  saison: {
    pfad: 'saison',
    name: 'Saison',
    werte: L.saisons,
    passt: (a: Eintrag, w: string) => a.monate.some((m) => L.saisonMonate[w as keyof typeof L.saisons].includes(m)),
    h1: {
      winter: `${site.ort} im Winter`,
      fruehling: `${site.ort} im Frühling`,
      sommer: `${site.ort} im Sommer`,
      herbst: `${site.ort} im Herbst`,
    } as Record<string, string>,
  },
  fuer: {
    pfad: 'fuer',
    name: 'Für wen',
    werte: L.zielgruppen,
    passt: (a: Eintrag, w: string) => a.zielgruppen.includes(w),
    h1: {
      'familie-klein': `${site.ort} mit Kleinkind`,
      'familie-gross': `${site.ort} mit Teenagern`,
      paar: `${site.ort} zu zweit`,
      solo: `${site.ort} allein entdecken`,
      freunde: `${site.ort} mit Freunden`,
      senioren: `${site.ort} für Senioren`,
      sportlich: `Sportliches ${site.ort}`,
    } as Record<string, string>,
  },
  thema: {
    pfad: 'thema',
    name: 'Thema',
    werte: L.kategorien,
    passt: (a: Eintrag, w: string) => a.kategorien.includes(w),
    h1: {
      wellness: `Wellness in ${site.ort}`,
      natur: `Natur erleben in ${site.ort}`,
      sport: `Sport in ${site.ort}`,
      kultur: `Kultur in ${site.ort}`,
      kulinarik: `Essen und Trinken in ${site.ort}`,
      aussicht: `Aussichtspunkte in ${site.ort}`,
      musik: `Konzerte und Musik in ${site.ort}`,
      feste: `Feste und Märkte in ${site.ort}`,
    } as Record<string, string>,
  },
} as const;

export type DimensionKey = keyof typeof dimensionen;

export const themenUrl = (d: DimensionKey, wert: string) => `/entdecken/${dimensionen[d].pfad}/${wert}/`;
export const themenH1 = (d: DimensionKey, wert: string) => dimensionen[d].h1[wert] ?? wert;

export const MIN_TREFFER = 1;

export function themenseiten(alle: Eintrag[]) {
  return (Object.keys(dimensionen) as DimensionKey[]).flatMap((d) =>
    Object.keys(dimensionen[d].werte)
      .map((wert) => ({ d, wert, treffer: alle.filter((a) => dimensionen[d].passt(a, wert)) }))
      .filter((s) => s.treffer.length >= MIN_TREFFER),
  );
}

export const saisonsVon = (a: Eintrag) =>
  (Object.keys(L.saisons) as (keyof typeof L.saisons)[]).filter((s) => dimensionen.saison.passt(a, s));

export function pfadZuDimension(pfad: string): DimensionKey | null {
  return (Object.keys(dimensionen) as DimensionKey[]).find((d) => dimensionen[d].pfad === pfad) ?? null;
}
