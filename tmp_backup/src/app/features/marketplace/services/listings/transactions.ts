/**
 * Listing Transactions
 * 
 * Transaction functions for marketplace listings
 */

import { isOwnerOf } from "@/app/features/nft/services/nft-services";
import { WalletAccount } from "@/app/features/wallet/types";
import { toThirdwebAccount } from "@/app/features/wallet/utils";
import { sendTransaction, waitForReceipt } from "thirdweb";
import {
  buyFromListing,
  cancelListing as cancelListingThirdweb,
  createListing,
  getListing as getThirdwebListing
} from "thirdweb/extensions/marketplace";
import { client, MarketplaceTransactionResult, metisChain } from "../types";
import { formatListingError, getMarketplaceContract } from "./helpers";
import { getListing } from "./queries";

// Import ethers directly for proper typing
import { ethers } from "ethers";

// Create the address zero constant to avoid using ethers.constants
const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

/**
 * Buy an NFT with METIS (native token)
 * 
 * This is one of the high-priority functions for standardization.
 * It has been refactored to work with our standardized wallet handling.
 * 
 * @param params Parameters for the purchase
 * @param account The wallet account to use
 * @returns Transaction result with hash, success status, and receipt
 */
export async function buyWithMetis(
  params: { listingId: string },
  account: WalletAccount
): Promise<MarketplaceTransactionResult> {
  // Validate account
  if (!account || !account.address) {
    throw new Error("Valid wallet account is required");
  }
  
  try {
    console.log("Buying listing with ID:", params.listingId);
    
    // Get the marketplace contract
    const marketplaceContract = getMarketplaceContract();
    
    // Get the listing to purchase
    const listing = await getThirdwebListing({
      contract: marketplaceContract,
      listingId: BigInt(params.listingId),
    });
    
    if (!listing) {
      throw new Error(`No listing found with ID ${params.listingId}`);
    }
    
    console.log("Found listing:", listing);
    
    // Check that it's a direct listing
    if (listing.type !== "direct-listing") {
      throw new Error("Cannot buy an auction listing - use placeBid instead");
    }
    
    // Create the buy transaction
    const transaction = buyFromListing({
      contract: marketplaceContract,
      listingId: listing.id,
      quantity: listing.quantity,
      recipient: account.address,
    });
    
    // Convert our wallet account to ThirdWeb compatible account
    const thirdwebAccount = toThirdwebAccount(account);
    
    // Send the transaction
    const receipt = await sendTransaction({
      transaction,
      account: thirdwebAccount,
    });
    
    console.log("Transaction sent:", receipt);
    
    // Wait for transaction confirmation
    const confirmedReceipt = await waitForReceipt({
      client,
      chain: metisChain,
      transactionHash: receipt.transactionHash,
    });
    
    console.log("Transaction confirmed:", confirmedReceipt);
    
    return {
      transactionHash: receipt.transactionHash,
      success: true,
      receipt: confirmedReceipt,
    };
  } catch (error: any) {
    console.error("Error buying listing:", error);
    return {
      transactionHash: error.transactionHash || "",
      success: false,
      error: formatListingError(error),
    };
  }
}

/**
 * Buy from a direct listing
 * Wrapper around buyWithMetis for backward compatibility
 * 
 * @param params Parameters for the purchase
 * @param account The wallet account to use
 * @returns Transaction result with hash, success status, and receipt
 */
export async function buyFromDirectListing(
  params: { listingId: string },
  account: WalletAccount
): Promise<MarketplaceTransactionResult> {
  return buyWithMetis(params, account);
}

/**
 * Create a direct listing for an NFT
 * 
 * @param params Listing parameters
 * @param account The wallet account to use
 * @returns Transaction result with hash, success status, and receipt
 */
