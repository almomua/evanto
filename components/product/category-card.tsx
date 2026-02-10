import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface CategoryCardProps {
  title: string;
  image: string;
  href?: string;
}

export function CategoryCard({ title, image, href = '#' }: CategoryCardProps) {
  const t = useTranslations('products');
  return (
    <div className="category-card flex flex-col gap-2 lg:gap-4">
      {/* Image */}
      <div className="relative w-[160px] h-[230px] sm:w-[200px] sm:h-[290px] lg:w-[270px] lg:h-[393px] rounded-lg lg:rounded-[10px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 270px"
          unoptimized
        />
      </div>

      {/* Info */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[#191919] text-sm lg:text-lg font-medium tracking-tight">{title}</h3>
          <p className="text-[#7F7F7F] text-xs lg:text-sm tracking-tight">{t('exploreNow')}</p>
        </div>
        <Link
          href={href}
          className="w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center text-[#191919] hover:text-[#8A33FD] transition-colors rtl:rotate-180"
        >
          <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
        </Link>
      </div>
    </div>
  );
}

// Variant for makeup products with slightly different styling
interface MakeupCategoryCardProps extends CategoryCardProps {
  overlay?: boolean;
}

export function MakeupCategoryCard({ title, image, href = '#', overlay = false }: MakeupCategoryCardProps) {
  const t = useTranslations('products');
  return (
    <div className="category-card flex flex-col gap-2 lg:gap-3">
      {/* Image */}
      <div className="relative w-[160px] h-[230px] sm:w-[200px] sm:h-[290px] lg:w-[270px] lg:h-[393px] rounded-lg lg:rounded-[10px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 270px"
          unoptimized
        />
        {overlay && (
          <div className="absolute inset-0 bg-black/10" />
        )}
      </div>

      {/* Info */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[#2A2F2F] text-sm lg:text-lg font-medium tracking-tight">{title}</h3>
          <p className="text-[#7F7F7F] text-xs lg:text-sm tracking-tight">{t('exploreNow')}</p>
        </div>
        <Link
          href={href}
          className="w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center text-[#191919] hover:text-[#8A33FD] transition-colors rtl:rotate-180"
        >
          <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
        </Link>
      </div>
    </div>
  );
}
