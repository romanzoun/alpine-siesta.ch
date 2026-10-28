import type { Locale } from './config';

export type RechtBlock = { titel?: string; absatz: string[] };
// «deutsch»: Hinweis, dass nur die deutsche Fassung existiert. Dann zeigt die Seite den deutschen Text aus site/rechtliches/.
export type RechtText = { title: string; description: string; bloecke: RechtBlock[]; deutsch?: string };

const texte: Record<Exclude<Locale, 'de'>, Record<string, RechtText>> = {
  en: {
    impressum: {
      title: "Legal notice",
      description: "Legal notice for Alpine Siesta, a holiday apartment in Leukerbad, Valais. Operator, contact and who is responsible for the content.",
      bloecke: [
        { titel: "Operator", absatz: ["Trizoun - Tourismus & Digital", "Simple partnership of Roman Zoun and Ivayla Trifonova", "Hauptstrasse 32d", "5506 Mägenwil", "Switzerland"] },
        { titel: "Contact", absatz: ["Email: info@alpine-siesta.ch"] },
        { titel: "Business identification number", absatz: ["UID CHE-280.882.880. The partnership is not entered in the commercial register and is not registered for VAT."] },
        { titel: "Responsible for the content", absatz: ["Roman Zoun and Ivayla Trifonova"] },
        { titel: "Liability", absatz: ["We check the content of this website carefully, but cannot guarantee that it is correct, complete and up to date. Details about cable cars, tours, opening hours and prices of third parties can change. The information of the respective provider applies.", "Links lead to third-party websites such as Booking.com, Airbnb or Leukerbad Tourismus. Their operators are responsible for their content."] },
        { titel: "Images", absatz: ["The photos of the apartment and of many places are our own. Some photos in the travel guide come from Wikimedia Commons under free licences. The author and licence are given at the end of each page."] },
      ],
    },
    datenschutz: {
      title: "Privacy",
      description: "How Alpine Siesta handles personal data under the Swiss Data Protection Act.",
      bloecke: [],
      deutsch: "This privacy policy exists in German only. The German version applies.",
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
      title: "Mentions légales",
      description: "Mentions légales d’Alpine Siesta, appartement de vacances à Loèche-les-Bains, Valais. Exploitant, contact et responsables du contenu.",
      bloecke: [
        { titel: "Exploitant", absatz: ["Trizoun - Tourismus & Digital", "Société simple de Roman Zoun et Ivayla Trifonova", "Hauptstrasse 32d", "5506 Mägenwil", "Suisse"] },
        { titel: "Contact", absatz: ["E-mail : info@alpine-siesta.ch"] },
        { titel: "Numéro d’identification des entreprises", absatz: ["IDE CHE-280.882.880. La société n’est pas inscrite au registre du commerce et n’est pas assujettie à la TVA."] },
        { titel: "Responsables du contenu", absatz: ["Roman Zoun et Ivayla Trifonova"] },
        { titel: "Responsabilité", absatz: ["Nous vérifions soigneusement le contenu de ce site, sans garantir qu’il soit exact, complet et à jour. Les informations sur les remontées, les tours, les horaires et les prix de tiers peuvent changer. Les indications du prestataire concerné font foi.", "Les liens mènent vers des sites de tiers, par exemple Booking.com, Airbnb ou Leukerbad Tourismus. Leurs exploitants sont responsables de leur contenu."] },
        { titel: "Images", absatz: ["Les photos de l’appartement et de nombreux lieux sont les nôtres. Quelques photos du guide viennent de Wikimedia Commons sous licence libre. L’auteur et la licence figurent en bas de chaque page."] },
      ],
    },
    datenschutz: {
      title: "Protection des données",
      description: "Comment Alpine Siesta traite les données personnelles selon la loi suisse sur la protection des données.",
      bloecke: [],
      deutsch: "Cette déclaration n’existe qu’en allemand. La version allemande fait foi.",
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
      title: "Note legali",
      description: "Note legali di Alpine Siesta, appartamento per vacanze a Leukerbad, Vallese. Gestore, contatto e responsabili dei contenuti.",
      bloecke: [
        { titel: "Gestore", absatz: ["Trizoun - Tourismus & Digital", "Società semplice di Roman Zoun e Ivayla Trifonova", "Hauptstrasse 32d", "5506 Mägenwil", "Svizzera"] },
        { titel: "Contatto", absatz: ["E-mail: info@alpine-siesta.ch"] },
        { titel: "Numero d’identificazione delle imprese", absatz: ["IDI CHE-280.882.880. La società non è iscritta al registro di commercio e non è assoggettata all’IVA."] },
        { titel: "Responsabili dei contenuti", absatz: ["Roman Zoun e Ivayla Trifonova"] },
        { titel: "Responsabilità", absatz: ["Controlliamo con cura i contenuti di questo sito, ma non garantiamo che siano corretti, completi e aggiornati. Le informazioni su impianti, tour, orari e prezzi di terzi possono cambiare. Fanno fede le indicazioni del rispettivo fornitore.", "I link portano a siti di terzi, per esempio Booking.com, Airbnb o Leukerbad Tourismus. Dei loro contenuti rispondono i rispettivi gestori."] },
        { titel: "Immagini", absatz: ["Le foto dell’appartamento e di molti luoghi sono nostre. Alcune foto della guida vengono da Wikimedia Commons con licenza libera. Autore e licenza sono indicati in fondo a ogni pagina."] },
      ],
    },
    datenschutz: {
      title: "Protezione dei dati",
      description: "Come Alpine Siesta tratta i dati personali secondo la legge svizzera sulla protezione dei dati.",
      bloecke: [],
      deutsch: "Questa informativa esiste solo in tedesco. Fa fede la versione tedesca.",
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
