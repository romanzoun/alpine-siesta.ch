import { site } from '../../config';
import { anwendenAnpassung, ladeAnpassungen } from './anpassungen';
import { nochOffen } from './filter';
import { normalisieren } from './normalisieren';
import type { Eintrag } from './typen';

const CACHE_MS = 5 * 60_000;

type CacheEintrag = { bis: number; daten: Eintrag[] };

const listenCache = new Map<string, CacheEintrag>();

export class KatalogFehler extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

function zugang() {
  // Runtime zuerst (Docker/Compose), dann Build-Zeit PUBLIC_ (Vite inlined).
  const apiUrl = (
    process.env.TRIZOUN_API_URL ||
    process.env.PUBLIC_TRIZOUN_API_URL ||
    (import.meta.env.PUBLIC_TRIZOUN_API_URL as string | undefined) ||
    ''
  ).replace(/\/$/, '');
  const key =
    process.env.TRIZOUN_KEY ||
    process.env.PUBLIC_TRIZOUN_KEY ||
    (import.meta.env.PUBLIC_TRIZOUN_KEY as string | undefined) ||
    '';
  if (!apiUrl || !key) throw new KatalogFehler('Trizoun API nicht konfiguriert', 503);
  return { apiUrl, key };
}

async function hole(pfad: string, sprache = 'de'): Promise<Response> {
  const { apiUrl, key } = zugang();
  const trenner = pfad.includes('?') ? '&' : '?';
  const r = await fetch(`${apiUrl}/v1/public/katalog/${pfad}${trenner}sprache=${sprache}`, {
    headers: { authorization: `Bearer ${key}`, accept: 'application/json, image/*' },
    signal: AbortSignal.timeout(30_000),
  });
  if (r.status === 401) throw new KatalogFehler('Trizoun-Key ungültig oder Origin fehlt', 401);
  if (r.status === 403) throw new KatalogFehler('Discovery-Modul nicht freigeschaltet', 403);
  if (r.status === 404) throw new KatalogFehler('Nicht gefunden', 404);
  if (!r.ok) throw new KatalogFehler(`Trizoun-Katalog HTTP ${r.status}`, r.status);
  return r;
}

function region(): string {
  return site.katalog.region;
}

function nachBearbeitung(liste: Eintrag[]): Eintrag[] {
  const { ausblenden, anpassungen } = ladeAnpassungen();
  return liste
    .filter((e) => !ausblenden.includes(e.slug) && nochOffen(e))
    .map((e) => anwendenAnpassung(e, anpassungen[e.slug]))
    .sort((a, b) => {
      if (a.geheimtipp !== b.geheimtipp) return Number(b.geheimtipp) - Number(a.geheimtipp);
      const ta = a.typ === 'event' && a.termine[0] ? a.termine[0].beginn : '9999';
      const tb = b.typ === 'event' && b.termine[0] ? b.termine[0].beginn : '9999';
      return ta.localeCompare(tb) || a.title.localeCompare(b.title, 'de');
    });
}

/** Region einmal laden (Metadaten, ohne Markdown). Kurzer Server-Cache. */
export async function fetchRegion(sprache = 'de', force = false): Promise<Eintrag[]> {
  const r = region();
  const schluessel = `${r}:${sprache}`;
  const jetzt = Date.now();
  const cached = listenCache.get(schluessel);
  if (!force && cached && cached.bis > jetzt) return cached.daten;

  const antwort = await hole(r, sprache);
  const json = (await antwort.json()) as { data?: unknown };
  if (!Array.isArray(json.data)) throw new KatalogFehler('Ungültige Katalog-Liste', 502);

  const roh = json.data
    .map((z) => normalisieren(z as { slug?: unknown; daten?: unknown }, false, sprache))
    .filter((e): e is Eintrag => e != null);

  const daten = nachBearbeitung(roh);
  listenCache.set(schluessel, { bis: jetzt + CACHE_MS, daten });
  return daten;
}

/** Einzelner Eintrag inkl. Markdown. */
export async function fetchEintrag(slug: string, sprache = 'de'): Promise<Eintrag> {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new KatalogFehler('Ungültiger Slug', 404);
  const { ausblenden, anpassungen } = ladeAnpassungen();
  if (ausblenden.includes(slug)) throw new KatalogFehler('Ausgeblendet', 404);

  const antwort = await hole(`${region()}/${slug}`, sprache);
  const json = (await antwort.json()) as { data?: { slug?: unknown; daten?: unknown; markdown?: unknown } };
  const eintrag = normalisieren(json.data ?? {}, true, sprache);
  if (!eintrag || !nochOffen(eintrag)) throw new KatalogFehler('Nicht gefunden', 404);
  return anwendenAnpassung(eintrag, anpassungen[slug]);
}

/** Bildbytes von Travel proxien (Titelbild oder Galerie). */
export async function fetchBild(slug: string, dateiname?: string): Promise<{ body: ArrayBuffer; mime: string }> {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new KatalogFehler('Ungültiger Slug', 404);
  const { ausblenden } = ladeAnpassungen();
  if (ausblenden.includes(slug)) throw new KatalogFehler('Ausgeblendet', 404);

  let pfad = `${region()}/${slug}/bild`;
  if (dateiname) {
    if (!/^[a-zA-Z0-9_-]+\.(jpe?g|png|webp)$/.test(dateiname)) throw new KatalogFehler('Ungültiger Bildname', 422);
    pfad = `${region()}/${slug}/bilder/${dateiname}`;
  }
  const antwort = await hole(pfad);
  const mime = antwort.headers.get('content-type') ?? 'application/octet-stream';
  return { body: await antwort.arrayBuffer(), mime };
}

export function bildUrl(slug: string, dateiname?: string) {
  return dateiname ? `/entdecken/bilder/${slug}/${dateiname}/` : `/entdecken/bild/${slug}/`;
}
