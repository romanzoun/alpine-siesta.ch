import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './site/site.config';
import { kontaktFormular } from './src/lib/kontakt-integration';

export default defineConfig({
  site: site.domain,
  publicDir: './site/public',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (seite) => !seite.includes('/kontakt/danke/') }), kontaktFormular()],
});
