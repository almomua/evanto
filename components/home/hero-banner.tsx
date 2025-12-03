'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LinkButton } from '@/components/ui/button';
import { ASSETS } from '@/lib/assets';

export function HeroBanner() {
  return (
    <section className="relative w-full h-[716px] bg-white border border-[#DEDEDE] rounded-[5px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={ASSETS.heroBanner}
          alt="Beauty Deals Banner"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      {/* Content Overlay */}
      <div className="absolute left-[193px] top-[129px] w-[439px] text-white">
        {/* Category Tag */}
        <p className="text-[32px] font-medium capitalize tracking-tight leading-relaxed">
          skincare / cosmetics
        </p>

        {/* Main Title */}
        <h1 className="text-[78px] font-normal leading-[94px] tracking-tight my-2">
          BEAUTY<br />DEALS
        </h1>

        {/* Subtitle */}
        <p className="text-[32px] font-medium tracking-tight mb-10">
          Luxury Beauty / Smart Prices
        </p>

        {/* CTA Button */}
        <LinkButton
          href="/products"
          variant="white"
          className="px-[72px] py-4 text-2xl rounded-lg"
        >
          Shop Now
        </LinkButton>
      </div>

      {/* Carousel Controls */}
      <button
        className="absolute left-[39px] top-1/2 -translate-y-1/2 w-6 h-11 flex items-center justify-center text-white hover:text-white/80 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-11" />
      </button>
      <button
        className="absolute right-[39px] top-1/2 -translate-y-1/2 w-6 h-11 flex items-center justify-center text-white hover:text-white/80 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-11" />
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex rounded-xl overflow-hidden">
        <div className="w-[62px] h-2.5 bg-white" />
        <div className="w-[63px] h-2.5 bg-white/50" />
      </div>
    </section>
  );
}

