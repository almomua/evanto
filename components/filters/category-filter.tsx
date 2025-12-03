'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

const categories = [
  { id: 'category', label: 'Category', hasChildren: true },
  { id: 'makeup', label: 'Makeup', hasChildren: true },
  { id: 'shampoos', label: 'Shampoos', hasChildren: true },
  { id: 'cleansers', label: 'Cleansers', hasChildren: false },
  { id: 'haircare', label: 'Haircare', hasChildren: true },
  { id: 'conditioners', label: 'Conditioners', hasChildren: false },
  { id: 'body-sprays', label: 'Body Sprays', hasChildren: false },
  { id: 'hair-masks', label: 'Hair Masks', hasChildren: false },
  { id: 'treatments', label: 'Treatments', hasChildren: false },
];

interface CategoryFilterProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

export function CategoryFilter({ selectedCategories, onCategoryChange }: CategoryFilterProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    const isSelected = selectedCategories.includes(categoryId);
    if (isSelected) {
      onCategoryChange(selectedCategories.filter((c) => c !== categoryId));
    } else {
      onCategoryChange([...selectedCategories, categoryId]);
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

  return (
    <div className="px-[30px] py-5">
      <ul className="space-y-[18px]">
        {categories.map((category) => (
          <li key={category.id}>
            <button
              onClick={() => toggleCategory(category.id)}
              className={clsx(
                'w-full flex items-center justify-between text-left text-base transition-colors',
                selectedCategories.includes(category.id)
                  ? 'text-[#8A33FD] font-medium'
                  : 'text-[#8A8989] hover:text-[#3C4242]'
              )}
            >
              <span>{category.label}</span>
              {category.hasChildren && (
                <ChevronRight
                  onClick={(e) => toggleExpand(category.id, e)}
                  className={clsx(
                    'w-4 h-4 transition-transform cursor-pointer',
                    expandedCategories.includes(category.id) && 'rotate-90'
                  )}
                />
              )}
              {!category.hasChildren && (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

