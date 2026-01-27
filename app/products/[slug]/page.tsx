'use client';

import { use, useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ProductGallery } from '@/components/product/product-gallery';
import { ProductInfo } from '@/components/product/product-info';
import { ProductFeatures } from '@/components/product/product-features';
import { ProductDescription } from '@/components/product/product-description';
import { ProductVideo } from '@/components/product/product-video';
import { SimilarProducts } from '@/components/product/similar-products';
import { similarProducts } from '@/lib/assets-product-detail';
import { productsApi } from '@/lib/api/products';
import { Loader2 } from 'lucide-react';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = use(params);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productsApi.getBySlug(slug);
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8 text-[#8B5CF6]" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-[#807D7E] text-lg">Product not found</p>
      </div>
    );
  }

  // Map backend data to component props
  const images = product.images?.map((img: any) => img.secure_url) || [];
  const brandName = product.brand?.name || product.category?.name || 'ProBerry';
  // Details comes as a plain object from the API (JSON serialization converts Map to object)
  const details = product.details || {};

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px]">
        {/* Product Hero Section */}
        <section className="flex flex-col lg:flex-row gap-6 lg:gap-16 py-4 lg:py-8">
          {/* Gallery */}
          <ProductGallery
            images={images}
            productName={product.name}
          />

          {/* Product Info */}
          <div className="flex-1 pt-4 lg:pt-8">
            <ProductInfo
              id={product._id}
              name={product.name}
              brand={brandName}
              price={product.price}
              rating={product.ratingsAverage}
              image={images[0]}
              variants={product.variants || []}
            />

            {/* Features */}
            <div className="mt-6 lg:mt-10">
              <ProductFeatures />
            </div>
          </div>
        </section>

        {/* Description & Video Section */}
        <section className="flex flex-col lg:flex-row gap-6 lg:gap-16 py-8 lg:py-12">
          {/* Description */}
          <ProductDescription
            productId={product._id}
            description={product.description}
            details={details}
            ingredients={product.ingredients}
            howToUse={product.howToUse}
          />

          {/* Video */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <ProductVideo
              thumbnail={images[0]}
              productName={product.name}
              videoUrl={product.videoUrl}
            />
          </div>
        </section>

        {/* Similar Products */}
        <section className="py-8 lg:py-12">
          <SimilarProducts products={similarProducts} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
