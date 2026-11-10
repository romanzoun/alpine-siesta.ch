/** Normalisierte Katalog-Einträge aus der Trizoun-Public-API. */

export type Termin = { beginn: string; ende?: string };

export type Quelle = { name: string; url: string; abgerufen?: string | null };

export type BildQuelle = {
  name: string;
  url: string;
  urheber?: string;
  lizenz?: string;
  lizenz_url?: string;
};

export type GalerieBild = {
  dateiname: string;
  alt: string;
  quelle: BildQuelle;
};

export type Eintrag = {
  slug: string;
  typ: 'aktivitaet' | 'event';
  title: string;
  description: string;
  kurz: string;
  monate: number[];
  termine: Termin[];
  veranstaltungsort?: string;
  quelle: Quelle | null;
  zielgruppen: string[];
  kategorien: string[];
  pillar: string;
  wetter: string;
  dauer: string;
  anstrengung: string;
  preis: string;
  anreise_min: number;
  anreise_wie: string;
  kinderwagen: boolean;
  hund: boolean;
  geheimtipp: boolean;
  website?: string;
  ort: string;
  bildAlt: string;
  bildKi: boolean;
  bildQuelle: BildQuelle | null;
  galerie: GalerieBild[];
  /** Nur Detail: Markdown-Körper (ohne Frontmatter). */
  markdown?: string;
};

export type Anpassung = {
  tipp?: string;
  anreise_min?: number;
  anreise_wie?: string;
  geheimtipp?: boolean;
};

export type EntdeckenAnpassungen = {
  ausblenden: string[];
  anpassungen: Record<string, Anpassung>;
};
