'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Initialize PostHog only in browser
if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        person_profiles: 'identified_only',
        capture_pageview: false,
        capture_pageleave: true,
        autocapture: true,
    });
}

// Page view tracker component
function PostHogPageView() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (pathname) {
            let url = window.origin + pathname;
            if (searchParams && searchParams.toString()) {
                url = url + `?${searchParams.toString()}`;
            }
            posthog.capture('$pageview', { $current_url: url });
        }
    }, [pathname, searchParams]);

    return null;
}

// Provider component
export function PostHogProvider({ children }: { children: React.ReactNode }) {
    return (
        <PHProvider client={posthog}>
            <PostHogPageView />
            {children}
        </PHProvider>
    );
}

// Utility functions for custom events
export const analytics = {
    identify: (userId: string, properties?: Record<string, any>) => {
        posthog.identify(userId, properties);
    },

    reset: () => {
        posthog.reset();
    },

    track: (eventName: string, properties?: Record<string, any>) => {
        posthog.capture(eventName, properties);
    },

    addToCart: (productId: string, productName: string, price: number, quantity: number = 1) => {
        posthog.capture('add_to_cart', {
            product_id: productId,
            product_name: productName,
            price,
            quantity,
            currency: 'IQD',
        });
    },

    removeFromCart: (productId: string, productName: string) => {
        posthog.capture('remove_from_cart', {
            product_id: productId,
            product_name: productName,
        });
    },

    viewProduct: (productId: string, productName: string, category?: string, price?: number) => {
        posthog.capture('view_product', {
            product_id: productId,
            product_name: productName,
            category,
            price,
            currency: 'IQD',
        });
    },

    search: (query: string, resultsCount?: number) => {
        posthog.capture('search', {
            query,
            results_count: resultsCount,
        });
    },

    startCheckout: (cartTotal: number, itemCount: number) => {
        posthog.capture('start_checkout', {
            cart_total: cartTotal,
            item_count: itemCount,
            currency: 'IQD',
        });
    },

    completeOrder: (orderId: string, orderTotal: number, itemCount: number) => {
        posthog.capture('complete_order', {
            order_id: orderId,
            order_total: orderTotal,
            item_count: itemCount,
            currency: 'IQD',
        });
    },
};

export default posthog;
