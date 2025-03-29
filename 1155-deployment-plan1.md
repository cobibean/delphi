# Delphi NFT Creation & Deployment Implementation Plan

## Overview

Delphi is an NFT marketplace built with Next.js 14, React 18, TypeScript 5, TailwindCSS 3, and Framer Motion. The app is integrated with Thirdweb SDK v5 (installed via the `"thirdweb": "^5.91.0"` package) to handle blockchain interactions on the Metis network (currently deployed on Metis Sepolia testnet, with plans to deploy on Metis Andromeda mainnet). Users can deploy their own ERC‑1155 (Edition Drop) contracts, mint NFTs from an image file, and have NFTs automatically claimed to their wallet. The plan also includes an on‑chain fee collection mechanism on Metis (flat rate + per image fee), with a future roadmap to allow advanced claim phase controls (Option 2) later.

## Goals

1. **On‑Chain Fee Collection:**  
   - Users pay an on‑chain fee (in METIS) before deploying and minting NFTs.
   - Fee structure is defined as a flat fee plus a fee per image.
   - Later, on mainnet, Thirdweb's pay modal can enable fiat payments.

2. **NFT Contract Deployment (ERC‑1155 Edition Drop):**  
   - Each user deploys their own Edition Drop contract using the Thirdweb v5 SDK.
   - Deployment is done using the user's connected wallet, ensuring they own the contract.

3. **NFT Minting:**  
   - Use lazy minting to upload NFT metadata (image, name, description) to IPFS via Thirdweb's built‑in storage.
   - Automatically claim (mint) the defined NFT quantity to the creator's wallet immediately (Option 1).
   - Future-proof the code to allow switching to configurable claim phases (Option 2) later.

4. **Integration & Modularity:**  
   - Provide helper files (e.g. `fees.ts`) for fee parameters.
   - Use modular React components so that later enhancements (e.g. claim phase UI) can be integrated easily.

