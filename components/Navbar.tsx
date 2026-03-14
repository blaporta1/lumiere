'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CartDrawer from './CartDrawer';
import clsx from 'clsx';

const navLinks = [
  { label: 'Product', href: '/product' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const { itemCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-cream/90 backdrop-blur-xl shadow-luxury border-b border-gold-100'
            : 'bg-transparent'
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <Sparkles
              size={18}
              className="text-gold-500 group-hover:rotate-12 transition-transform duration-300"
            />
            <span
              className={clsx(
                'font-serif text-2xl tracking-widest transition-colors duration-300',
                scrolled ? 'text-charcoal' : 'text-white'
              )}
            >
              LUMIÈRE
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'text-sm tracking-widest uppercase font-sans transition-all duration-200 hover:text-gold-500 hover:-translate-y-px',
                  scrolled ? 'text-warm-gray' : 'text-white/80'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/product"
              className={clsx(
                'hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs tracking-widest uppercase font-sans font-medium transition-all duration-300',
                'bg-gold-500 text-white hover:bg-gold-600 hover:shadow-gold hover:scale-105'
              )}
            >
              Shop Now
            </Link>

            <button
              onClick={openCart}
              className={clsx(
                'relative p-2 rounded-full transition-all duration-200 hover:scale-110',
                scrolled ? 'text-charcoal hover:text-gold-500' : 'text-white hover:text-gold-300'
              )}
              aria-label="Open cart"
            >
              <ShoppingBag size={22} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-fade-in">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              className={clsx(
                'md:hidden p-2 transition-colors',
                scrolled ? 'text-charcoal' : 'text-white'
              )}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-cream/95 backdrop-blur-xl border-t border-gold-100 px-6 py-6 flex flex-col gap-6 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-widest uppercase text-warm-gray hover:text-gold-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/product"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gold-500 text-white text-xs tracking-widest uppercase font-medium hover:bg-gold-600 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        )}
      </header>

      <CartDrawer />
    </>
  );
}
