import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Providers } from './providers';
import { AuthProvider } from '@/lib/context/auth-context';
import { PostHogProvider } from '@/lib/posthog';
import { FloatingChat } from '@/components/layout/floating-chat';

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const messages = await getMessages();

    return (
        <NextIntlClientProvider messages={messages}>
            <PostHogProvider>
                <Providers>
                    <AuthProvider>
                        {children}
                        <FloatingChat />
                    </AuthProvider>
                </Providers>
            </PostHogProvider>
        </NextIntlClientProvider>
    );
}
