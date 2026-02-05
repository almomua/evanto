'use client';

import { AdminStats } from '@/lib/api/admin';
import { formatPrice } from '@/lib/utils';
import { getCode } from 'country-list';

interface UsersCardProps {
  totalUsers?: number;
  salesByCountry?: AdminStats['salesByCountry'];
  totalSales?: number;
}

export function UsersCard({ totalUsers = 0, salesByCountry = [], totalSales = 0 }: UsersCardProps) {
  // Helper to get country code
  const getCountryCode = (countryName: string) => {
    // Handle some common edge cases or just rely on the library
    return getCode(countryName) || '';
  };

  // Helper to get flag emoji from country code
  const getFlagEmoji = (countryCode: string) => {
    if (!countryCode) return '🌍';
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  return (
    <div className="bg-white rounded-xl h-full shadow-sm border border-gray-100 p-6 flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#3C4242]">Total Users</h3>
        <p className="text-3xl font-bold text-[#3C4242] mt-2">{totalUsers}</p>
        <p className="text-sm text-[#807D7E]">Registered customers</p>
      </div>

      {/* Bar Graph Placeholder - Kept for visual consistency */}
      <div className="flex items-end gap-1 h-9 mb-auto">
        {Array.from({ length: 45 }).map((_, i) => {
          const heights = [35, 17, 22, 9, 28, 22, 17, 31, 6, 14, 22, 9, 28, 4, 19, 25, 14, 28, 22, 6, 22, 11, 28, 35, 14, 22, 6, 25, 35, 11, 22, 14, 6, 14, 35, 8, 19, 11, 14, 35, 17, 4, 8, 22, 17];
          return (
            <div
              key={i}
              className="w-2 bg-[#8B5CF6]/20 rounded-sm"
              style={{ height: `${heights[i % heights.length]}px` }}
            />
          );
        })}
      </div>

      {/* Sales by Country */}
      <div className="border-t border-gray-100 pt-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-bold text-[#3C4242]">Sales by Country</h4>
          <span className="text-xs font-bold text-[#807D7E] uppercase tracking-wider">Revenue</span>
        </div>

        <div className="space-y-5">
          {salesByCountry.length > 0 ? (
            salesByCountry.map((item) => {
              const countryCode = getCountryCode(item.country);
              // Calculate rough progress based on total sales context if avail, else just relative to top
              const maxSales = salesByCountry[0]?.sales || 1;
              const progress = (item.sales / maxSales) * 100;

              return (
                <div key={item.country} className="flex items-center gap-4">
                  <span className="text-2xl flex-shrink-0 w-8 text-center">{getFlagEmoji(countryCode)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-sm font-bold text-[#3C4242] truncate">{item.country}</p>
                      <span className="text-sm font-bold text-[#3C4242]">{formatPrice(item.sales)}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#8B5CF6] rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-4 text-gray-400 text-sm">
              No sales data available yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
