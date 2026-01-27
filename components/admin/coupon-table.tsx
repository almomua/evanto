import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminApi, Coupon } from '@/lib/api/admin';

export function CouponTable() {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const data = await adminApi.getCoupons();
                setCoupons(data);
            } catch (error) {
                console.error("Failed to fetch coupons", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCoupons();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this coupon?')) return;
        try {
            await adminApi.deleteCoupon(id);
            setCoupons(coupons.filter(c => c._id !== id));
        } catch (error) {
            alert('Failed to delete coupon');
        }
    };

    const filteredCoupons = coupons.filter(c =>
        c.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <div className="p-12 text-center text-gray-400">Loading coupons...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Filters & Actions */}
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
                        placeholder="Search coupon code..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-[#F8F9FA] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
                    />
                </div>

                <Link
                    href="/admin/coupons/new"
                    className="px-6 py-2.5 bg-[#1E6BFF] text-white rounded-lg text-sm font-bold hover:bg-[#1656D6] transition-colors"
                >
                    Create New Coupon
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100 text-[#807D7E] text-xs font-bold uppercase tracking-wider">
                            <th className="px-6 py-4 text-left">COUPON CODE</th>
                            <th className="px-6 py-4 text-left">DISCOUNT</th>
                            <th className="px-6 py-4 text-left">EXPIRY</th>
                            <th className="px-6 py-4 text-left">STATUS</th>
                            <th className="px-6 py-4 text-left">ACTION</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredCoupons.length === 0 ? (
                            <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-400">No coupons found</td></tr>
                        ) : (
                            filteredCoupons.map((coupon) => (
                                <tr key={coupon._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-[#3C4242] tracking-wider">{coupon.code}</td>
                                    <td className="px-6 py-4 text-[#3C4242] font-semibold">
                                        {coupon.discountType === 'Percentage' ? `${coupon.value}%` : `$${coupon.value}`} Off
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 font-medium">
                                        {new Date(coupon.expiryDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${coupon.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                                            }`}>
                                            {coupon.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Link
                                                href={`/admin/coupons/${coupon._id}/edit`}
                                                className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M12 20h9" />
                                                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                                </svg>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(coupon._id)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M3 6h18" />
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
