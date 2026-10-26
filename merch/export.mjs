// Exportiert die Motive als druckfertige PNGs (transparent) und erstellt Vorschauen auf T-Shirts.
// Aufruf: npm run merch:export   (braucht Chrome/Chromium; Pfad optional per CHROMIUM_PATH)
import { chromium } from 'playwright-core';
import { mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const hier = dirname(fileURLToPath(import.meta.url));
const motive = join(hier, 'motive');
const druck = join(hier, 'export');
const vorschau = join(hier, 'vorschau');
mkdirSync(druck, { recursive: true });
mkdirSync(vorschau, { recursive: true });

// Druckauflösung: 3× die Zeichenfläche (T-Shirt 3600 × 4800 px). Vor dem Hochladen die Vorgaben von Gelato pro Produkt prüfen.
const SKALIERUNG = 3;
// Varianten: «hell» = helle Farben für dunkle Shirts, «dunkel» = dunkle Farben für helle Shirts
const VARIANTEN = ['hell', 'dunkel'];
const SHIRTS = { hell: '#16233a', dunkel: '#efeae0' };

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : { channel: 'chrome' });

for (const datei of readdirSync(motive).filter((d) => d.endsWith('.svg'))) {
  const name = datei.replace(/\.svg$/, '');
  const svg = readFileSync(join(motive, datei), 'utf8');
  const [, w, h] = svg.match(/viewBox="0 0 (\d+) (\d+)"/).map(Number);
  const istPlakat = name.startsWith('plakat');
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: SKALIERUNG });
  await page.goto(pathToFileURL(join(motive, datei)).href);
  await page.evaluate(() => document.fonts.ready);

  for (const v of istPlakat ? ['farbig'] : VARIANTEN) {
    await page.evaluate((v) => document.documentElement.classList.toggle('dunkel', v === 'dunkel'), v);
    const png = join(druck, `${name}-${v}.png`);
    await page.screenshot({ path: png, omitBackground: !istPlakat });

    // Vorschau: Motiv auf einem einfachen Shirt bzw. als gerahmtes Poster
    const bild = `data:image/png;base64,${readFileSync(png).toString('base64')}`;
    const vp = await browser.newPage({ viewport: { width: 800, height: 900 }, deviceScaleFactor: 1 });
    await vp.setContent(
      istPlakat
        ? `<body style="margin:0;display:grid;place-items:center;height:900px;background:#dce3e0">
             <img src="${bild}" style="width:520px;border:22px solid #16233a;box-shadow:0 20px 40px rgb(0 0 0/.25)"></body>`
        : `<body style="margin:0;display:grid;place-items:center;height:900px;background:#f5f8f7">
             <div style="position:relative;width:640px;height:760px">
               <svg viewBox="0 0 640 760" width="640" height="760" style="position:absolute;inset:0">
                 <path d="M190 40 Q320 110 450 40 L620 130 L560 300 L490 270 L490 740 L150 740 L150 270 L80 300 L20 130 Z" fill="${SHIRTS[v]}" />
                 <path d="M250 40 Q320 85 390 40" fill="none" stroke="rgb(0 0 0/.15)" stroke-width="6" />
               </svg>
               <img src="${bild}" style="position:absolute;left:${name === 'siesta-1411' ? 345 : 205}px;top:${name === 'siesta-1411' ? 150 : 150}px;width:${name === 'siesta-1411' ? 110 : 230}px">
             </div></body>`,
    );
    await vp.waitForLoadState('load');
    await vp.screenshot({ path: join(vorschau, `${name}-${v}.png`) });
    await vp.close();
  }
  await page.close();
  console.log('✓', name);
}
await browser.close();
console.log(`Druckdateien: ${resolve(druck)}\nVorschauen: ${resolve(vorschau)}`);
