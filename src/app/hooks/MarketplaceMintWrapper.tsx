"use client";

import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a dedicated QueryClient for marketplace hooks
const marketplaceQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
});

// Wrapper component to provide QueryClient to marketplace components
export function MarketplaceMintWrapper({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={marketplaceQueryClient}>
      {children}
    </QueryClientProvider>
  );
} 