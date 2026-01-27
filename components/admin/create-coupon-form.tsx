'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/api/admin';

export function CreateCouponForm() {
    const router = useRouter();
    const [discountType, setDiscountType] = useState<'Percentage' | 'Fixed'>('Percentage');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        code: '',
        value: '',
        minPurchase: '0',
        expiryDate: '',
        usageLimit: '100',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleGenerateCode = (e: React.MouseEvent) => {
        e.preventDefault();
        const code = Math.random().toString(36).substring(2, 10).toUpperCase();
        setFormData((prev: any) => ({ ...prev, code }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.code || !formData.value || !formData.expiryDate) {
            alert('Please fill in all required fields');
            return;
        }

        setLoading(true);
        try {
            await adminApi.createCoupon({
                ...formData,
                discountType,
                value: Number(formData.value),
                minPurchase: Number(formData.minPurchase),
                usageLimit: Number(formData.usageLimit),
            });
            alert('Coupon created successfully!');
            router.push('/admin/coupons');
        } catch (error) {
            alert('Failed to create coupon');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Column: Form */}
            <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
                <h3 className="text-xl font-bold text-[#3C4242]">Coupon Details</h3>

                <div className="space-y-6">
                    {/* Coupon Code */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#807D7E]">Coupon Code</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="code"
                                placeholder="Ex: SUMMER2025"
                                required
                                value={formData.code}
                                onChange={handleChange}
                                className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#3C4242] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all font-medium"
                            />
                            <button
                                onClick={handleGenerateCode}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1E6BFF] text-sm font-bold hover:text-[#1656D6] transition-colors"
                            >
                                Generate Code
                            </button>
                        </div>
                    </div>

                    {/* Discount Type */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#807D7E]">Discount Type</label>
                        <div className="flex bg-white border border-gray-200 rounded-xl p-1">
                            <button
                                type="button"
                                onClick={() => setDiscountType('Percentage')}
                                className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${discountType === 'Percentage'
                                    ? 'bg-[#1E6BFF] text-white'
                                    : 'text-[#807D7E] hover:bg-gray-50'
                                    }`}
                            >
                                Percentage %
                            </button>
                            <button
                                type="button"
                                onClick={() => setDiscountType('Fixed')}
                                className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${discountType === 'Fixed'
                                    ? 'bg-[#1E6BFF] text-white'
                                    : 'text-[#807D7E] hover:bg-gray-50'
                                    }`}
                            >
                                Fixed Amount
                            </button>
                        </div>
                    </div>

                    {/* Row 1: Value & Min Purchase */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-[#807D7E]">Discount Value</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                                    {discountType === 'Percentage' ? '%' : '$'}
                                </span>
                                <input
                                    type="number"
                                    name="value"
                                    required
                                    value={formData.value}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#3C4242] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all font-medium"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-[#807D7E]">Minimum Purchase</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                                <input
                                    type="number"
                                    name="minPurchase"
                                    value={formData.minPurchase}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#3C4242] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Expiry & Limits */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-[#807D7E]">Expiry Date</label>
                            <input
                                type="date"
                                name="expiryDate"
                                required
                                value={formData.expiryDate}
                                onChange={handleChange}
                                className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#3C4242] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all font-medium outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-[#807D7E]">Usage Limits</label>
                            <input
                                type="number"
                                name="usageLimit"
                                value={formData.usageLimit}
                                onChange={handleChange}
                                className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#3C4242] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all font-medium"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-end gap-3 pt-6">
                    <Link
                        href="/admin/coupons"
                        className="px-8 py-3 bg-[#F8F9FA] text-[#807D7E] rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-10 py-3 bg-[#1E6BFF] text-white rounded-xl text-sm font-bold hover:bg-[#1656D6] transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Coupon'}
                    </button>
                </div>
            </div>

            {/* Right Column: Summary */}
            <div className="w-full lg:w-[350px] bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                <h3 className="text-xl font-bold text-[#3C4242]">Coupon Summary</h3>

                <div className="space-y-4">
                    <div className="flex justify-between items-center py-1">
                        <span className="text-sm text-[#807D7E] font-medium">Coupon Code</span>
                        <span className="text-sm text-[#3C4242] font-bold tracking-wider">{formData.code || '----'}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                        <span className="text-sm text-[#807D7E] font-medium">Discount</span>
                        <span className="text-sm text-[#3C4242] font-bold">
                            {formData.value ? `${formData.value}${discountType === 'Percentage' ? '%' : '$'} Off` : '----'}
                        </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                        <span className="text-sm text-[#807D7E] font-medium">Min Purchase</span>
                        <span className="text-sm text-[#3C4242] font-bold">{formData.minPurchase ? `$${formData.minPurchase}.00` : '----'}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                        <span className="text-sm text-[#807D7E] font-medium">Expires On</span>
                        <span className="text-sm text-[#3C4242] font-bold">
                            {formData.expiryDate ? new Date(formData.expiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '----'}
                        </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                        <span className="text-sm text-[#807D7E] font-medium">Usage Limit</span>
                        <span className="text-sm text-[#3C4242] font-bold">{formData.usageLimit ? `${formData.usageLimit} uses` : '----'}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                        <span className="text-sm text-[#807D7E] font-medium">Status</span>
                        <span className="text-sm text-green-500 font-bold uppercase tracking-wide">Active</span>
                    </div>
                </div>
            </div>
        </form>
    );
}
