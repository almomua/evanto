'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart-store';

interface OrderSummaryProps {
  subtotal: number;
  shipping?: number;
  discount?: number;
}

export function OrderSummary({ subtotal, shipping = 0, discount = 0 }: OrderSummaryProps) {
  const total = subtotal + shipping - discount;

  return (
    <div className="bg-[#F6F6F6] rounded-xl p-8">
      <h2 className="text-[#3C4242] text-2xl font-bold mb-6">Order Summary</h2>

      <div className="space-y-4 pb-6 border-b border-[#BEBCBD]">
        <div className="flex items-center justify-between">
          <span className="text-[#807D7E] text-lg">Subtotal</span>
          <span className="text-[#3C4242] text-lg font-medium">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#807D7E] text-lg">Shipping</span>
          <span className="text-[#3C4242] text-lg font-medium">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-[#807D7E] text-lg">Discount</span>
            <span className="text-green-600 text-lg font-medium">-${discount.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between py-6 border-b border-[#BEBCBD]">
        <span className="text-[#3C4242] text-xl font-bold">Total</span>
        <span className="text-[#3C4242] text-xl font-bold">${total.toFixed(2)}</span>
      </div>

      {/* Coupon Code */}
      <div className="mt-6">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Coupon Code"
            className="flex-1 px-4 py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:border-[#8A33FD]"
          />
          <button className="px-6 py-3 bg-[#8A33FD] text-white rounded-lg hover:bg-[#7229D6] transition-colors font-medium">
            Apply
          </button>
        </div>
      </div>

      {/* Checkout Button */}
      <Link
        href="/checkout"
        className="block w-full mt-6 py-4 bg-[#8A33FD] text-white text-center text-lg font-medium rounded-lg hover:bg-[#7229D6] transition-colors"
      >
        Proceed to Checkout
      </Link>

      {/* Continue Shopping */}
      <Link
        href="/products"
        className="block w-full mt-4 py-4 border border-[#3C4242] text-[#3C4242] text-center text-lg font-medium rounded-lg hover:bg-[#3C4242] hover:text-white transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

