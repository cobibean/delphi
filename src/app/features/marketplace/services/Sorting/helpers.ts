import { IListingWithNFT } from "@/app/features/marketplace/services/types";
import { DEFAULT_PAGINATION, isAuction, PaginationConfig, ServerPaginationParams, SortOption } from "./types";

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
        
      case "ending-soon": {
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
      }
      
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