'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart-store';
import { formatPrice } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface OrderSummaryProps {
  subtotal: number;
  shipping?: number;
  discount?: number;
}

export function OrderSummary({ subtotal, shipping = 5000, discount = 0 }: OrderSummaryProps) {
  const t = useTranslations('cart');
  const total = subtotal + shipping - discount;

  return (
    <div className="bg-[#F6F6F6] rounded-xl p-8">
      <h2 className="text-[#3C4242] text-2xl font-bold mb-6">{t('orderSummary')}</h2>

      <div className="space-y-4 pb-6 border-b border-[#BEBCBD]">
        <div className="flex items-center justify-between">
          <span className="text-[#807D7E] text-lg">{t('subtotal')}</span>
          <span className="text-[#3C4242] text-lg font-medium">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#807D7E] text-lg">{t('shipping')}</span>
          <span className="text-[#3C4242] text-lg font-medium">
            {shipping === 0 ? t('free') : formatPrice(shipping)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-[#807D7E] text-lg">{t('discountCodes')}</span>
            <span className="text-green-600 text-lg font-medium">-{formatPrice(discount)}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between py-6 border-b border-[#BEBCBD]">
        <span className="text-[#3C4242] text-xl font-bold">{t('total')}</span>
        <span className="text-[#3C4242] text-xl font-bold">{formatPrice(total)}</span>
      </div>

      <div className="mt-6">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder={t('enterCoupon')}
            className="flex-1 px-4 py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:border-[#8A33FD]"
          />
          <button className="px-6 py-3 bg-[#8A33FD] text-white rounded-lg hover:bg-[#7229D6] transition-colors font-medium">
            {t('apply')}
          </button>
        </div>
      </div>

      <Link
        href="/checkout"
        className="block w-full mt-6 py-4 bg-[#8A33FD] text-white text-center text-lg font-medium rounded-lg hover:bg-[#7229D6] transition-colors"
      >
        {t('proceedToCheckout')}
      </Link>

      {/* Continue Shopping */}
      <Link
        href="/products"
        className="block w-full mt-4 py-4 border border-[#3C4242] text-[#3C4242] text-center text-lg font-medium rounded-lg hover:bg-[#3C4242] hover:text-white transition-colors"
      >
        {t('continueShopping')}
      </Link>
    </div>
  );
}



