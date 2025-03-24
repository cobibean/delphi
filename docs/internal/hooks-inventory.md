# Delphi Project Hook Inventory

This document provides a comprehensive inventory of all React hooks used in the Delphi project, organized by category.

## Custom Hooks

### Feedback & UI Hooks

#### `useToast`
- **Location**: 
  - `/src/app/components/feedback/useToast.ts` 
- **Purpose**: Provides toast notification functionality for the application
- **Features**:
  - Manages toast notifications state (add, update, dismiss, remove)
  - Supports different variants: default, destructive, success, warning, info
  - Handles timeouts for auto-dismissal
  - Supports custom actions within toast notifications

### Marketplace Hooks

#### `useMarketplaceMint`
- **Location**: 
  - `/src/app/features/marketplace/hooks/useMarketplaceMint.ts` (new location)
  - `/src/app/hooks/useMarketplaceMint.ts` (legacy location)
- **Purpose**: Handles NFT marketplace transactions, specifically for wrapping METIS tokens and buying NFTs
- **Features**:
  - Wraps native METIS tokens to WMETIS
  - Approves WMETIS for marketplace spending
  - Purchases NFTs from marketplace listings
  - Handles transaction state and notifications
  - Integrates with wallet and transaction tracking systems

### NFT Hooks

#### `useNFTMetadata`
- **Location**: `/src/app/features/nft/hooks/useNFTMetadata.ts`
- **Purpose**: Fetches and formats NFT metadata from smart contracts
- **Features**:
  - Retrieves metadata for a specific NFT using token ID and contract address
  - Formats IPFS URLs for proper display
  - Normalizes metadata attributes
  - Provides loading, error state, and refetch capabilities

#### `useNFTCollection`
- **Location**: `/src/app/features/nft/hooks/useNFTCollection.ts`
- **Purpose**: Fetches NFTs owned by a specified address from a particular collection
- **Features**:
  - Retrieves all NFTs from a contract owned by an address
  - Falls back to connected wallet if no owner address provided
  - Formats NFT data and IPFS URLs
  - Provides loading, error state, and refetch capabilities

### Wallet & Transaction Hooks

#### `useTransaction`
- **Location**: 
  - `/src/app/features/wallet/hooks/useTransaction.ts`
  - Also accessed via context from `/src/app/providers/TransactionProvider.tsx`
- **Purpose**: Manages blockchain transaction lifecycle and state
- **Features**:
  - Tracks transaction loading, success, and error states
  - Provides helper functions for each stage of transaction lifecycle
  - Integrates with toast notifications for user feedback
  - Formats explorer links for transaction viewing

#### `useWallet`
- **Location**: `/src/app/features/wallet/hooks/useWallet.ts`
- **Purpose**: Provides wallet connection functionality using ThirdWeb v5
- **Features**:
  - Supports multiple wallet providers (MetaMask, WalletConnect, Coinbase, etc.)
  - Manages connection/disconnection process
  - Handles wallet state (connected/disconnected)
  - Provides address formatting and clipboard copy functionality
  - Supports network switching
  - Shows toast notifications for wallet actions

## ThirdWeb Hooks

All these hooks are imported from the `thirdweb/react` library:

#### `useActiveAccount`
- **Purpose**: Gets the currently connected wallet account
- **Used in**: Various wallet-related components and other hooks

#### `useConnect`
- **Purpose**: Handles connecting wallets to the application
- **Used in**: Wallet connection components and `useWallet` custom hook

#### `useDisconnect`
- **Purpose**: Handles disconnecting wallets from the application
- **Used in**: Wallet components and `useWallet` custom hook

#### `useActiveWallet`
- **Purpose**: Retrieves the active wallet instance
- **Used in**: `useWallet` and wallet management components

#### `useActiveWalletChain`
- **Purpose**: Gets current blockchain network information
- **Used in**: Network switching UI, transaction components

#### `useSwitchActiveWalletChain`
- **Purpose**: Switch the connected wallet to a different blockchain
- **Used in**: Network selection UI and `useWallet` hook

#### `useReadContract`
- **Purpose**: Read data from smart contracts (non-state-changing calls)
- **Used in**: NFT and marketplace components

#### `useContractEvents`
- **Purpose**: Subscribe to events emitted from smart contracts
- **Used in**: Transaction monitoring and marketplace updates

## React Built-in Hooks

The project uses the following built-in React hooks throughout the codebase:

- **useState**: State management
- **useEffect**: Side effects and lifecycle management
- **useContext**: Access React context
- **useCallback**: Memoize functions
- **useMemo**: Memoize computed values

## Reference Hooks (Template Code)

These hooks are found in reference template code and might serve as examples but aren't actively used in the main codebase:

- **useMarketplaceContext**: `/reference/thirdweb-marketplace-template/src/hooks/useMarketplaceContext.tsx`
- **useResolveENSAddress**: `/reference/thirdweb-marketplace-template/src/hooks/useResolveENSAddress.ts`
- **useGetENSName**: `/reference/thirdweb-marketplace-template/src/hooks/useGetENSName.ts`
- **useGetENSAvatar**: `/reference/thirdweb-marketplace-template/src/hooks/useGetENSAvatar.ts`

## Index Files

The project has several hook index files that export hooks from their respective domains:

- `/src/app/features/profile/hooks/index.ts`
- `/src/app/features/wallet/hooks/index.ts`
- `/src/app/features/marketplace/hooks/index.ts`
- `/src/app/features/nft/hooks/index.ts`
- `/src/app/components/feedback/hooks/index.ts`

## Notes and Recommendations

1. The `useMarketplaceMint` hook appears in two locations, suggesting an ongoing migration or refactoring. Consider consolidating to avoid confusion.

2. All hooks follow React's composition pattern, leveraging smaller hooks to build more complex functionality.

3. Error handling patterns are consistent across hooks, with appropriate user feedback through toast notifications.

4. The hooks are organized by feature domain, following a domain-driven design approach.

5. ThirdWeb integration is heavily utilized across wallet and NFT functionality.

6. Consider documenting any deprecated hooks to clarify which implementations should be used going forward.