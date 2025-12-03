import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AccountSidebar } from '@/components/account/account-sidebar';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-[1440px] mx-auto px-[100px] py-12">
        {/* Account Layout */}
        <div className="flex gap-16">
          {/* Sidebar */}
          <AccountSidebar />

          {/* Content Area */}
          <div className="flex-1">{children}</div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
