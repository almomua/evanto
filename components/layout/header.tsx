'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, Heart, User, ShoppingCart, Menu, X, LogOut, Loader2 } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart-store';
import { useWishlistStore } from '@/lib/store/wishlist-store';
import { useAuth } from '@/lib/context/auth-context';
import { useModal } from '@/components/ui/modal';
import { productsApi, Product } from '@/lib/api/products';
import { formatPrice } from '@/lib/utils';

const navLinks = [
  { href: '/products', label: 'Shop' },
  { href: '/products', label: 'Makeup' },
  { href: '/products', label: 'Perfumes' },
  { href: '/products', label: 'Health' },
  { href: '/products', label: 'Brands' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const cartItemCount = useCartStore((state) => state.items.length);
  const guestWishlistCount = useWishlistStore((state) => state.items.length);
  const serverWishlistCount = useWishlistStore((state) => state.serverItems.length);
  const { user, logout } = useAuth();
  const modal = useModal();
  const router = useRouter();

  // Use server wishlist count for authenticated users, guest count otherwise
  const wishlistItemCount = user ? serverWishlistCount : guestWishlistCount;

  // Debounced search effect
  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (searchQuery.trim().length > 0) {
      setIsSearching(true);
      setShowDropdown(true);
      searchTimeout.current = setTimeout(async () => {
        try {
          const results = await productsApi.search(searchQuery);
          setSearchResults(results.slice(0, 5)); // Limit to 5 results
        } catch (error) {
          console.error("Search failed", error);
        } finally {
          setIsSearching(false);
        }
      }, 300);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
      setIsSearching(false);
    }

    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent) => {
    if ((e.type === 'keydown' && (e as React.KeyboardEvent).key === 'Enter') || e.type === 'click') {
      if (searchQuery.trim()) {
        router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <header className="w-full border-b border-[#BEBCBD]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[65px] py-4 lg:py-5">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 text-[#3C4242]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="text-[32px] lg:text-[48px] text-black leading-[100%] tracking-[0%]"
            style={{ fontFamily: "var(--font-anton-sc), sans-serif", fontWeight: 400 }}
          >
            ProBerry
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link, index) => (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                className={`text-[18px] font-medium transition-colors ${index === 0 ? 'text-[#3C4242]' : 'text-[#807D7E] hover:text-[#3C4242]'
                  }`}
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Search and Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <div className="flex items-center gap-3 bg-[#F6F6F6] rounded-lg px-5 py-3 w-[267px]">
                <button onClick={handleSearch}><Search className="w-5 h-5 text-[#807D7E]" /></button>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  onFocus={() => { if (searchQuery) setShowDropdown(true); }}
                  className="bg-transparent border-none outline-none text-[#807D7E] text-base w-full"
                />
              </div>

              {/* Dropdown Results */}
              {showDropdown && (
                <div ref={dropdownRef} className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                  {isSearching ? (
                    <div className="p-4 flex justify-center">
                      <Loader2 className="w-5 h-5 animate-spin text-[#8A33FD]" />
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.map((product) => (
                        <Link
                          key={product._id}
                          href={`/products/${product.slug || product._id}`}
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                        >
                          <div className="relative w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                            {product.images && product.images[0] && (
                              <Image
                                src={product.images[0].secure_url}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#3C4242] truncate">{product.name}</p>
                            <p className="text-xs text-[#807D7E]">{formatPrice(product.price)}</p>
                          </div>
                        </Link>
                      ))}
                      <button
                        onClick={(e) => handleSearch(e as any)}
                        className="w-full text-center py-2 text-xs font-semibold text-[#8A33FD] border-t border-gray-100 hover:bg-gray-50 uppercase tracking-widest"
                      >
                        View All Results
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-sm text-[#807D7E]">
                      No products found.
                    </div>
                  )}
                </div>
              )}
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
              href={user ? "/account" : "/auth/login"}
              className="flex items-center justify-center w-11 h-11 bg-[#F6F6F6] rounded-lg hover:bg-[#EBEBEB] transition-colors"
              title={user ? "My Account" : "Sign In"}
            >
              <User className="w-5 h-5 text-[#807D7E]" />
            </Link>

            {/* Logout (Desktop) - only for authenticated users */}
            {user && (
              <button
                onClick={async () => {
                  const confirmed = await modal.confirm('Are you sure you want to sign out?', 'Sign Out');
                  if (confirmed) {
                    logout();
                  }
                }}
                className="flex items-center justify-center w-11 h-11 bg-[#F6F6F6] rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}

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

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile Search Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center justify-center w-10 h-10 text-[#807D7E]">
              <Search className="w-5 h-5" />
            </button>

            {/* Mobile Cart */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center w-10 h-10 text-[#807D7E]"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8A33FD] text-white text-[10px] rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Desktop Language Selector */}
          <div className="hidden lg:flex items-center gap-1 text-[#333333] text-lg cursor-pointer">
            <span>English</span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-[#BEBCBD] pt-4">
            {/* Mobile Search */}
            <div className="flex items-center gap-3 bg-[#F6F6F6] rounded-lg px-4 py-3 mb-4">
              <button onClick={handleSearch}><Search className="w-5 h-5 text-[#807D7E]" /></button>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="bg-transparent border-none outline-none text-[#807D7E] text-base w-full"
              />
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col gap-4 mb-4">
              {navLinks.map((link, index) => (
                <Link
                  key={`mobile-${link.href}-${link.label}`}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium transition-colors ${index === 0 ? 'text-[#3C4242]' : 'text-[#807D7E]'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Account Links */}
            <div className="flex items-center gap-4 pt-4 border-t border-[#BEBCBD]">
              <Link
                href="/account/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-[#807D7E] text-sm"
              >
                <Heart className="w-5 h-5" />
                <span>Wishlist ({wishlistItemCount})</span>
              </Link>
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-[#807D7E] text-sm"
              >
                <User className="w-5 h-5" />
                <span>Account</span>
              </Link>
              {user && (
                <button
                  onClick={async () => {
                    const confirmed = await modal.confirm('Are you sure you want to sign out?', 'Sign Out');
                    if (confirmed) {
                      logout();
                      setMobileMenuOpen(false);
                    }
                  }}
                  className="flex items-center gap-2 text-[#807D7E] hover:text-red-500 text-sm"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
