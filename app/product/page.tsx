'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, BadgeCheck, ChevronDown, ChevronUp, ArrowRight, Minus, Plus } from 'lucide-react';
import { LUMIERE_PRODUCT, SUBSCRIPTION_DISCOUNT } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import IngredientGrid from '@/components/IngredientGrid';
import ReviewCarousel from '@/components/ReviewCarousel';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ProductPage() {
  const product = LUMIERE_PRODUCT;
  const { addItem, openCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscription'>('one-time');
  const [quantity, setQuantity] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);

  const avgRating =
    product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length;

  const displayPrice =
    purchaseType === 'subscription'
      ? product.price * (1 - SUBSCRIPTION_DISCOUNT)
      : product.price;

  const handleAddToCart = () => {
    setAdding(true);
    for (let i = 0; i < quantity; i++) {
      addItem(product, purchaseType);
    }
    setTimeout(() => {
      setAdding(false);
      openCart();
      toast.success('Added to cart!');
    }, 800);
  };

  return (
    <div className="pt-20">
      {/* ── PRODUCT DETAIL ───────────────────────── */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24">
            {/* Images */}
            <div className="flex gap-4">
              {/* Thumbnails */}
              <div className="flex flex-col gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 transition-all duration-200 ${
                      selectedImage === i
                        ? 'ring-2 ring-gold-500 ring-offset-2'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main image */}
              <div className="flex-1 relative aspect-square rounded-[3rem] overflow-hidden bg-champagne-100">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover transition-all duration-500"
                  priority
                />
                {product.badge && (
                  <span className="absolute top-6 left-6 bg-charcoal text-white text-[10px] tracking-widest uppercase px-4 py-2 rounded-full font-sans">
                    {product.badge}
                  </span>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.round(avgRating)
                          ? 'fill-gold-400 text-gold-400'
                          : 'text-gold-200'
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-warm-gray font-sans">
                  {avgRating.toFixed(1)} ({product.reviews.length} reviews)
                </span>
                {product.inStock && (
                  <span className="flex items-center gap-1 text-emerald-600 text-xs font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    In Stock
                  </span>
                )}
              </div>

              <p className="label mb-2">LUMIÈRE</p>
              <h1 className="font-serif text-4xl lg:text-5xl text-charcoal leading-tight mb-4">
                {product.name}
              </h1>
              <p className="text-warm-gray font-sans leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Purchase type selector */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => setPurchaseType('one-time')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                    purchaseType === 'one-time'
                      ? 'border-gold-500 bg-gold-50'
                      : 'border-gold-100 hover:border-gold-200'
                  }`}
                >
                  <p className="font-sans font-medium text-sm text-charcoal mb-1">
                    One-Time Purchase
                  </p>
                  <p className="font-serif text-2xl text-charcoal">
                    {formatPrice(product.price)}
                  </p>
                </button>

                <button
                  onClick={() => setPurchaseType('subscription')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 relative overflow-hidden ${
                    purchaseType === 'subscription'
                      ? 'border-gold-500 bg-gold-50'
                      : 'border-gold-100 hover:border-gold-200'
                  }`}
                >
                  <span className="absolute top-2 right-2 bg-gold-500 text-white text-[9px] tracking-wider px-2 py-0.5 rounded-full font-sans">
                    SAVE {Math.round(SUBSCRIPTION_DISCOUNT * 100)}%
                  </span>
                  <p className="font-sans font-medium text-sm text-charcoal mb-1">
                    Subscribe & Save
                  </p>
                  <p className="font-serif text-2xl text-charcoal">
                    {formatPrice(product.price * (1 - SUBSCRIPTION_DISCOUNT))}
                    <span className="font-sans text-base text-warm-gray">/mo</span>
                  </p>
                </button>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-sans text-warm-gray uppercase tracking-wider">
                  Quantity
                </span>
                <div className="flex items-center gap-3 border border-gold-200 rounded-full px-4 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-warm-gray hover:text-charcoal transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-sans text-charcoal w-6 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-warm-gray hover:text-charcoal transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <span className="text-warm-gray text-sm font-sans">
                  Total:{' '}
                  <span className="text-charcoal font-medium">
                    {formatPrice(displayPrice * quantity)}
                  </span>
                </span>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={adding}
                  className="flex-1 btn-primary text-sm py-4 disabled:opacity-70"
                >
                  {adding ? 'Adding...' : 'Add to Cart'}
                </button>
                <button
                  onClick={async () => {
                    addItem(product, purchaseType);
                    // Small delay then go to checkout
                    setTimeout(() => {
                      window.location.href = '/cart';
                    }, 200);
                  }}
                  className="flex-1 btn-dark text-sm py-4"
                >
                  Buy Now <ArrowRight size={16} />
                </button>
              </div>

              {/* Trust */}
              <div className="flex flex-wrap gap-4 pt-6 border-t border-gold-100">
                {[
                  { icon: BadgeCheck, label: 'Verified Results', sub: '30-day guarantee' },
                  { icon: BadgeCheck, label: 'Free Shipping', sub: 'Orders over $50' },
                  { icon: BadgeCheck, label: 'Secure Checkout', sub: 'Stripe encrypted' },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon size={14} className="text-gold-500 flex-shrink-0" />
                    <div>
                      <p className="text-charcoal text-xs font-sans font-medium">{label}</p>
                      <p className="text-warm-gray text-[10px] font-sans">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INGREDIENTS ──────────────────────────── */}
      <section className="section bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="label mb-4">The Science</p>
            <h2 className="heading-lg">Active Ingredients</h2>
            <p className="text-warm-gray font-sans mt-4 max-w-xl mx-auto">
              Tap each ingredient to discover the science behind the formula.
            </p>
          </div>
          <IngredientGrid ingredients={product.ingredients} />
        </div>
      </section>

      {/* ── HOW TO USE ───────────────────────────── */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="label mb-4">Instructions</p>
            <h2 className="heading-lg">The Perfect Application</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {product.howToUse.map((step, i) => (
              <div
                key={i}
                className="flex gap-5 p-6 bg-white rounded-3xl shadow-luxury hover:shadow-luxury-lg transition-shadow"
              >
                <span className="font-serif text-5xl text-gold-200 leading-none flex-shrink-0">
                  {i + 1}
                </span>
                <p className="text-charcoal font-sans leading-relaxed text-sm pt-2">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────── */}
      <section className="section bg-cream" id="faq">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="label mb-4">FAQ</p>
            <h2 className="heading-lg">Common Questions</h2>
          </div>
          <div className="flex flex-col gap-4">
            {product.faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl overflow-hidden shadow-luxury transition-shadow hover:shadow-luxury-lg"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-8 py-6 text-left"
                >
                  <span className="font-serif text-lg text-charcoal pr-6">
                    {faq.question}
                  </span>
                  {openFaq === i ? (
                    <ChevronUp size={18} className="text-gold-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-warm-gray flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-6 border-t border-gold-50">
                    <p className="text-warm-gray font-sans leading-relaxed text-sm pt-4">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────── */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="label mb-4">Reviews</p>
            <h2 className="heading-lg">
              {product.reviews.length} Verified Reviews
            </h2>
          </div>
          <ReviewCarousel reviews={product.reviews} />
        </div>
      </section>

      {/* ── CROSS-SELL / FINAL CTA ───────────────── */}
      <section className="section bg-charcoal noise-overlay">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-xs tracking-widest uppercase font-sans mb-6">
            Ready?
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-white mb-6">
            Your eyes deserve this.
          </h2>
          <p className="text-white/60 font-sans mb-10">
            Join thousands who wake up to brighter, more youthful-looking skin every morning.
          </p>
          <button
            onClick={() => {
              addItem(product, purchaseType);
              openCart();
            }}
            className="btn-primary text-sm px-12 py-5"
          >
            Add to Cart — {formatPrice(displayPrice)}
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
