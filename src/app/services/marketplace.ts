// marketplace.ts

import { ethers, Contract } from "ethers";
import MarketplaceABI from "@/app/constants/MarketplaceABI";
import {
  IDirectListingRaw,
  IListingWithNFT,
  IDirectListing,
} from "@/app/interfaces/interfaces";
import { fetchNFTMetadata } from "@/app/utils/fetchNFTMetadata";
import fetchCollectionName from "@/app/utils/fetchCollectionName";

/**
 * getAllListingsWithMetadata
 * Fetches *all* valid listings from [0..(totalListings-1)] and merges with metadata.
 */
export async function getAllListingsWithMetadata(
  provider: ethers.JsonRpcProvider,
  marketplaceAddress: string
): Promise<IListingWithNFT[]> {
  try {
    const contract = new Contract(marketplaceAddress, MarketplaceABI, provider);

    // 1. totalListings
    const totalBn = await contract.totalListings();
    const total = Number(totalBn);

    // 2. If none, return empty
    if (total === 0) {
      console.log("No listings found");
      return [];
    }

    // 3. Fetch all valid listings in range [0..(total - 1)]
    const rawListings: IDirectListingRaw[] = await contract.getAllValidListings(0, total - 1);

    // 4. Parse them
    const parsedListings: IDirectListing[] = rawListings.map((raw) => ({
      listingId: raw.listingId.toString(),
      tokenId: raw.tokenId.toString(),
      quantity: raw.quantity.toString(),
      pricePerToken: ethers.formatUnits(raw.pricePerToken, 18),
      startTimestamp: Number(raw.startTimestamp),
      endTimestamp: Number(raw.endTimestamp),
      listingCreator: raw.listingCreator,
      assetContract: raw.assetContract,
      currency: raw.currency,
      tokenType: raw.tokenType,
      status: raw.status,
      reserved: raw.reserved,
    }));

    // 5. Fetch metadata in parallel
    const listingsWithMeta = await Promise.all(
      parsedListings.map(async (listing) => {
        try {
          const metadata = await fetchNFTMetadata(listing.tokenId, listing.assetContract, provider);
          const collectionName = await fetchCollectionName(listing.assetContract, provider);
          return { ...listing, metadata, collectionName };
        } catch (err) {
          console.error(`Error fetching metadata for listing ${listing.listingId}:`, err);
          return { ...listing, metadata: undefined };
        }
      })
    );

    return listingsWithMeta;
  } catch (err) {
    console.error("Error in getAllListingsWithMetadata:", err);
    return [];
  }
}

/**
 * (Optional) Helper function to fetch a single listing + metadata.
 * This is used by getFeaturedListings below.
 */
async function fetchListingWithMetadata(
  provider: ethers.JsonRpcProvider,
  marketplaceAddress: string,
  listingId: string
): Promise<IListingWithNFT | null> {
  try {
    const contract = new Contract(marketplaceAddress, MarketplaceABI, provider);
    const raw: IDirectListingRaw = await contract.getListing(listingId);

    // Parse raw data
    const listing: IDirectListing = {
      listingId: raw.listingId.toString(),
      tokenId: raw.tokenId.toString(),
      quantity: raw.quantity.toString(),
      pricePerToken: ethers.formatUnits(raw.pricePerToken, 18),
      startTimestamp: Number(raw.startTimestamp),
      endTimestamp: Number(raw.endTimestamp),
      listingCreator: raw.listingCreator,
      assetContract: raw.assetContract,
      currency: raw.currency,
      tokenType: raw.tokenType,
      status: raw.status,
      reserved: raw.reserved,
    };

    // Fetch metadata
    const metadata = await fetchNFTMetadata(listing.tokenId, listing.assetContract, provider);
    const collectionName = await fetchCollectionName(listing.assetContract, provider);

    return { ...listing, metadata, collectionName };
  } catch (error) {
    console.error(`Failed to fetch listing #${listingId}`, error);
    return null;
  }
}

/**
 * getFeaturedListings
 * Fetches only the listings for a given array of listing IDs (e.g. ["0", "1", "2"]).
 */
export async function getFeaturedListings(
  provider: ethers.JsonRpcProvider,
  marketplaceAddress: string,
  featuredIds: string[]
): Promise<IListingWithNFT[]> {
  // For each ID, try to fetch listing + metadata
  const promises = featuredIds.map((id) =>
    fetchListingWithMetadata(provider, marketplaceAddress, id)
  );

  // Filter out any nulls (non-existent or invalid listings)
  const results = await Promise.all(promises);
  return results.filter((r) => r !== null) as IListingWithNFT[];
}