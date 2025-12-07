'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, Heart, User, LogOut } from 'lucide-react';
import { clsx } from 'clsx';

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

export function AccountSidebar({ user }: AccountSidebarProps) {
  const pathname = usePathname();

  const userName = user?.name || 'Ibrahim';

  const isItemActive = (item: typeof menuItems[0]) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname === item.href || pathname?.startsWith(item.href + '/');
  };

  return (
    <aside className="w-[200px] flex-shrink-0">
      {/* Hello Greeting */}
      <div className="relative pl-4 mb-2">
        {/* Purple accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#8A33FD] rounded-full" />
        <h2 className="text-[#3C4242] text-2xl font-semibold">
          Hello {userName}
        </h2>
      </div>
      
      {/* Welcome subtitle */}
      <p className="text-[#807D7E] text-sm mb-8">Welcome to your Account</p>

      {/* Navigation Menu */}
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const isActive = isItemActive(item);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 py-3 px-3 rounded-r-lg transition-colors relative',
                isActive
                  ? 'bg-[#F6F6F6] text-[#3C4242] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#8A33FD] before:rounded-full'
                  : 'text-[#807D7E] hover:text-[#3C4242] hover:bg-[#F6F6F6]/50'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-base">{item.label}</span>
            </Link>
          );
        })}

        {/* Sign Out */}
        <button
          onClick={() => {
            console.log('Sign out');
          }}
          className="flex items-center gap-3 py-3 px-3 rounded-lg text-[#807D7E] hover:text-[#3C4242] hover:bg-[#F6F6F6]/50 transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-base">Sign out</span>
        </button>
      </nav>
    </aside>
  );
}
