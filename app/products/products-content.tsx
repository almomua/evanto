'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FilterSidebar } from '@/components/filters/filter-sidebar';
import { ProductGrid } from '@/components/product/product-grid';
import { SortTabs } from '@/components/product/sort-tabs';
import { Pagination } from '@/components/product/pagination';
import { listingProducts } from '@/lib/assets-products';

const ITEMS_PER_PAGE = 9;

type SortOption = 'new' | 'recommended';

export function ProductsPageContent() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category') || 'makeup';

  // Filter state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([70, 600]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  
  // Sort and pagination state
  const [activeSort, setActiveSort] = useState<SortOption>('new');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter products
  const filteredProducts = useMemo(() => {
    let products = [...listingProducts];

    // Filter by price range
    products = products.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Filter by category if selected
    if (selectedCategories.length > 0) {
      products = products.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    // Sort
    if (activeSort === 'new') {
      // Reverse for "new" - assuming later items are newer
      products = products.reverse();
    }
    // 'recommended' keeps original order

    return products;
  }, [selectedCategories, priceRange, activeSort]);

  // Paginate
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Reset to page 1 when filters change
  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
    setCurrentPage(1);
  };

  const handlePriceChange = (range: [number, number]) => {
    setPriceRange(range);
    setCurrentPage(1);
  };

  const handleSizeChange = (sizes: string[]) => {
    setSelectedSizes(sizes);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: SortOption) => {
    setActiveSort(sort);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-[1440px] mx-auto">
        <div className="flex">
          {/* Filter Sidebar */}
          <FilterSidebar
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
            priceRange={priceRange}
            onPriceChange={handlePriceChange}
            selectedSizes={selectedSizes}
            onSizeChange={handleSizeChange}
          />

          {/* Main Content */}
          <div className="flex-1 px-10 py-8">
            {/* Sort Tabs */}
            <SortTabs
              category={categoryFromUrl}
              activeSort={activeSort}
              onSortChange={handleSortChange}
            />

            {/* Product Grid */}
            <ProductGrid products={paginatedProducts} columns={3} />

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

