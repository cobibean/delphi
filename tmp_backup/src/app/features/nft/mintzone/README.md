# NFT Mintzone Implementation

This implementation provides a seamless NFT minting experience integrated with the ThirdWeb SDK. It allows users to mint NFTs from a collection.

## Components

### MintCard.tsx

The main component for displaying and interacting with an NFT collection. Features include:

- Display of collection details (name, description, image)
- NFT price information (with METIS as default currency)
- Quantity selection for minting multiple NFTs
- Option to mint to a custom address
- Compatibility with ERC721 and ERC1155 tokens

### QuantitySelector.tsx

A reusable component for selecting the quantity of NFTs to mint.

### HomepageMintCard.tsx

A client-side component designed for the homepage that loads NFT contract data dynamically. This component can be placed anywhere in your application (especially the homepage) to provide minting functionality for a specific contract.

## Installation

No additional installation is required as this implementation uses the existing ThirdWeb SDK already installed in the project.

## Usage

### In the Mintzone Page

```tsx
import { MintCard } from "./components";

// Use the server component to fetch NFT data
const nftInfo = await fetchNFTInfo();

<MintCard
  contract={nftInfo.contract}
  displayName={nftInfo.displayName}
  description={nftInfo.description}
  contractImage={nftInfo.contractImage}
  pricePerToken={nftInfo.pricePerToken}
  currencySymbol={nftInfo.currencySymbol}
  isERC1155={nftInfo.isERC1155}
  isERC721={nftInfo.isERC721}
  tokenId={nftInfo.tokenId}
/>
```

### On the Homepage

```tsx
import { HomepageMintCard } from "@/app/features/nft/mintzone/components";

// Just provide the contract address
<HomepageMintCard 
  contractAddress="0x03b802294bD29F9feCedc441656B2a5d95b457f1" 
  className="max-w-md mx-auto"
/>
```

### Component Export

The components are exposed through an index.ts file:

```tsx
// Import directly from the components directory
import { MintCard, QuantitySelector, HomepageMintCard } from "@/app/features/nft/mintzone/components";
```

## Running on Metis Sepolia Testnet

This implementation is configured to run on the Metis Sepolia testnet (Chain ID: 59902) but can be easily switched to mainnet by updating the chain configuration in the chain.ts file.

## Testing

To test the implementation, use the following NFT contract addresses:

```
// ERC721 Example
0x03b802294bD29F9feCedc441656B2a5d95b457f1

// ERC1155 Example - Make sure to verify the tokenId parameter
0x656b65339B2CCd5908B51b993D38d46e3283dB7c
```

## Future Enhancements

Planned future enhancements include:
- Integration with Delphi's "Cosmic Overload" design system
- Enhanced error handling and user feedback
- Transaction tracking and post-mint redirection
- Toast notifications for transaction updates 