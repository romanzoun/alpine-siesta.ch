import type { Locale } from './config';

export type Abschnitt = { titel: string; absatz: string[] };
export type Bildtext = { raum: string; alt: string; text: string };

export type WohnungLocale = {
  titel: (name: string, ort: string) => string;
  claim: string;
  beschreibung: string;
  stockwerk: string;
  parkplatz: string;
  checkin: string;
  checkout: string;
  haustiere: string;
  rauchen: string;
  hinweise: string[];
  ausstattung: { kategorie: string; items: string[] }[];
  wie: Record<string, string>;
  ziel: Record<string, string>;
  hoehe: string;
  abschnitte: Abschnitt[];
  bilder: Bildtext[];
};

const bilderEn: Bildtext[] = [
  { raum: 'Balcony', alt: 'Mug on the Alpine Siesta balcony with the Gemmi face behind', text: 'This is the balcony for sitting. The Gemmi face is right there. Morning starts with coffee in the sun.' },
  { raum: 'Living room', alt: 'Alpine Siesta living room with sofa, balcony door and mountain view', text: 'The living room is the third room: a sofa bed for two, and the door out to the mountains.' },
  { raum: 'Living room', alt: 'Alpine Siesta living room with armchair, TV and Christmas tree', text: 'Armchair, television, and a Christmas tree in winter. Once the children are in bed, this room is still yours.' },
  { raum: 'Living room', alt: 'Alpine Siesta living room with Christmas tree, TV and electric fire', text: 'The electric fire and the television share this corner. One of the three rooms.' },
  { raum: 'Living room', alt: 'Supper at the wooden table in front of the electric fire', text: 'Supper at the wooden table, in front of the fire. There is room for the whole family.' },
  { raum: 'Meals', alt: 'Cheese fondue in a caquelon with salami, gherkins, pineapple and tomatoes', text: 'Fondue on the induction hob, and a raclette when you would rather that.' },
  { raum: 'Meals', alt: 'Close-up of cheese fondue as bread is lifted from the caquelon', text: 'The caquelon with the mountain scene sits on the burner. These evenings are what the kitchen is for.' },
  { raum: 'Meals', alt: 'Alpine Siesta dining table set for fondue, with a high chair', text: 'The table is set for several people. The high chair is ready for the little one.' },
  { raum: 'Kitchen', alt: 'Alpine Siesta kitchen with sage cabinets, induction hob and oven', text: 'A new kitchen: sage cabinets, induction, an oven that heats quickly, and a sink big enough after a family meal.' },
  { raum: 'Kitchen', alt: 'Alpine Siesta kitchen run with sink, induction hob and oven', text: 'New dishwasher, induction hob, oven. Coffee is the CoffeeB machine, or the moka pot if you want it Italian.' },
  { raum: 'Bedroom', alt: 'Alpine Siesta bedroom with double bed, mirror and window', text: 'The double room sleeps two. With the children’s room and the sofa bed, that is three rooms.' },
  { raum: 'Children’s room', alt: 'Alpine Siesta children’s room with two beds, shelves and a red rocking toy', text: 'Two single beds, shelves and a rocking toy. When they are asleep, the living room stays quiet.' },
  { raum: 'Children’s room', alt: 'Alpine Siesta children’s room with mountain view, play kitchen and rocking toy', text: 'The rock face is outside this window. Play kitchen, rocking toy, two beds.' },
  { raum: 'Around', alt: 'Residential street in Leukerbad with a wooden house and mountains', text: 'A street in the village, not the apartment. The baths, the centre and the sports arena are about ten minutes on foot.' },
  { raum: 'Gemmi pass', alt: 'Coffee cup with the red cable car and a sea of cloud on the Gemmi pass', text: 'The place, not the apartment. The Gemmi cable car is five minutes on foot.' },
  { raum: 'Gemmi', alt: 'Red viewpoint sign on the Gemmi with peaks above Leukerbad', text: 'Looking down on Leukerbad from the Gemmi. The sign belongs to the mountain. We keep photos like this with the apartment.' },
  { raum: 'Outing', alt: 'Barbecue with sausage and meat in front of an alpine meadow and a rock face', text: 'A barbecue on the alp above the village. The surroundings, not the apartment.' },
];

