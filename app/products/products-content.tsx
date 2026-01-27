'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FilterSidebar } from '@/components/filters/filter-sidebar';
import { ProductGrid } from '@/components/product/product-grid';
import { SortTabs, SortOption } from '@/components/product/sort-tabs';
import { Pagination } from '@/components/product/pagination';
import { productsApi, Product } from '@/lib/api/products';
import { Loader2 } from 'lucide-react';

const ITEMS_PER_PAGE = 9;

export function ProductsPageContent() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category');

  // Data state
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);

  // Filter state
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryFromUrl ? [categoryFromUrl] : []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);



  // Sort and pagination state
  const [activeSort, setActiveSort] = useState<SortOption>('new');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch products
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await productsApi.getAll();
        setAllProducts(data);

        // Extract sizes from variants
        const sizeSet = new Set<string>();
        data.forEach(product => {
          if (product.variants && product.variants.length > 0) {
            product.variants.forEach((variant: any) => {
              if (variant.options) {
                variant.options.forEach((opt: any) => {
                  if (opt.name && (opt.name.toLowerCase() === 'size' || opt.name.toLowerCase() === 'sizes')) {
                    sizeSet.add(opt.value);
                  }
                });
              }
            });
          }
        });

        // If sorting logic for sizes is needed (S, M, L), custom sort is better than alphabetical
        const sizeOrder = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
        const sortedSizes = Array.from(sizeSet).sort((a, b) => {
          const idxA = sizeOrder.indexOf(a);
          const idxB = sizeOrder.indexOf(b);
          if (idxA !== -1 && idxB !== -1) return idxA - idxB;
          return a.localeCompare(b);
        });

        setAvailableSizes(sortedSizes);

        // Find max price for range slider
        const maxPrice = Math.max(...data.map(p => p.price), 1000);
        setPriceRange([0, maxPrice]);

      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Update selected category when URL param changes
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategories([categoryFromUrl.toLowerCase()]);
    } else {
      setSelectedCategories([]);
    }
  }, [categoryFromUrl]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let products = [...allProducts];
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';

    // Filter by search query
    if (searchQuery) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery) ||
        p.description?.toLowerCase().includes(searchQuery) ||
        p.shortDesc?.toLowerCase().includes(searchQuery) ||
        // Also search in brand name if brand is effectively the category name in this context, or just category
        p.category?.name?.toLowerCase().includes(searchQuery)
      );
    }

    // Filter by price range
    products = products.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Filter by category if selected
    if (selectedCategories.length > 0) {
      products = products.filter((p) =>
        p.category?.name && selectedCategories.some(c => p.category.name.toLowerCase().includes(c.toLowerCase()))
      );
    }

    // Filter by size
    if (selectedSizes.length > 0) {
      products = products.filter(p => {
        // If product has no variants/sizes, should it be included? Usually no if size filter matches nothing.
        if (!p.variants || p.variants.length === 0) return false;
        return p.variants.some((v: any) =>
          v.options?.some((opt: any) =>
            (opt.name.toLowerCase() === 'size' || opt.name.toLowerCase() === 'sizes') &&
            selectedSizes.includes(opt.value)
          )
        );
      });
    }

    // Sort
    switch (activeSort) {
      case 'new':
        // Assume newer items are at the end, or sort by field if available
        products.reverse();
        break;
      case 'price-low-high':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'recommended':
      default:
        // Keep default order
        break;
    }

    return products;
  }, [allProducts, selectedCategories, priceRange, activeSort, selectedSizes, searchParams]);

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
        <div className="flex flex-col lg:flex-row">
          {/* Filter Sidebar */}
          <FilterSidebar
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
            priceRange={priceRange}
            onPriceChange={handlePriceChange}
            selectedSizes={selectedSizes}
            onSizeChange={handleSizeChange}
            availableSizes={availableSizes}
          />

          {/* Main Content */}
          <div className="flex-1 px-4 sm:px-6 lg:px-10 py-4 lg:py-8">
            {/* Sort Tabs */}
            <SortTabs
              category={categoryFromUrl || 'All'}
              activeSort={activeSort}
              onSortChange={handleSortChange}
            />

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin h-10 w-10 text-[#8A33FD]" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <p className="text-lg">No products found fitting your selection.</p>
              </div>
            ) : (
              <>
                {/* Product Grid */}
                {/* Product Grid */}
                <ProductGrid
                  products={paginatedProducts.map(p => ({
                    id: p._id,
                    slug: p.slug,
                    name: p.name,
                    brand: p.category?.name || 'ProBerry',
                    price: p.price,
                    image: p.images?.[0]?.secure_url || '',
                    shortDesc: p.shortDesc,
                    discount: p.discount
                  }))}
                  columns={3}
                />

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
