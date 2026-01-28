'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Package } from 'lucide-react';
import { clsx } from 'clsx';

import { ordersApi, Order } from '@/lib/api/orders';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';


const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusLabels = {
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await ordersApi.getOrders();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>;


  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg sm:rounded-xl border border-[#BEBCBD]/30 p-4 sm:p-8">
        <h2 className="text-[#3C4242] text-xl sm:text-2xl font-bold mb-6 sm:mb-8">My Orders</h2>
        <div className="flex flex-col items-center justify-center py-8 sm:py-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F6F6F6] rounded-full flex items-center justify-center mb-4">
            <Package className="w-8 h-8 sm:w-10 sm:h-10 text-[#807D7E]" />
          </div>
          <p className="text-[#3C4242] text-base sm:text-lg font-medium mb-2">No orders yet</p>
          <p className="text-[#807D7E] text-sm mb-6 text-center">Start shopping to see your orders here</p>
          <Link
            href="/products"
            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#8A33FD] text-white rounded-lg hover:bg-[#7229D6] transition-colors text-sm sm:text-base"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg sm:rounded-xl border border-[#BEBCBD]/30 p-4 sm:p-8">
      <h2 className="text-[#3C4242] text-xl sm:text-2xl font-bold mb-6 sm:mb-8">My Orders</h2>

      <div className="space-y-4 sm:space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-[#BEBCBD]/30 rounded-lg sm:rounded-xl overflow-hidden"
          >
            {/* Order Header */}
            <div className="bg-[#F6F6F6] px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                  <div>
                    <p className="text-[#807D7E] text-xs sm:text-sm">Order Number</p>
                    <p className="text-[#3C4242] font-medium text-sm sm:text-base">#{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-[#807D7E] text-xs sm:text-sm">Date</p>
                    <p className="text-[#3C4242] font-medium text-sm sm:text-base">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#807D7E] text-xs sm:text-sm">Total</p>
                    <p className="text-[#3C4242] font-medium text-sm sm:text-base">{formatPrice(order.totalAmount)}</p>
                  </div>
                </div>
                <span
                  className={clsx(
                    'px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium self-start sm:self-auto capitalize',
                    // Default to pending color if status not mapped or specific map
                    statusColors[order.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
                  )}
                >
                  {order.status}
                </span>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-4 sm:p-6">
              {order.items.map((item, index) => (
                <div key={`${item.product._id}-${index}`} className="flex items-center gap-3 sm:gap-4">
                  <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-[#F6F6F6] flex-shrink-0">
                    <Image
                      src={item.product.images?.[0]?.secure_url || '/placeholder.png'}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[#3C4242] font-medium text-sm sm:text-base truncate">{item.product.name}</h4>
                    <p className="text-[#807D7E] text-xs sm:text-sm">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-[#3C4242] font-medium text-sm sm:text-base flex-shrink-0">
                    {formatPrice(item.subtotal)}
                  </p>
                </div>
              ))}
            </div>

            {/* Order Actions */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-[#BEBCBD]/30 flex justify-end">
              <Link
                href={`/account/orders/${order._id}`}
                className="flex items-center gap-1 sm:gap-2 text-[#8A33FD] hover:text-[#7229D6] transition-colors text-sm sm:text-base"
              >
                <span>View Details</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
