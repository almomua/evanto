'use client';

import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { CategoryFilter } from './category-filter';
import { BrandFilter } from './brand-filter';
import { PriceRangeFilter } from './price-range-filter';
import { SizeFilter } from './size-filter';
import { Brand } from '@/lib/api/products';

interface FilterSidebarProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  selectedBrands: string[];
  onBrandChange: (brands: string[]) => void;
  availableBrands: Brand[];
  brandsLoading?: boolean;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  selectedSizes: string[];
  onSizeChange: (sizes: string[]) => void;
  availableSizes?: string[];
  maxPrice?: number;
}

export function FilterSidebar({
  selectedCategories,
  onCategoryChange,
  selectedBrands,
  onBrandChange,
  availableBrands,
  brandsLoading,
  priceRange,
  onPriceChange,
  selectedSizes,
  onSizeChange,
  availableSizes,
  maxPrice = 200000,
}: FilterSidebarProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filterContent = (
    <>
      {/* Category Filter */}
      <div className="border-b border-[#BEBCBD]">
        <CategoryFilter
          selectedCategories={selectedCategories}
          onCategoryChange={onCategoryChange}
        />
      </div>

      {/* Brand Filter */}
      <div className="border-b border-[#BEBCBD]">
        <BrandFilter
          selectedBrands={selectedBrands}
          onBrandChange={onBrandChange}
          brands={availableBrands}
          loading={brandsLoading}
        />
      </div>

      {/* Price Filter */}
      <div className="border-b border-[#BEBCBD]">
        <PriceRangeFilter
          value={priceRange}
          onChange={onPriceChange}
          min={0}
          max={maxPrice}
        />
      </div>

      {/* Size Filter */}
      <div className="border-b border-[#BEBCBD]">
        <SizeFilter
          selectedSizes={selectedSizes}
          onSizeChange={onSizeChange}
          sizes={availableSizes}
        />
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setMobileFiltersOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 z-40 flex items-center gap-2 bg-[#8A33FD] text-white px-4 py-3 rounded-full shadow-lg"
      >
        <SlidersHorizontal className="w-5 h-5" />
        <span className="text-sm font-medium">Filters</span>
      </button>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileFiltersOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute left-0 top-0 bottom-0 w-[85%] max-w-[320px] bg-white overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-[#BEBCBD] sticky top-0 bg-white z-10">
              <h2 className="text-[#3C4242] text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-[#807D7E]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Content */}
            {filterContent}

            {/* Apply Button */}
            <div className="p-4 sticky bottom-0 bg-white border-t border-[#BEBCBD]">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full bg-[#8A33FD] text-white py-3 rounded-lg font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-[295px] flex-shrink-0">
        {/* Filter Header */}
        <div className="flex items-center justify-between px-[30px] py-5 border-b border-[#BEBCBD]">
          <h2 className="text-[#807D7E] text-[22px] tracking-wide">Filter</h2>
          <SlidersHorizontal className="w-4 h-4 text-[#807D7E] rotate-90" />
        </div>

        {filterContent}
      </aside>
    </>
  );
}
