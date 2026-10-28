export const locales = ['de', 'en', 'fr', 'it'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'de';

export const htmlLang: Record<Locale, string> = {
  de: 'de-CH',
  en: 'en',
  fr: 'fr-CH',
  it: 'it-CH',
};

export function asLocale(wert: string | undefined): Locale {
  return locales.includes(wert as Locale) ? (wert as Locale) : defaultLocale;
}

/** Pfad ohne Sprachpräfix, immer mit Slash am Ende. */
export function ohneLocale(pathname: string): string {
  const teile = pathname.split('/').filter(Boolean);
  if (teile[0] && locales.includes(teile[0] as Locale) && teile[0] !== defaultLocale) teile.shift();
  return teile.length ? `/${teile.join('/')}/` : '/';
}

/** Deutsch bleibt ohne Präfix. Keine Umleitung. */
export function mitLocale(locale: Locale, pathname: string): string {
  const pfad = ohneLocale(pathname);
  return locale === defaultLocale ? pfad : `/${locale}${pfad}`;
}
