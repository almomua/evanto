import { useQuery } from '@tanstack/react-query';
import { productsApi, categoriesApi, type Product, type Category } from '@/lib/api/products';

// Product hooks
export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: productsApi.getAll,
  });
}

export function useProduct(id: string) {
  return useQuery<Product | undefined>({
    queryKey: ['product', id],
    queryFn: () => productsApi.getBySlug(id),
    enabled: !!id,
  });
}

export function useProductsByCategory(category: string) {
  return useQuery<Product[]>({
    queryKey: ['products', 'category', category],
    queryFn: () => productsApi.getByCategory(category),
    enabled: !!category,
  });
}

export function useFeaturedProducts() {
  return useQuery<Product[]>({
    queryKey: ['products', 'featured'],
    queryFn: productsApi.getFeatured,
  });
}

export function useProductSearch(query: string) {
  return useQuery<Product[]>({
    queryKey: ['products', 'search', query],
    queryFn: () => productsApi.search(query),
    enabled: query.length > 2,
  });
}

// Category hooks
export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: categoriesApi.getAll,
  });
}

export function useMakeupCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories', 'makeup'],
    queryFn: categoriesApi.getMakeup,
  });
}

export function usePerfumeCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories', 'perfume'],
    queryFn: categoriesApi.getPerfume,
  });
}

export function useCategoryBySlug(slug: string) {
  return useQuery<Category | undefined>({
    queryKey: ['category', slug],
    queryFn: () => categoriesApi.getBySlug(slug),
    enabled: !!slug,
  });
}



