import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

// Disable body parsing — Stripe requires raw body for signature verification
export const runtime = 'nodejs';

async function sendConfirmationEmail(
  email: string,
  name: string,
  sessionId: string
) {
  // If using Resend:
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({...})
  //
  // For now, we log — replace with your email provider
  console.log(`[Email] Confirmation sent to ${email} (${name}) for session ${sessionId}`);
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json(
      { error: 'Missing stripe signature or webhook secret' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Handle events
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log(`[Webhook] Payment successful — Session: ${session.id}`);

      // Extract customer info
      const customerEmail =
        session.customer_details?.email ?? session.customer_email ?? '';
      const customerName = session.customer_details?.name ?? 'Valued Customer';

      // Fulfill order
      // TODO: Save order to your database here
      // await db.orders.create({ sessionId: session.id, email: customerEmail, ... })

      // Send confirmation email
      if (customerEmail) {
        await sendConfirmationEmail(customerEmail, customerName, session.id);
      }

      break;
    }

    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(`[Webhook] Session expired — ${session.id}`);
      break;
    }

    case 'customer.subscription.created': {
      const subscription = event.data.object as Stripe.Subscription;
      console.log(`[Webhook] Subscription created — ${subscription.id}`);
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      console.log(`[Webhook] Subscription cancelled — ${subscription.id}`);
      break;
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice;
      console.log(`[Webhook] Invoice paid — ${invoice.id}`);
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      console.error(`[Webhook] Invoice payment failed — ${invoice.id}`);
      // TODO: Notify customer, pause subscription, etc.
      break;
    }

    default:
      console.log(`[Webhook] Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
