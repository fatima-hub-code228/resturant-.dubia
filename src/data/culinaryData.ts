export type MenuCategory =
  | 'All'
  | 'Tasting Menu'
  | 'Hearth & Grill'
  | 'Raw & Crudo'
  | 'Cellar Pairings'
  | 'Desserts';

export interface SignatureCourse {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: Exclude<MenuCategory, 'All'>;
  priceAed: number;
  image: string;
  description: string;
  provenance: string;
  technique: string;
  pairing: string;
  dietaryNote: string;
  cookingTemp: string;
}

export interface OrbitalCardItem {
  id: string;
  title: string;
  category: string;
  image: string;
  courseId?: string;
}

export interface MenuEntry {
  id: string;
  name: string;
  category: Exclude<MenuCategory, 'All'>;
  priceAed: number;
  notes: string;
  pairing: string;
  dietary: string;
  image: string;
  featuredCourseId?: string;
}

export interface GalleryFrame {
  id: string;
  title: string;
  room: 'The Dining Room' | 'Open Hearth' | 'Private Cellar' | 'Plating Studio';
  caption: string;
  image: string;
}

export const ASSETS = {
  heroDubaiNight: '/src/assets/images/hero_dubai_night_1795008824338.jpg',
  boulevardMotion: '/src/assets/images/scene_boulevard_motion_1795008825770.jpg',
  openHearth: '/src/assets/images/scene_open_hearth_1795008825239.jpg',
  luxurySalon: '/src/assets/images/scene_luxury_salon_1795008826909.jpg',
  studioTrioLineup: '/src/assets/images/studio_trio_lineup_1795008827272.jpg',
  miyazakiWagyu: '/src/assets/images/dish_miyazaki_wagyu_1795008828647.jpg',
  bluefinToro: '/src/assets/images/dish_bluefin_toro_1795008828806.jpg',
  wildTurbot: '/src/assets/images/dish_wild_turbot_1795008829394.jpg',
  truffleRisotto: '/src/assets/images/dish_truffle_risotto_1795008829758.jpg',
  valrhonaSouffle: '/src/assets/images/dish_valrhona_souffle_1795008830094.jpg',
} as const;

export const WHATSAPP_NUMBER = '97145550192';

export const SIGNATURE_COURSES: SignatureCourse[] = [
  {
    id: 'miyazaki-a5',
    index: '01',
    title: 'Miyazaki A5',
    subtitle: 'Binchotan-Seared Striploin · Black Garlic Jus',
    category: 'Hearth & Grill',
    priceAed: 680,
    image: ASSETS.miyazakiWagyu,
    description:
      'BMS-12 Miyazaki striploin kissed over white Kishu binchotan charcoal, rested in smoked marrow butter and lacquered with fermented soy tare and charred shallot purée.',
    provenance: 'Miyazaki Prefecture, Japan · Single-Estate Lot',
    technique: '900°C White Oak Binchotan Sear · 14-Minute Slow Rest',
    pairing: '2016 Château Margaux Pavillon Rouge, Margaux',
    dietaryNote: 'Gluten-free preparation available',
    cookingTemp: '54°C Core · Rare-Medium',
  },
  {
    id: 'bluefin-toro',
    index: '02',
    title: 'Bluefin Toro',
    subtitle: 'Aged Belly Crudo · Royal Oscietra Caviar',
    category: 'Raw & Crudo',
    priceAed: 490,
    image: ASSETS.bluefinToro,
    description:
      'Seven-day kombu-cured wild Mediterranean bluefin belly brushed with white tamari dashi, crowned with 15g Royal Oscietra caviar, green yuzu kosho, and micro shiso.',
    provenance: 'Toyosu Auction & Caspian Sea Reserve',
    technique: '7-Day Cedar & Kombu Dry Aging',
    pairing: '2012 Krug Grande Cuvée 170ème Édition',
    dietaryNote: 'Raw seafood · Contains soy',
    cookingTemp: '8°C Chilled Basalt Service',
  },
  {
    id: 'wild-turbot',
    index: '03',
    title: 'Wild Turbot',
    subtitle: 'Champagne Beurre Blanc · Charred Leek Oil',
    category: 'Tasting Menu',
    priceAed: 440,
    image: ASSETS.wildTurbot,
    description:
      'Line-caught Breton turbot gently poached in cultured Normandy butter, dressed in a silky Blanc de Blancs emulsion with hand-foraged sea fennel and ember-charred leek oil.',
    provenance: 'Brittany Coast, France · Line Caught',
    technique: 'Low-Temperature Beurre Monté Poaching',
    pairing: '2019 Domaine Leflaive Puligny-Montrachet',
    dietaryNote: 'Contains dairy & fish',
    cookingTemp: '51°C Pearlescent Flake',
  },
  {
    id: 'perigord-truffle',
    index: '04',
    title: 'Périgord Truffle',
    subtitle: 'Aged Acquerello · 36-Month Parmigiano Espuma',
    category: 'Tasting Menu',
    priceAed: 410,
    image: ASSETS.truffleRisotto,
    description:
      'Seven-year aged Acquerello carnaroli rice slowly simmered in roasted veal and porcini reduction, finished tableside with shaved winter Périgord truffle and airy Parmigiano foam.',
    provenance: 'Vercelli & Dordogne Winter Harvest',
    technique: 'Copper Pan Emulsification · Tableside Shaving',
    pairing: '2015 Giacomo Conterno Barolo Francia',
    dietaryNote: 'Vegetarian broth option on request',
    cookingTemp: '68°C Velvet Service',
  },
  {
    id: 'valrhona-souffle',
    index: '05',
    title: 'Valrhona Soufflé',
    subtitle: '70% Guanaja · Piedmont Hazelnut Praline',
    category: 'Desserts',
    priceAed: 210,
    image: ASSETS.valrhonaSouffle,
    description:
      'Baked-to-order single-origin 70% Guanaja dark chocolate soufflé dusted with smoked cacao, paired with roasted Piedmont hazelnut praline gelato and crisp cacao nib tuile.',
    provenance: 'Tain-l’Hermitage & Alba Hazelnut Groves',
    technique: '14-Minute Precision Hearth Bake',
    pairing: '1998 Château d’Yquem Sauternes (By the Glass)',
    dietaryNote: 'Contains eggs, dairy, tree nuts',
    cookingTemp: '205°C Fresh from Deck Oven',
  },
];

