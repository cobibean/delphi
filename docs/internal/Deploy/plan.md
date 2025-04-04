# Delphi NFT Creation Implementation Plan (Custom NFT Factory Approach)

## Overview

This plan outlines the implementation of NFT creation functionality for the Delphi marketplace using a custom NFT Factory contract. Due to limitations with the ThirdWeb free account, we're moving to a self-hosted solution that will deploy ThirdWeb-compatible contracts directly from our own factory.

## Current Environment Assessment

- **Existing Integration**: The project was initially set up to use ThirdWeb SDK v5.91.0.
- **Chain Configuration**: Currently set up for Metis Andromeda (chain ID 59902) in `/src/app/config/chain.ts`.
- **Marketplace Structure**: Well-organized with services, components, and hooks in the `/src/app/features/marketplace/` directory.
- **Create Page**: A placeholder page exists at `/src/app/create/page.tsx` with "coming soon" messaging.

## Implementation Goals

1. **Custom Contract Factory**: Build and deploy a contract factory that creates ERC721Drop and ERC1155Drop contracts.
2. **On-Chain Fee Collection**: Implement fee collection directly in the factory contract.
3. **Self-Sovereign NFT Creation**: Allow users to deploy their own Drop contracts and manage them.
4. **User Experience**: Create an intuitive flow for contract deployment, NFT minting, and claiming.
5. **Future-Proofing**: Build with extensibility in mind for advanced features.

## Implementation Plan

### 1. Contract Development (Foundry)

COMPLETED ✅

#### 1.1 Project Setup

Set up a Foundry project with:
- Project structure for contracts, tests, and scripts
- Import ThirdWeb ERC721Drop and ERC1155Drop contracts and dependencies
- Configure Foundry for proper testing environment

#### 1.2 NFT Factory Contract

Implement a Solidity contract (`contracts/NFTFactory.sol`) with:

- Functions to deploy ERC721Drop and ERC1155Drop contracts
- Fee collection mechanism built into deployment functions
- Storage of deployed contracts mapped to creators
- Owner-only functions for fee management
- Events for contract deployment tracking
- Basic access control with OpenZeppelin's Ownable

#### 1.3 Testing Suite

Create comprehensive tests in Foundry:
- Unit tests for all factory functions
- Integration tests for deployment and interaction
- Fuzz tests for input validation
- Gas optimization measurements

#### 1.4 Deployment Scripts

Create deploy scripts for:
- Local testing deployment
- Testnet deployment
- Mainnet deployment
- Contract verification

### 2. Frontend Integration

COMPLETED ✅

#### 2.1 Contract Interface

Implemented a contract interface layer in `src/app/features/nft/services/nftFactoryService.ts` with:
- `deployERC721Drop(params)` - For deploying ERC721 collections
- `deployERC1155Drop(params)` - For deploying ERC1155 collections
- `getDeployedCollections(address)` - To retrieve user's contracts
- `getFactoryFee()` - To get current deployment fee
- `getFormattedFactoryFee()` - To get formatted fee for UI display
- `getCollectionType(address)` - To determine if a collection is ERC721 or ERC1155

Also updated `src/app/constants/contracts.ts` to include:
- `NFT_FACTORY_ADDRESS` for the deployed factory contract

#### 2.2 NFT Management Interface

Implemented `src/app/features/nft/services/nftManagementService.ts` with functions:
- `lazyMintNFT(contractAddress, metadataWithSupply)` - For NFT creation
- `setClaimConditions(contractAddress, tokenId, conditions)` - For sales configuration
- `getContractMetadata(contractAddress)` - To retrieve collection data
- `getTotalSupply(contractAddress, tokenId)` - To get token supply
- `getClaimConditions(contractAddress, tokenId)` - To get active claim conditions

Created documentation for all hooks, utilities, and services in `docs/hooks-and-utilities.md`.

### 3. React Components & Hooks

COMPLETED ✅

#### 3.1 Main Components Structure

- Created the token standard selection page
- Created the metadata setup pages for both ERC721 and ERC1155
- Implemented `useNFTFactory` hook to connect UI with contract interface
- Hook provides:
  - `deployERC721Collection` - To deploy ERC721 contracts
  - `deployERC1155Collection` - To deploy ERC1155 contracts
  - `fetchDeploymentFee` - To display fee information to users
  - State tracking for deployment process

#### 3.2 Context Provider

Implemented `src/app/features/nft/providers/CreateCollectionProvider.tsx` to manage:
- Collection parameters (name, symbol, royalties, etc.)
- Contract type selection (ERC721 vs ERC1155)
- Deployment status tracking
- Error handling
- Utility methods for form validation and metadata updates

#### 3.3 Stepper Component

Implemented `src/app/features/nft/components/CreateCollectionStepper.tsx` with:
- Type selection step with detailed information on ERC721 vs ERC1155
- Metadata step for collection details, cover image, royalties configuration
- Confirmation step showing collection preview and deployment fee
- Deployment step with transaction status tracking
- Success step with navigation to collection management
- Form validation and error handling

#### 3.4 My Collections Page

Created `src/app/dashboard/collections/page.tsx` to:
- Display a list of user's deployed collections 
- Show collection type, metadata, and stats
- Provide navigation to collection management
- Handle empty states and loading states

