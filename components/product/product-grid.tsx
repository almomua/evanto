'use client';

import { ProductCard } from './product-card';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
}

interface ProductGridProps {
  products: Product[];
  columns?: 3 | 4;
  isLoading?: boolean;
}

export function ProductGrid({ products, columns = 3, isLoading = false }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className={`grid gap-5 ${columns === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="w-[282px] h-[370px] bg-[#F6F6F6] rounded-xl mb-3" />
            <div className="flex justify-between">
              <div>
                <div className="h-4 w-24 bg-[#F6F6F6] rounded mb-2" />
                <div className="h-3 w-20 bg-[#F6F6F6] rounded" />
              </div>
              <div className="h-9 w-20 bg-[#F6F6F6] rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-[#807D7E] text-xl mb-2">No products found</p>
        <p className="text-[#8A8989] text-sm">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-5 ${columns === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          brand={product.brand}
          price={product.price}
          image={product.image}
          href={`/products/${product.id}`}
        />
      ))}
    </div>
  );
}

