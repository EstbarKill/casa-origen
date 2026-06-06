
export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  description: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: 'Cazuela de Mariscos',
    price: 38000,
    category: 'Seafood',
    image: 'https://picsum.photos/seed/casa-10/800/800',
    rating: 5,
    description: 'Cazuela tradicional costera con pescado fresco, camarones y leche de coco artesanal.'
  },
  {
    id: 2,
    name: 'Mojarra Frita',
    price: 28000,
    category: 'Seafood',
    image: 'https://picsum.photos/seed/casa-11/800/800',
    rating: 5,
    description: 'Mojarra entera frita a la perfección servida con arroz de coco y patacones crujientes.'
  },
  {
    id: 3,
    name: 'Alitas de Caimán',
    price: 22000,
    category: 'Appetizers',
    image: 'https://picsum.photos/seed/casa-12/800/800',
    rating: 4,
    description: 'Alitas de pollo glaseadas con una reducción de tamarindo y chiles locales.'
  },
  {
    id: 4,
    name: 'Limonada de Coco',
    price: 12000,
    category: 'Drinks',
    image: 'https://picsum.photos/seed/casa-13/800/800',
    rating: 5,
    description: 'Refrescante mezcla de limón y leche de coco cremosa servida muy fría.'
  },
  {
    id: 7,
    name: 'Brisa del Caribe',
    price: 24000,
    category: 'Cocktails',
    image: 'https://picsum.photos/seed/casa-16/800/800',
    rating: 5,
    description: 'Cóctel de autor con maracuyá, menta fresca y un toque botánico.'
  }
];
