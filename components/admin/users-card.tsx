'use client';

const countries = [
  { name: 'United States', code: 'us', sales: '30k', change: '+25.8%', isPositive: true, progress: 80 },
  { name: 'Brazil', code: 'br', sales: '26k', change: '-16.2%', isPositive: false, progress: 70 },
  { name: 'India', code: 'in', sales: '22k', change: '+12.3%', isPositive: true, progress: 60 },
  { name: 'Australia', code: 'au', sales: '17k', change: '-11.0%', isPositive: false, progress: 45 },
];

const flagEmojis: Record<string, string> = {
  us: '🇺🇸',
  br: '🇧🇷',
  in: '🇮🇳',
  au: '🇦🇺',
};

interface UsersCardProps {
  totalUsers?: number;
}

export function UsersCard({ totalUsers = 0 }: UsersCardProps) {
  return (
    <div className="bg-white rounded-xl p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#3C4242]">Total Users</h3>
        <p className="text-3xl font-bold text-[#3C4242] mt-2">{totalUsers}</p>
        <p className="text-sm text-[#807D7E]">Users per minute</p>
      </div>

      {/* Bar Graph */}
      <div className="flex items-end gap-1 h-9 mb-6">
        {Array.from({ length: 45 }).map((_, i) => {
          const heights = [35, 17, 22, 9, 28, 22, 17, 31, 6, 14, 22, 9, 28, 4, 19, 25, 14, 28, 22, 6, 22, 11, 28, 35, 14, 22, 6, 25, 35, 11, 22, 14, 6, 14, 35, 8, 19, 11, 14, 35, 17, 4, 8, 22, 17];
          return (
            <div
              key={i}
              className="w-2 bg-[#8B5CF6] rounded-sm"
              style={{ height: `${heights[i % heights.length]}px` }}
            />
          );
        })}
      </div>

      {/* Sales by Country */}
      <div className="border-t border-gray-100 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-[#3C4242]">Sales by Country</h4>
          <span className="text-sm font-medium text-[#3C4242]">Sales</span>
        </div>

        <div className="space-y-4">
          {countries.map((country) => (
            <div key={country.code} className="flex items-center gap-4">
              <span className="text-2xl">{flagEmojis[country.code]}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-[#3C4242]">{country.sales}</span>
                </div>
                <p className="text-sm text-[#807D7E] truncate">{country.name}</p>
                <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1">
                  <div
                    className="h-full bg-[#8B5CF6] rounded-full"
                    style={{ width: `${country.progress}%` }}
                  />
                </div>
              </div>
              <span
                className={`flex items-center gap-1 text-sm font-medium ${country.isPositive ? 'text-green-500' : 'text-red-500'
                  }`}
              >
                {country.isPositive ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
                {country.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
