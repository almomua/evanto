'use client';

import { useState } from 'react';
import { ShoppingCart, Star, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { useCartStore } from '@/lib/store/cart-store';

interface ProductInfoProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  image: string;
}

const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const colors = [
  { id: 'dark', color: '#3C4242' },
  { id: 'yellow', color: '#EDD146' },
  { id: 'pink', color: '#EB84B0' },
  { id: 'red', color: '#9C1F35' },
];

export function ProductInfo({ id, name, brand, price, rating, image }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState('dark');
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      brand,
      price,
      image,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-4 text-[#807D7E] text-lg">
        <span>Shop</span>
        <ArrowRight className="w-3 h-3" />
        <span>Women</span>
        <ArrowRight className="w-3 h-3" />
        <span>Top</span>
      </nav>

      {/* Product Title */}
      <h1 className="text-[#3C4242] text-[34px] font-bold leading-[1.4] tracking-wide max-w-[393px]">
        {name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={clsx(
                'w-[22px] h-[22px]',
                i < Math.floor(rating) ? 'fill-[#EDD146] text-[#EDD146]' : 'text-[#BEBCBD]'
              )}
            />
          ))}
        </div>
        <span className="text-[#807D7E] text-lg">{rating.toFixed(1)}</span>
      </div>

      {/* Size Selection */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-5">
          <span className="text-[#3F4646] text-lg">Select Size</span>
          <div className="flex items-center gap-4 text-[#807D7E] text-lg cursor-pointer hover:text-[#8A33FD]">
            <span>Size Guide</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        <div className="flex gap-5">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={clsx(
                'w-[42px] h-[42px] rounded-xl flex items-center justify-center text-sm transition-all',
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

      {/* Color Selection */}
      <div className="flex flex-col gap-6">
        <span className="text-[#3F4646] text-lg">Colours Available</span>
        <div className="flex gap-5">
          {colors.map((colorOption) => (
            <button
              key={colorOption.id}
              onClick={() => setSelectedColor(colorOption.id)}
              className={clsx(
                'w-[22px] h-[22px] rounded-full transition-all',
                selectedColor === colorOption.id && 'ring-2 ring-offset-2 ring-[#3C4242]'
              )}
              style={{ backgroundColor: colorOption.color }}
            />
          ))}
        </div>
      </div>

      {/* Add to Cart */}
      <div className="flex gap-5 mt-4">
        <button
          onClick={handleAddToCart}
          className="flex items-center gap-3 bg-[#8A33FD] text-white px-10 py-3 rounded-lg hover:bg-[#7229D6] transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="text-lg">Add to cart</span>
        </button>
        <div className="flex items-center justify-center border border-[#3C4242] px-10 py-3 rounded-lg">
          <span className="text-[#3C4242] text-lg font-medium">${price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

