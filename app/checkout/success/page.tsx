'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CheckCircle, Package, Mail, Loader2 } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');

  // Format the order ID to match admin panel (# + last 6 chars)
  // Fallback to a timestamp-based ID if for some reason the ID is missing
  const displayId = orderId
    ? `#${orderId.slice(-6).toUpperCase()}`
    : `EVR-${Date.now().toString().slice(-8)}`;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-[1440px] mx-auto px-4 lg:px-[100px] py-12">
        <div className="max-w-[600px] mx-auto text-center py-16">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Title */}
          <h1 className="text-[#3C4242] text-3xl font-bold mb-4">
            Thank You for Your Order!
          </h1>
          <p className="text-[#807D7E] text-lg mb-8">
            Your order has been placed successfully.
          </p>

          {/* Order Number */}
          <div className="bg-[#F6F6F6] rounded-xl p-6 mb-8">
            <p className="text-[#807D7E] text-sm mb-2">Order Number</p>
            <p className="text-[#3C4242] text-2xl font-bold">{displayId}</p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-[#BEBCBD]/30 rounded-xl p-6">
              <Mail className="w-8 h-8 text-[#8A33FD] mx-auto mb-4" />
              <h3 className="text-[#3C4242] font-medium mb-2">Confirmation Email</h3>
              <p className="text-[#807D7E] text-sm">
                We&apos;ve sent order confirmation to your email address.
              </p>
            </div>
            <div className="bg-white border border-[#BEBCBD]/30 rounded-xl p-6">
              <Package className="w-8 h-8 text-[#8A33FD] mx-auto mb-4" />
              <h3 className="text-[#3C4242] font-medium mb-2">Shipping Updates</h3>
              <p className="text-[#807D7E] text-sm">
                You&apos;ll receive shipping updates via email and SMS.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-4 bg-[#8A33FD] text-white text-lg font-medium rounded-lg hover:bg-[#7229D6] transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              href="/account"
              className="px-8 py-4 border border-[#3C4242] text-[#3C4242] text-lg font-medium rounded-lg hover:bg-[#3C4242] hover:text-white transition-colors"
            >
              View Orders
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#8A33FD]" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}



