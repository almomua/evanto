import { SectionHeader } from '@/components/ui/section-header';
import { MakeupCategoryCard } from '@/components/product/category-card';
import { ASSETS } from '@/lib/assets';
import { CategoryGridSection, CategoryItem } from '@/lib/api/home-settings';

const defaultMakeupCategories: CategoryItem[] = [
  { title: 'Foundation', image: ASSETS.foundation, overlay: false, link: '/products?category=foundation' },
  { title: 'Concealer', image: ASSETS.concealer, overlay: true, link: '/products?category=concealer' },
  { title: 'Blush', image: ASSETS.blush, overlay: true, link: '/products?category=blush' },
  { title: 'Highlighter', image: ASSETS.highlighter, overlay: false, link: '/products?category=highlighter' },
  { title: 'Mascara', image: ASSETS.mascara, overlay: false, link: '/products?category=mascara' },
  { title: 'Lip Gloss', image: ASSETS.lipGloss, overlay: false, link: '/products?category=lip-gloss' },
  { title: 'Eyeshadow', image: ASSETS.eyeshadow, overlay: false, link: '/products?category=eyeshadow' },
  { title: 'Setting Spray', image: ASSETS.settingSpray, overlay: false, link: '/products?category=setting-spray' },
];

interface MakeupProductsProps {
  data?: CategoryGridSection;
}

export function MakeupProducts({ data }: MakeupProductsProps) {
  const title = data?.title || 'Makeup Products';
  const categories = data?.items && data.items.length > 0 ? data.items : defaultMakeupCategories;

  // Split into two rows
  const firstRow = categories.slice(0, 4);
  const secondRow = categories.slice(4, 8);

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px] py-8 lg:py-16">
      <SectionHeader title={title} className="mb-6 lg:mb-10" />

      <div className="flex flex-col gap-6 lg:gap-12">
        {/* First Row */}
        <div className="flex gap-4 lg:gap-[50px] overflow-x-auto pb-4 lg:pb-0 lg:overflow-visible lg:justify-center scrollbar-hide">
          {firstRow.map((category, index) => (
            <div key={index} className="flex-shrink-0">
              <MakeupCategoryCard
                title={category.title}
                image={category.image}
                href={category.link || `/products?category=${category.title.toLowerCase()}`}
                overlay={category.overlay}
              />
            </div>
          ))}
        </div>

        {/* Second Row */}
        {secondRow.length > 0 && (
          <div className="flex gap-4 lg:gap-[50px] overflow-x-auto pb-4 lg:pb-0 lg:overflow-visible lg:justify-center scrollbar-hide">
            {secondRow.map((category, index) => (
              <div key={index} className="flex-shrink-0">
                <MakeupCategoryCard
                  title={category.title}
                  image={category.image}
                  href={category.link || `/products?category=${category.title.toLowerCase()}`}
                  overlay={category.overlay}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
