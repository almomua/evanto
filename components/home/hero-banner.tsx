'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LinkButton } from '@/components/ui/button';
import { ASSETS } from '@/lib/assets';

// Slider data - multiple banner images
const slides = [
  {
    id: 1,
    image: ASSETS.heroBanner,
    category: 'Skincare / Cosmetics',
    title: 'BEAUTY\nDEALS',
    subtitle: 'Luxury Beauty / Smart Prices',
  },
  {
    id: 2,
    image: ASSETS.heroBanner,
    category: 'Makeup / Beauty',
    title: 'NEW\nARRIVALS',
    subtitle: 'Fresh Looks / Great Savings',
  },
  {
    id: 3,
    image: ASSETS.heroBanner,
    category: 'Perfumes / Fragrances',
    title: 'SUMMER\nSALE',
    subtitle: 'Up to 50% Off Selected Items',
  },
];

const AUTO_SLIDE_INTERVAL = 5000; // 5 seconds

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Auto-slide effect
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[716px] bg-[#26C6D0] rounded-[5px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 transition-opacity duration-500">
        <Image
          src={currentSlideData.image}
          alt={currentSlideData.title}
          fill
          className="object-cover object-top"
          priority
          unoptimized
        />
      </div>

      {/* Content Overlay */}
      <div className="absolute left-8 md:left-24 lg:left-[193px] top-20 md:top-28 lg:top-[129px] w-[90%] md:w-[500px] lg:w-[439px] text-white z-10">
        {/* Category Tag */}
        <p className="text-xl md:text-2xl lg:text-[32px] font-medium capitalize tracking-tight leading-relaxed text-[#40E0D0]">
          {currentSlideData.category}
        </p>

        {/* Main Title - Using Anton display font */}
        <h1 
          className="text-5xl md:text-6xl lg:text-[78px] leading-[1.1] tracking-tight my-2"
          style={{ fontFamily: "var(--font-anton), 'Arial Black', sans-serif" }}
        >
          {currentSlideData.title.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < currentSlideData.title.split('\n').length - 1 && <br />}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl lg:text-[32px] font-medium tracking-tight mb-6 md:mb-10">
          {currentSlideData.subtitle}
        </p>

        {/* CTA Button */}
        <LinkButton
          href="/products"
          variant="white"
          className="px-10 md:px-16 lg:px-[72px] py-3 md:py-4 text-lg md:text-xl lg:text-2xl rounded-lg"
        >
          Shop Now
        </LinkButton>
      </div>

      {/* Carousel Controls */}
      <button
        onClick={() => {
          prevSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 10000);
        }}
        className="absolute left-4 md:left-[39px] top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={() => {
          nextSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 10000);
        }}
        className="absolute right-4 md:right-[39px] top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex rounded-xl overflow-hidden z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-12 md:w-[62px] h-2 md:h-2.5 transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
