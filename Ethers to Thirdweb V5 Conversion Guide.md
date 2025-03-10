# Ethers.js to Thirdweb V5 Conversion Guide

This guide documents common patterns for migrating from ethers.js to Thirdweb V5 SDK. We've analyzed the official Thirdweb marketplace template to identify these patterns.

## Key Observations

1. The reference marketplace template is already using Thirdweb V5 SDK (`thirdweb: ^5.75.0`).
2. No direct ethers.js imports or usage were found in the template.
3. The implementation follows a clean pattern of using Thirdweb hooks and functions.

## Common Conversion Patterns

### Provider/Client Setup

**Ethers.js:**
```typescript
import { ethers } from 'ethers';
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
```

**Thirdweb V5:**
```typescript
import { createThirdwebClient } from "thirdweb";

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_TW_CLIENT_ID as string,
});
```

### Wallet Connection

**Ethers.js:**
```typescript
const provider = new ethers.providers.Web3Provider(window.ethereum);
await provider.send("eth_requestAccounts", []);
const signer = provider.getSigner();
```

**Thirdweb V5:**
```typescript
import { useConnect, useActiveWallet, useDisconnect } from "thirdweb/react";

// Inside component
const { connect } = useConnect();
const wallet = useActiveWallet();
const { disconnect } = useDisconnect();

// Connecting
connect();
```

### Contract Interaction - Reading

**Ethers.js:**
```typescript
const contract = new ethers.Contract(address, abi, provider);
const data = await contract.functionName(params);
```

**Thirdweb V5:**
```typescript
import { useReadContract } from "thirdweb/react";

// Inside component
const { data, isLoading } = useReadContract({
  contract: contractAddress,
  method: "functionName",
  params: [param1, param2]
});
```

### Contract Interaction - Writing

**Ethers.js:**
```typescript
const contract = new ethers.Contract(address, abi, signer);
const tx = await contract.functionName(params);
const receipt = await tx.wait();
```

**Thirdweb V5:**
```typescript
import { sendTransaction, waitForReceipt } from "thirdweb";
import { functionName } from "thirdweb/extensions/extensionName";

// Create transaction object
const transaction = functionName({
  contract: contractObject,
  param1: value1,
  param2: value2
});

// Send transaction
const tx = await sendTransaction({
  transaction,
  account
});

// Wait for receipt
const receipt = await waitForReceipt({
  transactionHash: tx.transactionHash,
  client,
  chain: contractChain
});
```

### Token Approvals

**Ethers.js:**
```typescript
const erc20 = new ethers.Contract(tokenAddress, erc20ABI, signer);
await erc20.approve(spenderAddress, amount);
```

**Thirdweb V5:**
```typescript
import { approve, allowance, decimals } from "thirdweb/extensions/erc20";
import { sendAndConfirmTransaction, toTokens } from "thirdweb";

// Check current allowance
const currentAllowance = await allowance({
  contract: tokenContract,
  owner: account.address,
  spender: spenderAddress,
});

// If needed, approve tokens
if (currentAllowance < requiredAmount) {
  const tokenDecimals = await decimals({ contract: tokenContract });
  const transaction = approve({
    contract: tokenContract,
    spender: spenderAddress,
    amount: toTokens(requiredAmount, tokenDecimals)
  });
  
  await sendAndConfirmTransaction({ transaction, account });
}
```

### Value Conversions

**Ethers.js:**
```typescript
import { ethers } from 'ethers';
const weiValue = ethers.utils.parseEther("1.0");
const etherValue = ethers.utils.formatEther(weiValue);
```

**Thirdweb V5:**
```typescript
import { toWei, toEther } from "thirdweb";

const weiValue = toWei("1.0");
const etherValue = toEther(weiValue);
```

### Event Handling

**Ethers.js:**
```typescript
contract.on("EventName", (param1, param2, event) => {
  // Handle event
});
```

**Thirdweb V5:**
```typescript
import { useContractEvents } from "thirdweb/react";

// Inside component
const { data: events } = useContractEvents({
  contract: contractAddress,
  eventName: "EventName"
});
```

## Specific Marketplace Patterns

### Creating Listings

```typescript
import { createListing } from "thirdweb/extensions/marketplace";
import { sendAndConfirmTransaction } from "thirdweb";

const transaction = createListing({
  contract: marketplaceContract,
  assetContractAddress: nftContract.address,
  tokenId,
  quantity: 1n,
  currencyContractAddress: currencyAddress,
  pricePerToken: price,
});

await sendAndConfirmTransaction({
  transaction,
  account,
});
```

### Buying NFTs

```typescript
import { buyFromListing } from "thirdweb/extensions/marketplace";
import { sendTransaction, waitForReceipt } from "thirdweb";

const transaction = buyFromListing({
  contract: marketplaceContract,
  listingId: listing.id,
  quantity: listing.quantity,
  recipient: account.address,
});

const receipt = await sendTransaction({
  transaction,
  account,
});

await waitForReceipt({
  transactionHash: receipt.transactionHash,
  client,
  chain: nftContract.chain,
});
```

### NFT Approvals (ERC721/ERC1155)

```typescript
import { isApprovedForAll, setApprovalForAll } from "thirdweb/extensions/erc721"; // or erc1155
import { sendAndConfirmTransaction } from "thirdweb";

// Check approval
const isApproved = await isApprovedForAll({
  contract: nftContract,
  owner: account.address,
  operator: marketplaceAddress,
});

// If needed, set approval
if (!isApproved) {
  const transaction = setApprovalForAll({
    contract: nftContract,
    operator: marketplaceAddress,
    approved: true,
  });
  
  await sendAndConfirmTransaction({
    transaction,
    account,
  });
}
```

## React Integration Best Practices

1. **Provider Setup**:
   ```tsx
   <ThirdwebProvider>
     <AutoConnect client={client} />
     {children}
   </ThirdwebProvider>
   ```

2. **Chain Management**:
   ```tsx
   const switchChain = useSwitchActiveWalletChain();
   const activeChain = useActiveWalletChain();
   
   // Switch chains if needed
   if (activeChain?.id !== targetChain.id) {
     await switchChain(targetChain);
   }
   ```

3. **UI Components**:
   Thirdweb provides UI components for common elements:
   - NFTMedia
   - NFTName
   - NFTDescription
   - TokenIcon
   - TokenSymbol
   - WalletName 