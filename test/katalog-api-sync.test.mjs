import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { katalogRevision, katalogVonApi } from '../scripts/katalog-api-sync.mjs';

test('API-Sync legt vollständige Astro-Artefakte mit Titel- und Galeriebild an', async () => {
  const temp = mkdtempSync(join(tmpdir(), 'site-katalog-api-test-'));
  const ziel = join(temp, 'katalog');
  const bild = Buffer.alloc(1200);
  bild.write('RIFF', 0); bild.write('WEBP', 8);
  const daten = { title: 'Berg', bild: './titel.webp', galerie: [{ bild: './galerie-1.webp', alt: 'Berg' }] };
  const http = async (url) => {
    const pfad = new URL(url).pathname;
    if (pfad.endsWith('/leukerbad')) return Response.json({ data: [{ slug: 'berg', daten, markdown: '## Ein Berg\n' }] });
    return new Response(bild, { headers: { 'content-type': 'image/webp' } });
  };
  try {
    assert.equal(await katalogVonApi({ apiUrl: 'https://api.example.com', key: 'tt_pk_test', region: 'leukerbad', ziel, http }), 1);
    assert.match(readFileSync(join(ziel, 'aktivitaeten/berg/index.md'), 'utf8'), /## Ein Berg/);
    assert.deepEqual(readFileSync(join(ziel, 'aktivitaeten/berg/titel.webp')), bild);
    assert.deepEqual(readFileSync(join(ziel, 'aktivitaeten/berg/galerie-1.webp')), bild);
    writeFileSync(join(ziel, 'marker'), 'bleibt');
    await assert.rejects(katalogVonApi({ apiUrl: 'https://api.example.com', key: 'tt_pk_test', region: 'leukerbad', ziel, http: async () => new Response('', { status: 503 }) }), /HTTP 503/);
    assert.equal(readFileSync(join(ziel, 'marker'), 'utf8'), 'bleibt');
    const revision = katalogRevision([{ slug: 'berg', inhaltSha256: 'a'.repeat(64) }]);
    writeFileSync(join(ziel, 'STAND.md'), `Revision: ${revision}\n`);
    const gleich = async (url) => {
      const pfad = new URL(url).pathname + new URL(url).search;
      if (pfad.includes('spiegel=1')) return Response.json({ meta: { revision }, data: [{ slug: 'berg', daten, markdown: '## Neu\n', inhaltSha256: 'a'.repeat(64) }] });
      return new Response(bild, { headers: { 'content-type': 'image/webp' } });
    };
    assert.equal(await katalogVonApi({ apiUrl: 'https://api.example.com', key: 'tt_pk_test', region: 'leukerbad', ziel, http: gleich }), 1);
    assert.match(readFileSync(join(ziel, 'aktivitaeten/berg/index.md'), 'utf8'), /## Ein Berg/);
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
});
