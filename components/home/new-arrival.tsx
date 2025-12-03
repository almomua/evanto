'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { ASSETS } from '@/lib/assets';

const newArrivals = [
  {
    id: '1',
    name: 'Premium Collection',
    image: ASSETS.newArrival1,
  },
  {
    id: '2',
    name: '',
    image: ASSETS.newArrival2,
  },
  {
    id: '3',
    name: 'Organic Face Cream',
    image: ASSETS.newArrival3,
  },
  {
    id: '4',
    name: 'Skincare',
    image: ASSETS.newArrival4,
  },
];

export function NewArrival() {
  return (
    <section className="max-w-[1440px] mx-auto px-[100px] py-10">
      <SectionHeader title="New Arrival" className="mb-10" />

      <div className="relative">
        {/* Navigation Arrows */}
        <button
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-4 h-3 flex items-center justify-center text-[#3C4242] hover:text-[#8A33FD] transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-4 h-3 flex items-center justify-center text-[#3C4242] hover:text-[#8A33FD] transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Products Grid */}
        <div className="flex gap-10 justify-center">
          {newArrivals.map((item) => (
            <div key={item.id} className="flex flex-col gap-2">
              <div className="relative w-[263px] h-[263px] rounded-xl overflow-hidden bg-[#F5F5FA]">
                <Image
                  src={item.image}
                  alt={item.name || 'New arrival product'}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              {item.name && (
                <p className="text-[#3C4242] text-xl tracking-wide">{item.name}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

