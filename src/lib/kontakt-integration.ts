import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { AstroIntegration } from 'astro';
import { parse } from 'yaml';
import { site } from '../../site/site.config';

// Erzeugt beim Build dist/kontakt.php aus src/server/kontakt.php mit den Einstellungen dieser Website.
// Die Empfängeradresse steht im Skript, nie im Formular (sonst Spam-Relay).
export function kontaktFormular(): AstroIntegration {
  return {
    name: 'kontakt-formular',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const wohnungen: Record<string, string> = {};
        const basis = 'site/wohnungen';
        for (const ordner of existsSync(basis) ? readdirSync(basis) : []) {
          const datei = join(basis, ordner, 'index.md');
          if (ordner.startsWith('_') || !existsSync(datei)) continue;
          const fm = readFileSync(datei, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
          wohnungen[ordner] = String((fm && parse(fm[1]!)?.name) ?? ordner);
        }
        const konfig = {
          empfaenger: site.kontakt.empfaenger,
          absender: site.kontakt.absender,
          email: site.email,
          name: site.name,
          domain: new URL(site.domain).host,
          wohnungen,
        };
        const vorlage = readFileSync(new URL('../server/kontakt.php', import.meta.url), 'utf8');
        const json = JSON.stringify(konfig, null, 2);
        if (json.includes('\nKONFIG')) throw new Error('Ungültige Kontakt-Konfiguration');
        writeFileSync(join(fileURLToPath(dir), 'kontakt.php'), vorlage.replace('__KONFIG__', json));
        logger.info(`kontakt.php erzeugt (Empfänger ${konfig.empfaenger})`);
      },
    },
  };
}
