import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ortszeit, tagSchluessel, terminNochBevorstehend } from '../src/lib/zeit.ts';

test('Ein Event erscheint nur vor seinem Datum in der Schweizer Ortszeit', () => {
  const termin = { beginn: ortszeit('2026-11-04T20:00') };
  assert.equal(terminNochBevorstehend(termin, new Date('2026-11-03T22:59:59Z')), true);
  assert.equal(terminNochBevorstehend(termin, new Date('2026-11-03T23:00:00Z')), false);
  assert.equal(tagSchluessel(termin.beginn), '2026-11-04');
});
