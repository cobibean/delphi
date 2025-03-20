import { getAllListings } from "@/app/features/marketplace/services/marketplace-v5";
import { IListingWithNFT } from "@/interfaces/interfaces";

// Featured NFT collection addresses
export const FEATURED_COLLECTION_ADDRESSES = [
  "0x3d9a9BA8D73c81a754ebCCA6a2483A2F8C7a5403", // Collection 1 (LoFi Llamas)
  "0x1Cb88959be69068Eb67c09310D0140434D516985", // Collection 2 (lost.souls)
];

/**
 * Filter listings to only include those from featured collections
 */
export function filterFeaturedListings(listings: IListingWithNFT[]): IListingWithNFT[] {
  return listings.filter(listing => 
    FEATURED_COLLECTION_ADDRESSES.includes(listing.assetContract)
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