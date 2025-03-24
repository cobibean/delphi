# Standardizing Marketplace Functions with ThirdWeb

This guide outlines how to replace custom marketplace wrapper functions with direct ThirdWeb calls for improved maintainability, code consistency, and developer experience.

## Why Standardize?

Currently, our codebase has several wrapper functions like `buyWithMetis` and `buyFromDirectListing` that:

1. Duplicate functionality already provided by ThirdWeb
2. Add complexity through wallet compatibility layers
3. Create inconsistent patterns across the application
4. Make it harder to track updates to ThirdWeb's API

## Implementation Guide

### 1. Direct Listings - Buy Function

#### Current Implementation (to be replaced)

```typescript
// In NFTDetailView.tsx or similar components
const handleBuyWithMetis = async () => {
  try {
    // ... validation code ...
    
    // Call the wrapper function
    const result = await buyWithMetis(listingId, wallet);
    
    // ... handle result ...
  } catch (error) {
    // ... error handling ...
  }
};
```

#### Standardized Implementation

```typescript
// Import required ThirdWeb functions directly
import { getContract, sendTransaction, waitForReceipt } from "thirdweb";
import { buyFromListing } from "thirdweb/extensions/marketplace";
import { metisChain } from "@/app/config/chain";
import { client } from "@/app/config/client";
import { MARKETPLACE_ADDRESS } from "@/constants/contracts";

// In NFTDetailView.tsx or similar components
const handleBuyClick = async () => {
  if (!account || !wallet) {
    toast.error("Please connect your wallet to buy this NFT");
    return;
  }
  
  try {
    // Start transaction tracking if needed
    const { addTransaction } = useTransaction();
    const txId = addTransaction("loading", `Buying NFT #${tokenId}...`);
    
    // Get the marketplace contract
    const marketplaceContract = getContract({
      client,
      chain: metisChain,
      address: MARKETPLACE_ADDRESS,
    });
    
    // Create the transaction using ThirdWeb's built-in function
    const transaction = buyFromListing({
      contract: marketplaceContract,
      listingId: BigInt(listingId),
      quantity: 1n,
      recipient: account.address as `0x${string}`
    });
    
    // Send the transaction
    const tx = await sendTransaction({
      transaction,
      account
    });
    
    // Wait for confirmation
    const receipt = await waitForReceipt({
      client,
      chain: metisChain,
      transactionHash: tx.transactionHash,
    });
    
    // Update transaction status if needed
    addTransaction(
      "success", 
      `Successfully purchased NFT #${tokenId}`,
      tx.transactionHash
    );
    
    // Show success message
    toast.success("Purchase successful!");
    
    // Redirect or update UI as needed
    
  } catch (error: any) {
    console.error("Error buying NFT:", error);
    
    // Update transaction status if needed
    if (txId) {
      addTransaction("error", `Failed to purchase NFT: ${error.message}`);
    }
    
    // Show error message
    toast.error(error.message || "Failed to purchase NFT");
  }
};
```

### 2. Auctions - Bidding

#### Current Implementation (to be replaced)

```typescript
// In components like AuctionActions.tsx
const handleBidSubmit = async () => {
  try {
    // ... validation code ...
    
    // Call the wrapper function
    const result = await placeBid(auctionId, bidAmount, wallet);
    
    // ... handle result ...
  } catch (error) {
    // ... error handling ...
  }
};
```

#### Standardized Implementation

```typescript
// Import required ThirdWeb functions directly
import { getContract, sendTransaction, waitForReceipt } from "thirdweb";
import { bidInAuction, isNewWinningBid } from "thirdweb/extensions/marketplace";
import { metisChain } from "@/app/config/chain";
import { client } from "@/app/config/client";
import { MARKETPLACE_ADDRESS } from "@/constants/contracts";
import { ethers } from "ethers";

