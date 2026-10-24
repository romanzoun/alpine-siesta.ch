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
  email: 'hallo@alpine-siesta.ch', // [TODO] echte Adresse
  // Rückfallebene, falls die Online-Buchung (Trizoun Travel) nicht erreichbar oder nicht eingerichtet ist.
  anfrageUrl: 'mailto:hallo@alpine-siesta.ch?subject=Buchungsanfrage%20Alpine%20Siesta',
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
    sommer: 'Wandern & Sommer',
    winter: 'Winter & Ski',
    reisetipps: 'Anreise & Wallis-Ausflüge',
  },

  // Weitere Menüpunkte. «Wohnung(en)» und «Leukerbad» werden automatisch ergänzt.
  nav: [{ href: '/entdecken/', label: 'Entdecken' }],
} as const;
