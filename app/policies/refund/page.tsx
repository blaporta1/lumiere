import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Refund & Return Policy',
  description: 'Lumière 30-Day Radiance Guarantee — our commitment to your satisfaction.',
};

export default function RefundPolicyPage() {
  return (
    <div className="pt-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
        <p className="label mb-4">Legal</p>
        <h1 className="heading-lg mb-2">Refund & Return Policy</h1>
        <p className="text-warm-gray font-sans mb-4">Last updated: March 1, 2026</p>

        {/* Guarantee highlight */}
        <div className="bg-gold-50 border border-gold-200 rounded-3xl p-8 mb-12">
          <h2 className="font-serif text-3xl text-charcoal mb-3">
            The 30-Day Radiance Guarantee
          </h2>
          <p className="text-warm-gray font-sans leading-relaxed">
            We are so confident in the effectiveness of our Peptide Eye Patches that we offer a complete, no-questions-asked 30-day money-back guarantee. If you are not completely satisfied with your results, contact us within 30 days of delivery for a full refund.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {[
            {
              title: 'Eligibility',
              content: `You are eligible for a full refund if:

• Your request is made within 30 days of the delivery date.
• The product was purchased directly from lumiere-beauty.com.
• You have tried the product and are unsatisfied with the results.

We do not require you to return the product. We trust our customers.`,
            },
            {
              title: 'How to Request a Refund',
              content: `1. Email us at hello@lumiere-beauty.com with the subject line "Refund Request."
2. Include your order number and a brief description of your experience.
3. Our team will respond within 1 business day and process your refund within 3–5 business days.

Refunds are issued to the original payment method.`,
            },
            {
              title: 'Exchanges',
              content: `If your product arrives damaged or defective, we will send a replacement at no charge. Please contact us with a photo of the damaged item within 7 days of delivery.`,
            },
            {
              title: 'Shipping Costs',
              content: `Lumière covers return shipping costs for damaged or defective items. For change-of-mind returns (covered by our 30-day guarantee), no return shipment is required.`,
            },
            {
              title: 'Subscriptions',
              content: `You may cancel your subscription at any time. Cancellations are effective at the end of the current billing period. We do not offer prorated refunds for unused subscription periods. However, if you wish to return the most recently shipped order under our 30-day guarantee, please contact us.`,
            },
            {
              title: 'Contact',
              content: `For any return or refund inquiries, reach us at hello@lumiere-beauty.com. We aim to respond within 24 hours on business days.`,
            },
          ].map(({ title, content }) => (
            <div key={title}>
              <h2 className="font-serif text-2xl text-charcoal mb-4">{title}</h2>
              <p className="text-warm-gray font-sans leading-relaxed text-sm whitespace-pre-line">
                {content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gold-100 text-center">
          <p className="text-warm-gray font-sans mb-4">
            Have a question about your order?
          </p>
          <Link href="/contact" className="btn-primary text-sm px-8">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
