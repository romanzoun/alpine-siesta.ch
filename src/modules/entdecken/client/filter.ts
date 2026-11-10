import { saisonMonate } from '../labels';

const SAISON = Object.fromEntries(
  Object.entries(saisonMonate).map(([name, monate]) => [name, monate.map(String)]),
) as Record<string, string[]>;

/** Progressive Enhancement: Filter + Suche auf der schon geladenen Liste. */
export function entdeckenFilterInit(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>('[data-filter]');
  const zeilen = [...root.querySelectorAll<HTMLElement>('[data-zeile]')];
  const heute = () => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Zurich' }).format(new Date());
  const nochOffen = (el: HTMLElement) => !el.dataset.letzterTermin || el.dataset.letzterTermin > heute();

  if (!form) {
    const aktualisieren = () => {
      for (const el of zeilen) el.hidden = !nochOffen(el);
    };
    aktualisieren();
    return;
  }

  const anzahl = root.querySelector('[data-anzahl]');
  const leer = root.querySelector<HTMLElement>('[data-leer]');
  const suche = form.querySelector<HTMLInputElement>('input[name="q"]');

  const auswahl = () => {
    const fd = new FormData(form);
    return {
      q: String(fd.get('q') ?? '').trim().toLowerCase(),
      monat: fd.getAll('monat').map(String).filter(Boolean),
      typ: fd.getAll('typ').map(String),
      fuer: fd.getAll('fuer').map(String),
      thema: fd.getAll('thema').map(String),
      extra: fd.getAll('extra').map(String),
    };
  };

  const anwenden = () => {
    const a = auswahl();
    const hat = (el: HTMLElement, key: string, werte: string[]) =>
      !werte.length || werte.some((w) => (el.dataset[key] ?? '').split(' ').includes(w));
    const sichtbar = (el: HTMLElement) => {
      if (!nochOffen(el)) return false;
      const monate = (el.dataset.monate ?? '').split(' ');
      if (a.monat.length && !a.monat.some((m) => monate.includes(m))) return false;
      if (!hat(el, 'typ', a.typ)) return false;
      if (!hat(el, 'fuer', a.fuer)) return false;
      if (!hat(el, 'thema', a.thema)) return false;
      if (!a.extra.every((x) => (el.dataset.extra ?? '').split(' ').includes(x))) return false;
      if (a.q && !(el.dataset.suche ?? '').includes(a.q)) return false;
      return true;
    };

    let n = 0;
    for (const el of zeilen) {
      const zeigen = sichtbar(el);
      el.hidden = !zeigen;
      if (zeigen) n++;
    }
    if (anzahl) anzahl.textContent = String(n);
    if (leer) leer.hidden = n > 0;

    const params = new URLSearchParams();
    if (a.q) params.set('q', a.q);
    for (const k of ['monat', 'typ', 'fuer', 'thema', 'extra'] as const) if (a[k].length) params.set(k, a[k].join(','));
    const qs = params.toString();
    history.replaceState(null, '', qs ? `?${qs}` : location.pathname);
  };

  const setze = (name: string, wert: string) => {
    if (name === 'saison') {
      const monate = SAISON[wert] ?? [];
      for (const input of form.querySelectorAll<HTMLInputElement>('input[name="monat"]')) {
        input.checked = monate.includes(input.value);
      }
    } else {
      for (const input of form.querySelectorAll<HTMLInputElement>(`input[name="${CSS.escape(name)}"]`)) {
        input.checked = input.value === wert;
      }
    }
    anwenden();
    root.scrollIntoView({ block: 'start' });
  };

  const url = new URLSearchParams(location.search);
  const q = url.get('q');
  if (q && suche) suche.value = q;
  const saison = url.get('saison');
  const monateAusSaison = saison && SAISON[saison] ? SAISON[saison] : [];
  for (const w of [...(url.get('monat') ?? '').split(',').filter(Boolean), ...monateAusSaison]) {
    const input = form.querySelector<HTMLInputElement>(`input[name="monat"][value="${CSS.escape(w)}"]`);
    if (input) input.checked = true;
  }
  for (const k of ['typ', 'fuer', 'thema', 'extra']) {
    for (const w of (url.get(k) ?? '').split(',').filter(Boolean)) {
      const input = form.querySelector<HTMLInputElement>(`input[name="${k}"][value="${CSS.escape(w)}"]`);
      if (input) input.checked = true;
    }
  }

  form.addEventListener('change', () => anwenden());
  form.addEventListener('input', (ev) => {
    if ((ev.target as HTMLElement).getAttribute('name') === 'q') anwenden();
  });
  form.addEventListener('reset', () => setTimeout(anwenden));
  root.querySelector('[data-zuruecksetzen]')?.addEventListener('click', () => form.reset());

  document.addEventListener('click', (ev) => {
    const knopf = (ev.target as HTMLElement | null)?.closest<HTMLElement>('[data-set-filter]');
    if (!knopf || !root.contains(knopf) && !knopf.closest('[data-entdecken-inhalt]')) return;
    const name = knopf.dataset.setFilter;
    const wert = knopf.dataset.wert;
    if (!name || !wert) return;
    ev.preventDefault();
    if (knopf.dataset.ersetzen === 'ja') {
      for (const input of form.querySelectorAll<HTMLInputElement>('input')) {
        if (input.type === 'search') input.value = '';
        else input.checked = false;
      }
    }
    setze(name, wert);
  });

  anwenden();
}
