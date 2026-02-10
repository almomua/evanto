import Image from 'next/image';
import { SectionHeader } from '@/components/ui/section-header';
import { LinkButton } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { ASSETS } from '@/lib/assets';
import { BigSavingZoneSection, SavingCard } from '@/lib/api/home-settings';

const defaultCards: SavingCard[] = [
  { title: 'Hawaiian Shirts', subtitle: 'Dress up in summer vibe', discount: 'UPTO 50% OFF', image: ASSETS.saving1, size: 'small', link: '/products' },
  { title: 'Printed T-Shirt', subtitle: 'New Designs Every Week', discount: 'UPTO 40% OFF', image: ASSETS.saving2, size: 'small', link: '/products' },
  { title: 'Cargo Joggers', subtitle: 'Move with style & comfort', discount: 'UPTO 50% OFF', image: ASSETS.saving3, size: 'small', link: '/products' },
  { title: 'Urban Shirts', subtitle: 'Live in comfort', discount: 'FLAT 60% OFF', image: ASSETS.saving4, size: 'large', link: '/products' },
  { title: 'Oversized T-Shirts', subtitle: 'Street Style Icon', discount: 'FLAT 60% OFF', image: ASSETS.saving5, size: 'large', link: '/products' },
];

interface BigSavingZoneProps {
  data?: BigSavingZoneSection;
}

export function BigSavingZone({ data }: BigSavingZoneProps) {
  const t = useTranslations('home');
  const title = data?.title || t('bigSavingZone');
  const cards = data?.cards && data.cards.length > 0 ? data.cards : defaultCards;

  const smallCards = cards.filter((card) => card.size === 'small');
  const largeCards = cards.filter((card) => card.size === 'large');

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-[100px] py-8 lg:py-16 overflow-hidden">
      <SectionHeader title={title} className="mb-6 lg:mb-10" />

      <div className="flex flex-col gap-4 lg:gap-5">
        {/* Top Row - Small Cards */}
        <div className="flex gap-4 lg:gap-5 overflow-x-auto pb-4 lg:pb-0 lg:overflow-visible scrollbar-hide">
          {smallCards.map((card, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-[280px] sm:w-[300px] lg:w-[400px] h-[280px] sm:h-[320px] lg:h-[393px] rounded-xl overflow-hidden"
            >
              <Image src={card.image || ASSETS.saving1} alt={card.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute left-4 lg:left-5 bottom-6 lg:bottom-8 text-white">
                <h3 className="text-xl sm:text-2xl lg:text-[28px] font-bold leading-tight mb-1">
                  {card.title.split(' ')[0]}<br />{card.title.split(' ').slice(1).join(' ')}
                </h3>
                <p className="text-xs lg:text-sm mb-1 lg:mb-2">{card.subtitle}</p>
                <p className="text-sm lg:text-lg font-medium mb-4 lg:mb-6">{card.discount}</p>
                <LinkButton href={card.link || '/products'} variant="outline" size="sm" className="text-xs px-3 lg:px-4 py-2">
                  {t('shopNow')}
                </LinkButton>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Row - Large Cards */}
        <div className="flex flex-col sm:flex-row gap-4 lg:gap-5">
          {largeCards.map((card, index) => (
            <div
              key={index}
              className="relative w-full sm:w-1/2 lg:w-[610px] h-[280px] sm:h-[320px] lg:h-[393px] rounded-xl overflow-hidden"
            >
              <Image src={card.image || ASSETS.saving4} alt={card.title} fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              <div className="absolute left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 text-white">
                <p className="text-sm lg:text-lg font-bold mb-1 lg:mb-2">{t('lowPrice')}</p>
                <h3 className="text-2xl sm:text-[28px] lg:text-[34px] font-bold leading-tight mb-1 lg:mb-2">
                  {card.title.split(' ')[0]}<br />{card.title.split(' ').slice(1).join(' ')}
                </h3>
                <p className="text-xs lg:text-sm mb-1 lg:mb-2">{card.subtitle}</p>
                <p className="text-sm lg:text-lg font-medium mb-4 lg:mb-6">{card.discount}</p>
                <LinkButton href={card.link || '/products'} variant="outline" size="sm" className="text-xs px-3 lg:px-4 py-2">
                  {t('shopNow')}
                </LinkButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
