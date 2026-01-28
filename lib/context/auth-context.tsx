"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authApi, User } from "@/lib/api/auth";
import { userApi } from "@/lib/api/user";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { useRouter } from "next/navigation";
import { analytics } from "@/lib/posthog";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Check auth status on mount
    useEffect(() => {
        async function checkAuth() {
            try {
                const { user } = await authApi.getProfile();
                setUser(user);
                // Fetch and set server wishlist for authenticated user
                if (user) {
                    try {
                        const wishlistData = await userApi.getWishlist();
                        const wishlistStore = useWishlistStore.getState();
                        wishlistStore.setServerItems(wishlistData.map((p: any) => ({
                            id: p._id,
                            name: p.name,
                            brand: p.category?.name || 'Brand',
                            price: p.price,
                            image: p.images?.[0]?.secure_url || ''
                        })));
                    } catch (e) {
                        console.error("Failed to fetch wishlist on auth", e);
                    }
                }
            } catch (error) {
                // Not logged in or session expired
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        }
        checkAuth();
    }, []);

    const syncWishlist = async () => {
        const localWishlistStore = useWishlistStore.getState();
        const localItems = localWishlistStore.items;

        if (localItems.length > 0) {
            try {
                // Filter out mock items (usually have simple IDs like '1', 'listing-1')
                // Valid MongoDB IDs are 24 hex characters
                const validItems = localItems.filter(item => /^[0-9a-fA-F]{24}$/.test(item.id));

                // Use sequential execution to avoid race conditions and ensure reliability
                for (const item of validItems) {
                    await userApi.addToWishlist(item.id);
                }

                // Clear local wishlist regardless of sync result to avoid stale/invalid items persisting
                localWishlistStore.clearWishlist();
            } catch (error) {
                console.error("Failed to sync wishlist", error);
            }
        }
    };

    const login = async (email: string, password: string) => {
        const { user, token } = await authApi.login(email, password);

        if (token) {
            localStorage.setItem("token", token);
        }

        // Sync local wishlist to server
        await syncWishlist();

        // Fetch merged server wishlist and update store
        try {
            const wishlistData = await userApi.getWishlist();
            const wishlistStore = useWishlistStore.getState();
            wishlistStore.setServerItems(wishlistData.map((p: any) => ({
                id: p._id,
                name: p.name,
                brand: p.category?.name || 'Brand',
                price: p.price,
                image: p.images?.[0]?.secure_url || ''
            })));
        } catch (e) {
            console.error("Failed to fetch wishlist after login", e);
        }

        setUser(user);

        // Identify user in PostHog analytics
        analytics.identify(user._id, {
            email: user.email,
            name: user.name,
            role: user.role,
        });

        // Check for redirect destination (for users who were redirected to login)
        const redirectTo = typeof window !== 'undefined'
            ? sessionStorage.getItem('redirectAfterLogin')
            : null;

        if (redirectTo) {
            sessionStorage.removeItem('redirectAfterLogin');
            router.push(redirectTo);
        } else if (user.role === 'admin') {
            router.push('/admin');
        } else {
            router.push('/');
        }
    };

    const register = async (data: any) => {
        const { user, token } = await authApi.register(data);

        if (token) {
            localStorage.setItem("token", token);
        }

        // Sync local wishlist to server
        await syncWishlist();

        // Fetch merged server wishlist and update store
        try {
            const wishlistData = await userApi.getWishlist();
            const wishlistStore = useWishlistStore.getState();
            wishlistStore.setServerItems(wishlistData.map((p: any) => ({
                id: p._id,
                name: p.name,
                brand: p.category?.name || 'Brand',
                price: p.price,
                image: p.images?.[0]?.secure_url || ''
            })));
        } catch (e) {
            console.error("Failed to fetch wishlist after register", e);
        }

        setUser(user);

        // Identify user in PostHog analytics
        analytics.identify(user._id, {
            email: user.email,
            name: user.name,
            role: user.role,
        });

        router.push('/');
    };

    const logout = async () => {
        await authApi.logout();
        localStorage.removeItem("token");
        // Clear server wishlist state
        const wishlistStore = useWishlistStore.getState();
        wishlistStore.clearServerItems();
        setUser(null);

        // Reset PostHog user tracking
        analytics.reset();

        router.push('/auth/login');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
