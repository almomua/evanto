'use client';

import { useState, useEffect, useMemo } from 'react';
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
import { homeSettingsApi, HomeSettings } from '@/lib/api/home-settings';

// Component mapping for dynamic rendering
const sectionComponents: Record<string, React.FC<{ settings: HomeSettings }>> = {
  HeroBanner: ({ settings }) => <HeroBanner slides={settings.heroBanners} />,
  DealsSection: ({ settings }) => <DealsSection data={settings.dealsSection} />,
  NewArrival: ({ settings }) => <NewArrival data={settings.newArrivals} />,
  BigSavingZone: ({ settings }) => <BigSavingZone data={settings.bigSavingZone} />,
  EverydayBanner: ({ settings }) => <EverydayBanner data={settings.everydayBanner} />,
  MakeupProducts: ({ settings }) => <MakeupProducts data={settings.makeupCategories} />,
  PerfumeProducts: ({ settings }) => <PerfumeProducts data={settings.perfumeCategories} />,
  TopBrands: ({ settings }) => <TopBrands data={settings.topBrands} />,
  LimelightProducts: ({ settings }) => <LimelightProducts data={settings.limelightProducts} />,
};

export default function HomePage() {
  const [settings, setSettings] = useState<HomeSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await homeSettingsApi.get();
        setSettings(data);
      } catch (error) {
        console.error('Failed to fetch home settings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // Sort sections by order and filter enabled ones
  const orderedSections = useMemo(() => {
    if (!settings || !settings.sections) return [];
    return [...settings.sections]
      .filter(s => s.enabled)
      .sort((a, b) => a.order - b.order);
  }, [settings]);

  // Show loading skeleton or default layout while loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          {/* Default layout while loading */}
          <HeroBanner />
          <DealsSection />
          <NewArrival />
          <BigSavingZone />
          <EverydayBanner />
          <MakeupProducts />
          <PerfumeProducts />
          <TopBrands />
          <LimelightProducts />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content - Dynamically rendered based on settings */}
      <main>
        {orderedSections.map((section) => {
          const Component = sectionComponents[section.name];
          if (!Component || !settings) return null;
          return <Component key={section.name} settings={settings} />;
        })}

        {/* Fallback: If no sections configured, show default layout */}
        {orderedSections.length === 0 && settings && (
          <>
            <HeroBanner slides={settings.heroBanners} />
            <DealsSection data={settings.dealsSection} />
            <NewArrival data={settings.newArrivals} />
            <BigSavingZone data={settings.bigSavingZone} />
            <EverydayBanner data={settings.everydayBanner} />
            <MakeupProducts data={settings.makeupCategories} />
            <PerfumeProducts data={settings.perfumeCategories} />
            <TopBrands data={settings.topBrands} />
            <LimelightProducts data={settings.limelightProducts} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
