import type { Locale } from './config';
import { en, fr, it } from './familie-bloecke';

export type Block =
  | { typ: 'p'; text: string }
  | { typ: 'h2'; text: string }
  | { typ: 'h3'; text: string }
  | { typ: 'ul'; items: string[] }
  | { typ: 'img'; bild: string; alt: string }
  | { typ: 'links'; items: { href: string; label: string }[] }
  | { typ: 'table'; kopf: string[]; zeilen: string[][] }
  | { typ: 'wohnung'; davor: string; name: string; danach: string };

export type FamilieText = {
  title: string;
  description: string;
  h1: string;
  lead: string;
  bildAlt: string;
  kicker: string;
  ort: string;
  faq: { frage: string; antwort: string }[];
  blocks: Block[];
};

export type HubText = {
  title: string;
  description: string;
  h1: string;
  lead: string;
};

const hub: Record<Locale, HubText> = {
  de: {
    title: 'Reiseführer Leukerbad und Wallis | Alpine Siesta',
    description: 'Reiseführer für Leukerbad und das Wallis: Ferien mit Kindern, Zermatt, Wein und Biken, alles ab unserer Ferienwohnung.',
    h1: 'Leukerbad und das Wallis',
    lead: 'Familienferien, ein Tag in Zermatt, Wein im Tal und Touren mit dem Bike: was wir unseren Gästen empfehlen, mit kurzen Wegen ab der Wohnung.',
  },
  en: {
    title: 'Leukerbad and Valais travel guide',
    description: 'A guide to Leukerbad and the Valais: family days, Zermatt, wine and mountain biking, all from our apartment.',
    h1: 'Leukerbad and the Valais',
    lead: 'Family days, a trip to Zermatt, wine in the valley and rides on the bike: what we tell our guests, all close to the apartment.',
  },
  fr: {
    title: 'Guide de Loèche-les-Bains et du Valais',
    description: 'Un guide de Loèche-les-Bains et du Valais : famille, Zermatt, vin et vélo, le tout depuis notre appartement.',
    h1: 'Loèche-les-Bains et le Valais',
    lead: 'Des jours en famille, une journée à Zermatt, le vin dans la vallée et des sorties à vélo : ce que nous conseillons, à deux pas de l’appartement.',
  },
  it: {
    title: 'Guida di Leukerbad e del Vallese',
    description: 'Una guida di Leukerbad e del Vallese: famiglia, Zermatt, vino e mountain bike, tutto dal nostro appartamento.',
    h1: 'Leukerbad e il Vallese',
    lead: 'Giornate in famiglia, un giorno a Zermatt, vino nella valle e uscite in bici: quello che consigliamo, a pochi passi dall’appartamento.',
  },
};

const texte = { en, fr, it };

export function familieLocale(locale: Locale): FamilieText | null {
  if (locale === 'de') return null;
  return texte[locale];
}

export function hubText(locale: Locale): HubText {
  return hub[locale];
}
