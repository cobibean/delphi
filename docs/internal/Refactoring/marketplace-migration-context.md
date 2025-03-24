# Marketplace Migration Context

This document provides context about our marketplace migration progress for any AI agent continuing this work.

## Project Overview

We're migrating a monolithic marketplace implementation (`marketplace-v5.ts`) to a more modular, maintainable architecture that fully leverages ThirdWeb's V5 SDK while maintaining our own business logic and standards.

## Current Progress

### Completed Items

1. **Wallet Standardization** ✅
   - Created consistent interfaces and hooks for wallet interactions
   - Implemented standard transaction handling through `useWalletTransaction` hook
   - Built the `useMarketplaceWallet` hook as the high-level integration point for marketplace functions
   - Created comprehensive documentation in `docs/wallet-usage-standards.md`

2. **Marketplace Services Restructuring** ✅
   - Created `src/app/features/marketplace/services/types.ts` with shared interface definitions
   - Created `src/app/features/marketplace/services/utils.ts` with marketplace utility functions
   - Created `src/app/features/marketplace/services/listings.ts` for direct listing operations
   - Created modular `src/app/features/marketplace/services/auctions/` directory with:
     - `helpers.ts`: Common utility functions
     - `queries.ts`: Read-only functions for retrieving auction data
     - `bids.ts`: Functions related to bidding
     - `management.ts`: Functions for creating and managing auctions
     - `index.ts`: Re-exports all functions for backward compatibility

3. **Transaction Preparation** ✅
   - Implemented `src/app/features/marketplace/services/prepareTransactions.ts` that connects the UI hooks to service functions
   - Standardized error handling and transaction tracking

4. **High-Priority Function Migration** ✅
   - Migrated critical functions like `buyWithMetis`, `placeBid`, and `buyoutAuction`
   - Implemented `createDirectListing` and `createAuction` using standardized patterns
   - Added NFT ownership verification using `isOwnerOf` from `nft-services.ts`
   - Implemented improved solutions for functions not directly supported by ThirdWeb V5

5. **Modular Listings Directory** ✅
   - Created `src/app/features/marketplace/services/listings/` directory with:
     - `helpers.ts`: Common utility functions for listings
     - `queries.ts`: Read-only functions for retrieving listing data
     - `transactions.ts`: Functions for creating, buying, and canceling listings
     - `index.ts`: Re-exports all functions for backward compatibility
   - Refactored error handling with dedicated `formatListingError` function
   - Fixed TypeScript errors and added proper typings

6. **Component Migration Documentation** ✅
   - Created `docs/internal/Refactoring/marketplace-migration-component-updates.md` with:
     - Step-by-step guide for updating component imports
     - Function mapping between old and new structure
     - Example migration with before/after code
     - Troubleshooting tips

### Current Challenges

1. **ThirdWeb V5 API Limitations**
   - Some functions like `collectAuctionNFT` and `collectAuctionPayoutForSeller` don't have direct ThirdWeb V5 equivalents
   - We've implemented workarounds using direct contract calls with proper encoding
   - These implementations have some linter errors related to ThirdWeb's typing system

2. **Type Compatibility** ✅
   - ThirdWeb's `Account` type didn't perfectly match our `WalletAccount` interface
   - We've created an adapter utility `toThirdwebAccount` in `/src/app/features/wallet/utils.ts` to properly convert between types
   - We've added a `ThirdwebAccount` interface in `/src/app/features/wallet/types.ts` for proper typing
   - We've replaced all `as any` type casts with proper adapter usage in listings.ts and auctions/ modules
   - Some linter errors remain in direct contract interaction code that will need separate addressing

## Next Steps

### Phase 3: Complete Function Migration (In Progress)

1. **Migrate Remaining Functions**:
   - Apply the same modular pattern to other marketplace sections:
     - Offers (`makeOffer`, `acceptOffer`, `cancelOffer`)
     - NFT transfers and approvals
     - Collection management
     - Royalty and fee management

2. **Update Component Imports**:
   - Systematically update all component imports to use the new structure
   - Follow the migration guide in `marketplace-migration-component-updates.md`
   - Start with high-traffic pages like homepage and NFT detail pages

3. **Fix Linter Errors**:
   - Address remaining type issues with ThirdWeb's API
   - Create proper interfaces for missing ThirdWeb types
   - Replace temporary `as any` casts with proper type definitions

### Phase 4: Clean Up and Testing

1. **Testing**:
   - Test all marketplace functions with different wallet providers
   - Verify transactions work correctly on testnet
   - Test error handling and edge cases

2. **Documentation**:
   - Update documentation to reflect the new architecture
   - Create examples for common marketplace operations

3. **Remove Legacy Code**:
   - Deprecate and eventually remove `marketplace-v5.ts`
   - Update any remaining imports from old files

## Code Organization

Our new marketplace code organization follows this structure:

```
src/app/features/marketplace/
├── services/
│   ├── types.ts                  # Shared types and interfaces
│   ├── utils.ts                  # Utility functions
│   ├── listings.ts               # Direct listing functions
│   ├── auctions/                 # Auction functions (modular directory)
│   │   ├── index.ts              # Re-exports everything
│   │   ├── helpers.ts            # Auction-specific utilities
│   │   ├── queries.ts            # Read-only functions
│   │   ├── bids.ts               # Bidding functions
│   │   └── management.ts         # Auction management functions
│   ├── prepareTransactions.ts    # Links UI hooks to services
│   └── marketplace-v5.ts         # Legacy file (to be removed)
├── hooks/
│   ├── useMarketplaceWallet.ts   # Main hook for marketplace functions
│   └── useMarketplaceMint.ts     # Specialized hook for minting
```

Future work should follow this pattern, creating modular directories for complex feature sets and maintaining a clean separation of concerns between UI hooks and service implementations.

## Integration with Wallet Standards

All marketplace functions now follow these wallet integration standards:

1. Functions should accept a `WalletAccount` parameter instead of raw wallet objects
2. Always validate account parameters at the beginning of functions
3. Use standardized error handling and transaction tracking
4. Leverage the `useMarketplaceWallet` hook for all UI interactions

See `docs/wallet-usage-standards.md` for comprehensive guidelines.

## Important Notes

1. The refactoring preserves existing functionality while making it more maintainable
2. Always test changes thoroughly, especially around wallet interactions
3. Use the existing patterns when adding new functionality
4. Be aware of the workarounds for ThirdWeb V5 limitations and consider revisiting them as the SDK evolves 