/**
 * Auction Bidding Operations
 * 
 * This file contains functions for bidding on auctions.
 */

import { WalletAccount } from "@/app/features/wallet/types";
import { ethers } from "ethers";
import { bidInAuction as bidInAuctionThirdweb, getAuction, isNewWinningBid } from "thirdweb/extensions/marketplace";
import { MarketplaceTransactionResult } from "../types";
import { executeThirdwebTransaction } from "../utils";
import { getMarketplaceContract } from "./helpers";

/**
 * Check if a bid amount would be the new winning bid for an auction
 * @param auctionId The ID of the auction
 * @param bidAmount The bid amount to check in ETH
 * @returns Boolean indicating if the bid would be the new winning bid
 */
export async function checkIfNewWinningBid(
  auctionId: string, 
  bidAmount: string
): Promise<boolean> {
  try {
    console.log(`Checking if bid amount ${bidAmount} would be winning for auction ${auctionId}`);
    
    // Get marketplace contract
    const marketplaceContract = getMarketplaceContract();
    
    // Convert the bid amount to wei format first
    const bidAmountInWei = ethers.parseUnits(bidAmount, "ether");
    
    // Check if this would be a winning bid
    const result = await isNewWinningBid({
      contract: marketplaceContract,
      auctionId: BigInt(auctionId),
      bidAmount: bidAmountInWei.toString() as any // Convert to string with type cast
    });
    
    return result;
  } catch (error: any) {
    console.error("Error checking if bid would be winning:", error);
    throw new Error(`Failed to check bid status: ${error.message}`);
  }
}

/**
 * Place a bid on an auction
 * 
 * This is one of the high-priority functions for standardization.
 * It has been refactored to work with our standardized wallet handling.
 * 
 * @param params Parameters for the bid
 * @param account The wallet account to use
 * @returns Transaction result with hash, success status, and receipt
 */
export async function placeBid(
  { auctionId, bidAmount }: { 
    auctionId: string; 
    bidAmount: string;
  },
  account: WalletAccount
): Promise<MarketplaceTransactionResult> {
  try {
    console.log(`Placing bid on auction ${auctionId} with amount: ${bidAmount}`);
    
    if (!account || !account.address) {
      throw new Error("Valid wallet account is required");
    }

    // Get marketplace contract
    const marketplaceContract = getMarketplaceContract();

    try {
      // Get auction to verify it exists
      const auction = await getAuction({
        contract: marketplaceContract,
        auctionId: BigInt(auctionId),
      });
      
      if (!auction) {
        throw new Error(`No auction found with ID ${auctionId}`);
      }
      
      // Check if the auction has a buyout price and if the bid exceeds it
      if (auction.buyoutBidAmount) {
        const buyoutPriceInEther = ethers.formatEther(auction.buyoutBidAmount.toString());
        const bidAmountValue = parseFloat(bidAmount);
        const buyoutAmount = parseFloat(buyoutPriceInEther);
        
        console.log(`Comparing bid amount ${bidAmountValue} with buyout amount ${buyoutAmount}`);
        
        // Use a small threshold (0.0000001) to handle potential floating point precision issues
        // Also make the error message match exactly what the ThirdWeb SDK returns
        if (bidAmountValue + 0.0000001 >= buyoutAmount) {
          throw new Error("Bid amount is above the buyout amount");
        }
      }

      // Convert the bid amount to wei format
      let bidAmountInWei = ethers.parseUnits(bidAmount, "ether");

      // Check if this would be a winning bid
      const isWinningBid = await isNewWinningBid({
        contract: marketplaceContract,
        auctionId: BigInt(auctionId),
        bidAmount: bidAmountInWei.toString() as any // Convert to string with type cast
      });
      
      if (!isWinningBid) {
        throw new Error("Bid amount is too low to become the new winning bid");
      }

      // Get buyout amount to ensure our bid doesn't exceed it
      // The ThirdWeb SDK has an internal validation that the bid can't exceed buyout
      // But its BigInt comparison can sometimes fail due to rounding, so we handle it manually
      if (auction.buyoutBidAmount) {
        const buyoutPrice = auction.buyoutBidAmount;
        const buyoutPriceNum = parseFloat(ethers.formatEther(buyoutPrice.toString()));
        const bidAmountNum = parseFloat(bidAmount);
          
        // Subtract a tiny amount from the buyout price to ensure we don't hit the ThirdWeb validation
        if (bidAmountNum >= buyoutPriceNum - 0.000001) {
          const adjustedBidAmount = (buyoutPriceNum - 0.001).toFixed(6);
          console.log(`Adjusting bid from ${bidAmount} to ${adjustedBidAmount} to avoid buyout limit`);
          bidAmount = adjustedBidAmount;
          // Recalculate the wei amount
          bidAmountInWei = ethers.parseUnits(bidAmount, "ether");
        }
      }

      // Create the transaction
      const transaction = bidInAuctionThirdweb({
        contract: marketplaceContract,
        auctionId: BigInt(auctionId),
        bidAmount: bidAmountInWei.toString() as any // Convert to string with type cast
      });
      
      // Send and confirm transaction
      const txResult = await executeThirdwebTransaction(transaction, account);
      console.log("Bid placed successfully:", txResult.transactionHash);
      return txResult;
    } catch (auctionError: any) {
      console.error("Error placing bid on auction:", auctionError);
      throw new Error(`Error placing bid: ${auctionError.message}`);
    }
  } catch (error: any) {
    console.error("Error in placeBid:", error);
    return {
      transactionHash: error.transactionHash || "",
      success: false,
      error: error.message || "Failed to place bid"
    };
  }
} 