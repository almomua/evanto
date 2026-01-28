'use client';

import React, { useState } from 'react';

const tabs = [
    'All',
    'Pending',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancelled',
];

const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const statusColors: Record<string, { bg: string, text: string, ring: string }> = {
    'Pending': { bg: 'bg-orange-50', text: 'text-orange-500', ring: 'ring-orange-500/10' },
    'Confirmed': { bg: 'bg-green-50', text: 'text-green-500', ring: 'ring-green-500/10' },
    'Processing': { bg: 'bg-sky-50', text: 'text-sky-500', ring: 'ring-sky-500/10' },
    'Picked': { bg: 'bg-blue-50', text: 'text-blue-500', ring: 'ring-blue-500/10' },
    'Shipped': { bg: 'bg-purple-50', text: 'text-purple-500', ring: 'ring-purple-500/10' },
    'Delivered': { bg: 'bg-indigo-50', text: 'text-indigo-500', ring: 'ring-indigo-500/10' },
    'Cancelled': { bg: 'bg-red-50', text: 'text-red-500', ring: 'ring-red-500/10' },
};

import { ordersApi, Order } from '@/lib/api/orders';
import { Loader2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useEffect } from 'react';
import { clsx } from 'clsx';


export function OrderManagementTable() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            setLoading(true);
            const data = await ordersApi.getOrders();
            setOrders(data);
        } catch (error) {
            console.error('Failed to load orders', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (orderId: string, newStatus: string) => {
        try {
            await ordersApi.updateOrder(orderId, { status: newStatus as any });
            // Update local state
            setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
        } catch (error) {
            console.error('Failed to update status', error);
            alert('Failed to update order status');
        }
    };

    const filteredOrders = orders.filter(order => {
        // Filter by tab
        if (activeTab !== 'All' && activeTab.toLowerCase() !== order.status) {
            return false;
        }

        // Filter by search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
                order._id.toLowerCase().includes(query) ||
                order.customer?.name?.toLowerCase().includes(query)
            );
        }
        return true;
    });

    if (loading) return <div className="p-12 flex justify-center"><Loader2 className="animate-spin" /></div>;


    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Tabs */}
            <div className="flex items-center px-6 border-b border-gray-100 overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-4 text-sm font-medium transition-all relative min-w-max ${activeTab === tab
                            ? 'text-[#8B5CF6]'
                            : 'text-gray-500 hover:text-gray-700'
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
                <div className="relative w-full md:w-96">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#807D7E" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Search by order id"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
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
                            <th className="px-6 py-4 text-left font-semibold text-[#807D7E]">ORDER ID</th>
                            <th className="px-6 py-4 text-left font-semibold text-[#807D7E]">CREATED</th>
                            <th className="px-6 py-4 text-left font-semibold text-[#807D7E]">CUSTOMER</th>
                            <th className="px-6 py-4 text-left font-semibold text-[#807D7E]">TOTAL</th>
                            <th className="px-6 py-4 text-left font-semibold text-[#807D7E]">PROFIT</th>
                            <th className="px-6 py-4 text-left font-semibold text-[#807D7E]">STATUS</th>
                            <th className="px-6 py-4 text-right"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredOrders.map((order) => (
                            <React.Fragment key={order._id}>
                                <tr
                                    className={`hover:bg-gray-50 transition-colors cursor-pointer ${expandedRow === order._id ? 'bg-gray-50' : ''}`}
                                    onClick={() => setExpandedRow(expandedRow === order._id ? null : order._id)}
                                >
                                    <td className="px-6 py-4 font-bold text-[#3C4242]">#{order._id.slice(-6).toUpperCase()}</td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                        <br />
                                        <span className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleTimeString()}</span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700 font-medium">{order.customer?.name}</td>
                                    <td className="px-6 py-4 font-bold text-[#3C4242]">
                                        {formatPrice(order.totalAmount)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-[#3C4242]">-</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                handleStatusUpdate(order._id, e.target.value);
                                            }}
                                            className={clsx(
                                                'block w-full px-2 py-1 text-xs font-semibold rounded-lg ring-1 transition-all outline-none cursor-pointer',
                                                statusColors[order.status.charAt(0).toUpperCase() + order.status.slice(1)]?.bg || 'bg-gray-50',
                                                statusColors[order.status.charAt(0).toUpperCase() + order.status.slice(1)]?.text || 'text-gray-500',
                                                statusColors[order.status.charAt(0).toUpperCase() + order.status.slice(1)]?.ring || 'ring-gray-500/10'
                                            )}
                                        >
                                            {statusOptions.map(status => (
                                                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setExpandedRow(expandedRow === order._id ? null : order._id);
                                            }}
                                            className="p-2 text-gray-400 hover:text-[#8B5CF6] rounded-full hover:bg-[#8B5CF6]/10 transition-colors"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-200 ${expandedRow === order._id ? 'rotate-180' : ''}`}>
                                                <circle cx="12" cy="12" r="10" />
                                                <path d="m8 10 4 4 4-4" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                                {expandedRow === order._id && (
                                    <tr>
                                        <td colSpan={7} className="px-12 py-6 bg-white border-b border-gray-100">
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-sm">
                                                    <thead>
                                                        <tr className="text-[#807D7E] text-xs uppercase tracking-wider border-b border-gray-100">
                                                            <th className="pb-4 text-left font-semibold">#</th>
                                                            <th className="pb-4 text-left font-semibold">SKU</th>
                                                            <th className="pb-4 text-left font-semibold">NAME</th>
                                                            <th className="pb-4 text-left font-semibold">PRICE</th>
                                                            <th className="pb-4 text-left font-semibold">QTY</th>
                                                            <th className="pb-4 text-left font-semibold">TOTAL</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-50">
                                                        {order.items.map((item, i) => (
                                                            <tr key={i}>
                                                                <td className="py-4 text-[#807D7E]">{i + 1}</td>
                                                                <td className="py-4 text-[#3C4242]">#{item.product._id.slice(-6).toUpperCase()}</td>
                                                                <td className="py-4 text-[#3C4242] font-bold">{item.product?.name}</td>
                                                                <td className="py-4 text-[#3C4242]">{formatPrice(item.variant?.price || item.product?.price)}</td>
                                                                <td className="py-4 text-[#3C4242]">{item.quantity}</td>
                                                                <td className="py-4 text-[#3C4242] font-bold">{formatPrice(item.subtotal)}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="mt-6 flex justify-end">
                                                <div className="w-64 space-y-3">
                                                    <div className="flex justify-between pt-3 border-t border-gray-100">
                                                        <span className="font-bold text-[#3C4242]">Total</span>
                                                        <span className="text-[#3C4242] font-bold">{formatPrice(order.totalAmount)}</span>
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

            {/* Pagination */}
            <div className="p-4 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    Showing
                    <select className="px-2 py-1 bg-white border border-gray-200 rounded text-gray-700 outline-none focus:ring-1 focus:ring-[#8B5CF6]">
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                    </select>
                    of 50
                </div>

                <div className="flex items-center gap-1">
                    <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-400">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>
                    {[1, 2, 3, 4, 5].map((page) => (
                        <button
                            key={page}
                            className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${page === 1
                                ? 'bg-[#8B5CF6] text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-400">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
