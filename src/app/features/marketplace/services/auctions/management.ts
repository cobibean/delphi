/**
 * Auction Management Operations
 * 
 * This file contains functions for creating and managing auctions
 * like creating, buying out, and collecting auction NFTs and payouts.
 */

import { isOwnerOf } from "@/app/features/nft/services/nft-services";
import { WalletAccount } from "@/app/features/wallet/types";
import { toThirdwebAccount } from "@/app/features/wallet/utils";
import { ethers } from "ethers";
import { prepareContractCall, sendAndConfirmTransaction } from "thirdweb";
import {
  buyoutAuction as buyoutAuctionThirdweb,
  createAuction as createAuctionThirdweb
} from "thirdweb/extensions/marketplace";
import { MarketplaceTransactionResult } from "../types";
import {
  getMarketplaceContract,
  isAuctionEnded,
  validateAuctionParams
} from "./helpers";
import { getAuction, getAuctionWinningBid } from "./queries";

/**
 * Create an auction for an NFT
 * @param params Parameters for the auction creation
 * @param account The wallet account to use
 * @returns Transaction result with hash, success status, and receipt
 */
export async function createAuction(
  params: {
    tokenContract: string;
    tokenId: string;
    minimumBidAmount: string;
    buyoutAmount?: string;
    quantity?: number;
    startTime?: number;
    endTime?: number;
    currencyAddress?: string;
    timeBufferInSeconds?: number;
    bidBufferBps?: number;
  },
  account: WalletAccount
): Promise<MarketplaceTransactionResult> {
  try {
    const { 
      tokenContract, 
      tokenId,
      minimumBidAmount,
      buyoutAmount,
      quantity = 1,
      startTime,
      endTime,
      currencyAddress,
      timeBufferInSeconds = 900, // Default 15 minutes
      bidBufferBps = 500 // Default 5%
    } = params;
    
    // Validate parameters
    if (!account || !account.address) {
      throw new Error("Valid wallet account is required");
    }
    
    if (!tokenContract || !tokenId || !minimumBidAmount) {
      throw new Error("Missing required parameters");
    }
    
    // Verify that the caller owns the NFT
    const isOwner = await isOwnerOf(
      tokenContract,
      tokenId,
      account.address
    );
    
    if (!isOwner) {
      throw new Error("You do not own this NFT");
    }
    
    // Get the marketplace contract
    const marketplaceContract = getMarketplaceContract();
    
    // Set default times if not provided
    const now = Math.floor(Date.now() / 1000);
    const auctionStartTime = startTime || now;
    const auctionEndTime = endTime || now + 7 * 24 * 60 * 60; // Default 7 days
    
    // Use the native token (METIS) as the default currency
    const currencyContractAddress = currencyAddress || ethers.ZeroAddress;
    
    // Create the auction using ThirdWeb's createAuction function
    const transaction = createAuctionThirdweb({
      contract: marketplaceContract,
      assetContractAddress: tokenContract as `0x${string}`,
      tokenId: BigInt(tokenId),
      minimumBidAmount: minimumBidAmount.toString() as any, // Type cast to satisfy ThirdWeb
      buyoutBidAmount: buyoutAmount ? buyoutAmount.toString() as any : undefined, // Optional buyout price
      currencyContractAddress: currencyContractAddress as `0x${string}`,
      quantity: BigInt(quantity),
      startTimestamp: new Date(auctionStartTime * 1000),
      endTimestamp: new Date(auctionEndTime * 1000),
      timeBufferInSeconds: timeBufferInSeconds,
      bidBufferBps: bidBufferBps
    });
    
    // Send and confirm the transaction in one step
    const receipt = await sendAndConfirmTransaction({
      transaction,
      account: toThirdwebAccount(account)
    });
    
    console.log("Create auction transaction confirmed:", receipt);
    
    return {
      transactionHash: receipt.transactionHash,
      success: true,
      receipt
    };
  } catch (error: any) {
    console.error("Error creating auction:", error);
    return {
      transactionHash: error.transactionHash || "",
      success: false,
      error: error.message || "Failed to create auction"
    };
  }
}

/**
 * Buyout an auction at the buyout price
 * 
 * This is one of the high-priority functions for standardization.
 * It has been refactored to work with our standardized wallet handling.
 * 
 * @param params Parameters for the buyout
 * @param account The wallet account to use
 * @returns Transaction result with hash, success status, and receipt
 */
export async function buyoutAuction(
  params: { auctionId: string },
  account: WalletAccount
): Promise<MarketplaceTransactionResult> {
  try {
    const { auctionId } = params;
    console.log("Buying out auction with ID:", auctionId);
    
    // Validate required parameters
    if (!account.address) {
      throw new Error("Wallet address not found");
    }
    
    if (!auctionId) {
      throw new Error("Auction ID is required");
    }
    
    // Get the marketplace contract
    const marketplaceContract = getMarketplaceContract();
    
    // After ensuring proper approval, create the buyout transaction
    const transaction = buyoutAuctionThirdweb({
      contract: marketplaceContract,
      auctionId: BigInt(auctionId)
    });
    
    // Send and confirm the transaction in one step
    const receipt = await sendAndConfirmTransaction({
      transaction,
      account: toThirdwebAccount(account)
    });
    
    console.log("Buyout auction transaction confirmed:", receipt);
    
    return {
      transactionHash: receipt.transactionHash,
      success: true, 
      receipt
    };
  } catch (error: any) {
    console.error("Error buying out auction:", error);
    return {
      transactionHash: error.transactionHash || "",
      success: false,
      error: error.message || "Failed to buy out auction"
    };
  }
}

