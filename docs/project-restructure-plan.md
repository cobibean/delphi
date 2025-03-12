# Delphi NFT Marketplace Restructuring Plan

## Current Structure to New Structure Mapping

```
Current Structure                 →  New Structure
------------------                   --------------
/src/app/                        →  /app/
  /components/                       /components/
    NFTCard/                           /shared/
      NFTCard.tsx                        Providers.tsx (new)
    NFTDetailView.tsx                    Navbar.tsx (existing)
    TransactionNotification.tsx          Footer.tsx (existing)
    ui/                               /wallet/
      LoadingIndicator.tsx              WalletButton.tsx (new)
                                       WalletDetails.tsx (new)
                                    /nft/
                                       NFTCard.tsx (move from NFTCard/)
                                       NFTGrid.tsx (new)
                                       NFTDetailView.tsx (move)
                                       NFTMedia.tsx (new)
                                    /marketplace/
                                       CreateListing.tsx (new)
                                       ListingCard.tsx (new)
                                       ListingGrid.tsx (new)
                                       BuyButton.tsx (new)
                                       PriceInput.tsx (new)
                                    /ui/
                                       LoadingIndicator.tsx (move)
                                       TransactionNotification.tsx (move)
                                       Button.tsx (new)
                                       Modal.tsx (new)

  /services/                        /hooks/
    marketplace.ts                    useNFTCollection.tsx (new)
    marketplace-v5.ts                useNFT.tsx (new)
                                    useMarketplace.tsx (new)
                                    useTransaction.tsx (new)
                                    useTokenBalance.tsx (new)

  /config/                         /utils/
    chain.ts                         chains.ts (move & rename)
    client.ts                        contracts.ts (move & rename)
                                    formatters.ts (new)

  /constants/                      /consts/
    contracts.ts                     marketplace.ts (move & rename)
    MarketplaceABI.ts               tokens.ts (new)
    ERC721ABI.ts                    collections.ts (new)
    ERC1155ABI.ts

  /interfaces/                     /types/ (new location)
    interfaces.ts                    marketplace.ts (split from interfaces.ts)
                                    nft.ts (split from interfaces.ts)
                                    transaction.ts (split from interfaces.ts)

  /providers/                      /providers/ (keep existing)
    TransactionProvider.tsx          TransactionProvider.tsx (keep)
```

## Migration Steps

1. **Create New Directory Structure**
```bash
mkdir -p app/components/{shared,wallet,nft,marketplace,ui}
mkdir -p app/{hooks,utils,consts,types,providers}
```

2. **Move and Rename Existing Files**
   - Keep all existing styling and functionality
   - Only restructure the location and organization

3. **Component Migrations**

### NFT Components
```typescript
// Move NFTCard.tsx to /components/nft/
// Keep existing styling and functionality
// Update imports to reflect new structure
mv src/app/components/NFTCard/NFTCard.tsx app/components/nft/

// Move NFTDetailView.tsx to /components/nft/
// Keep existing styling and functionality
// Update imports to reflect new structure
mv src/app/components/NFTDetailView.tsx app/components/nft/
```

### UI Components
```typescript
// Move LoadingIndicator.tsx to /components/ui/
// Keep existing styling and functionality
mv src/app/components/ui/LoadingIndicator.tsx app/components/ui/

// Move TransactionNotification.tsx to /components/ui/
// Keep existing styling and functionality
mv src/app/components/TransactionNotification.tsx app/components/ui/
```

4. **Service to Hooks Migration**

Create new hook files that will eventually replace the services:
```typescript
// /hooks/useMarketplace.tsx
// This will eventually replace marketplace.ts and marketplace-v5.ts
// For now, it can wrap the existing service functions
export function useMarketplace() {
  // Initially import and use existing marketplace functions
  // Will be refactored during Thirdweb V5 migration
  return {
    // Existing functionality wrapped in hooks
  };
}
```

5. **Configuration Files**

Move and rename configuration files while preserving functionality:
```typescript
// Move chain.ts to /utils/chains.ts
// Move client.ts to /utils/contracts.ts
// Create new formatters.ts for shared formatting functions
```

6. **Type Definitions**

Split interfaces.ts into domain-specific type files:
```typescript
// /types/marketplace.ts
export interface IDirectListing { ... }
export interface IListingWithNFT { ... }

// /types/nft.ts
export interface INFTAttribute { ... }
export interface INFTMetadata { ... }

// /types/transaction.ts
export interface Transaction { ... }
```

7. **Constants Organization**

Organize constants into domain-specific files:
```typescript
// /consts/marketplace.ts
export const MARKETPLACE_CONTRACTS = { ... }

// /consts/tokens.ts
export const SUPPORTED_TOKENS = { ... }

// /consts/collections.ts
export const SUPPORTED_COLLECTIONS = { ... }
```

## Implementation Order

1. Create the new directory structure
2. Move existing files to their new locations
3. Update import paths in all files
4. Create placeholder files for new components
5. Test that everything still works with the new structure
6. Begin Thirdweb V5 migration according to the migration plan

## Preserving Existing Functionality

- All component styling will be preserved
- All existing functionality will remain unchanged
- Only the file organization will be updated
- Import paths will be updated to reflect new structure

## Next Steps After Restructuring

1. Verify all components work as before
2. Begin Thirdweb V5 migration
3. Implement new components as needed
4. Enhance existing components with Thirdweb V5 features

## Commands to Execute Restructuring

```bash
# Create new directory structure
mkdir -p app/components/{shared,wallet,nft,marketplace,ui}
mkdir -p app/{hooks,utils,consts,types,providers}

# Move components
mv src/app/components/NFTCard/NFTCard.tsx app/components/nft/
mv src/app/components/NFTDetailView.tsx app/components/nft/
mv src/app/components/ui/LoadingIndicator.tsx app/components/ui/
mv src/app/components/TransactionNotification.tsx app/components/ui/

# Move configuration files
mv src/app/config/chain.ts app/utils/chains.ts
mv src/app/config/client.ts app/utils/contracts.ts

# Move and split interfaces
mkdir -p app/types
# Split interfaces.ts into multiple files in app/types/

# Move constants
mv src/app/constants/* app/consts/

# Move providers
mv src/app/providers/* app/providers/
```

## Testing After Restructuring

1. Run the development server
2. Test all existing functionality
3. Verify all components render correctly
4. Check all interactions work as before
5. Verify all styling is preserved

This restructuring plan maintains all existing functionality and styling while organizing the code in a more scalable and maintainable way, preparing it for the Thirdweb V5 migration. 