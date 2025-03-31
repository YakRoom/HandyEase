import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryWrapper from "@/components/wrappers/QueryWrapper";
import { AppProvider } from "@/context/AppContext";
import { ErrorBoundary } from "@/components/wrappers/ErrorBoundary";
import Footer from "@/components/Footer";
import PageAnimation from "@/components/PageAnimation/PageAnimation";
// import Header from "@/components/AuthHeader";

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
  icons: {
    icon: "https://static.vecteezy.com/system/resources/previews/028/712/640/non_2x/initial-h-letter-logo-design-template-monogram-and-creative-alphabet-letters-icon-illustration-vector.jpg", // Path to favicon in the public folder
  },
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
              <AppProvider>
            <PageAnimation>
                
                {children}
              
            </PageAnimation>
              </AppProvider>

              <Footer />
          </QueryWrapper>
        </ErrorBoundary>
      </body>
    </html>
  );
}
