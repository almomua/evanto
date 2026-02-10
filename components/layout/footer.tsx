'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Loader2 } from 'lucide-react';
import { categoriesApi, Category } from '@/lib/api/products';
import { useLocale, useTranslations } from 'next-intl';

export function Footer() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations('footer');
  const locale = useLocale();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesApi.getAll();
        setCategories(data.slice(0, 8));
      } catch (error) {
        console.error('Failed to load categories for footer', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const footerLinks = {
    needHelp: {
      title: t('needHelp'),
      links: [
        { label: t('contactUs'), href: '/contact' },
        { label: t('trackOrder'), href: '/track-order' },
        { label: t('returnsRefunds'), href: '/returns' },
        { label: t('faq'), href: '/faq' },
        { label: t('career'), href: '/career' },
      ],
    },
    company: {
      title: t('company'),
      links: [
        { label: t('aboutUs'), href: '/about' },
        { label: t('blog'), href: '/blog' },
        { label: t('collaboration'), href: '/collaboration' },
        { label: t('media'), href: '/media' },
      ],
    },
    moreInfo: {
      title: t('moreInfo'),
      links: [
        { label: t('termsConditions'), href: '/terms' },
        { label: t('privacyPolicy'), href: '/privacy' },
        { label: t('shippingPolicy'), href: '/shipping' },
        { label: t('sitemap'), href: '/sitemap' },
      ],
    },
    location: {
      title: t('location'),
      links: [
        { label: 'support@ProBerry.in', href: 'mailto:support@ProBerry.in' },
        { label: t('location'), href: '#' },
        { label: t('address'), href: '#' },
      ],
    },
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-[#3C4242] text-[#F6F6F6] pt-10 lg:pt-[60px] pb-8 lg:pb-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[110px]">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-0 lg:flex lg:justify-between mb-10 lg:mb-16">
          {/* Need Help */}
          <div>
            <h3 className="text-lg lg:text-[28px] leading-relaxed mb-4 lg:mb-6">{footerLinks.needHelp.title}</h3>
            <ul className="space-y-2 lg:space-y-3">
              {footerLinks.needHelp.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm lg:text-lg hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg lg:text-[28px] leading-relaxed mb-4 lg:mb-6">{footerLinks.company.title}</h3>
            <ul className="space-y-2 lg:space-y-3">
              {footerLinks.company.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm lg:text-lg hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Info */}
          <div>
            <h3 className="text-lg lg:text-[28px] leading-relaxed mb-4 lg:mb-6">{footerLinks.moreInfo.title}</h3>
            <ul className="space-y-2 lg:space-y-3">
              {footerLinks.moreInfo.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm lg:text-lg hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-lg lg:text-[28px] leading-relaxed mb-4 lg:mb-6">{footerLinks.location.title}</h3>
            <ul className="space-y-2 lg:space-y-3">
              {footerLinks.location.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm lg:text-lg hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-3 mb-8 lg:mb-10">
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              className="w-9 h-9 lg:w-[37px] lg:h-[37px] bg-[#F6F6F6] rounded-lg lg:rounded-[10px] flex items-center justify-center hover:bg-white transition-colors"
              aria-label={social.label}
            >
              <social.icon className="w-4 h-4 lg:w-5 lg:h-5 text-[#3C4242]" />
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-[#F6F6F6]/30 pt-6 lg:pt-8 pb-4 lg:pb-6">
          {/* Popular Categories */}
          <h4 className="text-lg lg:text-[28px] mb-4">{t('popularCategories')}</h4>

          {loading ? (
            <div className="flex justify-start py-2">
              <Loader2 className="w-5 h-5 animate-spin text-[#F6F6F6]/50" />
            </div>
          ) : (
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/products?category=${cat.slug}`}
                  className="text-sm lg:text-lg text-[#F6F6F6]/80 hover:text-white transition-colors"
                >
                  {(locale === 'ar' && (cat as any).nameAr) ? (cat as any).nameAr : cat.name}
                </Link>
              ))}
              {categories.length === 0 && (
                <span className="text-sm text-[#F6F6F6]/50">{t('noCategories')}</span>
              )}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-[#F6F6F6]/30 pt-4 lg:pt-6">
          {/* Copyright */}
          <p className="text-sm lg:text-lg text-center">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
