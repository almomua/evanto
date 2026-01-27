import api from '@/lib/axios';

export interface User {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    image?: { secure_url: string };
    wishlist?: any[];
}

export const authApi = {
    login: async (email: string, password: string): Promise<{ user: User }> => {
        const response = await api.post('/auth/login', { email, password });
        return response.data.data;
    },

    register: async (data: any): Promise<{ user: User }> => {
        const response = await api.post('/auth/signup', data);
        return response.data.data;
    },

    logout: async (): Promise<void> => {
        await api.post('/auth/logout');
    },

    getProfile: async (): Promise<{ user: User }> => {
        // Current backend doesn't have a dedicated /me endpoint that returns just the user
        // We can use /user/:id if we knew the ID, or implement /auth/me
        // For now, let's assume the user data is persisted or we add /auth/me
        // UPDATE: We need a way to validate session. 
        // Let's use a new endpoint /auth/me or assume /user/me works if we implement it.
        // Plan B: Use a cheap protected route to validate.
        // Better: Add /auth/me to backend or use /user/me
        const response = await api.get('/user/me');
        return response.data.data;
    },
};
