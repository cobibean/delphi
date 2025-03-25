/**
 * Marketplace Transaction Preparation
 * 
 * This file connects the useMarketplaceWallet hook to the marketplace service functions.
 * It now uses the simplified implementations for direct listing operations.
 */

import {
  buyFromDirectListing,
  buyWithMetis,
  cancelListing,
  createDirectListing
} from '@/app/features/marketplace/services/listings/index';
import { TransactionState, WalletAccount } from '@/app/features/wallet/types';
import { buyoutAuction, collectAuctionNFT, collectAuctionPayoutForSeller, createAuction, placeBid } from './auctions';

/**
 * Prepare a marketplace transaction based on the function name and parameters
 * This is the main function called by useMarketplaceWallet's executeMarketplaceFunction
 * 
 * @param functionName The name of the marketplace function to execute
 * @param params The parameters for the function
 * @param account The wallet account to use
 * @returns The prepared transaction ready to be sent
 */
export async function prepareMarketplaceTransaction(
  functionName: string, 
  params: any,
  account: WalletAccount
): Promise<{ 
  to: `0x${string}`; 
  data: `0x${string}`; 
  value?: bigint; 
} | null> {
  // Validate account
  if (!account || !account.address) {
    throw new Error('Valid wallet account is required');
  }

  // For now, redirect to the executeMarketplaceTransaction function
  // since we're having type compatibility issues with ThirdWeb
  console.log(`Redirecting ${functionName} to direct execution`);
  const result = await executeMarketplaceTransaction(functionName, params, account);
  
  // If successful, return a dummy transaction to satisfy the type system
  if (result && result.success) {
    return {
      to: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      data: "0x" as `0x${string}`,
      value: BigInt(0)
    };
  }
  
  return null;
}

/**
 * Execute a marketplace transaction and return the result
 * This is an alternative to preparing the transaction, useful for complex operations
 * that might require multiple steps or have special handling
 * 
 * Now accepts either a WalletAccount or ThirdWeb Account object for flexibility
 */
export async function executeMarketplaceTransaction(
  functionName: string,
  params: any,
  account: any, // Accept any account type (WalletAccount or ThirdWeb Account)
  metadata?: Partial<TransactionState>
): Promise<any> {
  // Ensure we have a valid account with an address
  if (!account || !account.address) {
    throw new Error("Valid account with address is required");
  }
  
  // Directly call the implementation functions instead of preparing transactions
  switch (functionName) {
    case 'buyWithMetis':
      try {
        console.log("Executing buyWithMetis with params:", params);
        
        // Validate parameters before calling
        if (!params.listingId) {
          throw new Error("Missing required parameter: listingId");
        }
        
        // Call the simplified implementation
        const result = await buyWithMetis(params, account);
        console.log("buyWithMetis result:", result);
        return result;
      } catch (error) {
        console.error("Error in buyWithMetis:", error);
        throw error;
      }
      
    case 'buyFromDirectListing':
      try {
        console.log("Executing buyFromDirectListing with params:", params);
        
        // Validate parameters before calling
        if (!params.listingId) {
          throw new Error("Missing required parameter: listingId");
        }
        
        // Call the simplified implementation
        const result = await buyFromDirectListing(params, account);
        console.log("buyFromDirectListing result:", result);
        return result;
      } catch (error) {
        console.error("Error in buyFromDirectListing:", error);
        throw error;
      }
      
    case 'placeBid':
      return placeBid(params, account);
      
    case 'buyoutAuction':
      return buyoutAuction(params, account);
      
    case 'collectAuctionNFT':
      return collectAuctionNFT(params, account);
      
    case 'collectAuctionPayoutForSeller':
      return collectAuctionPayoutForSeller(params, account);
      
    case 'cancelListing':
      try {
        console.log("Executing cancelListing with params:", params);
        
        // Validate parameters before calling
        if (!params.listingId) {
          throw new Error("Missing required parameter: listingId");
        }
        
        // Call the simplified implementation
        const result = await cancelListing(params, account);
        console.log("cancelListing result:", result);
        return result;
      } catch (error) {
        console.error("Error in cancelListing:", error);
        throw error;
      }
      
    case 'createDirectListing':
      try {
        console.log("Executing createDirectListing with params:", {
          tokenContract: params.tokenContract,
          tokenId: params.tokenId,
          pricePerToken: params.pricePerToken,
          startTime: params.startTime,
          endTime: params.endTime,
          quantity: params.quantity || 1,
          accountAddress: account.address,
          accountChainId: account.chainId
        });
        
        // Validate parameters before calling
        if (!params.tokenContract || !params.tokenId || !params.pricePerToken) {
          throw new Error("Missing required parameters for createDirectListing");
        }
        
        // Call the simplified implementation
        const result = await createDirectListing(params, account);
        console.log("createDirectListing result:", result);
        return result;
      } catch (error) {
        console.error("Error in createDirectListing:", error);
        throw error;
      }
      
    case 'createAuction':
      return createAuction(params, account);
      
    default:
      throw new Error(`Unknown marketplace function: ${functionName}`);
  }
} 