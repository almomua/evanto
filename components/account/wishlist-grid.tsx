'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Heart, ChevronRight, Loader2 } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart-store';
import { useWishlistStore, WishlistItem } from '@/lib/store/wishlist-store';
import { userApi } from '@/lib/api/user';
import { useAuth } from '@/lib/context/auth-context';
import { Product } from '@/lib/api/products';
import { formatPrice } from '@/lib/utils';
import { GuestWishlistPrompt } from '@/components/auth';


export function WishlistGrid() {
  const { user } = useAuth();
  const { addItem: addToCart } = useCartStore();
  const { items: guestItems, removeItem, serverItems, removeServerItem } = useWishlistStore();
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // For authenticated users, serverItems are already loaded by AuthContext
    // Just wait a tick to allow hydration
    setLoading(false);
  }, [user]);

  const handleRemove = async (id: string) => {
    if (user) {
      // Authenticated: remove from server and store
      try {
        await userApi.removeFromWishlist(id);
        removeServerItem(id);
      } catch (error) {
        console.error(error);
      }
    } else {
      // Guest: remove from local storage
      removeItem(id);
    }
  };

  // Convert store items to display format
  const displayItems: Product[] = user
    ? serverItems.map(item => ({
      _id: item.id,
      slug: item.slug,
      name: item.name,
      price: item.price,
      images: [{ secure_url: item.image, publicId: '' }],
      category: { name: item.brand }
    } as unknown as Product))
    : guestItems.map(item => ({
      _id: item.id,
      slug: item.slug,
      name: item.name,
      price: item.price,
      images: [{ secure_url: item.image, publicId: '' }],
      category: { name: item.brand }
    } as unknown as Product));

  const handleAddToCart = (item: Product) => {
    addToCart({
      id: item._id,
      name: item.name,
      brand: item.category?.name || "Brand",
      price: item.price,
      image: item.images?.[0]?.secure_url || "",
    });
  };

  // Don't render until mounted (hydration safety for local storage)
  if (!mounted) return null;

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="flex-1">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm mb-4 sm:mb-6 flex-wrap">
        <Link href="/" className="text-[#807D7E] hover:text-[#3C4242]">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#807D7E]" />
        <Link href="/account" className="text-[#807D7E] hover:text-[#3C4242]">
          My Account
        </Link>
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#807D7E]" />
        <span className="text-[#3C4242]">Wishlist</span>
      </nav>

      {/* Wishlist Heading */}
      <h1 className="text-[#3C4242] text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">Wishlist</h1>

      {/* Guest Prompt */}
      <GuestWishlistPrompt itemCount={displayItems.length} />

      {displayItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 sm:py-16">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F6F6F6] rounded-full flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-[#807D7E]" />
          </div>
          <p className="text-[#3C4242] text-base sm:text-lg font-medium mb-2">Your wishlist is empty</p>
          <p className="text-[#807D7E] text-sm mb-6 text-center">Save items you love to your wishlist</p>
          <Link
            href="/products"
            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#8A33FD] text-white rounded-lg hover:bg-[#7229D6] transition-colors text-sm sm:text-base"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="space-y-0">
          {displayItems.map((item: Product, index: number) => (
            <div
              key={item._id}
              className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-4 sm:py-6 ${index < displayItems.length - 1 ? 'border-b border-dashed border-[#BEBCBD]' : ''
                }`}
            >
              <div className="flex items-center gap-3 sm:gap-6 flex-1">
                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-[#807D7E] hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Product Image */}
                <Link href={`/products/${item.slug || item._id}`} className="flex-shrink-0">
                  <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-[#F6F6F6]">
                    <Image
                      src={item.images?.[0]?.secure_url || ""}
                      alt={item.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </Link>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item.slug || item._id}`}>
                    <h3 className="text-[#3C4242] font-medium text-sm sm:text-base hover:text-[#8A33FD] transition-colors truncate">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-[#807D7E] text-xs sm:text-sm mt-1">
                    <span className="font-medium">Category</span> : {item.category?.name}
                  </p>
                  <p className="text-[#807D7E] text-xs sm:text-sm mt-1">
                    <span className="font-medium">Quantity</span> : 1
                  </p>
                </div>

                {/* Price - Desktop */}
                <div className="hidden sm:block text-[#3C4242] text-lg font-medium w-24 text-right">
                  {formatPrice(item.price)}
                </div>
              </div>

              {/* Mobile Price and Add to Cart */}
              <div className="flex items-center justify-between sm:justify-end gap-4 ml-7 sm:ml-0">
                <span className="sm:hidden text-[#3C4242] text-sm font-medium">
                  {formatPrice(item.price)}
                </span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-[#8A33FD] text-white rounded-lg hover:bg-[#7229D6] transition-colors text-xs sm:text-sm"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
