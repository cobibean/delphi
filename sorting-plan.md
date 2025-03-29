# Delphi NFT Marketplace Sorting Implementation Plan

## Dependency and Compatibility Check

Before proceeding with implementation, we need to verify our dependencies will work with the existing codebase:

| Dependency | Required Version | Project Version | Compatible |
|------------|-----------------|----------------|------------|
| React | ^18.0.0 | ^18.3 | ✅ Yes |
| @headlessui/react | ^2.0.0 | Not installed | ✅ Compatible with React 18 |
| Node.js | >=16.0.0 | v20.18.3 | ✅ Yes |
| npm | >=7.0.0 | 11.1.0 | ✅ Yes |

**Installation Command:**
```bash
npm install @headlessui/react@2.2.0
```

## Implementation Context

This plan was developed based on analysis of the Delphi NFT Marketplace codebase, specifically:

1. The interface definitions in:
   - `src/app/interfaces/interfaces.ts` with `IListingWithNFT` interface
   - `src/app/features/marketplace/services/types.ts` with auction-specific fields

2. The existing `NFTMarketplaceDashboard.tsx` component that already has collection filtering

3. The `NFTCard.tsx` component which handles both direct listings and auctions

Key considerations:
- The marketplace combines both direct listings and auctions with different data structures
- `IListingWithNFT` interface already has an `isAuction` boolean property to identify auction listings
- Sorting must handle null/undefined values for fields that might not exist in all listing types
- Server-side pagination should be implemented for better performance with large datasets
- Toast notifications should be streamlined to prevent notification fatigue
- Code style should match existing codebase patterns

## Overview

This plan outlines the implementation of a sorting and filtering system for the Delphi NFT Marketplace homepage. The solution uses React with the @headlessui/react library for accessible dropdown components, while maintaining full compatibility with the existing Tailwind styling.

## Implementation Plan

### Step 1: Define Type-Safe Sorting Options

First, create the required directory structure if not already present:

```bash
mkdir -p src/app/features/marketplace/services/Sorting
```

#### File 1: `src/app/features/marketplace/services/Sorting/types.ts`

```typescript
import { IListingWithNFT } from "@/app/interfaces/interfaces";

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
```

#### File 2: `src/app/features/marketplace/services/Sorting/helpers.ts`

