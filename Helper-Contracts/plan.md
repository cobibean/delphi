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

#### 2.1 Contract Interface

Implement a contract interface layer in `src/app/features/create/services/nftFactoryService.ts` with:
- `deployERC721Drop(params)` - For deploying ERC721 collections
- `deployERC1155Drop(params)` - For deploying ERC1155 collections
- `getDeployedCollections(address)` - To retrieve user's contracts
- `getFactoryFee()` - To get current deployment fee

#### 2.2 NFT Management Interface

Implement `src/app/features/create/services/nftManagementService.ts` with functions:
- `lazyMintNFT(contractAddress, nftMetadata)` - For NFT creation
- `setClaimConditions(contractAddress, tokenId, conditions)` - For sales configuration
- `getContractMetadata(contractAddress)` - To retrieve collection data

### 3. React Components & Hooks

#### 3.1 Main Components Structure

Create the main page at `src/app/create/nft-collection/page.tsx` that will:
- Use client-side rendering with the 'use client' directive
- Offer options for ERC721 or ERC1155 deployment
- Import the CreateCollectionStepper component

#### 3.2 Context Provider

Implement `src/app/features/create/providers/CreateCollectionProvider.tsx` to manage:
- Collection parameters (name, symbol, royalties, etc.)
- Contract type selection (ERC721 vs ERC1155)
- Deployment status tracking
- Error handling

#### 3.3 Stepper Component

Implement `src/app/features/create/components/CreateCollectionStepper.tsx` with:
- Steps for collection details, royalties, deployment, and confirmation
- Navigation between steps
- Form validation
- Transaction status indicators

#### 3.4 My Collections Page

Create `src/app/dashboard/collections/page.tsx` to:
- Display user's deployed collections 
- Provide interface to manage each collection
- Allow for lazy minting NFTs to existing collections

### 4. Integration Points

#### 4.1 Update Create Page

Modify `src/app/create/page.tsx` to:
- Add options for ERC721 and ERC1155 collection creation
- Link to the new collection creation flows
- Provide information about costs and features

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

## Conclusion

This implementation plan provides a comprehensive approach to building a custom NFT Factory solution for the Delphi marketplace. By leveraging ThirdWeb's contract code directly instead of their SDK, we gain more control over the deployment process while reducing dependency on third-party services.

The approach maintains compatibility with the existing marketplace infrastructure while adding powerful new features for creators. The modular design and comprehensive testing strategy will ensure a reliable and maintainable solution.
