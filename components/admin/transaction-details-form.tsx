'use client';

import React, { useState } from 'react';

export function TransactionDetailsForm() {
    const [formData, setFormData] = useState({
        id: '#5089',
        customerName: 'Joseph Wheeler',
        customerEmail: 'joseph@example.com',
        customerPhone: '(201) 555-0124',
        amount: '2,564',
        method: 'CC',
        status: 'Pending',
        date: '2023-04-06',
        orderId: '#6548',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Transaction Info Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
                <h3 className="text-lg font-bold text-[#3C4242]">Transaction Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase">Transaction ID</label>
                        <input
                            type="text"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-[#F8F9FA] border border-gray-200 rounded-lg text-sm text-[#3C4242] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase">Order ID</label>
                        <input
                            type="text"
                            name="orderId"
                            value={formData.orderId}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-[#F8F9FA] border border-gray-200 rounded-lg text-sm text-[#3C4242] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase">Amount ($)</label>
                        <input
                            type="text"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-[#F8F9FA] border border-gray-200 rounded-lg text-sm text-[#3C4242] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase">Payment Method</label>
                        <select
                            name="method"
                            value={formData.method}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-[#F8F9FA] border border-gray-200 rounded-lg text-sm text-[#3C4242] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
                        >
                            <option value="CC">Credit Card (CC)</option>
                            <option value="COD">Cash on Delivery (COD)</option>
                            <option value="Bank">Bank Transfer</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-[#F8F9FA] border border-gray-200 rounded-lg text-sm text-[#3C4242] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 bg-[#F8F9FA] border border-gray-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 ${formData.status === 'Pending' ? 'text-orange-500' : 'text-green-500'
                                }`}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Canceled">Canceled</option>
                        </select>
                    </div>
                </div>
                <button className="w-full py-3 bg-[#8B5CF6] text-white rounded-lg font-bold hover:bg-[#7C3AED] transition-colors">
                    Save Changes
                </button>
            </div>

            {/* Customer Info Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6 text-[#3C4242]">
                <h3 className="text-lg font-bold">Customer Details</h3>
                <div className="flex items-center gap-4 border-b border-gray-50 pb-6">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                        JW
                    </div>
                    <div>
                        <h4 className="font-bold text-xl">{formData.customerName}</h4>
                        <p className="text-sm text-gray-400">Customer ID: #USER-99</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 font-medium">Email Address</span>
                        <input
                            type="email"
                            name="customerEmail"
                            value={formData.customerEmail}
                            onChange={handleChange}
                            className="text-right border-b border-transparent focus:border-[#8B5CF6] px-1 outline-none"
                        />
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 font-medium">Phone Number</span>
                        <input
                            type="text"
                            name="customerPhone"
                            value={formData.customerPhone}
                            onChange={handleChange}
                            className="text-right border-b border-transparent focus:border-[#8B5CF6] px-1 outline-none"
                        />
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 font-medium">Last Transaction</span>
                        <span className="font-semibold text-[#3C4242]">Today, 10:45 AM</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
