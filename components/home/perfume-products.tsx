import { SectionHeader } from '@/components/ui/section-header';
import { CategoryCard } from '@/components/product/category-card';
import { ASSETS } from '@/lib/assets';
import { useTranslations } from 'next-intl';
import { CategoryGridSection, CategoryItem } from '@/lib/api/home-settings';

const defaultPerfumeCategories: CategoryItem[] = [
  { title: 'Everyday Floral', image: ASSETS.perfumeFloral, overlay: false, link: '/products?category=everyday-floral' },
  { title: 'Sensual Evening', image: ASSETS.perfumeEvening, overlay: false, link: '/products?category=sensual-evening' },
  { title: 'Earthy Unisex', image: ASSETS.perfumeEarthy, overlay: false, link: '/products?category=earthy-unisex' },
  { title: 'Abstract', image: ASSETS.perfumeAbstract, overlay: false, link: '/products?category=abstract' },
];

interface PerfumeProductsProps {
  data?: CategoryGridSection;
}

export function PerfumeProducts({ data }: PerfumeProductsProps) {
  const t = useTranslations('home');
  const title = data?.title || t('perfumeProducts');
  const categories = data?.items && data.items.length > 0 ? data.items : defaultPerfumeCategories;

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-[100px] py-8 lg:py-16 overflow-hidden">
      <SectionHeader title={title} className="mb-6 lg:mb-10" />

      <div className="flex gap-4 lg:gap-[50px] overflow-x-auto pb-4 lg:pb-0 lg:overflow-visible lg:justify-center scrollbar-hide">
        {categories.map((category, index) => (
          <div key={index} className="flex-shrink-0">
            <CategoryCard
              title={category.title}
              image={category.image}
              href={category.link || `/products?category=${category.title.toLowerCase().replace(' ', '-')}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
