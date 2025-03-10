# Sunday March 9 Thirdweb v5 Migration and Upgrades

## Overview

This document outlines our comprehensive plan to build an NFT Marketplace using Thirdweb V5 SDK exclusively, eliminating any dependency on ethers.js. The plan is structured into several key tasks to ensure systematic and maintainable progress.

## Documentation Analysis Summary

The Thirdweb V5 SDK documentation is organized into four key categories:

### 1. Advanced Topics
- Smart contract deployment and interaction
- Permission management
- Contract upgrades and extensions
- Modular contract architecture

### 2. Core Functions
- Wallet operations
- Chain utilities
- Transaction handling
- Data encoding/decoding
- Address and format utilities
- Token transfers and operations

### 3. React Hooks
- Wallet connection (useConnect, useActiveWallet)
- Contract interaction (useReadContract, useSendTransaction)
- Transaction state management (useWaitForReceipt)
- Chain/network management (useActiveWalletChain)
- UI integration hooks (useConnectModal, useWalletDetailsModal)

### 4. UI Components
- Pre-built UI elements for wallets, tokens, and NFTs
- Authentication components
- Transaction utilities
- IPFS/storage utilities
- Crypto payment components

## Migration Tasks

We'll break down this implementation into 5 distinct tasks:

### Task 1: Environment Setup and Reference Repository

**Objective:** Set up the development environment and clone the reference marketplace for analysis.

**Steps:**
1. Clone the official Thirdweb marketplace template for reference
2. Analyze the template structure and components
3. Create a project structure that emphasizes Thirdweb V5 integration
4. Document ethers.js usage in the reference template
5. Create a mapping document for ethers.js to Thirdweb V5 conversions

**Deliverables:**
- Reference repository cloned and analyzed
- Project structure template
- Ethers.js usage inventory
- Conversion mapping document

### Task 2: Core Wallet Integration

**Objective:** Implement wallet connection and management using Thirdweb V5 SDK.

**Steps:**
1. Set up ThirdwebProvider with appropriate configuration
2. Implement wallet connection using useConnect hook
3. Create wallet status and information components
4. Implement chain switching functionality
5. Create a wallet context for global state management

**Deliverables:**
- Functional wallet connection UI
- Chain switching capability
- Wallet information display
- Complete removal of any ethers.js wallet code

**Code Pattern Example:**
```tsx
// Thirdweb V5 Wallet Connection
import { useConnect, useActiveWallet, useDisconnect } from "thirdweb/react";

// Component
function WalletConnection() {
  const { connect } = useConnect();
  const wallet = useActiveWallet();
  const { disconnect } = useDisconnect();
  
  if (wallet) {
    return (
      <div>
        <p>Connected: {wallet.address}</p>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }
  
  return <button onClick={() => connect()}>Connect Wallet</button>;
}
```

### Task 3: NFT Collection Display and Interaction

**Objective:** Implement NFT collection browsing and individual NFT viewing.

**Steps:**
1. Create NFT collection browser using Thirdweb hooks
2. Implement individual NFT detail view
3. Add NFT media display using Thirdweb UI components
4. Implement NFT metadata retrieval and display
5. Create NFT ownership verification functionality

**Deliverables:**
- NFT collection browser component
- NFT detail view component
- Media display integration
- Metadata display components

**Code Pattern Example:**
```tsx
// NFT Collection Display
import { useReadContract } from "thirdweb/react";
import { NFTMedia, NFTName } from "thirdweb/react";

function NFTCollection({ contractAddress }) {
  const { data: nfts, isLoading } = useReadContract({
    contract: contractAddress,
    method: "getNFTs", 
    params: []
  });
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div className="nft-grid">
      {nfts.map(nft => (
        <div key={nft.id} className="nft-item">
          <NFTMedia metadata={nft.metadata} />
          <NFTName metadata={nft.metadata} />
        </div>
      ))}
    </div>
  );
}
```

### Task 4: Marketplace Contract Integration

**Objective:** Implement marketplace contract interaction for listing, buying, and selling NFTs.

**Steps:**
1. Configure marketplace contract addresses
2. Implement listing creation functionality
3. Create listing browser and filtering
4. Implement buy/sell transaction logic
5. Add auction support (if applicable)
6. Integrate price and fee calculations

**Deliverables:**
- Marketplace contract configuration
- Listing creation component
- Listing browser component
- Transaction execution components
- Fee and price calculation utilities