/**
 * Collect an NFT from a closed auction (for winning bidder)
 * @param params The auction ID
 * @param account The wallet account to use for collection
 * @returns Transaction result with status
 */
export async function collectAuctionNFT(
  params: { auctionId: string },
  account: WalletAccount
): Promise<MarketplaceTransactionResult> {
  try {
    const { auctionId } = params;
    
    // Validate parameters
    const validationError = validateAuctionParams(auctionId, account);
    if (validationError) {
      throw new Error(validationError);
    }
    
    // Get the auction to verify eligibility
    const auction = await getAuction(auctionId);
    if (!auction) {
      throw new Error(`Auction ${auctionId} not found`);
    }
    
    // Check if auction has ended
    if (!isAuctionEnded(auction.endTimestamp)) {
      throw new Error("Auction has not ended yet");
    }
    
    // Get the winning bid
    const winningBid = await getAuctionWinningBid(auctionId);
    if (!winningBid) {
      throw new Error("No winning bid found for this auction");
    }
    
    // Verify that the caller is the winning bidder
    if (winningBid.bidder.toLowerCase() !== account.address.toLowerCase()) {
      throw new Error("Only the winning bidder can collect this NFT");
    }
    
    // Since ThirdWeb V5 doesn't provide a direct collectAuctionNFT function,
    // we'll use a contract call to the marketplace
    
    // Prepare contract call using ThirdWeb's prepareContractCall
    const marketplace = getMarketplaceContract();
    const transaction = prepareContractCall({
      contract: marketplace,
      method: "function closeAuction(uint256)", 
      params: [BigInt(auctionId)]
    });
    
    // Send and confirm the transaction in one step
    const receipt = await sendAndConfirmTransaction({
      transaction,
      account: toThirdwebAccount(account)
    });
    
    console.log("Collect NFT transaction confirmed:", receipt);
    
    return {
      transactionHash: receipt.transactionHash,
      success: true,
      receipt
    };
  } catch (error: any) {
    console.error("Error claiming NFT:", error);
    return {
      transactionHash: error.transactionHash || "",
      success: false,
      error: error.message || "Failed to claim NFT"
    };
  }
}

/**
 * Collect payout for an auction (for sellers)
 * @param params Parameters for the collection
 * @param account The wallet account to use
 * @returns Transaction result
 */
export async function collectAuctionPayoutForSeller(
  params: { auctionId: string },
  account: WalletAccount
): Promise<MarketplaceTransactionResult> {
  try {
    const { auctionId } = params;
    
    // Validate parameters
    const validationError = validateAuctionParams(auctionId, account);
    if (validationError) {
      throw new Error(validationError);
    }
    
    // Get the auction to verify seller
    const auction = await getAuction(auctionId);
    if (!auction) {
      throw new Error(`Auction ${auctionId} not found`);
    }
    
    // Check if auction has ended
    if (!isAuctionEnded(auction.endTimestamp)) {
      throw new Error("Auction has not ended yet");
    }
    
    // Verify that the caller is the auction creator/seller
    const creatorAddress = auction.creatorAddress || auction.listingCreator;
    if (creatorAddress && creatorAddress.toLowerCase() !== account.address.toLowerCase()) {
      // Check if the caller has ownership of the original NFT contract (could be admin)
      const isContractOwner = await isOwnerOf(
        auction.assetContract,
        auction.tokenId,
        account.address
      );
      
      if (!isContractOwner) {
        throw new Error("Only the auction creator or NFT owner can collect this payout");
      }
    }
    
    // Since ThirdWeb V5 doesn't provide a direct collectAuctionPayoutForSeller function,
    // we'll use a contract call to the marketplace
    
    // Prepare contract call using ThirdWeb's prepareContractCall
    const marketplace = getMarketplaceContract();
    const transaction = prepareContractCall({
      contract: marketplace,
      method: "function claimAuctionPayout(uint256)", 
      params: [BigInt(auctionId)]
    });
    
    // Send and confirm the transaction in one step
    const receipt = await sendAndConfirmTransaction({
      transaction,
      account: toThirdwebAccount(account)
    });
    
    console.log("Collect payout transaction confirmed:", receipt);
    
    return {
      transactionHash: receipt.transactionHash,
      success: true,
      receipt
    };
  } catch (error: any) {
    console.error("Error collecting payout:", error);
    return {
      transactionHash: error.transactionHash || "",
      success: false,
      error: error.message || "Failed to collect payout"
    };
  }
} 