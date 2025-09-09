export interface CakeBase {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface CakeShape {
  id: string;
  name: string;
  priceMultiplier: number;
  sizes: CakeSize[];
}

export interface CakeSize {
  id: string;
  name: string;
  serves: number;
  priceMultiplier: number;
}

export interface CakeFilling {
  id: string;
  name: string;
  price: number;
}

export interface CakeFrosting {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface CakeAddon {
  id: string;
  name: string;
  price: number;
  category: 'decoration' | 'message' | 'candle';
}

export interface CustomCake {
  base: CakeBase;
  shape: CakeShape;
  size: CakeSize;
  fillings: CakeFilling[];
  frosting: CakeFrosting;
  addons: CakeAddon[];
  customMessage?: string;
  totalPrice: number;
}

export interface Order {
  id: string;
  cake: CustomCake;
  customerInfo: CustomerInfo;
  deliveryDate: string;
  deliveryTime: string;
  status: 'pending' | 'confirmed' | 'baking' | 'decorating' | 'ready' | 'out-for-delivery' | 'delivered';
  totalAmount: number;
  createdAt: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  orders: Order[];
  favorites: CustomCake[];
}