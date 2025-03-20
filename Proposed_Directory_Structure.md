# Delphi Project: Proposed Directory Structure

This document presents the proposed directory structure for the Delphi project based on the domain identification completed earlier. The structure follows a domain-driven design approach while maintaining a clean, flat organization with a maximum of 3 levels of nesting.

## Top-Level Structure

```
/src/app/
├── components/            # Shared reusable components
├── features/              # Domain-specific features
├── hooks/                 # Shared hooks
├── services/              # Service layer for API interactions
├── stores/                # Global state management
├── utils/                 # Utility functions
├── styles/                # Global styles
├── types/                 # Shared TypeScript types
├── constants/             # Application constants
├── layout.tsx             # Root layout
└── page.tsx               # Home page
```

## Components Directory

The `components` directory contains shared components used across multiple domains:

```
/src/app/components/
├── ui/                    # Core UI primitives
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   ├── Tabs.tsx
│   └── index.ts           # Barrel exports
├── layout/                # Layout components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Container.tsx
│   └── index.ts           # Barrel exports
├── feedback/              # Feedback components
│   ├── ToastNotification.tsx
│   ├── LoadingState.tsx
│   ├── ErrorDisplay.tsx
│   └── index.ts           # Barrel exports
├── modals/                # Modal dialog components
│   ├── ConfirmationModal.tsx
│   ├── AlertModal.tsx
│   └── index.ts           # Barrel exports
└── index.ts               # Barrel exports for all component categories
```

## Features Directory

The `features` directory organizes components by their domain:

```
/src/app/features/
├── marketplace/           # Marketplace domain
│   ├── components/        # Marketplace-specific components
│   │   ├── FeaturedSection.tsx
│   │   ├── NFTMarketplaceDashboard.tsx
│   │   ├── TrendingTable.tsx
│   │   ├── Carousel.tsx
│   │   └── index.ts       # Barrel exports
│   ├── hooks/             # Marketplace-specific hooks
│   │   ├── useMarketplace.ts
│   │   ├── useTrending.ts
│   │   └── index.ts       # Barrel exports
│   └── index.ts           # Barrel exports for marketplace domain
├── nft/                   # NFT domain
│   ├── components/        # NFT-specific components
│   │   ├── NFTDetailView.tsx
│   │   ├── NFTCard.tsx
│   │   ├── NFTCarousel.tsx
│   │   ├── NFTAttributes.tsx
│   │   ├── ListingOptionsModal.tsx
│   │   └── index.ts       # Barrel exports
│   ├── hooks/             # NFT-specific hooks
│   │   ├── useNFTDetails.ts
│   │   ├── useListingCreation.ts
│   │   └── index.ts       # Barrel exports
│   └── index.ts           # Barrel exports for NFT domain
├── wallet/                # Wallet domain
│   ├── components/        # Wallet-specific components
│   │   ├── ThirdwebConnectButton.tsx
│   │   ├── ThirdwebConnectDialog.tsx
│   │   ├── WalletConnection.tsx
│   │   ├── TransactionStatus.tsx
│   │   ├── TransactionNotification.tsx
│   │   └── index.ts       # Barrel exports
│   ├── hooks/             # Wallet-specific hooks
│   │   ├── useWallet.ts
│   │   ├── useTransaction.ts
│   │   └── index.ts       # Barrel exports
│   └── index.ts           # Barrel exports for wallet domain
└── profile/               # Profile domain
    ├── components/        # Profile-specific components
    │   ├── ProfileView.tsx
    │   ├── UserSettings.tsx
    │   ├── ActivityHistory.tsx
    │   ├── UserNFTCollection.tsx
    │   └── index.ts       # Barrel exports
    ├── hooks/             # Profile-specific hooks
    │   ├── useProfile.ts
    │   ├── useUserSettings.ts
    │   └── index.ts       # Barrel exports
    └── index.ts           # Barrel exports for profile domain
```

## Hooks Directory

