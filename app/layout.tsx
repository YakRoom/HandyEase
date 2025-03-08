import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryWrapper from "@/components/wrappers/QueryWrapper";
import { AppProvider } from "@/context/AppContext";
import { ErrorBoundary } from "@/components/wrappers/ErrorBoundary";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Handymate",
  description: "Get it done with Handymate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          <QueryWrapper>
            <AppProvider>{children}</AppProvider>
            <Footer />
          </QueryWrapper>
        </ErrorBoundary>
      </body>
    </html>
  );
}
