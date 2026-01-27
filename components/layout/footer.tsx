import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const footerLinks = {
  needHelp: {
    title: 'Need Help',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Track Order', href: '/track-order' },
      { label: 'Returns & Refunds', href: '/returns' },
      { label: "FAQ's", href: '/faq' },
      { label: 'Career', href: '/career' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'ProBerry Blog', href: '/blog' },
      { label: 'Collaboration', href: '/collaboration' },
      { label: 'Media', href: '/media' },
    ],
  },
  moreInfo: {
    title: 'More Info',
    links: [
      { label: 'Term and Conditions', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Shipping Policy', href: '/shipping' },
      { label: 'Sitemap', href: '/sitemap' },
    ],
  },
  location: {
    title: 'Location',
    links: [
      { label: 'support@ProBerry.in', href: 'mailto:support@ProBerry.in' },
      { label: 'Location', href: '#' },
      { label: 'Address', href: '#' },
    ],
  },
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export function Footer() {
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
          <h4 className="text-lg lg:text-[28px] mb-4">Popular Categories</h4>
        </div>

        {/* Divider */}
        <div className="border-t border-[#F6F6F6]/30 pt-4 lg:pt-6">
          {/* Copyright */}
          <p className="text-sm lg:text-lg text-center">
            Copyright © 2025 ProBerry. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
