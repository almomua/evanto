'use client';

import { Link, usePathname } from '@/i18n/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

interface MenuItem {
  nameKey: string;
  href: string;
  icon: string;
}

interface MenuSection {
  sectionKey: string;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    sectionKey: 'mainMenu',
    items: [
      { nameKey: 'dashboard', href: '/admin', icon: 'smart-home' },
      { nameKey: 'orderManagement', href: '/admin/orders', icon: 'shopping-cart' },
      { nameKey: 'customers', href: '/admin/customers', icon: 'users' },
      { nameKey: 'couponCode', href: '/admin/coupons', icon: 'ticket' },
      { nameKey: 'categories', href: '/admin/categories', icon: 'circle-square' },
      { nameKey: 'transaction', href: '/admin/transactions', icon: 'file-text' },
      { nameKey: 'brand', href: '/admin/brands', icon: 'star' },
      { nameKey: 'layoutSettings', href: '/admin/layout-settings', icon: 'layout' },
    ],
  },
  {
    sectionKey: 'productsSection',
    items: [
      { nameKey: 'addProducts', href: '/admin/products/new', icon: 'circle-plus' },
      { nameKey: 'productList', href: '/admin/products', icon: 'box' },
    ],
  },
];

const iconMap: Record<string, React.ReactNode> = {
  'smart-home': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  'shopping-cart': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  ),
  'users': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  'ticket': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" />
      <path d="M13 17v2" />
      <path d="M13 11v2" />
    </svg>
  ),
  'circle-square': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  'file-text': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  'star': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  'circle-plus': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  ),
  'box': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  'layout': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  ),
};

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function AdminSidebar({ isCollapsed, onToggle, isMobileOpen, onMobileClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('admin');
  const isRTL = locale === 'ar';

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`fixed top-0 h-screen bg-white transition-all duration-300 z-50 
          ${isRTL ? 'right-0 border-l border-gray-100' : 'left-0 border-r border-gray-100'}
          ${isCollapsed ? 'lg:w-[70px]' : 'lg:w-[260px]'}
          ${isMobileOpen ? 'translate-x-0 w-[260px]' : isRTL ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="h-24 flex items-center justify-between px-4 border-b border-gray-100">
          {!isCollapsed && (
            <Link
              href="/admin"
              className="text-3xl font-bold text-black"
              style={{ fontFamily: 'var(--font-anton-sc), sans-serif' }}
            >
              ProBerry
            </Link>
          )}
          <button
            onClick={onToggle}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform ${isCollapsed ? (isRTL ? '' : 'rotate-180') : (isRTL ? 'rotate-180' : '')}`}
            >
              <polyline points={isRTL ? '13 17 18 12 13 7' : '11 17 6 12 11 7'} />
              <polyline points={isRTL ? '6 17 11 12 6 7' : '18 17 13 12 18 7'} />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="py-4 overflow-y-auto h-[calc(100vh-96px)]">
          {menuSections.map((section) => (
            <div key={section.sectionKey} className="mb-4">
              {(!isCollapsed || isMobileOpen) && (
                <h3 className="px-7 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {t(section.sectionKey)}
                </h3>
              )}
              <ul className="space-y-1 px-3">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.nameKey}>
                      <Link
                        href={item.href}
                        onClick={onMobileClose}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive
                          ? 'bg-[#8B5CF6] text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        title={isCollapsed && !isMobileOpen ? t(item.nameKey) : undefined}
                      >
                        <span className="flex-shrink-0">{iconMap[item.icon]}</span>
                        {(!isCollapsed || isMobileOpen) && (
                          <span className="text-base font-medium">{t(item.nameKey)}</span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
