import {
  getProducts,
  getProductById,
  getProductsByCategory,
  getFeaturedProducts,
  type Product,
} from '@/lib/data/mock-products';

import {
  getCategories,
  getMakeupCategories,
  getPerfumeCategories,
  getCategoryBySlug,
  type Category,
} from '@/lib/data/mock-categories';

// API base URL - replace with your actual API endpoint
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// For now, we use mock data. Replace these with actual API calls when backend is ready.

export const productsApi = {
  // Get all products
  getAll: async (): Promise<Product[]> => {
    // Replace with: return fetch(`${API_BASE_URL}/products`).then(res => res.json())
    return getProducts();
  },

  // Get single product by ID
  getById: async (id: string): Promise<Product | undefined> => {
    // Replace with: return fetch(`${API_BASE_URL}/products/${id}`).then(res => res.json())
    return getProductById(id);
  },

  // Get products by category
  getByCategory: async (category: string): Promise<Product[]> => {
    // Replace with: return fetch(`${API_BASE_URL}/products?category=${category}`).then(res => res.json())
    return getProductsByCategory(category);
  },

  // Get featured products
  getFeatured: async (): Promise<Product[]> => {
    // Replace with: return fetch(`${API_BASE_URL}/products/featured`).then(res => res.json())
    return getFeaturedProducts();
  },

  // Search products
  search: async (query: string): Promise<Product[]> => {
    // Replace with actual search API
    const products = await getProducts();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase())
    );
  },
};

export const categoriesApi = {
  // Get all categories
  getAll: async (): Promise<Category[]> => {
    return getCategories();
  },

  // Get makeup categories
  getMakeup: async (): Promise<Category[]> => {
    return getMakeupCategories();
  },

  // Get perfume categories
  getPerfume: async (): Promise<Category[]> => {
    return getPerfumeCategories();
  },

  // Get category by slug
  getBySlug: async (slug: string): Promise<Category | undefined> => {
    return getCategoryBySlug(slug);
  },
};

export type { Product, Category };

