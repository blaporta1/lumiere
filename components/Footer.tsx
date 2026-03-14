import Link from 'next/link';
import { Sparkles, Instagram, Facebook, Youtube } from 'lucide-react';

const footerLinks = {
  Shop: [
    { label: 'Eye Patches', href: '/product' },
    { label: 'Subscribe & Save', href: '/product#subscription' },
    { label: 'Gift Sets', href: '/product' },
  ],
  Company: [
    { label: 'About Lumière', href: '/about' },
    { label: 'Our Science', href: '/about#science' },
    { label: 'Contact Us', href: '/contact' },
  ],
  Support: [
    { label: 'FAQ', href: '/product#faq' },
    { label: 'Shipping Info', href: '/policies/refund' },
    { label: 'Returns', href: '/policies/refund' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/policies/privacy' },
    { label: 'Terms of Service', href: '/policies/terms' },
    { label: 'Refund Policy', href: '/policies/refund' },
  ],
};

const socialLinks = [
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Facebook, href: '#', label: 'Facebook' },
  { Icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white rounded-t-[3rem] mt-24">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-serif text-3xl mb-2">Join the Ritual</p>
            <p className="text-white/60 font-sans text-sm">
              15% off your first order. Expert skincare tips. No spam, ever.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex gap-3 w-full md:w-auto"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 md:w-72 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm font-sans focus:outline-none focus:border-gold-400 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-white rounded-full text-xs tracking-widest uppercase font-sans font-medium transition-all duration-300 hover:shadow-gold hover:scale-105"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-gold-400" />
              <span className="font-serif text-xl tracking-widest text-white">
                LUMIÈRE
              </span>
            </Link>
            <p className="text-white/50 text-xs font-sans leading-relaxed mb-6">
              Radiance through science. Luxury through ritual.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-gold-400 hover:border-gold-400 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-white text-xs tracking-widest uppercase font-sans font-medium mb-5">
                {category}
              </p>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/50 hover:text-gold-300 text-sm font-sans transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-sans">
            © {new Date().getFullYear()} Lumière Beauty. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-soft" />
            <span className="text-white/30 text-xs font-sans tracking-wider">
              All Systems Operational
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/30 text-xs font-sans">Secure Payments via</span>
            <span className="text-white/40 text-xs font-sans tracking-wider">STRIPE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
