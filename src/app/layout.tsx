// src/app/layout.tsx

// sequenceDiagram
    //User->>dApp: Clicks "Buy for X METIS"
    //dApp->>WMETIS Contract: deposit() with value=X METIS
    //WMETIS Contract->>User: Mints X WMETIS
    //dApp->>Marketplace: buyFromListing() with WMETIS

"use client";

import "./globals.css";
import { Space_Grotesk, Comic_Neue } from "next/font/google";
import { ThirdwebProvider } from "thirdweb/react";
import { Toaster } from "@/app/ui/toaster";
import { ThemeProvider } from "@/app/context/ThemeContext";
import { TransactionProvider } from "@/app/providers/TransactionProvider";
import { WalletProvider } from './providers/WalletProvider';
import Header from "@/app/components/SharedComponents/Header";
import Footer from "@/app/components/SharedComponents/Footer";

// Load Comic Sans-like font (Comic Neue is a free alternative)
const comicNeue = Comic_Neue({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-comic",
});

// For body text
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

// Create a local font for Impact-like text
const impactFont = {
  variable: "--font-impact",
};

// Create a local font for Papyrus-like text
const papyrusFont = {
  variable: "--font-papyrus",
};

// We can't export metadata from a client component
// Instead, we'll set the title and description directly in the head element

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <title>DELPHI: The Degen Oracle NFT Marketplace</title>
        <meta name="description" content="A chaotic, meme-filled NFT marketplace for the Metis blockchain. Buy, sell, and trade digital collectibles with style!" />
      </head>
      <body className={`${comicNeue.variable} ${spaceGrotesk.variable} ${impactFont.variable} ${papyrusFont.variable}`}>
        <ThemeProvider>
          <ThirdwebProvider>
            <TransactionProvider>
              <WalletProvider>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-grow">
                    {children}
                  </main>
                  <Footer />
                </div>

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