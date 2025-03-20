# Delphi Component Inventory

This document provides a comprehensive inventory of all components across the codebase, identifies duplicate functionality, and documents component dependencies and usage patterns.

## Component Inventory

### UI Primitives

#### Button Components
- **Button.tsx** - `/src/app/components/ui/Button.tsx`
  - Reusable button component with multiple variants
  - Features: Various styles, sizes, animations, loading states
  - Note: Duplicate implementation at `/src/app/components/ui/button/Button.tsx`

#### Feedback Components
- **LoadingIndicator.tsx** - `/src/app/components/feedback/LoadingIndicator.tsx`
  - Simple loading spinner
  - Configurable size and color
  
- **LoadingState.tsx** - `/src/app/components/feedback/LoadingState.tsx`
  - More complex loading animation
  - Uses Framer Motion for animations

- **Toast.tsx** - `/src/app/components/feedback/toast/Toast.tsx`
  - Toast notification system
  - Success, error, warning, info variants

- **ToastProvider.tsx** - `/src/app/components/feedback/toast/ToastProvider.tsx`
  - Provider component for toast system
  - Manages toast state and rendering

- **useToast.ts** - `/src/app/components/feedback/toast/useToast.ts`
  - Custom hook for managing toast notifications
  - Implements a reducer pattern for state management

- **ToastTestPanel.tsx** - `/src/app/components/feedback/toast/ToastTestPanel.tsx`
  - Test panel for toast notifications
  - Used for development and testing purposes

#### Layout Components
- **Header.tsx** - `/src/app/components/layout/Header.tsx`
  - Main navigation header
  - Responsive design, mobile menu, integration with wallet connection

- **Footer.tsx** - `/src/app/components/layout/Footer.tsx`
  - Application footer
  - Links, information sections, social media

#### Media Components
- **Carousel.tsx** - `/src/app/components/ui/Carousel/Carousel.tsx`
  - Reusable carousel/slider component
  - Features: Autoplay, navigation, pagination, swipe support, customizable styles
  - Provides a consistent implementation that can be used across the application
  - Enhanced with additional customization options and touch support

### Feature-Specific Components

#### NFT Components
- **NFTCard.tsx** - `/src/app/features/nft/components/NFTCard.tsx`
  - Card for displaying NFT information
  - Image display, metadata, pricing, buy functionality

- **NFTDetailView.tsx** - `/src/app/features/nft/components/NFTDetailView.tsx`
  - Detailed view of NFT information
  - Full metadata display, purchase options

- **NFTCarousel.tsx** - `/src/app/features/nft/components/NFTCarousel.tsx`
  - Specialized carousel for NFTs
  - NFT-specific display and interactions

- **NFTAttributes.tsx** - `/src/app/features/nft/components/NFTAttributes.tsx`
  - Display NFT attributes/properties
  - Formatted display of metadata attributes

#### Marketplace Components
- **NFTMarketplaceDashboard.tsx** - `/src/app/features/marketplace/components/NFTMarketplaceDashboard.tsx`
  - Main marketplace interface
  - Displays NFT listings, filtering options

- **ListingOptionsModal.tsx** - `/src/app/features/marketplace/components/ListingOptionsModal.tsx`
  - Modal for creating NFT listings
  - Form for listing parameters, NFT selection

- **TransactionNotification.tsx** - `/src/app/features/marketplace/components/TransactionNotification.tsx`
  - Notifications for blockchain transactions
  - Status updates, transaction details

- **TransactionStatus.tsx** - `/src/app/features/marketplace/components/TransactionStatus.tsx`
  - Display transaction status
  - Visual indicators for transaction states

- **FeaturedSection.tsx** - `/src/app/features/marketplace/components/FeaturedSection/FeaturedSection.tsx`
  - Displays featured NFTs on marketplace
  - Carousel of featured items

- **FeaturedCard.tsx** - `/src/app/features/marketplace/components/FeaturedSection/FeaturedCard.tsx`
  - Card for featured NFTs
  - Simplified version of NFTCard

- **TrendingTable.tsx** - `/src/app/features/marketplace/components/TrendingTable/TrendingTable.tsx`
  - Table of trending NFTs/collections
  - Sortable data, metrics

#### Wallet Components
- **WalletConnect.tsx** - `/src/app/features/wallet/components/WalletConnect.tsx`
  - New unified wallet connection component
  - Replaces previous ThirdWeb connection components

#### Profile Components
- **ProfileHeader.tsx** - `/src/app/features/profile/components/ProfileHeader.tsx`
  - Header for user profile page
  - User information, stats

- **ProfileStats.tsx** - `/src/app/features/profile/components/ProfileStats.tsx`
  - Stats section for user profile
  - Activity metrics, collection value

- **ProfileActivity.tsx** - `/src/app/features/profile/components/ProfileActivity.tsx`
  - Activity feed for user profile
  - Transaction history, listings, purchases

## Migration Progress Update

### Completed Migrations

1. **Core UI Components** ✅
   - Toast system migrated to `/components/feedback/toast/`
   - Button component migrated to `/components/ui/`
   - Loading components migrated to `/components/feedback/`

