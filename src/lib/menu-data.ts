
export interface Ingredient {
  name: string;
  description: string;
  origin: string;
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  description: string;
  longDescription: string;
  chefNote: string;
  ingredients: Ingredient[];
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: 'Cazuela de Mariscos',
    price: 38000,
    category: 'Seafood',
    image: 'https://picsum.photos/seed/casa-10/800/800',
    rating: 5,
    description: 'Cazuela tradicional costera con pescado fresco, camarones y leche de coco.',
    longDescription: 'Nuestra Cazuela de Mariscos es una oda al Caribe. Cocida lentamente en una base de leche de coco artesanal y un sofrito secreto de hierbas de la Ciénaga, esta cazuela combina la frescura del mar abierto con la cremosidad de la tierra.',
    chefNote: 'El secreto está en el tiempo. Dejamos que los sabores se fundan por 4 horas antes de servir.',
    ingredients: [
      { name: 'Camarón Tigre', description: 'Seleccionados a mano por pescadores locales.', origin: 'Ciénaga, Magdalena' },
      { name: 'Leche de Coco', description: 'Extraída fresca cada mañana en nuestra cocina.', origin: 'Palmeras de la Región' },
      { name: 'Pescado Blanco', description: 'Captura del día, firme y jugoso.', origin: 'Mar Caribe' }
    ]
  },
  {
    id: 2,
    name: 'Mojarra Frita',
    price: 28000,
    category: 'Seafood',
    image: 'https://picsum.photos/seed/casa-11/800/800',
    rating: 5,
    description: 'Mojarra entera frita servida con arroz de coco y patacones.',
    longDescription: 'Un clásico indispensable de la costa. Nuestra mojarra se marina en una mezcla de cítricos y sal marina antes de ser frita a la perfección, logrando una piel crujiente y una carne tierna.',
    chefNote: 'Acompáñala con un chorrito de limón mandarina para resaltar el sabor del mar.',
    ingredients: [
      { name: 'Mojarra Roja', description: 'De tamaño premium para asegurar jugosidad.', origin: 'Ciénaga de Santa Marta' },
      { name: 'Arroz de Coco', description: 'Hecho con el titoté tradicional (coco caramelizado).', origin: 'Receta de la Abuela' },
      { name: 'Patacones', description: 'Plátano verde golpeado y frito dos veces.', origin: 'Huertas Locales' }
    ]
  },
  {
    id: 3,
    name: 'Alitas de Caimán',
    price: 22000,
    category: 'Appetizers',
    image: 'https://picsum.photos/seed/casa-12/800/800',
    rating: 4,
    description: 'Alitas de pollo glaseadas con un toque picante y hierbas secretas.',
    longDescription: 'Inspiradas en la leyenda del Caimán Cienaguero, estas alitas tienen un glaseado ahumado y ligeramente picante que evoca el calor de nuestras fiestas.',
    chefNote: 'El nivel de picante es moderado, perfecto para abrir el apetito.',
    ingredients: [
      { name: 'Pollo de Granja', description: 'Alas jugosas marinadas por 24 horas.', origin: 'Granjas del Magdalena' },
      { name: 'Salsa Origen', description: 'Una reducción de tamarindo y chiles locales.', origin: 'Cocina Casa Origen' }
    ]
  },
  {
    id: 4,
    name: 'Limonada de Coco',
    price: 12000,
    category: 'Drinks',
    image: 'https://picsum.photos/seed/casa-13/800/800',
    rating: 5,
    description: 'Refrescante mezcla de limón y leche de coco cremosa.',
    longDescription: 'La bebida insignia de la costa. Equilibrio perfecto entre la acidez del limón y la dulzura tropical del coco, servida frappé para combatir el calor del Caribe.',
    chefNote: 'La servimos con un toque de ralladura de limón fresco para aromatizar.',
    ingredients: [
      { name: 'Limón de Castilla', description: 'Ácido y aromático.', origin: 'Valles Locales' },
      { name: 'Crema de Coco', description: 'Nuestra mezcla especial ultra cremosa.', origin: 'Casa Origen' }
    ]
  },
  {
    id: 7,
    name: 'Brisa del Caribe',
    price: 24000,
    category: 'Cocktails',
    image: 'https://picsum.photos/seed/casa-16/800/800',
    rating: 5,
    description: 'Cóctel a base de Gin con maracuyá y menta.',
    longDescription: 'Un cóctel de autor que captura la esencia de un atardecer en Ciénaga. Refrescante, botánico y con el golpe tropical de la fruta de la pasión.',
    chefNote: 'Es el maridaje ideal para nuestros ceviches.',
    ingredients: [
      { name: 'Gin Premium', description: 'Con notas de enebro y cítricos.', origin: 'Selección del Bartender' },
      { name: 'Maracuyá', description: 'Fruta fresca de temporada.', origin: 'Cultivos de la Sierra' }
    ]
  }
];
