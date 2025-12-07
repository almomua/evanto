'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Minus, Plus, Trash2 } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { EmptyCart } from '@/components/cart/empty-cart';
import { useCartStore, CartItem } from '@/lib/store/cart-store';

export default function CartPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [couponCode, setCouponCode] = useState('');

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
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const subtotal = getTotal();
  const shipping = items.length > 0 ? 5.0 : 0;
  const grandTotal = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {items.length === 0 ? (
          <div className="max-w-[1440px] mx-auto px-[100px] py-12">
            <EmptyCart />
          </div>
        ) : (
          <>
            {/* Breadcrumb and Info */}
            <div className="max-w-[1440px] mx-auto px-[100px] pt-10 pb-8">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-3 mb-6">
                <Link href="/" className="text-[#807D7E] text-lg hover:text-[#3C4242]">
                  Home
                </Link>
                <ChevronRight className="w-4 h-4 text-[#807D7E]" />
                <span className="text-[#3C4242] text-lg">Add To Cart</span>
              </nav>

              {/* Info Text */}
              <div className="text-[#807D7E] text-sm tracking-wide">
                <p>Please fill in the fields below and click place order to complete your purchase!</p>
                <p className="mt-1">
                  Already registered?{' '}
                  <Link href="/login" className="text-[#8A33FD] hover:underline">
                    Please login here
                  </Link>
                </p>
              </div>
            </div>

            {/* Cart Table Header */}
            <div className="bg-[#3C4242] py-6">
              <div className="max-w-[1440px] mx-auto px-[100px]">
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_0.5fr] gap-4 items-center">
                  <span className="text-white text-lg uppercase">Product Details</span>
                  <span className="text-white text-lg uppercase text-center">Price</span>
                  <span className="text-white text-lg uppercase text-center">Quantity</span>
                  <span className="text-white text-lg uppercase text-center">Shipping</span>
                  <span className="text-white text-lg uppercase text-center">Subtotal</span>
                  <span className="text-white text-lg uppercase text-center">Action</span>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="max-w-[1440px] mx-auto px-[100px] py-8">
              <div className="divide-y divide-[#BEBCBD]/50">
                {items.map((item) => (
                  <CartItemRow key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Bottom Section - Discount & Summary */}
            <div className="bg-[#F6F6F6]">
              <div className="max-w-[1440px] mx-auto px-[100px] py-8">
                <div className="flex justify-between">
                  {/* Discount Codes */}
                  <div className="w-[375px]">
                    <h3 className="text-[#3C4242] text-2xl font-medium mb-2">Discount Codes</h3>
                    <p className="text-[#807D7E] text-base mb-6">
                      Enter your coupon code if you have one
                    </p>

                    {/* Coupon Input */}
                    <div className="flex h-[43px] mb-6">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder=""
                        className="flex-1 border border-[#BEBCBD] rounded-l-xl px-4 bg-white focus:outline-none focus:border-[#8A33FD]"
                      />
                      <button className="bg-[#8A33FD] text-white px-6 rounded-r-xl text-base hover:bg-[#7229D6] transition-colors">
                        Apply Coupon
                      </button>
                    </div>

                    {/* Continue Shopping */}
                    <Link
                      href="/products"
                      className="inline-flex items-center justify-center px-8 py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] hover:bg-white transition-colors"
                    >
                      Continue Shopping
                    </Link>
                  </div>

                  {/* Order Summary */}
                  <div className="w-[465px] bg-[#F3F3F3] p-8">
                    {/* Totals */}
                    <div className="space-y-4 pb-6 border-b border-[#BEBCBD]/50">
                      <div className="flex items-center justify-between">
                        <span className="text-[#3C4242] text-xl tracking-wide">Sub Total</span>
                        <span className="text-[#3C4242] text-xl">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#3C4242] text-xl tracking-wide">Shipping</span>
                        <span className="text-[#3C4242] text-xl">${shipping.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Grand Total */}
                    <div className="flex items-center justify-between py-6">
                      <span className="text-[#3C4242] text-xl tracking-wide font-medium">Grand Total</span>
                      <span className="text-[#3C4242] text-xl font-medium">${grandTotal.toFixed(2)}</span>
                    </div>

                    {/* Checkout Button */}
                    <div className="flex justify-center">
                      <Link
                        href="/checkout"
                        className="bg-[#8A33FD] text-white px-8 py-3 rounded-lg text-lg hover:bg-[#7229D6] transition-colors"
                      >
                        Proceed To Checkout
                      </Link>
                    </div>
                  </div>
                </div>
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
function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCartStore();
  const itemSubtotal = item.price * item.quantity;
  const shipping = item.price > 100 ? 5.0 : 0; // Free shipping for items under $100

  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_0.5fr] gap-4 py-8 items-center">
      {/* Product Details */}
      <div className="flex items-center gap-5">
        <div className="relative w-[105px] h-[120px] rounded-xl overflow-hidden bg-[#F6F6F6] flex-shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div>
          <h3 className="text-[#3C4242] text-lg tracking-wide">{item.name}</h3>
          <p className="text-[#807D7E] text-sm mt-2">Color: {item.brand}</p>
          <p className="text-[#807D7E] text-sm mt-1">Size: M</p>
        </div>
      </div>

      {/* Price */}
      <div className="text-center">
        <span className="text-[#3C4242] text-lg">${item.price.toFixed(2)}</span>
      </div>

      {/* Quantity */}
      <div className="flex justify-center">
        <div className="flex items-center gap-4 bg-[#F6F6F6] rounded-xl px-4 py-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="text-[#3C4242] disabled:opacity-50 hover:text-[#8A33FD] transition-colors"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-[#3C4242] text-sm w-4 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="text-[#3C4242] hover:text-[#8A33FD] transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Shipping */}
      <div className="text-center">
        <span className={shipping === 0 ? 'text-[#BEBCBD] text-lg tracking-wide' : 'text-[#3C4242] text-lg'}>
          {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
        </span>
      </div>

      {/* Subtotal */}
      <div className="text-center">
        <span className="text-[#3C4242] text-lg">${itemSubtotal.toFixed(2)}</span>
      </div>

      {/* Action */}
      <div className="flex justify-center">
        <button
          onClick={() => removeItem(item.id)}
          className="text-[#807D7E] hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
