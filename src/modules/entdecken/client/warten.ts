import { entdeckenFilterInit } from './filter';

/** Wartebildschirm, bis die Aktivitäten-Liste da ist. Die Sätze stehen schon im HTML. */
export function starteWarten(root: HTMLElement) {
  const sprueche = JSON.parse(root.dataset.sprueche || '[]') as string[];
  const SPRUECHE = sprueche.length ? sprueche : [root.querySelector('[data-spruch]')?.textContent ?? ''];
  const sprache = root.dataset.sprache || 'de';
  const zeile = root.querySelector<HTMLElement>('[data-spruch]');
  const ziel = document.querySelector<HTMLElement>('[data-entdecken-ziel]');
  const erneut = root.querySelector<HTMLButtonElement>('[data-erneut]');
  if (!zeile || !ziel) return;

  let index = 0;
  let drehen = 0;
  const starten = () => {
    window.clearInterval(drehen);
    drehen = window.setInterval(() => {
      index = (index + 1) % SPRUECHE.length;
      zeile.textContent = SPRUECHE[index];
    }, 2400);
  };

  const laden = async () => {
    erneut?.setAttribute('hidden', '');
    root.hidden = false;
    root.setAttribute('aria-busy', 'true');
    starten();
    try {
      const antwort = await fetch(`/entdecken/inhalt/?sprache=${encodeURIComponent(sprache)}`, { headers: { accept: 'text/html' }, cache: 'no-store' });
      if (!antwort.ok) throw new Error(String(antwort.status));
      einsetzen(await antwort.text(), ziel);
      window.clearInterval(drehen);
      root.hidden = true;
      root.setAttribute('aria-busy', 'false');
    } catch {
      window.clearInterval(drehen);
      zeile.textContent = root.dataset.fehler || SPRUECHE[0];
      erneut?.removeAttribute('hidden');
    }
  };

  erneut?.addEventListener('click', () => {
    index = 0;
    zeile.textContent = SPRUECHE[0];
    void laden();
  });
  void laden();
}

function einsetzen(html: string, ziel: HTMLElement) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  for (const style of doc.querySelectorAll('style')) document.head.append(style);
  for (const link of doc.querySelectorAll('link[rel="stylesheet"]')) {
    const href = link.getAttribute('href');
    if (!href || document.querySelector(`link[rel="stylesheet"][href="${CSS.escape(href)}"]`)) continue;
    document.head.append(link);
  }
  const block = doc.querySelector<HTMLElement>('[data-entdecken-inhalt]');
  if (!block) throw new Error('Liste fehlt');
  ziel.replaceWith(block);
  const liste = block.querySelector<HTMLElement>('[data-entdecken]');
  if (liste) entdeckenFilterInit(liste);
}