export const ORBITAL_ITEMS: OrbitalCardItem[] = [
  {
    id: 'orb-1',
    title: 'Miyazaki A5',
    category: 'Hearth Centerpiece',
    image: ASSETS.miyazakiWagyu,
    courseId: 'miyazaki-a5',
  },
  {
    id: 'orb-2',
    title: 'Bluefin Toro',
    category: 'Caviar & Crudo',
    image: ASSETS.bluefinToro,
    courseId: 'bluefin-toro',
  },
  {
    id: 'orb-3',
    title: 'Wild Turbot',
    category: 'Atlantic Catch',
    image: ASSETS.wildTurbot,
    courseId: 'wild-turbot',
  },
  {
    id: 'orb-4',
    title: 'Périgord Truffle',
    category: 'Winter Harvest',
    image: ASSETS.truffleRisotto,
    courseId: 'perigord-truffle',
  },
  {
    id: 'orb-5',
    title: 'Valrhona Soufflé',
    category: 'Pastry Studio',
    image: ASSETS.valrhonaSouffle,
    courseId: 'valrhona-souffle',
  },
  {
    id: 'orb-6',
    title: 'The Open Hearth',
    category: '900°C Binchotan',
    image: ASSETS.openHearth,
    courseId: 'miyazaki-a5',
  },
  {
    id: 'orb-7',
    title: 'Nero Marquina Counter',
    category: 'Chef’s Salon',
    image: ASSETS.luxurySalon,
  },
  {
    id: 'orb-8',
    title: 'Three-Act Tasting',
    category: 'Studio Lineup',
    image: ASSETS.studioTrioLineup,
    courseId: 'miyazaki-a5',
  },
];

