'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/lib/api/admin';
import { Loader2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CategoryStat {
  _id: string;
  name: string;
  count: number;
}

const COLORS = [
  '#8B5CF6', // Purple
  '#22C55E', // Green
  '#3B82F6', // Blue
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#EC4899', // Pink
  '#14B8A6', // Teal
  '#6366F1', // Indigo
];

export function CategoryChart() {
  const [categories, setCategories] = useState<CategoryStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchCategoryStats = async () => {
      try {
        const data = await adminApi.getCategoryDistribution();
        if (!data) {
          setCategories([]);
          setTotalProducts(0);
          return;
        }
        // Sort by count descending
        const sortedData = [...data].sort((a, b) => b.count - a.count);
        setCategories(sortedData);

        const total = data.reduce((acc: number, curr: any) => acc + curr.count, 0);
        setTotalProducts(total);
      } catch (error) {
        console.error('Failed to fetch category stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl h-[440px] flex items-center justify-center border border-gray-100 shadow-sm">
        <Loader2 className="w-8 h-8 animate-spin text-[#8B5CF6]" />
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      const percent = ((value / totalProducts) * 100).toFixed(1);
      return (
        <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-lg">
          <p className="text-sm font-bold text-[#3C4242] mb-1">{name}</p>
          <p className="text-xs text-gray-500">
            <span className="font-bold text-[#8B5CF6]">{value}</span> Products ({percent}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl h-[440px] flex flex-col border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#3C4242]">Stock Distribution</h3>
            <p className="text-sm text-[#807D7E] font-medium">Total {totalProducts} Products</p>
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

      {/* Chart */}
      <div className="flex-1 min-h-0 relative">
        {categories.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400 font-medium">
            No product data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categories}
                cx="50%"
                cy="45%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
                dataKey="count"
                nameKey="name"
              >
                {categories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={120}
                content={({ payload }) => (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 px-6 pt-2 max-h-[120px] overflow-y-auto no-scrollbar">
                    {payload?.map((entry: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                          <span className="text-xs font-bold text-[#3C4242] truncate max-w-[80px]">{entry.value}</span>
                        </div>
                        <span className="text-xs text-[#807D7E] font-bold">{categories[index]?.count}</span>
                      </div>
                    ))}
                  </div>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
