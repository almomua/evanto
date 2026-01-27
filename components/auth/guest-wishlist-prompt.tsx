'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/context/auth-context';

interface GuestWishlistPromptProps {
    itemCount: number;
}

/**
 * Shows a prompt for guest users on the wishlist page
 * Encourages them to sign in to sync their wishlist
 */
export function GuestWishlistPrompt({ itemCount }: GuestWishlistPromptProps) {
    const { user } = useAuth();

    // Don't show if user is logged in
    if (user) return null;

    return (
        <div className="bg-gradient-to-r from-[#8A33FD]/10 to-[#1E6BFF]/10 border border-[#8A33FD]/20 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#8A33FD] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-[#3C4242] mb-1">
                        {itemCount > 0 ? `You have ${itemCount} item${itemCount > 1 ? 's' : ''} in your wishlist!` : 'Start your wishlist!'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                        Sign in to save your wishlist across devices and never lose your favorite items.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <Link
                            href="/auth/login"
                            className="px-4 py-1.5 bg-[#8A33FD] text-white text-sm rounded-lg font-medium hover:bg-[#7928E8] transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/auth/register"
                            className="px-4 py-1.5 border border-[#8A33FD] text-[#8A33FD] text-sm rounded-lg font-medium hover:bg-[#8A33FD]/10 transition-colors"
                        >
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
