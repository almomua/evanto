'use client';

import { useState } from 'react';
import { CreditCard, Wallet, Building2 } from 'lucide-react';
import { clsx } from 'clsx';

type PaymentType = 'card' | 'paypal' | 'bank';

interface PaymentMethodProps {
  selectedMethod: PaymentType;
  onMethodChange: (method: PaymentType) => void;
}

export function PaymentMethod({ selectedMethod, onMethodChange }: PaymentMethodProps) {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
  });

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-xl p-8 border border-[#BEBCBD]/30">
      <h2 className="text-[#3C4242] text-2xl font-bold mb-6">Payment Method</h2>

      {/* Payment Options */}
      <div className="space-y-4 mb-8">
        {/* Credit Card */}
        <button
          type="button"
          onClick={() => onMethodChange('card')}
          className={clsx(
            'w-full flex items-center gap-4 p-4 rounded-lg border transition-all',
            selectedMethod === 'card'
              ? 'border-[#8A33FD] bg-[#8A33FD]/5'
              : 'border-[#BEBCBD] hover:border-[#8A33FD]'
          )}
        >
          <div
            className={clsx(
              'w-5 h-5 rounded-full border-2 flex items-center justify-center',
              selectedMethod === 'card' ? 'border-[#8A33FD]' : 'border-[#BEBCBD]'
            )}
          >
            {selectedMethod === 'card' && (
              <div className="w-2.5 h-2.5 rounded-full bg-[#8A33FD]" />
            )}
          </div>
          <CreditCard className="w-6 h-6 text-[#3C4242]" />
          <span className="text-[#3C4242] text-lg">Credit / Debit Card</span>
        </button>

        {/* PayPal */}
        <button
          type="button"
          onClick={() => onMethodChange('paypal')}
          className={clsx(
            'w-full flex items-center gap-4 p-4 rounded-lg border transition-all',
            selectedMethod === 'paypal'
              ? 'border-[#8A33FD] bg-[#8A33FD]/5'
              : 'border-[#BEBCBD] hover:border-[#8A33FD]'
          )}
        >
          <div
            className={clsx(
              'w-5 h-5 rounded-full border-2 flex items-center justify-center',
              selectedMethod === 'paypal' ? 'border-[#8A33FD]' : 'border-[#BEBCBD]'
            )}
          >
            {selectedMethod === 'paypal' && (
              <div className="w-2.5 h-2.5 rounded-full bg-[#8A33FD]" />
            )}
          </div>
          <Wallet className="w-6 h-6 text-[#3C4242]" />
          <span className="text-[#3C4242] text-lg">PayPal</span>
        </button>

        {/* Bank Transfer */}
        <button
          type="button"
          onClick={() => onMethodChange('bank')}
          className={clsx(
            'w-full flex items-center gap-4 p-4 rounded-lg border transition-all',
            selectedMethod === 'bank'
              ? 'border-[#8A33FD] bg-[#8A33FD]/5'
              : 'border-[#BEBCBD] hover:border-[#8A33FD]'
          )}
        >
          <div
            className={clsx(
              'w-5 h-5 rounded-full border-2 flex items-center justify-center',
              selectedMethod === 'bank' ? 'border-[#8A33FD]' : 'border-[#BEBCBD]'
            )}
          >
            {selectedMethod === 'bank' && (
              <div className="w-2.5 h-2.5 rounded-full bg-[#8A33FD]" />
            )}
          </div>
          <Building2 className="w-6 h-6 text-[#3C4242]" />
          <span className="text-[#3C4242] text-lg">Cash on Delivery</span>
        </button>
      </div>

      {/* Card Details Form */}
      {selectedMethod === 'card' && (
        <div className="space-y-6 pt-6 border-t border-[#BEBCBD]/30">
          <div>
            <label className="block text-[#3C4242] text-sm font-medium mb-2">
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              value={cardData.cardNumber}
              onChange={handleCardChange}
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:border-[#8A33FD]"
            />
          </div>

          <div>
            <label className="block text-[#3C4242] text-sm font-medium mb-2">
              Card Holder Name
            </label>
            <input
              type="text"
              name="cardHolder"
              value={cardData.cardHolder}
              onChange={handleCardChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:border-[#8A33FD]"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[#3C4242] text-sm font-medium mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiry"
                value={cardData.expiry}
                onChange={handleCardChange}
                placeholder="MM/YY"
                className="w-full px-4 py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:border-[#8A33FD]"
              />
            </div>
            <div>
              <label className="block text-[#3C4242] text-sm font-medium mb-2">
                CVV
              </label>
              <input
                type="text"
                name="cvv"
                value={cardData.cvv}
                onChange={handleCardChange}
                placeholder="123"
                className="w-full px-4 py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:border-[#8A33FD]"
              />
            </div>
          </div>
        </div>
      )}

      {selectedMethod === 'paypal' && (
        <div className="pt-6 border-t border-[#BEBCBD]/30">
          <p className="text-[#807D7E]">
            You will be redirected to PayPal to complete your payment securely.
          </p>
        </div>
      )}

      {selectedMethod === 'bank' && (
        <div className="pt-6 border-t border-[#BEBCBD]/30">
          <p className="text-[#807D7E]">
            Pay with cash when your order is delivered.
          </p>
        </div>
      )}
    </div>
  );
}

