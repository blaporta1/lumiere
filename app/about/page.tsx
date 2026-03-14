import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, FlaskConical, Leaf, Heart } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Lumière',
  description:
    'The story behind Lumière — born from science, perfected by passion. Meet the team dedicated to redefining what luxury skincare can do.',
};

const values = [
  {
    icon: FlaskConical,
    title: 'Science First',
    body: 'Every ingredient is selected based on peer-reviewed clinical evidence. We believe efficacy and luxury are not opposing forces.',
  },
  {
    icon: Leaf,
    title: 'Clean Beauty',
    body: 'Our formulas are free from over 1,800 harmful or questionable ingredients. What goes on your skin should only serve your skin.',
  },
  {
    icon: Heart,
    title: 'Radical Transparency',
    body: 'We publish our full ingredient lists, concentrations, and clinical data. No proprietary blends used to hide ineffective dosing.',
  },
  {
    icon: Sparkles,
    title: 'Sensorial Luxury',
    body: 'Efficacy without indulgence is incomplete. Every Lumière product is engineered to feel like a ritual, not a chore.',
  },
];

const team = [
  {
    name: 'Dr. Elise Laurent',
    role: 'Co-Founder & Chief Formulation Scientist',
    bio: 'PhD in Cosmetic Chemistry, formerly at L\'Oréal Research & Innovation. 15 years developing peptide delivery systems.',
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80',
  },
  {
    name: 'Camille Moreau',
    role: 'Co-Founder & Creative Director',
    bio: '10 years in luxury brand strategy at LVMH. Believes that beauty packaging should be as considered as the formula inside.',
    img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80',
  },
  {
    name: 'Dr. James Osei',
    role: 'Head of Clinical Research',
    bio: 'Board-certified dermatologist with a focus on anti-aging topicals. Oversees all clinical testing and efficacy validation.',
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
  },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* ── HERO ─────────────────────────────────── */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 bg-luxury-gradient" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <Sparkles className="text-gold-400 mx-auto mb-6" size={32} />
          <p className="label mb-6">Our Story</p>
          <h1 className="heading-xl mb-8">
            Born from belief.
            <br />
            <span className="italic text-gold-500">Built on science.</span>
          </h1>
          <p className="text-warm-gray font-sans text-xl leading-relaxed max-w-2xl mx-auto">
            Lumière began in a research lab in Paris, when a cosmetic scientist and a luxury brand director asked a simple question: why should the most effective skincare be the least indulgent?
          </p>
        </div>
      </section>

      {/* ── THE ORIGIN STORY ─────────────────────── */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=800&q=85"
                alt="Lumière lab"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
            </div>
            <div>
              <p className="label mb-6">The Beginning</p>
              <h2 className="heading-lg mb-6">
                Three years. 200 formulas. One perfect patch.
              </h2>
              <div className="flex flex-col gap-4 text-warm-gray font-sans leading-relaxed">
                <p>
                  Our founder, Dr. Elise Laurent, had spent 15 years developing peptide delivery systems for pharmaceutical applications. She knew that the peptide complexes that could make a measurable difference in skin aging were available — they were just never used at the right concentrations in consumer skincare.
                </p>
                <p>
                  Together with Camille Moreau, a LVMH brand director who believed the luxury skincare market had lost its rigour, they set out to create a product that refused to compromise: maximum clinical efficacy delivered through a format that felt like a genuine ritual.
                </p>
                <p>
                  After three years and 200 formula iterations, the Lumière Peptide Collagen Hydrogel Eye Patch was born — the first eye patch to deliver clinical concentrations of five bioactive peptides in a biocompatible hydrogel matrix.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE SCIENCE ──────────────────────────── */}
      <section className="section bg-charcoal noise-overlay" id="science">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold-400 text-xs tracking-widest uppercase font-sans mb-4">
              The Science
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl text-white mb-6">
              What sets our formula apart
            </h2>
            <p className="text-white/60 font-sans max-w-2xl mx-auto">
              Most eye patches deliver active ingredients at a fraction of the effective dose. We do not.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: '5×',
                label: 'More Peptides',
                body: 'We use five distinct bioactive peptides at clinical concentrations, versus the industry average of one or two peptides at sub-clinical levels.',
              },
              {
                number: '72h',
                label: 'Moisture Retention',
                body: 'Our triweight hyaluronic acid hydrogel continues to hydrate for up to 72 hours post-removal — not just during wear.',
              },
              {
                number: '94%',
                label: 'Satisfaction Rate',
                body: 'In independent 8-week trials, 94% of participants reported visible improvement in dark circles and under-eye texture.',
              },
            ].map(({ number, label, body }) => (
              <div key={label} className="text-center p-8">
                <p className="font-serif text-7xl text-gold-400 mb-2">{number}</p>
                <p className="font-sans font-semibold text-white mb-3 uppercase tracking-wider text-sm">
                  {label}
                </p>
                <p className="text-white/50 font-sans text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────── */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="label mb-4">Our Values</p>
            <h2 className="heading-lg">What we stand for</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, body }) => (
              <div key={title} className="card text-center hover:shadow-luxury-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-gold-50 flex items-center justify-center mx-auto mb-5">
                  <Icon size={24} className="text-gold-500" />
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-3">{title}</h3>
                <p className="text-warm-gray font-sans text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────── */}
      <section className="section bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="label mb-4">The Team</p>
            <h2 className="heading-lg">Meet the minds behind Lumière</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="group">
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-6">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-1">{member.name}</h3>
                <p className="text-gold-500 text-xs font-sans tracking-wider uppercase mb-3">
                  {member.role}
                </p>
                <p className="text-warm-gray font-sans text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section className="section">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="heading-lg mb-6">
            Ready to experience the difference?
          </h2>
          <p className="text-warm-gray font-sans mb-10 text-lg">
            Join thousands who have discovered what radiance truly feels like.
          </p>
          <Link href="/product" className="btn-primary text-sm px-12 py-5">
            Shop the Eye Patch <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
