'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ShoppingCart, Heart } from 'lucide-react';
import { useWishlistStore } from '@/lib/store/wishlist-store';
import { useCartStore } from '@/lib/store/cart-store';

export function WishlistGrid() {
  const { items, removeItem } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white rounded-xl border border-[#BEBCBD]/30 p-8">
        <h2 className="text-[#3C4242] text-2xl font-bold mb-8">My Wishlist</h2>
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-64 bg-[#F6F6F6] rounded-xl mb-4" />
              <div className="h-4 w-32 bg-[#F6F6F6] rounded mb-2" />
              <div className="h-4 w-20 bg-[#F6F6F6] rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const handleAddToCart = (item: typeof items[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      brand: 'Brand', // Default brand since wishlist doesn't store it
      price: item.price,
      image: item.image,
    });
  };

  return (
    <div className="bg-white rounded-xl border border-[#BEBCBD]/30 p-8">
      <h2 className="text-[#3C4242] text-2xl font-bold mb-8">
        My Wishlist ({items.length})
      </h2>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
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
        <div className="grid grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative border border-[#BEBCBD]/30 rounded-xl overflow-hidden"
            >
              {/* Product Image */}
              <Link href={`/products/${item.id}`} className="block">
                <div className="relative h-64 bg-[#F6F6F6]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </Link>

              {/* Remove Button */}
              <button
                onClick={() => removeItem(item.id)}
                className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>

              {/* Product Info */}
              <div className="p-4">
                <Link href={`/products/${item.id}`}>
                  <h3 className="text-[#3C4242] font-medium hover:text-[#8A33FD] transition-colors">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-[#8A33FD] font-semibold mt-1">
                  ${item.price.toFixed(2)}
                </p>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-2 bg-[#3C4242] text-white rounded-lg hover:bg-[#2A2F2F] transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

