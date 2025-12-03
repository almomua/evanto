'use client';

import { clsx } from 'clsx';

type SortOption = 'new' | 'recommended';

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
      <div className="flex items-center gap-4">
        <button
          onClick={() => onSortChange('new')}
          className={clsx(
            'text-[22px] tracking-wide transition-colors',
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
            'text-[22px] tracking-wide transition-colors',
            activeSort === 'recommended'
              ? 'text-[#8A33FD] font-medium'
              : 'text-[#3F4646] hover:text-[#8A33FD]'
          )}
        >
          Recommended
        </button>
      </div>
    </div>
  );
}

