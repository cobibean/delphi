// src/app/layout.tsx

// sequenceDiagram
    //User->>dApp: Clicks "Buy for X METIS"
    //dApp->>WMETIS Contract: deposit() with value=X METIS
    //WMETIS Contract->>User: Mints X WMETIS
    //dApp->>Marketplace: buyFromListing() with WMETIS

"use client";

import "./globals.css"; // Global styles
import { Inter } from 'next/font/google'; // Import Inter font
import { ThirdwebProvider } from "thirdweb/react"; // Thirdweb provider
import { Toaster } from "@/app/ui/toaster"; // Optional: Notification system
import { ThemeProvider } from "@/app/context/ThemeContext"; // Optional: Theme context
import { TransactionProvider } from "@/app/providers/TransactionProvider"; // Transaction provider
import Header from "@/app/components/SharedComponents/Header"; // Header component
import Footer from "@/app/components/SharedComponents/Footer"; // Footer component
import { WalletProvider } from './providers/WalletProvider';

// Initialize Inter font
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <ThirdwebProvider>
            <TransactionProvider>
              <WalletProvider>
                {/* Header */}
                <Header />

                {/* Main Content */}
                <main className="container mx-auto p-4">{children}</main>

                {/* Footer */}
                <Footer />

                {/* Notifications */}
                <Toaster />
              </WalletProvider>
            </TransactionProvider>
          </ThirdwebProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}