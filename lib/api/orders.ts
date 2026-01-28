import api from '@/lib/axios';

export interface OrderItem {
    product: { _id: string; name: string; price: number; images: { secure_url: string }[] };
    quantity: number;
    subtotal: number;
    variant: {
        price: number;
        images: { secure_url: string }[];
        options: { name: string; value: string }[];
    };
}

export interface Order {
    _id: string;
    items: OrderItem[];
    totalAmount: number;
    status: string;
    paymentStatus: string;
    customer: { _id: string; name: string; email: string; image?: { secure_url: string } };
    shippingAddress: { firstName: string; lastName: string; address: string; city: string; state: string; zipCode: string; country: string };
    createdAt: string;
    paymentMethod: string;
    discountAmount?: number;
    couponCode?: string;
}

export const ordersApi = {
    createOrder: async (data: {
        items: { product: string; quantity: number }[];
        totalAmount: number;
        shippingAddress: any;
        paymentMethod: string;
        couponCode?: string;
    }): Promise<Order> => {
        const response = await api.post('/orders', data);
        return response.data.data.order;
    },

    getOrders: async (): Promise<Order[]> => {
        const response = await api.get('/orders');
        return response.data.data.docs;
    },

    getOrderById: async (id: string): Promise<Order> => {
        const response = await api.get(`/orders/${id}`);
        return response.data.data.doc;
    },

    updateOrder: async (id: string, data: Partial<Order>): Promise<Order> => {
        const response = await api.patch(`/orders/${id}`, data);
        return response.data.data.order;
    },
};
