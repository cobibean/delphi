# Delphi Factory Contract Implementation Guide

This guide outlines the implementation of the `DelphiFactory` contract, which will be responsible for deploying and managing NFT collections created through the Delphi platform using HashLips art engine.

## Overview

The factory contract will deploy ThirdWeb Drop contracts for users, which provides the following key features:
- Lazy minting capabilities
- Claim conditions for minting
- Platform fees
- Royalty settings
- Delayed reveal functionality
- Batch minting support

## Contract Structure

### Core Interfaces

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IDelphiFactory {
    event CollectionCreated(
        uint256 indexed collectionId,
        address indexed creator,
        address indexed contractAddress,
        string name,
        string symbol
    );

    event PlatformFeeUpdated(
        uint256 newFee,
        address feeRecipient
    );
}
```

### State Variables

```solidity
struct Collection {
    address contractAddress;      // Address of deployed Drop contract
    address creator;             // Creator/owner of collection
    string name;                 // Collection name
    string symbol;              // Collection symbol
    uint256 maxSupply;          // Maximum supply
    uint256 mintPrice;          // Price per token
    bool isActive;              // Whether minting is active
    uint256 platformFee;        // Platform fee at time of creation
    uint256 createdAt;          // Timestamp of creation
}

mapping(uint256 => Collection) public collections;
uint256 public totalCollections;
uint256 public platformFeeBps;
address public platformFeeRecipient;
address public immutable dropImplementation;
```

### Key Functions

#### Collection Creation

```solidity
struct CreateCollectionParams {
    string name;
    string symbol;
    string contractURI;
    uint256 maxSupply;
    uint256 mintPrice;
    uint256 royaltyBps;
    address royaltyRecipient;
    string baseURI;
    bool delayedReveal;
}

function createCollection(
    CreateCollectionParams calldata params
) external returns (uint256 collectionId) {
    // Validate parameters
    require(bytes(params.name).length > 0, "Invalid name");
    require(bytes(params.symbol).length > 0, "Invalid symbol");
    require(params.maxSupply > 0, "Invalid supply");
    require(params.royaltyBps <= 10000, "Invalid royalty");

    // Deploy new Drop contract using ThirdWeb's implementation
    address newDropContract = deployDropContract(
        params.name,
        params.symbol,
        params.contractURI,
        msg.sender, // Creator as admin
        params.royaltyRecipient,
        params.royaltyBps
    );

    // Store collection info
    collections[totalCollections] = Collection({
        contractAddress: newDropContract,
        creator: msg.sender,
        name: params.name,
        symbol: params.symbol,
        maxSupply: params.maxSupply,
        mintPrice: params.mintPrice,
        isActive: false,
        platformFee: platformFeeBps,
        createdAt: block.timestamp
    });

    emit CollectionCreated(
        totalCollections,
        msg.sender,
        newDropContract,
        params.name,
        params.symbol
    );

    return totalCollections++;
}
```

#### Drop Contract Deployment

```solidity
function deployDropContract(
    string memory name,
    string memory symbol,
    string memory contractURI,
    address admin,
    address royaltyRecipient,
    uint256 royaltyBps
) internal returns (address) {
    // Deploy using minimal proxy pattern (EIP-1167)
    address dropContract = deployMinimalProxy(dropImplementation);
    
    // Initialize the Drop contract
    IDrop(dropContract).initialize(
        admin,                    // Default admin
        name,                     // Collection name
        symbol,                   // Collection symbol
        contractURI,             // Contract URI
        new address[](0),        // Trusted forwarders
        admin,                   // Primary sale recipient
        royaltyRecipient,       // Royalty recipient
        uint128(royaltyBps),    // Royalty BPS
        uint128(platformFeeBps), // Platform fee BPS
        platformFeeRecipient     // Platform fee recipient
    );

    return dropContract;
}
```

#### Collection Management

```solidity
function setMintingStatus(uint256 collectionId, bool isActive) external {
    require(msg.sender == collections[collectionId].creator, "Not creator");
    collections[collectionId].isActive = isActive;
}

function updateMintPrice(uint256 collectionId, uint256 newPrice) external {
    require(msg.sender == collections[collectionId].creator, "Not creator");
    collections[collectionId].mintPrice = newPrice;
}

