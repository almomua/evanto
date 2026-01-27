'use client';

import { useEffect, useState } from 'react';
import { SectionHeader } from '@/components/ui/section-header';
import { ProductCard } from '@/components/product/product-card';
import { productsApi, Product } from '@/lib/api/products';
import { Loader2 } from 'lucide-react';
import { LimelightSection } from '@/lib/api/home-settings';

interface LimelightProductsProps {
  data?: LimelightSection;
}

export function LimelightProducts({ data }: LimelightProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const title = data?.title || 'In The Limelight';
  const source = data?.source || 'featured';

  useEffect(() => {
    async function loadProducts() {
      try {
        let fetchedProducts: Product[] = [];

        if (source === 'featured') {
          fetchedProducts = await productsApi.getFeatured();
          if (!fetchedProducts || fetchedProducts.length < 4) {
            const allProducts = await productsApi.getAll({ limit: 4 });
            fetchedProducts = [...fetchedProducts, ...allProducts].slice(0, 4);
            fetchedProducts = Array.from(new Map(fetchedProducts.map(item => [item._id, item])).values());
          }
        } else if (source === 'category' && data?.categoryId) {
          fetchedProducts = await productsApi.getByCategory(data.categoryId);
        } else if (source === 'manual' && data?.productIds && data.productIds.length > 0) {
          // For manual: fetch each product by ID
          const promises = data.productIds.map(id => productsApi.getBySlug(id));
          const results = await Promise.all(promises);
          fetchedProducts = results.filter((p): p is Product => p !== undefined);
        } else {
          fetchedProducts = await productsApi.getAll({ limit: 4 });
        }

        setProducts(fetchedProducts.slice(0, 4));
      } catch (error) {
        console.error('Failed to load limelight products', error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [source, data?.categoryId, data?.productIds]);

  if (loading) {
    return (
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px] py-8 lg:py-16">
        <SectionHeader title={title} className="mb-6 lg:mb-10" />
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin h-8 w-8 text-[#8A33FD]" />
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px] py-8 lg:py-16">
      <SectionHeader title={title} className="mb-6 lg:mb-10" />

      {products.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No products found</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-9">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              slug={product.slug}
              name={product.name}
              brand={product.category?.name || 'ProBerry'}
              price={product.price}
              image={product.images?.[0]?.secure_url}
              href={`/products/${product.slug || product._id}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
