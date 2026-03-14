'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Sparkles, Package, Mail } from 'lucide-react';
import { useCart } from '@/context/CartContext';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    if (!cleared && sessionId) {
      clearCart();
      setCleared(true);
    }
  }, [sessionId, clearCart, cleared]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success icon */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-gold-100 animate-pulse-soft" />
          <div className="absolute inset-3 rounded-full bg-gold-500 flex items-center justify-center">
            <CheckCircle2 size={36} className="text-white" />
          </div>
        </div>

        <Sparkles className="text-gold-400 mx-auto mb-6" size={24} />

        <h1 className="font-serif text-5xl lg:text-6xl text-charcoal mb-4">
          Order Confirmed
        </h1>
        <p className="font-serif text-2xl text-gold-500 italic mb-6">
          Your ritual is on its way.
        </p>
        <p className="text-warm-gray font-sans leading-relaxed mb-4 max-w-lg mx-auto">
          Thank you for choosing Lumière. We have received your order and are preparing it with care. A confirmation email is on its way to your inbox.
        </p>

        {sessionId && (
          <p className="text-warm-gray text-xs font-sans mb-10">
            Order reference:{' '}
            <span className="font-mono text-charcoal">{sessionId.slice(-12).toUpperCase()}</span>
          </p>
        )}

        {/* Next steps */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 text-left">
          {[
            {
              icon: Mail,
              title: 'Check Your Email',
              body: 'A detailed order confirmation with tracking information has been sent to you.',
            },
            {
              icon: Package,
              title: 'Preparing Your Order',
              body: 'Your Lumière Eye Patches are being carefully packaged and will ship within 1–2 business days.',
            },
            {
              icon: Sparkles,
              title: 'Begin Your Ritual',
              body: 'Follow our expert tips inside the box for the most luminous results.',
            },
          ].map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="bg-white rounded-3xl p-6 shadow-luxury text-center"
            >
              <div className="w-12 h-12 rounded-full bg-gold-50 flex items-center justify-center mx-auto mb-4">
                <Icon size={20} className="text-gold-500" />
              </div>
              <h3 className="font-serif text-lg text-charcoal mb-2">{title}</h3>
              <p className="text-warm-gray text-sm font-sans leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Return Home <ArrowRight size={16} />
          </Link>
          <Link href="/product" className="btn-outline">
            Shop Again
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full border-4 border-gold-200 border-t-gold-500 animate-spin mx-auto mb-4" />
            <p className="text-warm-gray font-sans">Loading your order...</p>
          </div>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
