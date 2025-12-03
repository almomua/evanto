import Image from 'next/image';
import { PRODUCT_DETAIL_ASSETS } from '@/lib/assets-product-detail';

const features = [
  { icon: PRODUCT_DETAIL_ASSETS.securePayment, label: 'Secure payment' },
  { icon: PRODUCT_DETAIL_ASSETS.sizeFit, label: 'Size & Fit' },
  { icon: PRODUCT_DETAIL_ASSETS.freeShipping, label: 'Free shipping' },
  { icon: PRODUCT_DETAIL_ASSETS.freeReturns, label: 'Free Shipping & Returns' },
];

export function ProductFeatures() {
  return (
    <div className="grid grid-cols-2 gap-x-20 gap-y-5 pt-10 border-t border-[#BEBCBD]">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-4">
          <div className="relative w-11 h-11">
            <Image
              src={feature.icon}
              alt={feature.label}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <span className="text-[#3C4242] text-lg">{feature.label}</span>
        </div>
      ))}
    </div>
  );
}

