/**
 * Auction Queries
 * 
 * This file contains read-only functions for retrieving auction data.
 */

import { getNFTMetadata } from "@/app/features/nft/services/nft-services";
import { ethers } from "ethers";
import { getContractEvents } from "thirdweb";
import {
    getAllValidAuctions,
    getWinningBid,
    newBidEvent
} from "thirdweb/extensions/marketplace";
import { toEther } from "thirdweb/utils";
import { AuctionBid, IListingWithNFT } from "../types";
import { getMarketplaceContract } from "./helpers";

/**
 * Get all active auctions from the marketplace
 * @returns Array of auctions with NFT metadata
 */
export const getAllAuctions = async (): Promise<IListingWithNFT[]> => {
  try {
    // Get the marketplace contract
    const marketplaceContract = getMarketplaceContract();
    
    // Get all valid auctions using the marketplace extension
    const auctions = await getAllValidAuctions({
      contract: marketplaceContract
    });
    
    console.log(`Found ${auctions.length} auctions`);
    
    // Convert auctions to our interface format
    const enhancedAuctions = await Promise.all(
      auctions.map(async (auction) => {
        try {
          return await getAuction(auction.id.toString());
        } catch (error) {
          console.error(`Error enhancing auction ${auction.id}:`, error);
          return null;
        }
      })
    );
    
    // Filter out null auctions
    const validAuctions = enhancedAuctions.filter(auction => auction !== null) as IListingWithNFT[];
    
    console.log(`Found ${validAuctions.length} valid auctions`);
    return validAuctions;
    
  } catch (error) {
    console.error("Error fetching auctions:", error);
    return [];
  }
};

/**
 * Get a specific auction by ID with NFT metadata
 * @param auctionId The ID of the auction to retrieve
 * @returns Auction information with NFT metadata
 */
export const getAuction = async (auctionIdOrContractAddress: string, tokenId?: string): Promise<IListingWithNFT | null> => {
  try {
    // Get the marketplace contract
    const marketplaceContract = getMarketplaceContract();
    
    // Get all valid auctions to find the one we want
    const allAuctions = await getAllValidAuctions({
      contract: marketplaceContract
    });
    
    let auction;
    
    // If tokenId is provided, we're looking for an auction by contract and token ID
    if (tokenId) {
      auction = allAuctions.find(a => 
        a.assetContractAddress.toLowerCase() === auctionIdOrContractAddress.toLowerCase() && 
        a.tokenId.toString() === tokenId.toString()
      );
      
      if (!auction) {
        console.log(`No auction found for NFT ${auctionIdOrContractAddress}/${tokenId}`);
        return null;
      }
    } else {
      // Otherwise, we're looking for an auction by ID
      auction = allAuctions.find(a => a.id.toString() === auctionIdOrContractAddress);
      
      if (!auction) {
        console.error(`Auction ${auctionIdOrContractAddress} not found`);
        return null;
      }
    }
    
    // Get NFT metadata using our standardized service
    const nftMetadata = await getNFTMetadata(
      auction.assetContractAddress,
      auction.tokenId.toString()
    );
    
    // Get the winning bid if any
    let currentBid: string | undefined = undefined;
    let currentBidder: string | undefined = undefined;
    
    try {
      const winningBid = await getWinningBid({
        contract: marketplaceContract,
        auctionId: auction.id
      });
      
      if (winningBid && winningBid.bidderAddress !== ethers.ZeroAddress) {
        // Format from wei to METIS
        currentBid = ethers.formatEther(winningBid.bidAmountWei);
        currentBidder = winningBid.bidderAddress;
        console.log(`Current winning bid for auction ${auction.id}: ${currentBid} METIS (from ${winningBid.bidAmountWei.toString()} wei)`);
      }
    } catch (error) {
      console.error("Error fetching winning bid:", error);
    }
    
    // Format the minimum bid amount from wei to METIS
    const minimumBidAmountInMetis = ethers.formatEther(auction.minimumBidAmount);
    
    // Format the buyout price from wei to METIS (if it exists)
    const buyoutPriceInMetis = auction.buyoutBidAmount 
      ? ethers.formatEther(auction.buyoutBidAmount) 
      : "";
    
    console.log(`Auction ${auction.id} price details:`);
    console.log(`  - Minimum bid: ${minimumBidAmountInMetis} METIS (from ${auction.minimumBidAmount.toString()} wei)`);
    if (auction.buyoutBidAmount) {
      console.log(`  - Buyout price: ${buyoutPriceInMetis} METIS (from ${auction.buyoutBidAmount.toString()} wei)`);
    }
    
    // Format the auction with NFT data
    const auctionWithNFT: IListingWithNFT = {
      listingId: auction.id.toString(),
      assetContract: auction.assetContractAddress,
      tokenId: auction.tokenId.toString(),
      quantity: auction.quantity.toString(),
      listingCreator: auction.creatorAddress,
      startTimestamp: Number(auction.startTimeInSeconds),
      endTimestamp: Number(auction.endTimeInSeconds),
      endTimeInSeconds: Number(auction.endTimeInSeconds),
      currency: auction.currencyContractAddress,
      pricePerToken: "0",
      status: 1,
      tokenType: 0,
      reserved: false,
      currentBid,
      currentBidder,
      type: "auction",
      minimumBidAmount: minimumBidAmountInMetis, // Use formatted value
      buyoutPrice: buyoutPriceInMetis, // Use formatted value
      metadata: {
        name: nftMetadata.name,
        description: nftMetadata.description || "",
        image: nftMetadata.image,
        attributes: nftMetadata.attributes || []
      },
      contractName: nftMetadata.collectionName,
      collectionName: nftMetadata.collectionName,
      contractSymbol: nftMetadata.collectionSymbol,
      assetContractAddress: auction.assetContractAddress,
      creatorAddress: auction.creatorAddress,
      id: auction.id.toString(),
      isAuction: true
    };
    
    return auctionWithNFT;
  } catch (error) {
    console.error(`Error fetching auction:`, error);
    return null;
  }
};

