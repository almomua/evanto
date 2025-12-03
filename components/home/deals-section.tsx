import Image from 'next/image';
import { ASSETS } from '@/lib/assets';

export function DealsSection() {
  return (
    <section className="max-w-[1440px] mx-auto px-[100px] py-16">
      <div className="flex gap-[30px]">
        {/* Left Deal Card - High Coziness */}
        <div className="relative w-[605px] h-[356px] rounded-xl overflow-hidden shadow-lg">
          <Image
            src={ASSETS.dealLeft}
            alt="Budget Beauty Finds"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
          <div className="absolute left-8 top-1/2 -translate-y-1/2 text-white">
            <h3 className="text-2xl font-bold mb-2">BUDGET</h3>
            <h3 className="text-2xl font-bold mb-4">BEAUTY FINDS</h3>
            <p className="text-sm mb-2">Quality at the 40% off</p>
          </div>
        </div>

        {/* Right Deal Card - Breezy Summer Style */}
        <div className="relative w-[605px] h-[356px] rounded-xl overflow-hidden shadow-lg">
          <Image
            src={ASSETS.dealRight}
            alt="Soothe Your Collection"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent" />
          <div className="absolute right-8 top-1/2 -translate-y-1/2 text-white text-right">
            <h3 className="text-2xl font-bold mb-2">SOOTHE YOUR</h3>
            <h3 className="text-2xl font-bold mb-4">COLLECTION</h3>
            <p className="text-sm">Premium picks, perfect prices</p>
          </div>
        </div>
      </div>
    </section>
  );
}

