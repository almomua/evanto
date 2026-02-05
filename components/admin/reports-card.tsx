'use client';

import { useState } from 'react';
import { AdminStats } from '@/lib/api/admin';
import { formatPrice } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ReportsCardProps {
  stats: AdminStats | null;
}

export function ReportsCard({ stats }: ReportsCardProps) {
  const [activeTab, setActiveTab] = useState('revenue');

  const reportTabs = [
    { key: 'customers', label: 'Customers', value: stats?.totalUsers.toString() || '0' },
    { key: 'products', label: 'Total Products', value: stats?.totalProducts.toString() || '0' },
    { key: 'stock', label: 'Stock Products', value: stats?.inStockProducts.toString() || '0' },
    { key: 'outOfStock', label: 'Out of Stock', value: stats?.outOfStockProducts.toString() || '0' },
    { key: 'revenue', label: 'Revenue', value: formatPrice(stats?.totalSales || 0) },
  ];

  // Helper to format date string (YYYY-MM-DD) to Day Name (Mon, Tue)
  const formatXAxis = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const currentChartData = () => {
    if (!stats) return [];
    switch (activeTab) {
      case 'customers':
        return stats.userChartData || [];
      case 'products':
      case 'stock':
      case 'outOfStock':
        return stats.productChartData || [];
      case 'revenue':
      default:
        return stats.salesChartData || [];
    }
  };

  const currentDataKey = () => {
    return activeTab === 'revenue' ? 'sales' : 'count';
  };

  const chartColor = () => {
    switch (activeTab) {
      case 'customers': return '#22C55E'; // green
      case 'products':
      case 'stock': return '#3B82F6'; // blue
      case 'outOfStock': return '#EF4444'; // red
      case 'revenue':
      default: return '#8A33FD'; // purple
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const formattedValue = activeTab === 'revenue' ? formatPrice(value) : value;
      return (
        <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-lg">
          <p className="text-xs text-gray-500 mb-1">{label}</p>
          <p className="text-sm font-bold" style={{ color: chartColor() }}>{formattedValue}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl h-full shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-lg font-bold text-[#3C4242]">Reports</h3>
            <p className="text-sm text-[#807D7E]">Live overview</p>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#807D7E" strokeWidth="2">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 py-4">
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {reportTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-shrink-0 px-4 py-3 rounded-xl border transition-all ${activeTab === tab.key
                ? 'border-[#8B5CF6] bg-[#8B5CF6]/5 ring-1 ring-[#8B5CF6]'
                : 'border-gray-100 hover:border-gray-200 bg-gray-50/30 font-medium'
                }`}
            >
              <p className={`text-base font-bold mb-0.5 ${activeTab === tab.key ? 'text-[#8B5CF6]' : 'text-[#3C4242]'
                }`}>
                {tab.value}
              </p>
              <p className="text-[10px] uppercase tracking-wider font-bold text-[#807D7E] whitespace-nowrap">{tab.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="px-4 pb-4 h-[250px]">
        {currentChartData().length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={currentChartData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor()} stopOpacity={0.1} />
                  <stop offset="95%" stopColor={chartColor()} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis
                dataKey="date"
                tickFormatter={formatXAxis}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#807D7E', fontSize: 10, fontWeight: 600 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#807D7E', fontSize: 10 }}
                tickFormatter={(value) => activeTab === 'revenue' ? `${value / 1000}k` : value}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={currentDataKey()}
                stroke={chartColor()}
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorMetric)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            No data available for {activeTab} chart
          </div>
        )}
      </div>
    </div>
  );
}
