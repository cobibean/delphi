# ThirdWeb Marketplace Standardization Plan

This document outlines a structured approach to migrate our marketplace functionality from custom wrapper functions to direct ThirdWeb calls.

## Current Issues

The current implementation in `marketplace-v5.ts` has several issues:

1. **Unnecessary Abstraction Layer**: Duplicates functionality already provided by ThirdWeb
2. **Complexity**: Adds extra wallet compatibility layers that complicate the codebase
3. **Inconsistent Patterns**: Creates non-standard approaches across the application
4. **Maintenance Burden**: Makes it harder to track updates to ThirdWeb's API
5. **File Size**: The current file has grown to over 1,600 lines

## Integration with Wallet Standardization

This plan complements our wallet standardization efforts and will leverage:

1. ✅ The standardized `WalletAccount` and `Wallet` interfaces from `wallet/types.ts`
2. ✅ The `useWalletTransaction` hook for consistent transaction handling
3. ✅ The `useMarketplaceWallet` hook for marketplace-specific wallet interactions
4. ✅ Consistent error handling and transaction tracking

## Modular Approach

We'll break down the monolithic `marketplace-v5.ts` file into logical modules:

### Module 1: Core Types and Utilities ✅
This includes the foundational interfaces and utility functions that other modules will depend on.

1. **Types and Interfaces** ✅
   - `IAuction`
   - `IDirectListing`
   - `IListingWithNFT`

2. **Utility Functions** ✅
   - `formatIPFSUrl`
   - `logContractError`
   - `isAuctionEnded`

### Module 2: Direct Listing Functions ✅
Functions related to creating, getting, and purchasing direct listings.

1. **Query Functions** ✅
   - `getAllListings`
   - `getListing`
   - `getDirectListing`

2. **Transaction Functions** ✅
   - ✅ `buyWithMetis` - Prioritized for wallet standardization
   - ✅ `buyFromDirectListing` 
   - ✅ `createDirectListing`
   - ✅ `cancelListing`

### Module 3: Auction Functions ✅
Functions specifically related to auctions, now organized in a modular directory structure.

#### Auction Directory Structure
```
/auctions
  ├── index.ts       # Re-exports all auction functions
  ├── helpers.ts     # Common utility functions 
  ├── queries.ts     # Read-only functions
  ├── bids.ts        # Bidding functions
  └── management.ts  # Management functions (create, buyout, collect)
```

1. **Query Functions** ✅ (in `queries.ts`)
   - `getAuction`
   - `getAuctionBidHistory`
   - `getAuctionWinningBid`

2. **Bid Functions** ✅ (in `bids.ts`)
   - ✅ `placeBid` - Prioritized for wallet standardization
   - `checkIfNewWinningBid`

3. **Management Functions** ✅ (in `management.ts`)
   - ✅ `buyoutAuction` - Prioritized for wallet standardization
   - ✅ `createAuction`
   - ✅ `collectAuctionNFT`
   - ✅ `collectAuctionPayoutForSeller`

4. **Helper Functions** ✅ (in `helpers.ts`)
   - `getMarketplaceContract`
   - `toWei`
   - `formatAuctionError`
   - `validateAuctionParams`
   - `isAuctionEnded`

### Module 4: Contract Deployment Functions ✅
Functions for deploying and interacting with smart contracts.

1. **Deployment Functions** ✅ (in `deployment.ts`)
   - `deployNFTContract`
   - (Additional contract deployment functions will be added as needed)

## Migration Strategy

### Phase 1: Foundation (Completed) ✅
- ✅ Standardize wallet interfaces in `src/app/features/wallet/types.ts`
- ✅ Create wallet utilities in `src/app/features/wallet/utils.ts`
- ✅ Implement transaction utilities in `src/app/features/wallet/transactions.ts`
- ✅ Build the `useWalletTransaction` hook for transaction handling
- ✅ Create the `useMarketplaceWallet` hook as the integration point

### Phase 2: High-Priority Function Migration (Completed) ✅
- ✅ Create the new folder structure for marketplace services
- ✅ Update the high-priority functions to use standardized wallet interfaces:
  - ✅ `buyWithMetis`
  - ✅ `placeBid`
  - ✅ `buyoutAuction`
- ✅ Implement additional critical functions:
  - ✅ `createDirectListing`
  - ✅ `createAuction`
  - ✅ `collectAuctionNFT`
  - ✅ `collectAuctionPayoutForSeller`
- ✅ Refactor NFTDetailView.tsx and AuctionActions.tsx to use the new patterns
- ✅ Reorganize auctions.ts into a modular directory structure

### Phase 3: Complete Function Migration (Completed) ✅
- ✅ Refactor listings.ts into a modular directory structure similar to auctions
- ✅ Migrate remaining marketplace functions:
  - ✅ Implemented missing listing functions
  - ✅ Created contracts module for deployment functions
  - ✅ Added placeholder for future NFT transfer and approval functions
