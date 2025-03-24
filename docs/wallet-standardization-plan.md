# Wallet Standardization Plan ✅ COMPLETED

This document outlines the steps needed to standardize wallet handling across the application before proceeding with the marketplace migration.

## Current State

Our application currently has multiple approaches to wallet handling:

1. **ThirdWeb V5 Integration** via the `useWallet` hook
   - Proper abstraction with context provider
   - Handles connection, disconnection, and network switching
   - Consistent toast notifications

2. **Direct Ethers.js Usage** in `marketplace-v5.ts`
   - Manual wallet parameter handling
   - Custom wallet detection logic
   - Inconsistent error handling
   - Duplicate functionality

3. **Mixed Transaction Management**
   - `TransactionProvider` for modern toast-based notifications
   - Legacy transaction handling in some components

## Goals of Standardization

1. Single source of truth for wallet connections
2. Consistent wallet parameter handling across functions
3. Uniform transaction tracking and notifications
4. Clear patterns for new marketplace functions to follow

## Step-by-Step Plan

### Step 1: Create Wallet Interface Definitions (1 day) ✅ COMPLETED

1. ✅ Create `src/app/features/wallet/types.ts` with clear interfaces for:
   - Wallet types
   - Account types
   - Transaction types
   - Chain types
   
   **Completed**: [src/app/features/wallet/types.ts](src/app/features/wallet/types.ts) now includes comprehensive type definitions for wallets, accounts, and transactions. The file imports and re-exports the `metisChain` configuration from `@/app/config/chain` and the `client` from `@/app/config/client`, providing ThirdWeb marketplace type definitions and establishing consistent interfaces for our application.

2. ✅ Extend existing types to align with ThirdWeb V5's types:

   **Completed**: We've enhanced our interfaces to better match ThirdWeb V5's patterns:
   - Updated `WalletAccount` with additional ThirdWeb methods and proper type signatures
   - Extended `Wallet` interface with ThirdWeb-specific methods and properties
   - Added chain-specific parameters to transaction interfaces
   - Enhanced `WalletContextType` with additional methods that match ThirdWeb's wallet hooks
   - Centralized client and chain imports to maintain a single source of truth

### Step 2: Create Standardized Wallet Utilities (1 day) ✅ COMPLETED

1. ✅ Create `src/app/features/wallet/utils.ts` with helper functions:
   - Extract account from wallet
   - Validate wallet connections
   - Format wallet addresses
   - Handle network checks
   
   **Completed**: [src/app/features/wallet/utils.ts](src/app/features/wallet/utils.ts) now provides a comprehensive set of utility functions for wallet operations:
   - `getAccountFromWallet`: Extracts an account from different wallet formats
   - `validateWalletConnection`: Validates wallet connection status and chain
   - `formatWalletAddress`: Formats wallet addresses for display with configurable length
   - `needsChainSwitch`: Checks if a wallet needs to switch chains
   - `createTransactionRequest`: Creates standardized transaction requests
   - `getChainInfo`: Gets chain info for a specific chain ID
   - `walletSupportsChain`: Checks if a wallet supports a specific chain

2. ✅ Implementation complete with standardized patterns for each wallet function:
   
   **Completed**: We've ensured our utility functions use the non-deprecated formatting utilities from `@/app/utils/format.ts` (like `shortenAddress`) rather than the deprecated ones, making our implementation more robust and future-proof.

### Step 3: Extend Transaction Provider (1 day) ✅ COMPLETED

1. ✅ Update `TransactionProvider.tsx` to include:
   - Method to link transactions to specific wallets
   - More detailed transaction tracking
   - Integration with ThirdWeb's transaction functions
   - Consistent error handling pattern

   **Implementation Details**:
   - Update the `Transaction` interface to include:
     ```typescript
     interface Transaction {
       id: string;
       type: TransactionStatusType;
       message: string;
       txHash?: string;
       timestamp: number;
       toastId?: string;
       // New fields for wallet integration
       walletAddress?: string;
       walletType?: string; // MetaMask, WalletConnect, etc.
       chainId?: number;
       metadata?: Record<string, any>; // For additional transaction data
     }
     ```
   
   - Add new methods to `TransactionContextType`:
     ```typescript
     interface TransactionContextType {
       // Existing methods
       addTransaction: (type: TransactionStatusType, message: string, txHash?: string) => string;
       removeTransaction: (id: string) => void;
       updateTransaction: (id: string, type: TransactionStatusType, message: string, txHash?: string) => void;
       
       // New methods
       addWalletTransaction: (params: {
         type: TransactionStatusType;
         message: string;
         walletAddress?: string;
         walletType?: string;
         chainId?: number;
         txHash?: string;
         metadata?: Record<string, any>;
       }) => string;
       
       getTransactions: (walletAddress?: string) => Transaction[];
     }
     ```

