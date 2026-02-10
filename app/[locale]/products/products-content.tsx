'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FilterSidebar } from '@/components/filters/filter-sidebar';
import { ProductGrid } from '@/components/product/product-grid';
import { SortTabs, SortOption } from '@/components/product/sort-tabs';
import { Pagination } from '@/components/product/pagination';
import { productsApi, Product, brandsApi, Brand } from '@/lib/api/products';
import { Loader2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { getLocalizedField } from '@/lib/utils/localization';

const ITEMS_PER_PAGE = 9;

export function ProductsPageContent() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  const locale = useLocale();
  const t = useTranslations('products');

  // Data state
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [allBrands, setAllBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);

  // Filter state
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryFromUrl ? [categoryFromUrl] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [maxPrice, setMaxPrice] = useState(200000);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);



  // Sort and pagination state
  const [activeSort, setActiveSort] = useState<SortOption>('new');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch products and brands
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [productsData, brandsData] = await Promise.all([
          productsApi.getAll(),
          brandsApi.getAll()
        ]);

        setAllProducts(productsData);
        setAllBrands(brandsData);

        // Extract sizes from variants
        const sizeSet = new Set<string>();
        productsData.forEach(product => {
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
        const calculatedMaxPrice = Math.max(...productsData.map(p => p.price), 10000);
        setMaxPrice(calculatedMaxPrice);
        setPriceRange([0, calculatedMaxPrice]);

      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Calculate available brands based on current category filters
  const availableBrands = useMemo(() => {
    if (selectedCategories.length === 0) return allBrands;

    // Get all brand slugs that have products in the selected categories
    const brandSlugsInCategories = new Set(
      allProducts
        .filter(p => p.category?.slug && selectedCategories.includes(p.category.slug))
        .map(p => p.brand?.slug)
        .filter(Boolean)
    );

    return allBrands.filter(brand => brandSlugsInCategories.has(brand.slug));
  }, [allBrands, allProducts, selectedCategories]);

  // Update selected category/brand when URL param changes
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategories([categoryFromUrl.toLowerCase()]);
    } else {
      setSelectedCategories([]);
    }

    const brandHandle = searchParams.get('brand');
    if (brandHandle) {
      setSelectedBrands([brandHandle.toLowerCase()]);
    } else {
      setSelectedBrands([]);
    }
  }, [categoryFromUrl, searchParams]);

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
        p.category?.slug && selectedCategories.includes(p.category.slug)
      );
    }

    // Filter by brand if selected
    if (selectedBrands.length > 0) {
      products = products.filter((p) =>
        p.brand?.slug && selectedBrands.includes(p.brand.slug)
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
  }, [allProducts, selectedCategories, selectedBrands, priceRange, activeSort, selectedSizes, searchParams]);

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

  const handleBrandChange = (brands: string[]) => {
    setSelectedBrands(brands);
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
            selectedBrands={selectedBrands}
            onBrandChange={handleBrandChange}
            availableBrands={availableBrands}
            brandsLoading={loading}
            priceRange={priceRange}
            onPriceChange={handlePriceChange}
            selectedSizes={selectedSizes}
            onSizeChange={handleSizeChange}
            availableSizes={availableSizes}
            maxPrice={maxPrice}
          />

          {/* Main Content */}
          <div className="flex-1 px-4 sm:px-6 lg:px-10 py-4 lg:py-8">
            {/* Sort Tabs */}
            <SortTabs
              category={categoryFromUrl || t('all')}
              activeSort={activeSort}
              onSortChange={handleSortChange}
            />

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin h-10 w-10 text-[#8A33FD]" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <p className="text-lg">{t('noResults')}</p>
              </div>
            ) : (
              <>
                {/* Product Grid */}
                {/* Product Grid */}
                <ProductGrid
                  products={paginatedProducts.map(p => ({
                    id: p._id,
                    slug: p.slug,
                    name: getLocalizedField(p, 'name', locale),
                    brand: getLocalizedField(p.brand || {}, 'name', locale) || getLocalizedField(p.category || {}, 'name', locale) || 'ProBerry',
                    price: p.price,
                    image: p.images?.[0]?.secure_url || '',
                    shortDesc: getLocalizedField(p, 'shortDesc', locale),
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
