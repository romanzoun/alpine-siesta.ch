import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Loader } from 'astro/loaders';
import { parse } from 'yaml';
import { z } from 'astro/zod';

// Aktivitäten für «Entdecken» aus zwei Quellen:
//   site/katalog/aktivitaeten/  – zentraler Katalog der Region (per Sync gespiegelt, nie von Hand ändern)
//   site/aktivitaeten/          – eigene Aktivitäten dieser Website (gleicher Ordnername ersetzt die Katalog-Version)
// Danach werden die Anpassungen aus site/entdecken.yaml angewendet (ausblenden, Tipp, Anreise, Geheimtipp).

const QUELLEN = ['site/katalog/aktivitaeten', 'site/aktivitaeten'];
const ANPASSUNGEN = 'site/entdecken.yaml';

const anpassungSchema = z
  .object({
    ausblenden: z.array(z.string()).nullish().transform((v) => v ?? []),
    anpassungen: z
      .record(
        z.string(),
        z.object({
          tipp: z.string().optional(),
          anreise_min: z.number().int().nonnegative().optional(),
          anreise_wie: z.enum(['zu Fuss', 'Auto', 'Bus', 'Bahn']).optional(),
          geheimtipp: z.boolean().optional(),
        }),
      )
      .nullish()
      .transform((v) => v ?? {}),
  })
  .strict();

function frontmatter(roh: string, datei: string) {
  const m = roh.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(`${datei}: Frontmatter fehlt`);
  return { daten: (parse(m[1]!) ?? {}) as Record<string, unknown>, text: m[2]!.trim() };
}

export function entdeckenLoader(): Loader {
  return {
    name: 'entdecken',
    async load({ store, parseData, renderMarkdown, generateDigest, logger, watcher }) {
      const anpassung = existsSync(ANPASSUNGEN) ? anpassungSchema.safeParse(parse(readFileSync(ANPASSUNGEN, 'utf8')) ?? {}) : anpassungSchema.safeParse({});
      if (!anpassung.success) throw new Error(`${ANPASSUNGEN}: ${anpassung.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')}`);
      const { ausblenden, anpassungen } = anpassung.data;

      // Ordner sammeln; eigene Aktivitäten überschreiben gleichnamige aus dem Katalog
      const ordner = new Map<string, string>();
      for (const basis of QUELLEN) {
        if (!existsSync(basis)) continue;
        for (const e of readdirSync(basis, { withFileTypes: true })) {
          if (e.isDirectory() && !e.name.startsWith('_') && existsSync(join(basis, e.name, 'index.md'))) ordner.set(e.name, join(basis, e.name, 'index.md'));
        }
      }
      for (const slug of [...ausblenden, ...Object.keys(anpassungen)]) {
        if (!ordner.has(slug)) logger.warn(`${ANPASSUNGEN}: «${slug}» gibt es weder im Katalog noch in site/aktivitaeten/`);
      }

      store.clear();
      let vorbei = 0;
      for (const [slug, datei] of ordner) {
        if (ausblenden.includes(slug)) continue;
        const { daten, text } = frontmatter(readFileSync(datei, 'utf8'), datei);
        const a = anpassungen[slug] ?? {};
        const body = a.tipp ? `${text}\n\n## Tipp von uns\n\n${a.tipp.trim()}` : text;
        const { tipp: _t, ...felder } = a;
        const data = await parseData({ id: slug, data: { ...daten, ...felder }, filePath: datei });
        // Vergangene Events nicht mehr veröffentlichen (täglicher Sync/Build räumt auf)
        const geprueft = data as { typ?: string; termine?: { beginn: Date; ende?: Date }[] };
        const termine = geprueft.termine ?? [];
        if (geprueft.typ === 'event' && termine.every((t) => (t.ende ?? t.beginn).getTime() < Date.now() - 86_400_000)) {
          vorbei++;
          continue;
        }
        store.set({ id: slug, data, body, filePath: datei, rendered: await renderMarkdown(body), digest: generateDigest({ data, body }) });
      }
      logger.info(`${store.keys().length} Einträge (Katalog + eigene, ${ausblenden.length} ausgeblendet, ${vorbei} vergangene Events)`);

      // Im Dev-Server neu laden, wenn sich Dateien ändern
      watcher?.add([...QUELLEN, ANPASSUNGEN]);
      watcher?.on('all', async (_e, pfad) => {
        if (QUELLEN.some((q) => pfad.includes(q)) || pfad.endsWith(ANPASSUNGEN)) await this.load({ store, parseData, renderMarkdown, generateDigest, logger, watcher } as never);
      });
    },
  };
}
