// Lokaler Smoke-Test: Katalogdatei -> Travel-Import -> Discovery-API -> Website-Sync.
// Verwendet eine temporäre PGlite-Datenbank und keine Produktionsschlüssel oder Netzwerkzugriffe.
import assert from 'node:assert/strict';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { katalogVonApi } from './katalog-api-sync.mjs';

const repo = join(dirname(fileURLToPath(import.meta.url)), '..');
const katalog = join(repo, 'trizoun-katalog');
const travel = join(repo, 'trizoun-travel');
const slug = 'adonispfad-rundwanderung-bei-turtmann';
const quelle = join(katalog, 'regionen/leukerbad/aktivitaeten', slug);
const testAppDatei = join(travel, 'apps/api/test/helfer.ts');
const publisherDatei = join(katalog, 'backoffice/src/katalog/publizieren.ts');

for (const pfad of [testAppDatei, publisherDatei, join(quelle, 'titel.webp')]) {
  if (!existsSync(pfad)) throw new Error(`Testdatei fehlt: ${pfad}. Submodule mit git submodule update --init --recursive holen.`);
}

const [{ testApp }, { publiziereRegion }] = await Promise.all([
  import(testAppDatei),
  import(publisherDatei),
]);
const temp = mkdtempSync(join(tmpdir(), 'trizoun-katalog-e2e-'));
const key = 'lokaler-testschluessel-mit-40-zeichen-12345';
let app;
try {
  const ziel = join(temp, 'regionen/leukerbad/aktivitaeten', slug);
  mkdirSync(ziel, { recursive: true });
  copyFileSync(join(katalog, 'regionen/leukerbad/region.yaml'), join(temp, 'regionen/leukerbad/region.yaml'));
  copyFileSync(join(quelle, 'index.md'), join(ziel, 'index.md'));
  copyFileSync(join(quelle, 'titel.webp'), join(ziel, 'titel.webp'));

  app = await testApp({ TT_KATALOG_IMPORT_KEY: key });
  const http = (url, init) => app.req(new URL(url).pathname, init);
  const importiert = await publiziereRegion({
    region: 'leukerbad', katalogDir: temp, apiUrl: 'http://localhost', key,
    heute: new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Zurich' }).format(new Date()), http,
  });
  assert.equal(importiert.hochgeladen, 1);

  const { cookie } = await app.anmelden('katalog-e2e@example.ch');
  const orgAntwort = await app.req('/v1/orgs', { method: 'POST', headers: cookie, json: { name: 'Katalog E2E', slug: 'katalog-e2e' } });
  assert.equal(orgAntwort.status, 201);
  const org = await orgAntwort.json();
  const keyAntwort = await app.req(`/v1/orgs/${org.id}/api-keys`, { method: 'POST', headers: cookie, json: { name: 'Website', type: 'publishable' } });
  assert.equal(keyAntwort.status, 201);
  const publishable = await keyAntwort.json();
  const auth = { authorization: `Bearer ${publishable.key}` };
  assert.equal((await app.req('/v1/public/katalog/leukerbad', { headers: auth })).status, 403);

  await app.module(org.id, 'discovery');
  const websiteZiel = join(temp, 'website-katalog');
  const anzahl = await katalogVonApi({ apiUrl: 'http://localhost', key: publishable.key, region: 'leukerbad', ziel: websiteZiel, http });
  assert.equal(anzahl, 1);
  const eintrag = join(websiteZiel, 'aktivitaeten', slug);
  const markdown = readFileSync(join(eintrag, 'index.md'), 'utf8');
  assert.match(markdown, /quelle:/);
  assert.match(markdown, /bild_quelle:/);
  assert.ok(readFileSync(join(eintrag, 'titel.webp')).length >= 1000);
  console.log('Katalog -> Travel -> Discovery-API -> Website: 1 Eintrag mit Bild und Nachweisen erfolgreich.');
} finally {
  await app?.close();
  rmSync(temp, { recursive: true, force: true });
}
