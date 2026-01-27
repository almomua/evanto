import Image from 'next/image';
import { ASSETS } from '@/lib/assets';
import { DealsSection as DealsSectionType } from '@/lib/api/home-settings';

interface DealsSectionProps {
  data?: DealsSectionType;
}

export function DealsSection({ data }: DealsSectionProps) {
  const leftCard = data?.leftCard || {
    image: ASSETS.dealLeft,
    title1: 'BUDGET',
    title2: 'BEAUTY FINDS',
    subtitle: 'Quality at the 40% off'
  };

  const rightCard = data?.rightCard || {
    image: ASSETS.dealRight,
    title1: 'SOOTHE YOUR',
    title2: 'COLLECTION',
    subtitle: 'Premium picks, perfect prices'
  };

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px] py-8 lg:py-16">
      <div className="flex flex-col md:flex-row gap-4 lg:gap-[30px]">
        {/* Left Deal Card */}
        <div className="relative w-full md:w-1/2 lg:w-[605px] h-[200px] sm:h-[280px] lg:h-[356px] rounded-xl overflow-hidden shadow-lg">
          <Image
            src={leftCard.image || ASSETS.dealLeft}
            alt={leftCard.title1}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
          <div className="absolute left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 text-white">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 lg:mb-2">{leftCard.title1}</h3>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 lg:mb-4">{leftCard.title2}</h3>
            <p className="text-xs sm:text-sm mb-2">{leftCard.subtitle}</p>
          </div>
        </div>

        {/* Right Deal Card */}
        <div className="relative w-full md:w-1/2 lg:w-[605px] h-[200px] sm:h-[280px] lg:h-[356px] rounded-xl overflow-hidden shadow-lg">
          <Image
            src={rightCard.image || ASSETS.dealRight}
            alt={rightCard.title1}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent" />
          <div className="absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 text-white text-right">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 lg:mb-2">{rightCard.title1}</h3>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 lg:mb-4">{rightCard.title2}</h3>
            <p className="text-xs sm:text-sm">{rightCard.subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
