'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminApi } from '@/lib/api/admin';
import { Product, Category, categoriesApi } from '@/lib/api/products';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { useModal } from '@/components/ui/modal';

// const mockProducts = ... (removed)

export function ProductListTable() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [stockFilter, setStockFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>({
        key: 'name',
        direction: 'asc'
    });

    const modal = useModal();

    useEffect(() => {
        loadData();
    }, [currentPage, categoryFilter, stockFilter, sortConfig]);

    useEffect(() => {
        // Reset to page 1 when filters change
        setCurrentPage(1);
    }, [categoryFilter, stockFilter, searchQuery]);

    const loadData = async () => {
        try {
            setLoading(true);
            const params: any = {
                page: currentPage,
                limit: 10,
                sort: sortConfig ? `${sortConfig.direction === 'desc' ? '-' : ''}${sortConfig.key}` : undefined,
                category: categoryFilter !== 'all' ? categoryFilter : undefined,
            };

            const [{ docs, totalPages: total }, categoriesData] = await Promise.all([
                adminApi.getProducts(params),
                categoriesApi.getAll()
            ]);
            setProducts(docs);
            setTotalPages(total);
            setCategories(categoriesData);
        } catch (error) {
            console.error('Failed to load data', error);
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

    const handleSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getStockStatus = (stock: number) => {
        if (stock <= 0) return { label: 'Out of Stock', color: 'text-red-600 bg-red-50' };
        if (stock <= 5) return { label: 'Low Stock', color: 'text-orange-600 bg-orange-50' };
        return { label: 'In Stock', color: 'text-green-600 bg-green-50' };
    };

    // Filter and Sort Logic (Search remains client-side for immediate feedback, others moved to server)
    const processedProducts = products
        .filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSearch;
        });

    if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

    const SortIcon = ({ column }: { column: string }) => {
        if (sortConfig?.key !== column) return <span className="ml-1 opacity-20">⇅</span>;
        return <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>;
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Filters Bar */}
            <div className="p-4 border-b border-gray-50 bg-[#F8F9FA]/50">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Search */}
                    <div className="relative w-full md:w-80">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#807D7E" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search product name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                        {/* Category Filter */}
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-[#3C4242] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 outline-none cursor-pointer"
                        >
                            <option value="all">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>

                        {/* Stock Filter */}
                        <select
                            value={stockFilter}
                            onChange={(e) => setStockFilter(e.target.value)}
                            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-[#3C4242] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 outline-none cursor-pointer"
                        >
                            <option value="all">Stock Status</option>
                            <option value="in">In Stock</option>
                            <option value="low">Low Stock (≤5)</option>
                            <option value="out">Out of Stock</option>
                        </select>

                        {/* Results Count */}
                        <span className="text-xs font-bold text-gray-400 ml-2">
                            {processedProducts.length} PRODUCTS FOUND
                        </span>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-white border-b border-gray-100 text-[#807D7E] text-xs uppercase tracking-wider">
                            <th
                                className="px-6 py-4 text-left font-semibold cursor-pointer hover:text-[#3C4242] transition-colors"
                                onClick={() => handleSort('name')}
                            >
                                <div className="flex items-center">NAME <SortIcon column="name" /></div>
                            </th>
                            <th
                                className="px-6 py-4 text-left font-semibold cursor-pointer hover:text-[#3C4242] transition-colors"
                                onClick={() => handleSort('category')}
                            >
                                <div className="flex items-center">CATEGORY <SortIcon column="category" /></div>
                            </th>
                            <th
                                className="px-6 py-4 text-left font-semibold cursor-pointer hover:text-[#3C4242] transition-colors"
                                onClick={() => handleSort('price')}
                            >
                                <div className="flex items-center">PRICE <SortIcon column="price" /></div>
                            </th>
                            <th
                                className="px-6 py-4 text-left font-semibold cursor-pointer hover:text-[#3C4242] transition-colors"
                                onClick={() => handleSort('stock')}
                            >
                                <div className="flex items-center">STOCK <SortIcon column="stock" /></div>
                            </th>
                            <th className="px-6 py-4 text-left font-semibold">ACTION</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {processedProducts.map((product) => {
                            const stock = (product as any).stock_quantity || 0;
                            const status = getStockStatus(stock);
                            return (
                                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-gray-100 relative overflow-hidden border border-gray-100">
                                                {product.images?.[0]?.secure_url && (
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
                                    <td className="px-6 py-4">
                                        <span className="text-gray-600 font-medium px-2 py-1 bg-gray-100 rounded text-[10px] uppercase">
                                            {product.category?.name || 'Uncategorized'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700 font-bold">
                                        {formatPrice(product.price)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block w-fit ${status.color}`}>
                                                {status.label}
                                            </span>
                                            <span className="text-gray-400 text-[10px] ml-2">{stock} units</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/admin/products/${product._id}/edit`}
                                                className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Edit Product"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M12 20h9" />
                                                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                                </svg>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete Product"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M3 6h18" />
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Empty State */}
            {processedProducts.length === 0 && (
                <div className="p-20 text-center">
                    <p className="text-gray-400 italic">No products found matching your filters.</p>
                </div>
            )}

            {/* Footer with Pagination */}
            <div className="p-4 bg-white border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-xs text-gray-400">
                    Page <span className="font-bold text-gray-600">{currentPage}</span> of <span className="font-bold text-gray-600">{totalPages}</span>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1 || loading}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                    >
                        Previous
                    </button>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter(page => {
                                // Show first, last, and pages around current
                                return page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
                            })
                            .map((page, index, array) => (
                                <React.Fragment key={page}>
                                    {index > 0 && array[index - 1] !== page - 1 && (
                                        <span className="text-gray-400 px-1">...</span>
                                    )}
                                    <button
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${currentPage === page
                                                ? 'bg-[#1E6BFF] text-white'
                                                : 'text-gray-600 hover:bg-gray-50 border border-transparent hover:border-gray-200'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                </React.Fragment>
                            ))
                        }
                    </div>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages || loading}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
