'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { clsx } from 'clsx';
import { useWishlistStore } from '@/lib/store/wishlist-store';
import { useAuth } from '@/lib/context/auth-context';
import { userApi } from '@/lib/api/user';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  id: string;
  slug?: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  href?: string;
  shortDesc?: string;
  discount?: number;
}

export function ProductCard({ id, slug, name, brand, price, image, href = '#', shortDesc, discount = 0 }: ProductCardProps) {
  const { toggleItem, isInWishlist, addServerItem, removeServerItem } = useWishlistStore();
  const { user } = useAuth();
  const inWishlist = isInWishlist(id, !!user);
  const productDiscount = discount || 0;

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const item = { id, slug, name, brand, price, image };

    if (user) {
      // Authenticated user: call server API and update store
      try {
        if (inWishlist) {
          await userApi.removeFromWishlist(id);
          removeServerItem(id);
        } else {
          await userApi.addToWishlist(id);
          addServerItem(item);
        }
      } catch (error) {
        console.error('Failed to update wishlist', error);
      }
    } else {
      // Guest user: toggle in local storage
      toggleItem(item);
    }
  };

  return (
    <Link
      href={href}
      className="group block w-full bg-white rounded-[24px] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100/50"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={clsx(
            'absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all bg-white/80 backdrop-blur-sm shadow-sm',
            inWishlist
              ? 'text-red-500'
              : 'text-gray-400 hover:text-red-500'
          )}
        >
          <Heart className="w-5 h-5" fill={inWishlist ? 'currentColor' : 'none'} />
        </button>

        <Image
          src={image && image !== 'string' ? image : 'https://placehold.co/600x400?text=Invalid+Image'}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 282px"
          unoptimized
        />
      </div>

      <div className="p-6">
        <div className="flex flex-col gap-1 mb-4">
          <h3 className="text-[#3C4242] text-lg font-bold truncate group-hover:text-[#8B5CF6] transition-colors">
            {name}
          </h3>
          <p className="text-[#807D7E] text-sm font-medium uppercase tracking-wider">
            {brand}
          </p>
          {shortDesc && (
            <p className="text-[#8A8989] text-sm line-clamp-1 mt-1 font-light italic">
              {shortDesc}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="px-4 py-2 bg-[#F6F6F6] rounded-full flex flex-col items-start leading-none gap-0.5 min-w-[80px]">
            {productDiscount > 0 ? (
              <>
                <span className="text-[#3C4242] text-xs font-bold line-through opacity-50">
                  {formatPrice(price)}
                </span>
                <span className="text-[#8B5CF6] text-sm font-bold">
                  {formatPrice(price * (1 - productDiscount / 100))}
                </span>
              </>
            ) : (
              <span className="text-[#3C4242] text-base font-bold">
                {formatPrice(price)}
              </span>
            )}
          </div>

          <div className="w-8 h-8 rounded-full bg-[#8B5CF6] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