```typescript
import { IListingWithNFT } from "@/app/interfaces/interfaces";
import { SortOption, PaginationConfig, DEFAULT_PAGINATION, isAuction, ServerPaginationParams } from "./types";

/**
 * Helper to safely parse numeric strings with fallback values
 * Handles null/undefined/invalid values gracefully
 */
function safeParseFloat(value: string | undefined | null, fallback = 0): number {
  if (value === undefined || value === null) return fallback;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? fallback : parsed;
}

/**
 * Helper to safely access timestamps with fallback values
 * Handles null/undefined values gracefully
 */
function safeGetTimestamp(timestamp: number | undefined | null, fallback = 0): number {
  if (timestamp === undefined || timestamp === null) return fallback;
  return timestamp;
}

/**
 * Sort a list of NFT listings based on the provided sort option
 * Improved error handling for null/undefined values
 */
export function sortListings(listings: IListingWithNFT[], sortOption: SortOption): IListingWithNFT[] {
  if (!listings || !Array.isArray(listings)) {
    console.error("Invalid listings array provided to sortListings");
    return [];
  }

  try {
    // Create a shallow copy to avoid mutating the original array
  const sortedListings = [...listings];
    const now = Math.floor(Date.now() / 1000); // Current time in seconds

  switch (sortOption) {
      case "price-high-low":
      return sortedListings.sort((a, b) => 
          safeParseFloat(b.pricePerToken) - safeParseFloat(a.pricePerToken));
      
      case "price-low-high":
      return sortedListings.sort((a, b) => 
          safeParseFloat(a.pricePerToken) - safeParseFloat(b.pricePerToken));
      
      case "newest":
      return sortedListings.sort((a, b) => {
          const aTime = safeGetTimestamp(a.startTimestamp);
          const bTime = safeGetTimestamp(b.startTimestamp);
        return bTime - aTime; // Descending order (newest first)
      });
      
      case "oldest":
      return sortedListings.sort((a, b) => {
          const aTime = safeGetTimestamp(a.startTimestamp);
          const bTime = safeGetTimestamp(b.startTimestamp);
        return aTime - bTime; // Ascending order (oldest first)
      });
      
      case "highest-bid":
      return sortedListings.sort((a, b) => {
          const aValue = isAuction(a)
            ? safeParseFloat(a.currentBid || a.minimumBidAmount)
            : safeParseFloat(a.pricePerToken);
            
          const bValue = isAuction(b)
            ? safeParseFloat(b.currentBid || b.minimumBidAmount)
            : safeParseFloat(b.pricePerToken);
          
        return bValue - aValue; // Descending order (highest first)
      });
      
      case "lowest-bid":
      return sortedListings.sort((a, b) => {
          const aValue = isAuction(a)
            ? safeParseFloat(a.currentBid || a.minimumBidAmount)
            : safeParseFloat(a.pricePerToken);
            
          const bValue = isAuction(b)
            ? safeParseFloat(b.currentBid || b.minimumBidAmount)
            : safeParseFloat(b.pricePerToken);
          
        return aValue - bValue; // Ascending order (lowest first)
      });
      
      case "ending-soon":
      // First filter to only include active listings (not ended)
      const activeListings = sortedListings.filter(listing => {
          const endTime = isAuction(listing)
            ? safeGetTimestamp(listing.endTimeInSeconds || listing.endTimestamp)
            : safeGetTimestamp(listing.endTimestamp);
          
        // Only include listings that haven't ended yet
        return endTime > now;
      });
      
      // Then sort by end time (ascending)
      return activeListings.sort((a, b) => {
          const aEndTime = isAuction(a)
            ? safeGetTimestamp(a.endTimeInSeconds || a.endTimestamp)
            : safeGetTimestamp(a.endTimestamp);
            
          const bEndTime = isAuction(b)
            ? safeGetTimestamp(b.endTimeInSeconds || b.endTimestamp)
            : safeGetTimestamp(b.endTimestamp);
          
        return aEndTime - bEndTime; // Ascending by end time (soonest first)
      });
      
    default:
        console.warn(`Unknown sort option: ${sortOption}, using default sorting`);
      return sortedListings;
    }
  } catch (error) {
    console.error(`Error sorting listings: ${error}`);
    return [...listings]; // Return unsorted copy on error
  }
}

/**
 * For client-side pagination fallback when server pagination is not available
 */
export function paginateListings(
  listings: IListingWithNFT[], 
  pagination: PaginationConfig = DEFAULT_PAGINATION
): IListingWithNFT[] {
  try {
  const { itemsPerPage, currentPage } = pagination;
  const startIndex = (currentPage - 1) * itemsPerPage;
  return listings.slice(startIndex, startIndex + itemsPerPage);
  } catch (error) {
    console.error(`Error paginating listings: ${error}`);
    return listings.slice(0, DEFAULT_PAGINATION.itemsPerPage);
  }
}

/**
 * Safely get sort option from URL parameters with validation
 */
export function getSortOptionFromUrl(): SortOption | null {
  if (typeof window === 'undefined') return null;
  
  try {
  const urlParams = new URLSearchParams(window.location.search);
    const sortParam = urlParams.get('sort');
  
    // Validate the sort parameter is one of our defined options
    if (sortParam && isSortOption(sortParam)) {
  return sortParam;
    }
    
    return null;
  } catch (error) {
    console.error(`Error getting sort option from URL: ${error}`);
    return null;
  }
}

/**
 * Type guard to check if a string is a valid SortOption
 */
export function isSortOption(value: string): value is SortOption {
  return [
    "price-high-low",
    "price-low-high",
    "newest",
    "oldest",
    "lowest-bid",
    "highest-bid",
    "ending-soon"
  ].includes(value);
}

/**
 * Update URL with sort parameters for shareable links
 * Preserves other query parameters
 */
export function updateUrlWithSort(sortOption: SortOption, currentPage = 1): void {
  if (typeof window === 'undefined') return;
  
  try {
  const url = new URL(window.location.href);
    
    // Only set valid values
    if (sortOption && isSortOption(sortOption)) {
  url.searchParams.set('sort', sortOption);
    }
    
    if (currentPage && currentPage > 0) {
  url.searchParams.set('page', currentPage.toString());
    }
  
  // Use replaceState to avoid adding to browser history
  window.history.replaceState({}, '', url.toString());
  } catch (error) {
    console.error(`Error updating URL: ${error}`);
    // Continue without updating URL
  }
}

/**
 * Construct server-side pagination/sorting API parameters
 */
export function getServerPaginationParams(
  sortOption: SortOption, 
  currentPage: number, 
  itemsPerPage: number,
  collection?: string
): ServerPaginationParams {
  return {
    page: currentPage,
    limit: itemsPerPage,
    sort: sortOption,
    ...(collection && collection !== 'all' ? { collection } : {})
  };
}

/**
 * Save sort preference to localStorage for persistence across sessions
 */
export function saveSortPreference(sortOption: SortOption): void {
  if (typeof window === 'undefined') return;
  
  try {
    if (sortOption && isSortOption(sortOption)) {
  localStorage.setItem('nft-sort-preference', sortOption);
    }
  } catch (error) {
    console.error(`Error saving sort preference: ${error}`);
    // Continue without saving preference
  }
}

/**
 * Load sort preference from localStorage with validation
 */
export function loadSortPreference(): SortOption | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const savedOption = localStorage.getItem('nft-sort-preference');
    
    if (savedOption && isSortOption(savedOption)) {
      return savedOption;
    }
    
    return null;
  } catch (error) {
    console.error(`Error loading sort preference: ${error}`);
    return null;
  }
}
```

