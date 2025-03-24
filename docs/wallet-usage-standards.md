# Wallet Usage Standards

This document outlines the standardized wallet handling patterns for our application. Following these standards ensures consistent, maintainable, and secure wallet interactions across the codebase.

## Core Principles

1. **Single Source of Truth**: All wallet connections come from standardized hooks
2. **Type Safety**: Use TypeScript interfaces for all wallet interactions
3. **Error Handling**: Standardized error handling for wallet operations
4. **Testability**: Easy to test and mock wallet functionality
5. **Consistency**: Same patterns across all components

## Standard Hook Usage

### 1. Connecting Wallets

Always use the `useWallet` hook to manage wallet connections:

```typescript
import { useWallet } from "@/app/features/wallet/hooks/useWallet";

function MyComponent() {
  const { 
    isConnected, 
    address, 
    displayAddress, 
    connectWallet, 
    disconnectWallet 
  } = useWallet();

  const handleConnect = async () => {
    await connectWallet("metamask");
  };

  return (
    <div>
      {isConnected ? (
        <div>
          <span>Connected: {displayAddress}</span>
          <button onClick={disconnectWallet}>Disconnect</button>
        </div>
      ) : (
        <button onClick={handleConnect}>Connect Wallet</button>
      )}
    </div>
  );
}
```

### 2. Executing Marketplace Transactions

For marketplace operations, always use the `useMarketplaceWallet` hook:

```typescript
import { useMarketplaceWallet } from "@/app/features/marketplace/hooks/useMarketplaceWallet";

function BuyNFTButton({ listingId }) {
  const { 
    isConnected, 
    account, 
    executeMarketplaceFunction 
  } = useMarketplaceWallet();

  const handleBuy = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet");
      return;
    }
    
    await executeMarketplaceFunction("buyWithMetis", { 
      listingId 
    }, {
      description: "Buying NFT",
      onSuccess: () => {
        toast.success("Successfully purchased NFT!");
      }
    });
  };

  return <button onClick={handleBuy}>Buy Now</button>;
}
```

### 3. General Transactions

For general (non-marketplace) transactions, use the `useWalletTransaction` hook:

```typescript
import { useWalletTransaction } from "@/app/features/wallet/useWalletTransaction";

function TransferButton({ to, amount }) {
  const { executeTransaction, status } = useWalletTransaction();
  
  const handleTransfer = async () => {
    await executeTransaction({
      transaction: {
        to: to as `0x${string}`,
        value: BigInt(amount * 1e18),
        data: "0x" as `0x${string}`
      },
      description: `Sending ${amount} METIS to ${to}`,
      metadata: {
        type: "transfer",
        recipient: to,
        amount: amount
      }
    });
  };
  
  return (
    <button 
      onClick={handleTransfer} 
      disabled={status.loading}
    >
      {status.loading ? "Sending..." : "Send Tokens"}
    </button>
  );
}
```

## Handling Function Parameters

### DON'T ❌

```typescript
// Don't pass direct wallet objects or accounts as parameters
export async function myFunction(
  params: { itemId: string },
  wallet: any // Bad: untyped wallet parameter
) {
  // Bad: manual wallet detection logic
  let account;
  if (wallet && typeof wallet.getAccount === 'function') {
    account = wallet.getAccount();
  } else if (wallet && wallet.account) {
    account = wallet.account;
  }
  
  // Implementation...
}
```

### DO ✅

```typescript
// Use strongly-typed WalletAccount parameter
import { WalletAccount } from "@/app/features/wallet/types";

export async function myFunction(
  params: { itemId: string },
  account: WalletAccount
): Promise<TransactionResult> {
  // Validate account properly
  if (!account || !account.address) {
    throw new Error("Valid wallet account required");
  }
  
  // Implementation...
}
```

## Error Handling

### DON'T ❌

```typescript
try {
  // Transaction code
} catch (error) {
  console.error("Error:", error);
  alert("Transaction failed"); // Bad: using alert
}
```

### DO ✅

```typescript
import { formatError } from "@/app/features/wallet/utils";
import { useToast } from "@/components/feedback/Toast/useToast";

const { toast } = useToast();

try {
  // Transaction code
  toast.success("Transaction successful");
} catch (error) {
  const errorMessage = formatError(error);
  console.error("Transaction error:", error);
  toast.error("Transaction failed", errorMessage);
}
```

## Transaction Tracking

Always use the TransactionProvider for consistent transaction tracking:

```typescript
import { useTransaction } from "@/app/features/wallet/hooks/useTransaction";

function MyComponent() {
  const { 
    addTransaction, 
    updateTransaction,
    transactions
  } = useTransaction();
  
  const handleAction = async () => {
    // Add a transaction to start tracking
    const txId = addTransaction("loading", "Performing action");
    
    try {
      const result = await performAction();
      // Update with success
      updateTransaction(txId, "success", "Action complete", result.txHash);
    } catch (error) {
      // Update with error
      updateTransaction(txId, "error", formatError(error));
    }
  };
  
  return (
    <div>
      <button onClick={handleAction}>Perform Action</button>
      
      {/* Display recent transactions */}
      <div className="transactions">
        {transactions.map(tx => (
          <div key={tx.id} className={`transaction ${tx.type}`}>
            {tx.message}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Network Switching

Use the standardized network switch function:

```typescript
import { useWallet } from "@/app/features/wallet/hooks/useWallet";
import { metisChain } from "@/app/config/chain";

function NetworkSwitcher() {
  const { handleNetworkSwitch, chain } = useWallet();
  
  const switchToMetis = async () => {
    await handleNetworkSwitch(metisChain.id);
  };
  
  return (
    <div>
      {chain?.id !== metisChain.id ? (
        <button onClick={switchToMetis}>
          Switch to Metis
        </button>
      ) : (
        <span>Connected to Metis</span>
      )}
    </div>
  );
}
```

## Component Integration Patterns

### For Marketplace Components

1. Use the `useMarketplaceWallet` hook for all marketplace operations
2. Show appropriate connection prompts when wallet is not connected
3. Handle loading states and errors consistently
4. Display transaction status using the standardized pattern

```jsx
function MarketplaceComponent() {
  const { 
    isConnected,
    executeMarketplaceFunction,
    isLoading
  } = useMarketplaceWallet();
  
  if (!isConnected) {
    return <ConnectWalletPrompt />;
  }
  
  return (
    <div>
      <button 
        onClick={() => executeMarketplaceFunction("functionName", params)}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Perform Action"}
      </button>
    </div>
  );
}
```

## Testing Wallet Functionality

For testing, use the mock wallet interfaces:

```typescript
import { WalletAccount } from "@/app/features/wallet/types";

// Mock account for testing
const mockAccount: WalletAccount = {
  address: "0x123...def" as `0x${string}`,
  isConnected: true,
  chainId: 1088, // Metis chain ID
};

// Test your function
describe("myFunction", () => {
  it("should handle wallet operations correctly", async () => {
    const result = await myFunction({ itemId: "123" }, mockAccount);
    expect(result.success).toBe(true);
  });
});
```

## Summary

By following these standardized patterns:

1. Your code will be more consistent and maintainable
2. Error handling will be uniform across the application  
3. Users will receive consistent feedback for all wallet operations
4. New developers can easily understand and follow the established patterns
5. Future wallet integrations will require minimal changes to components

Remember to always use the standardized hooks (`useWallet`, `useMarketplaceWallet`, `useWalletTransaction`) rather than direct interactions with wallet providers or blockchain libraries. 