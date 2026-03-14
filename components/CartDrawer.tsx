'use client';

import { useCart } from '@/context/CartContext';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import CheckoutButton from './CheckoutButton';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, itemCount } = useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50 animate-fade-in"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-cream z-50 shadow-luxury-lg flex flex-col transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gold-100">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-gold-500" />
            <span className="font-serif text-xl text-charcoal">
              Your Cart {itemCount > 0 && `(${itemCount})`}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-gold-50 text-warm-gray hover:text-charcoal transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
              <div className="w-20 h-20 rounded-full bg-gold-50 flex items-center justify-center">
                <ShoppingBag size={32} className="text-gold-300" />
              </div>
              <div>
                <p className="font-serif text-xl text-charcoal mb-2">Your cart is empty</p>
                <p className="text-sm text-warm-gray font-sans">
                  Discover the ritual your skin deserves.
                </p>
              </div>
              <Link
                href="/product"
                onClick={closeCart}
                className="flex items-center gap-2 px-6 py-3 bg-gold-500 text-white rounded-full text-sm tracking-widest uppercase font-sans font-medium hover:bg-gold-600 transition-colors"
              >
                Shop Now <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.purchaseType}`}
                  className="flex gap-4 pb-6 border-b border-gold-100 last:border-0"
                >
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-champagne-100">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-xs tracking-widest uppercase text-gold-500 mb-1">
                      LUMIÈRE
                    </p>
                    <p className="font-serif text-charcoal text-sm leading-snug mb-1">
                      {item.product.shortName}
                    </p>
                    {item.purchaseType === 'subscription' && (
                      <span className="inline-block text-[10px] tracking-wider uppercase bg-gold-100 text-gold-700 px-2 py-0.5 rounded-full mb-2">
                        Subscribe & Save 15%
                      </span>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded-full border border-gold-200 flex items-center justify-center text-warm-gray hover:border-gold-500 hover:text-charcoal transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-sans text-sm text-charcoal w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-7 h-7 rounded-full border border-gold-200 flex items-center justify-center text-warm-gray hover:border-gold-500 hover:text-charcoal transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="font-serif text-charcoal">
                        {formatPrice(
                          (item.purchaseType === 'subscription'
                            ? item.product.price * 0.85
                            : item.product.price) * item.quantity
                        )}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="self-start p-1 text-warm-gray hover:text-charcoal transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-8 py-6 border-t border-gold-100 bg-white/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-sans text-warm-gray uppercase tracking-wider">
                Subtotal
              </span>
              <span className="font-serif text-xl text-charcoal">
                {formatPrice(total)}
              </span>
            </div>
            <p className="text-xs text-warm-gray mb-5 font-sans">
              Shipping and taxes calculated at checkout
            </p>
            <CheckoutButton />
            <Link
              href="/cart"
              onClick={closeCart}
              className="mt-3 flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-warm-gray hover:text-gold-500 transition-colors font-sans"
            >
              View Full Cart <ArrowRight size={12} />
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
