/**
 * Marketplace Direct Listing Operations - Query Functions
 * 
 * This file provides standardized functions for querying marketplace listings.
 * Note: All transaction functions have been moved to ./listings/simplified.ts
 */

import { getNFTMetadata } from "@/app/features/nft/services/nft-services";
import { MARKETPLACE_ADDRESS } from "@/constants/contracts";
import { getContract } from "thirdweb";
import {
  getAllValidListings
} from "thirdweb/extensions/marketplace";
import { client, IListingWithNFT, metisChain } from "./types";

/**
 * Get all active direct listings from the marketplace
 * @returns Array of listings with NFT metadata
 */
export const getAllListings = async (): Promise<IListingWithNFT[]> => {
  try {
    console.log("Getting marketplace contract at", MARKETPLACE_ADDRESS);
    
    // Get the marketplace contract
    const marketplaceContract = getContract({
      client,
      chain: metisChain,
      address: MARKETPLACE_ADDRESS,
    });
    
    // Get all valid listings using the marketplace extension
    const listings = await getAllValidListings({
      contract: marketplaceContract
    });
    
    console.log(`Found ${listings.length} direct listings`);
    
    // Convert listings to our interface format
    const enhancedListings = await Promise.all(
      listings.map(async (listing) => {
        try {
          return await getListing(listing.id.toString());
        } catch (error) {
          console.error(`Error enhancing listing ${listing.id}:`, error);
          return null;
        }
      })
    );
    
    // Filter out null listings
    const validListings = enhancedListings.filter(listing => listing !== null) as IListingWithNFT[];
    
    console.log(`Found ${validListings.length} valid direct listings`);
    return validListings;
    
  } catch (error) {
    console.error("Error fetching listings:", error);
    return [];
  }
};

/**
 * Get a specific listing by ID with NFT metadata
 * @param listingId The ID of the listing to retrieve
 * @returns Listing information with NFT metadata
 */
export const getListing = async (listingId: string): Promise<IListingWithNFT | null> => {
  try {
    // Get the marketplace contract
    const marketplaceContract = getContract({
      client,
      chain: metisChain,
      address: MARKETPLACE_ADDRESS,
    });
    
    // Get all valid listings to find the one we want
    const allListings = await getAllValidListings({
      contract: marketplaceContract
    });
    
    // Find the listing with the matching ID
    const listing = allListings.find(l => l.id.toString() === listingId);
    
    if (!listing) {
      console.error(`Listing ${listingId} not found`);
      return null;
    }
    
    // Get NFT metadata using our standardized service
    const nftMetadata = await getNFTMetadata(
      listing.assetContractAddress,
      listing.asset.id.toString()
    );
    
    // Parse listing data to match our interface
    const parsedListing: IListingWithNFT = {
      listingId: listing.id.toString(),
      tokenId: listing.asset.id.toString(),
      quantity: listing.quantity.toString(),
      pricePerToken: listing.currencyValuePerToken.displayValue,
      assetContract: listing.assetContractAddress,
      startTimestamp: Number(listing.startTimeInSeconds || 0),
      endTimestamp: Number(listing.endTimeInSeconds || 0),
      status: 1, // Assuming active
      currency: listing.currencyContractAddress,
      tokenType: 0, // Assuming ERC721
      reserved: false,
      listingCreator: listing.creatorAddress,
      
      // Use the metadata from our NFT service
      metadata: {
        image: nftMetadata.image,
        name: nftMetadata.name,
        description: nftMetadata.description || "",
        attributes: nftMetadata.attributes || []
      },
      
      // Use collection information from our NFT service
      collectionName: nftMetadata.collectionName,
      contractName: nftMetadata.collectionName,
      contractSymbol: nftMetadata.collectionSymbol,
      sellerAddress: listing.creatorAddress
    };
    
    return parsedListing;
    
  } catch (error) {
    console.error(`Error fetching listing ${listingId}:`, error);
    return null;
  }
};

/**
 * Get a direct listing by NFT contract address and token ID
 * @param contractAddress The NFT contract address
 * @param tokenId The NFT token ID
 * @returns The direct listing data if found, null otherwise
 */
export async function getDirectListing(contractAddress: string, tokenId: string): Promise<IListingWithNFT | null> {
  try {
    // Get the marketplace contract
    const marketplaceContract = getContract({
      client,
      chain: metisChain,
      address: MARKETPLACE_ADDRESS,
    });
    
    // Get all valid listings
    const allListings = await getAllValidListings({
      contract: marketplaceContract
    });
    
    // Find a listing matching the NFT
    const matchingListing = allListings.find(listing => 
      listing.assetContractAddress.toLowerCase() === contractAddress.toLowerCase() && 
      listing.asset.id.toString() === tokenId.toString()
    );
    
    if (matchingListing) {
      return getListing(matchingListing.id.toString());
    }
    
    console.log(`No direct listing found for NFT ${contractAddress}/${tokenId}`);
    return null;
  } catch (error) {
    console.error("Error fetching direct listing:", error);
    return null;
  }
}; 