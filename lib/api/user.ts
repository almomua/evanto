import api from '@/lib/axios';
import { Product } from './products';

export interface Address {
    _id: string;
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phoneNumber?: string;
    isDefault?: boolean;
    type?: 'shipping' | 'billing';
}

export const userApi = {
    updateProfile: async (data: { name?: string; email?: string; phone?: string; age?: number }): Promise<any> => {
        const response = await api.patch('/user/updateMe', data);
        return response.data.data.user;
    },

    // Wishlist
    getWishlist: async (): Promise<Product[]> => {
        const response = await api.get('/user/wishlist');
        return response.data.data.wishlist || [];
    },

    addToWishlist: async (productId: string): Promise<any> => {
        const response = await api.post('/user/wishlist', { productId });
        return response.data;
    },

    removeFromWishlist: async (productId: string): Promise<any> => {
        const response = await api.delete(`/user/wishlist/${productId}`);
        return response.data;
    },

    // Addresses
    getAddresses: async (): Promise<Address[]> => {
        const response = await api.get('/user/addresses');
        return response.data.data.addresses;
    },

    createAddress: async (data: Partial<Address>): Promise<Address> => {
        const response = await api.post('/user/addresses', data);
        return response.data.data.address;
    },

    updateAddress: async (id: string, data: Partial<Address>): Promise<Address> => {
        const response = await api.patch(`/user/addresses/${id}`, data);
        return response.data.data.address;
    },

    deleteAddress: async (id: string): Promise<void> => {
        await api.delete(`/user/addresses/${id}`);
    },
};
