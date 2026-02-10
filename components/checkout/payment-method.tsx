'use client';

import { useState } from 'react';
import { CreditCard, Wallet, Building2 } from 'lucide-react';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';

type PaymentType = 'card' | 'paypal' | 'bank';

interface PaymentMethodProps {
  selectedMethod: PaymentType;
  onMethodChange: (method: PaymentType) => void;
}

export function PaymentMethod({ selectedMethod, onMethodChange }: PaymentMethodProps) {
  const t = useTranslations('checkout');
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
      <h2 className="text-[#3C4242] text-2xl font-bold mb-6">{t('paymentMethod')}</h2>

      {/* Payment Options */}
      <div className="space-y-4 mb-8">
        {/* Cash on Delivery - ONLY OPTION */}
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
          <span className="text-[#3C4242] text-lg">{t('cashOnDelivery')}</span>
        </button>
      </div>

      <div className="pt-6 border-t border-[#BEBCBD]/30">
        <p className="text-[#807D7E]">
          {t('codDescription')}
        </p>
      </div>

    </div>
  );
}



