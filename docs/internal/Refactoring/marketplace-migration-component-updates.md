# Marketplace Component Migration Guide

This document provides guidance on how to update components to use the new modular marketplace services structure instead of the legacy `marketplace-v5.ts` file.

## Background

As part of our marketplace refactoring effort, we've migrated from a monolithic `marketplace-v5.ts` file to a more modular, maintainable architecture organized by function type. This new structure provides better maintainability, code organization, and leverages ThirdWeb's V5 SDK directly.

## Directory Structure

The new marketplace services are organized in this structure:

```
src/app/features/marketplace/services/
├── types.ts                  # Shared types and interfaces
├── utils.ts                  # Utility functions
├── listings/                 # Direct listing functions
│   ├── index.ts              # Re-exports everything
│   ├── helpers.ts            # Listing-specific utilities
│   ├── queries.ts            # Read-only functions
│   └── transactions.ts       # Transaction functions
├── auctions/                 # Auction functions
│   ├── index.ts              # Re-exports everything
│   ├── helpers.ts            # Auction-specific utilities
│   ├── queries.ts            # Read-only functions
│   ├── bids.ts               # Bidding functions
│   └── management.ts         # Auction management functions
├── prepareTransactions.ts    # Links UI hooks to services
├── index.ts                  # Re-exports from all modules
└── marketplace-v5.ts         # Legacy file (to be deprecated)
```

## How to Update Components

### Step 1: Identify Imports to Update

First, identify which marketplace functions your component is importing:

```typescript
// Old import statement
import { getAllListings, getListing, createDirectListing } from "@/features/marketplace/services/marketplace-v5";
```

### Step 2: Update the Import Path

Change the import path to use the new centralized imports:

```typescript
// New import statement
import { getAllListings, getListing, createDirectListing } from "@/features/marketplace/services";
```

All marketplace functions are now re-exported from the central `index.ts` file, so you don't need to import directly from the individual modules.

### Step 3: Update Function Calls (if needed)

Some functions may have slightly different parameter requirements or return types. Review the function signatures in the new modules:

- **Read-only functions** (getAllListings, getListing, etc.) should have the same signature
- **Transaction functions** (buyWithMetis, createDirectListing, etc.) now require a `WalletAccount` parameter instead of different wallet types

For example:

```typescript
// Old usage
const result = await buyWithMetis(listingId, wallet);

// New usage
const result = await buyWithMetis({ listingId }, wallet.account);
```

### Step 4: Use Wallet Hook (best practice)

For transaction functions, the recommended approach is to use the `useMarketplaceWallet` hook:

```typescript
import { useMarketplaceWallet } from "@/features/marketplace/hooks/useMarketplaceWallet";

function MyComponent() {
  const { executeMarketplaceFunction } = useMarketplaceWallet();
  
  const handleBuy = async () => {
    const result = await executeMarketplaceFunction("buyWithMetis", { listingId: "123" });
    
    if (result.success) {
      console.log("Purchase successful!");
    } else {
      console.error("Purchase failed:", result.error);
    }
  };
  
  return <button onClick={handleBuy}>Buy Now</button>;
}
```

## Function Mapping

Here's a mapping of common functions from the old structure to the new modular structure:

| Old Function Path | New Function Path |
|-------------------|------------------|
| `marketplace-v5.ts:getAllListings` | `listings/queries.ts:getAllListings` |
| `marketplace-v5.ts:getListing` | `listings/queries.ts:getListing` |
| `marketplace-v5.ts:getDirectListing` | `listings/queries.ts:getDirectListing` |
| `marketplace-v5.ts:buyWithMetis` | `listings/transactions.ts:buyWithMetis` |
| `marketplace-v5.ts:buyFromDirectListing` | `listings/transactions.ts:buyFromDirectListing` |
| `marketplace-v5.ts:createDirectListing` | `listings/transactions.ts:createDirectListing` |
| `marketplace-v5.ts:cancelListing` | `listings/transactions.ts:cancelListing` |
| `marketplace-v5.ts:getAuction` | `auctions/queries.ts:getAuction` |
| `marketplace-v5.ts:placeBid` | `auctions/bids.ts:placeBid` |
| `marketplace-v5.ts:buyoutAuction` | `auctions/management.ts:buyoutAuction` |
| `marketplace-v5.ts:createAuction` | `auctions/management.ts:createAuction` |

## Example Update

### Before:

```typescript
import { getAllListings, buyWithMetis } from "@/features/marketplace/services/marketplace-v5";
import { useWallet } from "@/features/wallet/hooks/useWallet";

function NFTMarketplace() {
  const { wallet } = useWallet();
  
  const loadListings = async () => {
    const listings = await getAllListings();
    return listings;
  };
  
  const handleBuy = async (listingId) => {
    const result = await buyWithMetis(listingId, wallet);
    
    if (result.success) {
      console.log("Purchase successful!");
    } else {
      console.error("Purchase failed:", result.error);
    }
  };
  
  // ...rest of component
}
```

### After:

```typescript
import { getAllListings } from "@/features/marketplace/services";
import { useMarketplaceWallet } from "@/features/marketplace/hooks/useMarketplaceWallet";

function NFTMarketplace() {
  const { executeMarketplaceFunction } = useMarketplaceWallet();
  
  const loadListings = async () => {
    const listings = await getAllListings();
    return listings;
  };
  
  const handleBuy = async (listingId) => {
    const result = await executeMarketplaceFunction("buyWithMetis", { listingId });
    
    if (result.success) {
      console.log("Purchase successful!");
    } else {
      console.error("Purchase failed:", result.error);
    }
  };
  
  // ...rest of component
}
```

## Testing Updated Components

After updating a component, follow these testing steps:

1. Test basic rendering - ensure the component still loads correctly
2. Test data fetching - verify that listings, auctions, etc. are fetched correctly
3. Test transactions - verify that buying, bidding, listing creation, etc. still work
4. Check error handling - make sure errors are handled and displayed correctly

## Common Issues

### Typescript Errors

If you encounter TypeScript errors after migrating, check:

1. The function signature has changed and requires different parameters
2. The return type has changed
3. You're missing a required import

### Transaction Failures

If transactions fail after migrating:
1. Verify that you're passing a valid `WalletAccount` object
2. Check the browser console for detailed error messages
3. Use the `formatListingError` or `formatAuctionError` utils to get user-friendly error messages

## Additional Notes

1. The `marketplace-v5.ts` file is still available for backward compatibility but will eventually be removed
2. All new marketplace features should use the new modular structure
3. Report any issues with the migration to the #marketplace-refactoring Slack channel 