// In components like AuctionActions.tsx
const handleBidSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!account || !wallet) {
    toast.error("Please connect your wallet to place a bid");
    return;
  }
  
  try {
    // Start transaction tracking if needed
    const { addTransaction } = useTransaction();
    const txId = addTransaction("loading", `Placing bid on NFT #${tokenId}...`);
    
    // Get the marketplace contract
    const marketplaceContract = getContract({
      client,
      chain: metisChain,
      address: MARKETPLACE_ADDRESS,
    });
    
    // Validate bid amount meets requirements
    const bidAmountWei = ethers.parseEther(bidAmount);
    
    // Check if bid would be winning
    const wouldWin = await isNewWinningBid({
      contract: marketplaceContract,
      auctionId: BigInt(auctionId),
      bidAmount: bidAmountWei
    });
    
    if (!wouldWin) {
      throw new Error("Bid amount is too low to become the winning bid");
    }
    
    // Create the transaction
    const transaction = bidInAuction({
      contract: marketplaceContract,
      auctionId: BigInt(auctionId),
      bidAmount: bidAmount // ThirdWeb will handle conversion
    });
    
    // Send the transaction
    const tx = await sendTransaction({
      transaction,
      account
    });
    
    // Wait for confirmation
    const receipt = await waitForReceipt({
      client,
      chain: metisChain,
      transactionHash: tx.transactionHash,
    });
    
    // Update transaction status
    addTransaction(
      "success", 
      `Successfully placed bid of ${bidAmount} METIS on NFT #${tokenId}`,
      tx.transactionHash
    );
    
    // Show success message
    toast.success("Bid placed successfully!");
    
    // Refresh bid history or update UI as needed
    
  } catch (error: any) {
    console.error("Error placing bid:", error);
    
    // Update transaction status
    if (txId) {
      addTransaction("error", `Failed to place bid: ${error.message}`);
    }
    
    // Show error message
    toast.error(error.message || "Failed to place bid");
  }
};
```

### 3. Auctions - Buyout

#### Current Implementation (to be replaced)

```typescript
// In components like AuctionActions.tsx
const handleBuyout = async () => {
  try {
    // ... validation code ...
    
    // Call the wrapper function
    const result = await buyoutAuction(auctionId, wallet);
    
    // ... handle result ...
  } catch (error) {
    // ... error handling ...
  }
};
```

#### Standardized Implementation

```typescript
// Import required ThirdWeb functions directly
import { getContract, sendTransaction, waitForReceipt } from "thirdweb";
import { buyoutAuction } from "thirdweb/extensions/marketplace";
import { metisChain } from "@/app/config/chain";
import { client } from "@/app/config/client";
import { MARKETPLACE_ADDRESS } from "@/constants/contracts";

// In components like AuctionActions.tsx
const handleBuyout = async () => {
  if (!account || !wallet) {
    toast.error("Please connect your wallet to buy out this auction");
    return;
  }
  
  try {
    // Start transaction tracking if needed
    const { addTransaction } = useTransaction();
    const txId = addTransaction("loading", `Buying out auction for NFT #${tokenId}...`);
    
    // Get the marketplace contract
    const marketplaceContract = getContract({
      client,
      chain: metisChain,
      address: MARKETPLACE_ADDRESS,
    });
    
    // Create the transaction
    const transaction = buyoutAuction({
      contract: marketplaceContract,
      auctionId: BigInt(auctionId)
    });
    
    // Send the transaction
    const tx = await sendTransaction({
      transaction,
      account
    });
    
    // Wait for confirmation
    const receipt = await waitForReceipt({
      client,
      chain: metisChain,
      transactionHash: tx.transactionHash,
    });
    
    // Update transaction status
    addTransaction(
      "success", 
      `Successfully bought out auction for NFT #${tokenId}`,
      tx.transactionHash
    );
    
    // Show success message
    toast.success("Auction bought out successfully!");
    
    // Redirect or update UI as needed
    
  } catch (error: any) {
    console.error("Error buying out auction:", error);
    
    // Update transaction status
    if (txId) {
      addTransaction("error", `Failed to buy out auction: ${error.message}`);
    }
    
    // Show error message
    toast.error(error.message || "Failed to buy out auction");
  }
};
```

### 4. Collecting Auction Payouts

#### Current Implementation (to be replaced)

```typescript
// In profile or auction components
const handleCollectPayout = async () => {
  try {
    // ... validation code ...
    
    // Call the wrapper function
    const result = await collectAuctionPayoutForSeller(auctionId, wallet);
    
    // ... handle result ...
  } catch (error) {
    // ... error handling ...
  }
};
```

#### Standardized Implementation

```typescript
// Import required ThirdWeb functions directly
import { getContract, sendTransaction, waitForReceipt } from "thirdweb";
import { collectAuctionPayout } from "thirdweb/extensions/marketplace";
import { metisChain } from "@/app/config/chain";
import { client } from "@/app/config/client";
import { MARKETPLACE_ADDRESS } from "@/constants/contracts";

