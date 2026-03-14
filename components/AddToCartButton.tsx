'use client';

import { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import clsx from 'clsx';

interface Props {
  product: Product;
  purchaseType?: 'one-time' | 'subscription';
  variant?: 'primary' | 'outline';
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function AddToCartButton({
  product,
  purchaseType = 'one-time',
  variant = 'primary',
  fullWidth = false,
  size = 'md',
}: Props) {
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, purchaseType);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 1200);
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-xs',
    md: 'px-7 py-3.5 text-xs',
    lg: 'px-10 py-4 text-sm',
  };

  return (
    <button
      onClick={handleAdd}
      disabled={added || !product.inStock}
      className={clsx(
        'inline-flex items-center justify-center gap-2.5 rounded-full font-sans font-medium tracking-widest uppercase transition-all duration-300',
        sizes[size],
        fullWidth && 'w-full',
        variant === 'primary'
          ? added
            ? 'bg-emerald-500 text-white'
            : 'bg-gold-500 text-white hover:bg-gold-600 hover:shadow-gold hover:scale-[1.02]'
          : added
          ? 'border-emerald-500 text-emerald-500'
          : 'border-2 border-gold-500 text-gold-600 hover:bg-gold-50 hover:scale-[1.02]',
        !product.inStock && 'opacity-50 cursor-not-allowed'
      )}
    >
      {added ? (
        <>
          <Check size={16} />
          Added!
        </>
      ) : (
        <>
          <ShoppingBag size={16} />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </>
      )}
    </button>
  );
}
