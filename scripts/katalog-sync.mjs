// Spiegelt die Region aus dem zentralen Katalog-Repo nach site/katalog/: npm run katalog:sync
// Quelle: KATALOG_DIR (lokaler Ordner, z. B. zum Testen) oder das Git-Repo aus site.config.ts
// (privat: KATALOG_TOKEN mit Leserecht; KATALOG_REPO überschreibt die Adresse, z. B. für Tests). site/katalog/ nie von Hand ändern – Anpassungen in site/entdecken.yaml.
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { site } from '../site/site.config.ts';

const ZIEL = 'site/katalog';
const { region, ref } = site.katalog;
const repo = process.env.KATALOG_REPO ?? site.katalog.repo;
let quelle = process.env.KATALOG_DIR;
let commit = 'lokal';
let aufraeumen;

if (!quelle) {
  const tmp = mkdtempSync(join(tmpdir(), 'katalog-'));
  aufraeumen = () => rmSync(tmp, { recursive: true, force: true });
  const url = process.env.KATALOG_TOKEN ? repo.replace('https://', `https://x-access-token:${process.env.KATALOG_TOKEN}@`) : repo;
  try {
    execFileSync('git', ['clone', '--quiet', '--depth', '1', '--branch', ref, url, tmp], { stdio: ['ignore', 'ignore', 'pipe'] });
  } catch (e) {
    // Token nie ausgeben
    console.error(`Katalog konnte nicht geladen werden (${repo}, ${ref}). Zugriff/Token prüfen.`);
    process.exit(1);
  }
  commit = execFileSync('git', ['-C', tmp, 'rev-parse', 'HEAD']).toString().trim();
  quelle = tmp;
}

const regionDir = join(quelle, 'regionen', region);
if (!existsSync(join(regionDir, 'region.yaml'))) {
  console.error(`Region «${region}» gibt es im Katalog nicht (${regionDir}).`);
  process.exit(1);
}

const vorher = existsSync(join(ZIEL, 'aktivitaeten')) ? readdirSync(join(ZIEL, 'aktivitaeten')) : [];
rmSync(ZIEL, { recursive: true, force: true });
cpSync(regionDir, ZIEL, { recursive: true });
writeFileSync(
  join(ZIEL, 'STAND.md'),
  `# Automatisch gespiegelt – nicht von Hand ändern\n\nQuelle: ${repo.replace(/\/\/[^@]*@/, '//')}\nRegion: ${region}\nCommit: ${commit}\n\nAnpassungen für diese Website: site/entdecken.yaml. Eigene Aktivitäten: site/aktivitaeten/.\n`,
);
const nachher = readdirSync(join(ZIEL, 'aktivitaeten'));
const neu = nachher.filter((s) => !vorher.includes(s));
const weg = vorher.filter((s) => !nachher.includes(s));
console.log(`Katalog «${region}» gespiegelt: ${nachher.length} Aktivitäten (${neu.length} neu${neu.length ? `: ${neu.join(', ')}` : ''}, ${weg.length} entfernt${weg.length ? `: ${weg.join(', ')}` : ''}). Commit ${commit.slice(0, 7)}`);
aufraeumen?.();
