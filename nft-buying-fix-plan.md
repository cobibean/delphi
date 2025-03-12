# NFT Buying Functionality Fix Plan

## Overview

Based on the analysis of the codebase and the thirdweb documentation, we've identified issues with the NFT buying process. The current implementation shows success messages without actually completing transactions. This plan outlines the steps needed to fix the functionality.

## Issues Identified

1. **Transaction Process Not Completed**: The `buyWithMetis` and `buyWithWMetis` functions create and send transactions, but proper transaction confirmation is missing.

2. **Premature Success Messages**: Success notifications appear based solely on getting a transaction hash, not confirmation of blockchain execution.

3. **Wallet Integration**: Possible issues with how the wallet parameter is passed and used.

4. **Error Handling**: Limited error handling that doesn't distinguish between different transaction failure scenarios.

## Fix Implementation Plan

### 1. Update the Core Transaction Functions

First, update the `buyWithMetis` and `buyWithWMetis` functions in `src/app/services/marketplace-v5.ts` to properly handle transaction confirmation:

```typescript
/**
 * Buy an NFT with METIS (native token)
 */
export async function buyWithMetis(
  listingId: string, 
  wallet: any
): Promise<{transactionHash: string, listingId: string, success: boolean, receipt: any}> {
  try {
    // Get the marketplace contract
    const marketplaceContract = getContract({
      client,
      chain: metisChain,
      address: CONTRACT_ADDRESS as `0x${string}`,
    });
    
    // Get all valid listings to find the one we want
    const allListings = await getAllValidListings({
      contract: marketplaceContract
    });
    
    // Find the listing with the matching ID
    const listing = allListings.find(l => l.id.toString() === listingId);
    
    if (!listing) {
      throw new Error(`Listing ${listingId} not found`);
    }
    
    // Create the buy transaction
    const transaction = buyFromListing({
      contract: marketplaceContract,
      listingId: listing.id,
      quantity: listing.quantity,
      recipient: wallet.account.address,
    });
    
    // Send the transaction
    const receipt = await sendTransaction({
      transaction,
      account: wallet,
    });
    
    // Wait for transaction confirmation
    const confirmedReceipt = await waitForReceipt({
      client,
      chain: metisChain,
      transactionHash: receipt.transactionHash,
    });
    
    // Verify transaction was successful
    if (confirmedReceipt.status !== 'success') {
      throw new Error("Transaction failed on-chain");
    }
    
    return {
      transactionHash: receipt.transactionHash,
      listingId,
      success: true,
      receipt: confirmedReceipt
    };
  } catch (error: any) {
    console.error("Error buying NFT:", error);
    throw error;
  }
}
```

Similarly update the `buyWithWMetis` function to include transaction confirmation.

### 2. Update the Component Handlers

Update the purchase handlers in `NFTDetailView.tsx` and `NFTCard.tsx` components:

```typescript
// Handle buy with METIS
const handleBuyWithMetis = async () => {
  if (!account || !wallet) {
    addTransaction("error", "Connect your wallet first to buy this NFT");
    return;
  }
  
  try {
    setIsLoading(true);
    const txId = addTransaction("loading", `Buying NFT with METIS...`);
    
    console.log(`Buying listing ${listingId} with METIS using wallet:`, wallet);
    
    // Pass the wallet to the buyWithMetis function
    const result = await buyWithMetis(listingId, wallet);
    
    console.log("Transaction result:", result);
    
    if (result && result.receipt && result.receipt.status === 'success') {
      addTransaction("success", "NFT purchased successfully with METIS!", result.transactionHash);
      
      // Refresh data to show the updated ownership
      setTimeout(() => {
        // Call a function to refresh NFT data or trigger navigation
      }, 2000);
    } else {
      addTransaction("error", "Transaction was sent but failed on the blockchain");
    }
  } catch (error) {
    console.error("Error buying with METIS:", error);
    addTransaction("error", error instanceof Error ? error.message : "Failed to buy NFT");
  } finally {
    setIsLoading(false);
    setShowPaymentOptions(false);
  }
};
```

### 3. Add Transaction Status and Debugging

Add a transaction status component that shows real-time status of ongoing transactions:

