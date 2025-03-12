# NFT Marketplace Project Structure

This document outlines the recommended project structure for our NFT marketplace using Thirdweb V5 SDK.

## Directory Structure

```
/app
  /components
    /shared
      /Providers.tsx        # Thirdweb and other providers setup
      /Navbar.tsx           # Navigation and wallet connection UI
      /Footer.tsx           # Footer component
    /wallet
      /WalletButton.tsx     # Wallet connect/disconnect button
      /WalletDetails.tsx    # Wallet balance, address, etc.
    /nft
      /NFTCard.tsx          # NFT display card
      /NFTGrid.tsx          # Grid layout for NFTs
      /NFTDetails.tsx       # Detailed NFT view
      /NFTMedia.tsx         # NFT media display (wrapping Thirdweb component)
    /marketplace
      /CreateListing.tsx    # Form to create a listing
      /ListingCard.tsx      # Display for a marketplace listing
      /ListingGrid.tsx      # Grid of listings
      /BuyButton.tsx        # Button to buy an NFT
      /PriceInput.tsx       # Price input with currency selector
    /ui
      /Button.tsx           # Custom button component
      /Modal.tsx            # Modal component
      /Loading.tsx          # Loading states
  /hooks
    /useNFTCollection.tsx   # Custom hook for NFT collections
    /useNFT.tsx             # Custom hook for single NFT
    /useMarketplace.tsx     # Custom hook for marketplace functions
    /useTransaction.tsx     # Transaction tracking hook
    /useTokenBalance.tsx    # Token balance hook
  /utils
    /chains.ts              # Chain definitions and utilities
    /contracts.ts           # Contract addresses
    /formatters.ts          # Formatting utilities
  /consts
    /marketplace.ts         # Marketplace contract addresses
    /tokens.ts              # Supported tokens configuration
    /collections.ts         # NFT collections configuration
  /app
    /page.tsx               # Homepage with featured listings
    /layout.tsx             # Root layout with providers
    /collections
      /[contractAddress]/page.tsx     # Collection page
      /[contractAddress]/[tokenId]/page.tsx   # NFT detail page
    /profile
      /[address]/page.tsx   # User profile page
    /create-listing
      /page.tsx             # Create listing page
/public
  /assets
    /images                 # Static images
    /icons                  # Icon assets
    /token-icons            # Token icon assets
/docs
  /thirdweb-reference.md    # Thirdweb quick reference guide
/reference
  /thirdweb-marketplace-template  # Reference implementation
```

## Key Files

### Providers.tsx

```tsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThirdwebProvider } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { FC, ReactNode } from "react";
import { AutoConnect } from "thirdweb/react";

const queryClient = new QueryClient();
const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_TW_CLIENT_ID as string,
});

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider>
        <AutoConnect client={client} />
        {children}
      </ThirdwebProvider>
    </QueryClientProvider>
  );
};
```

### useMarketplace.tsx

```tsx
import { useActiveWallet, useReadContract, useSendTransaction } from "thirdweb/react";
import { MARKETPLACE_CONTRACTS } from "@/consts/marketplace";
import { useActiveWalletChain } from "thirdweb/react";

export function useMarketplace() {
  const wallet = useActiveWallet();
  const activeChain = useActiveWalletChain();
  
  // Find the marketplace contract for the active chain
  const marketplaceContract = MARKETPLACE_CONTRACTS.find(
    (contract) => contract.chain.id === activeChain?.id
  );
  
  // Get active listings
  const { data: listings, isLoading, refetch } = useReadContract({
    contract: marketplaceContract?.address,
    method: "getActiveListings",
    params: []
  });
  
  // Create listing function
  const createListing = async (params) => {
    // Implementation using Thirdweb V5 SDK
  };
  
  // Buy from listing function
  const buyFromListing = async (listingId, quantity) => {
    // Implementation using Thirdweb V5 SDK
  };
  
  return {
    listings,
    isLoading,
    refetchListings: refetch,
    createListing,
    buyFromListing,
    marketplaceContract
  };
}
```

### NFTCard.tsx

```tsx
import { NFTMedia, NFTName } from "thirdweb/react";
import { FC } from "react";
import Link from "next/link";

interface NFTCardProps {
  nft: {
    id: string;
    metadata: any;
    contractAddress: string;
  };
}

export const NFTCard: FC<NFTCardProps> = ({ nft }) => {
  return (
    <Link href={`/collections/${nft.contractAddress}/${nft.id}`}>
      <div className="nft-card">
        <NFTMedia metadata={nft.metadata} className="nft-media" />
        <div className="nft-info">
          <NFTName metadata={nft.metadata} className="nft-name" />
          <div className="nft-collection">{nft.contractAddress}</div>
        </div>
      </div>
    </Link>
  );
};
```

## Configuration Files

### marketplace.ts

```typescript
import type { Chain } from "thirdweb";
import { ethereum, sepolia, polygonMumbai, avalancheFuji } from "thirdweb/chains";

type MarketplaceContract = {
  address: string;
  chain: Chain;
};

export const MARKETPLACE_CONTRACTS: MarketplaceContract[] = [
  {
    address: "0x...", // Your marketplace contract on Ethereum
    chain: ethereum,
  },
  {
    address: "0x...", // Your marketplace contract on Sepolia
    chain: sepolia,
  },
  // Add more chains as needed
];
```

### tokens.ts

```typescript
import type { Chain } from "thirdweb";
import { ethereum, sepolia } from "thirdweb/chains";
import { NATIVE_TOKEN_ADDRESS } from "thirdweb";

export type Token = {
  tokenAddress: string;
  symbol: string;
  icon: string;
};

export type SupportedTokens = {
  chain: Chain;
  tokens: Token[];
};

export const SUPPORTED_TOKENS: SupportedTokens[] = [
  {
    chain: ethereum,
    tokens: [
      {
        tokenAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
        symbol: "USDC",
        icon: "/assets/token-icons/usdc.png",
      },
      {
        tokenAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT
        symbol: "USDT",
        icon: "/assets/token-icons/usdt.png",
      },
    ],
  },
  // Add more chains and tokens as needed
];

// Map of chain ID to native token icon
export const NATIVE_TOKEN_ICON_MAP: Record<number, string> = {
  1: "/assets/token-icons/eth.png", // Ethereum
  137: "/assets/token-icons/matic.png", // Polygon
  // Add more as needed
};
```

## Next Steps

After setting up this project structure:

1. Implement the core components following the Thirdweb V5 patterns
2. Maintain all interactions using Thirdweb hooks and functions
3. Create the specific marketplace functionality for listings and purchases
4. Add proper error handling and loading states
5. Implement UI/UX improvements and styling 