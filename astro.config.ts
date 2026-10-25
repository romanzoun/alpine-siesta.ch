import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sitemap from '@astrojs/sitemap';
import { site } from './site/site.config';

// Bilder aus dem Trizoun-Katalog dürfen beim Build geladen und optimiert werden
const env = { ...loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), 'PUBLIC_'), ...process.env };
const api = env.PUBLIC_TRIZOUN_API_URL ? new URL(env.PUBLIC_TRIZOUN_API_URL) : undefined;

export default defineConfig({
  site: site.domain,
  image: { remotePatterns: api ? [{ protocol: api.protocol.replace(':', ''), hostname: api.hostname, ...(api.port ? { port: api.port } : {}) }] : [] },
  publicDir: './site/public',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
