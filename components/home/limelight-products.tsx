import { SectionHeader } from '@/components/ui/section-header';
import { ProductCard } from '@/components/product/product-card';
import { ASSETS } from '@/lib/assets';

const limelightProducts = [
  {
    id: '1',
    name: 'Classic Lipstick',
    brand: 'Chanel Brand',
    price: 12.00,
    image: ASSETS.lipstick,
  },
  {
    id: '2',
    name: 'Night Repair Serum',
    brand: 'Estée Lauder Brand',
    price: 37.00,
    image: ASSETS.serum,
  },
  {
    id: '3',
    name: 'Moisturizing Cream',
    brand: 'CeraVe Brand',
    price: 37.00,
    image: ASSETS.cream,
  },
  {
    id: '4',
    name: 'Hair Perfector',
    brand: 'Olaplex Brand',
    price: 19.00,
    image: ASSETS.hairPerfector,
  },
];

export function LimelightProducts() {
  return (
    <section className="max-w-[1440px] mx-auto px-[100px] py-16">
      <SectionHeader title="In The Limelight" className="mb-10" />

      <div className="flex gap-9 justify-center">
        {limelightProducts.map((product) => (
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
    </section>
  );
}