const bilderFr: Bildtext[] = [
  { raum: 'Balcon', alt: 'Tasse sur le balcon d’Alpine Siesta avec la paroi de la Gemmi', text: 'C’est le balcon pour s’asseoir. La Gemmi est juste là. Le matin commence par le café au soleil.' },
  { raum: 'Séjour', alt: 'Séjour d’Alpine Siesta avec canapé, porte du balcon et vue sur les montagnes', text: 'Le séjour est la troisième pièce : un canapé-lit pour deux, et la porte vers les montagnes.' },
  { raum: 'Séjour', alt: 'Séjour d’Alpine Siesta avec fauteuil, télévision et sapin de Noël', text: 'Fauteuil, télévision, et en hiver le sapin. Quand les enfants sont au lit, cette pièce reste à toi.' },
  { raum: 'Séjour', alt: 'Séjour d’Alpine Siesta avec sapin, télévision et cheminée électrique', text: 'La cheminée électrique et la télévision partagent ce coin. Une des trois pièces.' },
  { raum: 'Séjour', alt: 'Souper à la table en bois devant la cheminée électrique', text: 'Le souper à la table en bois, devant le feu. Il y a de la place pour toute la famille.' },
  { raum: 'Repas', alt: 'Fondue au fromage dans un caquelon, avec salami, cornichons, ananas et tomates', text: 'La fondue sur l’induction, et une raclette si tu préfères.' },
  { raum: 'Repas', alt: 'Gros plan de la fondue, le pain sort du caquelon', text: 'Le caquelon au panorama est sur le réchaud. C’est pour ces soirées-là que la cuisine est là.' },
  { raum: 'Repas', alt: 'Table d’Alpine Siesta mise pour la fondue, avec une chaise haute', text: 'La table est mise pour plusieurs. La chaise haute attend le petit.' },
  { raum: 'Cuisine', alt: 'Cuisine d’Alpine Siesta, façades vert sauge, induction et four', text: 'Une cuisine neuve : façades vert sauge, induction, un four qui chauffe vite, et un évier assez grand après le repas de famille.' },
  { raum: 'Cuisine', alt: 'Plan de travail d’Alpine Siesta avec évier, induction et four', text: 'Lave-vaisselle neuf, induction, four. Le café, c’est la machine CoffeeB, ou la moka si tu le veux italien.' },
  { raum: 'Chambre', alt: 'Chambre d’Alpine Siesta avec lit double, miroir et fenêtre', text: 'La chambre double, deux places. Avec la chambre d’enfants et le canapé-lit, ça fait trois pièces.' },
  { raum: 'Chambre d’enfants', alt: 'Chambre d’enfants d’Alpine Siesta, deux lits, étagère et cheval à bascule', text: 'Deux lits simples, une étagère et un cheval à bascule. Quand ils dorment, le séjour reste calme.' },
  { raum: 'Chambre d’enfants', alt: 'Chambre d’enfants d’Alpine Siesta avec vue sur la paroi, cuisine jouet et cheval à bascule', text: 'La paroi est derrière cette fenêtre. Cuisine jouet, cheval à bascule, deux lits.' },
  { raum: 'Alentours', alt: 'Rue d’habitation à Loèche-les-Bains avec une maison en bois et les montagnes', text: 'Une rue du village, pas l’appartement. Thermes, centre et arène de sport : environ dix minutes à pied.' },
  { raum: 'Col de la Gemmi', alt: 'Tasse de café, téléphérique rouge et mer de nuages au col de la Gemmi', text: 'Le lieu, pas l’appartement. Le téléphérique de la Gemmi est à cinq minutes à pied.' },
  { raum: 'Gemmi', alt: 'Panneau rouge sur la Gemmi avec les sommets au-dessus de Loèche-les-Bains', text: 'Loèche-les-Bains vu depuis la Gemmi. Le panneau est à la montagne. Ces photos-là restent avec l’appartement.' },
  { raum: 'Sortie', alt: 'Grill avec cervelas et viande devant un alpage et une paroi', text: 'Un grill sur l’alpage au-dessus du village. Les alentours, pas l’appartement.' },
];

