import Image from 'next/image';
import { LinkButton } from '@/components/ui/button';
import { ASSETS } from '@/lib/assets';
import { EverydayBannerSection } from '@/lib/api/home-settings';

interface EverydayBannerProps {
  data?: EverydayBannerSection;
}

export function EverydayBanner({ data }: EverydayBannerProps) {
  const title = data?.title || 'Your everyday beauty perfected!';
  const description = data?.description || 'Driven by a passion to elevate daily self-care, ProBerry introduces our EVERYDAY line – accessible and affordable beauty for you, 24/7.';
  const buttonText = data?.buttonText || 'Shop Now';
  const buttonLink = data?.buttonLink || '/products';
  const leftImage = data?.leftImage || ASSETS.everydayLeft;
  const rightImage = data?.rightImage || ASSETS.everydayRight;

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-[100px] py-8 lg:py-16 overflow-hidden">
      <div className="relative w-full h-auto lg:h-[640px] rounded-xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side - Image with Text Overlay */}
        <div className="relative w-full lg:w-1/2 h-[400px] sm:h-[500px] lg:h-full">
          <Image
            src={leftImage}
            alt="Everyday beauty"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute left-4 sm:left-8 lg:left-[74px] top-1/2 -translate-y-1/2 text-white max-w-[90%] lg:max-w-[466px]">
            <h2 className="text-xl sm:text-2xl lg:text-[34px] font-bold leading-tight lg:leading-[50px] tracking-wide mb-2 lg:mb-4">
              {title.split('\n').map((line, i) => (
                <span key={i}>{line}{i < title.split('\n').length - 1 && <br />}</span>
              ))}
            </h2>
            <p className="text-sm sm:text-base lg:text-xl leading-relaxed tracking-wide mb-6 lg:mb-10">
              {description}
            </p>
            <LinkButton
              href={buttonLink}
              variant="white"
              className="px-6 sm:px-8 lg:px-11 py-2 lg:py-3 text-sm lg:text-lg"
            >
              {buttonText}
            </LinkButton>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="relative w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-full">
          <Image
            src={rightImage}
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
