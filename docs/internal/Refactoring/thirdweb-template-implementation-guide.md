# ThirdWeb Template Implementation Guide

This guide outlines how to implement the simpler ThirdWeb marketplace approach based on the marketplace template we discovered and the official ThirdWeb documentation.

## Overview

The template and ThirdWeb documentation show a more direct approach to ThirdWeb integration:

1. Direct imports from ThirdWeb packages
2. Usage of the `sendAndConfirmTransaction` helper to simplify transaction flow
3. Cleaner NFT approval process
4. Simpler transaction creation
5. React hook integration with `useSendAndConfirmTransaction`

## Implementation Steps

### 1. Update ThirdWeb Dependencies ✅

Update to the latest ThirdWeb V5 SDK:

```bash
npm install thirdweb@latest
# or
yarn add thirdweb@latest
```

### 2. Minimal Wallet Directory Changes ✅

To minimize changes to our wallet system while adopting the ThirdWeb template approach, we'll implement these focused updates:

#### 2.1 Add a Transaction Adapter in Marketplace Utils ✅

Create a bridge utility in `marketplace/services/utils.ts` that adapts our wallet system to ThirdWeb's transaction flow:

```typescript
// In marketplace/services/utils.ts
import { sendAndConfirmTransaction } from "thirdweb";
import { toThirdwebAccount } from "@/app/features/wallet/utils";
import { WalletAccount } from "@/app/features/wallet/types";
import { MarketplaceTransactionResult } from "./types";

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
  
  const thirdwebAccount = toThirdwebAccount(account);
  
  try {
    const receipt = await sendAndConfirmTransaction({
      transaction,
      account: thirdwebAccount,
    });
    
    return {
      transactionHash: receipt.transactionHash,
      success: true,
      receipt
    };
  } catch (error: any) {
    return {
      transactionHash: error.transactionHash || "",
      success: false,
      error: error.message || "Transaction failed"
    };
  }
}
```

#### 2.2 Verify Compatibility of `toThirdwebAccount` ✅

Review the current implementation of `toThirdwebAccount` in `wallet/utils.ts` to ensure it properly handles the properties needed by `sendAndConfirmTransaction`. 

The key requirements for this function are:
- Properly expose the wallet's address in the expected format
- Support the transaction sending mechanism required by ThirdWeb
- Handle message signing in the format ThirdWeb expects

If needed, make minimal updates to the `toThirdwebAccount` function to ensure compatibility:

```typescript
// In wallet/utils.ts, check if these properties are properly implemented
export function toThirdwebAccount(account: WalletAccount): any {
  if (!account || !account.address) {
    throw new Error("Valid wallet account is required");
  }
  
  // Return a ThirdWeb compatible account object
  return {
    address: account.address,
    
    // This method is critical for sendAndConfirmTransaction
    sendTransaction: async (tx: any) => {
      if (!account.sendTransaction) {
        throw new Error("Wallet does not support transaction sending");
      }
      
      // Convert ThirdWeb transaction format to our TransactionRequest format
      const transactionRequest = {
        to: tx.to,
        value: tx.value,
        data: tx.data,
        gasLimit: tx.gasLimit,
        maxFeePerGas: tx.maxFeePerGas,
        maxPriorityFeePerGas: tx.maxPriorityFeePerGas,
        nonce: tx.nonce,
        chainId: tx.chainId,
        type: tx.type
      };
      
      return account.sendTransaction(transactionRequest);
    },
    
    // Other required methods...
  };
}
```

### 3. Simplify Direct Listing Creation ✅

#### 3.1 Create a New Implementation ✅

Create `listings/simplified.ts` with a streamlined implementation using our transaction adapter:

