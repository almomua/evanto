'use client';

import { use } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ProductGallery } from '@/components/product/product-gallery';
import { ProductInfo } from '@/components/product/product-info';
import { ProductFeatures } from '@/components/product/product-features';
import { ProductDescription } from '@/components/product/product-description';
import { ProductVideo } from '@/components/product/product-video';
import { SimilarProducts } from '@/components/product/similar-products';
import { PRODUCT_DETAIL_ASSETS, similarProducts } from '@/lib/assets-product-detail';

// Mock product data - in production, fetch from API based on ID
const getProductById = (id: string) => {
  return {
    id,
    name: 'Advanced Night Repair Serum',
    brand: 'Estée Lauder',
    price: 63.00,
    rating: 3.5,
    description: 'This breakthrough formula significantly reduces the look of key signs of aging. Lines and wrinkles look significantly reduced. Skin looks smoother, more radiant, and younger.',
    images: [
      PRODUCT_DETAIL_ASSETS.mainProduct,
      PRODUCT_DETAIL_ASSETS.mainProduct,
      PRODUCT_DETAIL_ASSETS.mainProduct,
    ],
    details: {
      'Brand': 'Estée Lauder',
      'Size': '50ml',
      'Skin Type': 'All Skin Types',
      'Concern': 'Anti-aging',
      'Finish': 'Natural',
      'Formulation': 'Serum',
    },
  };
};

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params);
  const product = getProductById(id);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-[1440px] mx-auto px-[100px]">
        {/* Product Hero Section */}
        <section className="flex gap-16 py-8">
          {/* Gallery */}
          <ProductGallery
            images={product.images}
            productName={product.name}
          />

          {/* Product Info */}
          <div className="flex-1 pt-8">
            <ProductInfo
              id={product.id}
              name={product.name}
              brand={product.brand}
              price={product.price}
              rating={product.rating}
              image={product.images[0]}
            />

            {/* Features */}
            <div className="mt-10">
              <ProductFeatures />
            </div>
          </div>
        </section>

        {/* Description & Video Section */}
        <section className="flex gap-16 py-12">
          {/* Description */}
          <ProductDescription
            description={product.description}
            details={product.details}
          />

          {/* Video */}
          <div className="flex-1 flex justify-end">
            <ProductVideo
              thumbnail={product.images[0]}
              productName={product.name}
            />
          </div>
        </section>

        {/* Similar Products */}
        <section className="py-12">
          <SimilarProducts products={similarProducts} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
