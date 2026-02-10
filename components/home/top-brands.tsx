import Image from 'next/image';
import { ASSETS } from '@/lib/assets';
import { useTranslations } from 'next-intl';
import { TopBrandsSection, BrandItem } from '@/lib/api/home-settings';

const defaultBrands: BrandItem[] = [
  { name: "L'Oreal", logo: ASSETS.loreal },
  { name: 'Gucci', logo: ASSETS.gucci },
  { name: 'Lyme', logo: ASSETS.lyme },
  { name: 'Chanel', logo: ASSETS.chanel },
  { name: 'Givenchy', logo: ASSETS.givenchy },
];

interface TopBrandsProps {
  data?: TopBrandsSection;
}

export function TopBrands({ data }: TopBrandsProps) {
  const t = useTranslations('home');
  const discountPercent = data?.discountPercent || 60;
  const title = data?.title || t('topBrandsDeal');
  const subtitle = data?.subtitle || t('topBrandsSubtitle', { discount: discountPercent });
  const brands = data?.brands && data.brands.length > 0 ? data.brands : defaultBrands;

  // Replace {discount} placeholder with actual value
  const formattedSubtitle = subtitle.replace('{discount}', String(discountPercent));

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-[100px] py-8 lg:py-16 overflow-hidden">
      <div className="relative w-full py-8 sm:py-12 lg:py-0 lg:h-[357px] bg-[#3C4242] border border-[#323232] rounded-xl flex flex-col items-center justify-center">
        {/* Title */}
        <h2 className="text-white text-2xl sm:text-4xl lg:text-[50px] font-extrabold mb-2 text-center px-4">
          {title}
        </h2>

        {/* Subtitle */}
        <p className="text-white text-base sm:text-lg lg:text-[22px] mb-6 lg:mb-10 text-center">
          {formattedSubtitle.split(String(discountPercent)).map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && <span className="text-[#FBD103]">{discountPercent}</span>}
            </span>
          ))}
        </p>

        {/* Brand Logos */}
        <div className="flex gap-3 lg:gap-5 overflow-x-auto px-4 pb-4 lg:pb-0 lg:overflow-visible scrollbar-hide">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[100px] h-[50px] sm:w-[140px] sm:h-[70px] lg:w-[178px] lg:h-[86px] bg-white rounded-lg lg:rounded-xl flex items-center justify-center overflow-hidden"
            >
              <Image
                src={brand.logo || ASSETS.loreal}
                alt={brand.name}
                width={140}
                height={60}
                className="object-contain w-[70px] sm:w-[100px] lg:w-[140px]"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
