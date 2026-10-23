// Zeigt, was für die Website in site/ noch fehlt: npm run checkliste
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, relative } from 'node:path';

const SITE = 'site';
const platzhalter = new Set(readFileSync('scripts/platzhalter.md5', 'utf8').split('\n').filter(Boolean));

const dateien = (dir) =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? dateien(p) : [p];
  });
const alle = dateien(SITE);
const md = alle.filter((p) => p.endsWith('.md') && !p.includes('/_') && !p.endsWith('README.md'));
const bilder = alle.filter((p) => /\.(jpe?g|png|webp|avif)$/i.test(p));
const zaehle = (text, muster) => (text.match(muster) ?? []).length;
const frontmatter = (text) => text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
const wert = (text, feld) => frontmatter(text).match(new RegExp(`^${feld}:\\s*(.+)$`, 'm'))?.[1]?.trim();

const zeilen = [];
const abschnitt = (titel) => zeilen.push('', `## ${titel}`, '');
const punkt = (ok, text) => zeilen.push(`${ok ? '✅' : '⬜'} ${text}`);

// Bilder
abschnitt('Bilder');
const ph = bilder.filter((p) => platzhalter.has(createHash('md5').update(readFileSync(p)).digest('hex')));
punkt(ph.length === 0, `Platzhalter ersetzt (${ph.length} offen)`);
for (const p of ph) zeilen.push(`   - ${relative(SITE, p)}`);
const start = readFileSync(join(SITE, 'startseite.md'), 'utf8');
punkt(/^\s*bild:/m.test(start), 'Hero-Foto auf der Startseite (sonst Illustration): site/bilder/hero.jpg');
const klein = bilder.filter((p) => !ph.includes(p) && statSync(p).size < 80_000);
if (klein.length) punkt(false, `Sehr kleine Bilddateien prüfen (< 80 KB): ${klein.map((p) => relative(SITE, p)).join(', ')}`);

// Texte
abschnitt('Texte mit [TODO]');
const todos = md.map((p) => [p, zaehle(readFileSync(p, 'utf8'), /\[TODO\]/g)]).filter(([, n]) => n);
punkt(todos.length === 0, `Alle [TODO] erledigt (${todos.reduce((s, [, n]) => s + n, 0)} offen)`);
for (const [p, n] of todos.filter(([p]) => !p.includes('/pillars/'))) zeilen.push(`   - ${relative(SITE, p)}: ${n}`);

// Pillar Pages
abschnitt('Pillar Pages (Ziel: 5 × 5)');
const config = readFileSync(join(SITE, 'site.config.ts'), 'utf8');
const pillarKeys = [...(config.match(/pillars:\s*\{([\s\S]*?)\}/)?.[1] ?? '').matchAll(/^\s*([\w-]+):/gm)].map((m) => m[1]);
for (const key of pillarKeys) {
  const dir = join(SITE, 'pillars', key);
  if (!existsSync(join(dir, 'index.md'))) {
    punkt(false, `${key}: Ordner site/pillars/${key}/index.md fehlt`);
    continue;
  }
  const haupt = readFileSync(join(dir, 'index.md'), 'utf8');
  const artikel = readdirSync(dir).filter((n) => existsSync(join(dir, n, 'index.md')));
  const fertig = artikel.filter((n) => wert(readFileSync(join(dir, n, 'index.md'), 'utf8'), 'entwurf') === 'false');
  const hauptFertig = wert(haupt, 'entwurf') === 'false';
  punkt(hauptFertig && fertig.length >= 5, `${key}: Pillar ${hauptFertig ? 'live' : 'Entwurf'}, Unterseiten ${fertig.length}/${artikel.length} live`);
}

// Aktivitäten
abschnitt('Aktivitäten (Ziel: 30–40)');
const akt = md.filter((p) => p.startsWith(join(SITE, 'aktivitaeten')));
punkt(akt.length >= 30, `${akt.length} Aktivitäten`);
const ungeprueft = akt.filter((p) => wert(readFileSync(p, 'utf8'), 'geprueft') !== 'true');
punkt(ungeprueft.length === 0, `Fakten geprüft (${ungeprueft.length} mit geprueft: false)`);
const pruefen = akt.reduce((s, p) => s + zaehle(readFileSync(p, 'utf8'), /\[PRÜFEN\]/g), 0);
punkt(pruefen === 0, `[PRÜFEN]-Stellen erledigt (${pruefen} offen)`);
const ohneBild = akt.filter((p) => !wert(readFileSync(p, 'utf8'), 'bild'));
punkt(ohneBild.length === 0, `Alle mit Titelbild (${ohneBild.length} ohne)`);

// Rechtliches & Einstellungen
abschnitt('Rechtliches & Einstellungen');
for (const s of ['impressum', 'datenschutz', 'agb']) {
  const p = join(SITE, 'rechtliches', `${s}.md`);
  const ok = existsSync(p) && !readFileSync(p, 'utf8').includes('[TODO]');
  punkt(ok, `${s}.md ausgefüllt`);
}
punkt(!config.includes('[TODO]'), 'site.config.ts ohne [TODO] (z. B. E-Mail)');
punkt(!config.includes("buchungUrl: 'mailto:"), 'Buchung über Beds24 statt Mail-Anfrage');

console.log(`# Checkliste ${SITE}/\n` + zeilen.join('\n'));
