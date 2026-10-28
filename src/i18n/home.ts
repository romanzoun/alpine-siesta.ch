import type { Locale } from './config';

export type HomeLocale = {
  title: string;
  description: string;
  hero: { titel: string[]; untertitel: string; alt?: string };
  highlights: { titel: string; text: string }[];
  vorteile: string[];
  bewertungen: { text: string; name: string; quelle: string }[];
  faq: { frage: string; antwort: string }[];
};

const en: HomeLocale = {
  title: 'Alpine Siesta – family apartment in Leukerbad',
  description: 'A family apartment in Leukerbad. Book with us, a short walk from the thermal baths and the Gemmi cable car.',
  hero: { titel: ['Thermal water.', 'The Gemmi face.', 'Siesta.'], untertitel: 'Our apartment in Leukerbad, a short walk from the hot springs. You arrive, and then you stop.', alt: 'Mug on the Alpine Siesta balcony with the Gemmi face behind' },
  highlights: [
    { titel: 'The largest thermal village in the Alps', text: 'More than 3.9 million litres of hot water come out of the springs in Leukerbad every day. You walk there from the apartment.' },
    { titel: 'Summer and winter', text: 'A walk on the Gemmi, a via ferrata, skiing at Torrent, and then the warm water. You do not have to do all of it.' },
    { titel: 'A village, not a resort', text: '[TODO] A mountain village at the end of the valley. No through traffic. Just the mountains.' },
    { titel: 'Made for families', text: '[TODO] Paddling pools, playgrounds, short walks. A holiday that does not need a timetable.' },
  ],
  vorteile: ['A lower price than on Booking.com and Airbnb', 'You write to us, and we write back', '[TODO] Flexible cancellation'],
  bewertungen: [
    { text: '[TODO] A sentence from a real review.', name: '[TODO] First name', quelle: 'Airbnb' },
    { text: '[TODO] A sentence from a real review.', name: '[TODO] First name', quelle: 'Booking.com' },
  ],
  faq: [
    { frage: 'How do I get to Leukerbad?', antwort: '[TODO] Train to Leuk, then the bus. By car via Leuk.' },
    { frage: 'When are check-in and check-out?', antwort: 'Check-in from 15:00, check-out until 11:00.' },
    { frage: 'Is there parking?', antwort: 'Yes. One outdoor parking space is included.' },
    { frage: 'Are pets allowed?', antwort: 'House-trained pets are welcome.' },
  ],
};

const fr: HomeLocale = {
  title: 'Alpine Siesta – appartement pour familles à Loèche-les-Bains',
  description: 'Un appartement pour familles à Loèche-les-Bains. Tu réserves chez nous, à quelques minutes des thermes et du téléphérique de la Gemmi.',
  hero: { titel: ['Eau thermale.', 'Paroi de la Gemmi.', 'Siesta.'], untertitel: 'Notre appartement à Loèche-les-Bains, à quelques pas des sources chaudes. Tu arrives, et ensuite tu t’arrêtes.', alt: 'Tasse sur le balcon d’Alpine Siesta avec la paroi de la Gemmi' },
  highlights: [
    { titel: 'Le plus grand village thermal des Alpes', text: 'Plus de 3,9 millions de litres d’eau chaude sortent chaque jour des sources de Loèche-les-Bains. Depuis l’appartement, tu y vas à pied.' },
    { titel: 'Été comme hiver', text: 'Une marche à la Gemmi, une via ferrata, le ski à Torrent, puis l’eau chaude. Tu n’es pas obligé de tout faire.' },
    { titel: 'Un village, pas une station', text: '[TODO] Un village de montagne au bout de la vallée. Pas de transit. Seulement les montagnes.' },
    { titel: 'Pensé pour les familles', text: '[TODO] Bassins pour enfants, places de jeux, courts trajets. Des vacances sans emploi du temps.' },
  ],
  vorteile: ['Moins cher que sur Booking.com et Airbnb', 'Tu nous écris, on te répond', '[TODO] Annulation souple'],
  bewertungen: [
    { text: '[TODO] Une phrase d’un vrai avis.', name: '[TODO] Prénom', quelle: 'Airbnb' },
    { text: '[TODO] Une phrase d’un vrai avis.', name: '[TODO] Prénom', quelle: 'Booking.com' },
  ],
  faq: [
    { frage: 'Comment venir à Loèche-les-Bains ?', antwort: '[TODO] Train jusqu’à Loèche, puis le bus. En voiture par Loèche.' },
    { frage: 'Quand sont l’arrivée et le départ ?', antwort: 'Arrivée dès 15 h, départ jusqu’à 11 h.' },
    { frage: 'Y a-t-il un parking ?', antwort: 'Oui. Une place de parc extérieure est comprise.' },
    { frage: 'Les animaux sont-ils acceptés ?', antwort: 'Les animaux propres sont les bienvenus.' },
  ],
};

const it: HomeLocale = {
  title: 'Alpine Siesta – appartamento per famiglie a Leukerbad',
  description: 'Un appartamento per famiglie a Leukerbad. Prenoti da noi, a pochi minuti dalle terme e dalla funivia della Gemmi.',
  hero: { titel: ['Acqua termale.', 'Parete della Gemmi.', 'Siesta.'], untertitel: 'Il nostro appartamento a Leukerbad, a pochi passi dalle sorgenti calde. Arrivi, e poi ti fermi.', alt: 'Tazza sul balcone di Alpine Siesta con la parete della Gemmi' },
  highlights: [
    { titel: 'Il più grande paese termale delle Alpi', text: 'Più di 3,9 milioni di litri d’acqua calda escono ogni giorno dalle sorgenti di Leukerbad. Dall’appartamento ci vai a piedi.' },
    { titel: 'Estate e inverno', text: 'Una camminata sulla Gemmi, una via ferrata, lo sci a Torrent, e poi l’acqua calda. Non devi fare tutto.' },
    { titel: 'Un paese, non un resort', text: '[TODO] Un villaggio di montagna in fondo alla valle. Niente traffico di passaggio. Solo le montagne.' },
    { titel: 'Pensato per le famiglie', text: '[TODO] Piscine per bambini, parchi giochi, tragitti corti. Vacanze senza orario.' },
  ],
  vorteile: ['Meno che su Booking.com e Airbnb', 'Ci scrivi, ti rispondiamo noi', '[TODO] Disdetta flessibile'],
  bewertungen: [
    { text: '[TODO] Una frase da una recensione vera.', name: '[TODO] Nome', quelle: 'Airbnb' },
    { text: '[TODO] Una frase da una recensione vera.', name: '[TODO] Nome', quelle: 'Booking.com' },
  ],
  faq: [
    { frage: 'Come si arriva a Leukerbad?', antwort: '[TODO] Treno fino a Leuk, poi il bus. In auto da Leuk.' },
    { frage: 'Quando sono check-in e check-out?', antwort: 'Check-in dalle 15:00, check-out entro le 11:00.' },
    { frage: 'C’è un parcheggio?', antwort: 'Sì. Un posto auto esterno è compreso.' },
    { frage: 'Sono ammessi gli animali?', antwort: 'Gli animali puliti sono i benvenuti.' },
  ],
};

export function homeLocale(locale: Locale): HomeLocale | null {
  if (locale === 'en') return en;
  if (locale === 'fr') return fr;
  if (locale === 'it') return it;
  return null;
}
