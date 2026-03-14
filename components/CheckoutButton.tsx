'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { ArrowRight, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CheckoutButton() {
  const { items } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Checkout failed');

      window.location.href = data.url;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      toast.error(msg);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading || items.length === 0}
      className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-charcoal text-white rounded-full font-sans font-medium text-xs tracking-widest uppercase transition-all duration-300 hover:bg-gold-600 hover:shadow-gold disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          Processing...
        </>
      ) : (
        <>
          Secure Checkout
          <ArrowRight size={16} />
        </>
      )}
    </button>
  );
}
