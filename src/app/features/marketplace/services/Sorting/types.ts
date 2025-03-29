import { IListingWithNFT } from "@/app/features/marketplace/services/types";

/**
 * Type-safe string literal union for sort options
 * This approach is more type-safe than using string enums
 */
export type SortOption = 
  | "price-high-low"
  | "price-low-high"
  | "newest"
  | "oldest"
  | "lowest-bid"
  | "highest-bid"
  | "ending-soon";

// Configuration for each sort option
export interface SortConfig {
  option: SortOption;
  label: string;
  description: string; // No longer optional - all options must have a clear description
  icon: string; // SVG path for the icon
}

// All available sort options with their display text
export const SORT_OPTIONS: SortConfig[] = [
  { 
    option: "newest", 
    label: "Newest First", 
    description: "Sort by most recently listed NFTs",
    icon: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
  },
  { 
    option: "oldest", 
    label: "Oldest First", 
    description: "Sort by oldest listed NFTs",
    icon: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
  },
  { 
    option: "price-high-low", 
    label: "Price: High to Low",
    description: "Sort by highest priced NFTs first",
    icon: "M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
  },
  { 
    option: "price-low-high", 
    label: "Price: Low to High",
    description: "Sort by lowest priced NFTs first",
    icon: "M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
  },
  { 
    option: "highest-bid", 
    label: "Highest Bid",
    description: "Sort by highest current bid (auctions)",
    icon: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
  },
  { 
    option: "lowest-bid", 
    label: "Lowest Bid",
    description: "Sort by lowest current bid (auctions)",
    icon: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
  },
  { 
    option: "ending-soon", 
    label: "Ending Soon", 
    description: "Sort by auctions ending soonest",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
  }
];

// Pagination configuration for client-side fallback
export interface PaginationConfig {
  itemsPerPage: number;
  currentPage: number;
}

// Server pagination parameters
export interface ServerPaginationParams {
  page: number;
  limit: number;
  sort: SortOption;
  collection?: string;
}

// Default pagination settings
export const DEFAULT_PAGINATION: PaginationConfig = {
  itemsPerPage: 20,
  currentPage: 1
};

// Type guard to check if a listing is an auction
export function isAuction(listing: IListingWithNFT): boolean {
  return Boolean(
    listing.isAuction === true || 
    listing.type === "auction" || 
    listing.minimumBidAmount || 
    listing.currentBid
  );
} 