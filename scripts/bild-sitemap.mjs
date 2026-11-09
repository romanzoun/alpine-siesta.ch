// Bild-Sitemap aus dem gebauten HTML. Google indexiert so die Fotos mit der Seite und dem Alt-Text.
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
if (!existsSync(DIST)) {
  console.error('dist/ fehlt – zuerst astro build');
  process.exit(1);
}

const dateien = (d) => readdirSync(d).flatMap((n) => (statSync(join(d, n)).isDirectory() ? dateien(join(d, n)) : [join(d, n)]));
const seiten = dateien(DIST).filter((p) => p.endsWith('.html') && !p.endsWith('404.html'));

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const urls = [];
for (const datei of seiten) {
  const html = readFileSync(datei, 'utf8');
  const seite = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!seite) continue;
  const origin = new URL(seite).origin;
  const gesehen = new Set();
  const bilder = [];
  for (const img of html.match(/<img\b[^>]*>/g) ?? []) {
    const src = img.match(/\ssrc="([^"]+)"/)?.[1];
    if (!src || src.startsWith('data:') || /\.svg(?:$|\?)/.test(src)) continue;
    const abs = src.startsWith('http') ? src : new URL(src, origin).href;
    if (gesehen.has(abs)) continue;
    gesehen.add(abs);
    const alt = img.match(/\salt="([^"]*)"/)?.[1] ?? '';
    bilder.push(`    <image:image><image:loc>${escape(abs)}</image:loc>${alt ? `<image:caption>${escape(alt)}</image:caption>` : ''}</image:image>`);
  }
  if (bilder.length) urls.push(`  <url>\n    <loc>${escape(seite)}</loc>\n${bilder.join('\n')}\n  </url>`);
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join('\n')}\n</urlset>\n`;
writeFileSync(join(DIST, 'sitemap-images.xml'), xml);

const indexPfad = join(DIST, 'sitemap-index.xml');
if (existsSync(indexPfad)) {
  let index = readFileSync(indexPfad, 'utf8');
  const loc = urls.length ? new URL('/sitemap-images.xml', new URL(readFileSync(seiten[0], 'utf8').match(/<link rel="canonical" href="([^"]+)"/)[1]).origin).href : '';
  if (loc && !index.includes('sitemap-images.xml')) {
    index = index.replace('</sitemapindex>', `<sitemap><loc>${escape(loc)}</loc></sitemap></sitemapindex>`);
    writeFileSync(indexPfad, index);
  }
}

console.log(`Bild-Sitemap: ${urls.length} Seiten`);
