'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, Star, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { useCartStore } from '@/lib/store/cart-store';
import { formatPrice } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface ProductInfoProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  image: string;
  variants: any[];
}

export function ProductInfo({ id, name, brand, price, rating, image, variants }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [sizes, setSizes] = useState<string[]>([]);
  const [currentPrice, setCurrentPrice] = useState(price);
  const addItem = useCartStore((state) => state.addItem);
  const t = useTranslations('products');
  const commonT = useTranslations('common');

  useEffect(() => {
    // Extract unique sizes from variants
    if (variants && variants.length > 0) {
      const uniqueSizes = Array.from(
        new Set(
          variants
            .flatMap((v) => v.options || [])
            .filter((opt) => opt.name === 'Size')
            .map((opt) => opt.value)
        )
      );
      setSizes(uniqueSizes);
      if (uniqueSizes.length > 0) {
        setSelectedSize(uniqueSizes[0]);
      }
    }
  }, [variants]);

  useEffect(() => {
    // Update price based on selected size
    if (selectedSize && variants) {
      const variant = variants.find((v) =>
        v.options?.some((opt: any) => opt.name === 'Size' && opt.value === selectedSize)
      );
      if (variant) {
        setCurrentPrice(variant.price);
      }
    }
  }, [selectedSize, variants]);

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      brand,
      price: currentPrice,
      image,
    });
  };

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 lg:gap-4 text-[#807D7E] text-sm lg:text-lg flex-wrap">
        <span>{commonT('shop')}</span>
        <ArrowRight className="w-2 h-2 lg:w-3 lg:h-3 rtl:rotate-180" />
        <span>{brand}</span>
        <ArrowRight className="w-2 h-2 lg:w-3 lg:h-3 rtl:rotate-180" />
        <span>{commonT('brands')}</span>
      </nav>

      {/* Product Title */}
      <h1 className="text-[#3C4242] text-xl sm:text-2xl lg:text-[34px] font-bold leading-[1.4] tracking-wide max-w-full lg:max-w-[393px]">
        {name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-3 lg:gap-4">
        <div className="flex gap-1 lg:gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={clsx(
                'w-4 h-4 lg:w-[22px] lg:h-[22px]',
                i < Math.floor(rating) ? 'fill-[#EDD146] text-[#EDD146]' : 'text-[#BEBCBD]'
              )}
            />
          ))}
        </div>
        <span className="text-[#807D7E] text-sm lg:text-lg">{rating.toFixed(1)}</span>
      </div>

      {/* Size Selection */}
      {sizes.length > 0 && (
        <div className="flex flex-col gap-3 lg:gap-6">
          <div className="flex items-center gap-3 lg:gap-5 flex-wrap">
            <span className="text-[#3F4646] text-sm lg:text-lg">{t('selectSize')}</span>
          </div>

          <div className="flex gap-3 lg:gap-5 flex-wrap">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={clsx(
                  'px-4 py-2 lg:px-5 lg:py-3 rounded-lg lg:rounded-xl flex items-center justify-center text-xs lg:text-sm transition-all',
                  selectedSize === size
                    ? 'bg-[#3C4242] text-white'
                    : 'border-[1.5px] border-[#BEBCBD] text-[#3C4242] hover:border-[#3C4242]'
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add to Cart */}
      <div className="flex flex-col sm:flex-row gap-3 lg:gap-5 mt-2 lg:mt-4">
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center gap-2 lg:gap-3 bg-[#8A33FD] text-white px-6 lg:px-10 py-3 rounded-lg hover:bg-[#7229D6] transition-colors"
        >
          <ShoppingCart className="w-4 h-4 lg:w-5 lg:h-5" />
          <span className="text-sm lg:text-lg">{t('addToCart')}</span>
        </button>
        <div className="flex items-center justify-center border border-[#3C4242] px-6 lg:px-10 py-3 rounded-lg">
          <span className="text-[#3C4242] text-sm lg:text-lg font-medium">{formatPrice(currentPrice)}</span>
        </div>
      </div>
    </div>
  );
}
