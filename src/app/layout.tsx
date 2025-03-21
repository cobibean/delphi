// src/app/layout.tsx

// sequenceDiagram
    //User->>dApp: Clicks "Buy for X METIS"
    //dApp->>WMETIS Contract: deposit() with value=X METIS
    //WMETIS Contract->>User: Mints X WMETIS
    //dApp->>Marketplace: buyFromListing() with WMETIS

"use client";

import { ToastProvider } from "@/app/components/feedback";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { TransactionProvider } from "@/providers/TransactionProvider";
import { WalletProvider } from "@/providers/WalletProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Anton, Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { createThirdwebClient, defineChain } from "thirdweb";
import { ThirdwebProvider } from "thirdweb/react";
import "./globals.css";

// Load Inter font for body text
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Load Anton font for headings
const anton = Anton({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

// Create local font variables for Cinzel and Cormorant Garamond
const cinzelFont = {
  variable: "--font-cinzel",
};

const cormorantFont = {
  variable: "--font-cormorant",
};

// We can't export metadata from a client component
// Instead, we'll set the title and description directly in the head element

// Define Metis chain using defineChain (used only in wallet components, not needed for ThirdwebProvider)
const metisChain = defineChain({
  id: 1088,
  name: "Metis Andromeda",
  rpc: "https://andromeda.metis.io/?owner=1088",
  nativeCurrency: {
    decimals: 18,
    name: "Metis",
    symbol: "METIS",
  },
  testnet: true, // For ThirdWeb v5 compatibility
});

// Create ThirdWeb client (used only in wallet components, not needed for ThirdwebProvider)
const thirdwebClient = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Initialize QueryClient once per component lifecycle
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Disable automatic refetching
        refetchOnWindowFocus: false,
        // Keep data fresh for 5 minutes
        staleTime: 5 * 60 * 1000,
      },
    },
  }));
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/images/logo/black-box.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Add Impact, Anton, and Roboto Slab fonts for Delphi theme */}
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Impact&family=Roboto+Slab:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <title>Delphi | The Center of the World - NFT Marketplace</title>
        <meta name="description" content="Discover and trade NFTs at Delphi - the center of the world for artists, weirdos, and degens on Metis and beyond." />
      </head>
      <body className={`${inter.variable} ${anton.variable} bg-oracle-black-void text-oracle-white oracle-texture constellation`}>
        <TransactionProvider>
          {/* ThirdwebProvider with correct configuration for v5 */}
          <ThirdwebProvider>
            <QueryClientProvider client={queryClient}>
              <WalletProvider>
                <ToastProvider>
                  <div className="flex flex-col min-h-screen relative overflow-hidden">
                    {/* Cosmic background effects */}
                    <div className="fixed inset-0 bg-oracle-black-void -z-10">
                      {/* Constellation effect */}
                      <div className="absolute inset-0 opacity-30">
                        {Array.from({ length: 50 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute rounded-full bg-oracle-white-spectral"
                            style={{
                              width: `${Math.random() * 2 + 1}px`,
                              height: `${Math.random() * 2 + 1}px`,
                              top: `${Math.random() * 100}%`,
                              left: `${Math.random() * 100}%`,
                            } as any}
                            animate={{
                              opacity: [0.3, 0.8, 0.3],
                            } as any}
                            transition={{
                              duration: Math.random() * 3 + 2,
                              repeat: Infinity,
                              delay: Math.random() * 5,
                            }}
                          />
                        ))}
                      </div>
                      
                      {/* Quantum entanglement effect */}
                      <motion.div 
                        className="absolute inset-0 bg-quantum-entanglement opacity-5"
                        animate={{
                          background: ['0% 0%', '100% 100%'],
                        } as any}
                        transition={{
                          duration: 30,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />
                    </div>
                    
                    <Header />
                    
                    <main className="flex-grow relative">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={pathname}
                          initial={{ opacity: 0 } as any}
                          animate={{ opacity: 1 } as any}
                          exit={{ opacity: 0 } as any}
                          transition={{ duration: 0.5 }}
                          className="h-full"
                        >
                          {children}
                        </motion.div>
                      </AnimatePresence>
                    </main>
                    
                    <Footer />
                  </div>
                </ToastProvider>
              </WalletProvider>
            </QueryClientProvider>
          </ThirdwebProvider>
        </TransactionProvider>
      </body>
    </html>
  );
}