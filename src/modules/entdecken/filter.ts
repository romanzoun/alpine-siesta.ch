import * as L from './labels';
import type { Eintrag } from './typen';
import { tagSchluessel } from '../../lib/zeit';
import { ortszeit } from '../../lib/zeit';

export type FilterAuswahl = {
  q?: string;
  monat?: string;
  typ?: string[];
  fuer?: string[];
  thema?: string[];
  extra?: string[];
};

export function extrasVon(e: Eintrag): string[] {
  return [
    e.kinderwagen && 'kinderwagen',
    e.hund && 'hund',
    e.preis === 'gratis' && 'gratis',
    e.wetter !== 'outdoor' && 'regen',
    e.geheimtipp && 'geheimtipp',
  ].filter(Boolean) as string[];
}

export function letzterTerminTag(e: Eintrag): string | undefined {
  if (e.typ !== 'event' || !e.termine.length) return undefined;
  return e.termine.map((t) => tagSchluessel(ortszeit(t.beginn))).sort().at(-1);
}

export function nochOffen(e: Eintrag, heute = tagSchluessel(new Date())): boolean {
  const letzter = letzterTerminTag(e);
  return !letzter || letzter > heute;
}

function suchText(e: Eintrag) {
  return [e.title, e.kurz, e.description, ...e.kategorien.map((k) => L.kategorien[k as keyof typeof L.kategorien] ?? k), ...e.zielgruppen.map((z) => L.zielgruppen[z as keyof typeof L.zielgruppen] ?? z)]
    .join(' ')
    .toLowerCase();
}

/** Server- und Client-Logik: innerhalb einer Gruppe ODER, zwischen Gruppen UND; Extras alle. */
export function passtFilter(e: Eintrag, a: FilterAuswahl, heute = tagSchluessel(new Date())): boolean {
  if (!nochOffen(e, heute)) return false;
  if (a.monat && !e.monate.map(String).includes(a.monat)) return false;
  if (a.typ?.length && !a.typ.includes(e.typ)) return false;
  if (a.fuer?.length && !a.fuer.some((w) => e.zielgruppen.includes(w))) return false;
  if (a.thema?.length && !a.thema.some((w) => e.kategorien.includes(w))) return false;
  if (a.extra?.length) {
    const extras = extrasVon(e);
    if (!a.extra.every((x) => extras.includes(x))) return false;
  }
  if (a.q?.trim()) {
    const q = a.q.trim().toLowerCase();
    if (!suchText(e).includes(q)) return false;
  }
  return true;
}

export function filtern(alle: Eintrag[], a: FilterAuswahl): Eintrag[] {
  return alle.filter((e) => passtFilter(e, a));
}
