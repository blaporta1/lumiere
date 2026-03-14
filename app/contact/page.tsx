'use client';

import { useState } from 'react';
import { Mail, MapPin, Clock, Send, Check } from 'lucide-react';
import type { Metadata } from 'next';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'hello@lumiere-beauty.com',
    sub: 'We respond within 24 hours',
  },
  {
    icon: MapPin,
    label: 'Studio',
    value: 'Paris · New York',
    sub: 'By appointment',
  },
  {
    icon: Clock,
    label: 'Support Hours',
    value: 'Mon–Fri, 9am–6pm EST',
    sub: 'Excluding holidays',
  },
];

const subjects = [
  'Product Question',
  'Order Status',
  'Return or Exchange',
  'Wholesale Inquiry',
  'Press & Media',
  'Other',
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="pt-20">
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="label mb-4">Contact</p>
            <h1 className="heading-xl mb-6">
              We would love
              <br />
              <span className="italic text-gold-500">to hear from you</span>
            </h1>
            <p className="text-warm-gray font-sans text-lg max-w-xl mx-auto">
              Whether it is a question about your order, a product concern, or just to say hello — our team is here for you.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <div className="flex flex-col gap-6">
              {contactInfo.map(({ icon: Icon, label, value, sub }) => (
                <div
                  key={label}
                  className="flex gap-4 p-6 bg-white rounded-3xl shadow-luxury hover:shadow-luxury-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-gold-50 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-gold-500" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase text-warm-gray font-sans mb-1">
                      {label}
                    </p>
                    <p className="font-serif text-charcoal text-lg">{value}</p>
                    <p className="text-warm-gray text-xs font-sans">{sub}</p>
                  </div>
                </div>
              ))}

              {/* FAQ shortcut */}
              <div className="p-6 bg-charcoal rounded-3xl">
                <p className="text-white font-serif text-xl mb-2">
                  Common questions?
                </p>
                <p className="text-white/60 text-sm font-sans mb-4">
                  Visit our FAQ page on the product page for instant answers.
                </p>
                <a
                  href="/product#faq"
                  className="text-gold-400 text-xs font-sans uppercase tracking-widest hover:text-gold-300 transition-colors"
                >
                  View FAQ →
                </a>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-[2rem] shadow-luxury p-10">
                {status === 'success' ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                      <Check size={28} className="text-emerald-600" />
                    </div>
                    <h3 className="font-serif text-3xl text-charcoal mb-3">
                      Message Received
                    </h3>
                    <p className="text-warm-gray font-sans">
                      Thank you for reaching out. We will respond within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="label block mb-2">Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Your name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="input"
                        />
                      </div>
                      <div>
                        <label className="label block mb-2">Email</label>
                        <input
                          type="email"
                          required
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="input"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="label block mb-2">Subject</label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="input appearance-none"
                      >
                        <option value="">Select a subject</option>
                        {subjects.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="label block mb-2">Message</label>
                      <textarea
                        required
                        rows={6}
                        placeholder="How can we help you?"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="input resize-none"
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-red-500 text-sm font-sans">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-primary self-start px-10 disabled:opacity-60"
                    >
                      {status === 'loading' ? (
                        'Sending...'
                      ) : (
                        <>
                          Send Message <Send size={16} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
