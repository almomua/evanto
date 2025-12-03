'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore, CartItem } from '@/lib/store/cart-store';

interface OrderReviewProps {
  onPlaceOrder: () => void;
  isProcessing?: boolean;
}

export function OrderReview({ onPlaceOrder, isProcessing = false }: OrderReviewProps) {
  const { items, getTotal } = useCartStore();
  const subtotal = getTotal();
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-[#F6F6F6] rounded-xl p-8 sticky top-8">
      <h2 className="text-[#3C4242] text-2xl font-bold mb-6">Order Summary</h2>

      {/* Order Items */}
      <div className="space-y-4 pb-6 border-b border-[#BEBCBD]/50 max-h-[300px] overflow-y-auto">
        {items.map((item) => (
          <OrderItem key={item.id} item={item} />
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-4 py-6 border-b border-[#BEBCBD]/50">
        <div className="flex items-center justify-between">
          <span className="text-[#807D7E] text-base">Subtotal</span>
          <span className="text-[#3C4242] text-base font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#807D7E] text-base">Shipping</span>
          <span className="text-[#3C4242] text-base font-medium">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#807D7E] text-base">Tax (8%)</span>
          <span className="text-[#3C4242] text-base font-medium">${tax.toFixed(2)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between py-6">
        <span className="text-[#3C4242] text-xl font-bold">Total</span>
        <span className="text-[#3C4242] text-xl font-bold">${total.toFixed(2)}</span>
      </div>

      {/* Place Order Button */}
      <button
        onClick={onPlaceOrder}
        disabled={isProcessing || items.length === 0}
        className="w-full py-4 bg-[#8A33FD] text-white text-lg font-medium rounded-lg hover:bg-[#7229D6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? 'Processing...' : 'Place Order'}
      </button>

      {/* Back to Cart */}
      <Link
        href="/cart"
        className="block w-full mt-4 py-4 border border-[#3C4242] text-[#3C4242] text-center text-base font-medium rounded-lg hover:bg-[#3C4242] hover:text-white transition-colors"
      >
        Back to Cart
      </Link>

      {/* Security Note */}
      <p className="mt-6 text-center text-[#807D7E] text-sm">
        🔒 Your payment information is secure and encrypted
      </p>
    </div>
  );
}

function OrderItem({ item }: { item: CartItem }) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-[#3C4242] text-sm font-medium truncate">{item.name}</h4>
        <p className="text-[#807D7E] text-xs">{item.brand}</p>
        <p className="text-[#807D7E] text-xs">Qty: {item.quantity}</p>
      </div>
      <span className="text-[#3C4242] text-sm font-medium">
        ${(item.price * item.quantity).toFixed(2)}
      </span>
    </div>
  );
}

