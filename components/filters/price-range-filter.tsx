'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

interface PriceRangeFilterProps {
  value: [number, number];
  onChange: (range: [number, number]) => void;
  min: number;
  max: number;
}

export function PriceRangeFilter({ value, onChange, min, max }: PriceRangeFilterProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [localMin, setLocalMin] = useState(value[0].toString());
  const [localMax, setLocalMax] = useState(value[1].toString());

  useEffect(() => {
    setLocalMin(value[0].toString());
    setLocalMax(value[1].toString());
  }, [value]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    setLocalMin(rawValue);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    setLocalMax(rawValue);
  };

  const handleMinBlur = () => {
    let newMin = parseInt(localMin) || 0;
    newMin = Math.max(min, Math.min(newMin, parseInt(localMax) || max));
    setLocalMin(newMin.toString());
    onChange([newMin, parseInt(localMax) || max]);
  };

  const handleMaxBlur = () => {
    let newMax = parseInt(localMax) || max;
    newMax = Math.min(max, Math.max(newMax, parseInt(localMin) || 0));
    setLocalMax(newMax.toString());
    onChange([parseInt(localMin) || 0, newMax]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
  };

  const formatNumber = (num: string) => {
    const n = parseInt(num) || 0;
    return n.toLocaleString();
  };

  // Single slider for visual representation (controls max value)
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value);
    setLocalMax(newMax.toString());
    onChange([parseInt(localMin) || 0, newMax]);
  };

  const sliderPercent = ((parseInt(localMax) || max) / max) * 100;

  return (
    <div className="px-[30px] py-5">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-[#807D7E] text-[22px] tracking-wide mb-6"
      >
        <span>Price</span>
        <ChevronUp
          className={`w-4 h-4 transition-transform ${!isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {isExpanded && (
        <>
          {/* Slider Track */}
          <div className="relative h-[20px] mb-6">
            {/* Background Track */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full h-[3px] bg-[#807D7E]/30 rounded" />

            {/* Active Track */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-[3px] bg-[#8A33FD] rounded"
              style={{
                left: '0%',
                width: `${sliderPercent}%`,
              }}
            />

            {/* Slider Input */}
            <input
              type="range"
              min={min}
              max={max}
              value={parseInt(localMax) || max}
              onChange={handleSliderChange}
              className="absolute w-full h-full opacity-0 cursor-pointer z-10"
            />

            {/* Handle */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#8A33FD] rounded-full border-2 border-white shadow-md pointer-events-none"
              style={{ left: `calc(${sliderPercent}% - 8px)` }}
            />
          </div>

          {/* Input Fields */}
          <div className="flex gap-[20px]">
            <div className="flex-1">
              <input
                type="text"
                value={formatNumber(localMin)}
                onChange={handleMinChange}
                onBlur={handleMinBlur}
                onKeyDown={handleKeyDown}
                placeholder="Min"
                className="w-full border border-[#BEBCBD]/80 rounded-lg px-4 py-2 text-[#3C4242] text-base text-center focus:outline-none focus:ring-2 focus:ring-[#8A33FD]/20"
              />
              <span className="block text-xs text-gray-400 text-center mt-1">IQD</span>
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={formatNumber(localMax)}
                onChange={handleMaxChange}
                onBlur={handleMaxBlur}
                onKeyDown={handleKeyDown}
                placeholder="Max"
                className="w-full border border-[#BEBCBD]/80 rounded-lg px-4 py-2 text-[#3C4242] text-base text-center focus:outline-none focus:ring-2 focus:ring-[#8A33FD]/20"
              />
              <span className="block text-xs text-gray-400 text-center mt-1">IQD</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
