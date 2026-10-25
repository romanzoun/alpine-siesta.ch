import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './site/site.config';

export default defineConfig({
  site: site.domain,
  publicDir: './site/public',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
