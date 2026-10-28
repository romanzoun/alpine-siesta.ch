/** Bild vor den Absatz ziehen, und höher als der Text daneben auf dessen Höhe kürzen. */

function istBild(el: Element) {
  return el.matches('img, picture') || (el.tagName === 'P' && !!el.querySelector('img'));
}

function foto(bild: HTMLElement) {
  return bild.tagName === 'IMG' ? (bild as HTMLImageElement) : bild.querySelector('img');
}

function textDaneben(bild: HTMLElement) {
  const start = bild.getBoundingClientRect().top;
  let ende = start;
  let el = bild.nextElementSibling as HTMLElement | null;
  while (el && el.tagName !== 'H2' && !istBild(el)) {
    ende = el.getBoundingClientRect().bottom;
    el = el.nextElementSibling as HTMLElement | null;
  }
  return Math.max(0, ende - start);
}

function kappen(root: HTMLElement) {
  for (const bild of [...root.children].filter(istBild)) {
    const img = foto(bild);
    if (!img) continue;
    const text = textDaneben(bild);
    if (text < 80) {
      bild.style.float = 'none';
      bild.style.clear = 'both';
      bild.style.width = '100%';
      bild.style.margin = '1.25rem 0';
      img.style.height = '';
      img.style.objectFit = '';
      continue;
    }
    const bildHoehe = bild.getBoundingClientRect().height;
    if (bildHoehe > text + 8) {
      img.style.height = `${Math.round(text)}px`;
      img.style.objectFit = 'cover';
      img.style.objectPosition = 'center';
    }
  }
}

export function textBild(root: HTMLElement) {
  if (root.dataset.rhythmus !== 'an') {
    const bilder = [...root.children].filter(istBild);
    for (const bild of bilder) {
      const vor = bild.previousElementSibling;
      if (vor && /^(P|UL|OL)$/.test(vor.tagName) && !istBild(vor)) {
        bild.parentElement?.insertBefore(bild, vor);
      }
    }
    root.dataset.rhythmus = 'an';
  }
  kappen(root);
  for (const img of root.querySelectorAll('img')) {
    if (!img.complete) img.addEventListener('load', () => kappen(root), { once: true });
  }
}
