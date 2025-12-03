'use client';

import { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { clsx } from 'clsx';

const sizes = [
  ['XXS', 'XL', 'XS'],
  ['S', 'M', 'L'],
  ['XXL', '3XL', '4XL'],
];

interface SizeFilterProps {
  selectedSizes: string[];
  onSizeChange: (sizes: string[]) => void;
}

export function SizeFilter({ selectedSizes, onSizeChange }: SizeFilterProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      onSizeChange(selectedSizes.filter((s) => s !== size));
    } else {
      onSizeChange([...selectedSizes, size]);
    }
  };

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
        <div className="space-y-[18px]">
          {sizes.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-5">
              {row.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={clsx(
                    'w-[61px] h-8 rounded-lg border text-sm transition-all',
                    selectedSizes.includes(size)
                      ? 'border-[#8A33FD] bg-[#8A33FD]/10 text-[#8A33FD]'
                      : 'border-[#BEBCBD]/80 text-[#3C4242] hover:border-[#8A33FD]'
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

