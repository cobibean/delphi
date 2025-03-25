import { getAllListings } from "@/app/features/marketplace/services";
import { IListingWithNFT } from "@/interfaces/interfaces";

// Featured NFT collection addresses
export const FEATURED_COLLECTION_ADDRESSES = [
  "0x8938fc030Df8780A479f393982890980A192c63f", // Collection 1 (LoFi Llamas)
  "0x1Cb88959be69068Eb67c09310D0140434D516985",
  "0x699b94A2a7fb939f62f3eE571EcCB67f543e1EC8", // Collection 2 (lost.souls)
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