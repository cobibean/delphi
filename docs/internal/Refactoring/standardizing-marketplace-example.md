# Component Refactoring Example - NFTDetailView.tsx

This document provides a concrete example of refactoring the `NFTDetailView.tsx` component to use ThirdWeb directly instead of our custom wrapper functions.

## Identifying Code to Replace

First, let's identify the code using our custom wrapper functions:

```typescript
// Current implementation in NFTDetailView.tsx
const handleBuyWithMetis = async () => {
  try {
    if (!wallet) {
      toast.error("Please connect your wallet to make this purchase");
      return;
    }
    
    // Start loading state
    setProcessingPayment(true);
    
    // Reset transaction state
    setTxHash(null);
    setReceiptData(null);
    
    // Log the action
    logTransaction({ 
      transactionHash: "",
      listingId, 
      tokenId, 
      price: pricePerToken 
    }, "buy_with_metis");
    
    // Add a transaction notification
    const txId = addTransaction("loading", `Buying NFT #${tokenId} for ${pricePerToken} METIS...`);
    
    // Get the buyer's address
    const buyerAddress = account?.address;
    
    if (!buyerAddress) {
      throw new Error("Wallet address not found");
    }
    
    // Execute the purchase using appropriate function based on listing type
    let result;
    
    if (isAuction && buyoutPrice) {
      // For auctions with buyout price, use buyoutAuction
      result = await buyoutAuction(listingId, wallet);
    } else {
      // For direct listings, use buyWithMetis
      result = await buyWithMetis(listingId, wallet);
    }
    
    // Store the transaction hash
    setTxHash(result.transactionHash);
    
    // Store the receipt data
    setReceiptData(result.receipt);
    
    // Update the transaction status
    addTransaction(
      "success",
      `Successfully purchased NFT #${tokenId} for ${isAuction ? buyoutPrice : pricePerToken} METIS`,
      result.transactionHash
    );
    
    // Show success message
    toast.success("Purchase successful! Your NFT will be available in your wallet soon.");
    
    // Redirect to profile page after 2 seconds
    setTimeout(() => {
      router.push("/profile");
    }, 2000);
    
  } catch (error: any) {
    console.error("Purchase failed:", error);
    
    // Add failed transaction to history
    addTransaction(
      "error",
      `Failed to purchase NFT #${tokenId}: ${error.message || "Unknown error"}`,
      txHash || ""
    );
    
    // Show error message
    toast.error(error.message || "Failed to complete purchase. Please try again.");
    
  } finally {
    // End loading state
    setProcessingPayment(false);
  }
};
```

## Updated Implementation with Direct ThirdWeb Calls

Now, let's refactor this code to use ThirdWeb directly:

```typescript
// Update imports at the top of the file
import { buyFromListing, buyoutAuction } from "thirdweb/extensions/marketplace"; 
import { getContract, sendTransaction, waitForReceipt } from "thirdweb";
import { metisChain } from "@/app/config/chain";
import { client } from "@/app/config/client";
import { MARKETPLACE_ADDRESS } from "@/constants/contracts";

// Then in the component...

// Handle buying with direct ThirdWeb functions
const handleBuyClick = async () => {
  try {
    if (!account) {
      toast.error("Please connect your wallet to make this purchase");
      return;
    }
    
    // Start loading state
    setProcessingPayment(true);
    
    // Reset transaction state
    setTxHash(null);
    setReceiptData(null);
    
    // Log the action (keep existing logging if needed)
    logTransaction({ 
      transactionHash: "",
      listingId, 
      tokenId, 
      price: pricePerToken 
    }, "buy_nft");
    
    // Add a transaction notification
    const txId = addTransaction("loading", `Buying NFT #${tokenId} for ${isAuction ? buyoutPrice : pricePerToken} METIS...`);
    
    // Get the marketplace contract using ThirdWeb
    const marketplaceContract = getContract({
      client,
      chain: metisChain,
      address: MARKETPLACE_ADDRESS,
    });
    
    // Create the appropriate transaction based on listing type
    let transaction;
    let tx;
    
    if (isAuction && buyoutPrice) {
      // For auctions with buyout price, use buyoutAuction from ThirdWeb directly
      transaction = buyoutAuction({
        contract: marketplaceContract,
        auctionId: BigInt(listingId)
      });
    } else {
      // For direct listings, use buyFromListing from ThirdWeb directly
      transaction = buyFromListing({
        contract: marketplaceContract,
        listingId: BigInt(listingId),
        quantity: 1n,
        recipient: account.address as `0x${string}`
      });
    }
    
    // Send the transaction - notice we're using the account directly
    tx = await sendTransaction({
      transaction,
      account
    });
    
    // Store the transaction hash
    setTxHash(tx.transactionHash);
    
    // Wait for confirmation
    const receipt = await waitForReceipt({
      client,
      chain: metisChain,
      transactionHash: tx.transactionHash,
    });
    
    // Store the receipt data
    setReceiptData(receipt);
    
    // Update the transaction status
    addTransaction(
      "success",
      `Successfully purchased NFT #${tokenId} for ${isAuction ? buyoutPrice : pricePerToken} METIS`,
      tx.transactionHash
    );
    
    // Show success message
    toast.success("Purchase successful! Your NFT will be available in your wallet soon.");
    
    // Redirect to profile page after 2 seconds (keeping existing behavior)
    setTimeout(() => {
      router.push("/profile");
    }, 2000);
    
  } catch (error: any) {
    console.error("Purchase failed:", error);
    
    // Add failed transaction to history
    addTransaction(
      "error",
      `Failed to purchase NFT #${tokenId}: ${error.message || "Unknown error"}`,
      txHash || ""
    );
    
    // Show error message
    toast.error(error.message || "Failed to complete purchase. Please try again.");
    
  } finally {
    // End loading state
    setProcessingPayment(false);
  }
};
```

## Key Changes

1. **Import Changes**:
   - Added direct imports for ThirdWeb's `buyFromListing`, `buyoutAuction`, and other utility functions
   - Using these functions instead of our custom wrapper functions

2. **Account Handling**:
   - Using the `account` object directly from `useActiveAccount()` hook
   - No need for complex account extraction from wallet objects

3. **Contract Interaction**:
   - Getting the marketplace contract directly with `getContract()`
   - Creating transactions with ThirdWeb's functions
   - Using `sendTransaction()` and `waitForReceipt()` for consistent transaction handling

4. **Error Handling**:
   - Maintained existing error handling and UX flows
   - Kept transaction tracking, toasts, and navigation

## What Stays the Same

1. The user experience and UI flow
2. Transaction tracking through `addTransaction()`
3. Toast notifications
4. Loading states and redirects

## Testing This Change

To test this refactored implementation:

1. Deploy to a test environment
2. Connect different wallets (MetaMask, WalletConnect, etc.)
3. Test buying both direct listings and auction buyouts
4. Verify transaction receipts and NFT ownership after purchase
5. Test error handling (insufficient funds, rejected transactions, etc.)

By applying this pattern throughout the application, we'll achieve a more maintainable and consistent codebase that directly leverages ThirdWeb's capabilities. 