# Lumière — Deployment Guide

## Prerequisites

- Node.js 18+ installed
- A Stripe account (free to create at stripe.com)
- A Vercel account (free at vercel.com)
- (Optional) A Resend account for email (resend.com)

---

## Step 1: Install Dependencies

```bash
cd /path/to/lumiere
npm install
```

---

## Step 2: Configure Stripe

### 2.1 Create your Stripe products

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to **Products** → **Add Product**
3. Create the product:
   - **Name**: Lumière Peptide Collagen Hydrogel Eye Patch
   - **Price**: $48.00 (one-time)
   - Note the **Price ID** (starts with `price_`)
4. Create a second price on the same product:
   - **$40.80** (recurring, monthly) — 15% discount
   - Note this **Price ID** too

### 2.2 Set up the Stripe Webhook (for local dev)

Install the Stripe CLI:
```bash
brew install stripe/stripe-cli/stripe
stripe login
stripe listen --forward-to localhost:3000/api/webhook
```

Copy the webhook signing secret it gives you (starts with `whsec_`).

---

## Step 3: Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY
STRIPE_SECRET_KEY=sk_test_YOUR_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET

STRIPE_PRICE_ID_ONE_TIME=price_YOUR_ONE_TIME_PRICE
STRIPE_PRICE_ID_SUBSCRIPTION=price_YOUR_SUBSCRIPTION_PRICE

NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Optional: Resend for email
RESEND_API_KEY=re_YOUR_KEY
EMAIL_FROM=hello@yourdomain.com
```

---

## Step 4: Run Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Test the Stripe checkout

Use Stripe test cards:
- **Success**: `4242 4242 4242 4242` (any future date, any CVC)
- **Declined**: `4000 0000 0000 0002`
- **Authentication required**: `4000 0025 0000 3155`

---

## Step 5: Deploy to Vercel

### 5.1 Push to GitHub

```bash
git init
git add .
git commit -m "Initial Lumière ecommerce site"
git remote add origin https://github.com/YOUR_USERNAME/lumiere.git
git push -u origin main
```

### 5.2 Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel auto-detects Next.js — no build configuration needed

### 5.3 Add Environment Variables in Vercel

In your Vercel project settings → **Environment Variables**, add:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` |
| `STRIPE_SECRET_KEY` | `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` (from step below) |
| `STRIPE_PRICE_ID_ONE_TIME` | `price_...` |
| `STRIPE_PRICE_ID_SUBSCRIPTION` | `price_...` |
| `NEXT_PUBLIC_BASE_URL` | `https://your-domain.com` |
| `RESEND_API_KEY` | `re_...` (optional) |

### 5.4 Configure Production Stripe Webhook

1. In Stripe Dashboard → **Webhooks** → **Add endpoint**
2. **URL**: `https://your-domain.vercel.app/api/webhook`
3. **Events to listen for**:
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `customer.subscription.created`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copy the **Signing Secret** → add as `STRIPE_WEBHOOK_SECRET` in Vercel

### 5.5 Deploy

```bash
vercel --prod
```

Or simply push to main — Vercel auto-deploys.

---

## Step 6: Custom Domain (Optional)

In Vercel project settings → **Domains**:
1. Add `lumiere-beauty.com`
2. Update your DNS records as instructed
3. Vercel automatically provisions SSL

---

## Email Integration (Optional)

To enable real order confirmation emails, uncomment the Resend integration in:

- `app/api/webhook/route.ts` — for order confirmations
- `app/api/contact/route.ts` — for contact form submissions

Install Resend:
```bash
npm install resend
```

Get your API key at [resend.com](https://resend.com) and verify your sending domain.

---

## Optional Enhancements

### Analytics
Add Vercel Analytics (free):
```bash
npm install @vercel/analytics
```

In `app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';
// Add <Analytics /> inside the body
```

### SEO / Sitemap
```bash
npm install next-sitemap
```

### Performance
- All images use Next.js `<Image />` with automatic WebP optimization
- Pages are server-rendered for optimal Core Web Vitals
- Fonts are loaded via Google Fonts with `display=swap`

### Framer Motion Animations
To add scroll-triggered animations, install:
```bash
npm install framer-motion
```

Then wrap sections with `<motion.div>` using `whileInView` props.

---

## File Structure

```
lumiere/
├── app/
│   ├── layout.tsx              ← Root layout + providers
│   ├── globals.css             ← Tailwind + custom styles
│   ├── page.tsx                ← Homepage
│   ├── product/page.tsx        ← Product detail page
│   ├── cart/page.tsx           ← Cart page
│   ├── order-confirmation/     ← Post-checkout success
│   ├── about/page.tsx          ← Brand story
│   ├── contact/page.tsx        ← Contact form
│   ├── policies/               ← Privacy, Terms, Refund
│   └── api/
│       ├── checkout/route.ts   ← Stripe checkout session
│       ├── webhook/route.ts    ← Stripe webhook handler
│       ├── products/route.ts   ← Product data API
│       └── contact/route.ts    ← Contact form handler
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── CartDrawer.tsx
│   ├── AddToCartButton.tsx
│   ├── CheckoutButton.tsx
│   ├── ReviewCarousel.tsx
│   ├── IngredientGrid.tsx
│   └── ProductCard.tsx
├── context/
│   └── CartContext.tsx         ← Cart state + localStorage
├── lib/
│   ├── stripe.ts               ← Stripe client
│   └── products.ts             ← Product data
├── types/
│   └── index.ts                ← TypeScript types
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

---

## Going Live Checklist

- [ ] Switch Stripe keys from `pk_test_` / `sk_test_` to `pk_live_` / `sk_live_`
- [ ] Create live Stripe products and update Price IDs
- [ ] Configure production webhook URL in Stripe Dashboard
- [ ] Set `NEXT_PUBLIC_BASE_URL` to your production domain
- [ ] Test a real $1 transaction
- [ ] Verify order confirmation emails are sending
- [ ] Add Google Analytics / Vercel Analytics
- [ ] Submit sitemap to Google Search Console
- [ ] Review all legal pages (Privacy, Terms, Refund)
