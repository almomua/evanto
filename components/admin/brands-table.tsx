'use client';

import React, { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { adminApi } from '@/lib/api/admin';
import { Loader2 } from 'lucide-react';
import { useModal } from '@/components/ui/modal';

interface Brand {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    createdAt?: string;
}

export function BrandsTable() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const modal = useModal();

    useEffect(() => {
        loadBrands();
    }, []);

    const loadBrands = async () => {
        try {
            const data = await adminApi.getBrands();
            setBrands(data);
        } catch (error) {
            console.error('Failed to load brands', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        const confirmed = await modal.confirm('Are you sure you want to delete this brand?', 'Delete Brand');
        if (confirmed) {
            try {
                await adminApi.deleteBrand(id);
                setBrands(prev => prev.filter(b => b._id !== id));
                modal.success('Brand deleted successfully');
            } catch (error) {
                console.error('Failed to delete brand', error);
                modal.error('Failed to delete brand');
            }
        }
    };

    const filteredBrands = brands.filter(b =>
        b.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

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
                        placeholder="Search brands..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-[#F8F9FA] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
                    />
                </div>

                <Link
                    href="/admin/brands/new"
                    className="px-6 py-2.5 bg-[#1E6BFF] text-white rounded-lg text-sm font-bold hover:bg-[#1656D6] transition-colors"
                >
                    Create New Brand
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-white border-b border-gray-100 text-[#807D7E] text-xs uppercase tracking-wider">
                            <th className="px-6 py-4 text-left font-semibold">BRAND NAME</th>
                            <th className="px-6 py-4 text-left font-semibold">SLUG</th>
                            <th className="px-6 py-4 text-left font-semibold">ACTION</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredBrands.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-6 py-8 text-center text-gray-400">No brands found</td>
                            </tr>
                        ) : (
                            filteredBrands.map((brand) => (
                                <tr key={brand._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-[#3C4242] font-medium">{brand.name}</td>
                                    <td className="px-6 py-4 text-[#807D7E]">{brand.slug}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Link
                                                href={`/admin/brands/${brand._id}/edit`}
                                                className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M12 20h9" />
                                                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                                </svg>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(brand._id)}
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