/**
 * Get bid history for an auction
 * @param auctionId The ID of the auction
 * @returns Array of bid information
 */
export const getAuctionBidHistory = async (auctionId: string): Promise<AuctionBid[]> => {
  try {
    // Get the marketplace contract
    const marketplaceContract = getMarketplaceContract();
    
    // Get bid events
    const bidEvents = await getContractEvents({
      contract: marketplaceContract,
      events: [
        newBidEvent({
          auctionId: BigInt(auctionId)
        })
      ],
      // Get the last 100 events to ensure we don't miss any
      fromBlock: "earliest",
      toBlock: "latest"
    });
    
    // Format bid history
    const formattedBidHistory = bidEvents.map(event => {
      // Access the args property safely with type assertion
      const args = event.args as { bidder: string; bidAmount: bigint; };
      
      return {
        bidder: args.bidder,
        bidAmount: toEther(args.bidAmount),
        // Just use current time as fallback since we can't access block timestamp reliably
        timestamp: Math.floor(Date.now() / 1000) - (bidEvents.indexOf(event) * 60), // Approximate time (newer bids first)
        transactionHash: event.transactionHash || ""
      };
    }).sort((a, b) => b.timestamp - a.timestamp); // Sort by timestamp (newest first)
    
    console.log(`Found ${formattedBidHistory.length} bids for auction ${auctionId}`);
    
    return formattedBidHistory;
  } catch (error) {
    console.error(`Error getting bid history for auction ${auctionId}:`, error);
    return [];
  }
};

/**
 * Get the current winning bid for an auction
 * @param auctionId The ID of the auction
 * @returns The winning bid details or null if no bids
 */
export async function getAuctionWinningBid(auctionId: string): Promise<AuctionBid | null> {
  try {
    // Get the marketplace contract
    const marketplaceContract = getMarketplaceContract();
    
    // Get the winning bid
    const winningBid = await getWinningBid({
      contract: marketplaceContract,
      auctionId: BigInt(auctionId)
    });
    
    if (!winningBid || winningBid.bidderAddress === ethers.ZeroAddress) {
      return null;
    }
    
    // Convert from wei to METIS
    const bidAmountInMetis = toEther(winningBid.bidAmountWei);
    
    return {
      bidder: winningBid.bidderAddress,
      bidAmount: bidAmountInMetis,
      timestamp: Date.now() / 1000 // ThirdWeb doesn't return timestamp, so use current time
    };
  } catch (error) {
    console.error("Error getting winning bid:", error);
    return null;
  }
} 