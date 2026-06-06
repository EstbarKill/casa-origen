
export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  description: string;
  fullDescription: string;
  culturalStory: string;
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
    fullDescription: 'Una receta ancestral que combina la frescura del Mar Caribe con la cremosidad del coco de nuestras palmeras.',
    culturalStory: 'Esta cazuela rinde homenaje a los pescadores de la Ciénaga Grande, quienes por generaciones han traído el sustento del mar bajo la primera luz del alba.',
    ingredients: ['Langostinos del Pacífico', 'Calamar nacional', 'Caracol pala', 'Leche de coco fresca', 'Ají dulce'],
    preparation: 'Gourmet / Tradicional',
    prepTime: '25 min',
    pairings: [{ name: 'Limonada de Coco', type: 'Drink' }],
    tags: ['Popular', 'Signature']
  },
  {
    id: 2,
    name: 'Mojarra Dorada al Estilo Ciénaga',
    price: 32000,
    category: 'Seafood',
    image: 'https://picsum.photos/seed/casa-11/800/800',
    rating: 5,
    description: 'Mojarra fresca frita en leña, acompañada de arroz de coco y patacón.',
    fullDescription: 'El plato más honesto de nuestra costa. Mojarra seleccionada del día, frita a fuego alto.',
    culturalStory: 'Inspirada en los almuerzos familiares tras el Festival del Caimán, donde la sencillez del pescado frito celebra la abundancia de nuestra costa.',
    ingredients: ['Mojarra roja', 'Sal marina', 'Limón mandarina', 'Arroz de coco'],
    preparation: 'Clásica Costeña',
    prepTime: '20 min',
    pairings: [{ name: 'Corozo Frozen', type: 'Drink' }],
    tags: ['Traditional']
  },
  {
    id: 3,
    name: 'Cóctel Tomasita',
    price: 28000,
    category: 'Cocktails',
    image: 'https://picsum.photos/seed/casa-16/800/800',
    rating: 5,
    description: 'Gin, maracuyá, menta y un toque secreto cítrico.',
    fullDescription: 'Un cóctel botánico que limpia el paladar y refresca el alma.',
    culturalStory: 'Creado en honor a la leyenda de Tomasita, este cóctel busca capturar la alegría y el misterio del atardecer cienaguero.',
    ingredients: ['Tanqueray Gin', 'Maracuyá', 'Menta fresca', 'Agua tónica'],
    preparation: 'Mixología',
    prepTime: '8 min',
    pairings: [],
    tags: ['Signature Drink']
  }
];
