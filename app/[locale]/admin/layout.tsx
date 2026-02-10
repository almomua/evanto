'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { AdminSidebar } from '@/components/admin/sidebar';
import { AdminHeader } from '@/components/admin/header';
import { AdminGuard } from '@/components/admin/admin-guard';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('admin');
  const isRTL = locale === 'ar';

  const marginClass = isRTL
    ? (sidebarCollapsed ? 'lg:mr-[70px]' : 'lg:mr-[260px]')
    : (sidebarCollapsed ? 'lg:ml-[70px]' : 'lg:ml-[260px]');

  // Strip locale prefix for route matching
  const cleanPath = pathname.replace(`/${locale}`, '') || '/';

  const getPageTitle = () => {
    if (cleanPath === '/admin') return t('dashboard');
    if (cleanPath === '/admin/orders') return t('orderManagement');
    if (cleanPath === '/admin/customers') return t('customers');
    if (cleanPath.startsWith('/admin/customers/')) return t('customerDetail');
    if (cleanPath === '/admin/transactions') return t('transaction');
    if (cleanPath.startsWith('/admin/transactions/')) return t('transactionDetails');
    if (cleanPath === '/admin/coupons') return t('coupons');
    if (cleanPath === '/admin/coupons/new') return t('createCoupon');
    if (cleanPath === '/admin/categories') return t('categories');
    if (cleanPath === '/admin/categories/new') return t('createCategory');
    if (cleanPath === '/admin/products/new') return t('addProduct');
    if (cleanPath === '/admin/products') return t('productList');
    if (cleanPath === '/admin/brands') return t('brand');
    if (cleanPath === '/admin/layout-settings') return t('layoutSettings');
    return t('dashboard');
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#F8F9FA]">
        <AdminSidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          isMobileOpen={mobileMenuOpen}
          onMobileClose={() => setMobileMenuOpen(false)}
        />
        <main
          className={`transition-all duration-300 ${marginClass}`}
        >
          {/* Mobile Header */}
          <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-100">
            <div className="flex items-center justify-between px-4 h-16">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
              <span
                className="text-xl font-bold text-black"
                style={{ fontFamily: 'var(--font-anton-sc), sans-serif' }}
              >
                ProBerry
              </span>
              <div className="flex items-center gap-2">
                <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3C4242" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#EF4444] text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                    4
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block">
            <AdminHeader title={getPageTitle()} />
          </div>

          <div className="p-4 lg:p-6">{children}</div>
        </main>
      </div>
    </AdminGuard>
  );
}