const bilderIt: Bildtext[] = [
  { raum: 'Balcone', alt: 'Tazza sul balcone di Alpine Siesta con la parete della Gemmi', text: 'Questo è il balcone per stare seduti. La parete della Gemmi è lì. La mattina inizia con il caffè al sole.' },
  { raum: 'Soggiorno', alt: 'Soggiorno di Alpine Siesta con divano, porta del balcone e vista sulle montagne', text: 'Il soggiorno è la terza stanza: un divano letto per due, e la porta verso le montagne.' },
  { raum: 'Soggiorno', alt: 'Soggiorno di Alpine Siesta con poltrona, televisione e albero di Natale', text: 'Poltrona, televisione e in inverno l’albero. Quando i bambini sono a letto, questa stanza resta tua.' },
  { raum: 'Soggiorno', alt: 'Soggiorno di Alpine Siesta con albero, televisione e camino elettrico', text: 'Il camino elettrico e la televisione stanno nello stesso angolo. Una delle tre stanze.' },
  { raum: 'Soggiorno', alt: 'Cena al tavolo di legno davanti al camino elettrico', text: 'La cena al tavolo di legno, davanti al fuoco. C’è posto per tutta la famiglia.' },
  { raum: 'Pasti', alt: 'Fonduta di formaggio nel caquelon, con salame, cetriolini, ananas e pomodori', text: 'La fonduta sull’induzione, e la raclette se preferisci quella.' },
  { raum: 'Pasti', alt: 'Primo piano della fonduta, il pane esce dal caquelon', text: 'Il caquelon con il panorama sta sul fornello. La cucina è anche per queste sere.' },
  { raum: 'Pasti', alt: 'Tavolo di Alpine Siesta apparecchiato per la fonduta, con seggiolone', text: 'Il tavolo è apparecchiato per più persone. Il seggiolone aspetta il piccolo.' },
  { raum: 'Cucina', alt: 'Cucina di Alpine Siesta, frontali verde salvia, induzione e forno', text: 'Una cucina nuova: frontali verde salvia, induzione, un forno che scalda in fretta, e un lavello abbastanza grande dopo il pasto in famiglia.' },
  { raum: 'Cucina', alt: 'Piano di lavoro di Alpine Siesta con lavello, induzione e forno', text: 'Lavastoviglie nuova, induzione, forno. Il caffè è la macchina CoffeeB, o la moka se lo vuoi italiano.' },
  { raum: 'Camera', alt: 'Camera di Alpine Siesta con letto matrimoniale, specchio e finestra', text: 'La camera matrimoniale, due posti. Con la camera dei bambini e il divano letto sono tre stanze.' },
  { raum: 'Camera dei bambini', alt: 'Camera dei bambini di Alpine Siesta, due letti, scaffale e cavallo a dondolo', text: 'Due letti singoli, uno scaffale e un cavallo a dondolo. Quando dormono, il soggiorno resta tranquillo.' },
  { raum: 'Camera dei bambini', alt: 'Camera dei bambini di Alpine Siesta con vista sulla parete, cucina giocattolo e cavallo a dondolo', text: 'La parete è fuori da questa finestra. Cucina giocattolo, cavallo a dondolo, due letti.' },
  { raum: 'Dintorni', alt: 'Strada residenziale a Leukerbad con casa in legno e montagne', text: 'Una strada del paese, non l’appartamento. Terme, centro e arena sportiva: circa dieci minuti a piedi.' },
  { raum: 'Passo della Gemmi', alt: 'Tazza di caffè, funivia rossa e mare di nuvole al passo della Gemmi', text: 'Il luogo, non l’appartamento. La funivia della Gemmi è a cinque minuti a piedi.' },
  { raum: 'Gemmi', alt: 'Cartello rosso sulla Gemmi con le cime sopra Leukerbad', text: 'Leukerbad visto dalla Gemmi. Il cartello è della montagna. Foto così restano con l’appartamento.' },
  { raum: 'Gita', alt: 'Griglia con cervelat e carne davanti a un alpe e una parete di roccia', text: 'Una griglia sull’alpe sopra il paese. I dintorni, non l’appartamento.' },
];

