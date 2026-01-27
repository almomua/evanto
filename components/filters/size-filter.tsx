'use client';

import { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { clsx } from 'clsx';

interface SizeFilterProps {
  selectedSizes: string[];
  onSizeChange: (sizes: string[]) => void;
  sizes?: string[];
}

export function SizeFilter({ selectedSizes, onSizeChange, sizes = [] }: SizeFilterProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      onSizeChange(selectedSizes.filter((s) => s !== size));
    } else {
      onSizeChange([...selectedSizes, size]);
    }
  };

  // Default sizes if none provided
  const displaySizes = sizes.length > 0 ? sizes : ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="px-[30px] py-5">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-[#807D7E] text-[22px] tracking-wide mb-6"
      >
        <span>Size</span>
        <ChevronUp
          className={`w-4 h-4 transition-transform ${!isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {isExpanded && (
        <div className="flex flex-wrap gap-4">
          {displaySizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={clsx(
                'min-w-[50px] px-3 h-8 rounded-lg border text-sm transition-all',
                selectedSizes.includes(size)
                  ? 'border-[#8A33FD] bg-[#8A33FD]/10 text-[#8A33FD]'
                  : 'border-[#BEBCBD]/80 text-[#3C4242] hover:border-[#8A33FD]'
              )}
            >
              {size}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}