```typescript
// src/app/components/TransactionStatus.tsx
export function TransactionStatus({ transactionHash }: { transactionHash?: string }) {
  const [status, setStatus] = useState<'pending' | 'confirmed' | 'failed' | 'unknown'>('pending');
  
  useEffect(() => {
    if (!transactionHash) return;
    
    const checkStatus = async () => {
      try {
        const receipt = await waitForReceipt({
          client,
          chain: metisChain,
          transactionHash: transactionHash as `0x${string}`,
        });
        
        setStatus(receipt.status === 'success' ? 'confirmed' : 'failed');
      } catch (error) {
        console.error("Error checking transaction status:", error);
        setStatus('unknown');
      }
    };
    
    checkStatus();
  }, [transactionHash]);
  
  return (
    <div className="mt-2">
      {status === 'pending' && (
        <span className="text-sinister-orange">Transaction pending...</span>
      )}
      {status === 'confirmed' && (
        <span className="text-sinister-teal">Transaction confirmed!</span>
      )}
      {status === 'failed' && (
        <span className="text-sinister-red">Transaction failed on-chain</span>
      )}
      {status === 'unknown' && (
        <span className="text-sinister-scroll">Transaction status unknown</span>
      )}
      
      {transactionHash && (
        <a
          href={`https://explorer.metis.io/tx/${transactionHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-sinister-teal hover:text-sinister-teal/80 underline ml-2"
        >
          View on Metis Explorer
        </a>
      )}
    </div>
  );
}
```

### 4. Implement Better Error Handling

Create specialized error types and handlers to better communicate transaction issues:

```typescript
// src/app/utils/errors.ts
export class InsufficientBalanceError extends Error {
  constructor(message = "Insufficient balance to complete transaction") {
    super(message);
    this.name = "InsufficientBalanceError";
  }
}

export class TransactionRejectedError extends Error {
  constructor(message = "Transaction was rejected by the user") {
    super(message);
    this.name = "TransactionRejectedError";
  }
}

export class BlockchainError extends Error {
  constructor(message = "Transaction failed on the blockchain") {
    super(message);
    this.name = "BlockchainError";
  }
}

export function handleTransactionError(error: any): { message: string, type: string } {
  console.error("Transaction error:", error);
  
  if (error.code === 4001 || error.message?.includes("rejected")) {
    return {
      message: "Transaction was rejected in your wallet",
      type: "user_rejected"
    };
  }
  
  if (error.message?.includes("insufficient funds") || error.message?.includes("Insufficient balance")) {
    return {
      message: "You don't have enough METIS to complete this transaction",
      type: "insufficient_funds"
    };
  }
  
  if (error.message?.includes("gas")) {
    return {
      message: "Gas estimation failed. The transaction might fail.",
      type: "gas_error"
    };
  }
  
  return {
    message: `Transaction failed: ${error.message || "Unknown error"}`,
    type: "unknown"
  };
}
```

### 5. Add Debugging and Network Detection

Add debugging capabilities to help identify issues:

```typescript
// src/app/utils/debugging.ts
export function logTransaction(tx: any, label: string) {
  console.group(`Transaction: ${label}`);
  console.log("Transaction hash:", tx.transactionHash);
  console.log("Transaction data:", tx);
  console.groupEnd();
}

export function validateNetworkConnection() {
  return new Promise<boolean>((resolve) => {
    const testRequestUrl = "https://andromeda.metis.io/?owner=1088";
    
    fetch(testRequestUrl, { method: 'HEAD' })
      .then(response => {
        resolve(response.ok);
      })
      .catch(error => {
        console.error("Network connection error:", error);
        resolve(false);
      });
  });
}
```

### 6. Testing Plan

1. **Transaction Simulation**: Before deploying to production, test transactions on the Metis network.

2. **Error Scenarios Testing**:
   - Test with insufficient funds
   - Test when user rejects transaction
   - Test when network is congested
   - Test when blockchain returns an error

3. **Wallet Compatibility Testing**:
   - Test with MetaMask, WalletConnect, and other supported wallets
   - Test on different browsers
   - Test on mobile devices

## Implementation Schedule

1. Update core transaction functions (1 day)
2. Update component handlers (1 day)
3. Add transaction status and debugging tools (1 day)
4. Implement better error handling (1 day)
5. Testing and bug fixes (2 days)

## Success Criteria

1. Users can successfully purchase NFTs
2. Transaction confirmation is properly verified
3. Users see accurate status updates throughout the process
4. Failed transactions show helpful error messages
5. The UI reflects the actual blockchain state

## Implementation Summary

We have successfully implemented the plan to fix the NFT buying functionality:

1. **Updated Core Transaction Functions**:
   - Modified `buyWithMetis` and `buyWithWMetis` in `marketplace-v5.ts` to properly wait for transaction confirmation
   - Added receipt return values to track transaction status
   - Fixed contract interaction to use the thirdweb SDK properly

2. **Enhanced Error Handling**:
   - Created the `errors.ts` utility with specialized error types
   - Implemented `handleTransactionError` for user-friendly error messages
   - Added network validation before attempting transactions

3. **Added Debugging Tools**:
   - Created the `debugging.ts` utility with transaction logging functions
   - Added network connectivity validation
   - Improved console output for easier troubleshooting

4. **Improved User Experience**:
   - Created the `TransactionStatus` component to show real-time transaction status
   - Updated notification messages to be more informative
   - Added explorer links for transaction tracking

5. **Updated Component Handlers**:
   - Modified `NFTDetailView.tsx` and `NFTCard.tsx` to use the improved transaction flow
   - Added better error handling and user feedback
   - Improved transaction status reporting

These changes ensure that users now have a reliable NFT purchasing experience, with proper transaction confirmation and meaningful feedback throughout the process. The system now correctly waits for blockchain confirmation before showing success messages, and provides helpful error information when things go wrong. 