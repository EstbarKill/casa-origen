
export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  description: string;
  fullDescription: string;
  ingredients: string[];
  preparation: string;
  prepTime: string;
  pairings: { name: string; type: string }[];
  tags: string[];
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: 'Cazuela de Mariscos Origen',
    price: 45000,
    category: 'Seafood',
    image: 'https://picsum.photos/seed/casa-10/800/800',
    rating: 5,
    description: 'Nuestra joya de la corona: una sinfonía de mariscos frescos en base de coco artesanal.',
    fullDescription: 'Una receta ancestral que combina la frescura del Mar Caribe con la cremosidad del coco de nuestras palmeras. Cocción lenta en vasija de barro para preservar los aromas del océano.',
    ingredients: ['Langostinos del Pacífico', 'Calamar nacional', 'Caracol pala', 'Leche de coco fresca', 'Ají dulce cienaguero'],
    preparation: 'Gourmet / Tradicional',
    prepTime: '25 min',
    pairings: [{ name: 'Limonada de Coco', type: 'Drink' }, { name: 'Vino Blanco Chardonay', type: 'Wine' }],
    tags: ['Popular', 'Signature Dish', 'Local Favorite']
  },
  {
    id: 2,
    name: 'Mojarra Dorada al Estilo Ciénaga',
    price: 32000,
    category: 'Seafood',
    image: 'https://picsum.photos/seed/casa-11/800/800',
    rating: 5,
    description: 'Mojarra fresca frita en leña, acompañada de arroz de coco y patacón.',
    fullDescription: 'El plato más honesto de nuestra costa. Mojarra seleccionada del día, frita a fuego alto para lograr una piel crujiente y una carne jugosa.',
    ingredients: ['Mojarra roja/plateada', 'Sal marina', 'Limón mandarina', 'Arroz de coco titoté'],
    preparation: 'Clásica Costeña',
    prepTime: '20 min',
    pairings: [{ name: 'Cerveza Águila Original', type: 'Beer' }, { name: 'Corozo Frozen', type: 'Drink' }],
    tags: ['Traditional']
  },
  {
    id: 3,
    name: 'Alitas Caimán en Tamarindo',
    price: 26000,
    category: 'Appetizers',
    image: 'https://picsum.photos/seed/casa-12/800/800',
    rating: 4,
    description: 'Alitas crocantes glaseadas en reducción de tamarindo cienaguero.',
    fullDescription: 'Un balance perfecto entre lo dulce y lo ácido. El tamarindo de nuestras tierras se convierte en un glaseado brillante que envuelve alitas seleccionadas.',
    ingredients: ['Alitas de pollo', 'Pulpa de tamarindo', 'Panela orgánica', 'Toque de picante local'],
    preparation: 'Fusión',
    prepTime: '15 min',
    pairings: [{ name: 'Brisa del Caribe', type: 'Cocktail' }],
    tags: ['Spicy', 'Chef Choice']
  },
  {
    id: 4,
    name: 'Limonada de Coco Imperial',
    price: 15000,
    category: 'Drinks',
    image: 'https://picsum.photos/seed/casa-13/800/800',
    rating: 5,
    description: 'Nuestra limonada insignia, ultra cremosa y refrescante.',
    fullDescription: 'No es solo una bebida, es un postre líquido. Mezcla secreta de tres tipos de coco y limones verdes de la región.',
    ingredients: ['Crema de coco', 'Leche evaporada', 'Zumo de limón fresco', 'Hielo frappé'],
    preparation: 'Artesanal',
    prepTime: '5 min',
    pairings: [],
    tags: ['Local Favorite']
  },
  {
    id: 5,
    name: 'Punta de Anca al Carbón',
    price: 48000,
    category: 'Grill',
    image: 'https://picsum.photos/seed/casa-14/800/800',
    rating: 5,
    description: 'Corte premium asado lentamente a la parrilla de leña.',
    fullDescription: 'Carne madurada por 21 días, sazonada con sal marina y asada con madera de guayacán para un sabor ahumado único.',
    ingredients: ['Corte Punta de Anca 350g', 'Sal parrillera', 'Chimichurri de la casa'],
    preparation: 'Grill Master',
    prepTime: '30 min',
    pairings: [{ name: 'Vino Tinto Malbec', type: 'Wine' }],
    tags: ['Meat Lovers']
  },
  {
    id: 6,
    name: 'Brisa del Caribe (Signature)',
    price: 28000,
    category: 'Cocktails',
    image: 'https://picsum.photos/seed/casa-16/800/800',
    rating: 5,
    description: 'Gin, maracuyá, menta y un toque secreto de la brisa marina.',
    fullDescription: 'Inspirado en los atardeceres de Ciénaga. Un cóctel botánico que limpia el paladar y refresca el alma.',
    ingredients: ['Tanqueray Gin', 'Pulpa de maracuyá', 'Jarabe de menta', 'Agua tónica premium'],
    preparation: 'Mixología',
    prepTime: '8 min',
    pairings: [],
    tags: ['Signature Drink']
  }
];
