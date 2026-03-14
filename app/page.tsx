import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Star,
  Shield,
  Truck,
  RefreshCw,
  Sparkles,
  FlaskConical,
  Leaf,
} from 'lucide-react';
import { LUMIERE_PRODUCT } from '@/lib/products';
import AddToCartButton from '@/components/AddToCartButton';
import ReviewCarousel from '@/components/ReviewCarousel';
import IngredientGrid from '@/components/IngredientGrid';
import { formatPrice } from '@/lib/stripe';

const trustBadges = [
  {
    icon: Shield,
    label: 'Dermatologist Tested',
    sub: 'Clinically validated formula',
  },
  {
    icon: Leaf,
    label: 'Cruelty-Free',
    sub: 'Certified by Leaping Bunny',
  },
  {
    icon: FlaskConical,
    label: 'Science-Backed',
    sub: 'Peer-reviewed ingredients',
  },
  {
    icon: Sparkles,
    label: 'Clean Beauty',
    sub: 'Free of 1,800+ harmful ingredients',
  },
];

const guarantees = [
  { icon: Truck, label: 'Free Shipping', sub: 'On orders over $50' },
  { icon: RefreshCw, label: '30-Day Returns', sub: 'Radiance Guarantee' },
  { icon: Shield, label: 'Secure Payment', sub: 'SSL encrypted checkout' },
];

