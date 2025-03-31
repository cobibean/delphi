"use client";

import { useToast } from "@/components/feedback";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";

// Create a dedicated QueryClient for marketplace hooks
const marketplaceQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: 2,
    },
  },
});

/**
 * Wrapper component to provide QueryClient to marketplace components
 * Used for React Query state management specific to marketplace
 */
export function MarketplaceMintWrapper({ children }: { children: ReactNode }) {
  const { toast } = useToast();

  // Configure global error handling for React Query
  React.useEffect(() => {
    const unsubscribe = marketplaceQueryClient.getQueryCache().subscribe(() => {
      const queries = marketplaceQueryClient.getQueryCache().findAll();
      queries.forEach(query => {
        if (query.state.error instanceof Error) {
          console.error("Query error:", query.state.error);
          toast.custom({
            title: "Marketplace Error",
            description: query.state.error.message || "An error occurred while fetching marketplace data. Please try again.",
            variant: "error"
          });
        }
      });
    });

    const unsubscribeMutation = marketplaceQueryClient.getMutationCache().subscribe(() => {
      const mutations = marketplaceQueryClient.getMutationCache().getAll();
      mutations.forEach(mutation => {
        if (mutation.state.error instanceof Error) {
          console.error("Mutation error:", mutation.state.error);
          toast.custom({
            title: "Transaction Error",
            description: mutation.state.error.message || "An error occurred while processing your transaction. Please try again.",
            variant: "error"
          });
        }
      });
    });

    return () => {
      unsubscribe();
      unsubscribeMutation();
    };
  }, [toast]);

  return (
    <QueryClientProvider client={marketplaceQueryClient}>
      {children}
    </QueryClientProvider>
  );
} 