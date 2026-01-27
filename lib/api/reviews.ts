import api from '@/lib/axios';

export interface Review {
    _id: string;
    user: {
        _id: string;
        name: string;
        image?: string;
    };
    product: string;
    rating: number;
    title: string;
    comment: string;
    createdAt: string;
    isVerifiedPurchase?: boolean;
}

interface CreateReviewData {
    rating: number;
    title: string;
    comment: string;
}

export const reviewsApi = {
    // Get all reviews for a product
    getByProductId: async (productId: string): Promise<Review[]> => {
        const response = await api.get(`/products/${productId}/reviews`);
        // Check if response structure matches backend (data.data.reviews)
        return response.data.data.reviews;
    },

    // Create a review
    create: async (productId: string, data: CreateReviewData): Promise<Review> => {
        const response = await api.post(`/products/${productId}/reviews`, data);
        return response.data.data.review;
    },
};
