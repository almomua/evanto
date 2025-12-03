import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  image: string;
  href?: string;
}

export function CategoryCard({ title, image, href = '#' }: CategoryCardProps) {
  return (
    <div className="category-card flex flex-col gap-4">
      {/* Image */}
      <div className="relative w-[270px] h-[393px] rounded-[10px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="270px"
          unoptimized
        />
      </div>

      {/* Info */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[#191919] text-lg font-medium tracking-tight">{title}</h3>
          <p className="text-[#7F7F7F] text-sm tracking-tight">Explore Now!</p>
        </div>
        <Link
          href={href}
          className="w-5 h-5 flex items-center justify-center text-[#191919] hover:text-[#8A33FD] transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

// Variant for makeup products with slightly different styling
interface MakeupCategoryCardProps extends CategoryCardProps {
  overlay?: boolean;
}

export function MakeupCategoryCard({ title, image, href = '#', overlay = false }: MakeupCategoryCardProps) {
  return (
    <div className="category-card flex flex-col gap-3">
      {/* Image */}
      <div className="relative w-[270px] h-[393px] rounded-[10px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="270px"
          unoptimized
        />
        {overlay && (
          <div className="absolute inset-0 bg-black/10" />
        )}
      </div>

      {/* Info */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[#2A2F2F] text-lg font-medium tracking-tight">{title}</h3>
          <p className="text-[#7F7F7F] text-sm tracking-tight">Explore Now!</p>
        </div>
        <Link
          href={href}
          className="w-5 h-5 flex items-center justify-center text-[#191919] hover:text-[#8A33FD] transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

