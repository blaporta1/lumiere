import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { CartItem } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const items: CartItem[] = body.items;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Build Stripe line items
    const lineItems = items.map((item) => {
      const isSubscription = item.purchaseType === 'subscription';
      const unitAmount = Math.round(
        (isSubscription ? item.product.price * 0.85 : item.product.price) * 100
      );

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.name,
            description:
              item.purchaseType === 'subscription'
                ? 'Monthly subscription — 15% discount applied'
                : item.product.tagline,
            images: [item.product.images[0]],
            metadata: {
              productId: item.product.id,
              purchaseType: item.purchaseType,
            },
          },
          unit_amount: unitAmount,
          ...(isSubscription && {
            recurring: { interval: 'month' as const },
          }),
        },
        quantity: item.quantity,
      };
    });

    // Check if any items are subscriptions (needs subscription mode)
    const hasSubscription = items.some((i) => i.purchaseType === 'subscription');
    const hasOneTime = items.some((i) => i.purchaseType === 'one-time');

    // Stripe doesn't allow mixing subscription and one-time in the same session
    // If mixed, default to payment mode and handle subscription separately
    const mode = hasSubscription && !hasOneTime ? 'subscription' : 'payment';

    const session = await stripe.checkout.sessions.create({
      mode: mode as 'payment' | 'subscription',
      line_items: lineItems,
      success_url: `${baseUrl}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'FR', 'DE'],
      },
      allow_promotion_codes: true,
      metadata: {
        items: JSON.stringify(
          items.map((i) => ({
            id: i.product.id,
            quantity: i.quantity,
            type: i.purchaseType,
          }))
        ),
      },
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.error('Checkout error:', err);
    const message =
      err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
