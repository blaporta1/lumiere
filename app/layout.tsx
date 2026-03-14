import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: {
    default: 'Lumière — Peptide Collagen Hydrogel Eye Patches',
    template: '%s | Lumière',
  },
  description:
    'Radiance restored. Youth renewed. Lumière Peptide Collagen Hydrogel Eye Patches — clinically proven peptide complex, marine collagen, and niacinamide for visibly brighter, firmer under-eyes in 20 minutes.',
  keywords: [
    'eye patches',
    'collagen eye patch',
    'peptide eye patch',
    'hydrogel eye patch',
    'dark circles',
    'under eye',
    'anti aging',
    'luxury skincare',
    'Lumière',
  ],
  authors: [{ name: 'Lumière Beauty' }],
  creator: 'Lumière Beauty',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Lumière',
    title: 'Lumière — Peptide Collagen Hydrogel Eye Patches',
    description:
      'Visibly brighter, firmer under-eyes in 20 minutes. Shop the Lumière Peptide Collagen Hydrogel Eye Patch.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&q=90',
        width: 1200,
        height: 630,
        alt: 'Lumière Eye Patches',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lumière — Peptide Collagen Hydrogel Eye Patches',
    description: 'Radiance restored. Youth renewed. Shop Lumière.',
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: '#C9A97B',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1A1A1A',
                color: '#FAF7F5',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                borderRadius: '100px',
                padding: '12px 24px',
                letterSpacing: '0.05em',
              },
              success: {
                iconTheme: { primary: '#C9A97B', secondary: '#FAF7F5' },
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}
