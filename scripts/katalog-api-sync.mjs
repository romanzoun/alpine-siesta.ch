// Holt den freigegebenen Regionenkatalog über Trizoun Travel für den statischen Astro-Build.
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { createHash, randomUUID } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import YAML from 'yaml';

const segment = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const bildpfad = /^\.\/[a-zA-Z0-9_-]+\.(jpe?g|png|webp)$/;

/** Gleicher Fingerabdruck wie katalogRevision in Trizoun Travel. */
export function katalogRevision(eintraege) {
  const text = [...eintraege].sort((a, b) => a.slug.localeCompare(b.slug)).map((e) => `${e.slug} ${e.inhaltSha256}`).join('\n');
  return createHash('sha256').update(text).digest('hex');
}

export async function katalogVonApi({ apiUrl, key, region, ziel = 'site/katalog', http = fetch }) {
  if (!segment.test(region)) throw new Error('Ungültige Katalogregion');
  const adresse = new URL(apiUrl);
  if (adresse.protocol !== 'https:' && !(adresse.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(adresse.hostname)))
    throw new Error('Trizoun-Katalog-API braucht HTTPS (lokal ist HTTP erlaubt)');
  const basis = `${apiUrl.replace(/\/$/, '')}/v1/public/katalog/${region}`;
  const hole = async (pfad) => {
    const r = await http(`${basis}${pfad}`, { headers: { authorization: `Bearer ${key}` }, signal: AbortSignal.timeout(30_000) });
    if (!r.ok) throw new Error(`Trizoun-Katalog: HTTP ${r.status} bei ${pfad || '/'}`);
    return r;
  };
  // spiegel=1 behält alle Sprachen. Ohne diesen Parameter liefert die API nur eine Sprache.
  const liste = await (await hole('?spiegel=1')).json();
  const data = liste.data;
  const revision = liste.meta?.revision ?? (Array.isArray(data) ? katalogRevision(data) : '');
  const standDatei = join(ziel, 'STAND.md');
  const alteRevision = existsSync(standDatei) ? readFileSync(standDatei, 'utf8').match(/^Revision: ([a-f0-9]{64})$/m)?.[1] : undefined;
  if (revision && alteRevision === revision) return data.length;
  if (!Array.isArray(data)) throw new Error('Trizoun-Katalog: ungültige Liste');
  if (!data.length) throw new Error('Trizoun-Katalog: leere Region; vorhandene Website-Inhalte bleiben erhalten');
  const temp = mkdtempSync(join(tmpdir(), 'trizoun-katalog-api-'));
  const staging = `${ziel}.neu-${randomUUID()}`;
  const backup = `${ziel}.alt-${randomUUID()}`;
  try {
    const slugs = new Set();
    for (const e of data) {
      if (!segment.test(e.slug) || slugs.has(e.slug) || !e.daten || typeof e.markdown !== 'string' || !bildpfad.test(e.daten.bild))
        throw new Error('Trizoun-Katalog: ungültiger Eintrag');
      slugs.add(e.slug);
      const ordner = join(temp, 'aktivitaeten', e.slug);
      mkdirSync(ordner, { recursive: true });
      writeFileSync(join(ordner, 'index.md'), `---\n${YAML.stringify(e.daten)}---\n${e.markdown}`);
      const bilder = [{ pfad: e.daten.bild, url: `/` + e.slug + '/bild' },
        ...(e.daten.galerie ?? []).map((g) => ({ pfad: g.bild, url: `/${e.slug}/bilder/${g.bild?.slice(2)}` }))];
      for (const b of bilder) {
        if (!bildpfad.test(b.pfad)) throw new Error(`Trizoun-Katalog: ungültiger Bildpfad bei ${e.slug}`);
        const antwort = await hole(b.url);
        if (!/^image\/(jpeg|png|webp)/.test(antwort.headers.get('content-type') ?? '')) throw new Error(`Trizoun-Katalog: Bild fehlt bei ${e.slug}`);
        writeFileSync(join(ordner, b.pfad.slice(2)), Buffer.from(await antwort.arrayBuffer()));
      }
    }
    const aktualisiert = liste.meta?.aktualisiert ? `\nAktualisiert: ${liste.meta.aktualisiert}` : '';
    writeFileSync(join(temp, 'STAND.md'), `# Automatisch aus Trizoun Travel geladen\n\nRegion: ${region}\nEinträge: ${data.length}\nRevision: ${revision}${aktualisiert}\n\nAnpassungen für diese Website: site/entdecken.yaml.\n`);
    cpSync(temp, staging, { recursive: true });
    if (existsSync(ziel)) renameSync(ziel, backup);
    try { renameSync(staging, ziel); }
    catch (fehler) {
      if (existsSync(backup)) renameSync(backup, ziel);
      throw fehler;
    }
    rmSync(backup, { recursive: true, force: true });
  } finally {
    rmSync(staging, { recursive: true, force: true });
    rmSync(temp, { recursive: true, force: true });
  }
  return data.length;
}
