'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Heart, ChevronRight } from 'lucide-react';
import { useWishlistStore, WishlistItem } from '@/lib/store/wishlist-store';
import { useCartStore } from '@/lib/store/cart-store';

// Mock wishlist data for display
const mockWishlistItems: WishlistItem[] = [
  {
    id: 'wishlist-1',
    name: 'Item',
    brand: 'Yellow',
    price: 29.00,
    image: 'https://www.figma.com/api/mcp/asset/509cfe84-8820-4157-b0fe-29e948788770',
  },
  {
    id: 'wishlist-2',
    name: 'Item',
    brand: 'Yellow',
    price: 78.00,
    image: 'https://www.figma.com/api/mcp/asset/509cfe84-8820-4157-b0fe-29e948788770',
  },
  {
    id: 'wishlist-3',
    name: 'Item',
    brand: 'White',
    price: 134.00,
    image: 'https://www.figma.com/api/mcp/asset/509cfe84-8820-4157-b0fe-29e948788770',
  },
  {
    id: 'wishlist-4',
    name: 'Item',
    brand: 'Brown',
    price: 93.00,
    image: 'https://www.figma.com/api/mcp/asset/509cfe84-8820-4157-b0fe-29e948788770',
  },
];

export function WishlistGrid() {
  const { items: storeItems, removeItem } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use mock data if store is empty, otherwise use store items
  const items = mounted && storeItems.length > 0 ? storeItems : mockWishlistItems;

  if (!mounted) {
    return (
      <div className="flex-1">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-32 bg-[#F6F6F6] rounded" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-6 py-6 border-b border-dashed border-[#BEBCBD]">
              <div className="w-6 h-6 bg-[#F6F6F6] rounded" />
              <div className="w-24 h-24 bg-[#F6F6F6] rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-24 bg-[#F6F6F6] rounded" />
                <div className="h-4 w-32 bg-[#F6F6F6] rounded" />
              </div>
              <div className="h-4 w-16 bg-[#F6F6F6] rounded" />
              <div className="h-10 w-28 bg-[#F6F6F6] rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const handleAddToCart = (item: WishlistItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      brand: item.brand,
      price: item.price,
      image: item.image,
    });
  };

  const handleRemove = (id: string) => {
    // Only remove from store if it's a real item (not mock)
    if (storeItems.some(i => i.id === id)) {
      removeItem(id);
    }
  };

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
        <span className="text-[#3C4242]">Wishlist</span>
      </nav>

      {/* Wishlist Heading */}
      <h1 className="text-[#3C4242] text-2xl font-semibold mb-8">Wishlist</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-20 h-20 bg-[#F6F6F6] rounded-full flex items-center justify-center mb-4">
            <Heart className="w-10 h-10 text-[#807D7E]" />
          </div>
          <p className="text-[#3C4242] text-lg font-medium mb-2">Your wishlist is empty</p>
          <p className="text-[#807D7E] mb-6">Save items you love to your wishlist</p>
          <Link
            href="/products"
            className="px-8 py-3 bg-[#8A33FD] text-white rounded-lg hover:bg-[#7229D6] transition-colors"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="space-y-0">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`flex items-center gap-6 py-6 ${
                index < items.length - 1 ? 'border-b border-dashed border-[#BEBCBD]' : ''
              }`}
            >
              {/* Remove Button */}
              <button
                onClick={() => handleRemove(item.id)}
                className="text-[#807D7E] hover:text-red-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Product Image */}
              <Link href={`/products/${item.id}`} className="flex-shrink-0">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-[#F6F6F6]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </Link>

              {/* Product Info */}
              <div className="flex-1">
                <Link href={`/products/${item.id}`}>
                  <h3 className="text-[#3C4242] font-medium hover:text-[#8A33FD] transition-colors">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-[#807D7E] text-sm mt-1">
                  <span className="font-medium">Color</span> : {item.brand}
                </p>
                <p className="text-[#807D7E] text-sm mt-1">
                  <span className="font-medium">Quantity</span> : 1
                </p>
              </div>

              {/* Price */}
              <div className="text-[#3C4242] text-lg font-medium w-24 text-right">
                ${item.price.toFixed(2)}
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(item)}
                className="px-6 py-3 bg-[#8A33FD] text-white rounded-lg hover:bg-[#7229D6] transition-colors"
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
