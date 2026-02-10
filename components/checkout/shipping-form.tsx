'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface ShippingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface ShippingFormProps {
  onSubmit: (data: ShippingFormData) => void;
  initialData?: Partial<ShippingFormData>;
  showSubmit?: boolean;
}

export function ShippingForm({ onSubmit, initialData, showSubmit = true }: ShippingFormProps) {
  const t = useTranslations('checkout');
  const [formData, setFormData] = useState<ShippingFormData>({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    address: initialData?.address || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    zipCode: initialData?.zipCode || '', // This component uses zipCode locally, might need mapping if initialData comes from Address
    country: 'Egypt',
  });

  // Sync initialData when it changes (e.g. after user profile loads)
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        firstName: initialData.firstName || prev.firstName || '',
        lastName: initialData.lastName || prev.lastName || '',
        email: initialData.email || prev.email || '',
        phone: initialData.phone || prev.phone || '',
        address: initialData.address || prev.address || '',
        city: initialData.city || prev.city || '',
        state: initialData.state || prev.state || '',
        zipCode: initialData.zipCode || prev.zipCode || '',
        country: initialData.country || prev.country || 'Egypt',
      }));
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value || '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Final safety check: replace any nulls/undefined with empty strings just in case
    const safeData = Object.fromEntries(
      Object.entries(formData).map(([key, val]) => [key, val ?? ''])
    ) as ShippingFormData;

    onSubmit(safeData);
  };

  return (
    <div className="bg-white rounded-xl p-8 border border-[#BEBCBD]/30">
      <h2 className="text-[#3C4242] text-2xl font-bold mb-6">{t('shippingAddress')}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Row */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[#3C4242] text-sm font-medium mb-2">
              {t('firstName')} *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:border-[#8A33FD]"
              placeholder={t('firstName')}
            />
          </div>
          <div>
            <label className="block text-[#3C4242] text-sm font-medium mb-2">
              {t('lastName')} *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:border-[#8A33FD]"
              placeholder={t('lastName')}
            />
          </div>
        </div>

        {/* Contact Row */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[#3C4242] text-sm font-medium mb-2">
              {t('emailAddress')} *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:border-[#8A33FD]"
              placeholder={t('emailAddress')}
            />
          </div>
          <div>
            <label className="block text-[#3C4242] text-sm font-medium mb-2">
              {t('phoneNumber')} *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:border-[#8A33FD]"
              placeholder={t('phoneNumber')}
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-[#3C4242] text-sm font-medium mb-2">
            {t('streetAddress')} *
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:border-[#8A33FD]"
            placeholder={t('streetAddress')}
          />
        </div>

        {/* City/State Row */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[#3C4242] text-sm font-medium mb-2">
              {t('city')} *
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:border-[#8A33FD]"
              placeholder={t('city')}
            />
          </div>
          <div>
            <label className="block text-[#3C4242] text-sm font-medium mb-2">
              {t('state')} *
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:border-[#8A33FD]"
              placeholder={t('state')}
            />
          </div>
        </div>

        {/* Zip/Country Row */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[#3C4242] text-sm font-medium mb-2">
              {t('zipCode')} *
            </label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:border-[#8A33FD]"
              placeholder={t('zipCode')}
            />
          </div>
          <div>
            <label className="block text-[#3C4242] text-sm font-medium mb-2">
              {t('country')} *
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] focus:outline-none focus:border-[#8A33FD] bg-white"
            >
              <option value="Egypt">Egypt</option>
              <option value="Iraq">Iraq</option>
            </select>
          </div>
        </div>

        {showSubmit && (
          <button
            type="submit"
            className="mt-4 lg:mt-6 w-full sm:w-auto px-6 lg:px-8 py-2.5 lg:py-3 bg-[#8A33FD] text-white rounded-lg hover:bg-[#7229D6] transition-colors text-sm lg:text-base font-medium"
          >
            {t('continueToPayment')}
          </button>
        )}
      </form>
    </div>
  );
}



