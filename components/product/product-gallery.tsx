'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronUp, ChevronDown } from 'lucide-react';
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
    <div className="flex gap-6">
      {/* Thumbnails */}
      <div className="flex flex-col items-center gap-6">
        {/* Thumbnail Images */}
        <div className="flex flex-col gap-6">
          {displayImages.slice(0, 3).map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={clsx(
                'relative w-[68px] h-[68px] rounded-xl overflow-hidden transition-all',
                selectedIndex === index
                  ? 'ring-2 ring-[#3C4242] w-[76px] h-[76px]'
                  : 'opacity-70 hover:opacity-100'
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

        {/* Navigation Arrows */}
        <div className="flex flex-col gap-3">
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
      <div className="relative w-[520px] h-[785px] bg-[#F6F6F6]">
        <Image
          src={displayImages[selectedIndex]}
          alt={productName}
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>
    </div>
  );
}

