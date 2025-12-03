'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, Heart, User, LogOut } from 'lucide-react';
import { clsx } from 'clsx';

const menuItems = [
  { href: '/account/orders', icon: Package, label: 'My orders' },
  { href: '/account/wishlist', icon: Heart, label: 'Wishlist' },
  { href: '/account', icon: User, label: 'My Info' },
];

interface AccountSidebarProps {
  user?: {
    name: string;
  };
}

export function AccountSidebar({ user }: AccountSidebarProps) {
  const pathname = usePathname();

  const userName = user?.name || 'Ibrahim';

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
      <nav className="space-y-0">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href === '/account/orders' && pathname?.startsWith('/account/orders'));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 py-3 transition-colors',
                isActive
                  ? 'text-[#8A33FD]'
                  : 'text-[#807D7E] hover:text-[#3C4242]'
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
          className="flex items-center gap-3 py-3 text-[#807D7E] hover:text-[#3C4242] transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-base">Sign out</span>
        </button>
      </nav>
    </aside>
  );
}
