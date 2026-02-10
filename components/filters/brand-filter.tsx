'use client';

import { useState, useEffect, useMemo } from 'react';
import { ChevronRight, Loader2, Search, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { Brand } from '@/lib/api/products';
import { useTranslations } from 'next-intl';

interface BrandFilterProps {
    selectedBrands: string[];
    onBrandChange: (brands: string[]) => void;
    brands: Brand[];
    loading?: boolean;
}

export function BrandFilter({ selectedBrands, onBrandChange, brands, loading = false }: BrandFilterProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const t = useTranslations('products');

    const filteredBrands = useMemo(() => {
        return brands.filter(brand =>
            brand.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [brands, searchQuery]);

    const toggleBrand = (brandSlug: string) => {
        const isSelected = selectedBrands.includes(brandSlug);
        if (isSelected) {
            onBrandChange(selectedBrands.filter((b) => b !== brandSlug));
        } else {
            onBrandChange([...selectedBrands, brandSlug]);
        }
    };

    if (loading) {
        return (
            <div className="px-[30px] py-5 flex justify-center">
                <Loader2 className="w-5 h-5 animate-spin text-[#8A33FD]" />
            </div>
        );
    }

    return (
        <div className="px-[30px] py-5">
            <h3 className="text-[#3C4242] text-xl font-bold mb-4">{t('brands')}</h3>

            {/* Search Field */}
            <div className="relative mb-5">
                <input
                    type="text"
                    placeholder={t('searchBrands')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-[#F6F6F6] rounded-lg text-sm text-[#3C4242] focus:outline-none focus:ring-1 focus:ring-[#8A33FD] transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#807D7E]" />
            </div>

            {/* Scrollable Brand List */}
            <div className="max-h-[250px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#BEBCBD] scrollbar-track-transparent">
                <ul className="space-y-[15px]">
                    {filteredBrands.map((brand) => (
                        <li key={brand._id}>
                            <button
                                onClick={() => toggleBrand(brand.slug)}
                                className={clsx(
                                    'w-full flex items-center justify-between text-left text-base transition-colors group',
                                    selectedBrands.includes(brand.slug)
                                        ? 'text-[#8A33FD] font-semibold'
                                        : 'text-[#8A8989] hover:text-[#3C4242]'
                                )}
                            >
                                <span className="truncate">{brand.name}</span>
                                {selectedBrands.includes(brand.slug) ? (
                                    <Check className="w-4 h-4" />
                                ) : (
                                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                )}
                            </button>
                        </li>
                    ))}
                    {filteredBrands.length === 0 && (
                        <li className="text-sm text-gray-400 py-2">{t('noBrandsMatch')}</li>
                    )}
                </ul>
            </div>
        </div>
    );
}
