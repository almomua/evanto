import type { Metadata } from "next";
import { Tajawal, Cairo, Anton, Anton_SC } from "next/font/google";
import { Providers } from "./providers";
import { AuthProvider } from "@/lib/context/auth-context";
import { PostHogProvider } from "@/lib/posthog";
import { FloatingChat } from "@/components/layout/floating-chat";
import "./globals.css";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["latin", "arabic"],
  weight: ["300", "400", "500", "700", "800", "900"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
});

const antonSC = Anton_SC({
  variable: "--font-anton-sc",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "ProBerry - Beauty & Cosmetics",
  description: "Luxury Beauty at Smart Prices - Shop skincare, makeup, perfumes and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${tajawal.variable} ${cairo.variable} ${anton.variable} ${antonSC.variable} font-sans antialiased`} suppressHydrationWarning>
        <PostHogProvider>
          <Providers>
            <AuthProvider>
              {children}
              <FloatingChat />
            </AuthProvider>
          </Providers>
        </PostHogProvider>
      </body>
    </html>
  );
}
