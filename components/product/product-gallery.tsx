'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const displayImages = images.length > 0 ? images : ['/placeholder.jpg'];

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : displayImages.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < displayImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6">
      {/* Thumbnails - Horizontal on mobile, vertical on desktop */}
      <div className="flex lg:flex-col items-center gap-4 lg:gap-6">
        {/* Thumbnail Images */}
        <div className="flex lg:flex-col gap-3 lg:gap-6">
          {displayImages.slice(0, 3).map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={clsx(
                'relative rounded-lg lg:rounded-xl overflow-hidden transition-all',
                selectedIndex === index
                  ? 'ring-2 ring-[#3C4242] w-[52px] h-[52px] lg:w-[76px] lg:h-[76px]'
                  : 'opacity-70 hover:opacity-100 w-[48px] h-[48px] lg:w-[68px] lg:h-[68px]'
              )}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>

        {/* Navigation Arrows - Hidden on mobile */}
        <div className="hidden lg:flex flex-col gap-3">
          <button
            onClick={handlePrevious}
            className="w-[21px] h-[21px] rounded-full bg-[#F6F6F6] flex items-center justify-center hover:bg-[#E5E5E5] transition-colors"
          >
            <ChevronUp className="w-3 h-3 text-[#3C4242]" />
          </button>
          <button
            onClick={handleNext}
            className="w-[21px] h-[21px] rounded-full bg-[#3C4242] flex items-center justify-center hover:bg-[#2A2F2F] transition-colors"
          >
            <ChevronDown className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>

      {/* Main Image */}
      <div className="relative w-full lg:w-[520px] aspect-[3/4] lg:h-[785px] bg-[#F6F6F6] rounded-lg lg:rounded-none">
        <Image
          src={displayImages[selectedIndex]}
          alt={productName}
          fill
          className="object-cover rounded-lg lg:rounded-none"
          priority
          unoptimized
        />
        
        {/* Mobile Navigation Arrows */}
        <button
          onClick={handlePrevious}
          className="lg:hidden absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 text-[#3C4242]" />
        </button>
        <button
          onClick={handleNext}
          className="lg:hidden absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center"
        >
          <ChevronRight className="w-5 h-5 text-[#3C4242]" />
        </button>
      </div>
    </div>
  );
}
