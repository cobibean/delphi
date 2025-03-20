# Component Migration Map

This document maps the current component structure to the new structure, organized by domain.

## Migration Strategy

1. **Organize by Domain**: Group components by their domain (marketplace, NFT, wallet, etc.)
2. **Shared Components**: Move truly shared components to a dedicated directory
3. **Consolidate Duplicates**: Identify and merge duplicate functionality
4. **Naming Consistency**: Ensure consistent naming conventions

## Component Mappings

### UI Components

| Current Location | New Location | Notes |
|------------------|--------------|-------|
| `/app/components/SharedComponents/Button.tsx` | `/app/components/ui/Button.tsx` | ✅ Migrated |
| `/app/components/SharedComponents/LoadingState.tsx` | `/app/components/feedback/LoadingState.tsx` | ✅ Migrated |
| `/app/components/SharedComponents/ToastNotification.tsx` | `/app/components/feedback/Toast.tsx` | ✅ Migrated and renamed |
| `/app/components/toaster.tsx` | `/app/components/feedback/Toaster.tsx` | ✅ Consolidated with Toast |
| `/app/components/toast.tsx` | `/app/components/feedback/Toast.tsx` | ✅ Consolidated with ToastNotification |

### Marketplace Components

| Current Location | New Location | Notes |
|------------------|--------------|-------|
| `/app/components/ListingOptions/ListingOptionsModal.tsx` | `/app/features/marketplace/components/ListingOptionsModal.tsx` | ✅ Migrated |
| `/app/components/TransactionStatus.tsx` | `/app/features/marketplace/components/TransactionStatus.tsx` | ✅ Migrated |
| `/app/components/TransactionNotification.tsx` | `/app/features/marketplace/components/TransactionNotification.tsx` | ✅ Migrated |
| `/app/components/NFTMarketplaceDashboard.tsx` | `/app/features/marketplace/components/NFTMarketplaceDashboard.tsx` | ✅ Migrated |

### NFT Components

| Current Location | New Location | Notes |
|------------------|--------------|-------|
| `/app/components/NFTDetailView.tsx` | `/app/features/nft/components/NFTDetailView.tsx` | ✅ Migrated |
| `/app/components/NFTCard/NFTCard.tsx` | `/app/features/nft/components/NFTCard.tsx` | ✅ Migrated |
| `/app/components/NFTCard/NFTAttributes.tsx` | `/app/features/nft/components/NFTAttributes.tsx` | ✅ Migrated |
| `/app/components/NFTCard/NFTCarousel.tsx` | `/app/features/nft/components/NFTCarousel.tsx` | ✅ Migrated |

### Wallet Components

| Current Location | New Location | Notes |
|------------------|--------------|-------|
| `/app/components/SharedComponents/ThirdwebConnectButton.tsx` | `/app/features/wallet/components/ThirdwebConnectButton.tsx` | ✅ Migrated |
| `/app/components/SharedComponents/ThirdwebConnectDialog.tsx` | `/app/features/wallet/components/ThirdwebConnectDialog.tsx` | ✅ Migrated |
| `/app/components/SharedComponents/thirdwebConnectModal.tsx` | `/app/features/wallet/components/ThirdwebConnectModal.tsx` | ✅ Migrated (renamed for consistency) |
| `/app/components/SharedComponents/WalletConnection.tsx` | `/app/features/wallet/components/WalletConnection.tsx` | ✅ Migrated |

### Layout Components

| Current Location | New Location | Notes |
|------------------|--------------|-------|
| `/app/components/SharedComponents/Header.tsx` | `/app/components/layout/Header.tsx` | ✅ Migrated |
| `/app/components/SharedComponents/Footer.tsx` | `/app/components/layout/Footer.tsx` | ✅ Migrated |

### Feature-Specific Components

| Current Location | New Location | Notes |
|------------------|--------------|-------|
| `/app/components/FeaturedSection/FeaturedSection.tsx` | `/app/features/marketplace/components/FeaturedSection/FeaturedSection.tsx` | ✅ Migrated |
| `/app/components/FeaturedSection/FeaturedCard.tsx` | `/app/features/marketplace/components/FeaturedSection/FeaturedCard.tsx` | ✅ Migrated |
| `/app/components/Carousel/Carousel.tsx` | `/app/components/ui/Carousel/Carousel.tsx` | ✅ Migrated |
| `/app/components/TrendingTable/TrendingTable.tsx` | `/app/features/marketplace/components/TrendingTable/TrendingTable.tsx` | ✅ Migrated |

### Page Components 

| Current Location | New Location | Notes |
|------------------|--------------|-------|
| `/app/page.tsx` | `/app/features/home/pages/page.tsx` | ✅ Migrated |
| `/app/create/page.tsx` | `/app/features/create/pages/page.tsx` | ✅ Migrated |
| `/app/create/auction/page.tsx` | `/app/features/create/pages/auction/page.tsx` | ✅ Migrated |
| `/app/create/direct-listing/page.tsx` | `/app/features/create/pages/direct-listing/page.tsx` | ✅ Migrated |
| `/app/create/deploy-contract/page.tsx` | `/app/features/create/pages/deploy-contract/page.tsx` | ✅ Migrated |
| `/app/debug/page.tsx` | `/app/features/debug/pages/page.tsx` | ✅ Migrated |
| `/app/stats/page.tsx` | `/app/features/stats/pages/page.tsx` | ✅ Migrated |

### Hooks Migration

| Current Location | New Location | Notes |
|------------------|--------------|-------|
| `/app/hooks/useToast.ts` | `/app/components/feedback/hooks/useToast.ts` | ✅ Migrated |

## Current Progress

- ✅ All UI components have been migrated to their new locations
- ✅ Feature-specific components have been migrated to appropriate feature directories
- ✅ Index files have been created for component exports
- ✅ Main page components have been migrated to feature directories
- ✅ Feature-specific page exports have been established for proper routing
- ✅ Empty directories have been cleaned up after migration

## Next Steps

1. ⚠️ Final testing of all migrated components and pages
2. ⚠️ Remove legacy page implementations once testing is complete
3. ⚠️ Update any remaining import paths to use path aliases consistently
4. ⚠️ Conduct comprehensive application testing to ensure everything works as expected 