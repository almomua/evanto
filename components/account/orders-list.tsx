'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Package } from 'lucide-react';
import { clsx } from 'clsx';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: {
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
  }[];
}

// Mock orders data
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'EVR-12345678',
    date: '2024-12-01',
    status: 'delivered',
    total: 126.00,
    items: [
      {
        id: '1',
        name: 'Advanced Night Repair Serum',
        image: 'https://www.figma.com/api/mcp/asset/3db4813e-e366-49ed-a960-b349016e1e5c',
        quantity: 2,
        price: 63.00,
      },
    ],
  },
  {
    id: '2',
    orderNumber: 'EVR-12345679',
    date: '2024-11-28',
    status: 'shipped',
    total: 89.00,
    items: [
      {
        id: '2',
        name: 'Vitamin C Serum',
        image: 'https://www.figma.com/api/mcp/asset/509cfe84-8820-4157-b0fe-29e948788770',
        quantity: 1,
        price: 89.00,
      },
    ],
  },
  {
    id: '3',
    orderNumber: 'EVR-12345680',
    date: '2024-11-25',
    status: 'processing',
    total: 156.00,
    items: [
      {
        id: '3',
        name: 'Rose Water Toner',
        image: 'https://www.figma.com/api/mcp/asset/36f8b8a7-a663-4609-bc92-c0738bab2e7d',
        quantity: 2,
        price: 78.00,
      },
    ],
  },
];

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
  const orders = mockOrders;

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-[#BEBCBD]/30 p-8">
        <h2 className="text-[#3C4242] text-2xl font-bold mb-8">My Orders</h2>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-20 h-20 bg-[#F6F6F6] rounded-full flex items-center justify-center mb-4">
            <Package className="w-10 h-10 text-[#807D7E]" />
          </div>
          <p className="text-[#3C4242] text-lg font-medium mb-2">No orders yet</p>
          <p className="text-[#807D7E] mb-6">Start shopping to see your orders here</p>
          <Link
            href="/products"
            className="px-8 py-3 bg-[#8A33FD] text-white rounded-lg hover:bg-[#7229D6] transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#BEBCBD]/30 p-8">
      <h2 className="text-[#3C4242] text-2xl font-bold mb-8">My Orders</h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-[#BEBCBD]/30 rounded-xl overflow-hidden"
          >
            {/* Order Header */}
            <div className="bg-[#F6F6F6] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-[#807D7E] text-sm">Order Number</p>
                  <p className="text-[#3C4242] font-medium">{order.orderNumber}</p>
                </div>
                <div>
                  <p className="text-[#807D7E] text-sm">Date</p>
                  <p className="text-[#3C4242] font-medium">
                    {new Date(order.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-[#807D7E] text-sm">Total</p>
                  <p className="text-[#3C4242] font-medium">${order.total.toFixed(2)}</p>
                </div>
              </div>
              <span
                className={clsx(
                  'px-3 py-1 rounded-full text-sm font-medium',
                  statusColors[order.status]
                )}
              >
                {statusLabels[order.status]}
              </span>
            </div>

            {/* Order Items */}
            <div className="p-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-[#F6F6F6]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#3C4242] font-medium">{item.name}</h4>
                    <p className="text-[#807D7E] text-sm">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-[#3C4242] font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Order Actions */}
            <div className="px-6 py-4 border-t border-[#BEBCBD]/30 flex justify-end">
              <Link
                href={`/account/orders/${order.id}`}
                className="flex items-center gap-2 text-[#8A33FD] hover:text-[#7229D6] transition-colors"
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

