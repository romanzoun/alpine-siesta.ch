import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from '../config';

// Entwürfe sind lokal (npm run dev) sichtbar, im Build nur mit PUBLIC_ENTWUERFE=true.
export const zeigeEntwuerfe = import.meta.env.DEV || import.meta.env.PUBLIC_ENTWUERFE === 'true';

export type PillarKey = keyof typeof site.pillars;
export type Pillar = CollectionEntry<'pillars'>;
export type Artikel = CollectionEntry<'artikel'>;

const sichtbar = (e: { data: { entwurf: boolean } }) => zeigeEntwuerfe || !e.data.entwurf;
const istPillar = (id: string): id is PillarKey => id in site.pillars;

export async function allePillars(): Promise<Pillar[]> {
  const alle = await getCollection('pillars');
  const unbekannt = alle.filter((p) => !istPillar(p.id)).map((p) => p.id);
  if (unbekannt.length) throw new Error(`Ordner in site/pillars/ ohne Eintrag in site.config.ts → pillars: ${unbekannt.join(', ')}`);
  const reihenfolge = Object.keys(site.pillars);
  return alle.filter(sichtbar).sort((a, b) => reihenfolge.indexOf(a.id) - reihenfolge.indexOf(b.id));
}

export async function artikelVon(pillar: string): Promise<Artikel[]> {
  return (await getCollection('artikel', (a) => a.id.startsWith(`${pillar}/`) && sichtbar(a))).sort(
    (a, b) => a.data.reihenfolge - b.data.reihenfolge,
  );
}

export const hubUrl = () => `/${site.seoPfad}/`;
export const pillarUrl = (pillar: string) => `/${site.seoPfad}/${pillar}/`;
export const artikelUrl = (id: string) => `/${site.seoPfad}/${id}/`;
