'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AccountSidebar } from '@/components/account/account-sidebar';
import { AuthGuard } from '@/components/auth';
import { usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const t = useTranslations('account');

  // Wishlist page is accessible to guests (uses local storage)
  const isWishlistPage = pathname === '/account/wishlist';

  // Determine the appropriate message based on the page
  const getGuestMessage = () => {
    if (pathname?.includes('/orders')) {
      return t('guestOrders');
    }
    if (pathname?.includes('/addresses')) {
      return t('guestAddresses');
    }
    if (pathname?.includes('/payments')) {
      return t('guestPayments');
    }
    return t('guestAccount');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px] py-6 lg:py-12">
        {/* Account Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-16">
          {/* Sidebar */}
          <AccountSidebar />

          {/* Content Area */}
          <div className="flex-1">
            {isWishlistPage ? (
              // Wishlist is open to guests
              children
            ) : (
              // Other pages require authentication
              <AuthGuard guestMessage={getGuestMessage()}>
                {children}
              </AuthGuard>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
