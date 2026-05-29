# NFT Factory Deployment Fix Plan

## Problem Statement
Our NFT factory contract deployment is failing because the current implementation in `nftFactoryService.ts` uses `sendTransaction` directly instead of the `executeThirdwebTransaction` adapter function that's successfully used in our marketplace services.

## Root Cause Analysis
1. In the marketplace services (auctions and listings), we're using a custom adapter function `executeThirdwebTransaction` that:
   - Properly converts our wallet account format to thirdweb's expected format using `toThirdwebAccount`
   - Handles transaction execution and error handling consistently

2. In the NFT factory service, we're using `sendTransaction` directly, which:
   - May not be correctly handling our wallet account format
   - Lacks the consistent error handling and account conversion

## Implementation Plan

### 1. Import Required Utilities (✅ Completed)
Import the `executeThirdwebTransaction` function from the marketplace utilities:
```typescript
import { executeThirdwebTransaction } from "../../marketplace/services/utils";
import { MarketplaceTransactionResult } from "../../marketplace/services/types";
import { WalletAccount } from "@/app/features/wallet/types";
```

### 2. Update ERC721Drop Deployment (✅ Completed)
Replace the direct `sendTransaction` call in `deployERC721Drop` with `executeThirdwebTransaction`:

```typescript
// Replace this:
const result = await sendTransaction({
  transaction,
  account,
});

// With this:
const result = await executeThirdwebTransaction(transaction, account);
```

### 3. Update ERC1155Drop Deployment (✅ Completed)
Similarly, replace the direct `sendTransaction` call in `deployERC1155Drop`:

```typescript
// Replace this:
const result = await sendTransaction({
  transaction,
  account,
});

// With this:
const result = await executeThirdwebTransaction(transaction, account);
```

### 4. Update Return Types (✅ Completed)
Updated the function signatures to use proper types:

```typescript
export async function deployERC721Drop(
  params: ERC721DeployParams,
  account: WalletAccount
): Promise<MarketplaceTransactionResult> {
  // ...
}

export async function deployERC1155Drop(
  params: ERC1155DeployParams,
  account: WalletAccount
): Promise<MarketplaceTransactionResult> {
  // ...
}
```

### 5. Improve Error Handling (✅ Completed)
Added consistent error handling that matches the pattern used in marketplace services:

```typescript
try {
  // ...
} catch (error: any) {
  console.error("Failed to deploy ERC721Drop collection:", error);
  return {
    transactionHash: error.transactionHash || "",
    success: false,
    error: error.message || "Unknown error creating ERC721 collection",
  };
}
```

### 6. Create Account Adapter (✅ Completed)
Created a dedicated adapter function to convert Thirdweb Account to our WalletAccount type in `src/app/features/nft/services/accountAdapter.ts`:

```typescript
export function adaptThirdwebAccount(thirdwebAccount: any): WalletAccount {
  if (!thirdwebAccount || !thirdwebAccount.address) {
    throw new Error("Invalid Thirdweb account");
  }

  // Create a WalletAccount object with the necessary properties
  return {
    address: thirdwebAccount.address as `0x${string}`,
    chainId: thirdwebAccount.chain?.id || 0,
    isConnected: true,
    
    // Adapt the sendTransaction function to match our expected signature
    sendTransaction: async (transaction: TransactionRequest) => {
      // ...implementation details...
    },
    
    // Add signMessage if needed
    signMessage: thirdwebAccount.signMessage 
      ? async ({ message }) => {
          return thirdwebAccount.signMessage({ message });
        }
      : undefined
  };
}
```

### 7. Update useNFTFactory Hook (✅ Completed)
Updated the hook to use our new adapter:

```typescript
// Convert thirdweb account to our WalletAccount type using the adapter
const walletAccount = adaptThirdwebAccount(thirdwebAccount);

// Deploy the collection
const result = await deployERC721Drop(deployParams, walletAccount);
```

### 8. Test NFT Deployment (⏳ Not Started)
The code changes have been made, but we need to test the deployment of both ERC721 and ERC1155 NFTs to verify the fix.

## Implementation Summary

We have:

1. Successfully updated the nftFactoryService.ts to use executeThirdwebTransaction for consistent transaction handling
2. Updated the return types and error handling to be consistent with other services
3. Created a dedicated account adapter to bridge the Thirdweb Account and our WalletAccount types
4. Updated the useNFTFactory hook to use our new adapter

## Next Steps

1. Test the implementation with both ERC721 and ERC1155 deployments
2. Address any remaining type issues in the adapter (the TransactionResponse type may need adjustments)
3. Add proper logging for debugging during transaction execution
4. Consider adding event handling to capture deployed contract addresses

## Execution Timeline

- Import required utilities: ✅ Completed (5 minutes)
- Update deployment functions: ✅ Completed (10 minutes)
- Update return types: ✅ Completed (5 minutes)
- Create account adapter: ✅ Completed (15 minutes)
- Update useNFTFactory hook: ✅ Completed (10 minutes)
- Testing: ⏳ Not Started (estimated 20 minutes)
- Documentation: ✅ Completed (15 minutes)

Total time spent: 60 minutes so far

## Considerations for Production

When moving this code to production, consider these additional improvements:

1. Add more robust type checking in the adapter function
2. Implement unit tests for the adapter and service functions
3. Add detailed logging for transaction progress
4. Implement a mechanism to extract deployed contract addresses from transaction receipts
5. Create a fallback mechanism in case the primary deployment method fails 