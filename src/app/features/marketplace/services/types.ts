/**
 * Marketplace Service Types
 * 
 * This file defines the types and interfaces for marketplace operations,
 * extracted from the monolithic marketplace-v5.ts file as part of our
 * standardization and modularization process.
 */

import { metisChain } from "@/app/config/chain";
import { client } from "@/app/config/client";
import { INFTMetadata } from "@/app/interfaces/interfaces";
import type { Chain as ThirdwebChain } from "thirdweb";

// Re-export chain and client for consistency
export { client, metisChain };
export type Chain = ThirdwebChain;

// Add interfaces for auctions
export interface IAuction {
  auctionId: string;
  tokenId: string;
  quantity: string;
  minimumBidAmount: string;
  buyoutBidAmount: string;
  timeBufferInSeconds: number;
  bidBufferBps: number;
  startTimestamp: number;
  endTimestamp: number;
  auctionCreator: string;
  assetContract: string;
  currency: string;
  tokenType: number;
  status: number;
  highestBid?: {
    bidder: string;
    amount: string;
  };
}

// Define the IDirectListing interface
export interface IDirectListing {
  listingId: string;
  tokenId: string;
  quantity: string;
  pricePerToken: string;
  assetContract: string;
  startTimestamp: number;
  endTimestamp: number;
  status: number;
  currency: string;
  tokenType: number;
  reserved: false;
  listingCreator: string;
}

// Update the IListingWithNFT interface to fix buyoutPrice type
export interface IListingWithNFT extends IDirectListing {
  metadata?: INFTMetadata;
  collectionName?: string;
  sellerAddress?: string;
  currentBid?: string;
  currentBidder?: string;
  minimumBidAmount?: string;
  buyoutPrice?: string; // Keep it simple - just string or undefined
  assetContractAddress?: string;
  type?: string;
  contractName?: string;
  contractSymbol?: string;
  endTimeInSeconds?: number;
  creatorAddress?: string;
  id?: string;
  isAuction?: boolean; // Add this property to explicitly check auction type
}

// Transaction result types for marketplace operations
export interface MarketplaceTransactionResult {
  transactionHash: string;
  success: boolean;
  receipt?: any;
  error?: string;
}

// Listing/auction filter parameters
export interface MarketplaceFilterParams {
  collectionAddress?: string;
  tokenId?: string;
  seller?: string;
  status?: 'active' | 'ended' | 'all';
  limit?: number;
  offset?: number;
}

// Auction bid information
export interface AuctionBid {
  bidder: string;
  bidAmount: string;
  timestamp: number;
  transactionHash?: string;
} 