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
| ThirdWeb SDK | v5.0.0 | Wallet connections & marketplace extensions |
| Ethers.js | 5.7.2 | Smart contract interactions (fallback) |
| Metis Blockchain | Andromeda | L2 Ethereum scaling solution |

## Blockchain Implementation

### Network Configuration

Delphi operates on the Metis Andromeda network:

- **Chain ID**: 1088
- **Public RPC URL**: https://andromeda.metis.io/?owner=1088
- **Block Explorer**: https://explorer.metis.io/
- **Currency**: METIS (native), WMETIS (wrapped)

### Contract Integration

The application interacts with the following smart contracts using ThirdWeb v5 marketplace extensions:

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

#### Fetching Listings with ThirdWeb v5

```typescript
// 1. Import the necessary functions
import { getContract } from "thirdweb";
import { getAllListings } from "thirdweb/extensions/marketplace";
import { client, metisChain } from "@/app/client";

// 2. Get marketplace contract
const contract = await getContract({
  client,
  chain: metisChain,
  address: CONTRACT_ADDRESS as `0x${string}`,
});

// 3. Get all listings using ThirdWeb v5 marketplace extension
const listings = await getAllListings({ contract });

// 4. Transform the listings to match your interface
const enhancedListings = await Promise.all(
  listings.map(async (listing) => {
    // Get NFT contract
    const nftContract = await getContract({
      client,
      chain: metisChain,
      address: listing.assetContractAddress as `0x${string}`,
    });
    
    // Fetch metadata
    const tokenURI = await nftContract.call("tokenURI", [listing.tokenId]);
    const metadata = await fetchMetadata(tokenURI);
    
    // Return full listing with metadata
    return { 
      listingId: listing.id.toString(),
      tokenId: listing.tokenId.toString(),
      // ... other properties
      metadata 
    };
  })
);
```

#### Getting a Single Listing

```typescript
// 1. Import the necessary functions
import { getContract } from "thirdweb";
import { getListing } from "thirdweb/extensions/marketplace";
import { client, metisChain } from "@/app/client";

// 2. Get the marketplace contract
const contract = await getContract({
  client,
  chain: metisChain,
  address: CONTRACT_ADDRESS as `0x${string}`,
});

// 3. Get the listing using ThirdWeb v5 marketplace extension
const listing = await getListing({ 
  contract, 
  listingId: BigInt(listingId) 
});

// 4. Transform the listing as needed
// ... fetch additional metadata, etc.
```

#### Purchasing NFTs with METIS

```typescript
// 1. Import the necessary functions
import { getContract } from "thirdweb";
import { buyFromListing } from "thirdweb/extensions/marketplace";
import { client, metisChain } from "@/app/client";

// 2. Get the marketplace contract
const contract = await getContract({
  client,
  chain: metisChain,
  address: CONTRACT_ADDRESS as `0x${string}`,
});

// 3. Buy the NFT using ThirdWeb v5 marketplace extension
const result = await buyFromListing({
  contract,
  listingId: BigInt(listingId),
  quantity: BigInt(1),
  wallet
});

// 4. Access transaction data
const txHash = result.receipt?.transactionHash;
console.log(`Transaction sent: ${txHash}`);
```

#### Purchasing NFTs with WMETIS

```typescript
// 1. Get the WMETIS contract
const wmetisContract = await getContract({
  client,
  chain: metisChain,
  address: WMETIS_CONTRACT_ADDRESS as `0x${string}`,
});

// 2. Approve the marketplace to spend WMETIS
await wmetisContract.call("approve", [
  CONTRACT_ADDRESS,
  priceInWei.toString()
]);

// 3. Get the marketplace contract
const marketplaceContract = await getContract({
  client,
  chain: metisChain,
  address: CONTRACT_ADDRESS as `0x${string}`,
});

// 4. Buy the NFT using ThirdWeb v5 marketplace extension
const result = await buyFromListing({
  contract: marketplaceContract,
  listingId: BigInt(listingId),
  quantity: BigInt(1),
  currencyAddress: WMETIS_CONTRACT_ADDRESS,
  wallet
});
```

## Application Architecture

### State Management

The application uses several state management approaches:

1. **Local Component State**: React's useState for component-specific states
2. **Custom Context Providers**:
   - `TransactionProvider`: Manages and displays transaction status
   - `WalletProvider`: Handles wallet connection status
3. **ThirdWeb v5 React Hooks**:
   - `useActiveAccount`, `useActiveWallet` for wallet state

### Key Components

#### UI Components

- **NFTCard**: Displays individual NFT listings with cosmic effects
- **NFTDetailView**: Rich NFT viewing experience with buying functionality
- **NFTMarketplaceDashboard**: Grid layout of available NFTs
- **ThirdwebConnectButton**: Manages wallet connection UI and state
- **TransactionNotification**: Shows real-time transaction status

#### Service Components

- **marketplace.ts**: Core service handling NFT fetching and transactions using ThirdWeb v5 marketplace extensions
- **client.ts**: Sets up ThirdWeb v5 client and blockchain connections

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

## Fallback Mechanism

The marketplace service includes a fallback mechanism to v4 implementation when v5 has issues, ensuring a smooth transition during the migration:

```typescript
try {
  // Try ThirdWeb v5 approach first
  const contract = await getContract({
    client,
    chain: metisChain,
    address: CONTRACT_ADDRESS as `0x${string}`,
  });
  
  // Use ThirdWeb v5 marketplace extension
  return await marketplaceExtensionFunction({ contract, /* params */ });
} catch (v5Error) {
  console.warn("ThirdWeb v5 approach failed, falling back to legacy approach:", v5Error);
  
  // Fall back to v4 implementation
  return legacyImplementation();
}
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
   - Error handling for failed image loads

2. **Network Optimizations**:
   - Direct access to marketplace functions through ThirdWeb v5 extensions
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