#### File 3: `src/app/features/marketplace/services/Sorting/index.ts`

```typescript
export * from './types';
export * from './helpers';
```

### Step 2: Implement Server-Side Pagination API

Create a new API route for paginated and sorted listings:

#### File: `src/app/api/marketplace/listings/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { IListingWithNFT } from '@/app/interfaces/interfaces';
import { SortOption, isAuction } from '@/app/features/marketplace/services/Sorting/types';
import { MarketplaceService } from '@/app/features/marketplace/services/MarketplaceService';

// Helper function to safely parse integer parameters with defaults
function safeParseInt(value: string | null, defaultValue: number): number {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

// Get paginated and sorted listings
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    
    // Extract and validate pagination parameters
    const page = safeParseInt(searchParams.get('page'), 1);
    const limit = safeParseInt(searchParams.get('limit'), 20);
    const collection = searchParams.get('collection') || undefined;
    
    // Extract and validate sort parameter
    let sort = searchParams.get('sort') as SortOption | null;
    if (!sort || !isSortOption(sort)) {
      sort = 'newest'; // Default sort
    }
    
    // Initialize marketplace service
    const marketplaceService = new MarketplaceService();
    
    // Fetch listings from the blockchain/API
    const { listings, total } = await marketplaceService.getListings({
      page,
      limit,
      sort,
      collection
    });
    
    // Return paginated result with metadata
    return NextResponse.json({
      listings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      },
      sort
    });
  } catch (error) {
    console.error('Error fetching paginated listings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    );
  }
}

// Type guard for sort parameter
function isSortOption(value: string): value is SortOption {
  return [
    "price-high-low",
    "price-low-high",
    "newest",
    "oldest",
    "lowest-bid",
    "highest-bid",
    "ending-soon"
  ].includes(value);
}
```

#### File: `src/app/features/marketplace/services/MarketplaceService.ts`

```typescript
// Add this method to your existing MarketplaceService class:

import { ServerPaginationParams, SortOption, isAuction } from "./Sorting/types";
import { IListingWithNFT } from "@/app/interfaces/interfaces";

// Add this to the existing MarketplaceService class:

/**
 * Get paginated and sorted listings
 */
