/**
 * Simplified Marketplace Direct Listing Implementation
 * 
 * This file provides a simpler implementation of direct listing operations
 * based on the ThirdWeb marketplace template pattern.
 */

import { isOwnerOf } from "@/app/features/nft/services/nft-services";
import { WalletAccount } from "@/app/features/wallet/types";
import { MARKETPLACE_ADDRESS } from "@/constants/contracts";
import { getContract } from "thirdweb";
import {
    isApprovedForAll as isApprovedForAll1155,
    setApprovalForAll as setApprovalForAll1155,
} from "thirdweb/extensions/erc1155";
import {
    isApprovedForAll as isApprovedForAll721,
    setApprovalForAll as setApprovalForAll721,
} from "thirdweb/extensions/erc721";
import { createListing } from "thirdweb/extensions/marketplace";
import { client, MarketplaceTransactionResult, metisChain } from "../types";
import { executeThirdwebTransaction } from "../utils";

// Constants
const NATIVE_TOKEN_ADDRESS = "0x0000000000000000000000000000000000000000";

/**
 * Simplified createDirectListing function based on the ThirdWeb documentation and template
 */
export async function createDirectListingSimplified(
  params: {
    tokenContract: string;
    tokenId: string;
    pricePerToken: string;
    quantity?: number;
    startTime?: number;
    endTime?: number;
    currencyAddress?: string;
    tokenType?: "ERC721" | "ERC1155"; // Optional token type parameter
  },
  account: WalletAccount
): Promise<MarketplaceTransactionResult> {
  // Validate account
  if (!account || !account.address) {
    throw new Error("Valid wallet account is required");
  }

  try {
    // Get NFT contract
    const nftContract = getContract({
      client,
      chain: metisChain,
      address: params.tokenContract as `0x${string}`,
    });

    // Verify ownership
    const isOwner = await isOwnerOf(
      params.tokenContract,
      params.tokenId,
      account.address
    );

    if (!isOwner) {
      throw new Error(
        `You don't own this NFT (${params.tokenContract}/${params.tokenId})`
      );
    }

    console.log("Pre-listing verification passed: You own the NFT");

    // Get marketplace contract
    const marketplaceAddress = MARKETPLACE_ADDRESS as `0x${string}`;
    const marketplaceContract = getContract({
      client,
      chain: metisChain,
      address: marketplaceAddress,
    });

    // For simplicity, we'll assume ERC721 unless explicitly told otherwise
    // Most common use case is ERC721, and detecting automatically is complex
    const isERC1155 = params.tokenType === "ERC1155";

    // Check for approval according to the ThirdWeb docs pattern
    const checkApprove = isERC1155 ? isApprovedForAll1155 : isApprovedForAll721;
    const isApproved = await checkApprove({
      contract: nftContract,
      owner: account.address,
      operator: marketplaceAddress,
    });

    // Set approval if needed - using a separate transaction as shown in the template
    if (!isApproved) {
      console.log("NFT not approved for marketplace. Setting approval...");
      const setApproval = isERC1155 ? setApprovalForAll1155 : setApprovalForAll721;
      
      // First step: create approval transaction
      const approveTx = setApproval({
        contract: nftContract,
        operator: marketplaceAddress,
        approved: true,
      });

      // Second step: send approval transaction through our adapter
      const approvalResult = await executeThirdwebTransaction(approveTx, account);
      
      if (!approvalResult.success) {
        throw new Error(`Failed to approve NFT for marketplace: ${approvalResult.error}`);
      }
      
      console.log("Approval set successfully:", approvalResult.transactionHash);
    }

    // Set default values
    const quantity = params.quantity || 1;
    const startTime = params.startTime ? new Date(params.startTime * 1000) : new Date();
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    const endTime = params.endTime ? new Date(params.endTime * 1000) : oneYearFromNow;

    // Create listing transaction according to ThirdWeb docs
    const transaction = createListing({
      contract: marketplaceContract,
      assetContractAddress: params.tokenContract as `0x${string}`,
      tokenId: BigInt(params.tokenId),
      quantity: BigInt(quantity),
      currencyContractAddress: (params.currencyAddress || NATIVE_TOKEN_ADDRESS) as `0x${string}`,
      pricePerToken: params.pricePerToken,
      startTimestamp: startTime,
      endTimestamp: endTime,
      isReservedListing: false,
    });

    // Send and confirm transaction through our adapter
    const result = await executeThirdwebTransaction(transaction, account);

    console.log("Direct listing created successfully:", result.transactionHash);
    return result;
  } catch (error: any) {
    console.error("Error creating direct listing:", error);
    return {
      transactionHash: error.transactionHash || "",
      success: false,
      error: error.message || "Unknown error creating listing",
    };
  }
}

