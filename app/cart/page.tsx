'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CartItem } from '@/components/cart/cart-item';
import { OrderSummary } from '@/components/cart/order-summary';
import { EmptyCart } from '@/components/cart/empty-cart';
import { SectionHeader } from '@/components/ui/section-header';
import { useCartStore } from '@/lib/store/cart-store';

export default function CartPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-[1440px] mx-auto px-[100px] py-12">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-[#F6F6F6] rounded mb-8" />
            <div className="flex gap-16">
              <div className="flex-1 space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-6 py-6 border-b border-[#BEBCBD]">
                    <div className="w-[150px] h-[150px] bg-[#F6F6F6] rounded-xl" />
                    <div className="flex-1 space-y-3">
                      <div className="h-5 w-48 bg-[#F6F6F6] rounded" />
                      <div className="h-4 w-32 bg-[#F6F6F6] rounded" />
                      <div className="h-10 w-32 bg-[#F6F6F6] rounded" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-[400px] h-[500px] bg-[#F6F6F6] rounded-xl" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const subtotal = getTotal();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-[1440px] mx-auto px-[100px] py-12">
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <SectionHeader title="Shopping Cart" />
              <button
                onClick={clearCart}
                className="text-[#807D7E] hover:text-red-500 transition-colors text-sm"
              >
                Clear Cart
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex gap-16">
              {/* Cart Items */}
              <div className="flex-1">
                {/* Table Header */}
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 pb-4 border-b border-[#BEBCBD] text-[#807D7E] text-lg">
                  <span>Product Details</span>
                  <span className="text-center">Price</span>
                  <span className="text-center">Quantity</span>
                  <span className="text-right">Total</span>
                </div>

                {/* Cart Items List */}
                <div className="divide-y divide-[#BEBCBD]">
                  {items.map((item) => (
                    <CartItemRow key={item.id} item={item} />
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="w-[400px] flex-shrink-0">
                <OrderSummary subtotal={subtotal} />
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

// Cart Item Row Component
function CartItemRow({ item }: { item: { id: string; name: string; brand: string; price: number; quantity: number; image: string } }) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 py-6 items-center">
      {/* Product Details */}
      <div className="flex items-center gap-4">
        <div className="relative w-[100px] h-[100px] rounded-xl overflow-hidden bg-[#F6F6F6] flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-[#3C4242] text-lg font-medium">{item.name}</h3>
          <p className="text-[#807D7E] text-sm">{item.brand}</p>
          <button
            onClick={() => removeItem(item.id)}
            className="text-red-500 text-sm hover:underline mt-2"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="text-center">
        <span className="text-[#3C4242] text-lg">${item.price.toFixed(2)}</span>
      </div>

      {/* Quantity */}
      <div className="flex justify-center">
        <div className="flex items-center gap-3 bg-[#F6F6F6] rounded-lg px-3 py-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="text-[#3C4242] disabled:opacity-50 hover:text-[#8A33FD] transition-colors w-6 h-6 flex items-center justify-center"
          >
            −
          </button>
          <span className="text-[#3C4242] font-medium w-8 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="text-[#3C4242] hover:text-[#8A33FD] transition-colors w-6 h-6 flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>

      {/* Total */}
      <div className="text-right">
        <span className="text-[#3C4242] text-lg font-semibold">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