Still needed:
- Complete integration with the Collection detail page
- Add lazy minting functionality 
- Fix type conversion issues with wallet addresses

### 4. Integration Points

PARTIALLY COMPLETED ✅

#### 4.1 Update Create Page

Modified `src/app/features/nft/create/page.tsx` to:
- Implement the main collection creation flow
- Use the CreateCollectionStepper component for NFT collection creation
- Create a reusable NFTPageLayout component for consistent UI

Still needed:
- Link to the collection management dashboard
- User onboarding and help content

#### 4.2 Constants File Update

Update `src/app/constants/contracts.ts` to include:
- `NFT_FACTORY_ADDRESS` for the deployed factory contract

### 5. Testing & Deployment Plan

#### 5.1 Contract Testing (Day 1 - Tonight)
- Complete Foundry test suite development
- Test on local Anvil chain
- Deploy to Metis Sepolia testnet
- Verify functionality with manual interactions

#### 5.2 Frontend Development (Day 2 - Tomorrow)
- Develop UI components and hooks
- Connect to testnet deployment
- Test complete user flow
- Refine UX based on testing

#### 5.3 Production Deployment
- Deploy factory contract to Metis Andromeda
- Update constants with mainnet addresses
- Complete final testing
- Launch feature

### 6. Future Enhancements

1. **Advanced Collection Features**:
   - Add support for delayed reveals
   - Implement more complex claim conditions
   - Support for signature-based minting

2. **Collection Management**:
   - Enhanced dashboard for managing collections
   - Analytics for sales and activity
   - Batch operations for NFTs

3. **Integration with Marketplace**:
   - Automated listing of new collections
   - Special features for factory-created collections
   - Creator verification and badges

## 7. Metadata Storage with Pinata IPFS

### 7.1 Authentication & Setup

```javascript
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK({ 
    pinataApiKey: process.env.PINATA_API_KEY, 
    pinataSecretApiKey: process.env.PINATA_SECRET 
});
```

### 7.2 Metadata Workflow

#### 7.2.1 Image Upload

```javascript
const uploadImageToPinata = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const options = {
    pinataMetadata: {
      name: `${collectionName}-image-${Date.now()}`
    }
  };
  
  const res = await pinata.pinFileToIPFS(formData, options);
  return `ipfs://${res.IpfsHash}`;
};
```

#### 7.2.2 Metadata Creation & Upload

```javascript
const uploadMetadataToPinata = async (name, description, imageUrl) => {
  const metadata = {
    name,
    description,
    image: imageUrl,
    attributes: []
  };
  
  const options = {
    pinataMetadata: {
      name: `${name}-metadata-${Date.now()}`
    }
  };
  
  const res = await pinata.pinJSONToIPFS(metadata, options);
  return `ipfs://${res.IpfsHash}`;
};
```

#### 7.2.3 Collection Batch Upload

```javascript
const uploadCollectionToPinata = async (items) => {
  const metadataArray = [];
  
  for (const item of items) {
    const imageUrl = await uploadImageToPinata(item.file);
    const metadata = {
      name: item.name,
      description: item.description,
      image: imageUrl,
      attributes: item.attributes
    };
    metadataArray.push(metadata);
  }
  
  // Create folder structure
  const res = await pinata.pinJSONToIPFS(metadataArray);
  return `ipfs://${res.IpfsHash}`;
};
```

### 7.3 IPFS Gateway Configuration

```javascript
const IPFS_GATEWAY = process.env.NEXT_PUBLIC_IPFS_GATEWAY || 'https://delphigateway.mypinata.cloud/ipfs/';

// Convert IPFS URL to HTTP URL
const ipfsToHttp = (ipfsUrl) => {
  if (!ipfsUrl) return '';
  const ipfsHash = ipfsUrl.replace('ipfs://', '');
  return `${IPFS_GATEWAY}${ipfsHash}`;
};
```

### 7.4 Integration with Factory Contract

The IPFS metadata URIs will be passed to the NFT contract during or after deployment:

1. User uploads collection image and metadata to Pinata
2. The resulting IPFS hash is stored in the contract metadata
3. For individual NFTs, the IPFS URI is used during the lazy minting process

### 7.5 Fee Structure Integration

Integrating with the existing fee structure:

```javascript
export const BASE_FEE_METIS = 0.01; // Flat fee in METIS
export const FEE_PER_IMAGE_METIS = 0.005; // Fee per image

export function calculateFee(numImages: number): number {
  return BASE_FEE_METIS + numImages * FEE_PER_IMAGE_METIS;
}
```

This approach aligns with our factory implementation where fees are handled directly by the contract.

### 7.6 Implementation Recommendations

1. Implement a `src/app/features/create/services/ipfsService.ts` module for Pinata integration
2. Add proper error handling with retry mechanisms for IPFS uploads
3. Implement upload progress indicators in the UI
4. Cache IPFS responses to prevent unnecessary duplicate uploads
5. Use the factory address from constants for fee calculations

## Conclusion

This implementation plan provides a comprehensive approach to building a custom NFT Factory solution for the Delphi marketplace. By leveraging ThirdWeb's contract code directly instead of their SDK, we gain more control over the deployment process while reducing dependency on third-party services.

The approach maintains compatibility with the existing marketplace infrastructure while adding powerful new features for creators. The modular design and comprehensive testing strategy will ensure a reliable and maintainable solution.
