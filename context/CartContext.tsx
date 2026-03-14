'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from 'react';
import { CartItem, CartState, Product } from '@/types';

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; purchaseType: 'one-time' | 'subscription' } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE'; payload: CartItem[] };

interface CartContextType extends CartState {
  addItem: (product: Product, purchaseType?: 'one-time' | 'subscription') => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    const price =
      item.purchaseType === 'subscription'
        ? item.product.price * 0.85
        : item.product.price;
    return sum + price * item.quantity;
  }, 0);
}

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'HYDRATE':
      return action.payload;

    case 'ADD_ITEM': {
      const { product, purchaseType } = action.payload;
      const existing = state.find(
        (i) => i.product.id === product.id && i.purchaseType === purchaseType
      );
      if (existing) {
        return state.map((i) =>
          i.product.id === product.id && i.purchaseType === purchaseType
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...state, { product, quantity: 1, purchaseType }];
    }

    case 'REMOVE_ITEM':
      return state.filter((i) => i.product.id !== action.payload);

    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return state.filter((i) => i.product.id !== action.payload.productId);
      }
      return state.map((i) =>
        i.product.id === action.payload.productId
          ? { ...i, quantity: action.payload.quantity }
          : i
      );

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [isOpen, setIsOpen] = React.useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lumiere_cart');
      if (saved) {
        dispatch({ type: 'HYDRATE', payload: JSON.parse(saved) });
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem('lumiere_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (
    product: Product,
    purchaseType: 'one-time' | 'subscription' = 'one-time'
  ) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, purchaseType } });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const total = calculateTotal(items);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        itemCount,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
