'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { ASSETS } from '@/lib/assets';
import { NewArrivalsSection } from '@/lib/api/home-settings';

const defaultArrivals = [
  { image: ASSETS.newArrival1, name: 'Premium Collection' },
  { image: ASSETS.newArrival2, name: '' },
  { image: ASSETS.newArrival3, name: 'Organic Face Cream' },
  { image: ASSETS.newArrival4, name: 'Skincare' },
];

interface NewArrivalProps {
  data?: NewArrivalsSection;
}

export function NewArrival({ data }: NewArrivalProps) {
  const title = data?.title || 'New Arrival';
  const items = data?.items && data.items.length > 0 ? data.items : defaultArrivals;

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px] py-8 lg:py-10">
      <SectionHeader title={title} className="mb-6 lg:mb-10" />

      <div className="relative">
        <button
          className="hidden lg:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-4 h-3 items-center justify-center text-[#3C4242] hover:text-[#8A33FD] transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-4 h-3 items-center justify-center text-[#3C4242] hover:text-[#8A33FD] transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="flex gap-4 lg:gap-10 overflow-x-auto pb-4 lg:pb-0 lg:overflow-visible lg:justify-center scrollbar-hide">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 flex-shrink-0">
              <div className="relative w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] lg:w-[263px] lg:h-[263px] rounded-xl overflow-hidden bg-[#F5F5FA]">
                <Image
                  src={item.image || ASSETS.newArrival1}
                  alt={item.name || 'New arrival product'}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              {item.name && (
                <p className="text-[#3C4242] text-sm sm:text-base lg:text-xl tracking-wide">{item.name}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