**Code Pattern Example:**
```tsx
// Creating a Listing
import { useSendTransaction } from "thirdweb/react";
import { useState } from "react";

function CreateListing({ marketplaceAddress, nftContract, tokenId }) {
  const [price, setPrice] = useState("");
  
  const { mutate: createListing, isLoading } = useSendTransaction({
    contract: marketplaceAddress,
    method: "createListing",
    params: [
      {
        assetContract: nftContract,
        tokenId: tokenId,
        startTime: Math.floor(Date.now() / 1000),
        listingDurationInSeconds: 86400 * 7, // 7 days
        quantity: 1,
        currencyToAccept: "0x0000000000000000000000000000000000000000", // ETH
        buyoutPricePerToken: price
      }
    ]
  });
  
  return (
    <div>
      <input 
        type="text" 
        value={price} 
        onChange={(e) => setPrice(e.target.value)} 
        placeholder="Price in ETH"
      />
      <button 
        onClick={() => createListing()} 
        disabled={isLoading}
      >
        {isLoading ? "Creating..." : "Create Listing"}
      </button>
    </div>
  );
}
```

### Task 5: Transaction Management and User Experience

**Objective:** Implement transaction tracking, notifications, and user experience improvements.

**Steps:**
1. Create transaction status tracking system
2. Implement transaction history view
3. Add notification system for transaction events
4. Create loading and error states for all transactions
5. Implement transaction receipt viewing
6. Add gas estimation and optimization

**Deliverables:**
- Transaction tracking components
- Transaction history viewer
- Notification system
- Loading and error state components
- Gas estimation utilities

**Code Pattern Example:**
```tsx
// Transaction Status Tracking
import { useWaitForReceipt } from "thirdweb/react";
import { useToast } from "your-ui-library";

function TransactionStatus({ txHash }) {
  const toast = useToast();
  const { data: receipt, isLoading, error } = useWaitForReceipt(txHash);
  
  useEffect(() => {
    if (receipt) {
      toast({
        title: "Transaction Confirmed",
        description: `Transaction confirmed in block ${receipt.blockNumber}`,
        status: "success"
      });
    }
    if (error) {
      toast({
        title: "Transaction Failed",
        description: error.message,
        status: "error"
      });
    }
  }, [receipt, error]);
  
  if (isLoading) {
    return <div>Processing transaction...</div>;
  }
  
  if (receipt) {
    return (
      <div>
        <p>Transaction confirmed!</p>
        <p>Block: {receipt.blockNumber}</p>
        <p>Gas used: {receipt.gasUsed.toString()}</p>
      </div>
    );
  }
  
  return null;
}
```

## Key Principles Throughout All Tasks

1. **Documentation-First Approach**
   - Reference Thirdweb documentation before implementing features
   - Add documentation references in comments
   - Create feature-specific quick reference guides

2. **Zero Ethers.js Dependency**
   - Systematically replace all ethers.js patterns
   - Use Thirdweb hooks for all blockchain interactions
   - Leverage Thirdweb UI components where possible

3. **Testing at Each Stage**
   - Test each component after implementation
   - Verify no ethers dependencies exist
   - Test across multiple chains if applicable

## Timeline

- **Task 1:** Day 1
- **Task 2:** Day 2-3
- **Task 3:** Day 4-5
- **Task 4:** Day 6-8
- **Task 5:** Day 9-10

## Reference Material

- Thirdweb TypeScript Documentation (see /thirdweb_typescript_docs)
- Thirdweb Marketplace Template (https://github.com/thirdweb-example/marketplace-template)

## Ethers.js to Thirdweb V5 Common Replacements

| Ethers.js Pattern | Thirdweb V5 Replacement |
|-------------------|--------------------------|
| `new ethers.providers.JsonRpcProvider()` | Use `useActiveWallet()` or Core Functions |
| `ethers.Contract.connect()` | Use `useReadContract` and `useSendTransaction` hooks |
| `ethers.utils.formatEther()` | Use `toEther()` Core Function |
| `ethers.utils.parseEther()` | Use `toWei()` Core Function |
| `ethers.utils.formatUnits()` | Use `toTokens()` Core Function |
| `ethers.utils.parseUnits()` | Use `toUnits()` Core Function |
| `ethers.utils.getAddress()` | Use `getAddress()` Core Function |
| `ethers.BigNumber` | Use native `bigint` |
| Direct event listeners | Use `useContractEvents()` hook |
| `ethers.utils.keccak256()` | Use `keccak256()` Core Function |
| `ethers.utils.defaultAbiCoder` | Use `encodeAbiParameters()` and `decodeAbiParameters()` | 