import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const avgRating =
    product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length;

  return (
    <Link href="/product" className="group block">
      <div className="relative overflow-hidden rounded-3xl bg-champagne-50 aspect-square mb-5">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-4 left-4 bg-charcoal text-white text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full font-sans">
            {product.badge}
          </span>
        )}
        {product.comparePrice && (
          <span className="absolute top-4 right-4 bg-gold-500 text-white text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full font-sans">
            Save{' '}
            {Math.round(
              (1 - product.price / product.comparePrice) * 100
            )}
            %
          </span>
        )}
      </div>

      <div>
        <p className="text-[10px] tracking-widest uppercase text-gold-500 font-sans mb-1">
          LUMIÈRE
        </p>
        <h3 className="font-serif text-xl text-charcoal mb-1 group-hover:text-gold-600 transition-colors">
          {product.shortName}
        </h3>
        <p className="text-warm-gray text-sm font-sans mb-3 line-clamp-2">
          {product.tagline}
        </p>
        <div className="flex items-center gap-3">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                size={12}
                className={
                  n <= Math.round(avgRating)
                    ? 'fill-gold-400 text-gold-400'
                    : 'text-gold-200'
                }
              />
            ))}
          </div>
          <span className="text-warm-gray text-xs font-sans">
            ({product.reviews.length})
          </span>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <span className="font-serif text-2xl text-charcoal">
            {formatPrice(product.price)}
          </span>
          {product.comparePrice && (
            <span className="text-warm-gray text-sm line-through font-sans">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
