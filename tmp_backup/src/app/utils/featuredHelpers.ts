import { getAllListings } from "@/app/features/marketplace/services";
import { IListingWithNFT } from "@/interfaces/interfaces";

// Featured NFT collection addresses
export const FEATURED_COLLECTION_ADDRESSES = [
  "0x9C3dF5C49Cc236814885DcDb1263e3f77d72D358",
  "0x9c6e410D4181dC1f9B7EBBF6EB7eDBA8Ac4062B2",
  "0x0db571cB6C053830a0D78090CD18d9bB3f46661C",
];

/**
 * Filter listings to only include those from featured collections
 */
export function filterFeaturedListings(listings: IListingWithNFT[]): IListingWithNFT[] {
  // Convert all addresses to lowercase for comparison
  const featuredAddressesLower = FEATURED_COLLECTION_ADDRESSES.map(addr => addr.toLowerCase());
  
  return listings.filter(listing => 
    listing.assetContract && featuredAddressesLower.includes(listing.assetContract.toLowerCase())
  );
}

/**
 * Fetch all listings and filter to only include those from featured collections
 */
export async function getFeaturedCollectionListings(): Promise<IListingWithNFT[]> {
  // Get all listings using the updated marketplace service
  const allListings = await getAllListings();
  
  // Filter to only include featured collections
  const featuredListings = filterFeaturedListings(allListings);
  
  return featuredListings;
} 