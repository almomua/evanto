'use client';

import { SlidersHorizontal } from 'lucide-react';
import { CategoryFilter } from './category-filter';
import { PriceRangeFilter } from './price-range-filter';
import { SizeFilter } from './size-filter';

interface FilterSidebarProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  selectedSizes: string[];
  onSizeChange: (sizes: string[]) => void;
}

export function FilterSidebar({
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceChange,
  selectedSizes,
  onSizeChange,
}: FilterSidebarProps) {
  return (
    <aside className="w-[295px] flex-shrink-0">
      {/* Filter Header */}
      <div className="flex items-center justify-between px-[30px] py-5 border-b border-[#BEBCBD]">
        <h2 className="text-[#807D7E] text-[22px] tracking-wide">Filter</h2>
        <SlidersHorizontal className="w-4 h-4 text-[#807D7E] rotate-90" />
      </div>

      {/* Category Filter */}
      <div className="border-b border-[#BEBCBD]">
        <CategoryFilter
          selectedCategories={selectedCategories}
          onCategoryChange={onCategoryChange}
        />
      </div>

      {/* Price Filter */}
      <div className="border-b border-[#BEBCBD]">
        <PriceRangeFilter
          value={priceRange}
          onChange={onPriceChange}
          min={0}
          max={1000}
        />
      </div>

      {/* Size Filter */}
      <div className="border-b border-[#BEBCBD]">
        <SizeFilter
          selectedSizes={selectedSizes}
          onSizeChange={onSizeChange}
        />
      </div>
    </aside>
  );
}

