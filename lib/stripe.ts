import Stripe from 'stripe';
import { formatPrice } from './utils';

// Re-export so existing imports of formatPrice from this file keep working
export { formatPrice };

/**
 * Lazily-initialised Stripe client.
 * Using a getter means the module can be imported at build time without
 * requiring STRIPE_SECRET_KEY to be present — the key is only read the
 * first time an API route actually calls getStripe().
 */
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY environment variable is not set.');
  }
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    });
  }
  return _stripe;
}

// Convenience proxy so existing code using `stripe.checkout...` still works
export const stripe: Stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return getStripe()[prop as keyof Stripe];
  },
});
