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
  const [localMin, setLocalMin] = useState(value[0]);
  const [localMax, setLocalMax] = useState(value[1]);

  useEffect(() => {
    setLocalMin(value[0]);
    setLocalMax(value[1]);
  }, [value]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(e.target.value) || 0;
    setLocalMin(newMin);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value) || 0;
    setLocalMax(newMax);
  };

  const handleBlur = () => {
    const validMin = Math.max(min, Math.min(localMin, localMax));
    const validMax = Math.min(max, Math.max(localMin, localMax));
    onChange([validMin, validMax]);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, isMin: boolean) => {
    const newValue = parseInt(e.target.value);
    if (isMin) {
      const validMin = Math.min(newValue, localMax - 10);
      setLocalMin(validMin);
      onChange([validMin, localMax]);
    } else {
      const validMax = Math.max(newValue, localMin + 10);
      setLocalMax(validMax);
      onChange([localMin, validMax]);
    }
  };

  // Calculate slider positions for visual
  const minPercent = ((localMin - min) / (max - min)) * 100;
  const maxPercent = ((localMax - min) / (max - min)) * 100;

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
            <div className="absolute top-1/2 -translate-y-1/2 w-full h-[3px] bg-[#807D7E]/60 rounded" />
            
            {/* Active Track */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-[3px] bg-[#8A33FD] rounded"
              style={{
                left: `${minPercent}%`,
                right: `${100 - maxPercent}%`,
              }}
            />

            {/* Min Slider */}
            <input
              type="range"
              min={min}
              max={max}
              value={localMin}
              onChange={(e) => handleSliderChange(e, true)}
              className="absolute w-full h-full opacity-0 cursor-pointer z-10"
            />

            {/* Max Slider */}
            <input
              type="range"
              min={min}
              max={max}
              value={localMax}
              onChange={(e) => handleSliderChange(e, false)}
              className="absolute w-full h-full opacity-0 cursor-pointer z-10"
            />

            {/* Min Handle */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#8A33FD] rounded-full border-2 border-white shadow-md pointer-events-none"
              style={{ left: `calc(${minPercent}% - 8px)` }}
            />

            {/* Max Handle */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#8A33FD] rounded-full border-2 border-white shadow-md pointer-events-none"
              style={{ left: `calc(${maxPercent}% - 8px)` }}
            />
          </div>

          {/* Input Fields */}
          <div className="flex gap-[30px]">
            <div className="flex-1">
              <div className="border border-[#BEBCBD]/80 rounded-lg px-4 py-2">
                <span className="text-[#3C4242] text-base">${localMin}</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="border border-[#BEBCBD]/80 rounded-lg px-4 py-2">
                <span className="text-[#3C4242] text-base">${localMax}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

