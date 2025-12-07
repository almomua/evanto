'use client';

import Link from 'next/link';
import { Search, Heart, User, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart-store';
import { useWishlistStore } from '@/lib/store/wishlist-store';

const navLinks = [
  { href: '/products', label: 'Shop' },
  { href: '/products', label: 'Makeup' },
  { href: '/products', label: 'Perfumes' },
  { href: '/products', label: 'Health' },
  { href: '/products', label: 'Brands' },
];

export function Header() {
  const cartItemCount = useCartStore((state) => state.items.length);
  const wishlistItemCount = useWishlistStore((state) => state.items.length);

  return (
    <header className="w-full border-b border-[#BEBCBD]">
      <div className="max-w-[1440px] mx-auto px-[65px] py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-[48px] text-black leading-[100%] tracking-[0%]"
            style={{ fontFamily: "var(--font-anton-sc), sans-serif", fontWeight: 400 }}
          >
            Evora
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-10">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[18px] font-medium transition-colors ${
                  index === 0 ? 'text-[#3C4242]' : 'text-[#807D7E] hover:text-[#3C4242]'
                }`}
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="flex items-center gap-3 bg-[#F6F6F6] rounded-lg px-5 py-3 w-[267px]">
              <Search className="w-5 h-5 text-[#807D7E]" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent border-none outline-none text-[#807D7E] text-base w-full"
              />
            </div>

            {/* Wishlist */}
            <Link
              href="/account/wishlist"
              className="relative flex items-center justify-center w-11 h-11 bg-[#F6F6F6] rounded-lg hover:bg-[#EBEBEB] transition-colors"
            >
              <Heart className="w-5 h-5 text-[#807D7E]" />
              {wishlistItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#8A33FD] text-white text-xs rounded-full flex items-center justify-center">
                  {wishlistItemCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              href="/account"
              className="flex items-center justify-center w-11 h-11 bg-[#F6F6F6] rounded-lg hover:bg-[#EBEBEB] transition-colors"
            >
              <User className="w-5 h-5 text-[#807D7E]" />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center w-11 h-11 bg-[#F6F6F6] rounded-lg hover:bg-[#EBEBEB] transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-[#807D7E]" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#8A33FD] text-white text-xs rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1 text-[#333333] text-lg cursor-pointer">
            <span>English</span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}

