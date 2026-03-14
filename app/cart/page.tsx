'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X, ArrowLeft, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CheckoutButton from '@/components/CheckoutButton';
import { formatPrice } from '@/lib/utils';
import { SUBSCRIPTION_DISCOUNT } from '@/lib/products';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-24 h-24 rounded-full bg-gold-50 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={36} className="text-gold-300" />
          </div>
          <h1 className="font-serif text-4xl text-charcoal mb-4">Your cart is empty</h1>
          <p className="text-warm-gray font-sans mb-8">
            Discover the ritual your skin has been waiting for.
          </p>
          <Link href="/product" className="btn-primary">
            Shop Now <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <Link
            href="/product"
            className="p-2 rounded-full border border-gold-200 text-warm-gray hover:border-gold-500 hover:text-gold-600 transition-all"
          >
            <ArrowLeft size={18} />
          </Link>
          <h1 className="font-serif text-4xl text-charcoal">
            Your Cart{' '}
            <span className="text-warm-gray text-2xl font-sans">
              ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart items */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {items.map((item) => {
              const price =
                item.purchaseType === 'subscription'
                  ? item.product.price * (1 - SUBSCRIPTION_DISCOUNT)
                  : item.product.price;

              return (
                <div
                  key={`${item.product.id}-${item.purchaseType}`}
                  className="flex gap-6 p-6 bg-white rounded-3xl shadow-luxury"
                >
                  {/* Image */}
                  <div className="relative w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 bg-champagne-100">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="label mb-1">LUMIÈRE</p>
                        <h3 className="font-serif text-xl text-charcoal leading-snug mb-1">
                          {item.product.shortName}
                        </h3>
                        {item.purchaseType === 'subscription' && (
                          <span className="inline-block text-[10px] tracking-wider uppercase bg-gold-100 text-gold-700 px-2 py-0.5 rounded-full font-sans">
                            Subscribe & Save {Math.round(SUBSCRIPTION_DISCOUNT * 100)}%
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-2 rounded-full text-warm-gray hover:text-charcoal hover:bg-gold-50 transition-colors flex-shrink-0"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center gap-3 border border-gold-200 rounded-full px-4 py-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="text-warm-gray hover:text-charcoal transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-sans text-charcoal w-6 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="text-warm-gray hover:text-charcoal transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-serif text-2xl text-charcoal">
                          {formatPrice(price * item.quantity)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-warm-gray text-xs font-sans">
                            {formatPrice(price)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-luxury p-8 sticky top-28">
              <h2 className="font-serif text-2xl text-charcoal mb-6">
                Order Summary
              </h2>

              <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-gold-100">
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-warm-gray">Subtotal ({itemCount} items)</span>
                  <span className="text-charcoal">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-warm-gray">Shipping</span>
                  <span className="text-emerald-600">
                    {total >= 50 ? 'Free' : formatPrice(9.99)}
                  </span>
                </div>
                {total < 50 && (
                  <p className="text-xs text-warm-gray font-sans bg-gold-50 rounded-2xl p-3">
                    Add {formatPrice(50 - total)} more for free shipping
                  </p>
                )}
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-warm-gray">Taxes</span>
                  <span className="text-warm-gray">Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="font-serif text-xl text-charcoal">Total</span>
                <span className="font-serif text-3xl text-charcoal">
                  {formatPrice(total + (total >= 50 ? 0 : 9.99))}
                </span>
              </div>

              <CheckoutButton />

              <p className="text-center text-xs text-warm-gray font-sans mt-4">
                Secure checkout powered by{' '}
                <span className="font-medium">Stripe</span>
              </p>

              {/* Promo */}
              <div className="mt-6 pt-6 border-t border-gold-100">
                <p className="text-xs font-sans text-warm-gray mb-3 uppercase tracking-wider">
                  Promo Code
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="input flex-1 py-2.5 text-xs"
                  />
                  <button className="px-4 py-2.5 bg-charcoal text-white rounded-xl text-xs font-sans hover:bg-gold-600 transition-colors">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
