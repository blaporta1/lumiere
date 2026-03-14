'use client';

import { useState } from 'react';
import { Ingredient } from '@/types';
import clsx from 'clsx';

interface Props {
  ingredients: Ingredient[];
}

export default function IngredientGrid({ ingredients }: Props) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {ingredients.map((ing) => (
        <button
          key={ing.name}
          onClick={() => setActive(active === ing.name ? null : ing.name)}
          className={clsx(
            'text-left p-6 rounded-3xl border transition-all duration-300 cursor-pointer',
            active === ing.name
              ? 'bg-charcoal text-white border-charcoal shadow-luxury-lg scale-[1.02]'
              : 'bg-white border-gold-100 hover:border-gold-300 hover:shadow-luxury hover:scale-[1.01]'
          )}
        >
          <span
            className="text-3xl mb-3 block"
            style={{ color: active === ing.name ? '#C9A97B' : ing.color }}
          >
            {ing.icon}
          </span>
          <h3
            className={clsx(
              'font-serif text-lg mb-2',
              active === ing.name ? 'text-white' : 'text-charcoal'
            )}
          >
            {ing.name}
          </h3>
          <p
            className={clsx(
              'text-xs font-sans leading-relaxed transition-all duration-300',
              active === ing.name ? 'text-white/70 max-h-40 opacity-100' : 'text-warm-gray max-h-0 opacity-0 overflow-hidden lg:max-h-none lg:opacity-100'
            )}
          >
            {ing.description}
          </p>
          {active !== ing.name && (
            <p className="text-gold-500 text-[10px] font-sans uppercase tracking-wider mt-3 lg:hidden">
              Tap to learn more
            </p>
          )}
        </button>
      ))}
    </div>
  );
}
