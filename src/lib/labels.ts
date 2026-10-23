// Einziges Vokabular für alle Labels der Website.
// Neue Werte nur hier ergänzen – das Schema in content.config.ts übernimmt sie automatisch.

export const monate = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
export const monatsnamen = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

export const zielgruppen = {
  'familie-klein': 'Familie mit Kleinkind',
  'familie-gross': 'Familie mit Teenagern',
  paar: 'Paar',
  solo: 'Solo',
  freunde: 'Freunde',
  senioren: 'Senioren',
  sportlich: 'Sportlich',
} as const;

export const kategorien = {
  wellness: 'Wellness',
  natur: 'Natur',
  sport: 'Sport',
  kultur: 'Kultur',
  kulinarik: 'Kulinarik',
  aussicht: 'Aussicht',
} as const;

export const pillars = {
  thermen: 'Thermen & Wellness',
  familie: 'Familienferien',
  sommer: 'Wandern & Sommer',
  winter: 'Winter & Ski',
  reisetipps: 'Anreise & Wallis-Ausflüge',
} as const;

export const wetter = { outdoor: 'Draussen', indoor: 'Drinnen', beides: 'Drinnen & draussen' } as const;
export const dauer = { kurz: 'Bis 2 Stunden', halbtag: 'Halber Tag', ganztag: 'Ganzer Tag' } as const;
export const anstrengung = { leicht: 'Leicht', mittel: 'Mittel', anspruchsvoll: 'Anspruchsvoll' } as const;
export const preis = { gratis: 'Gratis', $: 'Günstig', $$: 'Mittel', $$$: 'Teuer' } as const;

// Saisons werden aus den Monaten abgeleitet (für Themenseiten wie /entdecken/saison/winter/).
export const saisons = { winter: 'Winter', fruehling: 'Frühling', sommer: 'Sommer', herbst: 'Herbst' } as const;
export const saisonMonate: Record<keyof typeof saisons, number[]> = {
  winter: [12, 1, 2, 3],
  fruehling: [4, 5],
  sommer: [6, 7, 8],
  herbst: [9, 10, 11],
};

// Zusatzfilter (alle gewählten müssen zutreffen)
export const extras = {
  kinderwagen: 'Mit Kinderwagen',
  hund: 'Mit Hund',
  gratis: 'Gratis',
  regen: 'Auch bei Regen',
  geheimtipp: 'Geheimtipp',
} as const;

export const keys = <T extends Record<string, string>>(o: T) => Object.keys(o) as [keyof T & string, ...(keyof T & string)[]];
