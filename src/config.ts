// Zentrale Einstellungen der Website.
export const site = {
  name: 'Alpine Siesta',
  email: 'hallo@alpine-siesta.ch', // [TODO] echte Adresse
  // Bis die Beds24-Anbindung steht, führt «Jetzt buchen» zu einer Mail-Anfrage.
  buchungUrl: 'mailto:hallo@alpine-siesta.ch?subject=Buchungsanfrage%20Alpine%20Siesta',
  // Der Wohnungs-Link wird automatisch vorangestellt (siehe lib/wohnungen.ts).
  nav: [
    { href: '/entdecken/', label: 'Entdecken' },
  ],
};
