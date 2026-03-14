export interface Product {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  price: number;
  comparePrice?: number;
  currency: string;
  images: string[];
  benefits: string[];
  ingredients: Ingredient[];
  howToUse: string[];
  faqs: FAQ[];
  reviews: Review[];
  stripePriceId: string;
  stripeSubscriptionPriceId?: string;
  inStock: boolean;
  badge?: string;
}

export interface Ingredient {
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
  avatar?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  purchaseType: 'one-time' | 'subscription';
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface Order {
  id: string;
  sessionId: string;
  customerEmail: string;
  customerName: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'failed';
  createdAt: Date;
}
