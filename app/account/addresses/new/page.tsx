'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronDown } from 'lucide-react';

export default function AddAddressPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    company: '',
    streetAddress: '',
    apt: '',
    city: '',
    state: '',
    phone: '',
    postalCode: '',
    deliveryInstruction: '',
    isDefaultShipping: false,
    isDefaultBilling: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving address:', formData);
    router.push('/account');
  };

  const handleCancel = () => {
    router.push('/account');
  };

  return (
    <div className="flex-1">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link href="/" className="text-[#807D7E] hover:text-[#3C4242]">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 text-[#807D7E]" />
        <Link href="/account" className="text-[#807D7E] hover:text-[#3C4242]">
          My Account
        </Link>
        <ChevronRight className="w-4 h-4 text-[#807D7E]" />
        <span className="text-[#3C4242]">Delivery Address</span>
      </nav>

      {/* My Info Heading */}
      <h1 className="text-[#3C4242] text-2xl font-semibold mb-2">My Info</h1>
      
      {/* Add Address Subheading */}
      <h2 className="text-[#3C4242] text-xl mb-8">Add Address</h2>

      {/* Address Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: First Name & Last Name */}
        <div className="grid grid-cols-2 gap-10">
          <div>
            <label className="block text-[#3C4242] text-base mb-2 tracking-wide">
              First Name*
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
              className="w-full px-5 py-4 bg-[#F6F6F6] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:ring-2 focus:ring-[#8A33FD]/30"
            />
          </div>
          <div>
            <label className="block text-[#3C4242] text-base mb-2 tracking-wide">
              Last Name*
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
              className="w-full px-5 py-4 bg-[#F6F6F6] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:ring-2 focus:ring-[#8A33FD]/30"
            />
          </div>
        </div>

        {/* Row 2: Country & Company */}
        <div className="grid grid-cols-2 gap-10">
          <div>
            <label className="block text-[#3C4242] text-base mb-2 tracking-wide">
              Country / Region*
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country / Region"
              required
              className="w-full px-5 py-4 bg-[#F6F6F6] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:ring-2 focus:ring-[#8A33FD]/30"
            />
          </div>
          <div>
            <label className="block text-[#3C4242] text-base mb-2 tracking-wide">
              Company Name
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company (optional)"
              className="w-full px-5 py-4 bg-[#F6F6F6] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:ring-2 focus:ring-[#8A33FD]/30"
            />
          </div>
        </div>

        {/* Row 3: Street Address & Apt */}
        <div className="grid grid-cols-2 gap-10">
          <div>
            <label className="block text-[#3C4242] text-base mb-2 tracking-wide">
              Street Address*
            </label>
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              placeholder="House number and street name"
              required
              className="w-full px-5 py-4 bg-[#F6F6F6] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:ring-2 focus:ring-[#8A33FD]/30"
            />
          </div>
          <div>
            <label className="block text-[#3C4242] text-base mb-2 tracking-wide">
              Apt, suite, unit
            </label>
            <input
              type="text"
              name="apt"
              value={formData.apt}
              onChange={handleChange}
              placeholder="apartment, suite, unit, etc. (optional)"
              className="w-full px-5 py-4 bg-[#F6F6F6] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:ring-2 focus:ring-[#8A33FD]/30"
            />
          </div>
        </div>

        {/* Row 4: City & State */}
        <div className="grid grid-cols-2 gap-10">
          <div>
            <label className="block text-[#3C4242] text-base mb-2 tracking-wide">
              City*
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Town / City"
              required
              className="w-full px-5 py-4 bg-[#F6F6F6] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:ring-2 focus:ring-[#8A33FD]/30"
            />
          </div>
          <div>
            <label className="block text-[#3C4242] text-base mb-2 tracking-wide">
              State*
            </label>
            <div className="relative">
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 bg-[#F6F6F6] rounded-lg text-[#807D7E] focus:outline-none focus:ring-2 focus:ring-[#8A33FD]/30 appearance-none cursor-pointer"
              >
                <option value="">State</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Delhi">Delhi</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3C4242] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Row 5: Phone & Postal Code */}
        <div className="grid grid-cols-2 gap-10">
          <div>
            <label className="block text-[#3C4242] text-base mb-2 tracking-wide">
              Phone*
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              required
              className="w-full px-5 py-4 bg-[#F6F6F6] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:ring-2 focus:ring-[#8A33FD]/30"
            />
          </div>
          <div>
            <label className="block text-[#3C4242] text-base mb-2 tracking-wide">
              Postal Code*
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Postal Code"
              required
              className="w-full px-5 py-4 bg-[#F6F6F6] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:ring-2 focus:ring-[#8A33FD]/30"
            />
          </div>
        </div>

        {/* Row 6: Delivery Instruction */}
        <div>
          <label className="block text-[#3C4242] text-base mb-2 tracking-wide">
            Delivery Instruction
          </label>
          <textarea
            name="deliveryInstruction"
            value={formData.deliveryInstruction}
            onChange={handleChange}
            placeholder="Delivery Instruction"
            rows={5}
            className="w-full px-5 py-4 bg-[#F6F6F6] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:ring-2 focus:ring-[#8A33FD]/30 resize-none"
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-3 pt-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="isDefaultShipping"
              checked={formData.isDefaultShipping}
              onChange={handleChange}
              className="w-5 h-5 border-2 border-[#BEBCBD] rounded-sm accent-[#8A33FD] cursor-pointer"
            />
            <span className="text-[#3C4242] text-lg">Set as default shipping address</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="isDefaultBilling"
              checked={formData.isDefaultBilling}
              onChange={handleChange}
              className="w-5 h-5 border-2 border-[#BEBCBD] rounded-sm accent-[#8A33FD] cursor-pointer"
            />
            <span className="text-[#3C4242] text-lg">Set as default billing address</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            className="px-10 py-3 bg-[#8A33FD] text-white text-lg rounded-lg hover:bg-[#7229D6] transition-colors"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-10 py-3 bg-[#F6F6F6] text-[#807D7E] text-lg rounded-lg hover:bg-[#E8E8E8] transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

