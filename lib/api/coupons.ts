import api from '@/lib/axios';

export interface Coupon {
    _id: string;
    code: string;
    discountType: 'Percentage' | 'Fixed';
    value: number;
    minPurchase: number;
    usageLimit: number;
    usedCount: number;
    isActive: boolean;
    expiryDate: string;
}

export const couponsApi = {
    verify: async (code: string): Promise<Coupon> => {
        const response = await api.post('/coupons/verify', { code });
        return response.data.data.coupon;
    },
};