5. **Helper Contract Deployment (Fee Collection):**  
   - Deploy a minimal fee collection contract via Thirdweb CLI to handle on‑chain fee payments.
   - Integrate fee verification into the deployment flow.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Setup & Thirdweb Configuration](#project-setup--thirdweb-configuration)
3. [Fee Collection Implementation](#fee-collection-implementation)
   - [Helper File: fees.ts](#helper-file-feests)
   - [Fee Collection Smart Contract](#fee-collection-smart-contract)
   - [Deploying the Fee Contract via Thirdweb CLI](#deploying-the-fee-contract-via-thirdweb-cli)
4. [NFT Deployment & Minting Flow](#nft-deployment--minting-flow)
   - [Deploying an Edition Drop Contract](#deploying-an-edition-drop-contract)
   - [Lazy Minting & Auto-Claiming NFTs](#lazy-minting--auto-claiming-nfts)
5. [Future-Proofing for Claim Phases](#future-proofing-for-claim-phases)
6. [Integration with the Frontend (React Components)](#integration-with-the-frontend-react-components)
7. [Testing & Deployment](#testing--deployment)
8. [Next Steps & Future Enhancements](#next-steps--future-enhancements)

## Prerequisites

- **Environment:**  
  Node.js, npm/yarn  
- **Dependencies:**  
  - Next.js 14, React 18, TypeScript 5  
  - TailwindCSS 3, Framer Motion  
  - Thirdweb SDK v5 (`thirdweb@^5.91.0`)
  - ethers, viem, etc.
- **Network:**  
  Metis Sepolia (testnet) for now; plan to use Metis Andromeda (mainnet) later.
- **Thirdweb CLI:**  
  Install via `npm install -g thirdweb-cli`

## Project Setup & Thirdweb Configuration

1. **Thirdweb Provider:**  
   Ensure your `_app.tsx` or root layout initializes Thirdweb using `createThirdwebClient()`.

   ```tsx
   // _app.tsx or root layout file
   import { ThirdwebProvider } from "thirdweb/react";
   import { createThirdwebClient } from "thirdweb";
   import { Sepolia, Andromeda } from "thirdweb/chains";

   // Create the Thirdweb client with your clientId and supported chains
   export const client = createThirdwebClient({
     clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
     chains: [Sepolia, Andromeda],
   });

   export default function App({ Component, pageProps }) {
     return (
       <ThirdwebProvider>
         <Component {...pageProps} />
       </ThirdwebProvider>
     );
   }
   ```

2. **Wallet Integration:**  
   Use `<ConnectWallet client={client} />` (or your custom implementation) from `thirdweb/react` to handle wallet connections.

## Fee Collection Implementation

### Helper File: fees.ts

Create a helper file to maintain fee configuration. This file can be updated easily if fee parameters change.

```typescript
// src/helpers/fees.ts
export const BASE_FEE_METIS = 0.01; // Flat fee in METIS (example value)
export const FEE_PER_IMAGE_METIS = 0.005; // Fee per image (example value)

export function calculateFee(numImages: number): number {
  return BASE_FEE_METIS + numImages * FEE_PER_IMAGE_METIS;
}
```

### Fee Collection Smart Contract

Write a simple Solidity contract that collects fees before allowing the NFT deployment.

```solidity
// contracts/FeeCollector.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FeeCollector {
    uint256 public baseFee;
    uint256 public feePerImage;
    address public owner;

    constructor(uint256 _baseFee, uint256 _feePerImage) {
        baseFee = _baseFee;
        feePerImage = _feePerImage;
        owner = msg.sender;
    }

    function payFee(uint256 numImages) external payable {
        uint256 required = baseFee + (numImages * feePerImage);
        require(msg.value >= required, "Insufficient fee provided");
        // Optionally, emit an event or forward funds to a treasury
    }

    // Owner can withdraw collected fees
    function withdraw() external {
        require(msg.sender == owner, "Not authorized");
        payable(owner).transfer(address(this).balance);
    }
}
```

### Deploying the Fee Contract via Thirdweb CLI

1. Ensure you have thirdweb-cli installed.
2. In your project root, run:

```bash
thirdweb deploy ./contracts/FeeCollector.sol --network sepolia --args "10000000000000000,5000000000000000"
```

The above command deploys the contract on Metis Sepolia with `baseFee = 0.01 METIS` and `feePerImage = 0.005 METIS` (converted to wei).

3. Save the deployed contract address in your config file or environment variable for later interactions.

## NFT Deployment & Minting Flow

### Deploying an Edition Drop Contract

Using the Thirdweb v5 SDK from the client side, deploy an ERC‑1155 Edition Drop contract.

```tsx
// src/components/NFTCreator.tsx
import { useState } from "react";
import { ThirdwebSDK } from "thirdweb";
import { sepolia, andromeda } from "thirdweb/chains";
import { ethers } from "ethers";

interface DeploymentMetadata {
  name: string;
  description: string;
  image: File;
}

export default function NFTCreator() {
  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [deploying, setDeploying] = useState(false);
  const [contractAddress, setContractAddress] = useState<string>("");

  const deployEditionDropContract = async () => {
    try {
      setDeploying(true);
      // Get the signer from Thirdweb client (assumes user wallet is connected)
      const signer = await client.wallet.getSigner();
      if (!signer) throw new Error("Wallet not connected");

      // Initialize Thirdweb SDK on the target chain (use 'sepolia' for test)
      const sdk = ThirdwebSDK.fromSigner(signer, sepolia);

      // Prepare contract metadata (Thirdweb handles IPFS upload automatically)
      const metadata = {
        name: collectionName,
        description: collectionDescription,
        image: imageFile as File,
        primary_sale_recipient: ethers.constants.AddressZero,
      };

      // Deploy the Edition Drop contract
      const deployedAddress = await sdk.deployer.deployEditionDrop(metadata);
      console.log("Edition Drop deployed at:", deployedAddress);
      setContractAddress(deployedAddress);
    } catch (err) {
      console.error("Deployment failed:", err);
      alert("Deployment failed: " + (err as Error).message);
    } finally {
      setDeploying(false);
    }
  };

  return (
    <div>
      <h2>Create Your NFT Collection</h2>
      <input
        type="text"
        placeholder="Collection Name"
        value={collectionName}
        onChange={(e) => setCollectionName(e.target.value)}
      />
      <textarea
        placeholder="Collection Description"
        value={collectionDescription}
        onChange={(e) => setCollectionDescription(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
      />
      <button onClick={deployEditionDropContract} disabled={deploying}>
        {deploying ? "Deploying..." : "Deploy Collection"}
      </button>
      {contractAddress && <p>Contract deployed at: {contractAddress}</p>}
    </div>
  );
}
```

### Lazy Minting & Auto-Claiming NFTs

After deploying, immediately lazy mint NFT metadata and auto-claim tokens to the creator's wallet.

```tsx
// Continuing in NFTCreator.tsx or a separate MintNFT component
import { AddressZero } from "@ethersproject/constants";

async function mintNFTs(
  contractAddress: string,
  nftName: string,
  nftDescription: string,
  nftImageFile: File,
  nftQuantity: number
) {
  try {
    const signer = await client.wallet.getSigner();
    const sdk = ThirdwebSDK.fromSigner(signer, sepolia);
    
    // Get the deployed Edition Drop contract
    const editionDrop = await sdk.getContract(contractAddress, "edition-drop");

    // Lazy mint NFT metadata (this will create tokenId 0 on first call)
    const metadata = {
      name: nftName,
      description: nftDescription,
      image: nftImageFile,
    };
    await editionDrop.erc1155.lazyMint([metadata]);
    console.log("Lazy mint successful");

    // Set default claim condition: start immediately, free claim
    await editionDrop.claimConditions.set(0, [{
      startTime: new Date(),
      maxQuantity: nftQuantity,
      price: 0,
      currencyAddress: AddressZero,
      maxClaimablePerWallet: nftQuantity,
    }]);

    // Auto-claim the tokens to the creator's wallet
    const userAddress = await client.wallet.getAddress();
    await editionDrop.claimTo(userAddress, 0, nftQuantity);
    console.log(`Minted ${nftQuantity} tokens of tokenId 0 to ${userAddress}`);
  } catch (err) {
    console.error("Minting failed:", err);
    alert("Minting failed: " + (err as Error).message);
  }
}
```

## Future-Proofing for Claim Phases

While the current flow (Option 1) auto-claims tokens to the creator's wallet immediately, you should structure the code to enable more advanced claim phase configuration later.

### Modularize Minting Steps

Break down the minting process into separate functions:

- `lazyMintToContract()`
- `setDefaultClaimCondition()`
- `autoClaimTokens()`

### Advanced Claim Configuration Component

Build a React component (initially hidden) that lets the user specify:

- Start time
- Price per token
- Maximum claimable per wallet
- Additional phases (e.g., allowlist)

This component can later replace or supplement the default claim condition logic.

### Conditional Flow

In your UI, add an "Advanced Options" toggle so that users can choose to either auto-claim (current Option 1) or configure claim phases (future Option 2).

## Integration with the Frontend (React Components)

Create a dedicated page (e.g., /create) that renders the NFTCreator component.

Integrate fee display logic:

Import calculateFee from fees.ts and display the computed fee based on the number of images (or NFTs) the user wants to deploy.

Before proceeding with deployment, prompt the user to confirm that they agree to pay the fee.

Integrate Fee Collection Transaction:

Before calling deployEditionDropContract, call the fee collection contract's payFee(numImages) function using Thirdweb's SDK and ethers.js.

Ensure the fee transaction is successful before continuing with the NFT deployment flow.

## Testing & Deployment

Local Testing:

Run your Next.js app locally and test on Metis Sepolia.

Verify that fee collection, contract deployment, lazy minting, and auto-claiming work as expected.

Check that IPFS uploads complete successfully and that metadata URIs are correctly assigned.

Deploy to Testnet:

Once local tests pass, deploy your fee collection contract and NFT creation flow on Metis Sepolia.

Monitor gas usage and transaction receipts.

Mainnet Deployment:

Switch your Thirdweb client configuration to use Metis Andromeda.

Integrate Thirdweb's pay modal for fiat payments once you're ready.

Thoroughly test on mainnet with low-value transactions.

## Next Steps & Future Enhancements

Option 2 Implementation:
Develop the advanced claim configuration UI to allow public mint phases and additional claim conditions.

Backend & Indexing:
Consider saving deployed contract addresses and NFT metadata in your backend (if/when you add one) to facilitate search and user profile management.

Enhanced Fee Collection:
Evaluate on-chain fee collection mechanisms that allow fee sharing or dynamic fee updates via a governance model.

User Experience Improvements:
Add progress indicators, error handling, and transaction status updates to improve the user experience during multi-step blockchain transactions.

Conclusion
This plan details how to integrate NFT creation into Delphi using Thirdweb v5 and on‑chain fee collection on Metis. It outlines the complete flow from initial setup, fee collection (via a helper contract and a helper file for configuration), contract deployment, and immediate NFT minting. The architecture is modular and future‑proofed for enabling more advanced claim phase functionality later on.

With this guide, your team should be able to integrate the feature into your existing codebase seamlessly while keeping it flexible for future enhancements.