The `hooks` directory contains shared hooks used across multiple domains:

```
/src/app/hooks/
├── useMediaQuery.ts       # Responsive design hook
├── useDebounce.ts         # Debounce hook
├── useLocalStorage.ts     # Local storage hook
├── useClickOutside.ts     # Detect clicks outside elements
└── index.ts               # Barrel exports
```

## Services Directory

The `services` directory contains service layer code for external interactions:

```
/src/app/services/
├── api/                   # API services
│   ├── marketplace.ts     # Marketplace API service
│   ├── nft.ts             # NFT API service
│   ├── user.ts            # User API service
│   └── index.ts           # Barrel exports
├── thirdweb/              # ThirdWeb SDK integration
│   ├── client.ts          # ThirdWeb client configuration
│   ├── marketplace.ts     # ThirdWeb marketplace integration
│   ├── wallet.ts          # ThirdWeb wallet integration
│   └── index.ts           # Barrel exports
└── index.ts               # Barrel exports for all services
```

## Stores Directory

The `stores` directory contains global state management:

```
/src/app/stores/
├── errorStore.ts          # Error management store
├── marketplaceStore.ts    # Marketplace data store
├── walletStore.ts         # Wallet connection store
├── userStore.ts           # User data store
└── index.ts               # Barrel exports
```

## Utils Directory

The `utils` directory contains utility functions:

```
/src/app/utils/
├── formatting/            # Formatting utilities
│   ├── currency.ts        # Currency formatting
│   ├── date.ts            # Date formatting
│   └── index.ts           # Barrel exports
├── validation/            # Validation utilities
│   ├── forms.ts           # Form validation
│   ├── wallet.ts          # Wallet address validation
│   └── index.ts           # Barrel exports
├── animation.ts           # Animation utilities
├── blockchain.ts          # Blockchain utilities
└── index.ts               # Barrel exports
```

## Path Aliases

To simplify imports, we'll add the following path aliases in tsconfig.json:

```json
{
  "compilerOptions": {
    "paths": {
      "@/components/*": ["./src/app/components/*"],
      "@/components": ["./src/app/components"],
      "@/features/*": ["./src/app/features/*"],
      "@/features": ["./src/app/features"],
      "@/hooks/*": ["./src/app/hooks/*"],
      "@/hooks": ["./src/app/hooks"],
      "@/services/*": ["./src/app/services/*"],
      "@/services": ["./src/app/services"],
      "@/stores/*": ["./src/app/stores/*"],
      "@/stores": ["./src/app/stores"],
      "@/utils/*": ["./src/app/utils/*"],
      "@/utils": ["./src/app/utils"],
      "@/types/*": ["./src/app/types/*"],
      "@/types": ["./src/app/types"],
      "@/constants": ["./src/app/constants"]
    }
  }
}
```

## Import Examples

With this structure, imports would look like:

```typescript
// Importing UI components
import { Button } from "@/components/ui";

// Importing a specific domain component
import { NFTCard } from "@/features/nft/components";

// Importing hooks
import { useWallet } from "@/features/wallet/hooks";
import { useMediaQuery } from "@/hooks";

// Importing services
import { marketplaceService } from "@/services/api";

// Importing store
import { useErrorStore } from "@/stores";
```

## Key Benefits

This structure provides several key benefits:

1. **Domain Separation**: Components are organized by their business domain, making it clear where to find specific functionality.

2. **Shared Components**: Common UI elements are centralized and easily accessible.

3. **Flat Structure**: Maximum of 3 levels of nesting maintains readability and navigability.

4. **Clear Boundaries**: Clear separation between domain-specific and shared components.

5. **Path Aliases**: Simplified imports with clear indication of component origin.

6. **Barrel Exports**: Streamlined import statements with index.ts files.

7. **Scalability**: Easy to add new domains or components without disrupting the existing structure.

This structure aligns with the Domain-Driven approach used in the ThirdWeb marketplace template while addressing the specific needs of the Delphi project. 