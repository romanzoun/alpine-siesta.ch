import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './site/site.config';

export default defineConfig({
  site: site.domain,
  publicDir: './site/public',
  trailingSlash: 'always',
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
    }),
  ],
});
