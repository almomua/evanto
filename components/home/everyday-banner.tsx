import Image from 'next/image';
import { LinkButton } from '@/components/ui/button';
import { ASSETS } from '@/lib/assets';

export function EverydayBanner() {
  return (
    <section className="max-w-[1440px] mx-auto px-[100px] py-16">
      <div className="relative w-full h-[640px] rounded-xl overflow-hidden flex">
        {/* Left Side - Image with Text Overlay */}
        <div className="relative w-1/2 h-full">
          <Image
            src={ASSETS.everydayLeft}
            alt="Everyday beauty"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute left-[74px] top-1/2 -translate-y-1/2 text-white max-w-[466px]">
            <h2 className="text-[34px] font-bold leading-[50px] tracking-wide mb-4">
              Your everyday beauty<br />perfected!
            </h2>
            <p className="text-xl leading-relaxed tracking-wide mb-10">
              Driven by a passion to elevate daily self-care, evora introduces our EVERYDAY line – accessible and affordable beauty for you, 24/7.
            </p>
            <LinkButton
              href="/products"
              variant="white"
              className="px-11 py-3 text-lg"
            >
              Shop Now
            </LinkButton>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="relative w-1/2 h-full">
          <Image
            src={ASSETS.everydayRight}
            alt="Beauty products"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}