/**
 * Simplified implementation of buying from a direct listing
 * Uses the same pattern as the template with our adapter function
 */
export async function buyFromDirectListingSimplified(
  params: { listingId: string },
  account: WalletAccount
): Promise<MarketplaceTransactionResult> {
  if (!account || !account.address) {
    throw new Error("Valid wallet account is required");
  }

  try {
    // Get marketplace contract
    const marketplaceAddress = MARKETPLACE_ADDRESS as `0x${string}`;
    const marketplaceContract = getContract({
      client,
      chain: metisChain,
      address: marketplaceAddress,
    });
    
    // Get the listing using ThirdWeb's getListing function from the marketplace extension
    const { getListing, buyFromListing } = await import("thirdweb/extensions/marketplace");
    
    const listing = await getListing({
      contract: marketplaceContract,
      listingId: BigInt(params.listingId),
    });
    
    if (!listing) {
      throw new Error(`No listing found with ID ${params.listingId}`);
    }
    
    if (listing.type !== "direct-listing") {
      throw new Error("Cannot buy an auction listing");
    }
    
    // Create buy transaction
    const transaction = buyFromListing({
      contract: marketplaceContract,
      listingId: listing.id,
      quantity: listing.quantity,
      recipient: account.address,
    });
    
    // Send and confirm transaction using our adapter
    const result = await executeThirdwebTransaction(transaction, account);
    
    console.log("NFT purchased successfully:", result.transactionHash);
    return result;
  } catch (error: any) {
    console.error("Error buying from listing:", error);
    return {
      transactionHash: error.transactionHash || "",
      success: false,
      error: error.message || "Failed to buy from listing"
    };
  }
}

/**
 * Simplified implementation of canceling a direct listing
 * Uses the same pattern as the template with our adapter function
 */
export async function cancelListingSimplified(
  params: { listingId: string },
  account: WalletAccount
): Promise<MarketplaceTransactionResult> {
  if (!account || !account.address) {
    throw new Error("Valid wallet account is required");
  }

  try {
    // Get marketplace contract
    const marketplaceAddress = MARKETPLACE_ADDRESS as `0x${string}`;
    const marketplaceContract = getContract({
      client,
      chain: metisChain,
      address: marketplaceAddress,
    });
    
    // Get the listing and cancelListing function from ThirdWeb
    const { getListing, cancelListing } = await import("thirdweb/extensions/marketplace");
    
    // Get the listing to verify it exists and the user is the creator
    const listing = await getListing({
      contract: marketplaceContract,
      listingId: BigInt(params.listingId),
    });
    
    if (!listing) {
      throw new Error(`No listing found with ID ${params.listingId}`);
    }
    
    // Check if the current user is the listing creator
    if (listing.creatorAddress.toLowerCase() !== account.address.toLowerCase()) {
      throw new Error("Only the listing creator can cancel this listing");
    }
    
    // Create cancel transaction
    const transaction = cancelListing({
      contract: marketplaceContract,
      listingId: listing.id
    });
    
    // Send and confirm transaction using our adapter
    const result = await executeThirdwebTransaction(transaction, account);
    
    console.log("Listing canceled successfully:", result.transactionHash);
    return result;
  } catch (error: any) {
    console.error("Error canceling listing:", error);
    return {
      transactionHash: error.transactionHash || "",
      success: false,
      error: error.message || "Failed to cancel listing"
    };
  }
} 