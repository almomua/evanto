'use client';

import { useAuth } from '@/lib/context/auth-context';
import { useRouter } from '@/i18n/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export function AdminGuard({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && (!user || user.role !== 'admin')) {
            router.push('/');
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-[#1E6BFF]" />
                    <p className="text-gray-500 font-medium">Verifying admin access...</p>
                </div>
            </div>
        );
    }

    if (!user || user.role !== 'admin') {
        return null; // Will redirect via useEffect
    }

    return <>{children}</>;
}
