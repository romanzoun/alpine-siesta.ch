import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { site } from './site/site.config';
import { markdownBildGroessen } from './src/lib/markdown-bilder';

export default defineConfig({
  site: site.domain,
  publicDir: './site/public',
  trailingSlash: 'always',
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
    }),
  ],
});
