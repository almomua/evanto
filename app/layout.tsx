import type { Metadata } from "next";
import { Poppins, Anton, Anton_SC } from "next/font/google";
import { Providers } from "./providers";
import { AuthProvider } from "@/lib/context/auth-context";
import { FloatingChat } from "@/components/layout/floating-chat";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
      <body className={`${poppins.variable} ${anton.variable} ${antonSC.variable} font-sans antialiased`} suppressHydrationWarning>
        <Providers>
          <AuthProvider>
            {children}
            <FloatingChat />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