- ✅ Fix linter errors and type compatibility issues
  - ✅ Create `toThirdwebAccount` adapter utility to properly convert between our WalletAccount and ThirdWeb's Account
  - ✅ Define ThirdwebAccount interface to avoid direct dependency imports
  - ✅ Replace all `as any` type casts with proper adapter usage in listings.ts and auctions/ modules
  - ✅ Address remaining linter errors in marketplace services, particularly in direct contract interactions
- ✅ Update component imports to reference the new function locations

### Phase 4: Clean Up (In Progress) ⏳
- ✅ Add deprecation notice to marketplace-v5.ts
- ✅ Create compatibility layer to smoothly transition imports
- ⏳ Remove the original marketplace-v5.ts file after all components are migrated
- ✅ Migrate contract deployment functionality
- ⏳ Update all remaining documentation

## New Patterns for Marketplace Functions

When migrating marketplace functions, follow these patterns:

### Old Pattern (to replace):
```typescript
export async function functionName(params, wallet) {
  // Complex wallet handling logic
  let account;
  if (wallet && typeof wallet.getAccount === 'function') {
    account = wallet.getAccount();
  } else if (wallet && wallet.account) {
    account = wallet.account;
  }
  
  // Function logic with manual error handling
  try {
    // ...
  } catch (error) {
    console.error("Error:", error);
    // Inconsistent error handling
  }
}
```

### New Pattern (to adopt):
```typescript
// In a component:
const { executeMarketplaceFunction } = useMarketplaceWallet();

const handleAction = async () => {
  await executeMarketplaceFunction("functionName", { params });
};

// In the marketplace service file:
export async function functionName(params, account: WalletAccount) {
  // Validate account
  if (!account || !account.address) {
    throw new Error("Valid wallet account is required");
  }
  
  // Rest of implementation with structured error handling
  try {
    // Implementation
    return {
      transactionHash,
      success: true,
      receipt
    };
  } catch (error) {
    return {
      transactionHash: error.transactionHash || "",
      success: false,
      error: error.message || "Operation failed"
    };
  }
}
```

## Component Updates Required

The following components need to be updated:

1. ✅ `NFTDetailView.tsx` - For direct buying functionality
2. ✅ `AuctionActions.tsx` - For auction bid/buyout functionality
3. ✅ `DeployContractPage.tsx` - For contract deployment
4. ⏳ Other components still using marketplace-v5.ts (identify with codebase search)

## Updated Folder Structure

The current structure is:

```
src/app/features/marketplace/
├── services/
│   ├── types.ts                         # Shared types and interfaces
│   ├── utils.ts                         # Shared utility functions
│   ├── listings/                        # Direct listing functions (modular directory)
│   │   ├── index.ts                     # Re-exports everything
│   │   ├── helpers.ts                   # Listing-specific utilities
│   │   ├── queries.ts                   # Read-only functions
│   │   └── transactions.ts              # Write/transaction functions
│   ├── auctions/                        # Auction functions (modular directory)
│   │   ├── index.ts                     # Re-exports everything
│   │   ├── helpers.ts                   # Auction-specific utilities
│   │   ├── queries.ts                   # Read-only functions
│   │   ├── bids.ts                      # Bidding functions
│   │   └── management.ts                # Auction management functions
│   ├── contracts/                       # Contract functions (modular directory)
│   │   ├── index.ts                     # Re-exports everything
│   │   └── deployment.ts                # Contract deployment functions
│   ├── prepareTransactions.ts           # Links UI hooks to services
│   ├── marketplace-compatibility.ts     # Compatibility layer for transition
│   └── marketplace-v5.ts                # Legacy file (deprecated, to be removed)
├── hooks/
│   ├── useMarketplaceWallet.ts          # ✅ Hook for wallet integration
│   └── useMarketplaceMint.ts            # Existing hook
```

## Benefits of This Approach

1. **Improved Maintainability**: Smaller, focused files are easier to maintain
2. **Gradual Migration**: Components can be updated one at a time
3. **Better TypeScript Support**: Proper types from ThirdWeb
4. **Reduced Complexity**: Direct ThirdWeb calls are simpler and more standard
5. **Consistent Patterns**: Following ThirdWeb's recommended usage patterns
6. **Standardized Wallet Handling**: Unified approach to wallet integration
7. **Better User Experience**: Consistent error handling and feedback
8. **Modular Organization**: Features are grouped logically for easier navigation

## Testing Strategy

When implementing these changes, follow this testing procedure:

1. ✅ Start with a low-risk component and replace one function at a time
2. Test thoroughly with different wallet providers (MetaMask, WalletConnect, etc.)
3. Monitor transactions on the testnet before deploying to production
4. Use the ThirdWeb debug console to troubleshoot any issues

## Remaining Challenges

1. **ThirdWeb V5 API Limitations**:
   - Some functions like `collectAuctionNFT` don't have direct equivalents in ThirdWeb V5
   - We've implemented workarounds using direct contract calls with proper encoding
   
2. **Type Compatibility** ✅
   - ThirdWeb's `Account` type didn't perfectly match our `WalletAccount` interface
   - We've created an adapter utility to properly convert between types