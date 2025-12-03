import { SectionHeader } from '@/components/ui/section-header';
import { MakeupCategoryCard } from '@/components/product/category-card';
import { ASSETS } from '@/lib/assets';

const makeupCategories = [
  { id: '1', title: 'Foundation', image: ASSETS.foundation, overlay: false },
  { id: '2', title: 'Concealer', image: ASSETS.concealer, overlay: true },
  { id: '3', title: 'Blush', image: ASSETS.blush, overlay: true },
  { id: '4', title: 'Highlighter', image: ASSETS.highlighter, overlay: false },
  { id: '5', title: 'Mascara', image: ASSETS.mascara, overlay: false },
  { id: '6', title: 'Lip Gloss', image: ASSETS.lipGloss, overlay: false },
  { id: '7', title: 'Eyeshadow', image: ASSETS.eyeshadow, overlay: false },
  { id: '8', title: 'Setting Spray', image: ASSETS.settingSpray, overlay: false },
];

export function MakeupProducts() {
  return (
    <section className="max-w-[1440px] mx-auto px-[100px] py-16">
      <SectionHeader title="Makeup Products" className="mb-10" />

      <div className="flex flex-col gap-12">
        {/* First Row */}
        <div className="flex gap-[50px] justify-center">
          {makeupCategories.slice(0, 4).map((category) => (
            <MakeupCategoryCard
              key={category.id}
              title={category.title}
              image={category.image}
              href={`/products?category=${category.title.toLowerCase()}`}
              overlay={category.overlay}
            />
          ))}
        </div>

        {/* Second Row */}
        <div className="flex gap-[50px] justify-center">
          {makeupCategories.slice(4, 8).map((category) => (
            <MakeupCategoryCard
              key={category.id}
              title={category.title}
              image={category.image}
              href={`/products?category=${category.title.toLowerCase()}`}
              overlay={category.overlay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

