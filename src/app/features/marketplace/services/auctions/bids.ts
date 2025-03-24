/**
 * Auction Bidding Operations
 * 
 * This file contains functions for bidding on auctions.
 */

import { WalletAccount } from "@/app/features/wallet/types";
import { toThirdwebAccount } from "@/app/features/wallet/utils";
import { ethers } from "ethers";
import { sendTransaction, waitForReceipt } from "thirdweb";
import { bidInAuction as bidInAuctionThirdweb, isNewWinningBid } from "thirdweb/extensions/marketplace";
import { client, MarketplaceTransactionResult, metisChain } from "../types";
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
    // Get the marketplace contract
    const marketplaceContract = getMarketplaceContract();
    
    // Convert bid amount to wei as BigInt
    const bidAmountWei = ethers.parseEther(bidAmount);
    
    // Log the check details
    console.log("Checking if winning bid:", {
      auctionId,
      bidAmount,
      bidAmountWei: bidAmountWei.toString()
    });
    
    // Check if this would be a winning bid
    const result = await isNewWinningBid({
      contract: marketplaceContract,
      auctionId: BigInt(auctionId),
      bidAmount: bidAmountWei // Must be BigInt for isNewWinningBid
    });
    
    console.log("Bid would be winning bid:", result);
    
    return result;
  } catch (error) {
    console.error("Error checking if new winning bid:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message, error.stack);
    }
    // Return false in case of error to be safe
    return false;
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
  params: { auctionId: string; bidAmount: string },
  account: WalletAccount
): Promise<MarketplaceTransactionResult> {
  try {
    const { auctionId, bidAmount } = params;
    
    // Validate required parameters
    if (!account.address) {
      throw new Error("Wallet address not found");
    }
    
    if (!auctionId) {
      throw new Error("Auction ID is required");
    }
    
    if (!bidAmount) {
      throw new Error("Bid amount is required");
    }
    
    // Determine if bidAmount is already in wei format
    const isWeiFormat = bidAmount.length > 18 || bidAmount.startsWith('0x');
    
    // Convert to ETH format for logging and checking
    const bidAmountInEth = isWeiFormat ? ethers.formatEther(bidAmount) : bidAmount;
    
    console.log(`Placing bid for auction ${auctionId} with amount ${bidAmountInEth} METIS`);
    
    // Check if this bid would be a winning bid - use ETH format for the check
    const wouldBeWinningBid = await checkIfNewWinningBid(auctionId, bidAmountInEth);
    
    if (!wouldBeWinningBid) {
      return {
        transactionHash: "",
        success: false,
        error: "Bid amount is not high enough to become the winning bid"
      };
    }
    
    // Get the marketplace contract
    const marketplaceContract = getMarketplaceContract();
    
    // Log bid details
    console.log("Bidding with amount:", bidAmountInEth, "METIS");
    console.log("Auction ID:", auctionId);
    
    // Ensure bidAmount is in wei format for the contract call
    const bidAmountInWei = isWeiFormat 
      ? BigInt(bidAmount) 
      : ethers.parseEther(bidAmount);
    
    // Create the transaction
    const transaction = bidInAuctionThirdweb({
      contract: marketplaceContract,
      auctionId: BigInt(auctionId),
      bidAmount: bidAmountInWei.toString() as any // Type cast to satisfy both systems
    });
    
    console.log("Transaction created:", transaction);
    
    // Send the transaction
    const tx = await sendTransaction({
      transaction,
      account: toThirdwebAccount(account)
    });
    
    console.log("Bid transaction sent:", tx.transactionHash);
    
    // Wait for the transaction to be confirmed
    const receipt = await waitForReceipt({
      client,
      chain: metisChain,
      transactionHash: tx.transactionHash,
    });
    
    console.log("Bid transaction confirmed:", receipt);
    
    return {
      transactionHash: tx.transactionHash,
      success: true,
      receipt
    };
    
  } catch (error: any) {
    console.error("Error placing bid:", error);
    return {
      transactionHash: error.transactionHash || "",
      success: false,
      error: error.message || "Failed to place bid"
    };
  }
} 