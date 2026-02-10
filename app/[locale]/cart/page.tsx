'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ChevronRight, Minus, Plus, Trash2, Loader2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { EmptyCart } from '@/components/cart/empty-cart';
import { useCartStore, CartItem } from '@/lib/store/cart-store';
import { useAuth } from '@/lib/context/auth-context';
import { couponsApi } from '@/lib/api/coupons';
import { useModal } from '@/components/ui/modal';
import { useTranslations } from 'next-intl';

export default function CartPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const { user, isLoading: authLoading } = useAuth();
  const modal = useModal();
  const t = useTranslations('cart');
  const [mounted, setMounted] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px] py-8 lg:py-12">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-[#F6F6F6] rounded mb-8" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const subtotal = getTotal();
  const shipping: number = 5000; // Fixed shipping cost
  const grandTotal = subtotal - discount + shipping;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    try {
      setIsApplyingCoupon(true);
      const coupon = await couponsApi.verify(couponCode);

      let calculatedDiscount = 0;
      if (coupon.discountType === 'Percentage') {
        calculatedDiscount = (subtotal * coupon.value) / 100;
      } else {
        calculatedDiscount = coupon.value;
      }

      // Check minimum purchase
      if (subtotal < coupon.minPurchase) {
        modal.error(`Minimum purchase of ${formatPrice(coupon.minPurchase)} required`, 'Invalid Coupon');
        setDiscount(0);
        return;
      }

      setDiscount(calculatedDiscount);
      modal.success(`Coupon applied! You saved ${formatPrice(calculatedDiscount)}`, 'Success');

    } catch (error: any) {
      setDiscount(0);
      modal.error(error.response?.data?.message || 'Invalid coupon code', 'Error');
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {items.length === 0 ? (
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px] py-8 lg:py-12">
            <EmptyCart />
          </div>
        ) : (
          <>
            {/* Breadcrumb and Info */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px] pt-6 lg:pt-10 pb-6 lg:pb-8">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
                <Link href="/" className="text-[#807D7E] text-sm lg:text-lg hover:text-[#3C4242]">
                  {t('breadcrumbHome')}
                </Link>
                <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4 text-[#807D7E] rtl:rotate-180" />
                <span className="text-[#3C4242] text-sm lg:text-lg">{t('addToCart')}</span>
              </nav>

              {/* Info Text */}
              {!user && !authLoading && (
                <div className="text-[#807D7E] text-xs lg:text-sm tracking-wide">
                  <p>{t('guestMessage')}</p>
                  <p className="mt-1">
                    {t('alreadyRegistered')}{' '}
                    <Link href="/auth/login" className="text-[#8A33FD] hover:underline">
                      {t('loginHere')}
                    </Link>
                  </p>
                </div>
              )}
            </div>

            {/* Cart Table Header - Desktop Only */}
            <div className="hidden lg:block bg-[#3C4242] py-6">
              <div className="max-w-[1440px] mx-auto px-[100px]">
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_0.5fr] gap-4 items-center">
                  <span className="text-white text-lg uppercase">{t('productDetails')}</span>
                  <span className="text-white text-lg uppercase text-center">{t('price')}</span>
                  <span className="text-white text-lg uppercase text-center">{t('quantity')}</span>
                  <span className="text-white text-lg uppercase text-center">{t('shipping')}</span>
                  <span className="text-white text-lg uppercase text-center">{t('subtotal')}</span>
                  <span className="text-white text-lg uppercase text-center">{t('action')}</span>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px] py-4 lg:py-8">
              <div className="divide-y divide-[#BEBCBD]/50">
                {items.map((item) => (
                  <CartItemRow key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Bottom Section - Discount & Summary */}
            <div className="bg-[#F6F6F6]">
              <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px] py-6 lg:py-8">
                <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
                  {/* Discount Codes */}
                  <div className="w-full lg:w-[375px]">
                    <h3 className="text-[#3C4242] text-lg lg:text-2xl font-medium mb-2">{t('discountCodes')}</h3>
                    <p className="text-[#807D7E] text-sm lg:text-base mb-4 lg:mb-6">
                      {t('enterCouponNote')}
                    </p>

                    {/* Coupon Input */}
                    <div className="flex h-[40px] lg:h-[43px] mb-4 lg:mb-6">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder={t('enterCoupon')}
                        className="flex-1 border border-[#BEBCBD] rounded-l-lg lg:rounded-l-xl px-3 lg:px-4 bg-white focus:outline-none focus:border-[#8A33FD] text-sm lg:text-base rtl:rounded-l-none rtl:rounded-r-lg lg:rtl:rounded-r-xl"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        disabled={isApplyingCoupon}
                        className="bg-[#8A33FD] text-white px-4 lg:px-6 rounded-r-lg lg:rounded-r-xl text-sm lg:text-base hover:bg-[#7229D6] transition-colors whitespace-nowrap disabled:opacity-70 rtl:rounded-r-none rtl:rounded-l-lg lg:rtl:rounded-l-xl"
                      >
                        {isApplyingCoupon ? <Loader2 className="animate-spin w-4 h-4" /> : t('apply')}
                      </button>
                    </div>

                    {/* Continue Shopping */}
                    <Link
                      href="/products"
                      className="inline-flex items-center justify-center px-6 lg:px-8 py-2.5 lg:py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] text-sm lg:text-base hover:bg-white transition-colors"
                    >
                      {t('continueShopping')}
                    </Link>
                  </div>

                  {/* Order Summary */}
                  <div className="w-full lg:w-[465px] bg-[#F3F3F3] p-4 sm:p-6 lg:p-8 rounded-lg lg:rounded-none">
                    {/* Totals */}
                    <div className="space-y-3 lg:space-y-4 pb-4 lg:pb-6 border-b border-[#BEBCBD]/50">
                      <div className="flex items-center justify-between">
                        <span className="text-[#3C4242] text-base lg:text-xl tracking-wide">{t('subTotal')}</span>
                        <span className="text-[#3C4242] text-base lg:text-xl">{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#3C4242] text-base lg:text-xl tracking-wide">{t('shipping')}</span>
                        <span className="text-[#3C4242] text-base lg:text-xl">{shipping === 0 ? t('calculatedAtCheckout') : formatPrice(shipping)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex items-center justify-between text-green-600">
                          <span className="text-base lg:text-xl tracking-wide">{t('discountCodes')}</span>
                          <span className="text-base lg:text-xl">-{formatPrice(discount)}</span>
                        </div>
                      )}
                    </div>

                    {/* Grand Total */}
                    <div className="flex items-center justify-between py-4 lg:py-6">
                      <span className="text-[#3C4242] text-base lg:text-xl tracking-wide font-medium">{t('grandTotal')}</span>
                      <span className="text-[#3C4242] text-base lg:text-xl font-medium">{formatPrice(grandTotal)}</span>
                    </div>

                    {/* Checkout Button */}
                    <div className="flex justify-center">
                      <Link
                        href={`/checkout?coupon=${couponCode}&discount=${discount}`}
                        className="w-full sm:w-auto text-center bg-[#8A33FD] text-white px-6 lg:px-8 py-3 rounded-lg text-base lg:text-lg hover:bg-[#7229D6] transition-colors"
                      >
                        {t('proceedToCheckout')}
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
  const t = useTranslations('cart');
  const { updateQuantity, removeItem } = useCartStore();
  const itemSubtotal = item.price * item.quantity;
  const shipping = 5000; // Fixed shipping cost displayed per item row

  return (
    <>
      {/* Mobile Cart Item */}
      <div className="lg:hidden py-4">
        <div className="flex gap-4">
          <div className="relative w-[80px] h-[100px] sm:w-[100px] sm:h-[120px] rounded-lg overflow-hidden bg-[#F6F6F6] flex-shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div className="min-w-0">
                <h3 className="text-[#3C4242] text-sm sm:text-base font-medium truncate">{item.name}</h3>
                <p className="text-[#807D7E] text-xs sm:text-sm mt-1">{item.brand}</p>
                <p className="text-[#3C4242] text-sm sm:text-base font-medium mt-2">{formatPrice(item.price)}</p>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-[#807D7E] hover:text-red-500 transition-colors p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-3 bg-[#F6F6F6] rounded-lg px-3 py-1.5">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="text-[#3C4242] disabled:opacity-50"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-[#3C4242] text-sm w-4 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="text-[#3C4242]"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <span className="text-[#3C4242] text-sm font-medium">
                {t('total')}: {formatPrice(itemSubtotal)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Cart Item */}
      <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_0.5fr] gap-4 py-8 items-center">
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
            <p className="text-[#807D7E] text-sm mt-2">{t('color')}: {item.brand}</p>
            <p className="text-[#807D7E] text-sm mt-1">{t('size')}: M</p>
          </div>
        </div>

        {/* Price */}
        <div className="text-center">
          <span className="text-[#3C4242] text-lg">{formatPrice(item.price)}</span>
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
          <span className="text-[#3C4242] text-lg">
            {formatPrice(shipping)}
          </span>
        </div>

        {/* Subtotal */}
        <div className="text-center">
          <span className="text-[#3C4242] text-lg">{formatPrice(itemSubtotal)}</span>
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
    </>
  );
}