2. **Layout Components** ✅
   - Header migrated to `/components/layout/`
   - Footer migrated to `/components/layout/`

3. **Marketplace Components** ✅
   - `TransactionStatus.tsx` migrated to `/features/marketplace/components/`
   - `TransactionNotification.tsx` migrated to `/features/marketplace/components/`
   - `NFTMarketplaceDashboard.tsx` migrated to `/features/marketplace/components/`
   - `ListingOptionsModal.tsx` migrated to `/features/marketplace/components/`

4. **NFT Components** ✅
   - `NFTDetailView.tsx` migrated to `/features/nft/components/`
   - `NFTCard.tsx` migrated to `/features/nft/components/`
   - `NFTCarousel.tsx` migrated to `/features/nft/components/`
   - `NFTAttributes.tsx` migrated to `/features/nft/components/`

5. **Wallet Components** ✅
   - `WalletConnect.tsx` added to `/features/wallet/components/`
   - Previous ThirdWeb wallet connection components consolidated

6. **Feedback Components** ✅
   - Toast system refactored and moved to `/components/feedback/toast/`
   - Added testing infrastructure for feedback components

7. **Services** ✅
   - Marketplace services migrated to `/features/marketplace/services/`

### Known Duplication and Issues

#### Component Duplicates

1. **Button Component**
   - Two implementations with similar functionality but slightly different APIs
   - `/src/app/components/ui/Button.tsx`
   - `/src/app/components/ui/button/Button.tsx`

2. **Toast/Notification Systems**
   - Consolidated implementation in `/app/components/feedback/toast/`
   - Transaction-specific notifications still remain separate

3. **Carousel Components**
   - Consolidated implementation:
     - Enhanced generic carousel in `/components/ui/Carousel/`
     - Proper exports from index.ts ensure it's available through `@/components/ui`
     - Features additional customization options, accessibility improvements, and mobile support
   - The homepage currently implements its own carousel directly in the JSX
   - Future work should leverage the reusable component

4. **FeaturedSection Component**
   - Migrated: `/app/features/marketplace/components/FeaturedSection/FeaturedSection.tsx`
   - Original files have been consolidated

5. **Wallet Connection Components**
   - Previous ThirdWeb-specific components consolidated into a single `WalletConnect.tsx`
   - Improved testing coverage added for wallet components

#### Page Structure Issues

1. **NFT Detail Page**
   - Original: `/app/nft/[id]/page.tsx`
   - Migrated Feature Page: `/app/features/nft/[id]/page.tsx` (imports from original)
   - Migrated Pages Directory: `/app/features/nft/pages/[id]/page.tsx`
   - The feature page imports from the original, while there's also a pages directory version

2. **Marketplace Page**
   - Migrated Feature Page: `/app/features/marketplace/page.tsx` (imports from pages dir)
   - Migrated Pages Directory: `/app/features/marketplace/pages/page.tsx`
   - The feature page imports from the pages directory version

3. **Home Page**
   - Original: `/app/page.tsx`
   - Migrated Feature Page: `/app/features/home/page.tsx` (imports from original)
   - The feature page imports from the original

#### Import Path Considerations

The restructuring has led to various import paths being used throughout the application:

1. **Direct Imports**
   - Example: `import { NFTMarketplaceDashboard } from "@/features/marketplace/components";`
   - Found in multiple page files

2. **Relative Imports**
   - Example: `import NFTDetailPage from '../../../nft/[id]/page';`
   - Found in feature page files

3. **Alias Imports**
   - Example: `import LoadingIndicator from "@/components/ui/LoadingIndicator";`
   - Common pattern throughout the codebase

## Recommendations for Cleanup

### Component Consolidation Phase

1. **Button Component**
   - Standardize on a single implementation
   - Ensure consistent API and behavior
   - Migrate all usages to the standard implementation

2. **Toast/Notification System**
   - Complete migration to new toast system in `/components/feedback/toast/`
   - Standardize transaction notifications to use the chosen system
   - Remove redundant toast implementations

3. **Carousel Component**
   - √ Enhanced reusable carousel component created
   - Use the generic component from `/components/ui/Carousel/` for all carousel needs
   - Apply consistent styling but with customization options
   - Maintain proper accessibility features

### Page Structure Standardization

1. **Consistent Page Organization**
   - Standardize on a single approach (feature directory or app directory)
   - Use redirects or re-exports for compatibility
   - Update routing configuration to handle all paths

2. **Import Path Standardization**
   - Establish conventions for import paths
   - Prefer path aliases for cleaner imports
   - Update relative imports to use path aliases where appropriate

### Future Enhancement Ideas

1. **Component Documentation**
   - Add JSDoc comments to all components
   - Create a Storybook for visual documentation

2. **Complete UI Primitives Library**
   - Implement missing core components (Input, Select, Modal, etc.)
   - Ensure all primitives have consistent APIs

3. **Component Testing**
   - Continue expanding unit tests for UI components (already started with feedback components)
   - Ensure visual regression testing for key components

4. **Modular Structure**
   - Complete the feature-based organization
   - Ensure clear boundaries between different feature modules
   - Implement proper exports through index files