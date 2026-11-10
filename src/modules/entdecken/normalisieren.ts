import { site } from '../../config';
import type { BildQuelle, Eintrag, GalerieBild, Quelle, Termin } from './typen';

const strings = (wert: unknown) => (Array.isArray(wert) ? wert.filter((v): v is string => typeof v === 'string') : []);
const zahlen = (wert: unknown) => (Array.isArray(wert) ? wert.filter((v): v is number => typeof v === 'number' && Number.isInteger(v)) : []);

function quelle(daten: Record<string, unknown>): Quelle | null {
  const q = daten.quelle;
  if (!q || typeof q !== 'object') return null;
  const o = q as { name?: unknown; url?: unknown; abgerufen?: unknown };
  if (typeof o.name !== 'string' || typeof o.url !== 'string') return null;
  return {
    name: o.name,
    url: o.url,
    abgerufen: typeof o.abgerufen === 'string' ? o.abgerufen : null,
  };
}

function bildQuelle(roh: unknown): BildQuelle | null {
  if (!roh || typeof roh !== 'object') return null;
  const o = roh as Record<string, unknown>;
  if (typeof o.name !== 'string' || typeof o.url !== 'string') return null;
  return {
    name: o.name,
    url: o.url,
    urheber: typeof o.urheber === 'string' ? o.urheber : undefined,
    lizenz: typeof o.lizenz === 'string' ? o.lizenz : undefined,
    lizenz_url: typeof o.lizenz_url === 'string' ? o.lizenz_url : undefined,
  };
}

function termine(daten: Record<string, unknown>): Termin[] {
  if (!Array.isArray(daten.termine)) return [];
  return daten.termine
    .map((t) => {
      if (!t || typeof t !== 'object') return null;
      const o = t as { beginn?: unknown; ende?: unknown };
      if (typeof o.beginn !== 'string') return null;
      return { beginn: o.beginn, ende: typeof o.ende === 'string' ? o.ende : undefined };
    })
    .filter((t): t is Termin => t != null);
}

function galerie(daten: Record<string, unknown>): GalerieBild[] {
  if (!Array.isArray(daten.galerie)) return [];
  return daten.galerie
    .map((g) => {
      if (!g || typeof g !== 'object') return null;
      const o = g as { bild?: unknown; alt?: unknown; quelle?: unknown };
      if (typeof o.bild !== 'string' || typeof o.alt !== 'string') return null;
      const dateiname = o.bild.replace(/^\.\//, '');
      if (!/^[a-zA-Z0-9_-]+\.(jpe?g|png|webp)$/.test(dateiname)) return null;
      const q = bildQuelle(o.quelle);
      if (!q) return null;
      return { dateiname, alt: o.alt, quelle: q };
    })
    .filter((g): g is GalerieBild => g != null);
}

function monateAus(daten: Record<string, unknown>, liste: Termin[]): number[] {
  const direkt = zahlen(daten.monate);
  if (direkt.length) return direkt;
  const ausTerminen = [...new Set(liste.map((t) => Number(t.beginn.slice(5, 7))).filter((m) => m >= 1 && m <= 12))];
  return ausTerminen.sort((a, b) => a - b);
}

/** Wählt title, kurz, description und Markdown der gewünschten Sprache. Ohne Übersetzung bleibt Deutsch. */
export function spracheAnwenden(daten: Record<string, unknown>, markdown: unknown, sprache: string) {
  if (sprache === 'de' || !daten.sprachen || typeof daten.sprachen !== 'object') return { daten, markdown };
  const block = (daten.sprachen as Record<string, unknown>)[sprache];
  if (!block || typeof block !== 'object') return { daten, markdown };
  const b = block as { title?: unknown; description?: unknown; kurz?: unknown; text?: unknown };
  return {
    daten: {
      ...daten,
      ...(typeof b.title === 'string' && b.title ? { title: b.title } : {}),
      ...(typeof b.description === 'string' && b.description ? { description: b.description } : {}),
      ...(typeof b.kurz === 'string' && b.kurz ? { kurz: b.kurz } : {}),
    },
    markdown: typeof b.text === 'string' && b.text ? b.text : markdown,
  };
}

/** API-Zeile { slug, daten, markdown? } → Eintrag. Markdown nur behalten wenn mitKörper. */
export function normalisieren(zeile: { slug?: unknown; daten?: unknown; markdown?: unknown }, mitKörper = false, sprache = 'de'): Eintrag | null {
  if (typeof zeile.slug !== 'string' || !zeile.daten || typeof zeile.daten !== 'object') return null;
  const gewaehlt = spracheAnwenden(zeile.daten as Record<string, unknown>, zeile.markdown, sprache);
  const daten = gewaehlt.daten;
  const markdown = gewaehlt.markdown;
  if (daten.geprueft !== true || daten.ausgeblendet) return null;
  const typ = daten.typ === 'event' ? 'event' : 'aktivitaet';
  const liste = termine(daten);
  if (typ === 'event' && !liste.length) return null;
  const monate = monateAus(daten, liste);
  if (!monate.length) return null;

  const eintrag: Eintrag = {
    slug: zeile.slug,
    typ,
    title: typeof daten.title === 'string' ? daten.title : zeile.slug,
    description: typeof daten.description === 'string' ? daten.description : '',
    kurz: typeof daten.kurz === 'string' ? daten.kurz : '',
    monate,
    termine: liste,
    veranstaltungsort: typeof daten.veranstaltungsort === 'string' ? daten.veranstaltungsort : undefined,
    quelle: quelle(daten),
    zielgruppen: strings(daten.zielgruppen),
    kategorien: strings(daten.kategorien),
    pillar: typeof daten.pillar === 'string' ? daten.pillar : 'reisetipps',
    wetter: typeof daten.wetter === 'string' ? daten.wetter : 'outdoor',
    dauer: typeof daten.dauer === 'string' ? daten.dauer : 'kurz',
    anstrengung: typeof daten.anstrengung === 'string' ? daten.anstrengung : 'leicht',
    preis: typeof daten.preis === 'string' ? daten.preis : 'gratis',
    anreise_min: typeof daten.anreise_min === 'number' ? daten.anreise_min : 0,
    anreise_wie: typeof daten.anreise_wie === 'string' ? daten.anreise_wie : 'zu Fuss',
    kinderwagen: daten.kinderwagen === true,
    hund: daten.hund === true,
    geheimtipp: daten.geheimtipp === true,
    website: typeof daten.website === 'string' ? daten.website : undefined,
    ort: typeof daten.ort === 'string' ? daten.ort : site.ort,
    bildAlt: typeof daten.bild_alt === 'string' ? daten.bild_alt : '',
    bildKi: Boolean(daten.bild_ki),
    bildQuelle: bildQuelle(daten.bild_quelle),
    galerie: galerie(daten),
  };

  if (mitKörper && typeof markdown === 'string') eintrag.markdown = markdown;
  return eintrag;
}
