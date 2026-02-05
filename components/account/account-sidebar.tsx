'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, Heart, User, LogOut, Menu, X, LayoutDashboard } from 'lucide-react';
import { clsx } from 'clsx';
import { useAuth } from '@/lib/context/auth-context';
import { useModal } from '@/components/ui/modal';

const menuItems = [
  { href: '/account/orders', icon: Package, label: 'My orders' },
  { href: '/account/wishlist', icon: Heart, label: 'Wishlist' },
  { href: '/account', icon: User, label: 'My Info', exact: true },
];

interface AccountSidebarProps {
  user?: {
    name: string;
  };
}

export function AccountSidebar({ user: propsUser }: AccountSidebarProps) {
  const { user: authUser, logout } = useAuth();
  const modal = useModal();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userName = authUser?.name || propsUser?.name || 'Guest';
  const isGuest = !authUser;

  const isItemActive = (item: typeof menuItems[0]) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname === item.href || pathname?.startsWith(item.href + '/');
  };

  const sidebarContent = (
    <>
      {/* Hello Greeting */}
      <div className="relative pl-4 mb-2">
        {/* Purple accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#8A33FD] rounded-full" />
        <h2 className="text-[#3C4242] text-xl lg:text-2xl font-semibold">
          Hello {userName}
        </h2>
      </div>

      {/* Welcome subtitle */}
      <p className="text-[#807D7E] text-xs lg:text-sm mb-6 lg:mb-8">
        {isGuest ? 'Sign in to access your account' : 'Welcome to your Account'}
      </p>

      {/* Navigation Menu */}
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const isActive = isItemActive(item);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={clsx(
                'flex items-center gap-3 py-3 px-3 rounded-r-lg transition-colors relative',
                isActive
                  ? 'bg-[#F6F6F6] text-[#3C4242] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#8A33FD] before:rounded-full'
                  : 'text-[#807D7E] hover:text-[#3C4242] hover:bg-[#F6F6F6]/50'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm lg:text-base">{item.label}</span>
            </Link>
          );
        })}

        {/* Admin Dashboard Page Link */}
        {authUser?.role === 'admin' && (
          <Link
            href="/admin"
            className="flex items-center gap-3 py-3 px-3 rounded-r-lg text-[#8A33FD] hover:bg-purple-50 transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-sm lg:text-base font-medium">Admin Page</span>
          </Link>
        )}

        {/* Sign Out / Sign In */}
        {isGuest ? (
          <Link
            href="/auth/login"
            className="flex items-center gap-3 py-3 px-3 rounded-lg text-[#8A33FD] hover:bg-[#8A33FD]/10 transition-colors w-full font-medium"
          >
            <User className="w-5 h-5" />
            <span className="text-sm lg:text-base">Sign In</span>
          </Link>
        ) : (
          <button
            onClick={async () => {
              const confirmed = await modal.confirm('Are you sure you want to sign out?', 'Sign Out');
              if (confirmed) {
                logout();
                setMobileMenuOpen(false);
              }
            }}
            className="flex items-center gap-3 py-3 px-3 rounded-lg text-[#807D7E] hover:text-[#3C4242] hover:bg-[#F6F6F6]/50 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm lg:text-base">Sign out</span>
          </button>
        )}
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden flex items-center justify-between mb-4 pb-4 border-b border-[#BEBCBD]/30">
        <div>
          <h2 className="text-[#3C4242] text-lg font-semibold">Hello {userName}</h2>
          <p className="text-[#807D7E] text-xs">Welcome to your Account</p>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-10 h-10 flex items-center justify-center text-[#3C4242] bg-[#F6F6F6] rounded-lg"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mb-6 pb-6 border-b border-[#BEBCBD]/30">
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = isItemActive(item);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={clsx(
                    'flex items-center gap-3 py-3 px-3 rounded-lg transition-colors',
                    isActive
                      ? 'bg-[#8A33FD] text-white'
                      : 'text-[#807D7E] hover:text-[#3C4242] hover:bg-[#F6F6F6]/50'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}

            {/* Admin Dashboard Page Link (Mobile) */}
            {authUser?.role === 'admin' && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-3 px-3 rounded-lg text-[#8A33FD] bg-purple-50 transition-colors"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span className="text-sm font-medium">Admin Page</span>
              </Link>
            )}

            {/* Sign Out / Sign In */}
            {isGuest ? (
              <Link
                href="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-3 px-3 rounded-lg text-[#8A33FD] hover:bg-[#8A33FD]/10 transition-colors w-full font-medium"
              >
                <User className="w-5 h-5" />
                <span className="text-sm">Sign In</span>
              </Link>
            ) : (
              <button
                onClick={async () => {
                  const confirmed = await modal.confirm('Are you sure you want to sign out?', 'Sign Out');
                  if (confirmed) {
                    logout();
                    setMobileMenuOpen(false);
                  }
                }}
                className="flex items-center gap-3 py-3 px-3 rounded-lg text-[#807D7E] hover:text-[#3C4242] hover:bg-[#F6F6F6]/50 transition-colors w-full"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm">Sign out</span>
              </button>
            )}
          </nav>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-[200px] flex-shrink-0">
        {sidebarContent}
      </aside>
    </>
  );
}
