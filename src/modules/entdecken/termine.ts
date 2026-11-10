import { ortszeit, tagSchluessel, teile, ZEITZONE } from '../../lib/zeit';
import type { Eintrag, Termin } from './typen';

const datumsFormat = new Intl.DateTimeFormat('de-CH', {
  weekday: 'short',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: ZEITZONE,
});
const zeitFormat = new Intl.DateTimeFormat('de-CH', { hour: '2-digit', minute: '2-digit', timeZone: ZEITZONE });

export function terminText(t: Termin) {
  const beginn = ortszeit(t.beginn);
  const ende = t.ende ? ortszeit(t.ende) : undefined;
  const mitZeit = (d: Date) => {
    const z = teile(d);
    return z.hour || z.minute ? `${datumsFormat.format(d)}, ${zeitFormat.format(d)}` : datumsFormat.format(d);
  };
  if (!ende) return mitZeit(beginn);
  return tagSchluessel(ende) === tagSchluessel(beginn)
    ? `${mitZeit(beginn)}–${zeitFormat.format(ende)}`
    : `${mitZeit(beginn)} bis ${mitZeit(ende)}`;
}

export function naechsterTermin(e: Eintrag, ab = new Date()) {
  const heute = tagSchluessel(ab);
  return e.termine
    .filter((t) => tagSchluessel(ortszeit(t.beginn)) > heute)
    .sort((x, y) => ortszeit(x.beginn).getTime() - ortszeit(y.beginn).getTime())[0];
}

export function kommendeTermine(e: Eintrag, ab = new Date()) {
  const heute = tagSchluessel(ab);
  return e.termine
    .filter((t) => tagSchluessel(ortszeit(t.beginn)) > heute)
    .sort((x, y) => ortszeit(x.beginn).getTime() - ortszeit(y.beginn).getTime());
}