function seiten(locale: 'en' | 'fr' | 'it', bilder: Bildtext[]): WohnungLocale {
  const gemeinsam = {
    bilder,
    checkin: locale === 'en' ? 'from 15:00' : locale === 'fr' ? 'dès 15 h' : 'dalle 15:00',
    checkout: locale === 'en' ? 'until 11:00' : locale === 'fr' ? 'jusqu’à 11 h' : 'entro le 11:00',
  };
  if (locale === 'en') {
    return {
      ...gemeinsam,
      titel: (name, ort) => `${name} in ${ort} – the apartment`,
      claim: 'Room for the whole family in Leukerbad, with the Gemmi face outside.',
      beschreibung: 'Family apartment in Leukerbad, 65 m². Three rooms, two beds in each, plus a cot you can fold out.',
      stockwerk: '1st floor, with a lift, no steps',
      parkplatz: '1 outdoor parking space included',
      haustiere: 'House-trained pets are welcome.',
      rauchen: 'On the balcony only.',
      hinweise: [
        'With a direct booking the visitor’s tax is included.',
        'On Booking.com and Airbnb the visitor’s tax is not included. It is due afterwards.',
        'Guest cards are ready for you and give a discount on offers in the area.',
      ],
      wie: { 'zu Fuss': 'on foot', Bus: 'by bus', Auto: 'by car' },
      ziel: {
        'Leukerbad Therme': 'Leukerbad thermal baths',
        'Zentrum oder Sportarena': 'Centre or sports arena',
        Gemmibahn: 'Gemmi cable car',
        'Haltestelle La Boheme': 'La Boheme stop',
        Torrentbahn: 'Torrent cable car',
      },
      hoehe: 'm above sea level',
      ausstattung: [
        { kategorie: 'Kitchen', items: ['Induction hob', 'Fast oven', 'Dishwasher', 'Large sink', 'Fondue set', 'Raclette', 'CoffeeB machine', 'Moka pot'] },
        { kategorie: 'Living', items: ['Wi-Fi', 'Smart TV', 'Xbox 360', 'Electric fire', 'Two balconies', 'Electric grill', 'Sofa bed for 2'] },
        { kategorie: 'Bathroom', items: ['Bathtub', 'Mirror cabinet', 'Toilet', 'Hairdryer', 'Scales'] },
        { kategorie: 'Family', items: ['High chair', 'Play kitchen', 'Board games', 'Rocking toy', 'Fold-out cot'] },
        { kategorie: 'Other', items: ['Washing machine', 'Lift', 'Outdoor parking', 'Bike storage in the cellar', 'Guest cards'] },
      ],
      abschnitte: [
        { titel: '', absatz: ['This is our place in Leukerbad. 65 square metres, quiet, and enough room that nobody is on top of each other. Three rooms, two beds in each: a double room, a children’s room with two singles, and the living room with a sofa bed. A cot folds out if you are travelling with a baby. It works for a week with the children, with grandparents, or with friends.'] },
        { titel: 'Getting here', absatz: ['The holiday starts when you stop organising. We are on the first floor. The lift comes up, and there are no steps. After a day out you walk back in and the day is over.', 'The thermal baths, the village centre and the sports arena are about ten minutes on foot. The Gemmi cable car is five. The La Boheme bus stop, and the bakery of the same name, are two. The bus to the Torrent cable car takes seven minutes.', 'One outdoor parking space is yours, and your bikes go in the cellar. The guest cards are in the apartment. They get you a discount on things to do around here.'] },
        { titel: 'Where you sleep', absatz: ['Three rooms, and they close. When the children are in bed, the living room is still yours: a film, a talk, or just quiet.', 'Two beds in each room. A double bed in one, two singles in the children’s room, a sofa bed in the living room. The cot is extra.', 'The bathroom is new: a bath, a mirror cabinet, a toilet, a hairdryer and scales.'] },
        { titel: 'Supper and the evening', absatz: ['The kitchen is new as well. New cupboards, an induction hob, an oven that heats quickly, a new dishwasher, and a sink big enough for the pans after supper.', 'Fondue goes on the induction hob, and there is a raclette too. Coffee is either the CoffeeB machine or the moka pot.', 'Once you are in: the electric fire, the TV, an Xbox 360, board games, and a play kitchen for the small ones.'] },
        { titel: 'Two balconies', absatz: ['One balcony is for sitting, facing the Gemmi. Coffee in the morning, and no reason to be anywhere else. The other has an electric grill. Smoke outside, on the balcony, not in the rooms.'] },
        { titel: 'The village', absatz: ['A few photos are Leukerbad, not the apartment: the street, the Gemmi pass, the view down from the Gemmi, and a barbecue on the alp above the village.'] },
      ],
    };
  }
  if (locale === 'fr') {
    return {
      ...gemeinsam,
      titel: (name, ort) => `${name} à ${ort} – l’appartement`,
      claim: 'À Loèche-les-Bains, de la place pour toute la famille, avec la Gemmi en face.',
      beschreibung: 'Appartement pour familles à Loèche-les-Bains, 65 m². Trois pièces, deux lits dans chacune, plus un lit bébé à déplier.',
      stockwerk: '1er étage, avec ascenseur, sans marches',
      parkplatz: '1 place de parc extérieure comprise',
      haustiere: 'Les animaux propres sont les bienvenus.',
      rauchen: 'Uniquement sur le balcon.',
      hinweise: [
        'En réservation directe, la taxe de séjour est comprise.',
        'Sur Booking.com et Airbnb, la taxe de séjour n’est pas comprise. Elle est due après coup.',
        'Les cartes d’hôte sont prêtes et donnent une réduction sur les offres de la région.',
      ],
      wie: { 'zu Fuss': 'à pied', Bus: 'en bus', Auto: 'en voiture' },
      ziel: {
        'Leukerbad Therme': 'Thermes de Loèche-les-Bains',
        'Zentrum oder Sportarena': 'Centre ou arène de sport',
        Gemmibahn: 'Téléphérique de la Gemmi',
        'Haltestelle La Boheme': 'Arrêt La Boheme',
        Torrentbahn: 'Téléphérique de Torrent',
      },
      hoehe: 'm au-dessus de la mer',
      ausstattung: [
        { kategorie: 'Cuisine', items: ['Plaque à induction', 'Four rapide', 'Lave-vaisselle', 'Grand évier', 'Service à fondue', 'Raclette', 'Machine CoffeeB', 'Cafetière moka'] },
        { kategorie: 'Séjour', items: ['Wi-Fi', 'Smart TV', 'Xbox 360', 'Cheminée électrique', 'Deux balcons', 'Grill électrique', 'Canapé-lit pour 2'] },
        { kategorie: 'Salle de bain', items: ['Baignoire', 'Armoire à miroir', 'Toilettes', 'Sèche-cheveux', 'Balance'] },
        { kategorie: 'Famille', items: ['Chaise haute', 'Cuisine jouet', 'Jeux de société', 'Cheval à bascule', 'Lit bébé pliant'] },
        { kategorie: 'Divers', items: ['Machine à laver', 'Ascenseur', 'Place de parc', 'Local à vélos au sous-sol', 'Cartes d’hôte'] },
      ],
      abschnitte: [
        { titel: '', absatz: ['C’est notre appartement à Loèche-les-Bains. 65 mètres carrés, au calme, avec assez de place pour que personne ne se marche dessus. Trois pièces, deux lits dans chacune : une chambre double, une chambre d’enfants avec deux lits simples, et le séjour avec un canapé-lit. Un lit bébé se déplie si tu voyages avec un tout-petit. Ça tient une semaine avec les enfants, les grands-parents ou des amis.'] },
        { titel: 'En arrivant', absatz: ['Les vacances commencent quand tu arrêtes d’organiser. On est au premier étage. L’ascenseur monte, il n’y a pas de marches. Après la journée dehors, tu rentres et la journée est finie.', 'Les thermes, le centre du village et l’arène de sport sont à environ dix minutes à pied. Le téléphérique de la Gemmi, cinq. L’arrêt La Boheme, et la boulangerie du même nom, deux. Le bus jusqu’au téléphérique de Torrent met sept minutes.', 'Une place de parc extérieure est pour toi, et tes vélos dorment au sous-sol. Les cartes d’hôte sont dans l’appartement. Elles donnent une réduction sur ce qu’on fait dans la région.'] },
        { titel: 'Où l’on dort', absatz: ['Trois pièces, et elles se ferment. Quand les enfants sont au lit, le séjour reste à toi : un film, une discussion, ou simplement le calme.', 'Deux lits par pièce. Un lit double dans l’une, deux lits simples chez les enfants, un canapé-lit dans le séjour. Le lit bébé est en plus.', 'La salle de bain est neuve : baignoire, armoire à miroir, toilettes, sèche-cheveux et balance.'] },
        { titel: 'Le soir à table', absatz: ['La cuisine est neuve aussi. Des meubles neufs, une plaque à induction, un four qui chauffe vite, un lave-vaisselle neuf, et un évier assez grand pour les casseroles après le souper.', 'La fondue se fait sur l’induction, et il y a une raclette. Le café, c’est la machine CoffeeB ou la cafetière moka.', 'Une fois rentrés : la cheminée électrique, la télé, une Xbox 360, des jeux de société, et une cuisine jouet pour les petits.'] },
        { titel: 'Deux balcons', absatz: ['Un balcon est pour s’asseoir, face à la Gemmi. Le café du matin, et aucune raison d’être ailleurs. L’autre a un grill électrique. On fume dehors, sur le balcon, pas dans les pièces.'] },
        { titel: 'Le village', absatz: ['Quelques photos montrent Loèche-les-Bains, pas l’appartement : la rue, le col de la Gemmi, la vue depuis là-haut, et un grill sur l’alpage au-dessus du village.'] },
      ],
    };
  }
  return {
    ...gemeinsam,
    titel: (name, ort) => `${name} a ${ort} – l’appartamento`,
    claim: 'A Leukerbad c’è posto per tutta la famiglia, con la parete della Gemmi fuori.',
    beschreibung: 'Appartamento per famiglie a Leukerbad, 65 m². Tre stanze, due posti in ciascuna, più un lettino da aprire.',
    stockwerk: '1° piano, con ascensore, senza scalini',
    parkplatz: '1 posto auto esterno compreso',
    haustiere: 'Gli animali puliti sono i benvenuti.',
    rauchen: 'Solo sul balcone.',
    hinweise: [
      'Con la prenotazione diretta la tassa di soggiorno è compresa.',
      'Su Booking.com e Airbnb la tassa di soggiorno non è compresa. Si paga dopo.',
      'Le guest card sono pronte e danno uno sconto sulle offerte della regione.',
    ],
    wie: { 'zu Fuss': 'a piedi', Bus: 'in bus', Auto: 'in auto' },
    ziel: {
      'Leukerbad Therme': 'Terme di Leukerbad',
      'Zentrum oder Sportarena': 'Centro o arena sportiva',
      Gemmibahn: 'Funivia della Gemmi',
      'Haltestelle La Boheme': 'Fermata La Boheme',
      Torrentbahn: 'Funivia di Torrent',
    },
    hoehe: 'm sul mare',
    ausstattung: [
      { kategorie: 'Cucina', items: ['Piano a induzione', 'Forno rapido', 'Lavastoviglie', 'Lavello grande', 'Set per fonduta', 'Raclette', 'Macchina CoffeeB', 'Moka'] },
      { kategorie: 'Soggiorno', items: ['Wi-Fi', 'Smart TV', 'Xbox 360', 'Camino elettrico', 'Due balconi', 'Griglia elettrica', 'Divano letto per 2'] },
      { kategorie: 'Bagno', items: ['Vasca', 'Armadio a specchio', 'WC', 'Asciugacapelli', 'Bilancia'] },
      { kategorie: 'Famiglia', items: ['Seggiolone', 'Cucina giocattolo', 'Giochi da tavolo', 'Cavallo a dondolo', 'Lettino pieghevole'] },
      { kategorie: 'Altro', items: ['Lavatrice', 'Ascensore', 'Posto auto', 'Deposito bici in cantina', 'Guest card'] },
    ],
    abschnitte: [
      { titel: '', absatz: ['È il nostro appartamento a Leukerbad. 65 metri quadrati, tranquillo, con abbastanza spazio perché nessuno stia addosso all’altro. Tre stanze, due posti in ciascuna: una camera matrimoniale, una camera dei bambini con due letti singoli, e il soggiorno con un divano letto. Un lettino si apre se viaggi con un bebè. Va bene per una settimana con i bambini, con i nonni o con gli amici.'] },
      { titel: 'Quando arrivate', absatz: ['La vacanza inizia quando smetti di organizzare. Siamo al primo piano. L’ascensore sale, non ci sono scalini. Dopo la giornata fuori rientri e la giornata è finita.', 'Terme, centro del paese e arena sportiva sono a circa dieci minuti a piedi. La funivia della Gemmi, cinque. La fermata La Boheme, e il forno con lo stesso nome, due. Il bus fino alla funivia di Torrent ci mette sette minuti.', 'Un posto auto esterno è tuo, e le bici stanno in cantina. Le carte ospite sono in appartamento. Con quelle paghi meno per quello che si fa in zona.'] },
      { titel: 'Dove si dorme', absatz: ['Tre stanze, e si chiudono. Quando i bambini sono a letto, il soggiorno resta tuo: un film, due chiacchiere, o semplicemente silenzio.', 'Due posti per stanza. Un letto matrimoniale in una, due letti singoli dai bambini, un divano letto in soggiorno. Il lettino è in più.', 'Il bagno è nuovo: vasca, armadio a specchio, WC, asciugacapelli e bilancia.'] },
      { titel: 'La cena e la sera', absatz: ['Anche la cucina è nuova. Mobili nuovi, piano a induzione, un forno che scalda in fretta, lavastoviglie nuova, e un lavello abbastanza grande per le pentole dopo cena.', 'La fonduta si fa sull’induzione, e c’è anche la raclette. Il caffè è la macchina CoffeeB oppure la moka.', 'Una volta dentro: il camino elettrico, la TV, una Xbox 360, i giochi da tavolo e una cucina giocattolo per i piccoli.'] },
      { titel: 'Due balconi', absatz: ['Un balcone è per stare seduti, di fronte alla Gemmi. Il caffè del mattino, e nessun motivo di essere altrove. L’altro ha una griglia elettrica. Si fuma fuori, sul balcone, non nelle stanze.'] },
      { titel: 'Il paese', absatz: ['Alcune foto sono Leukerbad, non l’appartamento: la strada, il passo della Gemmi, la vista da lassù, e una griglia sull’alpe sopra il paese.'] },
    ],
  };
}

const cache = {
  en: seiten('en', bilderEn),
  fr: seiten('fr', bilderFr),
  it: seiten('it', bilderIt),
};

export function wohnungLocale(locale: Locale): WohnungLocale | null {
  if (locale === 'de') return null;
  return cache[locale];
}
