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
import { Check } from 'lucide-react';
import { clsx } from 'clsx';

type PaymentType = 'card' | 'paypal' | 'bank';
type CheckoutStep = 1 | 2 | 3;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentType>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingData, setShippingData] = useState<any>(null);

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
            <div className="flex gap-12">
              <div className="flex-1 space-y-6">
                <div className="h-[400px] bg-[#F6F6F6] rounded-xl" />
                <div className="h-[300px] bg-[#F6F6F6] rounded-xl" />
              </div>
              <div className="w-[400px] h-[500px] bg-[#F6F6F6] rounded-xl" />
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
        <main className="max-w-[1440px] mx-auto px-[100px] py-12">
          <div className="flex flex-col items-center justify-center py-20">
            <h2 className="text-[#3C4242] text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-[#807D7E] text-lg mb-8">Add items to your cart before checkout.</p>
            <button
              onClick={() => router.push('/products')}
              className="px-10 py-4 bg-[#8A33FD] text-white text-lg font-medium rounded-lg hover:bg-[#7229D6] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleShippingSubmit = (data: any) => {
    setShippingData(data);
    setCurrentStep(2);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Clear cart and redirect to success
    clearCart();
    router.push('/checkout/success');
  };

  const steps = [
    { number: 1, label: 'Shipping' },
    { number: 2, label: 'Payment' },
    { number: 3, label: 'Review' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-[1440px] mx-auto px-[100px] py-12">
        {/* Page Header */}
        <SectionHeader title="Checkout" className="mb-8" />

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              {/* Step Circle */}
              <div
                className={clsx(
                  'w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all',
                  currentStep > step.number
                    ? 'bg-[#8A33FD] text-white'
                    : currentStep === step.number
                    ? 'bg-[#8A33FD] text-white'
                    : 'bg-[#F6F6F6] text-[#807D7E]'
                )}
              >
                {currentStep > step.number ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={clsx(
                  'ml-3 text-base font-medium',
                  currentStep >= step.number ? 'text-[#3C4242]' : 'text-[#807D7E]'
                )}
              >
                {step.label}
              </span>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={clsx(
                    'w-24 h-0.5 mx-6',
                    currentStep > step.number ? 'bg-[#8A33FD]' : 'bg-[#BEBCBD]'
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Checkout Content */}
        <div className="flex gap-12">
          {/* Forms */}
          <div className="flex-1 space-y-8">
            {/* Shipping Form */}
            {currentStep >= 1 && (
              <div className={clsx(currentStep !== 1 && 'opacity-60')}>
                <ShippingForm onSubmit={handleShippingSubmit} />
                {currentStep === 1 && (
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="mt-6 px-8 py-3 bg-[#8A33FD] text-white rounded-lg hover:bg-[#7229D6] transition-colors"
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
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="px-8 py-3 border border-[#3C4242] text-[#3C4242] rounded-lg hover:bg-[#3C4242] hover:text-white transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="px-8 py-3 bg-[#8A33FD] text-white rounded-lg hover:bg-[#7229D6] transition-colors"
                    >
                      Continue to Review
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Review Step */}
            {currentStep === 3 && (
              <div className="bg-white rounded-xl p-8 border border-[#BEBCBD]/30">
                <h2 className="text-[#3C4242] text-2xl font-bold mb-6">Review Your Order</h2>
                
                {shippingData && (
                  <div className="mb-6 pb-6 border-b border-[#BEBCBD]/30">
                    <h3 className="text-[#3C4242] font-medium mb-2">Shipping Address</h3>
                    <p className="text-[#807D7E]">
                      {shippingData.firstName} {shippingData.lastName}<br />
                      {shippingData.address}<br />
                      {shippingData.city}, {shippingData.state} {shippingData.zipCode}<br />
                      {shippingData.country}
                    </p>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-[#3C4242] font-medium mb-2">Payment Method</h3>
                  <p className="text-[#807D7E] capitalize">
                    {paymentMethod === 'card' ? 'Credit / Debit Card' : 
                     paymentMethod === 'paypal' ? 'PayPal' : 'Cash on Delivery'}
                  </p>
                </div>

                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-8 py-3 border border-[#3C4242] text-[#3C4242] rounded-lg hover:bg-[#3C4242] hover:text-white transition-colors"
                >
                  Back to Payment
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="w-[400px] flex-shrink-0">
            <OrderReview onPlaceOrder={handlePlaceOrder} isProcessing={isProcessing} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
