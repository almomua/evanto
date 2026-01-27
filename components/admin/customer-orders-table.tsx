'use client';

import React, { useState } from 'react';

const tabs = ['All Orders', 'Completed', 'Canceled'];

const mockOrders = [
    { id: '#6548', created: '2 min ago', total: '$654', payment: 'CC', status: 'Completed' },
    { id: '#6548', created: '2 min ago', total: '$654', payment: 'COD', status: 'Canceled' },
    { id: '#6548', created: '2 min ago', total: '$654', payment: 'CC', status: 'Pending' },
    { id: '#6548', created: '2 min ago', total: '$654', payment: 'CC', status: 'Pending' },
];

const statusColors: Record<string, string> = {
    'Completed': 'text-green-500',
    'Canceled': 'text-red-500',
    'Pending': 'text-orange-500',
};

export function CustomerOrdersTable() {
    const [activeTab, setActiveTab] = useState('All Orders');
    const [expandedRow, setExpandedRow] = useState<number | null>(2); // Defaulting to Pending in image

    const orderItems = [
        { sku: '#6548', name: 'Apple iPhone 13', price: '$999.29', qty: 'x1', disc: '5%', total: '$949.32' },
        { sku: '#6548', name: 'Apple iPhone 13', price: '$999.29', qty: 'x1', disc: '5%', total: '$949.32' },
        { sku: '#6548', name: 'Apple iPhone 13', price: '$999.29', qty: 'x1', disc: '5%', total: '$949.32' },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Tabs */}
            <div className="flex items-center px-6 border-b border-gray-100">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-4 text-sm font-medium transition-all relative ${activeTab === tab ? 'text-[#8B5CF6]' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B5CF6]" />
                        )}
                    </button>
                ))}
            </div>

            {/* Filters */}
            <div className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-80">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#807D7E" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Search by order id"
                        className="w-full pl-10 pr-4 py-2 bg-[#F8F9FA] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
                    />
                </div>

                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-[#807D7E] hover:bg-gray-50">
                    Filter by date range
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-[#F8F9FA] border-y border-gray-100">
                            <th className="px-6 py-4 text-left font-semibold text-[#807D7E] text-xs uppercase">ORDER ID</th>
                            <th className="px-6 py-4 text-left font-semibold text-[#807D7E] text-xs uppercase">CREATED</th>
                            <th className="px-6 py-4 text-left font-semibold text-[#807D7E] text-xs uppercase">TOTAL</th>
                            <th className="px-6 py-4 text-left font-semibold text-[#807D7E] text-xs uppercase">PAYMENT</th>
                            <th className="px-6 py-4 text-left font-semibold text-[#807D7E] text-xs uppercase">STATUS</th>
                            <th className="px-6 py-4 text-right"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {mockOrders.map((order, idx) => (
                            <React.Fragment key={idx}>
                                <tr
                                    className={`hover:bg-gray-50 transition-colors cursor-pointer ${expandedRow === idx ? 'bg-gray-50' : ''}`}
                                    onClick={() => setExpandedRow(expandedRow === idx ? null : idx)}
                                >
                                    <td className="px-6 py-4 font-bold text-[#3C4242]">{order.id}</td>
                                    <td className="px-6 py-4 text-gray-600">{order.created}</td>
                                    <td className="px-6 py-4 font-bold text-[#3C4242]">{order.total}</td>
                                    <td className="px-6 py-4 text-gray-600 font-medium">{order.payment}</td>
                                    <td className="px-6 py-4">
                                        <span className={`font-bold ${statusColors[order.status]}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-gray-400 hover:text-[#8B5CF6]">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-200 ${expandedRow === idx ? 'rotate-180' : ''}`}>
                                                <circle cx="12" cy="12" r="10" />
                                                <path d="m8 10 4 4 4-4" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                                {expandedRow === idx && (
                                    <tr>
                                        <td colSpan={6} className="px-12 py-6 bg-white border-b border-gray-100">
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-sm">
                                                    <thead>
                                                        <tr className="text-[#807D7E] text-xs uppercase tracking-wider border-b border-gray-100">
                                                            <th className="pb-4 text-left font-semibold">#</th>
                                                            <th className="pb-4 text-left font-semibold">SKU</th>
                                                            <th className="pb-4 text-left font-semibold">NAME</th>
                                                            <th className="pb-4 text-left font-semibold">PRICE</th>
                                                            <th className="pb-4 text-left font-semibold">QTY</th>
                                                            <th className="pb-4 text-left font-semibold">DISC.</th>
                                                            <th className="pb-4 text-left font-semibold">TOTAL</th>
                                                            <th className="pb-4 text-right">
                                                                <button className="flex items-center gap-1 ml-auto text-gray-500 hover:text-[#8B5CF6]">
                                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                        <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                                                                        <path d="M6 14h12v8H6z" />
                                                                    </svg>
                                                                    <span>PRINT</span>
                                                                </button>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-50">
                                                        {orderItems.map((item, i) => (
                                                            <tr key={i}>
                                                                <td className="py-4 text-[#807D7E]">{i + 1}</td>
                                                                <td className="py-4 text-[#3C4242]">{item.sku}</td>
                                                                <td className="py-4 text-[#3C4242] font-bold">{item.name}</td>
                                                                <td className="py-4 text-[#3C4242]">{item.price}</td>
                                                                <td className="py-4 text-[#3C4242]">{item.qty}</td>
                                                                <td className="py-4 text-red-400">{item.disc}</td>
                                                                <td className="py-4 text-[#3C4242] font-bold">{item.total}</td>
                                                                <td className="py-4 text-right">
                                                                    <button className="p-1 hover:bg-gray-100 rounded">
                                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                            <circle cx="12" cy="12" r="1" />
                                                                            <circle cx="19" cy="12" r="1" />
                                                                            <circle cx="5" cy="12" r="1" />
                                                                        </svg>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="mt-6 flex justify-end">
                                                <div className="w-64 space-y-3">
                                                    <div className="flex justify-between text-[#807D7E]">
                                                        <span>Subtotal</span>
                                                        <span className="text-[#3C4242] font-medium">$2,847.96</span>
                                                    </div>
                                                    <div className="flex justify-between text-[#807D7E]">
                                                        <span>Shipping</span>
                                                        <span className="text-[#3C4242] font-medium">$5.50</span>
                                                    </div>
                                                    <div className="flex justify-between text-[#807D7E]">
                                                        <span>Discount</span>
                                                        <span className="text-red-500 font-medium">$150.32</span>
                                                    </div>
                                                    <div className="flex justify-between pt-3 border-t border-gray-100">
                                                        <span className="font-bold text-[#3C4242]">Total</span>
                                                        <span className="text-[#3C4242] font-bold">$2647.32</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
