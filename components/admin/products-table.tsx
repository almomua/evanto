import React, { useEffect, useState } from 'react';
import { adminApi } from '@/lib/api/admin';
import { formatPrice } from '@/lib/utils';

export function BestSellingProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const data = await adminApi.getBestSellers();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch best sellers", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBestSellers();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-400">Loading...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-6 pb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#3C4242]">Best Selling Products</h3>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#807D7E" strokeWidth="2">
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="px-6 py-3 text-left text-xs font-bold text-[#807D7E] uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-[#807D7E] uppercase tracking-wider">Total Order</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-[#807D7E] uppercase tracking-wider">Revenue</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-[#807D7E] uppercase tracking-wider">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-400">No data available</td></tr>
            ) : (
              products.map((product, index) => (
                <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#F3F4F6] overflow-hidden flex items-center justify-center border border-gray-100">
                        {product.images?.[0]?.secure_url ? (
                          <img src={product.images[0].secure_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#807D7E" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm font-semibold text-[#3C4242] truncate max-w-[150px]">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-[#3C4242]">{product.totalSold}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-green-500">{formatPrice(product.revenue || 0)}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-[#3C4242]">{formatPrice(product.price)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function TrendingProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await adminApi.getBestSellers();
        setProducts(data.slice(0, 6)); // Just top 6 for sidebar
      } catch (error) {
        console.error("Failed to fetch trending", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-400">Loading...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-6 pb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-[#3C4242]">Trending Products</h3>
          <p className="text-sm text-[#807D7E]">Top performing items</p>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#807D7E" strokeWidth="2">
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </div>

      {/* List */}
      <div className="px-6 pb-6 space-y-4">
        {products.length === 0 ? (
          <p className="text-center text-gray-400 py-4">No trending items</p>
        ) : (
          products.map((product, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#F3F4F6] overflow-hidden flex items-center justify-center border border-gray-100 flex-shrink-0">
                {product.images?.[0]?.secure_url ? (
                  <img src={product.images[0].secure_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#807D7E" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#3C4242] truncate">{product.name}</p>
                <p className="text-xs text-[#807D7E]">{product.totalSold} Units Sold</p>
              </div>
              <span className="text-sm font-bold text-[#3C4242]">{formatPrice(product.price)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
