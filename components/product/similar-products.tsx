import { SectionHeader } from '@/components/ui/section-header';
import { ProductCard } from './product-card';

interface Product {
  id: string;
  slug?: string;
  name: string;
  brand: string;
  price: number;
  image: string;
}

interface SimilarProductsProps {
  products: Product[];
}

export function SimilarProducts({ products }: SimilarProductsProps) {
  return (
    <section>
      <SectionHeader title="Similar Products" className="mb-10" />

      <div className="grid grid-cols-4 gap-5">
        {products.slice(0, 8).map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            slug={product.slug}
            name={product.name}
            brand={product.brand}
            price={product.price}
            image={product.image}
            href={`/products/${product.slug || product.id}`}
          />
        ))}
      </div>
    </section>
  );
}



