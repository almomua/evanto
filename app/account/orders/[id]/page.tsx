'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Package, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { ordersApi, Order } from '@/lib/api/orders';
import { formatPrice } from '@/lib/utils';

const timelineSteps = [
  { id: 1, label: 'Order Placed', status: 'pending' },
  { id: 2, label: 'Inprogress', status: 'processing' },
  { id: 3, label: 'Shipped', status: 'shipped' },
  { id: 4, label: 'Delivered', status: 'delivered' },
];

const getStatusStep = (status: string) => {
  switch (status) {
    case 'pending': return 1;
    case 'processing': return 2;
    case 'shipped': return 3;
    case 'delivered': return 4;
    case 'cancelled': return 0;
    default: return 1;
  }
};

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await ordersApi.getOrderById(id);
        setOrder(data);
      } catch (error) {
        console.error('Failed to fetch order details', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20">
        <Loader2 className="w-10 h-10 animate-spin text-[#8A33FD] mb-4" />
        <p className="text-[#807D7E]">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center">
        <Package className="w-16 h-16 text-[#BEBCBD] mb-4" />
        <h2 className="text-xl font-bold text-[#3C4242] mb-2">Order Not Found</h2>
        <p className="text-[#807D7E] mb-6">We couldn't find the order you're looking for.</p>
        <Link href="/account/orders" className="px-6 py-2 bg-[#8A33FD] text-white rounded-lg">
          Back to My Orders
        </Link>
      </div>
    );
  }

  const currentStep = getStatusStep(order.status);

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
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <p className="text-[#3C4242] text-lg font-medium">
              Order no: #{order._id.slice(-8).toUpperCase()}
            </p>
            <p className="text-[#807D7E] text-sm mt-1">
              Placed On: {new Date(order.createdAt).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <p className="text-[#3C4242]">
            Total: <span className="text-[#8A33FD] font-semibold">{formatPrice(order.totalAmount)}</span>
          </p>
        </div>
      </div>

      {/* Order Timeline */}
      {order.status !== 'cancelled' ? (
        <div className="mb-12 px-4">
          <div className="flex items-center justify-between relative max-w-2xl mx-auto">
            {/* Timeline line */}
            <div className="absolute top-3 left-3 right-3 h-[2px] bg-[#BEBCBD]" />
            <div
              className="absolute top-3 left-3 h-[2px] bg-[#3C4242] transition-all duration-500"
              style={{ width: currentStep > 1 ? `${((currentStep - 1) / (timelineSteps.length - 1)) * 100}%` : '0%' }}
            />

            {/* Timeline steps */}
            {timelineSteps.map((step) => {
              const isCompleted = step.id <= currentStep;

              return (
                <div key={step.id} className="flex flex-col items-center relative z-10">
                  <div
                    className={clsx(
                      'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-300',
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
                      'text-xs sm:text-sm mt-2 whitespace-nowrap',
                      isCompleted ? 'text-[#3C4242] font-medium' : 'text-[#BEBCBD]'
                    )}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-8 text-red-600 font-medium">
          This order has been cancelled.
        </div>
      )}

      {/* Summary Message */}
      <div className="bg-[#F6F6F6] rounded-lg px-6 py-4 mb-8">
        <p className="text-[#807D7E] text-sm">
          Payment Method: <span className="text-[#3C4242] font-medium">{order.paymentMethod}</span>
          <span className="mx-2">|</span>
          Payment Status: <span className={clsx(
            "font-medium",
            order.paymentStatus === 'paid' ? "text-green-600" : "text-yellow-600"
          )}>{order.paymentStatus}</span>
        </p>
      </div>

      {/* Order Items */}
      <div className="space-y-4 mb-8">
        <h3 className="text-[#3C4242] font-semibold mb-4">Items Order</h3>
        {order.items.map((item, index) => (
          <div
            key={`${item.product._id}-${index}`}
            className="flex items-center gap-4 sm:gap-6 py-4 border-b border-[#BEBCBD]/30"
          >
            {/* Product Image */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-[#F6F6F6] flex-shrink-0">
              <Image
                src={item.product?.images?.[0]?.secure_url || item.variant?.images?.[0]?.secure_url || '/placeholder.png'}
                alt={item.product?.name || 'Product'}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-[#3C4242] font-medium truncate">{item.product?.name}</h4>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                {item.variant?.options?.map((opt, i) => (
                  <p key={i} className="text-[#807D7E] text-xs sm:text-sm">
                    {opt.name}: <span className="text-[#3C4242] font-medium">{opt.value}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="text-[#807D7E] whitespace-nowrap">
              Qty: <span className="text-[#3C4242] font-medium">{item.quantity}</span>
            </div>

            {/* Price */}
            <div className="text-[#3C4242] font-medium w-24 text-right">
              {formatPrice(item.subtotal)}
            </div>
          </div>
        ))}
      </div>

      {/* Shipping Address Summary */}
      <div className="bg-white rounded-lg border border-[#BEBCBD]/30 p-6">
        <h3 className="text-[#3C4242] font-semibold mb-3">Shipping Address</h3>
        <p className="text-[#807D7E] text-sm leading-relaxed">
          {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
          {order.shippingAddress.address}<br />
          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
          {order.shippingAddress.country}
        </p>
      </div>
    </div>
  );
}
