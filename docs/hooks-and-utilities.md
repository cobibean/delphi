# Delphi Hooks and Utilities Reference

This document provides a reference of all hooks, services, utilities, and helper functions available in the Delphi codebase.

## Hooks

### NFT Hooks

#### `useMintNFT`
- **File**: `src/app/features/nft/hooks/useMintNFT.ts`
- **Description**: Hook for minting NFTs from a collection
- **Parameters**: `contractAddress` - NFT contract address
- **Returns**: Object containing `mint` function and `isMinting` status
- **Usage**: Used to mint NFTs from a specific collection contract

#### `useNFTCollection`
- **File**: `src/app/features/nft/hooks/useNFTCollection.ts`
- **Description**: Hook for interacting with NFT collection data
- **Usage**: Used to fetch and interact with NFT collection details

#### `useNFTMetadata`
- **File**: `src/app/features/nft/hooks/useNFTMetadata.ts`
- **Description**: Hook for fetching and managing NFT metadata
- **Usage**: Used to fetch and display NFT metadata information

### Profile Hooks

#### `useUserListings`
- **File**: `src/app/features/profile/hooks/useUserListings.ts`
- **Description**: Hook for fetching user's marketplace listings
- **Usage**: Used in profile views to display user's listed NFTs

#### `useUserNFTs`
- **File**: `src/app/features/profile/hooks/useUserNFTs.ts`
- **Description**: Hook for fetching NFTs owned by a user
- **Usage**: Used in profile views to display NFTs owned by a user

## Services

### NFT Services

#### `getNFTMetadata`
- **File**: `src/app/features/nft/services/nft-services.ts`
- **Description**: Gets NFT metadata and ownership information
- **Parameters**: `contractAddress` (NFT contract address), `tokenId` (Token ID)
- **Returns**: NFT metadata including owner and collection info

#### `isOwnerOf`
- **File**: `src/app/features/nft/services/nft-services.ts`
- **Description**: Checks if an address owns a specific NFT
- **Parameters**: `contractAddress`, `tokenId`, `address`
- **Returns**: Boolean indicating if the address owns the NFT

#### `getOwnership`
- **File**: `src/app/features/nft/services/nft-services.ts`
- **Description**: Gets ownership information for an NFT
- **Parameters**: `contractAddress`, `tokenId`
- **Returns**: Ownership information

### Marketplace Services

#### Listings Services
- **File**: `src/app/features/marketplace/services/listings.ts`
- **Description**: Services for managing marketplace listings

#### Marketplace Utils
- **File**: `src/app/features/marketplace/services/utils.ts`
- **Description**: Utility functions for marketplace operations

#### Prepare Transactions
- **File**: `src/app/features/marketplace/services/prepareTransactions.ts`
- **Description**: Functions to prepare marketplace transactions

## Providers

#### `WalletProvider`
- **File**: `src/app/providers/WalletProvider.tsx`
- **Description**: Provider for wallet connection and state management
- **Usage**: Wraps the application to provide wallet context

#### `TransactionProvider`
- **File**: `src/app/providers/TransactionProvider.tsx`
- **Description**: Provider for transaction management and notifications
- **Usage**: Handles transaction state, history, and user notifications

## Utilities

#### `formatIPFSUrl`
- **File**: `src/app/utils/format.ts`
- **Description**: Formats IPFS URLs to use proper gateway URLs
- **Usage**: Used to display IPFS-hosted content correctly

#### `cn`
- **File**: `src/app/lib/utils.ts`
- **Description**: Utility for conditionally joining CSS class names
- **Usage**: Combines Tailwind classes with conditional logic

#### `fetchNFTMetadata`
- **File**: `src/app/utils/fetchNFTMetadata.ts`
- **Description**: Fetches NFT metadata from tokenURI
- **Usage**: Used to get NFT metadata for display

#### `fetchTokenURI`
- **File**: `src/app/utils/fetchTokenURI.ts`
- **Description**: Fetches token URI for an NFT
- **Usage**: Used to get the URI that holds NFT metadata

#### `fetchCollectionName`
- **File**: `src/app/utils/fetchCollectionName.ts`
- **Description**: Fetches the name of an NFT collection
- **Usage**: Used to display collection names in the UI

## Configuration

#### `metisChain`
- **File**: `src/app/config/chain.ts`
- **Description**: Configuration for Metis Andromeda chain with ID 59902
- **Usage**: Used for contract interactions on the Metis blockchain

#### Contract Constants
- **File**: `src/app/constants/contracts.ts`
- **Description**: Contains contract addresses for marketplace and tokens
- **Usage**: Used throughout the application to reference deployed contracts

## Interfaces

#### `IDirectListingRaw`
- **File**: `src/app/interfaces/interfaces.ts`
- **Description**: Raw listing struct returned by the Marketplace contract

#### `IDirectListing`
- **File**: `src/app/interfaces/interfaces.ts`
- **Description**: Parsed version of the listing with more convenient types

#### `INFTAttribute`
- **File**: `src/app/interfaces/interfaces.ts`
- **Description**: NFT attribute for trait-based metadata

#### `INFTMetadata`
- **File**: `src/app/interfaces/interfaces.ts`
- **Description**: NFT metadata fetched from the tokenURI

#### `IListingWithNFT`
- **File**: `src/app/interfaces/interfaces.ts`
- **Description**: Combined listing + NFT metadata 