import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Lumière Terms of Service — the terms governing use of our website and purchase of our products.',
};

export default function TermsPage() {
  return (
    <div className="pt-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
        <p className="label mb-4">Legal</p>
        <h1 className="heading-lg mb-2">Terms of Service</h1>
        <p className="text-warm-gray font-sans mb-12">Last updated: March 1, 2026</p>

        <div className="flex flex-col gap-10">
          {[
            {
              title: '1. Acceptance of Terms',
              content: `By accessing or using the Lumière website (lumiere-beauty.com) and purchasing our products, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our website or purchase our products.`,
            },
            {
              title: '2. Products and Pricing',
              content: `All product descriptions, including ingredients, benefits, and usage instructions, are provided in good faith. Prices are listed in US dollars and are subject to change without notice. We reserve the right to limit quantities, discontinue products, or correct errors in pricing or product descriptions.`,
            },
            {
              title: '3. Orders and Payment',
              content: `By placing an order, you represent that you are at least 18 years of age and that the payment information you provide is accurate and complete. All payments are processed securely by Stripe. Your order constitutes an offer to purchase, which we may accept or decline at our discretion.`,
            },
            {
              title: '4. Shipping and Delivery',
              content: `We ship to the US, Canada, UK, Australia, France, and Germany. Estimated delivery times are provided at checkout and are not guaranteed. We are not responsible for delays caused by carriers, customs, or events beyond our control. Risk of loss and title pass to you upon delivery.`,
            },
            {
              title: '5. Subscriptions',
              content: `Subscription products are billed monthly on the date of your first purchase. You may cancel your subscription at any time by contacting us before the next billing cycle. Cancellations take effect at the end of the current billing period. We do not offer prorated refunds for unused subscription periods.`,
            },
            {
              title: '6. Intellectual Property',
              content: `All content on this website, including text, images, logos, and design, is the property of Lumière Beauty and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without written permission.`,
            },
            {
              title: '7. Limitation of Liability',
              content: `To the maximum extent permitted by law, Lumière Beauty shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our products or website. Our total liability shall not exceed the amount paid by you for the product giving rise to the claim.`,
            },
            {
              title: '8. Governing Law',
              content: `These Terms are governed by the laws of the State of New York, without regard to conflict of law principles. Any disputes shall be resolved exclusively in the courts of New York County, New York.`,
            },
            {
              title: '9. Contact',
              content: `For questions about these Terms, contact us at hello@lumiere-beauty.com.`,
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
      </div>
    </div>
  );
}