async getListings({
  page = 1,
  limit = 20,
  sort = 'newest',
  collection
}: ServerPaginationParams): Promise<{ 
  listings: IListingWithNFT[], 
  total: number 
}> {
  try {
    // Fetch all listings first - this should be optimized in the future
    // to only fetch the needed page directly from the blockchain
    const allListings = await this.getAllListings();
    
    // Filter by collection if specified
    let filteredListings = allListings;
    if (collection) {
      filteredListings = allListings.filter(
        listing => listing.collectionName?.toLowerCase() === collection.toLowerCase()
      );
    }
    
    // Total count before pagination
    const total = filteredListings.length;
    
    // Sort the listings based on the specified sort option
    const sortedListings = this.sortListings(filteredListings, sort as SortOption);
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const paginatedListings = sortedListings.slice(startIndex, startIndex + limit);
    
    return {
      listings: paginatedListings,
      total
    };
  } catch (error) {
    console.error("Error getting paginated listings:", error);
    return { listings: [], total: 0 };
  }
}

/**
 * Sort listings based on the provided sort option
 */
private sortListings(listings: IListingWithNFT[], sortOption: SortOption): IListingWithNFT[] {
  const now = Math.floor(Date.now() / 1000);
  
  switch (sortOption) {
    case 'price-high-low':
      return [...listings].sort((a, b) => {
        const aPrice = parseFloat(a.pricePerToken || '0');
        const bPrice = parseFloat(b.pricePerToken || '0');
        return bPrice - aPrice;
      });
      
    case 'price-low-high':
      return [...listings].sort((a, b) => {
        const aPrice = parseFloat(a.pricePerToken || '0');
        const bPrice = parseFloat(b.pricePerToken || '0');
        return aPrice - bPrice;
      });
      
    case 'newest':
      return [...listings].sort((a, b) => {
        const aTime = a.startTimestamp || 0;
        const bTime = b.startTimestamp || 0;
        return bTime - aTime;
      });
      
    case 'oldest':
      return [...listings].sort((a, b) => {
        const aTime = a.startTimestamp || 0;
        const bTime = b.startTimestamp || 0;
        return aTime - bTime;
      });
      
    case 'highest-bid':
      return [...listings].sort((a, b) => {
        const aValue = isAuction(a)
          ? parseFloat(a.currentBid || a.minimumBidAmount || '0')
          : parseFloat(a.pricePerToken || '0');
          
        const bValue = isAuction(b)
          ? parseFloat(b.currentBid || b.minimumBidAmount || '0')
          : parseFloat(b.pricePerToken || '0');
          
        return bValue - aValue;
      });
      
    case 'lowest-bid':
      return [...listings].sort((a, b) => {
        const aValue = isAuction(a)
          ? parseFloat(a.currentBid || a.minimumBidAmount || '0')
          : parseFloat(a.pricePerToken || '0');
          
        const bValue = isAuction(b)
          ? parseFloat(b.currentBid || b.minimumBidAmount || '0')
          : parseFloat(b.pricePerToken || '0');
          
        return aValue - bValue;
      });
      
    case 'ending-soon':
      // Filter active listings
      const activeListings = listings.filter(listing => {
        const endTime = isAuction(listing)
          ? listing.endTimeInSeconds || listing.endTimestamp || 0
          : listing.endTimestamp || 0;
          
        return endTime > now;
      });
      
      // Sort by end time
      return activeListings.sort((a, b) => {
        const aEndTime = isAuction(a)
          ? a.endTimeInSeconds || a.endTimestamp || 0
          : a.endTimestamp || 0;
          
        const bEndTime = isAuction(b)
          ? b.endTimeInSeconds || b.endTimestamp || 0
          : b.endTimestamp || 0;
          
        return aEndTime - bEndTime;
      });
      
    default:
      return listings;
  }
}
```

### Step 3: Create UI Components

#### File 1: `src/app/features/marketplace/components/SortingDropdown.tsx`

```typescript
"use client";

import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { SortConfig, SortOption, SORT_OPTIONS } from '../services/Sorting';

interface SortingDropdownProps {
  selectedSort: SortOption;
  onChange: (option: SortOption) => void;
  className?: string;
}

