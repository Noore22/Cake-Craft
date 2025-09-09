import { CakeBase, CakeShape, CakeFilling, CakeFrosting, CakeAddon } from '../types';

export const cakeBases: CakeBase[] = [
  {
    id: 'vanilla',
    name: 'Vanilla',
    price: 25,
    image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'chocolate',
    name: 'Chocolate',
    price: 30,
    image: 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'red-velvet',
    name: 'Red Velvet',
    price: 35,
    image: 'https://images.pexels.com/photos/6133307/pexels-photo-6133307.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'lemon',
    name: 'Lemon',
    price: 28,
    image: 'https://images.pexels.com/photos/1448721/pexels-photo-1448721.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'strawberry',
    name: 'Strawberry',
    price: 32,
    image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

export const cakeShapes: CakeShape[] = [
  {
    id: 'round',
    name: 'Round',
    priceMultiplier: 1,
    sizes: [
      { id: 'small', name: '6" Small', serves: 8, priceMultiplier: 1 },
      { id: 'medium', name: '8" Medium', serves: 12, priceMultiplier: 1.5 },
      { id: 'large', name: '10" Large', serves: 20, priceMultiplier: 2.2 }
    ]
  },
  {
    id: 'square',
    name: 'Square',
    priceMultiplier: 1.1,
    sizes: [
      { id: 'small', name: '6" Small', serves: 8, priceMultiplier: 1 },
      { id: 'medium', name: '8" Medium', serves: 12, priceMultiplier: 1.5 },
      { id: 'large', name: '10" Large', serves: 20, priceMultiplier: 2.2 }
    ]
  },
  {
    id: 'heart',
    name: 'Heart',
    priceMultiplier: 1.3,
    sizes: [
      { id: 'small', name: '6" Small', serves: 8, priceMultiplier: 1 },
      { id: 'medium', name: '8" Medium', serves: 12, priceMultiplier: 1.5 }
    ]
  },
  {
    id: 'tiered',
    name: 'Tiered (2-layer)',
    priceMultiplier: 1.8,
    sizes: [
      { id: 'medium', name: '6"+8" Medium', serves: 18, priceMultiplier: 1.8 },
      { id: 'large', name: '8"+10" Large', serves: 30, priceMultiplier: 2.5 }
    ]
  }
];

export const cakeFillings: CakeFilling[] = [
  { id: 'vanilla-cream', name: 'Vanilla Cream', price: 5 },
  { id: 'chocolate-mousse', name: 'Chocolate Mousse', price: 8 },
  { id: 'strawberry-jam', name: 'Strawberry Jam', price: 6 },
  { id: 'caramel', name: 'Salted Caramel', price: 7 },
  { id: 'nutella', name: 'Nutella', price: 10 },
  { id: 'fresh-fruits', name: 'Fresh Fruits', price: 12 },
  { id: 'lemon-curd', name: 'Lemon Curd', price: 6 },
  { id: 'cream-cheese', name: 'Cream Cheese', price: 8 }
];

export const cakeFrostings: CakeFrosting[] = [
  {
    id: 'buttercream-white',
    name: 'White Buttercream',
    price: 8,
    image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'buttercream-pink',
    name: 'Pink Buttercream',
    price: 10,
    image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'chocolate-ganache',
    name: 'Chocolate Ganache',
    price: 12,
    image: 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'fondant-white',
    name: 'White Fondant',
    price: 15,
    image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'whipped-cream',
    name: 'Whipped Cream',
    price: 6,
    image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'cream-cheese-frosting',
    name: 'Cream Cheese Frosting',
    price: 10,
    image: 'https://images.pexels.com/photos/6133307/pexels-photo-6133307.jpeg?auto=compress&cs=tinysrgb&w=200'
  }
];

export const cakeAddons: CakeAddon[] = [
  { id: 'birthday-candles', name: 'Birthday Candles', price: 3, category: 'candle' },
  { id: 'number-candles', name: 'Number Candles', price: 8, category: 'candle' },
  { id: 'sparkler-candles', name: 'Sparkler Candles', price: 12, category: 'candle' },
  { id: 'edible-flowers', name: 'Edible Flowers', price: 15, category: 'decoration' },
  { id: 'chocolate-drip', name: 'Chocolate Drip', price: 10, category: 'decoration' },
  { id: 'gold-leaf', name: 'Edible Gold Leaf', price: 25, category: 'decoration' },
  { id: 'fresh-berries', name: 'Fresh Berries', price: 18, category: 'decoration' },
  { id: 'macarons', name: 'Mini Macarons', price: 20, category: 'decoration' },
  { id: 'custom-message', name: 'Custom Message', price: 5, category: 'message' },
  { id: 'photo-print', name: 'Edible Photo Print', price: 30, category: 'message' }
];

export const trendingCakes = [
  {
    id: '1',
    name: 'Rainbow Celebration Cake',
    image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 75,
    description: 'Colorful layers with vanilla buttercream'
  },
  {
    id: '2',
    name: 'Chocolate Decadence',
    image: 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 85,
    description: 'Rich chocolate cake with ganache'
  },
  {
    id: '3',
    name: 'Red Velvet Supreme',
    image: 'https://images.pexels.com/photos/6133307/pexels-photo-6133307.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 80,
    description: 'Classic red velvet with cream cheese frosting'
  },
  {
    id: '4',
    name: 'Strawberry Dream',
    image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 90,
    description: 'Fresh strawberry cake with whipped cream'
  }
];