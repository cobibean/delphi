# Delphi Marketplace Tech Stack

This document provides a detailed breakdown of the technologies and implementation details used in the Delphi NFT Marketplace.

## Core Technologies

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.1.0 | React framework with SSR |
| React | 18.3+ | UI component library |
| TypeScript | 5.0.4 | Type-safe JavaScript |
| TailwindCSS | 3.3.0 | Utility-first CSS framework |
| Framer Motion | 12.4.10 | Advanced animations |

### Web3 Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| ThirdWeb SDK | v4.0.99 | Wallet connections & basic Web3 |
| ThirdWeb React | v4.9.4 | React hooks for ThirdWeb |
| Ethers.js | 5.7.2 | Smart contract interactions |
| Metis Blockchain | Andromeda | L2 Ethereum scaling solution |

## Blockchain Implementation

### Network Configuration

Delphi operates on the Metis Andromeda network:

- **Chain ID**: 1088
- **RPC URL**: https://andromeda.metis.io/?owner=1088
- **Block Explorer**: https://explorer.metis.io/
- **Currency**: METIS (native), WMETIS (wrapped)

### Contract Integration

The application directly interacts with the following smart contracts:

1. **Marketplace Contract (`0x7e9EE861e3721F9F3664C18A539e63aCb784a208`)**:
   - Handles NFT listings, purchases, and other marketplace operations
   - Custom implementation with functions for buying with both METIS and WMETIS

2. **WMETIS Contract (`0x75cb093E4D61d2A2e65D8e0BBb01DE8d89b53481`)**:
   - ERC20 token representing wrapped METIS
   - Used for purchases when users prefer token-based transactions

3. **NFT Contracts**:
   - Various ERC721/ERC1155 contracts that hold the actual NFTs
   - Accessed dynamically based on the asset contract address in listings

### Smart Contract Interaction Flow

#### Fetching Listings

```typescript
// 1. Get marketplace contract
const marketplaceContract = getMarketplaceContract();

// 2. Get total listings count
const totalListings = await marketplaceContract.totalListings();

// 3. Filter for active listings
for (let i = 0; i < totalListings; i++) {
  const listing = await marketplaceContract.getListing(i);
  if (listing && listing.status === 1) {
    // Status 1 = active listing
    validListings.push({...listing, id: i});
  }
}

// 4. Enhance listings with NFT metadata
const enhancedListings = await Promise.all(
  validListings.map(async (listing) => {
    const nftContract = getERC721Contract(listing.assetContract);
    const tokenURI = await nftContract.tokenURI(listing.tokenId);
    const metadata = await fetchMetadata(tokenURI);
    // Return full listing with metadata
    return { ...listing, metadata };
  })
);
```

#### Purchasing NFTs

```typescript
// With METIS (native token)
const tx = await marketplaceContract.buyFromListing(
  listingId,                // _listingId
  buyerAddress,             // _buyFor (who receives the NFT)
  1,                        // _quantity
  listing.currency,         // _currency
  priceInWei,               // _totalPrice
  { value: priceInWei }     // transaction value (includes METIS)
);

// With WMETIS (ERC20 token)
// 1. Approve marketplace to spend WMETIS
const wmetisContract = getWMetisContract(signer);
await wmetisContract.approve(MARKETPLACE_ADDRESS, priceInWei);

// 2. Execute purchase
const tx = await marketplaceContract.buyFromListing(
  listingId,                 // _listingId
  userAddress,               // _buyFor (who receives the NFT)
  1,                         // _quantity
  WMETIS_CONTRACT_ADDRESS,   // _currency
  priceInWei                 // _totalPrice
);
```

## Application Architecture

### State Management

The application uses several state management approaches:

1. **Local Component State**: React's useState for component-specific states
2. **Custom Context Providers**:
   - `TransactionProvider`: Manages and displays transaction status
   - `WalletProvider`: Handles wallet connection status

### Key Components

#### UI Components

- **NFTCard**: Displays individual NFT listings with cosmic effects
- **NFTDetailView**: Rich NFT viewing experience with buying functionality
- **NFTMarketplaceDashboard**: Grid layout of available NFTs
- **WalletConnection**: Manages wallet connection UI and state
- **TransactionNotification**: Shows real-time transaction status

#### Service Components

- **marketplace.ts**: Core service handling NFT fetching and transactions
- **client.ts**: Sets up blockchain connections and contract instances

### File Organization

```
src/app/
├── components/            # UI components
│   ├── NFTCard/           # NFT card components
│   ├── SharedComponents/  # Header, Footer, etc.
│   └── ui/                # Basic UI elements
├── constants/             # ABIs and contract addresses
├── interfaces/            # TypeScript type definitions
├── providers/             # Context providers
├── services/              # API and blockchain services
└── utils/                 # Utility functions
```

## Design System Implementation

The "Cosmic Overload" design system is implemented through:

1. **Custom TailwindCSS Configuration**:
   - Custom color palette with cosmic theme colors
   - Extended animation utilities for glitch effects
   - Custom plugin for reality distortion effects

2. **Custom CSS Components**:
   - Energy field animations
   - Dimensional transitions
   - Quantum effects

3. **Dynamic Styling**:
   - State-based style changes using React hooks
   - Random variations for organic-feeling UI
   - Animation sequences timed with user interactions

## Performance Optimizations

1. **Image Handling**:
   - Efficient loading of NFT images with fallbacks
   - IPFS gateway alternatives for better reliability

2. **Network Optimizations**:
   - Batched contract calls where possible
   - Caching of NFT metadata
   - Optimistic UI updates during transactions

3. **Rendering Performance**:
   - Component memoization for expensive renders
   - Lazy loading of image-heavy components
   - Throttled animations during high-activity periods

## Testing Strategy

1. **Component Testing**:
   - Jest and React Testing Library for component tests
   - Snapshot testing for UI consistency

2. **Contract Interaction Testing**:
   - Mocked contract responses for predictable testing
   - End-to-end tests for critical purchase flows

3. **Manual Testing Checklist**:
   - Wallet connection across different providers
   - Purchase flows with both METIS and WMETIS
   - Error handling and recovery

## Future Development Roadmap

1. **Multi-Chain Support**:
   - Expansion to additional EVM chains
   - Cross-chain NFT bridging

2. **Enhanced NFT Features**:
   - Dynamic NFTs with changing attributes
   - Interactive 3D NFT viewing

3. **Marketplace Extensions**:
   - NFT auctions
   - Collection-based features
   - Creator royalties dashboard 