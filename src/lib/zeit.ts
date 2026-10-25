// Termine sind Ortszeit der Region (Schweiz). Zeiten ohne Zeitzonenangabe werden als Europe/Zurich gelesen
// und immer in Europe/Zurich angezeigt – unabhängig davon, wo der Build läuft.
export const ZEITZONE = 'Europe/Zurich';

// Versatz der Zeitzone zu UTC (Minuten) für einen Zeitpunkt
function versatz(utc: Date) {
  const teile = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: ZEITZONE, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).formatToParts(utc).map((p) => [p.type, p.value]));
  const lokal = Date.UTC(+teile.year!, +teile.month! - 1, +teile.day!, +teile.hour!, +teile.minute!, +teile.second!);
  return (lokal - utc.getTime()) / 60_000;
}

// «2027-02-13» oder «2027-02-13T20:00» (Ortszeit) oder mit Zeitzone («…Z», «…+01:00»)
export function ortszeit(wert: string | Date): Date {
  if (wert instanceof Date) return wert;
  if (/[zZ]|[+-]\d\d:?\d\d$/.test(wert)) return new Date(wert);
  const m = wert.match(/^(\d{4})-(\d\d)-(\d\d)(?:[T ](\d\d):(\d\d)(?::(\d\d))?)?$/);
  if (!m) throw new Error(`Ungültiges Datum: ${wert}`);
  const alsUtc = Date.UTC(+m[1]!, +m[2]! - 1, +m[3]!, +(m[4] ?? 0), +(m[5] ?? 0), +(m[6] ?? 0));
  // Zweimal korrigieren, damit Umstellungen Sommer-/Winterzeit stimmen
  let t = alsUtc - versatz(new Date(alsUtc)) * 60_000;
  t = alsUtc - versatz(new Date(t)) * 60_000;
  return new Date(t);
}

export const teile = (d: Date) =>
  Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: ZEITZONE, hourCycle: 'h23', month: 'numeric', hour: 'numeric', minute: 'numeric', year: 'numeric', day: 'numeric' }).formatToParts(d).map((p) => [p.type, Number(p.value)])) as Record<'year' | 'month' | 'day' | 'hour' | 'minute', number>;
