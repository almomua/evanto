'use client';

import Link from 'next/link';
import { ordersApi, Order } from '@/lib/api/orders';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';


export function TransactionsTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await ordersApi.getOrders();
        setOrders(data.slice(0, 6)); // Limit to 6 recent
      } catch (error) {
        console.error('Failed to fetch transactions', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="flex justify-center p-6"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="bg-white rounded-xl">
      {/* Header */}
      <div className="p-6 pb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#3C4242]">Last Transactions</h3>
        <Link href="/admin/orders" className="text-sm text-[#8B5CF6] hover:underline">
          View All
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#807D7E] uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#807D7E] uppercase tracking-wider">Issued Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#807D7E] uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#807D7E] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-4 text-center text-gray-500">No transactions yet</td></tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-[#3C4242]">#{order._id.slice(-6).toUpperCase()}</td>
                  <td className="px-6 py-4 text-sm text-[#3C4242]">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-[#3C4242]">${order.totalAmount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/orders/${order._id}`} className="text-sm text-[#8B5CF6] hover:underline">
                      View Detail
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