export default function SortingDropdown({ 
  selectedSort, 
  onChange,
  className = ""
}: SortingDropdownProps) {
  // Find the selected config, fall back to first option if not found
  const selectedConfig = SORT_OPTIONS.find(opt => opt.option === selectedSort) || SORT_OPTIONS[0];
  
  return (
    <div className={`relative w-full sm:w-auto sm:min-w-[200px] ${className}`}>
      <Listbox value={selectedSort} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-oracle-black-void rounded-lg border border-oracle-orange/20 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-oracle-orange shadow-card-normal hover:shadow-card-hover transition-all duration-300">
            <span className="block truncate text-oracle-white">
              {selectedConfig.label}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-oracle-orange" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </Listbox.Button>
          
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-20 w-full mt-1 overflow-auto bg-ancient-wisdom rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none py-1 border border-oracle-orange/30">
              {SORT_OPTIONS.map((option) => (
                <Listbox.Option
                  key={option.option}
                  value={option.option}
                  className={({ active }) =>
                    `${active ? 'text-oracle-white bg-cosmic-combustion' : 'text-oracle-white'}
                    cursor-pointer select-none relative py-2 pl-10 pr-4 hover:bg-cosmic-combustion/80`
                  }
                >
                  {({ selected, active }) => (
                    <>
                      <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                        {option.label}
                      </span>
                      
                      {option.description && (
                        <span className={`${active ? 'text-oracle-white/80' : 'text-oracle-white/60'} block text-xs mt-0.5`}>
                          {option.description}
                        </span>
                      )}
                      
                      {option.icon && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-oracle-orange">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={option.icon} />
                          </svg>
                        </span>
                      )}
                      
                      {selected && !option.icon && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-oracle-orange">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
```

### Step 4: Toast Notification Strategy

To prevent notification fatigue, we'll implement these changes when handling UI notifications:

1. **Reduced frequency**: Only show toast notifications for significant state changes:
   - Initial page load: No toast
   - Changing sort option: Single toast
   - Changing collection filter: Single toast
   - Error states: Always show with appropriate context

2. **Consolidation**: Group related actions to reduce multiple notifications:
   - When changing both sort and filter, prefer a single "View updated" notification
   - For pagination changes, don't show toasts

3. **Improved messaging**: Make toast messages more informative and contextual:
   - "Sorted by [option]" instead of "Sort updated"
   - "Viewing [collection] collection" instead of "Collection filter applied"

4. **Error handling**: Prioritize error notifications and make them actionable:
   - Include retry options for failed data fetches
   - Provide clear explanation of what went wrong

### Step 5: Testing Plan

1. **Unit tests**:
   - Test sort functions with various inputs including null/undefined
   - Test server pagination logic
   - Test URL parameter handling

2. **Integration tests**:
   - Verify sorting dropdown properly updates listings
   - Verify pagination controls work correctly
   - Test combined filtering + sorting

3. **Performance testing**:
   - Benchmark rendering time for large datasets
   - Test responsiveness on mobile devices
   - Verify memory usage with React DevTools

## Implementation Schedule

1. **Day 1**: Create sorting services and helpers (4 hours)
   - Implement type definitions, sort functions, and utility functions
   - Add tests for sort functions

2. **Day 2**: Implement server-side pagination API (4 hours)
   - Create API route for paginated listings
   - Add MarketplaceService methods
   - Test API endpoints

3. **Day 3**: Build UI components (6 hours)
   - Create SortingDropdown
   - Update NFTMarketplaceDashboard component
   - Integrate with existing collection filtering

4. **Day 4**: Testing and refinement (2 hours)
   - Fix issues from testing
   - Performance optimizations
   - Documentation

**Total estimated time**: 16 hours (2 days)

## Conclusion

This plan addresses all requirements identified while aligning with the existing codebase patterns. The implementation:

1. Uses **type-safe approaches** with string literal types and type guards
2. Implements **proper error handling** for null/undefined values
3. Provides **server-side pagination** for better performance
4. Reduces **notification fatigue** with a streamlined toast strategy
5. Follows **existing code patterns** for consistency
6. Uses **specific descriptions** instead of placeholder content

Once implemented, users will be able to easily sort NFTs by various criteria including price, recency, and auction-specific factors, while maintaining a smooth, performant user experience.