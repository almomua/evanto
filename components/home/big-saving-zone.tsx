import Image from 'next/image';
import { SectionHeader } from '@/components/ui/section-header';
import { LinkButton } from '@/components/ui/button';
import { ASSETS } from '@/lib/assets';

const savingCards = [
  {
    id: '1',
    title: 'Hawaiian Shirts',
    subtitle: 'Dress up in summer vibe',
    discount: 'UPTO 50% OFF',
    image: ASSETS.saving1,
    size: 'small',
  },
  {
    id: '2',
    title: 'Printed T-Shirt',
    subtitle: 'New Designs Every Week',
    discount: 'UPTO 40% OFF',
    image: ASSETS.saving2,
    size: 'small',
  },
  {
    id: '3',
    title: 'Cargo Joggers',
    subtitle: 'Move with style & comfort',
    discount: 'UPTO 50% OFF',
    image: ASSETS.saving3,
    size: 'small',
  },
  {
    id: '4',
    title: 'Urban Shirts',
    subtitle: 'Live in comfort',
    discount: 'FLAT 60% OFF',
    image: ASSETS.saving4,
    size: 'large',
  },
  {
    id: '5',
    title: 'Oversized T-Shirts',
    subtitle: 'Street Style Icon',
    discount: 'FLAT 60% OFF',
    image: ASSETS.saving5,
    size: 'large',
  },
];

export function BigSavingZone() {
  const smallCards = savingCards.filter((card) => card.size === 'small');
  const largeCards = savingCards.filter((card) => card.size === 'large');

  return (
    <section className="max-w-[1440px] mx-auto px-[100px] py-16">
      <SectionHeader title="Big Saving Zone" className="mb-10" />

      <div className="flex flex-col gap-5">
        {/* Top Row - 3 Small Cards */}
        <div className="flex gap-5">
          {smallCards.map((card) => (
            <div
              key={card.id}
              className="relative w-[400px] h-[393px] rounded-xl overflow-hidden"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute left-5 bottom-8 text-white">
                <h3 className="text-[28px] font-bold leading-tight mb-1">
                  {card.title.split(' ')[0]}<br />{card.title.split(' ').slice(1).join(' ')}
                </h3>
                <p className="text-sm mb-2">{card.subtitle}</p>
                <p className="text-lg font-medium mb-6">{card.discount}</p>
                <LinkButton
                  href="/products"
                  variant="outline"
                  size="sm"
                  className="text-xs px-4 py-2"
                >
                  SHOP NOW
                </LinkButton>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Row - 2 Large Cards */}
        <div className="flex gap-5">
          {largeCards.map((card) => (
            <div
              key={card.id}
              className="relative w-[610px] h-[393px] rounded-xl overflow-hidden"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              <div className="absolute left-8 top-1/2 -translate-y-1/2 text-white">
                <p className="text-lg font-bold mb-2">LOW PRICE</p>
                <h3 className="text-[34px] font-bold leading-tight mb-2">
                  {card.title.split(' ')[0]}<br />{card.title.split(' ').slice(1).join(' ')}
                </h3>
                <p className="text-sm mb-2">{card.subtitle}</p>
                <p className="text-lg font-medium mb-6">{card.discount}</p>
                <LinkButton
                  href="/products"
                  variant="outline"
                  size="sm"
                  className="text-xs px-4 py-2"
                >
                  SHOP NOW
                </LinkButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