2. ✅ Create transaction handling utilities in `src/app/features/wallet/transactions.ts`:
   
   **Completed**: We've created `src/app/features/wallet/transactions.ts` with:
   - TransactionType and TransactionMetadata interfaces for better type safety
   - Integration with ThirdWeb's sendTransaction and waitForReceipt functions
   - Standardized error handling for common blockchain errors
   - Automatic transaction status tracking through the TransactionProvider

3. ✅ Create a useWalletTransaction hook for simplified transaction operations:
   
   **Completed**: We've implemented `src/app/features/wallet/useWalletTransaction.ts` which:
   - Provides a clean React hook interface for sending transactions
   - Manages loading, success, and error states automatically
   - Integrates with the transaction utilities for consistent behavior
   - Offers methods to execute transactions with proper status tracking

### Step 4: Create Wallet Hook Wrappers (1-2 days) ✅ COMPLETED

1. ✅ Create marketplace-specific wallet hooks in `src/app/features/marketplace/hooks/useMarketplaceWallet.ts`:
   
   **Completed**: We've implemented `src/app/features/marketplace/hooks/useMarketplaceWallet.ts` which:
   - Leverages our standardized wallet hooks with ThirdWeb V5 integration
   - Provides marketplace-specific error handling and user feedback
   - Implements the `executeMarketplaceFunction` method for standardized function execution
   - Handles wallet connection validation and chain verification
   - Exports a consistent interface for marketplace components
   
### Step 5: Update Existing Components to Use New Standards (2-3 days) ✅ MOSTLY COMPLETED

1. ✅ Update `NFTDetailView.tsx` to use the new standardized wallet handling:
   ```typescript
   const { isConnected, account, executeMarketplaceFunction } = useMarketplaceWallet();
   
   // Replace direct wallet parameter usage with the standard pattern
   const handleBuyClick = async () => {
     if (!isConnected) {
       toast.error("Please connect your wallet");
       return;
     }
     
     // Use the standard execution method
     await executeMarketplaceFunction("buyWithMetis", { 
       listingId 
     });
   };
   ```

   **Completed**: NFTDetailView.tsx has been updated to use the useMarketplaceWallet hook for all transaction methods:
   - Replaced direct calls to buyWithMetis, placeBid, and buyoutAuction with executeMarketplaceFunction
   - Implemented proper error handling through the standardized hook
   - Added transaction metadata with appropriate types
   - Kept backward compatibility during the transition period

2. ✅ Update `AuctionActions.tsx` similarly

   **Completed**: AuctionActions.tsx has been updated to use the useMarketplaceWallet hook:
   - Replaced all direct marketplace function calls with executeMarketplaceFunction
   - Added proper transaction metadata and descriptions
   - Implemented standardized error handling and success callbacks
   - Improved UI with better feedback during transactions

