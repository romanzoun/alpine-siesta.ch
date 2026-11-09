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
  { raum: 'Living room', alt: 'Cosy living room of the Alpine Siesta apartment in Leukerbad, with seating, a television and the balcony door', text: 'Seating by the balcony door, the television and the electric fire.' },
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
  { raum: 'Séjour', alt: 'Séjour douillet d’Alpine Siesta à Loèche-les-Bains, avec sièges, télévision et accès au balcon', text: 'Les sièges près du balcon, la télévision et la cheminée électrique.' },
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
  { raum: 'Soggiorno', alt: 'Soggiorno accogliente di Alpine Siesta a Leukerbad, con zona seduta, televisore e accesso al balcone', text: 'Sedute vicino al balcone, il televisore e il camino elettrico.' },
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
      claim: 'Relaxed holidays in the Valais mountains, with room for family and friends and a view of the Gemmi.',
      beschreibung: 'Holiday apartment in Leukerbad, 65 m², for up to six people. A view of the Gemmi, and short walks to the baths, the Sportarena and the village.',
      stockwerk: '1st floor, with a lift, no steps',
      parkplatz: '1 outdoor parking space, free',
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
        { titel: '', absatz: ['Alpine Siesta is our comfortable 65 m² holiday apartment in the heart of Leukerbad. With room for up to six people and an extra cot, it suits families, a holiday with grandparents, or time away with friends.', 'Active days in the mountains, easy hours in the thermal baths, or quiet evenings together: this is what a good holiday needs.'] },
        { titel: 'Arriving and settling in', absatz: ['The apartment is in a quiet spot and a good base for discovering Leukerbad.', 'It is on the first floor, easy to reach by lift and without stairs.', 'Many of the best places are close. The Leukerbad thermal baths, the Sportarena and the village centre are about ten minutes on foot. The Gemmi cable car is five minutes, the La Bohème bus stop and the nearby bakery only two. The bus reaches the Torrent cable cars in about seven minutes.', 'Your own outdoor parking space is free. Bikes go in the cellar.', 'With the guest cards you also get discounts on things to do in the area.'] },
        { titel: 'Comfortable rooms for a holiday together', absatz: ['The apartment has three rooms with two beds each, and enough space for everyone to feel at home.', 'The bedroom has a comfortable double bed. The children’s room, with two singles, is a place of their own for the younger guests.', 'The living room is for relaxing together. The sofa bed becomes an extra bed for two when you need it. For the smallest guests there is a fold-out cot.', 'The newly renovated bathroom has a bath, a mirror cabinet, a toilet, a hairdryer and scales.'] },
        { titel: 'Cooking together and easy evenings', absatz: ['In the newly renovated kitchen, cooking together is a pleasure. Modern appliances, an induction hob, an oven that heats quickly and a dishwasher make the holiday feel like home.', 'For an easy evening there is a fondue set and a raclette set, so that after a full day you can sit at the table and enjoy Valais food.', 'Coffee drinkers can choose between an environmentally friendly CoffeeB machine and a classic moka pot.', 'As the day slows down, the living room gets comfortable: an electric fire, a smart TV, an Xbox 360 and board games for children and adults. For the youngest guests there is also a play kitchen.'] },
        { titel: 'Two balconies with a mountain view', absatz: ['Few things are better than starting the day with a cup of coffee and the Gemmi wall in front of you.', 'The apartment has two balconies. On the first you have the mountain air, the view and easy hours in the sun.', 'On the second there is an electric grill, a good way to end a day in the mountains.', 'Please smoke only on the balcony, so the apartment stays pleasant and smoke-free for every guest.'] },
        { titel: 'Leukerbad right outside', absatz: ['Walking, skiing, sledding, cycling or resting in the warm thermal water: in every season Leukerbad has a lot of ways to spend a holiday.', 'The Gemmi wall, the mountain landscape and the easy pace of the village make each stay its own.', 'We look forward to welcoming you at Alpine Siesta.'] },
      ],
    };
  }
  if (locale === 'fr') {
    return {
      ...gemeinsam,
      titel: (name, ort) => `${name} à ${ort} – l’appartement`,
      claim: 'Des vacances tranquilles au milieu des montagnes valaisannes, avec de la place pour la famille et les amis, et la vue sur la Gemmi.',
      beschreibung: 'Appartement de vacances à Loèche-les-Bains, 65 m², jusqu’à six personnes. Vue sur la Gemmi, courts chemins vers thermes, Sportarena et village.',
      stockwerk: '1er étage, avec ascenseur, sans marches',
      parkplatz: '1 place de parc extérieure, gratuite',
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
        { titel: '', absatz: ['Alpine Siesta est notre appartement de vacances confortable de 65 m², au cœur de Loèche-les-Bains. Avec de la place pour six personnes et un lit bébé en plus, il convient aux familles, à des vacances avec les grands-parents ou à un moment entre amis.', 'Journées actives en montagne, heures tranquilles aux thermes ou soirées ensemble : vous trouvez ici ce qui fait de belles vacances.'] },
        { titel: 'Arriver et se sentir bien', absatz: ['L’appartement est dans un endroit calme et un bon point de départ pour découvrir Loèche-les-Bains.', 'Il est au premier étage, facile à atteindre par l’ascenseur et sans escalier.', 'Beaucoup des plus beaux endroits sont tout près. Les thermes de Loèche-les-Bains, la Sportarena et le centre du village sont à environ dix minutes à pied. Le téléphérique de la Gemmi est à cinq minutes, l’arrêt La Bohème et la boulangerie voisine à deux. Le bus rejoint les remontées de Torrent en environ sept minutes.', 'Votre place de parc extérieure est gratuite. Les vélos se rangent à la cave.', 'Avec les cartes d’hôte, vous profitez aussi de réductions sur les loisirs de la région.'] },
        { titel: 'Des pièces confortables pour des vacances ensemble', absatz: ['L’appartement a trois pièces avec deux lits chacune, et assez de place pour que chacun se sente bien.', 'Dans la chambre, un lit double confortable. La chambre d’enfants, avec deux lits simples, est un endroit à eux pour les plus jeunes.', 'Le séjour invite à se détendre ensemble. Le canapé-lit devient un couchage pour deux si vous en avez besoin. Pour les plus petits, un lit bébé se déplie.', 'La salle de bain fraîchement rénovée a une baignoire, une armoire à miroir, des toilettes, un sèche-cheveux et une balance.'] },
        { titel: 'Cuisiner ensemble et des soirées tranquilles', absatz: ['Dans la cuisine fraîchement rénovée, cuisiner ensemble fait plaisir. Des appareils modernes, une plaque à induction, un four qui chauffe vite et un lave-vaisselle font que les vacances ressemblent à la maison.', 'Pour une soirée tranquille, un service à fondue et une raclette sont là, pour vous asseoir à table après une journée bien remplie et goûter les spécialités valaisannes.', 'Pour le café, vous choisissez entre une machine CoffeeB respectueuse de l’environnement et une cafetière moka.', 'Quand la journée ralentit, le séjour devient particulièrement agréable : une cheminée électrique, une smart TV, une Xbox 360 et des jeux de société pour petits et grands. Pour les plus jeunes, il y a aussi une cuisine jouet.'] },
        { titel: 'Deux balcons avec vue sur la montagne', absatz: ['Quoi de plus beau que de commencer la journée avec une tasse de café et la paroi de la Gemmi devant vous ?', 'L’appartement a deux balcons. Sur le premier, l’air de la montagne, la vue et des heures tranquilles au soleil.', 'Sur le second, un grill électrique, une bonne façon de finir une journée en montagne.', 'Nous vous demandons de fumer uniquement sur le balcon, pour que l’appartement reste agréable et sans fumée pour tous les hôtes.'] },
        { titel: 'Loèche-les-Bains juste devant la porte', absatz: ['Randonnée, ski, luge, vélo ou détente dans l’eau thermale chaude : en toute saison, Loèche-les-Bains offre beaucoup de façons de passer des vacances.', 'La paroi de la Gemmi, le paysage de montagne et l’atmosphère du village rendent chaque séjour particulier.', 'Nous nous réjouissons de vous accueillir à Alpine Siesta.'] },
      ],
    };
  }
  return {
    ...gemeinsam,
    titel: (name, ort) => `${name} a ${ort} – l’appartamento`,
    claim: 'Vacanze tranquille in mezzo alle montagne del Vallese, con posto per famiglia e amici e vista sulla Gemmi.',
    beschreibung: 'Appartamento per vacanze a Leukerbad, 65 m², fino a sei persone. Vista sulla Gemmi, percorsi brevi verso terme, Sportarena e paese.',
    stockwerk: '1° piano, con ascensore, senza scalini',
    parkplatz: '1 posto auto esterno, gratuito',
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
      { titel: '', absatz: ['Alpine Siesta è il nostro appartamento per vacanze, comodo, di 65 m², nel cuore di Leukerbad. Con posto per sei persone e un lettino in più, va bene per famiglie, vacanze con i nonni o un periodo con gli amici.', 'Giornate attive in montagna, ore tranquille alle terme o sere insieme: qui trovate quello che fa una bella vacanza.'] },
      { titel: 'Arrivare e sentirsi a casa', absatz: ['L’appartamento sta in un posto tranquillo ed è una buona base per scoprire Leukerbad.', 'È al primo piano, comodo da raggiungere con l’ascensore e senza scale.', 'Molti dei posti più belli sono vicini. Terme di Leukerbad, Sportarena e centro del paese sono a circa dieci minuti a piedi. La funivia della Gemmi è a cinque minuti, la fermata La Bohème e il forno vicino solo a due. Il bus arriva alle funivie di Torrent in circa sette minuti.', 'Il vostro posto auto esterno è gratuito. Le bici stanno in cantina.', 'Con le guest card avete anche sconti sulle offerte della zona.'] },
      { titel: 'Stanze comode per vacanze insieme', absatz: ['L’appartamento ha tre stanze con due posti ciascuna, e abbastanza spazio perché tutti stiano bene.', 'In camera c’è un letto matrimoniale comodo. La camera dei bambini, con due letti singoli, è un angolo loro per gli ospiti più piccoli.', 'Il soggiorno invita a rilassarsi insieme. Il divano letto diventa un posto in più per due, quando serve. Per gli ospiti più piccoli c’è un lettino da aprire.', 'Il bagno appena rinnovato ha vasca, armadio a specchio, WC, asciugacapelli e bilancia.'] },
      { titel: 'Cucinare insieme e sere tranquille', absatz: ['Nella cucina appena rinnovata, cucinare insieme fa piacere. Elettrodomestici moderni, piano a induzione, un forno che scalda in fretta e una lavastoviglie fanno sentire le vacanze come a casa.', 'Per una sera tranquilla ci sono un set per la fonduta e una raclette, così dopo una giornata piena vi sedete a tavola e gustate le specialità vallesane.', 'Per il caffè scegliete tra una macchina CoffeeB rispettosa dell’ambiente e una moka classica.', 'Quando la giornata rallenta, il soggiorno diventa particolarmente comodo: un camino elettrico, una smart TV, una Xbox 360 e giochi da tavolo per grandi e piccoli. Per gli ospiti più piccoli c’è anche una cucina giocattolo.'] },
      { titel: 'Due balconi con vista sulla montagna', absatz: ['Cosa c’è di meglio che iniziare la giornata con una tazza di caffè e la parete della Gemmi davanti?', 'L’appartamento ha due balconi. Sul primo avete l’aria di montagna, la vista e ore tranquille al sole.', 'Sul secondo c’è una griglia elettrica, un bel modo di chiudere una giornata in montagna.', 'Vi chiediamo di fumare solo sul balcone, così l’appartamento resta piacevole e senza fumo per tutti gli ospiti.'] },
      { titel: 'Leukerbad proprio fuori dalla porta', absatz: ['Camminare, sciare, slittino, bici o riposo nell’acqua termale calda: in ogni stagione Leukerbad ha molti modi di passare le vacanze.', 'La parete della Gemmi, il paesaggio di montagna e l’atmosfera del paese rendono ogni soggiorno particolare.', 'Non vediamo l’ora di darvi il benvenuto ad Alpine Siesta.'] },
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
