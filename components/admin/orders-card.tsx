'use client';

export function TodayOrdersCard() {
  return (
    <div className="bg-white rounded-xl">
      {/* Header */}
      <div className="p-6 pb-0 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#3C4242]">Today Order</h3>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#807D7E" strokeWidth="2">
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-3xl font-bold text-[#3C4242]">16.5K</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="flex items-center gap-1 text-sm font-medium text-green-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
                6%
              </span>
              <span className="text-sm text-[#807D7E]">vs last day</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-[#807D7E] mb-4">Orders Over Time</p>

        {/* Mini Chart */}
        <div className="h-32">
          <svg className="w-full h-full" viewBox="0 0 250 100" fill="none">
            <path
              d="M0 80 Q30 75, 50 70 T100 50 T150 60 T200 30 T250 40"
              stroke="#8B5CF6"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M0 80 Q30 75, 50 70 T100 50 T150 60 T200 30 T250 40 V100 H0 Z"
              fill="#8B5CF6"
              fillOpacity="0.1"
            />
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between text-xs text-[#807D7E] mt-2">
          <span>12am</span>
          <span>8am</span>
          <span>4pm</span>
          <span>11pm</span>
        </div>
      </div>
    </div>
  );
}

import { Order } from '@/lib/api/orders';

interface RecentOrdersTableProps {
  orders?: Order[];
}

// const recentOrders = ... (removed)

export function RecentOrdersTable({ orders = [] }: RecentOrdersTableProps) {
  return (
    <div className="bg-white rounded-xl">
      {/* Header */}
      <div className="p-6 pb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#3C4242]">Recent Orders</h3>
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
            <tr className="border-b border-gray-100">
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#807D7E] uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#807D7E] uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#807D7E] uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#807D7E] uppercase tracking-wider">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-[#3C4242]">#{order._id.slice(-6).toUpperCase()}</td>
                <td className="px-6 py-4 text-sm text-[#3C4242]">User {order.user?.toString().slice(-4)}</td>
                <td className="px-6 py-4">
                  <span className={`text-sm ${order.status === 'delivered' ? 'text-green-500' :
                      order.status === 'cancelled' ? 'text-red-500' :
                        'text-orange-500'
                    } capitalize`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-[#3C4242]">${order.totalAmount?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
