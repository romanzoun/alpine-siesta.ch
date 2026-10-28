import { getCollection, type CollectionEntry } from 'astro:content';
import { asLocale, mitLocale } from '../i18n/config';

export type Wohnung = CollectionEntry<'wohnungen'>;

export async function alleWohnungen(): Promise<Wohnung[]> {
  const alle = await getCollection('wohnungen');
  return alle.sort((a, b) => a.data.reihenfolge - b.data.reihenfolge || a.data.name.localeCompare(b.data.name, 'de'));
}

export const wohnungUrl = (id: string, locale = 'de') => mitLocale(asLocale(locale), `/wohnungen/${id}/`);

// Bei nur einer Wohnung führt «Wohnung» direkt auf deren Seite, sonst auf die Übersicht.
export async function wohnungenNav() {
  const alle = await alleWohnungen();
  return alle.length === 1
    ? { href: wohnungUrl(alle[0].id), label: 'Wohnung' }
    : { href: '/wohnungen/', label: 'Wohnungen' };
}

// Ziel aller «Buchen»-Knöpfe: das Buchungs-Widget auf der Wohnungsseite bzw. die Übersicht.
export async function buchungsZiel(locale = 'de') {
  const alle = await alleWohnungen();
  const sprache = asLocale(locale);
  const pfad = alle.length === 1 ? `${wohnungUrl(alle[0].id, sprache)}#buchen` : mitLocale(sprache, '/wohnungen/');
  return pfad;
}
