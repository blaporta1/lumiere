import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Lumière Privacy Policy — how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
        <p className="label mb-4">Legal</p>
        <h1 className="heading-lg mb-2">Privacy Policy</h1>
        <p className="text-warm-gray font-sans mb-12">Last updated: March 1, 2026</p>

        <div className="prose max-w-none">
          <div className="flex flex-col gap-10">
            {[
              {
                title: '1. Information We Collect',
                content: `We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This includes:

• **Personal identifiers**: Name, email address, billing and shipping address, phone number.
• **Payment information**: We use Stripe to process payments. Lumière does not store full credit card numbers. Stripe's privacy policy governs the handling of your payment information.
• **Order information**: Products purchased, order history, and transaction data.
• **Communications**: Messages you send us through our contact form or email.
• **Usage data**: Information about how you interact with our website, including pages visited, time spent, and referring URLs.`,
              },
              {
                title: '2. How We Use Your Information',
                content: `We use the information we collect to:

• Process and fulfill your orders, including sending order confirmations and shipping updates.
• Communicate with you about your account, orders, and our products.
• Send promotional communications if you have opted in (you may unsubscribe at any time).
• Improve our website, products, and customer experience.
• Comply with legal obligations and enforce our policies.
• Detect and prevent fraud and other illegal activities.`,
              },
              {
                title: '3. Information Sharing',
                content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with:

• **Service providers**: Stripe (payment processing), Vercel (hosting), Resend (email delivery), and analytics providers who assist us in operating our website.
• **Legal requirements**: When required by law, court order, or government authority.
• **Business transfers**: In connection with a merger, acquisition, or sale of all or a portion of our assets.`,
              },
              {
                title: '4. Cookies and Tracking',
                content: `We use cookies and similar tracking technologies to:

• Remember your cart contents and preferences.
• Analyze website traffic and usage patterns (via privacy-respecting analytics).
• Enable certain features of our website.

You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, some parts of our website may not function properly if you do so.`,
              },
              {
                title: '5. Data Retention',
                content: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law. Order records are typically retained for 7 years for accounting and legal compliance purposes.`,
              },
              {
                title: '6. Your Rights',
                content: `Depending on your location, you may have the right to:

• **Access**: Request a copy of the personal information we hold about you.
• **Correction**: Request correction of inaccurate personal information.
• **Deletion**: Request deletion of your personal information, subject to certain exceptions.
• **Portability**: Receive your personal information in a structured, machine-readable format.
• **Opt-out**: Opt out of marketing communications at any time by clicking "unsubscribe" in any email or contacting us directly.

To exercise any of these rights, please contact us at hello@lumiere-beauty.com.`,
              },
              {
                title: '7. Security',
                content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data in transit is encrypted using TLS/SSL. Payment processing is handled exclusively by Stripe, which maintains PCI DSS compliance.`,
              },
              {
                title: '8. Children\'s Privacy',
                content: `Our website is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.`,
              },
              {
                title: '9. Changes to This Policy',
                content: `We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our website after any changes constitutes your acceptance of the updated policy.`,
              },
              {
                title: '10. Contact Us',
                content: `If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:

Lumière Beauty
Email: hello@lumiere-beauty.com
Website: lumiere-beauty.com`,
              },
            ].map(({ title, content }) => (
              <div key={title}>
                <h2 className="font-serif text-2xl text-charcoal mb-4">{title}</h2>
                <div className="text-warm-gray font-sans leading-relaxed text-sm whitespace-pre-line">
                  {content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