```typescript
import { WalletAccount } from "@/app/features/wallet/types";
import { isOwnerOf } from "@/app/features/nft/services/nft-services";
import { getContract } from "thirdweb";
import {
  isApprovedForAll as isApprovedForAll721,
  setApprovalForAll as setApprovalForAll721,
} from "thirdweb/extensions/erc721";
import {
  isApprovedForAll as isApprovedForAll1155,
  setApprovalForAll as setApprovalForAll1155,
} from "thirdweb/extensions/erc1155";
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

    // Get marketplace contract from marketplace config
    // This should be loaded from your config or constants
    const marketplaceAddress = "YOUR_MARKETPLACE_CONTRACT_ADDRESS" as `0x${string}`;
    const marketplaceContract = getContract({
      client,
      chain: metisChain,
      address: marketplaceAddress,
    });

    // Determine if NFT is ERC721 or ERC1155
    // This is a simplified approach - you may need to enhance this detection
    let isERC1155 = false;
    try {
      // Try to call an ERC1155-specific function
      await nftContract.read.balanceOf([account.address, BigInt(params.tokenId)]);
      isERC1155 = true;
    } catch (error) {
      // If it fails, assume ERC721
      isERC1155 = false;
    }

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
```

#### 3.2 Update the Prepare Transactions Function ✅

Modify `prepareTransactions.ts` to use the new implementation:

```typescript
// In prepareTransactions.ts
import { createDirectListingSimplified } from './listings/simplified';

// Update the switch statement in executeMarketplaceTransaction
case 'createDirectListing':
  try {
    console.log("Executing createDirectListing with params:", params);
    
    // Validate parameters before calling
    if (!params.tokenContract || !params.tokenId || !params.pricePerToken) {
      throw new Error("Missing required parameters for createDirectListing");
    }
    
    // Call the NEW implementation
    const result = await createDirectListingSimplified(params, account);
    console.log("createDirectListing result:", result);
    return result;
  } catch (error) {
    console.error("Error in createDirectListing:", error);
    throw error;
  }
```

### 4. React Hook Integration Options

#### Option 1: Continue Using Existing Hooks (Minimal Change)

For the minimal changes approach, you can continue using your existing `useMarketplaceWallet` hook which will internally use the updated service functions:

```tsx
// In a React component (minimal changes to existing code)
const { executeMarketplaceFunction } = useMarketplaceWallet();

const handleCreateListing = async () => {
  try {
    const result = await executeMarketplaceFunction("createDirectListing", {
      tokenContract: nftContractAddress,
      tokenId: nftId,
      pricePerToken: price,
      // Optional parameters
      quantity: 1,
      currencyAddress: "0x0000000000000000000000000000000000000000", // Native token
    });
    
    if (result && result.success) {
      // Handle success
      console.log("Listing created successfully");
    } else {
      // Handle failure
      console.error("Failed to create listing:", result?.error);
    }
  } catch (error) {
    console.error("Error creating listing:", error);
  }
};
```

#### Option 2: Direct ThirdWeb Hook Usage (For New Components)

For new components or when refactoring, consider using ThirdWeb's hooks directly:

```tsx
// In a React component
import { useActiveAccount, useSendAndConfirmTransaction } from "thirdweb/react";
import { createListing } from "thirdweb/extensions/marketplace";
import { getContract } from "thirdweb";

function CreateListingComponent({ nftContractAddress, tokenId, marketplaceAddress }) {
  const account = useActiveAccount();
  const { 
    mutate: sendTransaction, 
    isPending, 
    isSuccess, 
    error 
  } = useSendAndConfirmTransaction();
  
  // Get contract instances
  const nftContract = getContract({
    client,
    chain: metisChain,
    address: nftContractAddress,
  });
  
  const marketplaceContract = getContract({
    client,
    chain: metisChain,
    address: marketplaceAddress,
  });

  const handleCreateListing = async (price) => {
    if (!account) {
      alert("Please connect your wallet");
      return;
    }

    try {
      // Create the transaction
      const transaction = createListing({
        contract: marketplaceContract,
        assetContractAddress: nftContractAddress,
        tokenId: BigInt(tokenId),
        quantity: 1n,
        pricePerToken: price,
        currencyContractAddress: "0x0000000000000000000000000000000000000000", // Native token
        startTimestamp: new Date(),
        endTimestamp: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
        isReservedListing: false,
      });

      // Execute transaction with the hook
      sendTransaction({
        transaction,
        account,
      });
    } catch (error) {
      console.error("Error preparing listing transaction:", error);
    }
  };

  return (
    <div>
      {isPending && <div>Creating listing...</div>}
      {isSuccess && <div>Listing created successfully!</div>}
      {error && <div>Error: {error.message}</div>}
      
      <button 
        onClick={() => handleCreateListing("1.5")} 
        disabled={isPending}
      >
        List for 1.5 METIS
      </button>
    </div>
  );
}
```

