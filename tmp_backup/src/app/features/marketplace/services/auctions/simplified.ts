/**
 * Simplified Marketplace Auction Implementation
 * 
 * This file provides a simpler implementation of auction operations
 * based on the ThirdWeb marketplace template pattern.
 */

import { isOwnerOf } from "@/app/features/nft/services/nft-services";
import { WalletAccount } from "@/app/features/wallet/types";
import { MARKETPLACE_ADDRESS, NATIVE_TOKEN_ADDRESS } from "@/constants/contracts";
import { ethers } from "ethers";
import { getContract, sendAndConfirmTransaction } from "thirdweb";
import {
  isApprovedForAll as isApprovedForAll1155,
  setApprovalForAll as setApprovalForAll1155,
} from "thirdweb/extensions/erc1155";
import {
  isApprovedForAll as isApprovedForAll721,
  setApprovalForAll as setApprovalForAll721,
} from "thirdweb/extensions/erc721";
import {
  bidInAuction,
  buyoutAuction as buyoutAuctionThirdweb,
  cancelAuction as cancelAuctionThirdweb,
  collectAuctionPayout as collectAuctionPayoutThirdweb,
  collectAuctionTokens as collectAuctionTokensThirdweb,
  createAuction as createAuctionThirdweb,
  getAuction,
  isNewWinningBid
} from "thirdweb/extensions/marketplace";
import { client, MarketplaceTransactionResult, metisChain } from "../types";
import { executeThirdwebTransaction } from "../utils";
import { getAuctionWinningBid } from "./queries";

/**
 * Check if a bid would be a new winning bid
 */
export async function checkIfNewWinningBid(
  auctionId: string,
  bidAmount: string
): Promise<boolean> {
  try {
    // Get marketplace contract
    const marketplaceAddress = MARKETPLACE_ADDRESS as `0x${string}`;
    const marketplaceContract = getContract({
      client,
      chain: metisChain,
      address: marketplaceAddress,
    });
    
    // Convert the bid amount to wei format first
    const bidAmountInWei = ethers.parseUnits(bidAmount, "ether");
    
    // Check if bid would be new winning bid
    return await isNewWinningBid({
      contract: marketplaceContract,
      auctionId: BigInt(auctionId),
      bidAmount: bidAmountInWei.toString() as any // Convert BigInt to string with 'as any' for type compatibility
    });
  } catch (error) {
    console.error("Error checking if new winning bid:", error);
    return false;
  }
}

/**
 * Simplified createAuction function using the ThirdWeb pattern
 */
export async function createAuctionSimplified(
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

    console.log("Pre-auction verification passed: You own the NFT");

    // Get marketplace contract
    const marketplaceAddress = MARKETPLACE_ADDRESS as `0x${string}`;
    const marketplaceContract = getContract({
      client,
      chain: metisChain,
      address: marketplaceAddress,
    });

    // For simplicity, we'll assume ERC721 unless explicitly told otherwise
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
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7); // Default 7 days
    const endTime = params.endTime ? new Date(params.endTime * 1000) : oneWeekFromNow;
    const timeBufferInSeconds = params.timeBufferInSeconds || 300; // Default 5 minutes
    const bidBufferBps = params.bidBufferBps || 500; // Default 5%

    // Convert price values to wei format
    const minimumBidAmountWei = params.minimumBidAmount
      ? ethers.parseUnits(params.minimumBidAmount, "ether")
      : ethers.parseUnits("0", "ether");
    const buyoutAmountWei = params.buyoutAmount
      ? ethers.parseUnits(params.buyoutAmount, "ether")
      : undefined;

    // Create auction transaction
    const transaction = createAuctionThirdweb({
      contract: marketplaceContract,
      assetContractAddress: params.tokenContract as `0x${string}`,
      tokenId: BigInt(params.tokenId),
      quantity: BigInt(quantity),
      currencyContractAddress: (params.currencyAddress || NATIVE_TOKEN_ADDRESS) as `0x${string}`,
      minimumBidAmount: minimumBidAmountWei.toString() as any, // Convert to string with type cast
      buyoutBidAmount: buyoutAmountWei ? buyoutAmountWei.toString() as any : undefined,
      startTimestamp: startTime,
      endTimestamp: endTime,
      timeBufferInSeconds,
      bidBufferBps
    });

    // Send and confirm transaction through our adapter
    const result = await executeThirdwebTransaction(transaction, account);

    console.log("Auction created successfully:", result.transactionHash);
    return result;
  } catch (error: any) {
    console.error("Error creating auction:", error);
    return {
      transactionHash: error.transactionHash || "",
      success: false,
      error: error.message || "Unknown error creating auction",
    };
  }
}

/**
 * Simplified implementation of placing a bid
 * Now accepts either a WalletAccount or a ThirdWeb Account
 */
