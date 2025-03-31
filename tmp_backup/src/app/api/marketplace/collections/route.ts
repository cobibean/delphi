import { getAllAuctions } from '@/app/features/marketplace/services/auctions';
import { getAllListings } from '@/app/features/marketplace/services/listings';
import { NextRequest, NextResponse } from 'next/server';

// Collections cache
interface CollectionsCache {
  collections: string[];
  timestamp: number;
  expiresAt: number;
}

// In-memory cache (reset on server restart)
let collectionsCache: CollectionsCache | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache lifetime for collections (changes less frequently)

/**
 * API endpoint to get all unique collection names for the marketplace
 */
export async function GET(_req: NextRequest) {
  try {
    // Check if we can use cached collections
    const now = Date.now();
    if (collectionsCache && collectionsCache.expiresAt > now) {
      console.log('Using cached collections data, expires in', 
        Math.round((collectionsCache.expiresAt - now) / 1000), 'seconds');
      
      return NextResponse.json({
        collections: collectionsCache.collections,
        total: collectionsCache.collections.length,
        cached: true
      });
    }
    
    console.log('Collections cache expired or not set, fetching fresh data');
    
    // Fetch all listings and auctions
    const [fetchedListings, fetchedAuctions] = await Promise.all([
      getAllListings(),
      getAllAuctions()
    ]);
    
    // Combine listings
    const allItems = [
      ...(fetchedListings || []),
      ...(fetchedAuctions || [])
    ];
    
    // Extract unique collection names
    const collections = Array.from(
      new Set(
        allItems
          .map(listing => listing.collectionName || "Unknown")
          .filter(Boolean) // Remove any null or empty strings
      )
    ).sort(); // Sort alphabetically
    
    // Update cache
    collectionsCache = {
      collections,
      timestamp: now,
      expiresAt: now + CACHE_TTL
    };
    
    // Add cache-control headers
    const headers = new Headers();
    headers.set('Cache-Control', 'no-store, max-age=0');
    
    return NextResponse.json({
      collections,
      total: collections.length,
      cached: false
    }, { headers });
  } catch (error) {
    console.error('Error fetching collections:', error);
    return NextResponse.json(
      { error: 'Failed to fetch collections' },
      { status: 500 }
    );
  }
} 