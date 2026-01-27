'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminApi } from '@/lib/api/admin';
import { Product } from '@/lib/api/products';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useModal } from '@/components/ui/modal';

// const mockProducts = ... (removed)

export function ProductListTable() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const modal = useModal();

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await adminApi.getProducts();
            setProducts(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        const confirmed = await modal.confirm('Are you sure you want to delete this product?', 'Delete Product');
        if (confirmed) {
            try {
                await adminApi.deleteProduct(id);
                setProducts(prev => prev.filter(p => p._id !== id));
                modal.success('Product deleted successfully');
            } catch (error) {
                console.error("Failed to delete", error);
                modal.error('Failed to delete product');
            }
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Filters */}
            <div className="p-4">
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
                        <tr className="bg-white border-b border-gray-100 text-[#807D7E] text-xs uppercase tracking-wider">
                            <th className="px-6 py-4 text-left font-semibold">NAME</th>
                            <th className="px-6 py-4 text-left font-semibold">CATEGORY</th>
                            <th className="px-6 py-4 text-left font-semibold">PRICE</th>
                            <th className="px-6 py-4 text-left font-semibold">ACTION</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredProducts.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 relative overflow-hidden">
                                            {product.images?.[0]?.secure_url &&
                                                product.images[0].secure_url !== 'string' && (
                                                    <Image
                                                        src={product.images[0].secure_url}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                        unoptimized
                                                    />
                                                )}
                                        </div>
                                        <span className="font-bold text-[#3C4242]">{product.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-700 font-medium">{product.category?.name || 'N/A'}</td>
                                <td className="px-6 py-4 text-gray-700 font-medium">
                                    {typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <Link
                                            href={`/admin/products/${product._id}/edit`}
                                            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 20h9" />
                                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                            </svg>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product._id)}
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
