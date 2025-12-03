'use client';

import Image from 'next/image';
import { Play } from 'lucide-react';

interface ProductVideoProps {
  thumbnail: string;
  productName: string;
  duration?: string;
}

export function ProductVideo({ thumbnail, productName, duration = '1:00' }: ProductVideoProps) {
  return (
    <div className="relative w-[532px] h-[328px] rounded-[20px] overflow-hidden group cursor-pointer">
      {/* Thumbnail */}
      <Image
        src={thumbnail}
        alt={`${productName} video`}
        fill
        className="object-cover"
        unoptimized
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#3C4242]/40" />

      {/* Duration */}
      <span className="absolute top-7 right-6 text-white text-lg">
        {duration} M
      </span>

      {/* Play Button */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
        <div className="w-[53px] h-[53px] bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
          <Play className="w-6 h-6 text-[#3C4242] fill-[#3C4242] ml-1" />
        </div>
      </div>

      {/* Product Name */}
      <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-[22px] tracking-wide text-center">
        {productName}
      </p>
    </div>
  );
}

