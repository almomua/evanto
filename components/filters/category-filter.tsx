'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { categoriesApi, Category } from '@/lib/api/products';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

interface CategoryFilterProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

export function CategoryFilter({ selectedCategories, onCategoryChange }: CategoryFilterProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const t = useTranslations('products');
  const locale = useLocale();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesApi.getAll();
        setCategories(data);
      } catch (error) {
        console.error('Failed to load categories', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const toggleCategory = (categorySlug: string) => {
    const isSelected = selectedCategories.includes(categorySlug);
    if (isSelected) {
      onCategoryChange(selectedCategories.filter((c) => c !== categorySlug));
    } else {
      onCategoryChange([...selectedCategories, categorySlug]);
    }
  };

  const toggleExpand = (categoryId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  if (loading) {
    return (
      <div className="px-[30px] py-5 flex justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-[#8A33FD]" />
      </div>
    );
  }

  return (
    <div className="px-[30px] py-5">
      <ul className="space-y-[18px]">
        {categories.map((category) => (
          <li key={category._id}>
            <button
              onClick={() => toggleCategory(category.slug)}
              className={clsx(
                'w-full flex items-center justify-between text-left text-base transition-colors',
                selectedCategories.includes(category.slug)
                  ? 'text-[#8A33FD] font-medium'
                  : 'text-[#8A8989] hover:text-[#3C4242]'
              )}
            >
              <span>{locale === 'ar' && (category as any).nameAr ? (category as any).nameAr : category.name}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </li>
        ))}
        {categories.length === 0 && (
          <li className="text-sm text-gray-400">{t('noCategoriesFound')}</li>
        )}
      </ul>
    </div>
  );
}
