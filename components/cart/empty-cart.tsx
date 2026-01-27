import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-24 h-24 bg-[#F6F6F6] rounded-full flex items-center justify-center mb-6">
        <ShoppingCart className="w-12 h-12 text-[#807D7E]" />
      </div>
      
      <h2 className="text-[#3C4242] text-2xl font-bold mb-2">Your cart is empty</h2>
      <p className="text-[#807D7E] text-lg mb-8">Looks like you haven&apos;t added anything to your cart yet.</p>
      
      <Link
        href="/products"
        className="px-10 py-4 bg-[#8A33FD] text-white text-lg font-medium rounded-lg hover:bg-[#7229D6] transition-colors"
      >
        Start Shopping
      </Link>
    </div>
  );
}



