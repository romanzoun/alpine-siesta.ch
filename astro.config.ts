import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { existsSync, readdirSync } from 'node:fs';
import { site } from './site/site.config';
import { markdownBildGroessen } from './src/lib/markdown-bilder';
import * as L from './src/lib/labels';

/** Entdecken-SSR-Seiten fehlen in der Sitemap automatisch – aus dem gespiegelten Katalog nachziehen. */
function entdeckenSitemap() {
  if (!site.module.entdecken) return [] as string[];
  const basis = site.domain.replace(/\/$/, '');
  const urls = [`${basis}/entdecken/`];
  const dir = 'site/katalog/aktivitaeten';
  if (existsSync(dir)) {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory() && !e.name.startsWith('_')) urls.push(`${basis}/entdecken/${e.name}/`);
    }
  }
  for (const wert of Object.keys(L.saisons)) urls.push(`${basis}/entdecken/saison/${wert}/`);
  for (const wert of Object.keys(L.zielgruppen)) urls.push(`${basis}/entdecken/fuer/${wert}/`);
  for (const wert of Object.keys(L.kategorien)) urls.push(`${basis}/entdecken/thema/${wert}/`);
  return urls;
}

export default defineConfig({
  site: site.domain,
  publicDir: './site/public',
  trailingSlash: 'always',
  adapter: node({ mode: 'standalone' }),
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        webp: { quality: 75 },
        jpeg: { quality: 75, mozjpeg: true },
      },
    },
  },
  markdown: {
    processor: satteri({ hastPlugins: [markdownBildGroessen()] }),
  },
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en', 'fr', 'it'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'de',
        locales: { de: 'de-CH', en: 'en', fr: 'fr-CH', it: 'it-CH' },
      },
      customPages: entdeckenSitemap(),
    }),
  ],
});
