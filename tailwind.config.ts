import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FAF7F0',
          100: '#F5EDD9',
          200: '#EDD9B3',
          300: '#E2C08A',
          400: '#D4A661',
          500: '#C9A97B',
          600: '#B8924A',
          700: '#9A7A3D',
          800: '#7D6333',
          900: '#5F4A26',
        },
        champagne: {
          50: '#FDFAF5',
          100: '#FAF4E8',
          200: '#F5E9D1',
          300: '#EDD8B2',
          400: '#E3C48F',
          500: '#D4AD6B',
          600: '#C49550',
        },
        blush: {
          50: '#FEF7F7',
          100: '#FDEEF0',
          200: '#F9D9DE',
          300: '#F3BFCA',
          400: '#EAA3B4',
          500: '#DE8AA0',
          600: '#CE718C',
        },
        cream: '#FAF7F5',
        charcoal: '#1A1A1A',
        'warm-gray': '#6B6560',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A97B 0%, #E8D5B7 50%, #C9A97B 100%)',
        'luxury-gradient': 'linear-gradient(180deg, #FAF7F5 0%, #F5EDD9 100%)',
        'hero-gradient': 'linear-gradient(180deg, rgba(26,26,26,0.3) 0%, rgba(26,26,26,0.7) 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'shimmer': 'shimmer 2s infinite linear',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      boxShadow: {
        'gold': '0 4px 24px rgba(201, 169, 123, 0.25)',
        'gold-lg': '0 8px 40px rgba(201, 169, 123, 0.35)',
        'luxury': '0 2px 20px rgba(26, 26, 26, 0.08)',
        'luxury-lg': '0 8px 48px rgba(26, 26, 26, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