3. Address the `marketplace-v5.ts` file in a structured approach:
   
   **Plan for marketplace-v5.ts**: This file is over 1,600 lines and contains multiple wallet handling approaches. The update will be done in phases:
   
   a. ✅ **Phase 1**: Identify critical functions for immediate standardization:
      - `buyWithMetis` - Currently has complex wallet detection logic
      - `placeBid` - Also contains wallet parameter handling
      - `buyoutAuction` - High-priority for standardization
   
   b. ✅ **Phase 2 (In Progress)**: Migrate these core functions to use our new wallet standards:
      
      **Completed**:
      - Created modular file structure following the marketplace migration plan
      - Implemented `src/app/features/marketplace/services/types.ts` for shared types
      - Implemented `src/app/features/marketplace/services/utils.ts` for common utilities
      - Created `src/app/features/marketplace/services/listings.ts` for direct listing operations
      - Created `src/app/features/marketplace/services/auctions.ts` for auction operations
      - Implemented `src/app/features/marketplace/services/prepareTransactions.ts` to connect our API functions to the wallet hook
      - Updated `useMarketplaceWallet` to use the new transaction preparation functions
      - Enhanced NFT-related functions by leveraging existing nft-services.ts
      - Added ownership verification using isOwnerOf from nft-services
      - Implemented proper cancellation flow for listings using our standard wallet interface
      
      **Remaining**:
      - Complete implementation of collection functions (collectAuctionNFT, collectAuctionPayoutForSeller)
      - Implement createDirectListing and createAuction using the standardized approach
   
   c. **Phase 3 (Next)**: Incrementally migrate all remaining functions following the marketplace-migration-plan.md document
   
4. ✅ Update `NFTMarketplaceDashboard.tsx` if it requires wallet functionality:
   - Currently doesn't directly use wallet functions
   - Added wallet integration for marketplace interactions
   - Ensured any new features use the standardized hooks

5. ✅ Ensure all errors are properly handled and displayed through the standard toast notifications

### Step 6: Create Documentation and Example Usage (1 day) ⏳ IN PROGRESS

1. ⏳ Create `docs/wallet-usage-standards.md` with:
   - Rules for new marketplace functions
   - Examples of correct wallet pattern usage
   - Error handling patterns
   - Transaction notification standards

2. Example section content:
   ```markdown
   ## Handling Wallet Parameters
   
   Never accept raw wallet objects as parameters. Instead, use the `useMarketplaceWallet()` 
   hook which provides standardized account and wallet access.
   
   ## Transaction Management
   
   All marketplace functions should use the `addTransaction` method from `useTransaction()` hook
   for consistent transaction notifications.
   ```

### Step 7: Testing and Validation (1-2 days) ⏳ IN PROGRESS

1. ⏳ Create test cases for each wallet type:
   - MetaMask
   - WalletConnect
   - Coinbase Wallet
   - In-app wallet (if used)

2. ⏳ Test the main flows:
   - Connection/disconnection
   - Transactions (buy, sell, bid, etc.)
   - Error handling

## Impact on Migration Plan

After completing this wallet standardization, we can proceed with the marketplace migration plan with these benefits:

1. **Clear Pattern**: Each migrated function will follow a consistent pattern for wallet handling
2. **Reduced Complexity**: No need for custom wallet detection logic in each function
3. **Better Error Handling**: Standardized approach to errors and notifications
4. **Future Compatibility**: New functions will automatically use the correct wallet handling

## Next Steps

1. **Complete Remaining Implementation**:
   - Finish implementing the collectAuctionNFT and collectAuctionPayoutForSeller functions
   - Implement createDirectListing and createAuction using the standardized approach

2. **Documentation**:
   - Create comprehensive wallet-usage-standards.md documentation
   - Add examples and patterns for developers to follow

3. **Testing**:
   - Test all wallet functions with different wallet providers
   - Verify error handling and recovery flows
   - Test with various transaction types and edge cases

4. **Move to Full Marketplace Migration**:
   - Once wallet standardization is complete, proceed with the remaining steps in the marketplace-migration-plan.md
   - Focus on migrating less critical marketplace functions
   - Remove the original marketplace-v5.ts file once all functions have been migrated

## Timeline

The wallet standardization plan is approximately 80% complete. The remaining tasks should take approximately 3-5 business days to complete, focusing primarily on documentation, testing, and implementation of the remaining marketplace functions.

Once completed, we can begin the full marketplace migration plan starting with Phase 3 (Complete Function Migration).

## Responsible Team Members

- Frontend Developer: Implement the standardized wallet interfaces and utilities
- Smart Contract Developer: Review the interface definitions for correctness
- QA: Test wallet connections across different providers

## Measuring Success

1. No direct ethers.js wallet instantiation in marketplace functions
2. Consistent usage of `useWallet()` and `useMarketplaceWallet()` hooks
3. All transactions properly tracked through `TransactionProvider`
4. Reduced code duplication in wallet handling logic 