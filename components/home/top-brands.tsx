import Image from 'next/image';
import { ASSETS } from '@/lib/assets';

const brands = [
  { id: '1', name: "L'Oreal", logo: ASSETS.loreal },
  { id: '2', name: 'Gucci', logo: ASSETS.gucci },
  { id: '3', name: 'Lyme', logo: ASSETS.lyme },
  { id: '4', name: 'Chanel', logo: ASSETS.chanel },
  { id: '5', name: 'Givenchy', logo: ASSETS.givenchy },
];

export function TopBrands() {
  return (
    <section className="max-w-[1440px] mx-auto px-[100px] py-16">
      <div className="relative w-full h-[357px] bg-[#3C4242] border border-[#323232] rounded-xl flex flex-col items-center justify-center">
        {/* Title */}
        <h2 className="text-white text-[50px] font-extrabold mb-2">
          Top Brands Deal
        </h2>

        {/* Subtitle */}
        <p className="text-white text-[22px] mb-10">
          Up To <span className="text-[#FBD103]">60%</span> off on brands
        </p>

        {/* Brand Logos */}
        <div className="flex gap-5">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="w-[178px] h-[86px] bg-white rounded-xl flex items-center justify-center overflow-hidden"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={140}
                height={60}
                className="object-contain"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

