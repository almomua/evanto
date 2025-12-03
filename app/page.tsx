import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroBanner } from '@/components/home/hero-banner';
import { DealsSection } from '@/components/home/deals-section';
import { NewArrival } from '@/components/home/new-arrival';
import { BigSavingZone } from '@/components/home/big-saving-zone';
import { EverydayBanner } from '@/components/home/everyday-banner';
import { MakeupProducts } from '@/components/home/makeup-products';
import { PerfumeProducts } from '@/components/home/perfume-products';
import { TopBrands } from '@/components/home/top-brands';
import { LimelightProducts } from '@/components/home/limelight-products';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main>
        {/* Hero Banner */}
        <HeroBanner />

        {/* Deals Section */}
        <DealsSection />

        {/* New Arrival */}
        <NewArrival />

        {/* Big Saving Zone */}
        <BigSavingZone />

        {/* Everyday Banner */}
        <EverydayBanner />

        {/* Makeup Products */}
        <MakeupProducts />

        {/* Perfume Products */}
        <PerfumeProducts />

        {/* Top Brands Deal */}
        <TopBrands />

        {/* In The Limelight */}
        <LimelightProducts />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
