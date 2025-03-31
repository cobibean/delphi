/**
 * Marketplace Service Utilities
 * 
 * This file provides utility functions for marketplace operations,
 * extracted from the monolithic marketplace-v5.ts file as part of our
 * standardization and modularization process.
 */

import { WalletAccount } from "@/app/features/wallet/types";
import { toThirdwebAccount } from "@/app/features/wallet/utils";
import { MARKETPLACE_ADDRESS } from "@/constants/contracts";
import { sendAndConfirmTransaction } from "thirdweb";
import { MarketplaceTransactionResult } from "./types";

/**
 * Enhanced error logging utility for contract interactions
 * Provides detailed error information for debugging
 */
export const logContractError = (error: any, operation: string): void => {
  console.error(`Error during ${operation}:`, error);
  console.error("Error type:", typeof error);
  
  if (error.code) console.error("Error code:", error.code);
  if (error.message) console.error("Error message:", error.message);
  if (error.data) console.error("Error data:", error.data);
  if (error.transaction) console.error("Error transaction:", error.transaction);
  if (error.receipt) console.error("Error receipt:", error.receipt);
  if (error.reason) console.error("Error reason:", error.reason);
  
  // Try to parse error message for more details
  if (error.message) {
    if (error.message.includes("execution reverted")) {
      console.error("Contract execution reverted");
      
      // Try to extract revert reason
      const revertMatch = error.message.match(/reason string '([^']+)'/);
      if (revertMatch && revertMatch[1]) {
        console.error("Revert reason:", revertMatch[1]);
      }
    }
  }
};

/**
 * Enhanced formatIPFSUrl function with better IPFS handling
 * Converts various IPFS formats to a consistent URL format
 */
export const formatIPFSUrl = (url: string): string => {
  if (!url) {
    return '';
  }
  
  // Extract the IPFS hash from various formats
  let ipfsHash = '';
  
  // Handle ipfs:// protocol
  if (url.startsWith('ipfs://')) {
    ipfsHash = url.substring(7); // Remove 'ipfs://'
  }
  // Handle URLs with /ipfs/ path
  else if (url.includes('/ipfs/')) {
    ipfsHash = url.split('/ipfs/')[1];
  }
  // Handle direct CID format
  else if (/^[a-zA-Z0-9]{46,}$/.test(url)) {
    ipfsHash = url;
  }
  
  // If we extracted an IPFS hash, use our proxy
  if (ipfsHash) {
    // Use our own proxy API route
    const proxyUrl = `/api/ipfs-proxy?hash=${encodeURIComponent(ipfsHash)}`;
    return proxyUrl;
  }
  
  // If it's already an HTTP URL, return it as is
  if (url.startsWith('http')) {
    return url;
  }
  
  // Default case: return the original URL
  return url;
};

/**
 * Check if a timestamp has passed
 * @deprecated Use isAuctionEnded from the auctions module instead
 */
export function hasTimestampPassed(timestamp: number): boolean {
  const now = Math.floor(Date.now() / 1000);
  return now >= timestamp;
}

/**
 * Parse BigInt from various formats safely
 * Handles string, number, and hex string formats
 */
export function parseBigInt(value: string | number | bigint): bigint {
  if (typeof value === 'bigint') return value;
  
  if (typeof value === 'string') {
    // Handle hex strings
    if (value.startsWith('0x')) {
      return BigInt(value);
    }
    
    // Handle decimal strings
    return BigInt(value);
  }
  
  // Handle numbers
  return BigInt(Math.floor(value));
}

/**
 * Get the marketplace contract address
 * Centralizes the marketplace address reference
 */
export function getMarketplaceAddress(): string {
  return MARKETPLACE_ADDRESS;
}

/**
 * Format a price for display
 * Converts from wei to a human-readable format
 */
export function formatPrice(price: string | bigint): string {
  if (!price) return "0";
  
  try {
    // Convert to BigInt first to handle various input formats
    const bigintPrice = typeof price === 'string' ? BigInt(price) : price;
    
    // Convert to string with 18 decimal places (standard for most tokens)
    const fullString = bigintPrice.toString().padStart(19, '0');
    const integerPart = fullString.slice(0, -18) || '0';
    const decimalPart = fullString.slice(-18).replace(/0+$/, '');
    
    // Return formatted string, removing trailing zeros
    return decimalPart.length > 0 
      ? `${integerPart}.${decimalPart}` 
      : integerPart;
  } catch (error) {
    console.error("Error formatting price:", error);
    return "0";
  }
}

/**
 * Execute a transaction using ThirdWeb's sendAndConfirmTransaction
 * This adapter function maintains compatibility with our wallet system
 */
export async function executeThirdwebTransaction(
  transaction: any,
  account: WalletAccount
): Promise<MarketplaceTransactionResult> {
  if (!account || !account.address) {
    throw new Error("Valid wallet account is required");
  }
  
  try {
    // Convert our account to a ThirdWeb account using the utility
    const thirdwebAccount = toThirdwebAccount(account);
    
    // Execute the transaction using ThirdWeb's sendAndConfirmTransaction
    console.log("Executing transaction with ThirdWeb account:", {
      address: thirdwebAccount.address,
      hasSignMessage: !!thirdwebAccount.signMessage,
      hasSendTransaction: !!thirdwebAccount.sendTransaction
    });
    
    const receipt = await sendAndConfirmTransaction({
      transaction,
      account: thirdwebAccount,
    });
    
    console.log("Transaction successful:", receipt);
    
    return {
      transactionHash: receipt.transactionHash,
      success: true,
      receipt
    };
  } catch (error: any) {
    console.error("Transaction failed:", error);
    
    return {
      transactionHash: error.transactionHash || "",
      success: false,
      error: error.message || "Transaction failed"
    };
  }
} 