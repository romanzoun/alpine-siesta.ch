import type { Loader } from 'astro/loaders';
import { glob } from 'astro/loaders';
import { loadEnv } from 'vite';
import * as L from './labels';

// Aktivitäten für «Entdecken»: aus dem regionalen Katalog von Trizoun Travel (beim Build),
// sonst aus den Ordnern in site/aktivitaeten/ (z. B. lokal ohne API-Zugang).

const env = { ...loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), 'PUBLIC_'), ...process.env };
export const katalogApi = env.PUBLIC_TRIZOUN_API_URL && env.PUBLIC_TRIZOUN_KEY ? { url: env.PUBLIC_TRIZOUN_API_URL, key: env.PUBLIC_TRIZOUN_KEY } : undefined;

interface KatalogAktivitaet {
  slug: string;
  text: string;
  tipp: string | null;
  anreiseMin: number;
  anreiseWie: string;
  bild?: { url: string; alt: string };
  galerie: { url: string; alt: string }[];
  aktualisiert: string;
  [feld: string]: unknown;
}

// Weicht das Label-Vokabular der API von src/lib/labels.ts ab, wird gewarnt (Build bricht bei unbekannten Werten ohnehin ab).
function labelsVergleichen(api: Record<string, Record<string, string> | readonly string[]>, warnen: (m: string) => void) {
  const lokal: Record<string, Record<string, string>> = { zielgruppen: L.zielgruppen, kategorien: L.kategorien, wetter: L.wetter, dauer: L.dauer, anstrengung: L.anstrengung, preis: L.preis };
  for (const [name, werte] of Object.entries(lokal)) {
    const a = Object.keys((api[name] as Record<string, string>) ?? {}).sort().join(',');
    if (a !== Object.keys(werte).sort().join(',')) warnen(`Labels «${name}» weichen von Trizoun Travel ab – src/lib/labels.ts angleichen.`);
  }
}

export function aktivitaetenLoader(lokal: { base: string; generateId: (o: { entry: string }) => string }): Loader {
  if (!katalogApi) return glob({ pattern: '[^_]*/index.md', ...lokal });
  return {
    name: 'trizoun-entdecken',
    async load({ store, parseData, renderMarkdown, logger, generateDigest }) {
      const res = await fetch(`${katalogApi.url}/v1/public/entdecken`, { headers: { authorization: `Bearer ${katalogApi.key}` } });
      if (!res.ok) throw new Error(`Trizoun Travel: Aktivitäten konnten nicht geladen werden (${res.status}). Build abgebrochen, damit keine leere Entdecken-Seite online geht.`);
      const { data, labels } = (await res.json()) as { data: KatalogAktivitaet[]; labels: Record<string, Record<string, string>> };
      labelsVergleichen(labels, (m) => logger.warn(m));
      store.clear();
      for (const a of data) {
        const { slug, text, tipp, anreiseMin, anreiseWie, bild, galerie, aktualisiert: _a, id: _i, region: _r, ...rest } = a;
        const body = tipp ? `${text}\n\n## Tipp von uns\n\n${tipp}` : text;
        const daten = await parseData({
          id: slug,
          data: {
            ...rest,
            anreise_min: anreiseMin,
            anreise_wie: anreiseWie,
            ...(bild ? { bild: bild.url, bild_alt: bild.alt } : {}),
            galerie: galerie.map((g) => ({ bild: g.url, alt: g.alt })),
          },
        });
        store.set({ id: slug, data: daten, body, rendered: await renderMarkdown(body), digest: generateDigest({ daten, body }) });
      }
      logger.info(`${data.length} Aktivitäten aus Trizoun Travel geladen`);
    },
  };
}
