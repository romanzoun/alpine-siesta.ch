// Prüft die gebaute Website (dist/) auf typische SEO-Fehler: npm run seo-check
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
if (!existsSync(DIST)) {
  console.error('dist/ fehlt – zuerst npm run build');
  process.exit(1);
}
const dateien = (d) => readdirSync(d).flatMap((n) => (statSync(join(d, n)).isDirectory() ? dateien(join(d, n)) : [join(d, n)]));
const alle = dateien(DIST);
const seiten = alle.filter((p) => p.endsWith('.html') && !p.endsWith('404.html'));
const vorhanden = new Set(alle.map((p) => '/' + relative(DIST, p).replace(/index\.html$/, '')));

const fehler = [];
const warnungen = [];
const titel = new Map();
const text = (html, re) => html.match(re)?.[1]?.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim();

for (const datei of seiten) {
  const html = readFileSync(datei, 'utf8');
  const url = '/' + relative(DIST, datei).replace(/index\.html$/, '');
  const f = (m) => fehler.push(`${url}: ${m}`);
  const w = (m) => warnungen.push(`${url}: ${m}`);

  const t = text(html, /<title>([^<]*)<\/title>/);
  if (!t) f('kein <title>');
  else {
    if (t.length > 65) w(`Titel ${t.length} Zeichen (> 65 wird in Google abgeschnitten): «${t}»`);
    titel.set(t, [...(titel.get(t) ?? []), url]);
  }
  const d = text(html, /<meta name="description" content="([^"]*)"/);
  if (!d) f('keine Meta-Description');
  else if (d.length < 70 || d.length > 160) w(`Description ${d.length} Zeichen (Ziel 70–160)`);
  if (/\[TODO\]|\[PRÜFEN\]/.test(t + d)) w('Platzhalter [TODO]/[PRÜFEN] in Titel oder Description');

  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) f(`${h1} H1-Überschriften (genau 1 erwartet)`);
  if (!/<link rel="canonical"/.test(html)) f('kein Canonical');
  if (!/<meta property="og:image"/.test(html)) w('kein og:image');

  for (const img of html.match(/<img\b[^>]*>/g) ?? []) if (!/\salt="[^"]+"/.test(img)) f(`Bild ohne Alt-Text: ${img.slice(0, 80)}…`);

  for (const ld of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(ld[1]); } catch { f('ungültiges JSON-LD'); }
  }

  // Interne Links müssen existieren
  for (const [, href] of html.matchAll(/<a\b[^>]*href="(\/[^"#?]*)/g)) {
    const ziel = href.endsWith('/') ? href : `${href}`;
    if (!vorhanden.has(ziel) && !vorhanden.has(ziel + '/') && !existsSync(join(DIST, href))) f(`toter Link → ${href}`);
  }
}
for (const [t, urls] of titel) if (urls.length > 1) fehler.push(`Gleicher Titel auf ${urls.join(', ')}: «${t}»`);

const sitemap = existsSync(join(DIST, 'sitemap-0.xml')) ? readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8') : '';
const inSitemap = (sitemap.match(/<loc>/g) ?? []).length;

console.log(`SEO-Check: ${seiten.length} Seiten, ${inSitemap} in der Sitemap\n`);
for (const m of fehler) console.log(`✗ ${m}`);
for (const m of warnungen) console.log(`△ ${m}`);
console.log(`\n${fehler.length} Fehler, ${warnungen.length} Warnungen`);
process.exit(fehler.length ? 1 : 0);
