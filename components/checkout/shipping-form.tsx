'use client';

import { useState } from 'react';

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
}

export function ShippingForm({ onSubmit }: ShippingFormProps) {
  const [formData, setFormData] = useState<ShippingFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-xl p-8 border border-[#BEBCBD]/30">
      <h2 className="text-[#3C4242] text-2xl font-bold mb-6">Shipping Address</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Row */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[#3C4242] text-sm font-medium mb-2">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:border-[#8A33FD]"
              placeholder="First Name"
            />
          </div>
          <div>
            <label className="block text-[#3C4242] text-sm font-medium mb-2">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:border-[#8A33FD]"
              placeholder="Last Name"
            />
          </div>
        </div>

        {/* Contact Row */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[#3C4242] text-sm font-medium mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:border-[#8A33FD]"
              placeholder="Email Address"
            />
          </div>
          <div>
            <label className="block text-[#3C4242] text-sm font-medium mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:border-[#8A33FD]"
              placeholder="Phone Number"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-[#3C4242] text-sm font-medium mb-2">
            Street Address *
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:border-[#8A33FD]"
            placeholder="Street Address"
          />
        </div>

        {/* City/State Row */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[#3C4242] text-sm font-medium mb-2">
              City *
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:border-[#8A33FD]"
              placeholder="City"
            />
          </div>
          <div>
            <label className="block text-[#3C4242] text-sm font-medium mb-2">
              State *
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:border-[#8A33FD]"
              placeholder="State"
            />
          </div>
        </div>

        {/* Zip/Country Row */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[#3C4242] text-sm font-medium mb-2">
              Zip Code *
            </label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:border-[#8A33FD]"
              placeholder="Zip Code"
            />
          </div>
          <div>
            <label className="block text-[#3C4242] text-sm font-medium mb-2">
              Country *
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] focus:outline-none focus:border-[#8A33FD] bg-white"
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="India">India</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}

