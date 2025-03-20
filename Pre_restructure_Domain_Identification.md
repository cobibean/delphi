# Delphi Application Domains - Pre-Restructuring Identification

This document identifies the core domains of the Delphi application to guide the component restructuring process.

## 1. Marketplace Domain
**Purpose**: Central hub for browsing, discovering, and interacting with NFT listings.

**Core Components**:
- `NFTMarketplaceDashboard`
- `TrendingTable`
- `FeaturedSection` 
- `Carousel`
- Filtering and sorting components

**State/Data Requirements**:
- Listing data (prices, auction details, etc.)
- Market trends and stats
- Featured/trending data

**Boundaries**:
- Displays NFTs but doesn't manage their creation/details
- Integrates with wallet for transactions
- Entry point for most user interactions

## 2. NFT Domain
**Purpose**: Handles individual NFT display, details, and management.

**Core Components**:
- `NFTDetailView`
- `NFTCard`
- `NFTCarousel`
- `NFTAttributes`
- Listing creation forms

**State/Data Requirements**:
- NFT metadata
- Media content
- Ownership history
- Listing status

**Boundaries**:
- Used by marketplace for displaying items
- Interacts with wallet for transactions
- Manages NFT creation and listing processes

## 3. Wallet Domain
**Purpose**: Handles wallet connections, authentication, and transaction management.

**Core Components**:
- `ThirdwebConnectButton`
- `ThirdwebConnectDialog`
- `WalletConnection`
- `TransactionStatus`
- `TransactionNotification`

**State/Data Requirements**:
- Wallet connection state
- Transaction history
- Authentication status
- Balance information

**Boundaries**:
- Used by NFT domain for transactions
- Provides authentication for profile
- Handles blockchain interactions

## 4. Profile Domain
**Purpose**: User profile management, preferences, and history.

**Core Components**:
- Profile view
- Settings components
- User NFT collection view
- Activity history

**State/Data Requirements**:
- User data
- Owned NFTs
- Transaction history
- User preferences

**Boundaries**:
- Uses wallet domain for authentication
- Displays NFTs from NFT domain
- Personal user experience center

## 5. UI Core Domain
**Purpose**: Shared UI components and design system elements.

**Core Components**:
- `Button`
- `LoadingState`/`LoadingIndicator`
- `Modal`
- `Tabs`
- Toast/notification systems

**State/Data Requirements**:
- UI state
- Theme preferences
- Animation states

**Boundaries**:
- Used by all other domains
- No business logic
- Purely presentational

## 6. Feedback Domain
**Purpose**: User feedback, notifications, and status indicators.

**Core Components**:
- `ToastNotification`
- Error displays
- Success indicators
- Loading states

**State/Data Requirements**:
- Error messages
- Success messages
- Loading states
- Notification queue

**Boundaries**:
- Used by all other domains
- Manages temporary UI states
- Communicates system status to users

## 7. Layout Domain
**Purpose**: Application structure, navigation, and container components.

**Core Components**:
- `Header`
- `Footer`
- `Layout`
- Navigation components

**State/Data Requirements**:
- Navigation state
- User authentication status (for navigation options)
- Layout preferences

**Boundaries**:
- Provides structure for all pages
- Handles navigation between domains
- Consistent across the application

## Directory Structure Mapping

Based on these domains, here's how they would map to our target structure:

```
/src/app/
├── components/              # Shared components
│   ├── ui/                  # UI Core Domain (Button, Input, etc.)
│   ├── layout/              # Layout Domain (Header, Footer, etc.)
│   ├── feedback/            # Feedback Domain (Toast, Alert, etc.)
│   └── modals/              # Modal components
├── features/                # Domain-specific features
│   ├── marketplace/         # Marketplace Domain
│   │   ├── components/      # FeaturedSection, TrendingTable, etc.
│   │   └── hooks/           # Marketplace-specific hooks
│   ├── nft/                 # NFT Domain
│   │   ├── components/      # NFTCard, NFTDetailView, etc.
│   │   └── hooks/           # NFT-specific hooks
│   ├── wallet/              # Wallet Domain
│   │   ├── components/      # WalletConnection, TransactionStatus, etc.
│   │   └── hooks/           # Wallet-specific hooks
│   └── profile/             # Profile Domain
│       ├── components/      # Profile-specific components
│       └── hooks/           # Profile-specific hooks
```

## Cross-Domain Interactions

1. **Marketplace ↔ NFT**: Marketplace displays NFTs and links to detail pages
2. **NFT ↔ Wallet**: NFT listings require wallet for transactions
3. **Wallet ↔ Profile**: Profile displays wallet-related information
4. **Feedback → All**: All domains use feedback for notifications
5. **UI Core → All**: All domains use core UI components
6. **Layout → All**: All domains exist within the application layout

## Next Steps

1. Review and finalize domain identification
2. Begin creating the directory structure
3. Map existing components to their new locations
4. Start migration according to the restructuring plan 