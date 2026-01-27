'use client';

import { clsx } from 'clsx';

export type SortOption = 'new' | 'recommended' | 'price-low-high' | 'price-high-low';

interface SortTabsProps {
  category: string;
  activeSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function SortTabs({ category, activeSort, onSortChange }: SortTabsProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {/* Category Title */}
      <h1 className="text-[#807D7E] text-[22px] tracking-wide capitalize">
        {category}
      </h1>

      {/* Sort Options */}
      <div className="flex items-center gap-4 hidden sm:flex">
        <button
          onClick={() => onSortChange('new')}
          className={clsx(
            'text-[16px] xl:text-[22px] tracking-wide transition-colors',
            activeSort === 'new'
              ? 'text-[#8A33FD] font-medium'
              : 'text-[#3F4646] hover:text-[#8A33FD]'
          )}
        >
          New
        </button>
        <button
          onClick={() => onSortChange('recommended')}
          className={clsx(
            'text-[16px] xl:text-[22px] tracking-wide transition-colors',
            activeSort === 'recommended'
              ? 'text-[#8A33FD] font-medium'
              : 'text-[#3F4646] hover:text-[#8A33FD]'
          )}
        >
          Recommended
        </button>
        <button
          onClick={() => onSortChange('price-low-high')}
          className={clsx(
            'text-[16px] xl:text-[22px] tracking-wide transition-colors',
            activeSort === 'price-low-high'
              ? 'text-[#8A33FD] font-medium'
              : 'text-[#3F4646] hover:text-[#8A33FD]'
          )}
        >
          Price: Low to High
        </button>
        <button
          onClick={() => onSortChange('price-high-low')}
          className={clsx(
            'text-[16px] xl:text-[22px] tracking-wide transition-colors',
            activeSort === 'price-high-low'
              ? 'text-[#8A33FD] font-medium'
              : 'text-[#3F4646] hover:text-[#8A33FD]'
          )}
        >
          Price: High to Low
        </button>
      </div>
      {/* Mobile Select for Sort */}
      <div className="sm:hidden">
        <select
          value={activeSort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="new">New</option>
          <option value="recommended">Recommended</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}



