/**
 * Listing Helpers
 * 
 * Common utility functions for listings operations
 */

import { MARKETPLACE_ADDRESS } from "@/constants/contracts";
import { getContract } from "thirdweb";
import { client, metisChain } from "../types";

/**
 * Get the marketplace contract instance
 * @returns The marketplace contract
 */
export const getMarketplaceContract = () => {
  return getContract({
    client,
    chain: metisChain,
    address: MARKETPLACE_ADDRESS,
  });
};

/**
 * Format price for display
 * @param price The price to format
 * @returns Formatted price string
 */
export const formatPrice = (price: string): string => {
  try {
    // Remove trailing zeros
    return parseFloat(parseFloat(price).toFixed(6)).toString();
  } catch (error) {
    console.error("Error formatting price:", error);
    return price;
  }
};

/**
 * Format error message for listing operations
 * @param error The error object
 * @returns Formatted error message
 */
export const formatListingError = (error: any): string => {
  // Log the full error for debugging
  console.error("Formatting listing error:", error);
  
  const message = error?.message || "Unknown error during listing operation";
  const code = error?.code;
  const reason = error?.reason;
  
  // Format common error messages for better user experience
  if (message.includes("insufficient funds") || message.includes("insufficient balance")) {
    return "Insufficient funds to complete this transaction";
  }
  if (message.includes("user rejected") || message.includes("user denied")) {
    return "Transaction was rejected by user";
  }
  if (message.includes("listing no longer exists")) {
    return "This listing is no longer available";
  }
  if (message.includes("execution reverted")) {
    // Try to extract a reason if available
    if (reason) {
      return `Transaction failed: ${reason}`;
    }
    return "Transaction failed on the blockchain";
  }
  
  // Check for specific error codes
  if (code === -32000) {
    return "Insufficient balance for gas fee and transfer amount";
  }
  
  return message;
}; 