export async function placeBidSimplified(
  params: { auctionId: string, bidAmount: string },
  account: any // Accept any account type with proper properties
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
    
    // Get the auction to verify it exists
    const auction = await getAuction({
      contract: marketplaceContract,
      auctionId: BigInt(params.auctionId),
    });
    
    if (!auction) {
      throw new Error(`No auction found with ID ${params.auctionId}`);
    }
    
    console.log(`Processing bid of ${params.bidAmount} METIS on auction ${params.auctionId}`);
    
    // Clean up the bid amount, ensure it's a proper string number
    let bidAmount = params.bidAmount.trim();
    
    // Check if the auction has a buyout price
    if (auction.buyoutBidAmount) {
      const buyoutPriceInEther = ethers.formatEther(auction.buyoutBidAmount.toString());
      const bidAmountFloat = parseFloat(bidAmount);
      const buyoutAmountFloat = parseFloat(buyoutPriceInEther);
      
      console.log(`Comparing bid amount ${bidAmountFloat} with buyout amount ${buyoutAmountFloat}`);
      
      // Check if bid is too close to buyout
      if (bidAmountFloat >= buyoutAmountFloat * 0.98) {
        // If the bid is within 2% of the buyout, adjust it down to 90% of buyout
        const safeAmount = (buyoutAmountFloat * 0.9).toFixed(6);
        console.log(`Bid is too close to buyout price. Adjusting from ${bidAmount} to ${safeAmount} METIS`);
        bidAmount = safeAmount;
      }
    }
    
    // Check if this would be a winning bid first
    const bidAmountInWei = ethers.parseUnits(bidAmount, "ether");
    const isWinningBid = await isNewWinningBid({
      contract: marketplaceContract,
      auctionId: BigInt(params.auctionId),
      bidAmount: bidAmountInWei
    });
    
    if (!isWinningBid) {
      throw new Error("Bid amount is too low to become the new winning bid");
    }
    
    console.log(`Placing bid with amount: ${bidAmount} METIS`);
    
    // Create bid transaction - IMPORTANT FIX: Pass just the string amount, not the wei value
    // Let ThirdWeb handle the conversion internally as it expects
    const transaction = bidInAuction({
      contract: marketplaceContract,
      auctionId: BigInt(params.auctionId),
      bidAmount: bidAmount // Pass the human-readable string amount, not wei
    });
    
    // Check if we have a ThirdWeb Account (with sendTransaction method)
    if (account.sendTransaction && typeof account.sendTransaction === 'function') {
      // The account already has ThirdWeb methods, use it directly with sendAndConfirmTransaction
      try {
        console.log("Using native ThirdWeb account for transaction");
        
        const receipt = await sendAndConfirmTransaction({
          transaction,
          account: account,
        });
        
        console.log("Bid placed successfully:", receipt.transactionHash);
        
        return {
          transactionHash: receipt.transactionHash,
          success: true,
          receipt
        };
      } catch (directError: any) {
        console.error("Error using direct ThirdWeb account:", directError);
        throw directError;
      }
    } else {
      // Use our adapter to convert WalletAccount to ThirdWeb Account
      console.log("Using wallet account adapter for transaction");
      const result = await executeThirdwebTransaction(transaction, account);
      
      console.log("Bid placed successfully:", result.transactionHash);
      return result;
    }
  } catch (error: any) {
    console.error("Error placing bid on auction:", error);
    return {
      transactionHash: error.transactionHash || "",
      success: false,
      error: error.message || "Failed to place bid"
    };
  }
}

/**
 * Simplified implementation of buying out an auction
 * Now accepts either a WalletAccount or a ThirdWeb Account
 */
export async function buyoutAuctionSimplified(
  params: { auctionId: string },
  account: any // Accept any account type with proper properties
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
    
    // Get the auction to verify it exists and has a buyout price
    const auction = await getAuction({
      contract: marketplaceContract,
      auctionId: BigInt(params.auctionId),
    });
    
    if (!auction) {
      throw new Error(`No auction found with ID ${params.auctionId}`);
    }
    
    // Check if buyout is available
    if (!auction.buyoutBidAmount) {
      throw new Error("This auction does not have a buyout price");
    }
    
    console.log(`Processing buyout for auction ${params.auctionId}`);
    
    // Create buyout transaction - use the direct function call
    // Just pass the basic parameters and avoid any unnecessary processing
    const transaction = buyoutAuctionThirdweb({
      contract: marketplaceContract,
      auctionId: BigInt(params.auctionId)
    });
    
    // Check if we have a ThirdWeb Account (with sendTransaction method)
    if (account.sendTransaction && typeof account.sendTransaction === 'function') {
      // The account already has ThirdWeb methods, use it directly with sendAndConfirmTransaction
      try {
        console.log("Using native ThirdWeb account for transaction");
        
        const receipt = await sendAndConfirmTransaction({
          transaction,
          account: account,
        });
        
        console.log("Auction bought out successfully:", receipt.transactionHash);
        
        return {
          transactionHash: receipt.transactionHash,
          success: true,
          receipt
        };
      } catch (directError: any) {
        console.error("Error using direct ThirdWeb account:", directError);
        throw directError;
      }
    } else {
      // Use our adapter to convert WalletAccount to ThirdWeb Account
      console.log("Using wallet account adapter for transaction");
      // Send and confirm transaction using our adapter
      const result = await executeThirdwebTransaction(transaction, account);
      
      console.log("Auction bought out successfully:", result.transactionHash);
      return result;
    }
  } catch (error: any) {
    console.error("Error buying out auction:", error);
    return {
      transactionHash: error.transactionHash || "",
      success: false,
      error: error.message || "Failed to buyout auction"
    };
  }
}

