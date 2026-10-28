import type { Locale } from './config';

export type RechtBlock = { titel?: string; absatz: string[] };
export type RechtText = { title: string; description: string; bloecke: RechtBlock[] };

const texte: Record<Exclude<Locale, 'de'>, Record<string, RechtText>> = {
  en: {
    impressum: {
      title: 'Legal notice',
      description: 'Legal notice for Alpine Siesta, a holiday apartment in Leukerbad, Valais. Who is responsible for the content and bookings.',
      bloecke: [
        { titel: 'Responsible for the content', absatz: ['[TODO] First and last name', '[TODO] Street, postcode, place', 'Switzerland', 'Email: [TODO]', '[TODO] If applicable: company, UID number, commercial register entry.'] },
      ],
    },
    datenschutz: {
      title: 'Privacy',
      description: 'How Alpine Siesta handles personal data under the Swiss Data Protection Act.',
      bloecke: [
        { absatz: ['[TODO] Privacy notice under the revised Swiss Data Protection Act. It still has to name the person responsible, which data (booking, contact, shop orders), purposes, recipients and processors (hosting Infomaniak, Beds24, Stripe, Gelato, Resend, statistics), disclosure abroad, retention, and the rights of the people concerned. Have it reviewed before the site goes live.'] },
        { titel: 'Contact form', absatz: ['[TODO] Have this text reviewed. Draft: if you write through the contact form, we receive your name, email address, message and, if you give them, travel dates and number of guests by email. We use these details only to answer your enquiry.'] },
        { titel: 'Offers by email (booking calendar)', absatz: ['[TODO] Have this text reviewed. Draft: if you enter your email in the booking calendar and tick the box, we store the address, the dates you chose, the number of guests, and the time and wording of your consent. If you do not book, we send at most four emails: a reminder, a short question about whether something was missing, and offers if a date in your chosen period becomes free (possibly with a discount). We check whether a booking arrived for your address, and we count clicks on links in these emails so we can improve the offer. The data is processed by our provider Trizoun Travel (Switzerland) and deleted at the latest 30 days after your chosen date. You can unsubscribe any time with the link in each email.'] },
      ],
    },
    agb: {
      title: 'Terms',
      description: 'Terms for bookings of the holiday apartment and for shop orders at Alpine Siesta.',
      bloecke: [
        { absatz: ['[TODO] Booking: how the contract is formed, prices including the visitor’s tax, deposit, cancellation, house rules, liability.'] },
        { absatz: ['[TODO] Shop (once it is live): delivery, returns, warranty.'] },
      ],
    },
  },
  fr: {
    impressum: {
      title: 'Mentions légales',
      description: 'Mentions légales d’Alpine Siesta, appartement de vacances à Loèche-les-Bains, Valais. Qui répond du contenu et des réservations.',
      bloecke: [
        { titel: 'Responsable du contenu', absatz: ['[TODO] Prénom et nom', '[TODO] Rue, code postal, lieu', 'Suisse', 'E-mail : [TODO]', '[TODO] S’il y a lieu : société, numéro IDE, inscription au registre du commerce.'] },
      ],
    },
    datenschutz: {
      title: 'Protection des données',
      description: 'Comment Alpine Siesta traite les données personnelles selon la loi suisse sur la protection des données.',
      bloecke: [
        { absatz: ['[TODO] Déclaration selon la nLPD. Elle doit encore nommer la personne responsable, les données (réservation, contact, commandes), les buts, les destinataires et les sous-traitants (hébergement Infomaniak, Beds24, Stripe, Gelato, Resend, statistique), la communication à l’étranger, la conservation et les droits des personnes concernées. À faire vérifier avant la mise en ligne.'] },
        { titel: 'Formulaire de contact', absatz: ['[TODO] Faire vérifier ce texte. Proposition : si tu écris via le formulaire, nous recevons par e-mail le nom, l’adresse e-mail, le message et, si tu les indiques, les dates et le nombre d’hôtes. Nous utilisons ces données uniquement pour répondre à ta demande.'] },
        { titel: 'Offres par e-mail (calendrier)', absatz: ['[TODO] Faire vérifier ce texte. Proposition : si tu indiques ton e-mail dans le calendrier et coches la case, nous enregistrons l’adresse, la période choisie, le nombre d’hôtes, ainsi que le moment et le texte de ton consentement. Sans réservation, nous envoyons au plus quatre e-mails : un rappel, une courte question, et des offres si une date se libère dans ta période (éventuellement avec un rabais). Nous vérifions si une réservation est arrivée pour ton adresse et nous comptons les clics sur les liens de ces e-mails pour améliorer l’offre. Les données sont traitées par notre prestataire Trizoun Travel (Suisse) et effacées au plus tard 30 jours après la date souhaitée. Désinscription à tout moment via le lien dans chaque e-mail.'] },
      ],
    },
    agb: {
      title: 'Conditions',
      description: 'Conditions pour les réservations de l’appartement et les commandes de la boutique Alpine Siesta.',
      bloecke: [
        { absatz: ['[TODO] Réservation : conclusion du contrat, prix taxe de séjour comprise, acompte, annulation, règlement intérieur, responsabilité.'] },
        { absatz: ['[TODO] Boutique (dès qu’elle est en ligne) : livraison, retour, garantie.'] },
      ],
    },
  },
  it: {
    impressum: {
      title: 'Note legali',
      description: 'Note legali di Alpine Siesta, appartamento per vacanze a Leukerbad, Vallese. Chi risponde dei contenuti e delle prenotazioni.',
      bloecke: [
        { titel: 'Responsabile dei contenuti', absatz: ['[TODO] Nome e cognome', '[TODO] Via, CAP, luogo', 'Svizzera', 'E-mail: [TODO]', '[TODO] Se esiste: società, numero IDI, iscrizione al registro di commercio.'] },
      ],
    },
    datenschutz: {
      title: 'Protezione dei dati',
      description: 'Come Alpine Siesta tratta i dati personali secondo la legge svizzera sulla protezione dei dati.',
      bloecke: [
        { absatz: ['[TODO] Informativa secondo la nLPD. Deve ancora indicare il responsabile, quali dati (prenotazione, contatto, ordini), scopi, destinatari e incaricati (hosting Infomaniak, Beds24, Stripe, Gelato, Resend, statistica), comunicazione all’estero, conservazione e diritti delle persone interessate. Da far controllare prima della messa online.'] },
        { titel: 'Modulo di contatto', absatz: ['[TODO] Far controllare il testo. Bozza: se scrivi dal modulo, riceviamo per e-mail nome, indirizzo, messaggio e, se li indichi, date e numero di ospiti. Usiamo questi dati solo per rispondere alla richiesta.'] },
        { titel: 'Offerte per e-mail (calendario)', absatz: ['[TODO] Far controllare il testo. Bozza: se indichi l’e-mail nel calendario e spunti la casella, salviamo indirizzo, periodo scelto, numero di ospiti, momento e testo del consenso. Se non prenoti, inviamo al massimo quattro e-mail: un promemoria, una breve domanda e offerte se si libera una data nel periodo scelto (eventualmente con uno sconto). Controlliamo se è arrivata una prenotazione per il tuo indirizzo e contiamo i clic sui link di queste e-mail per migliorare l’offerta. I dati sono trattati dal nostro fornitore Trizoun Travel (Svizzera) e cancellati al più tardi 30 giorni dopo la data scelta. Disiscrizione in ogni momento con il link in ogni e-mail.'] },
      ],
    },
    agb: {
      title: 'Condizioni',
      description: 'Condizioni per le prenotazioni dell’appartamento e per gli ordini del negozio Alpine Siesta.',
      bloecke: [
        { absatz: ['[TODO] Prenotazione: conclusione del contratto, prezzi tassa di soggiorno inclusa, acconto, disdetta, regolamento, responsabilità.'] },
        { absatz: ['[TODO] Negozio (quando è online): consegna, reso, garanzia.'] },
      ],
    },
  },
};

export function rechtText(locale: Locale, id: string): RechtText | null {
  if (locale === 'de') return null;
  return texte[locale][id] ?? null;
}

export function fusszeile(locale: Locale, ort: string, region: string): string {
  if (locale === 'en') return `Holiday apartment in ${ort}, ${region}`;
  if (locale === 'fr') return `Appartement de vacances à ${ort}, ${region}`;
  if (locale === 'it') return `Appartamento per vacanze a ${ort}, ${region}`;
  return `Ferienwohnung in ${ort}, ${region}`;
}
