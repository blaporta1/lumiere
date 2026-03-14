import { Product } from '@/types';

export const LUMIERE_PRODUCT: Product = {
  id: 'lumiere-peptide-eye-patch',
  name: 'Lumière Peptide Collagen Hydrogel Eye Patch',
  shortName: 'Peptide Eye Patch',
  tagline: 'Radiance Restored. Youth Renewed.',
  description:
    'Our signature Peptide Collagen Hydrogel Eye Patches are engineered with a bioactive complex of collagen-stimulating peptides, niacinamide, caffeine, and Vitamin B12 to visibly firm, brighten, and deeply hydrate the delicate under-eye area in as little as 20 minutes.',
  price: 48.00,
  comparePrice: 64.00,
  currency: 'USD',
  images: [
    '/images/product.jpg',
    '/images/product.jpg',
    'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=90',
    'https://images.unsplash.com/photo-1571781565036-d3f759be73e4?w=800&q=90',
  ],
  benefits: [
    'Visibly reduces dark circles and puffiness in 20 minutes',
    'Clinically proven peptide complex stimulates natural collagen production',
    'Ultra-hydrating hydrogel locks in moisture for 72 hours',
    'Brightens and evens skin tone with niacinamide',
    'Energizes and de-puffs with precision caffeine delivery',
    'Suitable for all skin types including sensitive skin',
  ],
  ingredients: [
    {
      name: 'Peptide Complex',
      description:
        'A proprietary blend of five bioactive peptides — including Argireline® and Matrixyl® 3000 — that signal fibroblasts to produce collagen and elastin, softening fine lines and firming the contour.',
      icon: '✦',
      color: '#C9A97B',
    },
    {
      name: 'Marine Collagen',
      description:
        'Sustainably sourced marine collagen with a molecular weight optimized for transdermal absorption, instantly plumping and restructuring the delicate under-eye skin matrix.',
      icon: '◈',
      color: '#D4B896',
    },
    {
      name: 'Niacinamide 5%',
      description:
        'A stabilized, pharmaceutical-grade niacinamide that inhibits melanin transfer to visibly fade hyperpigmentation, tighten pores, and restore skin luminosity.',
      icon: '◇',
      color: '#E8D5C4',
    },
    {
      name: 'Caffeine',
      description:
        'Micro-encapsulated caffeine that penetrates rapidly to constrict blood vessels, dramatically reducing puffiness and neutralizing dark circles caused by pooled blood.',
      icon: '❋',
      color: '#B8A090',
    },
    {
      name: 'Vitamin B12',
      description:
        'Methylcobalamin, the most bioavailable form of B12, energizes skin cells, supports barrier repair, and imparts an immediate luminous glow to tired, dull under-eye skin.',
      icon: '✧',
      color: '#C9A97B',
    },
    {
      name: 'Hydrogel Matrix',
      description:
        'A cross-linked polyacrylamide hydrogel infused with hyaluronic acid at three molecular weights, delivering continuous moisture for up to 72 hours while conforming perfectly to every contour.',
      icon: '◉',
      color: '#E2C9B5',
    },
  ],
  howToUse: [
    'Cleanse and gently pat your face dry before application.',
    'Carefully peel one pair of patches from the tray using the pull tab.',
    'Apply the patches under each eye, smoothing gently from the inner corner outward.',
    'Relax and leave on for 20–30 minutes. Do not move or fold the patches.',
    'Remove patches and gently pat remaining serum into the skin — do not rinse.',
    'Use 3–5 times per week, or as needed before special occasions.',
  ],
  faqs: [
    {
      question: 'How quickly will I see results?',
      answer:
        'Most clients notice visible reduction in puffiness and brightening within the first 20-minute session. For lasting improvements to fine lines and dark circles, consistent use over 4–6 weeks is recommended.',
    },
    {
      question: 'Is it safe for sensitive skin?',
      answer:
        'Yes. Lumière Eye Patches are formulated without parabens, sulfates, artificial fragrances, or alcohol. All ingredients are dermatologist-tested and ophthalmologist-approved for use near the eye area.',
    },
    {
      question: 'How many patches are in one box?',
      answer:
        'Each box contains 30 pairs (60 individual patches), providing a 30-day supply at daily use or up to 10 weeks when used 3× per week.',
    },
    {
      question: 'Can I use them with my existing skincare routine?',
      answer:
        'Absolutely. Apply the patches after cleansing and toning, before your moisturizer or eye cream. The remaining serum left after removal can be patted in before applying additional products.',
    },
    {
      question: 'What is your return policy?',
      answer:
        'We stand behind every product with our 30-Day Radiance Guarantee. If you are not completely satisfied, contact us within 30 days for a full refund — no questions asked.',
    },
    {
      question: 'Are Lumière products cruelty-free and vegan?',
      answer:
        'Lumière is 100% cruelty-free and certified by Leaping Bunny. Our formulas are vegan with the exception of the marine collagen variant. We offer a plant-based collagen option on request.',
    },
  ],
  reviews: [
    {
      id: 'r1',
      name: 'Sophia L.',
      location: 'New York, NY',
      rating: 5,
      title: 'My morning ritual is incomplete without these',
      body: 'I have tried every high-end eye patch on the market — 111Skin, SK-II, Charlotte Tilbury. Lumière surpasses them all. The hydrogel texture is pure luxury and my under-eyes look genuinely rested after just one use. The dark circles I have battled for years are visibly lighter after three weeks.',
      date: '2026-02-14',
      verified: true,
    },
    {
      id: 'r2',
      name: 'Isabelle M.',
      location: 'Los Angeles, CA',
      rating: 5,
      title: 'Used before the Oscars — stunning results',
      body: 'As a makeup artist, I always keep these on hand for clients. They reduce puffiness in 20 minutes like nothing else I have used, and makeup applies flawlessly over the skin afterward. The glow is real.',
      date: '2026-01-28',
      verified: true,
    },
    {
      id: 'r3',
      name: 'Aiko T.',
      location: 'San Francisco, CA',
      rating: 5,
      title: 'Worth every single penny',
      body: 'I was hesitant at the price point but my dermatologist specifically recommended the peptide complex in this formula. Four weeks in and I am getting compliments on my skin for the first time in years. The fine lines around my eyes have genuinely softened.',
      date: '2026-02-03',
      verified: true,
    },
    {
      id: 'r4',
      name: 'Charlotte B.',
      location: 'Miami, FL',
      rating: 5,
      title: 'Absolute game-changer for tired skin',
      body: 'Between red-eye flights and long work weeks, my eyes always look exhausted. These patches are the only thing that makes me look human again. The cooling hydrogel sensation is incredible and the results are immediate.',
      date: '2025-12-19',
      verified: true,
    },
    {
      id: 'r5',
      name: 'Natalia R.',
      location: 'Chicago, IL',
      rating: 5,
      title: 'The vitamin B12 glow is real',
      body: 'I noticed a visible glow after just the first use — something I have never experienced with other eye patches. The B12 really does work. I have since switched my whole routine to Lumière. Cannot recommend this brand highly enough.',
      date: '2026-01-10',
      verified: true,
    },
  ],
  stripePriceId: process.env.STRIPE_PRICE_ID_ONE_TIME || 'price_placeholder',
  stripeSubscriptionPriceId:
    process.env.STRIPE_PRICE_ID_SUBSCRIPTION || 'price_placeholder_sub',
  inStock: true,
  badge: 'Best Seller',
};

export const SUBSCRIPTION_DISCOUNT = 0.15; // 15% off
