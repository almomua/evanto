'use client';

import { AdminStats } from '@/lib/api/admin';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { formatPrice } from '@/lib/utils';
import { Order } from '@/lib/api/orders';

interface TodayOrdersCardProps {
  count?: number;
  data?: { time: string; orders: number }[];
}

export function TodayOrdersCard({ count = 0, data = [] }: TodayOrdersCardProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-100 shadow rounded text-xs">
          <p className="font-semibold text-[#8A33FD]">{label}</p>
          <p className="text-gray-600">{payload[0].value} orders</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl h-full shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-6 pb-0 flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#3C4242]">Today Order</h3>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#807D7E" strokeWidth="2">
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="mb-4">
          <p className="text-3xl font-bold text-[#3C4242]">{count}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-[#807D7E]">Orders today</span>
          </div>
        </div>

        <p className="text-sm font-medium text-[#807D7E] mb-4">Orders Over Time</p>

        {/* Chart */}
        <div className="h-32 -mx-2">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8A33FD" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#8A33FD" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="time"
                  hide={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#807D7E' }}
                  interval="preserveStartEnd"
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="#8A33FD"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorOrders)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-300 text-xs">
              No orders yet today
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface RecentOrdersTableProps {
  orders?: Order[];
}

export function RecentOrdersTable({ orders = [] }: RecentOrdersTableProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm h-full">
      {/* Header */}
      <div className="p-6 pb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#3C4242]">Recent Orders</h3>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#807D7E" strokeWidth="2">
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto px-6 pb-2">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="py-3 text-left text-xs font-bold text-[#807D7E] uppercase tracking-wider">ID</th>
              <th className="py-3 text-left text-xs font-bold text-[#807D7E] uppercase tracking-wider">Customer</th>
              <th className="py-3 text-left text-xs font-bold text-[#807D7E] uppercase tracking-wider">Status</th>
              <th className="py-3 text-left text-xs font-bold text-[#807D7E] uppercase tracking-wider">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-50/50 hover:bg-gray-50 transition-colors last:border-0">
                  <td className="py-4 text-sm font-bold text-[#3C4242]">#{order._id.slice(-6).toUpperCase()}</td>
                  <td className="py-4 text-sm font-semibold text-[#3C4242]">{order.customer?.name || 'Guest'}</td>
                  <td className="py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${order.status === 'delivered' ? 'bg-green-50 text-green-600' :
                        order.status === 'cancelled' ? 'bg-red-50 text-red-600' :
                          'bg-orange-50 text-orange-600'
                      } capitalize`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 text-sm font-bold text-[#3C4242]">{formatPrice(order.totalAmount)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-8 text-center text-sm text-gray-400">
                  No recent orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
