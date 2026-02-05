import api from '@/lib/axios';

export interface Product {
  _id: string;
  slug: string;
  name: string;
  description: string;
  shortDesc?: string;
  price: number;
  discount: number;
  images: { secure_url: string }[];
  category: { _id: string; name: string; slug: string };
  brand: { _id: string; name: string; slug: string };
  isFeatured: boolean;
  ratingsAverage: number;
  ratingsQuantity: number;
  variants: any[];
  ingredients?: string;
  howToUse?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: { secure_url: string };
  description?: string;
  isActive?: boolean;
  parentCategory?: string;
}

export const productsApi = {
  // Get all products with optional filtering
  getAll: async (params?: Record<string, any>): Promise<Product[]> => {
    const response = await api.get('/products', { params });
    return response.data.data.docs;
  },

  // Get single product by slug or ID (backend supports both)
  getBySlug: async (slugOrId: string): Promise<Product | undefined> => {
    try {
      const response = await api.get(`/products/${slugOrId}`);
      return response.data.data.doc;
    } catch (error) {
      return undefined;
    }
  },

  // Get products by category slug
  // Since backend filters by Category ID normally, we might need to first resolve slug to ID 
  // or update backend to support filtering by category slug via population.
  // For now, let's assume valid ID is passed or handle slug resolution if needed.
  // Ideally, backend should support ?category=id
  getByCategory: async (categoryId: string): Promise<Product[]> => {
    const response = await api.get('/products', { params: { category: categoryId } });
    return response.data.data.docs;
  },

  // Get featured products
  getFeatured: async (): Promise<Product[]> => {
    const response = await api.get('/products', { params: { isFeatured: true } });
    return response.data.data.docs;
  },

  // Search products
  search: async (query: string): Promise<Product[]> => {
    const response = await api.get('/products', { params: { search: query } });
    return response.data.data.docs;
  },
};

export const categoriesApi = {
  // Get all categories
  getAll: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response.data.data.docs;
  },

  // Get makeup categories (Example: filter by specific parent or logic)
  // Logic depends on how categories are structured. Assuming we fetch all and filter client side 
  // OR backend has specific endpoints. For now, fetch all.
  getMakeup: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    // This needs proper implementation based on DB structure
    return response.data.data.docs;
  },

  // Get perfume categories
  getPerfume: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response.data.data.docs;
  },

  // Get category by slug
  getBySlug: async (slug: string): Promise<Category | undefined> => {
    // This requires a backend endpoint to find by slug, or filtering list
    const response = await api.get('/categories');
    return response.data.data.docs.find((c: Category) => c.slug === slug);
  },
};

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: { secure_url: string };
}

export const brandsApi = {
  // Get all brands
  getAll: async (): Promise<Brand[]> => {
    const response = await api.get('/brands');
    return response.data.data.docs;
  },

  // Get brand by slug
  getBySlug: async (slug: string): Promise<Brand | undefined> => {
    const response = await api.get('/brands');
    return response.data.data.docs.find((b: Brand) => b.slug === slug);
  },
};
