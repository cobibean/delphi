import { isSortOption } from '@/app/features/marketplace/services/Sorting/helpers';
import { SortOption, isAuction } from '@/app/features/marketplace/services/Sorting/types';
import { getAllAuctions } from '@/app/features/marketplace/services/auctions';
import { getAllListings } from '@/app/features/marketplace/services/listings';
import { IListingWithNFT } from '@/app/features/marketplace/services/types';
import { NextRequest, NextResponse } from 'next/server';

// Cache structure
interface CachedData {
  listings: IListingWithNFT[];
  auctions: IListingWithNFT[];
  timestamp: number;
  expiresAt: number;
}

// In-memory cache (reset on server restart)
let cache: CachedData | null = null;
const CACHE_TTL = 30 * 1000; // 30 seconds cache lifetime

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
    
    // Check if we can use cached data
    const now = Date.now();
    let allItems: IListingWithNFT[] = [];
    
    if (cache && cache.expiresAt > now) {
      console.log('Using cached marketplace data, expires in', Math.round((cache.expiresAt - now) / 1000), 'seconds');
      allItems = [...cache.listings, ...cache.auctions];
    } else {
      console.log('Cache expired or not set, fetching fresh marketplace data');
      // Fetch all listings and auctions
      const [fetchedListings, fetchedAuctions] = await Promise.all([
        getAllListings(),
        getAllAuctions()
      ]);
      
      // Update cache
      cache = {
        listings: fetchedListings || [],
        auctions: fetchedAuctions || [],
        timestamp: now,
        expiresAt: now + CACHE_TTL
      };
      
      // Combine listings
      allItems = [
        ...(fetchedListings || []),
        ...(fetchedAuctions || [])
      ];
    }
    
    // Filter by collection if specified
    let filteredItems = allItems;
    if (collection && collection !== 'all') {
      filteredItems = allItems.filter(
        listing => listing.collectionName?.toLowerCase() === collection.toLowerCase()
      );
    }
    
    // Total count before pagination
    const total = filteredItems.length;
    
    // Sort the listings based on the specified sort option
    const sortedItems = sortListings(filteredItems, sort);
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const paginatedItems = sortedItems.slice(startIndex, startIndex + limit);
    
    // Add cache-control headers to prevent browser caching (we're handling the caching ourselves)
    const headers = new Headers();
    headers.set('Cache-Control', 'no-store, max-age=0');
    
    // Return paginated result with metadata
    return NextResponse.json({
      listings: paginatedItems,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      },
      sort,
      cached: cache?.expiresAt > now
    }, { headers });
  } catch (error) {
    console.error('Error fetching paginated listings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    );
  }
}

/**
 * Sort listings based on the provided sort option
 */
function sortListings(listings: IListingWithNFT[], sortOption: SortOption): IListingWithNFT[] {
  const now = Math.floor(Date.now() / 1000);
  
  // Helper to safely parse numeric strings with fallback values
  function safeParseFloat(value: string | undefined | null, fallback = 0): number {
    if (value === undefined || value === null) return fallback;
    const parsed = parseFloat(value);
    return isNaN(parsed) ? fallback : parsed;
  }

  // Helper to safely access timestamps with fallback values
  function safeGetTimestamp(timestamp: number | undefined | null, fallback = 0): number {
    if (timestamp === undefined || timestamp === null) return fallback;
    return timestamp;
  }
  
  try {
    // Create a shallow copy to avoid mutating the original array
    const sortedListings = [...listings];
    
    switch (sortOption) {
      case 'price-high-low':
        return sortedListings.sort((a, b) => {
          const aPrice = safeParseFloat(a.pricePerToken);
          const bPrice = safeParseFloat(b.pricePerToken);
          return bPrice - aPrice;
        });
        
      case 'price-low-high':
        return sortedListings.sort((a, b) => {
          const aPrice = safeParseFloat(a.pricePerToken);
          const bPrice = safeParseFloat(b.pricePerToken);
          return aPrice - bPrice;
        });
        
      case 'newest':
        return sortedListings.sort((a, b) => {
          const aTime = safeGetTimestamp(a.startTimestamp);
          const bTime = safeGetTimestamp(b.startTimestamp);
          return bTime - aTime;
        });
        
      case 'oldest':
        return sortedListings.sort((a, b) => {
          const aTime = safeGetTimestamp(a.startTimestamp);
          const bTime = safeGetTimestamp(b.startTimestamp);
          return aTime - bTime;
        });
        
      case 'highest-bid':
        return sortedListings.sort((a, b) => {
          const aValue = isAuction(a)
            ? safeParseFloat(a.currentBid || a.minimumBidAmount)
            : safeParseFloat(a.pricePerToken);
            
          const bValue = isAuction(b)
            ? safeParseFloat(b.currentBid || b.minimumBidAmount)
            : safeParseFloat(b.pricePerToken);
            
          return bValue - aValue;
        });
        
      case 'lowest-bid':
        return sortedListings.sort((a, b) => {
          const aValue = isAuction(a)
            ? safeParseFloat(a.currentBid || a.minimumBidAmount)
            : safeParseFloat(a.pricePerToken);
            
          const bValue = isAuction(b)
            ? safeParseFloat(b.currentBid || b.minimumBidAmount)
            : safeParseFloat(b.pricePerToken);
            
          return aValue - bValue;
        });
        
      case 'ending-soon': {
        // Filter active listings
        const activeListings = sortedListings.filter(listing => {
          const endTime = isAuction(listing)
            ? safeGetTimestamp(listing.endTimeInSeconds || listing.endTimestamp)
            : safeGetTimestamp(listing.endTimestamp);
            
          return endTime > now;
        });
        
        // Sort by end time
        return activeListings.sort((a, b) => {
          const aEndTime = isAuction(a)
            ? safeGetTimestamp(a.endTimeInSeconds || a.endTimestamp)
            : safeGetTimestamp(a.endTimestamp);
            
          const bEndTime = isAuction(b)
            ? safeGetTimestamp(b.endTimeInSeconds || b.endTimestamp)
            : safeGetTimestamp(b.endTimestamp);
            
          return aEndTime - bEndTime;
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