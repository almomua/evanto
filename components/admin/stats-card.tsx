'use client';

interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: {
    value: string;
    isPositive: boolean;
    label: string;
  };
  chart?: React.ReactNode;
  className?: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  change,
  chart,
  className = '',
}: StatsCardProps) {
  return (
    <div className={`bg-white rounded-xl p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-[#3C4242] mb-1">{title}</h3>
      {subtitle && (
        <p className="text-sm text-[#807D7E] mb-4">{subtitle}</p>
      )}
      
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-[#3C4242]">{value}</p>
          {change && (
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`flex items-center gap-1 text-sm font-medium ${
                  change.isPositive ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {change.isPositive ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
                {change.value}
              </span>
              <span className="text-sm text-[#807D7E]">{change.label}</span>
            </div>
          )}
        </div>
        {chart && <div className="flex-shrink-0">{chart}</div>}
      </div>
    </div>
  );
}

interface TotalSalesCardProps {
  salesValue: string;
  costValue: string;
  change: {
    value: string;
    isPositive: boolean;
    label: string;
  };
}

export function TotalSalesCard({ salesValue, costValue, change }: TotalSalesCardProps) {
  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-[#3C4242]">Total Sales & Costs</h3>
          <p className="text-sm text-[#807D7E]">Last 7 days</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
            <span className="text-sm text-[#807D7E]">Sales</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EF4444]"></span>
            <span className="text-sm text-[#807D7E]">Cost</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-[#3C4242]">{salesValue}</span>
            <span className="text-xl font-medium text-[#22C55E]">{costValue}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`flex items-center gap-1 text-sm font-medium ${
                change.isPositive ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {change.isPositive ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              )}
              {change.value}
            </span>
            <span className="text-sm text-[#807D7E]">{change.label}</span>
          </div>
        </div>
      </div>
      
      {/* Mini Chart */}
      <div className="h-24 flex items-end justify-between gap-1">
        <SalesChart />
      </div>
      
      {/* X-axis labels */}
      <div className="flex justify-between mt-2 text-xs text-[#807D7E]">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
    </div>
  );
}

function SalesChart() {
  return (
    <svg className="w-full h-20" viewBox="0 0 360 80" fill="none">
      {/* Sales line (green) */}
      <path
        d="M0 60 Q60 40, 90 35 T180 25 T270 30 T360 20"
        stroke="#22C55E"
        strokeWidth="2"
        fill="none"
      />
      {/* Cost line (red) */}
      <path
        d="M0 70 Q60 55, 90 50 T180 45 T270 50 T360 40"
        stroke="#EF4444"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

export function SmallStatsCard({
  title,
  value,
  subtitle,
  change,
  chartColor = '#22C55E',
}: StatsCardProps & { chartColor?: string }) {
  return (
    <div className="bg-white rounded-xl p-6">
      <h3 className="text-lg font-semibold text-[#3C4242] mb-1">{title}</h3>
      {subtitle && (
        <p className="text-sm text-[#807D7E] mb-4">{subtitle}</p>
      )}
      
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-[#3C4242]">{value}</p>
          {change && (
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`flex items-center gap-1 text-sm font-medium ${
                  change.isPositive ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {change.isPositive ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
                {change.value}
              </span>
              <span className="text-sm text-[#807D7E]">{change.label}</span>
            </div>
          )}
        </div>
        
        {/* Mini wave chart */}
        <svg className="w-32 h-16" viewBox="0 0 120 60" fill="none">
          <path
            d="M0 50 Q20 30, 40 35 T80 25 T120 15"
            stroke={chartColor}
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0 50 Q20 30, 40 35 T80 25 T120 15 V60 H0 Z"
            fill={chartColor}
            fillOpacity="0.1"
          />
        </svg>
      </div>
    </div>
  );
}
