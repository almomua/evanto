import { SectionHeader } from '@/components/ui/section-header';
import { CategoryCard } from '@/components/product/category-card';
import { ASSETS } from '@/lib/assets';

const perfumeCategories = [
  { id: '1', title: 'Everyday Floral', image: ASSETS.perfumeFloral },
  { id: '2', title: 'Sensual Evening', image: ASSETS.perfumeEvening },
  { id: '3', title: 'Earthy Unisex', image: ASSETS.perfumeEarthy },
  { id: '4', title: 'Abstract', image: ASSETS.perfumeAbstract },
];

export function PerfumeProducts() {
  return (
    <section className="max-w-[1440px] mx-auto px-[100px] py-16">
      <SectionHeader title="Perfume Products" className="mb-10" />

      <div className="flex gap-[50px] justify-center">
        {perfumeCategories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            image={category.image}
            href={`/products?category=${category.title.toLowerCase().replace(' ', '-')}`}
          />
        ))}
      </div>
    </section>
  );
}

