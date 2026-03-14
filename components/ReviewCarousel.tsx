'use client';

import { useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Star, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react';
import { Review } from '@/types';

interface Props {
  reviews: Review[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={14}
          className={n <= rating ? 'fill-gold-400 text-gold-400' : 'text-gold-200'}
        />
      ))}
    </div>
  );
}

export default function ReviewCarousel({ reviews }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white rounded-3xl p-8 shadow-luxury hover:shadow-luxury-lg transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <StarRating rating={review.rating} />
                {review.verified && (
                  <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-sans tracking-wider">
                    <BadgeCheck size={12} />
                    Verified
                  </span>
                )}
              </div>

              <p className="font-serif text-charcoal text-lg leading-snug mb-3">
                &ldquo;{review.title}&rdquo;
              </p>
              <p className="text-warm-gray text-sm font-sans leading-relaxed mb-6">
                {review.body}
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-gold-50">
                <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center text-white font-serif font-bold text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-charcoal font-sans font-medium text-sm">
                    {review.name}
                  </p>
                  <p className="text-warm-gray text-xs font-sans">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-10">
        <button
          onClick={scrollPrev}
          className="w-11 h-11 rounded-full border border-gold-200 flex items-center justify-center text-warm-gray hover:border-gold-500 hover:text-gold-600 transition-all duration-200 hover:scale-105"
          aria-label="Previous review"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={scrollNext}
          className="w-11 h-11 rounded-full border border-gold-200 flex items-center justify-center text-warm-gray hover:border-gold-500 hover:text-gold-600 transition-all duration-200 hover:scale-105"
          aria-label="Next review"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
