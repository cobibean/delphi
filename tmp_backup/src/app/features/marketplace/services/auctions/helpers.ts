/**
 * Auction Helpers
 * 
 * This file contains helper functions used across auction operations.
 */

import { WalletAccount } from "@/app/features/wallet/types";
import { MARKETPLACE_ADDRESS } from "@/constants/contracts";
import { ethers } from "ethers";
import { getContract } from "thirdweb";
import { client, metisChain } from "../types";

/**
 * Get the marketplace contract instance
 * @returns The marketplace contract instance
 */
export function getMarketplaceContract() {
  return getContract({
    client,
    chain: metisChain,
    address: MARKETPLACE_ADDRESS,
  });
}

/**
 * Convert an amount from ETH to Wei
 * @param amount Amount in ETH
 * @returns Amount in Wei as BigInt
 */
export function toWei(amount: string): bigint {
  return ethers.parseEther(amount);
}

/**
 * Format an error message from a blockchain transaction
 * @param error The error object
 * @returns Formatted error message
 */
export function formatAuctionError(error: any): string {
  if (error.reason) {
    return `Error: ${error.reason}`;
  } else if (error.message) {
    // Clean up common error messages
    const message = error.message
      .replace("execution reverted: ", "")
      .replace("MetaMask Tx Signature: ", "");
      
    return message;
  } else {
    return "Unknown auction error occurred";
  }
}

/**
 * Validate auction parameters
 * @param auctionId The auction ID
 * @param account The wallet account
 * @returns An error message if validation fails, null otherwise
 */
export function validateAuctionParams(
  auctionId: string | undefined, 
  account: WalletAccount | null
): string | null {
  if (!account || !account.address) {
    return "Valid wallet account is required";
  }
  
  if (!auctionId) {
    return "Auction ID is required";
  }
  
  return null;
}

/**
 * Check if an auction has ended
 * @param endTimestamp The end timestamp of the auction
 * @returns Boolean indicating if the auction has ended
 */
export function isAuctionEnded(endTimestamp: number): boolean {
  const now = Math.floor(Date.now() / 1000);
  return endTimestamp <= now;
} 