// In profile or auction components
const handleCollectPayout = async () => {
  if (!account || !wallet) {
    toast.error("Please connect your wallet to collect payout");
    return;
  }
  
  try {
    // Start transaction tracking if needed
    const { addTransaction } = useTransaction();
    const txId = addTransaction("loading", `Collecting payout for auction #${auctionId}...`);
    
    // Get the marketplace contract
    const marketplaceContract = getContract({
      client,
      chain: metisChain,
      address: MARKETPLACE_ADDRESS,
    });
    
    // Create the transaction
    const transaction = collectAuctionPayout({
      contract: marketplaceContract,
      auctionId: BigInt(auctionId)
    });
    
    // Send the transaction
    const tx = await sendTransaction({
      transaction,
      account
    });
    
    // Wait for confirmation
    const receipt = await waitForReceipt({
      client,
      chain: metisChain,
      transactionHash: tx.transactionHash,
    });
    
    // Update transaction status
    addTransaction(
      "success", 
      `Successfully collected payout for auction #${auctionId}`,
      tx.transactionHash
    );
    
    // Show success message
    toast.success("Payout collected successfully!");
    
  } catch (error: any) {
    console.error("Error collecting payout:", error);
    
    // Update transaction status
    if (txId) {
      addTransaction("error", `Failed to collect payout: ${error.message}`);
    }
    
    // Show error message
    toast.error(error.message || "Failed to collect payout");
  }
};
```

## Understanding ThirdWeb v5 Wallet/Account Handling

ThirdWeb v5 has a specific approach to wallets and accounts that we should understand when standardizing our code:

### Key Concepts

1. **Account vs Wallet**: In ThirdWeb v5:
   - A **wallet** is what the user connects (MetaMask, WalletConnect, etc.)
   - An **account** is what you use for transactions

2. **useActiveWallet() vs useActiveAccount()**:
   - `useActiveWallet()` returns the connected wallet interface
   - `useActiveAccount()` returns the active account for transactions

3. **sendTransaction requirements**:
   - The `account` parameter must be a valid ThirdWeb account object
   - It must have `.address` (string) and `.signMessage` (function)

### Using Account Objects Properly

With ThirdWeb v5, we should standardize on using `useActiveAccount()` throughout our components:

```typescript
import { useActiveAccount } from "thirdweb/react";

// In component
const account = useActiveAccount();

// Use account directly with sendTransaction
const tx = await sendTransaction({
  transaction,
  account
});
```

This is much simpler than our current approach of extracting accounts from wallet objects!

## Extracting Account from Wallet Objects (Legacy Support)

If you still need to extract accounts from different wallet formats for compatibility reasons:

```typescript
// Utility function to get the account from a wallet object
const getAccountFromWallet = (wallet: any) => {
  // If wallet is already a valid account
  if (wallet && typeof wallet.address === 'string' && typeof wallet.signMessage === 'function') {
    return wallet;
  }
  
  // If wallet has getAccount() method (ThirdWeb wallet)
  if (wallet && typeof wallet.getAccount === 'function') {
    return wallet.getAccount();
  }
  
  // If wallet has account property
  if (wallet && wallet.account && wallet.account.address) {
    return wallet.account;
  }
  
  throw new Error("Could not get a valid account from wallet");
};

// Usage
try {
  const account = getAccountFromWallet(wallet);
  // Use account for transactions
} catch (error) {
  toast.error("Please connect a compatible wallet");
}
```

## Migration Checklist

Follow these steps to standardize each component that uses marketplace functions:

1. Identify components using `buyWithMetis`, `buyFromDirectListing`, `placeBid`, `buyoutAuction`, etc.
2. Import necessary ThirdWeb functions directly:
   ```typescript
   import { buyFromListing, bidInAuction, buyoutAuction, collectAuctionPayout } from "thirdweb/extensions/marketplace";
   import { getContract, sendTransaction, waitForReceipt } from "thirdweb";
   import { useActiveAccount } from "thirdweb/react";
   ```
3. Replace wrapper function calls with direct ThirdWeb function calls
4. Use `useActiveAccount()` for transaction functions instead of passing wallets
5. Test thoroughly with different wallet providers
6. Add comprehensive error handling

## Components to Update

The following components need to be updated:

1. `NFTDetailView.tsx` - For direct buying functionality
2. `AuctionActions.tsx` - For auction bid/buyout functionality
3. `NFTCard.tsx` - For quick buy buttons
4. `FeaturedCard.tsx` - For featured listing purchases
5. Any other components using marketplace purchase functions

## Benefits of Standardization

1. **Improved maintainability** - Easier to update when ThirdWeb changes
2. **Reduced code complexity** - Fewer abstraction layers
3. **Consistent patterns** - Direct ThirdWeb calls throughout the app
4. **Better type safety** - Using ThirdWeb's TypeScript definitions
5. **Easier debugging** - Clear code path to the library

## Transaction Tracking Integration

This standardization doesn't remove transaction tracking. Instead, it integrates directly with our `TransactionProvider` at the component level:

```typescript
import { useTransaction } from "@/providers/TransactionProvider";

// In component
const { addTransaction } = useTransaction();

// Before transaction
const txId = addTransaction("loading", "Transaction message");

try {
  // Transaction code using ThirdWeb directly
  
  // After successful transaction
  addTransaction("success", "Success message", tx.transactionHash);
} catch (error) {
  // After failed transaction
  addTransaction("error", `Error: ${error.message}`);
}
```

## Testing Strategy

When implementing these changes, follow this testing procedure:

1. Start with a low-risk component and replace one function at a time
2. Test thoroughly with different wallet providers (MetaMask, WalletConnect, etc.)
3. Monitor transactions on the testnet before deploying to production
4. Use the ThirdWeb debug console to troubleshoot any issues

## Next Steps

After standardizing the marketplace purchase functions, we should:

1. Review and standardize other marketplace functions (listing creation, cancellation, etc.)
2. Consider creating minimal utility hooks if repeated patterns emerge
3. Update documentation to reflect the standardized approach
4. Remove unused wrapper functions from the codebase 