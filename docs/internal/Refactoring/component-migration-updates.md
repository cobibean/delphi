# Component Import Migration Summary

The following components have been updated to use the new modular marketplace services structure instead of the deprecated `marketplace-v5.ts` file.

## Updated Components

1. **Main Pages**
   - `src/app/page.tsx`: Updated `getAllListings` import
   - `src/app/debug/page.tsx`: Updated `getAllListings` import
   - `src/app/features/debug/pages/page.tsx`: Updated `getAllListings` import
   - `src/app/features/home/pages/page.tsx`: Updated `getAllListings` import
   - `src/app/features/marketplace/pages/page.tsx`: Updated `getAllListings` import
   - `src/app/features/nft/[id]/page.tsx`: Updated `getListing`, `getAuction`, `getAllListings` imports

2. **Components**
   - `src/app/features/marketplace/components/FeaturedSection/FeaturedCard.tsx`: Updated `buyWithMetis` import and implementation to use `useMarketplaceWallet` hook
   - `src/app/features/nft/components/NFTCard.tsx`: Updated `isAuctionEnded` import and implementation to use `useMarketplaceWallet` hook
   - `src/app/features/nft/components/NFTDetailView.tsx`: Updated `getAuctionBidHistory` import

3. **Utilities**
   - `src/app/utils/featuredHelpers.ts`: Updated `getAllListings` import

## Pending Components

1. **Contract Deployment**
   - `src/app/create/deploy-contract/page.tsx`: Added a TODO comment for the `deployNFTContract` function which needs to be migrated to the new structure

## Implementation Patterns Used

1. **Direct Imports**: For simple functions like `getAllListings`, imports were updated to use `@/features/marketplace/services` instead of `@/features/marketplace/services/marketplace-v5`

2. **Marketplace Wallet Hook**: For transaction functions like `buyWithMetis`, implementation was updated to use the `useMarketplaceWallet` hook:
   ```typescript
   // Old pattern
   const result = await buyWithMetis(listingId, wallet);
   
   // New pattern
   const { executeMarketplaceFunction } = useMarketplaceWallet();
   const result = await executeMarketplaceFunction("buyWithMetis", { listingId });
   ```

3. **WalletAccount Adapter**: For components that needed to directly call functions without the hook, a `WalletAccount` object was created:
   ```typescript
   const walletAccount: WalletAccount = {
     address: account.address,
     chainId: account.chainId,
     connector: account.connector,
     isConnected: true
   };
   const result = await buyWithMetis({ listingId }, walletAccount);
   ```

## Recommendations for Future Migrations

1. Implement the `deployNFTContract` function in the new modular structure
2. Test all components thoroughly with real transactions
3. Create dedicated modules for remaining marketplace functions (offers, transfers, etc.)
4. After all components have been migrated, deprecate and eventually remove the `marketplace-v5.ts` file 