export const MENU_CATALOG: MenuEntry[] = [
  {
    id: 'menu-tasting-8',
    name: 'Eight-Course Hearth Tasting',
    category: 'Tasting Menu',
    priceAed: 1250,
    notes: 'Full seasonal progression from raw coastal crudo to binchotan Miyazaki A5 and pastry finale.',
    pairing: 'Optional Reserve Cellar Pairing · AED 780',
    dietary: 'Pescatarian adaptation available',
    image: ASSETS.studioTrioLineup,
    featuredCourseId: 'miyazaki-a5',
  },
  {
    id: 'menu-miyazaki',
    name: 'Miyazaki A5 Striploin (180g)',
    category: 'Hearth & Grill',
    priceAed: 680,
    notes: 'White binchotan sear, bone marrow jus, black garlic purée, smoked sea salt.',
    pairing: '2016 Pavillon Rouge du Château Margaux',
    dietary: 'Gluten-free',
    image: ASSETS.miyazakiWagyu,
    featuredCourseId: 'miyazaki-a5',
  },
  {
    id: 'menu-toro',
    name: 'Bluefin Otoro & Royal Oscietra',
    category: 'Raw & Crudo',
    priceAed: 490,
    notes: 'Seven-day kombu cured belly, white tamari dashi, yuzu kosho, shiso blossom.',
    pairing: '2012 Krug Grande Cuvée',
    dietary: 'Raw · Contains soy',
    image: ASSETS.bluefinToro,
    featuredCourseId: 'bluefin-toro',
  },
  {
    id: 'menu-turbot',
    name: 'Poached Breton Wild Turbot',
    category: 'Tasting Menu',
    priceAed: 440,
    notes: 'Champagne beurre blanc, sea fennel, ember-charred leek oil.',
    pairing: '2019 Domaine Leflaive Puligny-Montrachet',
    dietary: 'Contains dairy',
    image: ASSETS.wildTurbot,
    featuredCourseId: 'wild-turbot',
  },
  {
    id: 'menu-risotto',
    name: 'Acquerello Périgord Truffle Risotto',
    category: 'Tasting Menu',
    priceAed: 410,
    notes: 'Aged carnaroli rice, 36-month Parmigiano espuma, freshly shaved winter truffle.',
    pairing: '2015 Giacomo Conterno Barolo Francia',
    dietary: 'Vegetarian option available',
    image: ASSETS.truffleRisotto,
    featuredCourseId: 'perigord-truffle',
  },
  {
    id: 'menu-hearth-rib',
    name: 'Dry-Aged Côte de Boeuf for Two',
    category: 'Hearth & Grill',
    priceAed: 920,
    notes: '45-day Himalayan salt-chamber aged ribeye carved tableside with rosemary tallow.',
    pairing: '2014 Opus One, Napa Valley',
    dietary: 'Gluten-free',
    image: ASSETS.openHearth,
    featuredCourseId: 'miyazaki-a5',
  },
  {
    id: 'menu-cellar-flight',
    name: 'Grand Cru Sommelier Flight (6 Pours)',
    category: 'Cellar Pairings',
    priceAed: 780,
    notes: 'Curated sequence spanning Krug Champagne, White Burgundy, Barolo, and vintage Sauternes.',
    pairing: 'Cellar Master Guided Service',
    dietary: 'Zero-proof botanical flight · AED 390',
    image: ASSETS.luxurySalon,
  },
  {
    id: 'menu-souffle',
    name: 'Valrhona 70% Guanaja Soufflé',
    category: 'Desserts',
    priceAed: 210,
    notes: 'Smoked cacao crust, Piedmont hazelnut praline gelato, warm cacao nib tuile.',
    pairing: '1998 Château d’Yquem Sauternes',
    dietary: 'Contains eggs, dairy, hazelnuts',
    image: ASSETS.valrhonaSouffle,
    featuredCourseId: 'valrhona-souffle',
  },
];

export const GALLERY_FRAMES: GalleryFrame[] = [
  {
    id: 'gal-1',
    title: 'Nero Marquina Chef’s Counter',
    room: 'The Dining Room',
    caption: 'Twelve bespoke seats facing the glowing open hearth in Downtown Dubai.',
    image: ASSETS.luxurySalon,
  },
  {
    id: 'gal-2',
    title: '900°C White Binchotan Hearth',
    room: 'Open Hearth',
    caption: 'Copper pans, brown-butter basting, and live Kishu charcoal embers.',
    image: ASSETS.openHearth,
  },
  {
    id: 'gal-3',
    title: 'Three-Act Studio Progression',
    room: 'Plating Studio',
    caption: 'Hand-thrown stoneware photographed under linear studio softboxes.',
    image: ASSETS.studioTrioLineup,
  },
  {
    id: 'gal-4',
    title: 'Boulevard Arrival & Valet',
    room: 'Private Cellar',
    caption: 'Direct nocturnal access off Sheikh Mohammed bin Rashid Boulevard.',
    image: ASSETS.boulevardMotion,
  },
  {
    id: 'gal-5',
    title: 'Skyline Terrace Horizon',
    room: 'The Dining Room',
    caption: 'Uninterrupted Downtown skyline and Burj spire alignment after dusk.',
    image: ASSETS.heroDubaiNight,
  },
  {
    id: 'gal-6',
    title: 'Miyazaki Striploin Service',
    room: 'Plating Studio',
    caption: 'Carved tableside on obsidian ceramic with fermented tare and marrow jus.',
    image: ASSETS.miyazakiWagyu,
  },
];
