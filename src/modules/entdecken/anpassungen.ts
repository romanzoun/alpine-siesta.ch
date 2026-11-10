import { existsSync, readFileSync } from 'node:fs';
import { parse } from 'yaml';
import type { Anpassung, Eintrag, EntdeckenAnpassungen } from './typen';

const DATEI = 'site/entdecken.yaml';

export function ladeAnpassungen(): EntdeckenAnpassungen {
  if (!existsSync(DATEI)) return { ausblenden: [], anpassungen: {} };
  const roh = parse(readFileSync(DATEI, 'utf8')) ?? {};
  const ausblenden = Array.isArray(roh.ausblenden) ? roh.ausblenden.filter((s: unknown): s is string => typeof s === 'string') : [];
  const anpassungen: Record<string, Anpassung> = {};
  if (roh.anpassungen && typeof roh.anpassungen === 'object') {
    for (const [slug, wert] of Object.entries(roh.anpassungen as Record<string, Record<string, unknown>>)) {
      if (!wert || typeof wert !== 'object') continue;
      anpassungen[slug] = {
        tipp: typeof wert.tipp === 'string' ? wert.tipp : undefined,
        anreise_min: typeof wert.anreise_min === 'number' ? wert.anreise_min : undefined,
        anreise_wie: typeof wert.anreise_wie === 'string' ? wert.anreise_wie : undefined,
        geheimtipp: typeof wert.geheimtipp === 'boolean' ? wert.geheimtipp : undefined,
      };
    }
  }
  return { ausblenden, anpassungen };
}

export function anwendenAnpassung(eintrag: Eintrag, a?: Anpassung): Eintrag {
  if (!a) return eintrag;
  const next = { ...eintrag };
  if (a.anreise_min != null) next.anreise_min = a.anreise_min;
  if (a.anreise_wie) next.anreise_wie = a.anreise_wie;
  if (a.geheimtipp != null) next.geheimtipp = a.geheimtipp;
  if (a.tipp?.trim() && next.markdown != null) {
    next.markdown = `${next.markdown.trim()}\n\n## Tipp von uns\n\n${a.tipp.trim()}`;
  }
  return next;
}
