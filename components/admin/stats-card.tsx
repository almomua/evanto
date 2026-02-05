'use client';

import React from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { formatPrice } from '@/lib/utils';

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
    <div className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${className}`}>
      <h3 className="text-lg font-bold text-[#3C4242] mb-1">{title}</h3>
      {subtitle && (
        <p className="text-sm text-[#807D7E] mb-4 font-medium">{subtitle}</p>
      )}

      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-3xl font-bold text-[#3C4242]">{value}</p>
          {change && (
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`flex items-center gap-1 text-sm font-bold ${change.isPositive ? 'text-green-500' : 'text-red-500'
                  }`}
              >
                {change.isPositive ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
                {change.value}
              </span>
              <span className="text-sm text-[#807D7E] font-medium">{change.label}</span>
            </div>
          )}
        </div>
        {chart && <div className="flex-1 h-16">{chart}</div>}
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
  data?: { date: string, sales: number }[];
}

export function TotalSalesCard({ salesValue, costValue, change, data = [] }: TotalSalesCardProps) {
  // Generate estimated cost data (rough 70% of sales for visualization)
  const chartData = data.map(item => ({
    ...item,
    cost: item.sales * 0.7,
    dayName: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' })
  }));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-[#3C4242]">Total Sales & Costs</h3>
          <p className="text-sm text-[#807D7E] font-medium">Last 7 days</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8A33FD]"></span>
            <span className="text-xs font-bold text-[#807D7E] uppercase tracking-wider">Sales</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB]"></span>
            <span className="text-xs font-bold text-[#807D7E] uppercase tracking-wider">Estimated Cost</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-[#3C4242]">{salesValue}</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span
            className={`flex items-center gap-1 text-sm font-bold ${change.isPositive ? 'text-green-500' : 'text-red-500'
              }`}
          >
            {change.isPositive ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            )}
            {change.value}
          </span>
          <span className="text-sm text-[#807D7E] font-medium">{change.label}</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-32 -mx-2 flex-grow">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorSalesMain" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8A33FD" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#8A33FD" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-2 border border-gray-100 shadow-lg rounded-md text-xs">
                        <p className="font-bold text-[#3C4242] mb-1">{payload[0].payload.dayName}</p>
                        <p className="text-[#8A33FD] font-bold">Sales: {formatPrice(payload[0].value as number)}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#8A33FD"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorSalesMain)"
              />
              <Area
                type="monotone"
                dataKey="cost"
                stroke="#E5E7EB"
                strokeWidth={2}
                fillOpacity={0}
                strokeDasharray="4 4"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-300 text-sm italic">
            Connecting to sales data...
          </div>
        )}
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between mt-4 text-[10px] font-bold text-[#807D7E] uppercase tracking-widest">
        {chartData.length > 0 ? (
          chartData.map((d, i) => <span key={i}>{d.dayName}</span>)
        ) : (
          ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <span key={d}>{d}</span>)
        )}
      </div>
    </div>
  );
}

export function SmallStatsCard({
  title,
  value,
  subtitle,
  change,
  chartColor = '#8A33FD',
  chartData = [],
}: StatsCardProps & { chartColor?: string, chartData?: number[] }) {
  // Use provided data or realistic sparkline base
  const displayData = chartData.length > 0
    ? chartData.map((val, i) => ({ value: val, id: i }))
    : [30, 45, 35, 50, 40, 60, 55].map((val, i) => ({ value: val, id: i }));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-sm font-bold text-[#807D7E] uppercase tracking-wider mb-1">{title}</h3>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-2xl font-bold text-[#3C4242] mt-1">{value}</p>
          {change && (
            <div className="flex items-center gap-1.5 mt-2">
              <span
                className={`text-xs font-bold px-1.5 py-0.5 rounded ${change.isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                  }`}
              >
                {change.isPositive ? '+' : ''}{change.value}
              </span>
              <span className="text-[10px] text-[#807D7E] font-bold uppercase tracking-tight">{change.label}</span>
            </div>
          )}
        </div>

        {/* Sparkline Chart */}
        <div className="w-20 h-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={displayData}>
              <Area
                type="monotone"
                dataKey="value"
                stroke={chartColor}
                strokeWidth={2}
                fill={chartColor}
                fillOpacity={0.05}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
