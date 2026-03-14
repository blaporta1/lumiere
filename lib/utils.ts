/**
 * Format a number as a currency string.
 * Kept separate from lib/stripe.ts so it can be safely imported
 * in client components without pulling in the Stripe SDK.
 */
export function formatPrice(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}
