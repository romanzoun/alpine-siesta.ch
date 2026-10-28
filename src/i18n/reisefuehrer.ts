import type { Locale } from './config';
import type { FamilieText } from './familie';
import { familieLocale } from './familie';
import { artikelLocale, type ArtikelText } from './familie-artikel';
import { zermattArtikel, zermattLocale } from './zermatt';
import { weinArtikel, weinLocale } from './wein';

export function pillarText(id: string, locale: Locale): FamilieText | null {
  if (id === 'familie') return familieLocale(locale);
  if (id === 'zermatt') return zermattLocale(locale);
  if (id === 'wein') return weinLocale(locale);
  return null;
}

export function artikelText(locale: Locale, id: string): ArtikelText | null {
  return artikelLocale(locale, id) ?? zermattArtikel(locale, id) ?? weinArtikel(locale, id);
}

export function pillarIstMehrsprachig(id: string) {
  return id === 'familie' || id === 'zermatt' || id === 'wein';
}
