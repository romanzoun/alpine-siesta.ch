// ─────────────────────────────────────────────────────────────
// Einstellungen dieser Website. Alles, was zu Alpine Siesta gehört,
// liegt im Ordner site/ – der Code in src/ ist für alle Websites gleich.
// Übersicht, welche Datei wohin gehört: site/README.md
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Alpine Siesta',
  domain: 'https://alpine-siesta.ch',
  sprache: 'de-CH',
  // Ort für Titel und Texte («Leukerbad im Winter»)
  ort: 'Leukerbad',
  region: 'Wallis',
  email: 'info@alpine-siesta.ch',
  // Rückfallebene, falls die Online-Buchung (Trizoun Travel) nicht erreichbar oder nicht eingerichtet ist.
  anfrageUrl: 'mailto:info@alpine-siesta.ch?subject=Buchungsanfrage%20Alpine%20Siesta',
  waehrung: 'CHF',
  // Einwilligung im Buchungs-Widget (Wortlaut wird mit der Anfrage gespeichert).
  // «kampagne»: Erinnerung, kurze Nachfrage und Angebote zu freien Terminen im Wunschzeitraum.
  // «einmalig»: nur eine Erinnerung – dann den Text entsprechend anpassen.
  erinnerungEinwilligung:
    'Haltet mich per E-Mail zu meinem Wunschtermin auf dem Laufenden – mit Angeboten, falls in diesem Zeitraum etwas frei wird (höchstens 4 Mails, Abmeldung jederzeit).',
  einwilligungUmfang: 'kampagne' as 'kampagne' | 'einmalig',

  // SEO-Bereich: URL-Anfang der Pillar Pages (/leukerbad/thermen/…)
  seoPfad: 'leukerbad',
  // Die Pillar-Themen. Schlüssel = Ordnername in site/pillars/ und Wert für «pillar» bei Aktivitäten.
  pillars: {
    thermen: 'Thermen & Wellness',
    familie: 'Familienferien',
    zermatt: 'Zermatt',
    wein: 'Wein im Wallis',
    sommer: 'Wandern & Sommer',
    biken: 'Biken & E-Bike',
    winter: 'Winter & Ski',
    reisetipps: 'Anreise & Wallis-Ausflüge',
  },

  // Bausteine, die schrittweise dazukommen. Phase 1: Wohnung, Reiseführer, Kontaktformular,
  // Links zu Booking.com/Airbnb (pro Wohnung in site/wohnungen/<slug>/index.md unter «plattformen»).
  module: {
    // «Entdecken» (Aktivitäten + Events aus dem Katalog, Zusatzdienst von Trizoun Travel)
    entdecken: false,
  },
  // Besucherstatistik mit Microsoft Clarity. Lädt erst, wenn der Gast im Banner zustimmt. Leer = aus.
  statistik: {
    clarity: 'z4y524ersy' as string,
  },
  // Kontaktformular: Ohne Endpunkt öffnet «Anfrage senden» eine vorausgefüllte E-Mail an «email».
  // Sobald das Backend läuft: URL eintragen (POST JSON → { ok: true }).
  kontakt: {
    endpunkt: '' as string,
  },

  // Zentraler Aktivitäten-Katalog (Git-Repo). Der Sync spiegelt die Region nach site/katalog/.
  katalog: {
    repo: 'https://github.com/romanzoun/trizoun-katalog.git',
    region: 'leukerbad',
    ref: 'main',
  },

  // Weitere Menüpunkte. «Wohnung(en)», «Leukerbad», «Entdecken» (wenn aktiv) und «Kontakt» kommen automatisch.
  nav: [] as { href: string; label: string }[],
} as const;
