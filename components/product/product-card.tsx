'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { clsx } from 'clsx';
import { useWishlistStore } from '@/lib/store/wishlist-store';

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  href?: string;
}

export function ProductCard({ id, name, brand, price, image, href = '#' }: ProductCardProps) {
  const { toggleItem, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem({ id, name, brand, price, image });
  };

  return (
    <Link
      href={href}
      className="group block w-[282px] product-card"
    >
      {/* Image Container */}
      <div className="relative w-full h-[370px] rounded-xl overflow-hidden bg-[#F6F6F6] mb-3">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="282px"
          unoptimized
        />
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={clsx(
            'absolute top-4 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-all',
            inWishlist
              ? 'bg-[#8A33FD] text-white'
              : 'bg-white text-[#807D7E] hover:bg-[#8A33FD] hover:text-white'
          )}
        >
          <Heart className="w-4 h-4" fill={inWishlist ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Product Info */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-[#3C4242] text-base font-medium">{name}</h3>
          <p className="text-[#807D7E] text-sm">{brand}</p>
        </div>
        <div className="bg-[#F6F6F6] rounded-lg px-4 py-2">
          <span className="text-[#3C4242] text-sm font-medium">
            ${price.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  );
}

