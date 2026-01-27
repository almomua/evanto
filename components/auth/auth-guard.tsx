'use client';

import { useAuth } from '@/lib/context/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

interface AuthGuardProps {
    children: React.ReactNode;
    /** If true, redirects guest to login. If false, shows prompt instead */
    redirectOnGuest?: boolean;
    /** Custom message to show guests */
    guestMessage?: string;
}

/**
 * AuthGuard protects user account pages.
 * - Shows loading state while checking auth
 * - Redirects to login or shows a prompt for guests
 * - Renders children for authenticated users
 */
export function AuthGuard({
    children,
    redirectOnGuest = false,
    guestMessage = "Please sign in to access this page"
}: AuthGuardProps) {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading && !user && redirectOnGuest) {
            // Store the intended destination for redirect after login
            sessionStorage.setItem('redirectAfterLogin', pathname);
            router.push('/auth/login');
        }
    }, [user, isLoading, redirectOnGuest, router, pathname]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-[#8A33FD]" />
                    <p className="text-gray-500 text-sm">Loading...</p>
                </div>
            </div>
        );
    }

    // Guest user - show prompt
    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#807D7E" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-[#3C4242] mb-2">Sign in Required</h2>
                    <p className="text-gray-500 mb-6">{guestMessage}</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/auth/login"
                            className="px-6 py-2.5 bg-[#8A33FD] text-white rounded-lg font-medium hover:bg-[#7928E8] transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/auth/register"
                            className="px-6 py-2.5 border border-gray-300 text-[#3C4242] rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Authenticated user - render children
    return <>{children}</>;
}

/**
 * Hook to check if user is authenticated
 */
export function useRequireAuth() {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/auth/login');
        }
    }, [user, isLoading, router]);

    return { user, isLoading, isAuthenticated: !!user };
}