function withdrawPlatformFees() external {
    require(msg.sender == platformFeeRecipient, "Not fee recipient");
    // Implement fee withdrawal logic
}
```

### Platform Fee Management

```solidity
function setPlatformFee(uint256 newFeeBps, address newRecipient) external onlyOwner {
    require(newFeeBps <= 10000, "Invalid BPS");
    require(newRecipient != address(0), "Invalid recipient");
    
    platformFeeBps = newFeeBps;
    platformFeeRecipient = newRecipient;
    
    emit PlatformFeeUpdated(newFeeBps, newRecipient);
}
```

## Integration with HashLips

The factory contract works with HashLips-generated art by:

1. Accepting the generated metadata and images through IPFS
2. Using the IPFS CID as the baseURI for the Drop contract
3. Supporting lazy minting for efficient deployment

```solidity
function setCollectionURI(
    uint256 collectionId,
    string calldata baseURI,
    uint256 amount
) external {
    require(msg.sender == collections[collectionId].creator, "Not creator");
    
    // Get Drop contract instance
    IDrop drop = IDrop(collections[collectionId].contractAddress);
    
    // Lazy mint the collection
    drop.lazyMint(
        amount,
        baseURI,
        "0x" // No encrypted base URI
    );
}
```

## Security Considerations

1. **Access Control**
   - Implement OpenZeppelin's `Ownable` and `AccessControl`
   - Proper validation of admin functions
   - Creator-only collection management

2. **Fee Management**
   - Safe fee calculations
   - Protected fee withdrawal
   - Maximum fee caps

3. **Contract Upgradability**
   - Consider using proxy pattern for future upgrades
   - Proper initialization of Drop contracts
   - Version tracking

4. **Emergency Functions**
   - Pause mechanism for critical functions
   - Emergency withdrawal capabilities
   - Contract recovery options

## Testing Strategy

1. **Unit Tests**
   ```javascript
   describe("DelphiFactory", function() {
       it("Should deploy new collection", async function() {
           const params = {
               name: "Test Collection",
               symbol: "TEST",
               maxSupply: 1000,
               mintPrice: ethers.utils.parseEther("0.1"),
               royaltyBps: 500,
               // ... other params
           };
           
           await factory.createCollection(params);
           const collection = await factory.collections(0);
           
           expect(collection.name).to.equal(params.name);
           expect(collection.symbol).to.equal(params.symbol);
       });
   });
   ```

2. **Integration Tests**
   - Test with actual HashLips output
   - Verify minting functionality
   - Test fee distribution
   - Verify royalty payments

## Deployment Process

1. Deploy implementation contracts:
   ```bash
   npx hardhat deploy --tags DropImplementation
   npx hardhat deploy --tags DelphiFactory
   ```

2. Initialize factory:
   ```javascript
   await factory.initialize(
       owner.address,
       dropImplementation.address,
       platformFeeRecipient.address,
       500 // 5% platform fee
   );
   ```

3. Verify contracts:
   ```bash
   npx hardhat verify --network metis \
       --contract contracts/DelphiFactory.sol:DelphiFactory \
       <FACTORY_ADDRESS> <CONSTRUCTOR_ARGS>
   ```

## Usage Example

```solidity
// Create new collection
const tx = await delphiFactory.createCollection({
    name: "My NFT Collection",
    symbol: "MNFT",
    maxSupply: 1000,
    mintPrice: ethers.utils.parseEther("0.1"),
    royaltyBps: 500,
    royaltyRecipient: creator.address,
    baseURI: "ipfs://Qm...",
    delayedReveal: false
});

// Get collection details
const collectionId = await tx.wait();
const collection = await delphiFactory.collections(collectionId);

// Set up minting conditions
const dropContract = await ethers.getContractAt("IDrop", collection.contractAddress);
await dropContract.setClaimConditions([{
    startTime: Math.floor(Date.now() / 1000),
    maxClaimableSupply: 1000,
    quantityLimitPerWallet: 5,
    pricePerToken: ethers.utils.parseEther("0.1"),
    currency: ethers.constants.AddressZero // ETH
}], false);
``` 