'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminApi } from '@/lib/api/admin';
import { User } from '@/lib/api/auth';
import { Loader2 } from 'lucide-react';
import { useModal } from '@/components/ui/modal';


export function CustomersTable() {
    const [customers, setCustomers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const modal = useModal();

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        try {
            const data = await adminApi.getUsers();
            setCustomers(data);
        } catch (error) {
            console.error('Failed to load customers', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        const confirmed = await modal.confirm('Are you sure you want to delete this user?', 'Delete User');
        if (confirmed) {
            try {
                await adminApi.deleteUser(id);
                setCustomers(prev => prev.filter(c => c._id !== id));
                modal.success('User deleted successfully');
            } catch (error) {
                console.error('Failed to delete user', error);
                modal.error('Failed to delete user');
            }
        }
    };

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;


    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-[#F8F9FA] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-white border-b border-gray-100">
                            <th className="px-6 py-4 text-left font-semibold text-[#807D7E] text-xs uppercase tracking-wider">NAME</th>
                            <th className="px-6 py-4 text-left font-semibold text-[#807D7E] text-xs uppercase tracking-wider">PHONE NUMBER</th>
                            <th className="px-6 py-4 text-left font-semibold text-[#807D7E] text-xs uppercase tracking-wider">CREATED</th>
                            <th className="px-6 py-4 text-left font-semibold text-[#807D7E] text-xs uppercase tracking-wider">ACTION</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredCustomers.map((customer) => (
                            <tr key={customer._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-600">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 font-bold text-xs ring-2 ring-white uppercase">
                                            {customer.name.slice(0, 2)}
                                        </div>
                                        <div>
                                            <Link href={`/admin/customers/${customer._id}`} className="block group">
                                                <div className="font-bold text-[#3C4242] group-hover:text-[#8B5CF6] transition-colors">{customer.name}</div>
                                                <div className="text-xs text-gray-400">{customer.email}</div>
                                            </Link>                    </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-[#3C4242] font-medium">{customer.phone || 'N/A'}</td>
                                <td className="px-6 py-4 text-[#3C4242] font-medium">{'N/A'/* Date not in User interface yet, or use generic fallback */}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 20h9" />
                                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(customer._id)}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M3 6h18" />
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
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
