// src/app/layout.tsx

// sequenceDiagram
    //User->>dApp: Clicks "Buy for X METIS"
    //dApp->>WMETIS Contract: deposit() with value=X METIS
    //WMETIS Contract->>User: Mints X WMETIS
    //dApp->>Marketplace: buyFromListing() with WMETIS

"use client";

import "./globals.css";
import { Inter, Anton } from "next/font/google";
import { Toaster } from "@/app/ui/toaster";
import { TransactionProvider } from "@/app/providers/TransactionProvider";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import Header from "@/app/components/SharedComponents/Header";
import Footer from "@/app/components/SharedComponents/Footer";
import { THIRDWEB_CLIENT_ID } from "@/app/constants/contracts";

// Load Inter font for body text
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Load Anton font for headings
const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-anton",
});

// Create local font variables for Cinzel and Cormorant Garamond
const cinzelFont = {
  variable: "--font-cinzel",
};

const cormorantFont = {
  variable: "--font-cormorant",
};

// Define Metis Andromeda as a custom chain
const metisChain = {
  chainId: 1088,
  rpc: ["https://andromeda.metis.io/?owner=1088"],
  nativeCurrency: {
    decimals: 18,
    name: "Metis",
    symbol: "METIS",
  },
  shortName: "metis",
  slug: "metis",
  testnet: false,
  chain: "Metis",
  name: "Metis Andromeda",
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
        <link rel="icon" href="/images/delphi-logo.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Add Impact, Anton, and Roboto Slab fonts for Delphi theme */}
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Roboto+Slab:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <title>Delphi | The Center of the World - NFT Marketplace</title>
        <meta name="description" content="Discover and trade NFTs at Delphi - the center of the world for artists, weirdos, and degens on Metis and beyond." />
      </head>
      <body className={`${inter.variable} ${anton.variable} bg-oracle-black text-oracle-white oracle-texture constellation`}>
        <ThirdwebProvider
          clientId={THIRDWEB_CLIENT_ID}
          // Use Metis Chain
          activeChain={metisChain}
        >
          <TransactionProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>

            {/* Notifications */}
            <Toaster />
          </TransactionProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}