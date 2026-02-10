'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Minus, Plus, X } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart-store';
import { formatPrice } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface CartItemProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

export function CartItem({
  id,
  name,
  brand,
  price,
  quantity,
  image,
  size = 'M',
  color = 'Black',
}: CartItemProps) {
  const t = useTranslations('cart');
  const { updateQuantity, removeItem } = useCartStore();

  const handleIncrease = () => {
    updateQuantity(id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    }
  };

  return (
    <div className="flex items-start gap-6 py-6 border-b border-[#BEBCBD]">
      {/* Product Image */}
      <Link href={`/products/${id}`} className="relative w-[150px] h-[150px] rounded-xl overflow-hidden flex-shrink-0 bg-[#F6F6F6]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          unoptimized
        />
      </Link>

      {/* Product Details */}
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div>
            <Link href={`/products/${id}`} className="text-[#3C4242] text-lg font-medium hover:text-[#8A33FD] transition-colors">
              {name}
            </Link>
            <p className="text-[#807D7E] text-sm">{brand}</p>
          </div>
          <button
            onClick={() => removeItem(id)}
            className="p-2 hover:bg-[#F6F6F6] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#807D7E]" />
          </button>
        </div>

        {/* Size & Color */}
        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-[#807D7E]">{t('size')}:</span>
            <span className="text-[#3C4242] font-medium">{size}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#807D7E]">{t('color')}:</span>
            <span className="text-[#3C4242] font-medium">{color}</span>
          </div>
        </div>

        {/* Quantity & Price */}
        <div className="flex items-center justify-between mt-2">
          {/* Quantity Selector */}
          <div className="flex items-center gap-4 bg-[#F6F6F6] rounded-lg px-4 py-2">
            <button
              onClick={handleDecrease}
              disabled={quantity <= 1}
              className="text-[#3C4242] disabled:opacity-50 hover:text-[#8A33FD] transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-[#3C4242] font-medium w-8 text-center">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="text-[#3C4242] hover:text-[#8A33FD] transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Price */}
          <p className="text-[#3C4242] text-xl font-semibold">
            {formatPrice(price * quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}



