import api from '@/lib/axios';
import { User } from './auth';
import { Product, Category } from './products';
import { Order } from './orders';

export interface AdminStats {
    totalSales: number;
    totalOrders: number;
    totalProducts: number;
    totalUsers: number;
    recentOrders: Order[];
}

export interface Coupon {
    _id: string;
    code: string;
    discountType: 'Percentage' | 'Fixed';
    value: number;
    minPurchase: number;
    expiryDate: string;
    usageLimit: number;
    usedCount: number;
    isActive: boolean;
    createdAt: string;
}

export interface Transaction {
    _id: string;
    order: { _id: string };
    customer: { _id: string; name: string; email: string };
    amount: number;
    method: 'CC' | 'COD' | 'Bank';
    status: 'Pending' | 'Completed' | 'Canceled';
    transactionDate: string;
}

export interface Brand {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    createdAt?: string;
}

export const adminApi = {
    // Dashboard Stats
    getStats: async (): Promise<AdminStats> => {
        try {
            const [statsRes, ordersRes] = await Promise.all([
                api.get('/stats/dashboard'),
                api.get('/orders?limit=5&sort=-createdAt')
            ]);

            const stats = statsRes.data.data;
            const recentOrders = ordersRes.data.data.docs;

            return {
                totalSales: stats.totalSales,
                totalOrders: stats.totalOrders,
                totalProducts: stats.totalProducts,
                totalUsers: stats.totalUsers,
                recentOrders: recentOrders,
            };
        } catch (error) {
            console.error("Failed to fetch admin stats", error);
            throw error;
        }
    },

    getBestSellers: async (): Promise<any[]> => {
        const response = await api.get('/stats/best-sellers');
        return response.data.data.bestSellers;
    },

    getCategoryDistribution: async (): Promise<any[]> => {
        const response = await api.get('/stats/categories');
        return response.data.data.categoryStats;
    },

    // Products
    getProducts: async (params?: any): Promise<Product[]> => {
        const response = await api.get('/products', { params: { limit: 100, ...params } });
        return response.data.data.docs;
    },

    getProduct: async (id: string): Promise<Product> => {
        const response = await api.get(`/products/${id}`);
        return response.data.data.doc;
    },

    createProduct: async (productData: any): Promise<Product> => {
        const response = await api.post('/products', productData);
        return response.data.data.doc || response.data.data.product;
    },

    updateProduct: async (id: string, productData: any): Promise<Product> => {
        const response = await api.patch(`/products/${id}`, productData);
        return response.data.data.doc || response.data.data.product;
    },

    deleteProduct: async (id: string): Promise<void> => {
        await api.delete(`/products/${id}`);
    },

    // Variants
    addVariant: async (productId: string, variantData: any): Promise<Product> => {
        const response = await api.post(`/products/${productId}/variants`, variantData);
        return response.data.data.product;
    },

    updateVariant: async (productId: string, variantId: string, variantData: any): Promise<Product> => {
        const response = await api.patch(`/products/${productId}/variants/${variantId}`, variantData);
        return response.data.data.product;
    },

    deleteVariant: async (productId: string, variantId: string): Promise<void> => {
        await api.delete(`/products/${productId}/variants/${variantId}`);
    },

    // Categories
    getCategory: async (id: string): Promise<Category> => {
        const response = await api.get(`/categories/${id}`);
        return response.data.data.doc || response.data.data.category;
    },

    createCategory: async (categoryData: any): Promise<Category> => {
        const response = await api.post('/categories', categoryData);
        return response.data.data.doc || response.data.data.category;
    },

    updateCategory: async (id: string, categoryData: any): Promise<Category> => {
        const response = await api.patch(`/categories/${id}`, categoryData);
        return response.data.data.doc || response.data.data.category;
    },

    deleteCategory: async (id: string): Promise<void> => {
        await api.delete(`/categories/${id}`);
    },

    // Users
    getUsers: async (): Promise<User[]> => {
        const response = await api.get('/user');
        return response.data.data.docs || response.data.data.users;
    },

    deleteUser: async (id: string): Promise<void> => {
        await api.delete(`/user/${id}`);
    },

    // Orders
    getOrders: async (): Promise<Order[]> => {
        const response = await api.get('/orders');
        return response.data.data.docs;
    },

    // Coupons
    getCoupons: async (): Promise<Coupon[]> => {
        const response = await api.get('/coupons');
        return response.data.data.docs;
    },

    getCoupon: async (id: string): Promise<Coupon> => {
        const response = await api.get(`/coupons/${id}`);
        return response.data.data.doc;
    },

    createCoupon: async (couponData: any): Promise<Coupon> => {
        const response = await api.post('/coupons', couponData);
        return response.data.data.doc;
    },

    updateCoupon: async (id: string, couponData: any): Promise<Coupon> => {
        const response = await api.patch(`/coupons/${id}`, couponData);
        return response.data.data.doc;
    },

    deleteCoupon: async (id: string): Promise<void> => {
        await api.delete(`/coupons/${id}`);
    },

    // Transactions
    getTransactions: async (): Promise<Transaction[]> => {
        const response = await api.get('/transactions');
        return response.data.data.docs;
    },

    // Brands
    getBrands: async (): Promise<Brand[]> => {
        const response = await api.get('/brands');
        return response.data.data.docs;
    },

    getBrand: async (id: string): Promise<Brand> => {
        const response = await api.get(`/brands/${id}`);
        return response.data.data.doc;
    },

    createBrand: async (brandData: any): Promise<Brand> => {
        const response = await api.post('/brands', brandData);
        return response.data.data.doc;
    },

    updateBrand: async (id: string, brandData: any): Promise<Brand> => {
        const response = await api.patch(`/brands/${id}`, brandData);
        return response.data.data.doc;
    },

    deleteBrand: async (id: string): Promise<void> => {
        await api.delete(`/brands/${id}`);
    },
};

