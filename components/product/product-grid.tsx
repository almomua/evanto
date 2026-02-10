'use client';

import { ProductCard } from './product-card';
import { useTranslations } from 'next-intl';

interface Product {
  id: string;
  slug?: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  shortDesc?: string;
  discount?: number;
}

interface ProductGridProps {
  products: Product[];
  columns?: 3 | 4;
  isLoading?: boolean;
}

export function ProductGrid({ products, columns = 3, isLoading = false }: ProductGridProps) {
  const t = useTranslations('products');

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="w-full aspect-[3/4] bg-[#F6F6F6] rounded-lg lg:rounded-xl mb-2 lg:mb-3" />
            <div className="flex justify-between">
              <div>
                <div className="h-3 lg:h-4 w-16 lg:w-24 bg-[#F6F6F6] rounded mb-1 lg:mb-2" />
                <div className="h-2 lg:h-3 w-12 lg:w-20 bg-[#F6F6F6] rounded" />
              </div>
              <div className="h-6 lg:h-9 w-12 lg:w-20 bg-[#F6F6F6] rounded-md lg:rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 lg:py-20">
        <p className="text-[#807D7E] text-base lg:text-xl mb-2">{t('noProductsFound')}</p>
        <p className="text-[#8A8989] text-xs lg:text-sm">{t('tryAdjustingFilters')}</p>
      </div>
    );
  }

  const gridCols = columns === 3
    ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'
    : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

  return (
    <div className={`grid gap-3 sm:gap-4 lg:gap-5 ${gridCols}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          slug={product.slug}
          name={product.name}
          brand={product.brand}
          price={product.price}
          image={product.image}
          shortDesc={product.shortDesc}
          discount={product.discount}
          href={`/products/${product.slug || product.id}`}
        />
      ))}
    </div>
  );
}
