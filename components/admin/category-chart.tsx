'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/lib/api/admin';
import { Loader2 } from 'lucide-react';

interface CategoryStat {
  _id: string;
  name: string;
  count: number;
}

const COLORS = ['#22C55E', '#8B5CF6', '#3B82F6', '#F59E0B', '#EF4444'];
const POSITIONS = [
  { left: '10%', top: '15%', size: 'w-52 h-52', bg: 'bg-[#22C55E]/20' },
  { right: '10%', top: '35%', size: 'w-40 h-40', bg: 'bg-[#8B5CF6]/20' },
  { left: '20%', bottom: '5%', size: 'w-32 h-32', bg: 'bg-[#3B82F6]/20' },
];

export function CategoryChart() {
  const [categories, setCategories] = useState<CategoryStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchCategoryStats = async () => {
      try {
        const data = await adminApi.getCategoryDistribution();
        // Sort by count descending and take top 3 for the visual bubbles
        const sortedData = [...data].sort((a, b) => b.count - a.count);
        setCategories(sortedData.slice(0, 3));

        const total = data.reduce((acc, curr) => acc + curr.count, 0);
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
      <div className="bg-white rounded-xl h-[440px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#8B5CF6]" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl h-[440px]">
      {/* Header */}
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#3C4242]">Stock Distribution</h3>
            <p className="text-sm text-[#807D7E]">Total {totalProducts} Products</p>
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

      {/* Circular Chart */}
      <div className="p-6 relative h-80">
        {categories.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            No product data available
          </div>
        ) : (
          categories.map((cat, index) => {
            const pos = POSITIONS[index] || POSITIONS[0];
            return (
              <div
                key={cat._id}
                className={`absolute ${pos.size} rounded-full ${pos.bg} flex items-center justify-center transition-all hover:scale-105 cursor-default`}
                style={{
                  left: pos.left,
                  top: pos.top,
                  right: pos.right,
                  bottom: pos.bottom,
                }}
              >
                <div className="text-center p-4">
                  <p className="text-xs font-medium text-[#3C4242] uppercase tracking-wider truncate max-w-[120px]">
                    {cat.name}
                  </p>
                  <p className="text-2xl font-bold text-[#3C4242]">{cat.count}</p>
                  <p className="text-[10px] text-[#807D7E]">Products</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