export default function HomePage() {
  const product = LUMIERE_PRODUCT;
  const avgRating =
    product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length;

  return (
    <>
      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end pb-20 lg:pb-32 noise-overlay overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1800&q=85"
            alt="Lumière hero"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-charcoal/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/50 to-transparent" />
        </div>

        {/* Floating product image */}
        <div className="absolute top-1/2 right-8 lg:right-24 -translate-y-1/2 hidden lg:block">
          <div className="relative w-80 h-80 xl:w-96 xl:h-96 animate-float">
            <div className="absolute inset-0 rounded-full bg-gold-500/20 blur-3xl" />
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Label */}
            <div className="flex items-center gap-3 mb-6 animate-fade-up">
              <span className="h-px w-12 bg-gold-400" />
              <span className="text-gold-300 text-xs tracking-widest uppercase font-sans">
                New Ritual Collection
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-serif text-5xl lg:text-7xl xl:text-8xl text-white leading-none mb-6 animate-fade-up"
              style={{ animationDelay: '0.1s' }}
            >
              Radiance
              <br />
              <span className="italic text-gold-gradient">Restored.</span>
            </h1>

            <p
              className="text-white/75 font-sans text-lg lg:text-xl leading-relaxed mb-8 max-w-lg animate-fade-up"
              style={{ animationDelay: '0.2s' }}
            >
              The science of youth, distilled into 20 minutes. Our Peptide Collagen Hydrogel Eye Patches awaken the skin you thought time had claimed.
            </p>

            {/* Rating */}
            <div
              className="flex items-center gap-3 mb-8 animate-fade-up"
              style={{ animationDelay: '0.25s' }}
            >
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    size={16}
                    className={
                      n <= Math.round(avgRating)
                        ? 'fill-gold-400 text-gold-400'
                        : 'text-gold-800'
                    }
                  />
                ))}
              </div>
              <span className="text-white/60 text-sm font-sans">
                {avgRating.toFixed(1)} · {product.reviews.length} reviews
              </span>
            </div>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-4 items-center animate-fade-up"
              style={{ animationDelay: '0.3s' }}
            >
              <Link href="/product" className="btn-primary text-sm px-10 py-4">
                Shop Now — {formatPrice(product.price)}
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/product"
                className="text-white/70 text-sm font-sans hover:text-white transition-colors flex items-center gap-2"
              >
                Learn More <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 animate-pulse-soft">
          <span className="text-white/30 text-[10px] tracking-widest uppercase font-sans">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* ── TRUST BADGES ─────────────────────────── */}
      <section className="border-y border-gold-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gold-100">
            {trustBadges.map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="flex items-center gap-4 px-6 py-6 hover:bg-gold-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gold-50 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-gold-500" />
                </div>
                <div>
                  <p className="font-sans font-medium text-sm text-charcoal">
                    {label}
                  </p>
                  <p className="text-warm-gray text-xs font-sans">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT FEATURE ──────────────────────── */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden bg-champagne-100">
                <Image
                  src="/images/product.jpg"
                  alt={product.name}
                  fill
                  className="object-cover object-center"
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-white rounded-3xl shadow-luxury-lg p-6 max-w-[200px]">
                <p className="font-serif text-4xl text-gold-500 mb-1">20</p>
                <p className="text-charcoal font-sans font-medium text-sm">Minutes</p>
                <p className="text-warm-gray text-xs font-sans">
                  to visibly brighter eyes
                </p>
              </div>
              {/* Floating review snippet */}
              <div className="absolute -top-6 -left-6 lg:-left-10 bg-charcoal text-white rounded-3xl shadow-luxury-lg p-5 max-w-[220px]">
                <div className="flex gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-xs font-sans leading-relaxed text-white/80">
                  &ldquo;My dark circles have visibly faded after just two weeks.&rdquo;
                </p>
                <p className="text-gold-400 text-[10px] font-sans mt-2">— Sophia L.</p>
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="label mb-4">Hero Product</p>
              <h2 className="heading-lg mb-6">{product.shortName}</h2>
              <p className="text-warm-gray font-sans leading-relaxed mb-8 text-lg">
                {product.description}
              </p>

              {/* Benefits */}
              <ul className="flex flex-col gap-3 mb-10">
                {product.benefits.slice(0, 4).map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-gold-600 text-xs">✓</span>
                    </span>
                    <span className="text-charcoal font-sans text-sm">{b}</span>
                  </li>
                ))}
              </ul>

              {/* Price + CTA */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-serif text-4xl text-charcoal">
                  {formatPrice(product.price)}
                </span>
                {product.comparePrice && (
                  <span className="text-warm-gray text-lg line-through font-sans">
                    {formatPrice(product.comparePrice)}
                  </span>
                )}
                <span className="bg-gold-100 text-gold-700 text-xs px-3 py-1 rounded-full font-sans tracking-wider">
                  Save 25%
                </span>
              </div>

              <div className="flex flex-wrap gap-4">
                <AddToCartButton product={product} size="lg" />
                <Link href="/product" className="btn-outline">
                  View Details <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────── */}
      <section className="section bg-charcoal noise-overlay">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold-400 text-xs tracking-widest uppercase font-sans mb-4">
              Why Lumière
            </p>
            <h2 className="font-serif text-4xl lg:text-6xl text-white leading-tight">
              The ritual your skin
              <br />
              <span className="italic text-gold-gradient">has been waiting for</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.benefits.map((benefit, i) => (
              <div
                key={i}
                className="relative p-8 rounded-3xl border border-white/10 hover:border-gold-500/50 transition-all duration-300 hover:bg-white/5 group"
              >
                <span className="font-serif text-5xl text-gold-600/30 absolute top-6 right-8 select-none group-hover:text-gold-500/50 transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-white font-sans leading-relaxed text-sm pr-8">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INGREDIENTS ──────────────────────────── */}
      <section className="section bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <p className="label mb-4">The Formula</p>
              <h2 className="heading-lg max-w-xl">
                Bioactive ingredients, meticulously chosen
              </h2>
            </div>
            <p className="text-warm-gray font-sans max-w-sm lg:text-right text-sm leading-relaxed">
              Every ingredient earns its place. No fillers, no compromises — only what your skin genuinely needs.
            </p>
          </div>
          <IngredientGrid ingredients={product.ingredients} />
        </div>
      </section>

      {/* ── HOW TO USE ───────────────────────────── */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="label mb-4">The Ritual</p>
              <h2 className="heading-lg mb-8">How to use</h2>
              <ol className="flex flex-col gap-6">
                {product.howToUse.map((step, i) => (
                  <li key={i} className="flex gap-5">
                    <span className="font-serif text-4xl text-gold-200 leading-none flex-shrink-0 w-8">
                      {i + 1}
                    </span>
                    <p className="text-warm-gray font-sans leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden">
              <Image
                src={product.images[2]}
                alt="How to use Lumière Eye Patches"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="font-serif text-3xl text-white mb-1 italic">
                  20 minutes.
                </p>
                <p className="text-white/70 font-sans text-sm">
                  A lifetime of radiance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────── */}
      <section className="section bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <p className="label mb-4">Reviews</p>
              <h2 className="heading-lg">
                Loved by{' '}
                <span className="italic text-gold-500">thousands</span>
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-serif text-5xl text-charcoal">{avgRating.toFixed(1)}</p>
                <div className="flex justify-end gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-warm-gray text-xs font-sans mt-1">
                  {product.reviews.length} verified reviews
                </p>
              </div>
            </div>
          </div>
          <ReviewCarousel reviews={product.reviews} />
        </div>
      </section>

      {/* ── BRAND STORY ──────────────────────────── */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 bg-luxury-gradient" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <Sparkles className="text-gold-400 mx-auto mb-6" size={32} />
          <p className="label mb-6">Our Story</p>
          <h2 className="heading-xl mb-8">
            Born from a belief that beauty should be{' '}
            <span className="italic">effortless</span>
          </h2>
          <p className="text-warm-gray font-sans text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
            Lumière was founded by a team of cosmetic scientists and skincare obsessives who believed that the most effective formulas shouldn't require a PhD to understand — or a second mortgage to afford.
          </p>
          <p className="text-warm-gray font-sans text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            We spent three years developing our Peptide Eye Patch formula, testing over 200 ingredient combinations until we achieved what we believe to be the most effective under-eye treatment available outside a dermatologist's office.
          </p>
          <Link href="/about" className="btn-outline">
            Our Full Story <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── SUBSCRIPTION UPSELL ──────────────────── */}
      <section className="section bg-charcoal noise-overlay" id="subscription">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* One-time */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-gold-500/40 transition-all duration-300">
              <p className="text-white/50 text-xs tracking-widest uppercase font-sans mb-4">
                One-Time Purchase
              </p>
              <p className="font-serif text-4xl text-white mb-2">
                {formatPrice(product.price)}
              </p>
              <p className="text-white/50 text-sm font-sans mb-6">
                30 pairs · Free shipping
              </p>
              <ul className="flex flex-col gap-3 mb-8">
                {['30 pairs (60 individual patches)', 'Free standard shipping', '30-Day Radiance Guarantee', 'Complimentary samples'].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/70 font-sans">
                    <span className="text-gold-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <AddToCartButton product={product} variant="outline" fullWidth />
            </div>

            {/* Subscription */}
            <div className="bg-gold-500 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-white text-gold-600 text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full font-sans font-bold">
                Most Popular
              </div>
              <p className="text-white/70 text-xs tracking-widest uppercase font-sans mb-4">
                Subscribe & Save
              </p>
              <p className="font-serif text-4xl text-white mb-1">
                {formatPrice(product.price * 0.85)}
                <span className="font-sans text-lg text-white/70">/mo</span>
              </p>
              <p className="text-white/70 text-sm font-sans mb-1">
                <span className="line-through">{formatPrice(product.price)}</span>{' '}
                — Save 15%
              </p>
              <p className="text-white/50 text-xs font-sans mb-6">
                Cancel anytime, no commitment
              </p>
              <ul className="flex flex-col gap-3 mb-8">
                {[
                  '30 pairs monthly · Auto-replenishment',
                  'Free priority shipping every month',
                  '30-Day Radiance Guarantee',
                  'Early access to new products',
                  'Dedicated loyalty rewards',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white font-sans">
                    <span className="text-white/60">✓</span> {f}
                  </li>
                ))}
              </ul>
              <AddToCartButton
                product={product}
                purchaseType="subscription"
                fullWidth
                variant="outline"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── GUARANTEE ────────────────────────────── */}
      <section className="border-y border-gold-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gold-100">
            {guarantees.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-5 px-8 py-8">
                <div className="w-12 h-12 rounded-full bg-charcoal flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-gold-400" />
                </div>
                <div>
                  <p className="font-sans font-semibold text-charcoal">{label}</p>
                  <p className="text-warm-gray text-sm font-sans">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────── */}
      <section className="section">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="label mb-6">Begin Your Ritual</p>
          <h2 className="heading-xl mb-6">
            Your most radiant skin
            <br />
            <span className="italic text-gold-500">starts today</span>
          </h2>
          <p className="text-warm-gray font-sans text-lg leading-relaxed mb-10">
            Join thousands of women who have reclaimed their glow with Lumière. Backed by science, proven by results.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/product" className="btn-primary text-sm px-12 py-5">
              Shop Now <ArrowRight size={16} />
            </Link>
            <Link href="/about" className="btn-outline text-sm px-12 py-5">
              Learn Our Story
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
