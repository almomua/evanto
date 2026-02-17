'use client';

import { useState, useEffect, useMemo } from 'react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { brandsApi, Brand } from '@/lib/api/products';
import { Loader2, Search } from 'lucide-react';

export default function BrandsPage() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const data = await brandsApi.getAll();
                setBrands(data);
            } catch (error) {
                console.error('Failed to fetch brands', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBrands();
    }, []);

    const filteredBrands = useMemo(() => {
        if (!searchQuery.trim()) return brands;
        const query = searchQuery.toLowerCase();
        return brands.filter(brand =>
            brand.name.toLowerCase().includes(query) ||
            brand.description?.toLowerCase().includes(query)
        );
    }, [brands, searchQuery]);

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[65px] py-8 lg:py-12">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl lg:text-4xl font-bold text-[#3C4242] mb-3">Our Brands</h1>
                    <p className="text-[#807D7E] text-lg">Explore products from our trusted brand partners</p>
                </div>

                {/* Search Bar */}
                <div className="max-w-md mx-auto mb-10">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#807D7E]" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search brands..."
                            className="w-full pl-12 pr-4 py-3 bg-[#F6F6F6] border border-gray-200 rounded-xl text-[#3C4242] placeholder-[#807D7E] focus:outline-none focus:ring-2 focus:ring-[#8A33FD]/20 focus:border-[#8A33FD]/30 transition-all"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-[#8A33FD]" />
                    </div>
                ) : filteredBrands.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-[#807D7E] text-lg">
                            {searchQuery ? 'No brands match your search.' : 'No brands available yet.'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {filteredBrands.map((brand) => (
                            <Link
                                key={brand._id}
                                href={`/products?brand=${brand.slug}`}
                                className="group flex flex-col items-center p-6 bg-[#F6F6F6] rounded-2xl hover:bg-[#8A33FD]/5 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="relative w-24 h-24 mb-4 rounded-xl overflow-hidden bg-white flex items-center justify-center">
                                    {brand.image?.secure_url ? (
                                        <Image
                                            src={brand.image.secure_url}
                                            alt={brand.name}
                                            fill
                                            className="object-contain p-2"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-[#8A33FD] bg-[#8A33FD]/10">
                                            {brand.name.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-[#3C4242] font-semibold text-center group-hover:text-[#8A33FD] transition-colors">
                                    {brand.name}
                                </h3>
                                {brand.description && (
                                    <p className="text-xs text-[#807D7E] text-center mt-1 line-clamp-2">
                                        {brand.description}
                                    </p>
                                )}
                            </Link>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
