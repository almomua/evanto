'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ShippingForm } from '@/components/checkout/shipping-form';
import { PaymentMethod } from '@/components/checkout/payment-method';
import { OrderReview } from '@/components/checkout/order-review';
import { SectionHeader } from '@/components/ui/section-header';
import { useCartStore } from '@/lib/store/cart-store';
import { ordersApi } from '@/lib/api/orders';
import { useAuth } from '@/lib/context/auth-context';
import { Check, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import Link from 'next/link';

type PaymentType = 'card' | 'paypal' | 'bank';
type CheckoutStep = 1 | 2 | 3;

import { useSearchParams } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { items, clearCart } = useCartStore();
  const { user, isLoading: authLoading } = useAuth();

  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentType>('bank'); // Default to COD
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingData, setShippingData] = useState<any>(null);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  // Get coupon and discount from URL
  const couponCode = searchParams.get('coupon') || '';
  const discountParam = searchParams.get('discount');
  const discount = discountParam ? parseFloat(discountParam) : 0;

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
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
              <div className="flex-1 space-y-6">
                <div className="h-[400px] bg-[#F6F6F6] rounded-xl" />
                <div className="h-[300px] bg-[#F6F6F6] rounded-xl" />
              </div>
              <div className="w-full lg:w-[400px] h-[500px] bg-[#F6F6F6] rounded-xl" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px] py-8 lg:py-12">
          <div className="flex flex-col items-center justify-center py-12 lg:py-20">
            <h2 className="text-[#3C4242] text-xl lg:text-2xl font-bold mb-4 text-center">Your cart is empty</h2>
            <p className="text-[#807D7E] text-base lg:text-lg mb-6 lg:mb-8 text-center">Add items to your cart before checkout.</p>
            <button
              onClick={() => router.push('/products')}
              className="px-8 lg:px-10 py-3 lg:py-4 bg-[#8A33FD] text-white text-base lg:text-lg font-medium rounded-lg hover:bg-[#7229D6] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Prepare initial data if user is logged in
  const initialShippingData = user ? {
    firstName: user.name?.split(' ')[0] || '',
    lastName: user.name?.split(' ')[1] || '',
    email: user.email || '',
    phone: user.phone || '', // Assuming phone might be added to user type later or available
  } : undefined;

  const handleShippingSubmit = (data: any) => {
    setShippingData(data);
    setCurrentStep(2);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    try {
      const orderItems = items.map(item => ({
        product: item.id,
        quantity: 1, // Store currently doesn't track quantity per item in the main array clearly, assuming 1 or mapped correctly
      }));

      // Calculate total
      const totalAmount = items.reduce((sum, item) => sum + item.price, 0) - discount;

      await ordersApi.createOrder({
        items: orderItems,
        totalAmount: totalAmount > 0 ? totalAmount : 0, // Ensure no negative total
        shippingAddress: shippingData,
        paymentMethod: 'COD',
      });

      clearCart();
      router.push('/checkout/success');
    } catch (error) {
      console.error("Order failed", error);
      // You might want to show an error message state here
    } finally {
      setIsProcessing(false);
    }
  };

  const steps = [
    { number: 1, label: 'Shipping' },
    { number: 2, label: 'Payment' },
    { number: 3, label: 'Review' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px] py-6 lg:py-12">
        {/* Page Header */}
        <SectionHeader title="Checkout" className="mb-6 lg:mb-8" />


        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8 lg:mb-12 overflow-x-auto pb-2">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-shrink-0">
              {/* Step Circle */}
              <div
                className={clsx(
                  'w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-medium transition-all text-sm lg:text-base',
                  currentStep > step.number
                    ? 'bg-[#8A33FD] text-white'
                    : currentStep === step.number
                      ? 'bg-[#8A33FD] text-white'
                      : 'bg-[#F6F6F6] text-[#807D7E]'
                )}
              >
                {currentStep > step.number ? (
                  <Check className="w-4 h-4 lg:w-5 lg:h-5" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={clsx(
                  'ml-2 lg:ml-3 text-xs lg:text-base font-medium',
                  currentStep >= step.number ? 'text-[#3C4242]' : 'text-[#807D7E]'
                )}
              >
                {step.label}
              </span>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={clsx(
                    'w-8 sm:w-16 lg:w-24 h-0.5 mx-2 sm:mx-4 lg:mx-6',
                    currentStep > step.number ? 'bg-[#8A33FD]' : 'bg-[#BEBCBD]'
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Checkout Content */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          {/* Forms */}
          <div className="flex-1 space-y-6 lg:space-y-8 order-2 lg:order-1">
            {/* Shipping Form */}
            {currentStep >= 1 && (
              <div className={clsx(currentStep !== 1 && 'opacity-60')}>
                <ShippingForm onSubmit={handleShippingSubmit} initialData={initialShippingData} />
                {currentStep === 1 && (
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="mt-4 lg:mt-6 w-full sm:w-auto px-6 lg:px-8 py-2.5 lg:py-3 bg-[#8A33FD] text-white rounded-lg hover:bg-[#7229D6] transition-colors text-sm lg:text-base"
                  >
                    Continue to Payment
                  </button>
                )}
              </div>
            )}

            {/* Payment Method */}
            {currentStep >= 2 && (
              <div className={clsx(currentStep !== 2 && 'opacity-60')}>
                <PaymentMethod
                  selectedMethod={paymentMethod}
                  onMethodChange={setPaymentMethod}
                />
                {currentStep === 2 && (
                  <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 mt-4 lg:mt-6">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="px-6 lg:px-8 py-2.5 lg:py-3 border border-[#3C4242] text-[#3C4242] rounded-lg hover:bg-[#3C4242] hover:text-white transition-colors text-sm lg:text-base"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="px-6 lg:px-8 py-2.5 lg:py-3 bg-[#8A33FD] text-white rounded-lg hover:bg-[#7229D6] transition-colors text-sm lg:text-base"
                    >
                      Continue to Review
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Review Step */}
            {currentStep === 3 && (
              <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 border border-[#BEBCBD]/30">
                <h2 className="text-[#3C4242] text-lg lg:text-2xl font-bold mb-4 lg:mb-6">Review Your Order</h2>

                {shippingData && (
                  <div className="mb-4 lg:mb-6 pb-4 lg:pb-6 border-b border-[#BEBCBD]/30">
                    <h3 className="text-[#3C4242] font-medium mb-2 text-sm lg:text-base">Shipping Address</h3>
                    <p className="text-[#807D7E] text-xs lg:text-sm">
                      {shippingData.firstName} {shippingData.lastName}<br />
                      {shippingData.address}<br />
                      {shippingData.city}, {shippingData.state} {shippingData.zipCode}<br />
                      {shippingData.country}
                    </p>
                  </div>
                )}

                <div className="mb-4 lg:mb-6">
                  <h3 className="text-[#3C4242] font-medium mb-2 text-sm lg:text-base">Payment Method</h3>
                  <p className="text-[#807D7E] capitalize text-xs lg:text-sm">
                    {paymentMethod === 'card' ? 'Credit / Debit Card' :
                      paymentMethod === 'paypal' ? 'PayPal' : 'Cash on Delivery'}
                  </p>
                </div>

                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 lg:px-8 py-2.5 lg:py-3 border border-[#3C4242] text-[#3C4242] rounded-lg hover:bg-[#3C4242] hover:text-white transition-colors text-sm lg:text-base"
                >
                  Back to Payment
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[400px] flex-shrink-0 order-1 lg:order-2">
            <OrderReview
              onPlaceOrder={handlePlaceOrder}
              isProcessing={isProcessing}
              discount={discount}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