/**
 * Simplified implementation of collecting an auction NFT
 */
export async function collectAuctionNFTSimplified(
  params: { auctionId: string },
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
    
    // Get the auction to verify it exists and has ended
    const auction = await getAuction({
      contract: marketplaceContract,
      auctionId: BigInt(params.auctionId),
    });
    
    if (!auction) {
      throw new Error(`No auction found with ID ${params.auctionId}`);
    }
    
    // Check if auction has ended
    const now = new Date();
    const endTimeSeconds = Number(auction.endTimeInSeconds);
    if (now.getTime() / 1000 < endTimeSeconds) {
      throw new Error("The auction has not ended yet");
    }
    
    // Create collect NFT transaction
    const transaction = collectAuctionTokensThirdweb({
      contract: marketplaceContract,
      auctionId: BigInt(params.auctionId)
    });
    
    // Send and confirm transaction using our adapter
    const result = await executeThirdwebTransaction(transaction, account);
    
    console.log("Auction NFT collected successfully:", result.transactionHash);
    return result;
  } catch (error: any) {
    console.error("Error collecting auction NFT:", error);
    return {
      transactionHash: error.transactionHash || "",
      success: false,
      error: error.message || "Failed to collect auction NFT"
    };
  }
}

/**
 * Simplified implementation of collecting auction payout for seller
 */
export async function collectAuctionPayoutForSellerSimplified(
  params: { auctionId: string },
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
    
    // Get the auction to verify it exists and has ended
    const auction = await getAuction({
      contract: marketplaceContract,
      auctionId: BigInt(params.auctionId),
    });
    
    if (!auction) {
      throw new Error(`No auction found with ID ${params.auctionId}`);
    }
    
    // Check if auction has ended
    const now = new Date();
    const endTimeSeconds = Number(auction.endTimeInSeconds);
    if (now.getTime() / 1000 < endTimeSeconds) {
      throw new Error("The auction has not ended yet");
    }
    
    // Verify caller is the seller
    if (auction.creatorAddress.toLowerCase() !== account.address.toLowerCase()) {
      throw new Error("Only the auction creator can collect the payout");
    }
    
    // Create collect payout transaction
    const transaction = collectAuctionPayoutThirdweb({
      contract: marketplaceContract,
      auctionId: BigInt(params.auctionId)
    });
    
    // Send and confirm transaction using our adapter
    const result = await executeThirdwebTransaction(transaction, account);
    
    console.log("Auction payout collected successfully:", result.transactionHash);
    return result;
  } catch (error: any) {
    console.error("Error collecting auction payout:", error);
    return {
      transactionHash: error.transactionHash || "",
      success: false,
      error: error.message || "Failed to collect auction payout"
    };
  }
}

/**
 * Simplified implementation of canceling an auction
 */
export async function cancelAuctionSimplified(
  params: { auctionId: string },
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
    
    // Get the auction to verify it exists and the user is the creator
    const auction = await getAuction({
      contract: marketplaceContract,
      auctionId: BigInt(params.auctionId),
    });
    
    if (!auction) {
      throw new Error(`No auction found with ID ${params.auctionId}`);
    }
    
    // Check if the current user is the auction creator
    if (auction.creatorAddress.toLowerCase() !== account.address.toLowerCase()) {
      throw new Error("Only the auction creator can cancel this auction");
    }
    
    // Check if the auction has any bids - auctions with bids cannot be canceled
    const winningBid = await getAuctionWinningBid(params.auctionId);
    if (winningBid) {
      throw new Error("Cannot cancel an auction that has received bids");
    }
    
    // Create cancel auction transaction
    const transaction = cancelAuctionThirdweb({
      contract: marketplaceContract,
      auctionId: BigInt(params.auctionId)
    });
    
    // Send and confirm transaction using our adapter
    const result = await executeThirdwebTransaction(transaction, account);
    
    console.log("Auction canceled successfully:", result.transactionHash);
    return result;
  } catch (error: any) {
    console.error("Error canceling auction:", error);
    return {
      transactionHash: error.transactionHash || "",
      success: false,
      error: error.message || "Failed to cancel auction"
    };
  }
}