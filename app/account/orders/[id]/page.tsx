'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { clsx } from 'clsx';

// Mock order data - in production, fetch from API
const getOrderById = (id: string) => {
  return {
    id,
    orderNumber: '#123456789',
    date: '2 June 2023 2:40 PM',
    verifiedDate: '8 June 2023 5:40 PM',
    status: 'delivered' as const,
    currentStep: 4, // 1=Order Placed, 2=Inprogress, 3=Shipped, 4=Delivered
    total: 143.00,
    items: [
      {
        id: '1',
        name: 'Spray',
        color: 'White',
        image: 'https://www.figma.com/api/mcp/asset/509cfe84-8820-4157-b0fe-29e948788770',
        quantity: 1,
        price: 29.00,
      },
      {
        id: '2',
        name: 'Lip Stick',
        color: 'Blue',
        image: 'https://www.figma.com/api/mcp/asset/36f8b8a7-a663-4609-bc92-c0738bab2e7d',
        quantity: 1,
        price: 29.00,
      },
    ],
  };
};

const timelineSteps = [
  { id: 1, label: 'Order Placed' },
  { id: 2, label: 'Inprogress' },
  { id: 3, label: 'Shipped' },
  { id: 4, label: 'Delivered' },
];

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = use(params);
  const order = getOrderById(id);

  return (
    <div className="flex-1">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link href="/" className="text-[#807D7E] hover:text-[#3C4242]">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 text-[#807D7E]" />
        <Link href="/account" className="text-[#807D7E] hover:text-[#3C4242]">
          My Account
        </Link>
        <ChevronRight className="w-4 h-4 text-[#807D7E]" />
        <span className="text-[#3C4242]">Order Detail</span>
      </nav>

      {/* Order Details Header */}
      <div className="flex items-center gap-2 mb-8">
        <Link
          href="/account/orders"
          className="text-[#807D7E] hover:text-[#3C4242] transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-[#3C4242] text-2xl font-semibold">Order Details</h1>
      </div>

      {/* Order Info Card */}
      <div className="bg-[#F6F6F6] rounded-lg p-6 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[#3C4242] text-lg font-medium">
              Order no: {order.orderNumber}
            </p>
            <p className="text-[#807D7E] text-sm mt-1">
              Placed On: {order.date}
            </p>
          </div>
          <p className="text-[#3C4242]">
            Total: <span className="text-[#8A33FD] font-semibold">${order.total.toFixed(2)}</span>
          </p>
        </div>
      </div>

      {/* Order Timeline */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          {/* Timeline line */}
          <div className="absolute top-3 left-0 right-0 h-[2px] bg-[#BEBCBD]" />
          <div 
            className="absolute top-3 left-0 h-[2px] bg-[#3C4242] transition-all"
            style={{ width: `${((order.currentStep - 1) / (timelineSteps.length - 1)) * 100}%` }}
          />
          
          {/* Timeline steps */}
          {timelineSteps.map((step) => {
            const isCompleted = step.id <= order.currentStep;
            const isCurrent = step.id === order.currentStep;
            
            return (
              <div key={step.id} className="flex flex-col items-center relative z-10">
                <div
                  className={clsx(
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center',
                    isCompleted
                      ? 'bg-[#3C4242] border-[#3C4242]'
                      : 'bg-white border-[#BEBCBD]'
                  )}
                >
                  {isCompleted && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <span
                  className={clsx(
                    'text-sm mt-2',
                    isCompleted ? 'text-[#3C4242]' : 'text-[#BEBCBD]'
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verification Message */}
      <div className="bg-[#F6F6F6] rounded-lg px-6 py-4 mb-8">
        <p className="text-[#807D7E] text-sm">
          <span className="text-[#3C4242]">{order.verifiedDate}</span>
          {' '}- Your order has been successfully verified.
        </p>
      </div>

      {/* Order Items */}
      <div className="space-y-4">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-6 py-4 border-b border-[#BEBCBD]/30"
          >
            {/* Product Image */}
            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-[#F6F6F6] flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Product Info */}
            <div className="flex-1">
              <h4 className="text-[#3C4242] font-medium">{item.name}</h4>
              <p className="text-[#807D7E] text-sm">Color: {item.color}</p>
            </div>

            {/* Quantity */}
            <div className="text-[#807D7E]">
              Qty: <span className="text-[#3C4242]">{item.quantity}</span>
            </div>

            {/* Price */}
            <div className="text-[#3C4242] font-medium w-20 text-right">
              ${item.price.toFixed(2)}
            </div>

            {/* Remove Button */}
            <button className="text-[#807D7E] hover:text-[#3C4242] transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