export async function createDirectListing(
  params: {
    tokenContract: string;
    tokenId: string;
    pricePerToken: string;
    quantity?: number;
    startTime?: number;
    endTime?: number;
    currencyAddress?: string;
  },
  account: WalletAccount
): Promise<MarketplaceTransactionResult> {
  // Validate account
  if (!account || !account.address) {
    throw new Error("Valid wallet account is required");
  }
  
  try {
    console.log("Creating direct listing with parameters:", {
      tokenContract: params.tokenContract,
      tokenId: params.tokenId,
      pricePerToken: params.pricePerToken
    });
    
    // Verify that the user owns the NFT
    try {
      const isOwner = await isOwnerOf(
        params.tokenContract,
        params.tokenId,
        account.address
      );
      
      if (!isOwner) {
        throw new Error(`You don't own this NFT (${params.tokenContract}/${params.tokenId})`);
      }
    } catch (ownershipError) {
      console.error("Ownership verification error:", ownershipError);
      throw ownershipError;
    }
    
    // Get the marketplace contract
    const marketplaceContract = getMarketplaceContract();
    
    // Set default values
    const quantity = params.quantity || 1;
    const startTime = params.startTime || Math.floor(Date.now() / 1000);
    const oneYearFromNow = Math.floor(Date.now() / 1000) + 31536000; // 1 year in seconds
    const endTime = params.endTime || oneYearFromNow;
    
    // Convert price from METIS to wei
    // Need to ensure this is a string to avoid potential BigNumber issues
    const priceInWei = ethers.parseUnits(params.pricePerToken, 18).toString();
    
    // Import MarketplaceABI for direct access to createListing
    const MarketplaceABI = (await import("@/constants/MarketplaceABI")).default;
    
    console.log("Creating listing with price:", priceInWei);
    console.log("Using address:", account.address);
    
    // Create listing parameters that match the ABI structure exactly
    const listingParams = {
      assetContract: params.tokenContract,
      tokenId: params.tokenId,
      quantity: quantity.toString(),
      currency: params.currencyAddress || ADDRESS_ZERO,
      pricePerToken: priceInWei,
      startTimestamp: startTime.toString(),
      endTimestamp: endTime.toString(),
      reserved: false
    };
    
    // Log the exact parameters being sent to the contract
    console.log("Direct listing parameters:", JSON.stringify(listingParams, null, 2));
    
    // Convert our wallet account to ThirdWeb compatible account
    const thirdwebAccount = toThirdwebAccount(account);
    
    // Use the ThirdWeb extension directly since it's already imported
    // This ensures we're using the correct method signature
    const transaction = createListing({
      contract: marketplaceContract,
      assetContractAddress: params.tokenContract as `0x${string}`,
      tokenId: BigInt(params.tokenId),
      pricePerTokenWei: priceInWei,
      currencyContractAddress: (params.currencyAddress || ADDRESS_ZERO) as `0x${string}`,
      isReservedListing: false,
      quantity: BigInt(quantity),
      startTimestamp: new Date(startTime * 1000),
      endTimestamp: new Date(endTime * 1000)
    });
    
    if (!transaction) {
      throw new Error("Failed to create transaction for direct listing");
    }
    
    console.log("Transaction prepared:", transaction);
    
    // Send the transaction
    const receipt = await sendTransaction({
      transaction,
      account: thirdwebAccount,
    });
    
    console.log("Transaction sent:", receipt);
    
    // Wait for transaction confirmation
    const confirmedReceipt = await waitForReceipt({
      client,
      chain: metisChain,
      transactionHash: receipt.transactionHash,
    });
    
    console.log("Transaction confirmed:", confirmedReceipt);
    
    return {
      transactionHash: receipt.transactionHash,
      success: true,
      receipt: confirmedReceipt,
    };
  } catch (error: any) {
    console.error("Error creating direct listing:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    
    // Extract useful information from the error
    let errorMessage = "Failed to create listing: ";
    
    if (error.code === "INSUFFICIENT_FUNDS") {
      errorMessage = "You don't have enough balance to complete this transaction";
    } else if (error.code === "ACTION_REJECTED") {
      errorMessage = "Transaction was rejected in your wallet";
    } else if (error.message) {
      // Try to extract a useful error message
      if (error.message.includes("execution reverted")) {
        const revertMatch = error.message.match(/reason string '([^']+)'/);
        if (revertMatch && revertMatch[1]) {
          errorMessage += revertMatch[1];
        } else {
          errorMessage += "Transaction reverted by the contract";
        }
      } else {
        errorMessage += error.message;
      }
    }
    
    return {
      transactionHash: error.transactionHash || "",
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Cancel a direct listing
 * 
 * @param params Parameters with the listingId to cancel
 * @param account The wallet account to use
 * @returns Transaction result with hash, success status, and receipt
 */
export async function cancelListing(
  params: { listingId: string },
  account: WalletAccount
): Promise<MarketplaceTransactionResult> {
  // Validate account
  if (!account || !account.address) {
    throw new Error("Valid wallet account is required");
  }
  
  try {
    console.log("Cancelling listing with ID:", params.listingId);
    
    // Get the listing to verify ownership
    const listing = await getListing(params.listingId);
    
    if (!listing) {
      throw new Error(`No listing found with ID ${params.listingId}`);
    }
    
    // Ensure only the listing creator can cancel it
    if (listing.listingCreator.toLowerCase() !== account.address.toLowerCase()) {
      throw new Error("Only the listing creator can cancel this listing");
    }
    
    // Get the marketplace contract
    const marketplaceContract = getMarketplaceContract();
    
    // Create the cancel transaction
    const transaction = cancelListingThirdweb({
      contract: marketplaceContract,
      listingId: BigInt(params.listingId),
    });
    
    // Convert our wallet account to ThirdWeb compatible account
    const thirdwebAccount = toThirdwebAccount(account);
    
    // Send the transaction
    const receipt = await sendTransaction({
      transaction,
      account: thirdwebAccount,
    });
    
    console.log("Transaction sent:", receipt);
    
    // Wait for transaction confirmation
    const confirmedReceipt = await waitForReceipt({
      client,
      chain: metisChain,
      transactionHash: receipt.transactionHash,
    });
    
    console.log("Listing cancelled:", confirmedReceipt);
    
    return {
      transactionHash: receipt.transactionHash,
      success: true,
      receipt: confirmedReceipt,
    };
  } catch (error: any) {
    console.error("Error cancelling listing:", error);
    return {
      transactionHash: error.transactionHash || "",
      success: false,
      error: formatListingError(error),
    };
  }
} 