### 5. Standard Transaction Pattern with Minimal Changes

Based on the ThirdWeb documentation, and adapted for our minimal changes approach:

```typescript
/**
 * Standard transaction pattern for ThirdWeb V5 with minimal wallet changes
 */
async function executeStandardMarketplaceTransaction(params, account) {
  // 1. Get contract instances
  const contract = getContract({
    client,
    chain: metisChain,
    address: contractAddress,
  });
  
  // 2. Create transaction with the appropriate extension function
  const transaction = someExtensionFunction({
    contract,
    // other parameters as needed
  });
  
  // 3. Use our adapter to send and confirm the transaction
  return executeThirdwebTransaction(transaction, account);
}
```

### 6. Extend the Approach to Other Marketplace Functions ✅

Once the direct listing implementation is working, apply the same pattern to other functions:

#### Example: Simplifying Buying from a Listing ✅

```typescript
// In listings/simplified.ts
import { getListing, buyFromListing } from "thirdweb/extensions/marketplace";
import { executeThirdwebTransaction } from "../utils";

export async function buyFromDirectListingSimplified(
  params: { listingId: string },
  account: WalletAccount
): Promise<MarketplaceTransactionResult> {
  if (!account || !account.address) {
    throw new Error("Valid wallet account is required");
  }

  try {
    // Get marketplace contract
    const marketplaceContract = getContract({
      client,
      chain: metisChain,
      address: MARKETPLACE_ADDRESS,
    });
    
    // Get the listing using ThirdWeb's getListing function
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
    return executeThirdwebTransaction(transaction, account);
  } catch (error: any) {
    console.error("Error buying from listing:", error);
    return {
      transactionHash: error.transactionHash || "",
      success: false,
      error: error.message || "Failed to buy from listing"
    };
  }
}
```

#### Example: Simplifying Canceling a Listing ✅

```typescript
// In listings/simplified.ts
import { getListing, cancelListing } from "thirdweb/extensions/marketplace";
import { executeThirdwebTransaction } from "../utils";

export async function cancelListingSimplified(
  params: { listingId: string },
  account: WalletAccount
): Promise<MarketplaceTransactionResult> {
  if (!account || !account.address) {
    throw new Error("Valid wallet account is required");
  }

  try {
    // Get marketplace contract
    const marketplaceContract = getContract({
      client,
      chain: metisChain,
      address: MARKETPLACE_ADDRESS,
    });
    
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
    return executeThirdwebTransaction(transaction, account);
  } catch (error: any) {
    console.error("Error canceling listing:", error);
    return {
      transactionHash: error.transactionHash || "",
      success: false,
      error: error.message || "Failed to cancel listing"
    };
  }
}
```

### 7. Implementation Timeline

1. **Day 1**: Update dependencies and create the transaction adapter utility
2. **Day 2**: Verify wallet compatibility and create simplified direct listing implementation
3. **Day 3**: Test and debug the direct listing implementation
4. **Day 4**: Create new implementations for other marketplace functions (buying, auctions, etc.)
5. **Day 5**: Create comprehensive tests and finalize documentation

## Key Benefits of the Minimal Changes Approach

1. **Reduced Scope**: Changes are focused only on the marketplace services that need them
2. **Backward Compatibility**: Existing components continue to work with minimal updates
3. **Faster Implementation**: Focus on solving specific problems rather than overhauling everything
4. **Lower Risk**: Isolates changes to reduce potential for system-wide issues
5. **Gradual Migration**: Allows incremental adoption of ThirdWeb's newer patterns

## Important Notes

1. Replace `"YOUR_MARKETPLACE_CONTRACT_ADDRESS"` with your actual marketplace contract address
2. The `executeThirdwebTransaction` adapter function centralizes the ThirdWeb transaction handling
3. Ensure the `toThirdwebAccount` function properly converts your account format for ThirdWeb
4. Maintain consistent error handling between your system and ThirdWeb's error patterns
5. Consider gradually transitioning to ThirdWeb React hooks for new UI components 