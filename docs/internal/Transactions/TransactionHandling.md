# Delphi Transaction Handling

## Overview

Delphi uses ThirdWeb's V5 SDK to handle blockchain transactions for marketplace operations. The implementation follows a modern, hook-based approach that supports both legacy compatibility and direct ThirdWeb integration.

This document explains the current transaction architecture, which was migrated from a custom transaction framework to ThirdWeb's recommended patterns.

## Architecture

The transaction system consists of several key components:

### 1. ThirdWeb Account and Wallet Integration

- **ThirdWeb Hooks**: `useActiveWallet` and `useActiveAccount` provide direct access to wallet functionality
- **Chain Configuration**: Metis chain configuration is centralized in `config/chain.ts`
- **Client Management**: ThirdWeb client is created in `config/client.ts`

### 2. Core Transaction Components

#### `useMarketplaceWallet` Hook

Located in `src/app/features/marketplace/hooks/useMarketplaceWallet.ts`, this is the central hook for all marketplace transaction operations. It provides:

- **Transaction State Management**: Tracks loading, success, and error states
- **ThirdWeb Account Access**: Accesses the ThirdWeb account for transaction signing
- **Two Transaction Methods**:
  - `executeMarketplaceFunction`: Legacy approach that routes to `prepareTransactions.ts`
  - `executeDirectTransaction`: Modern approach that directly uses ThirdWeb's `sendAndConfirmTransaction`

```typescript
// Example of the modern approach
const receipt = await executeDirectTransaction(
  transaction,
  {
    description: "Transaction description",
    onSuccess: (result) => {
      // Handle success
    }
  }
);
```

#### Transaction Utilities

Located in `src/app/features/marketplace/services/utils.ts`:

- `executeThirdwebTransaction`: Adapter function that converts our wallet account to ThirdWeb format
- `toThirdwebAccount`: Converts our WalletAccount to ThirdWeb compatible format (in `wallet/utils.ts`)
- Helper functions for formatting prices, handling IPFS URLs, etc.

### 3. Transaction Flow

#### Direct Transaction Flow (Recommended for new code)

1. Import the `useMarketplaceWallet` hook
2. Get the `executeDirectTransaction` function
3. Create a ThirdWeb transaction (e.g., using `buyFromListing`)
4. Call `executeDirectTransaction` with the transaction and configuration
5. The hook handles the transaction execution, confirmation, and error handling

#### Example (from NFTCard.tsx):

```typescript
// Get the hook
const { executeDirectTransaction } = useMarketplaceWallet();

// Create a client
const localClient = createThirdwebClient({ clientId: THIRDWEB_CLIENT_ID });

// Get marketplace contract
const marketplaceContract = getContract({
  client: localClient,
  chain: metisChain,
  address: MARKETPLACE_ADDRESS
});

// Create the transaction
const transaction = buyFromListing({
  contract: marketplaceContract,
  listingId: BigInt(listingId),
  quantity: 1n,
  recipient: account.address
});

// Execute the transaction
const receipt = await executeDirectTransaction(
  transaction,
  {
    description: `Buying NFT #${tokenId}`,
    onSuccess: (result) => {
      // Handle success
    }
  }
);
```

### 4. Legacy Transaction Flow (For compatibility)

1. Import the `useMarketplaceWallet` hook
2. Get the `executeMarketplaceFunction` function
3. Call it with the function name and parameters
4. The function maps to implementations in `prepareTransactions.ts`

## Simplified ThirdWeb Implementations

The codebase contains simplified implementations of marketplace operations based on ThirdWeb's recommended patterns:

### Listings

Located in `src/app/features/marketplace/services/listings/simplified.ts`:

- `createDirectListingSimplified`: Create a direct listing
- `buyFromDirectListingSimplified`: Buy from a direct listing
- `cancelListingSimplified`: Cancel a listing

### Auctions

Located in `src/app/features/marketplace/services/auctions/simplified.ts`:

- `createAuctionSimplified`: Create an auction
- `placeBidSimplified`: Place a bid on an auction
- `buyoutAuctionSimplified`: Buy out an auction
- `collectAuctionNFTSimplified`: Collect NFT after auction ends
- `collectAuctionPayoutForSellerSimplified`: Collect payments for sellers

## Error Handling

Error handling is centralized in the transaction hooks with multiple layers:

1. **Transaction Preparation Validation**: Input validation in each transaction function
2. **ThirdWeb Error Handling**: Errors from ThirdWeb transactions are caught and formatted
3. **Toast Notifications**: User-friendly error messages via toast notifications
4. **Debugging Information**: Detailed logging in the console for developers

## UI Integration

Transaction status is communicated to the user through:

1. **Toast Notifications**: For status updates, pending operations, and results
2. **Loading States**: Components have loading states for transaction processing
3. **Success Redirects**: Automatic redirects after successful transactions (e.g., to profile page)

## Best Practices for Developers

When implementing transactions in Delphi:

1. **Use the Direct Approach**: Prefer `executeDirectTransaction` for new code
2. **Type Safety**: Use proper typing for all parameters
3. **Error Handling**: Consider edge cases and provide clear error messages
4. **Testing**: Test transactions on testnet before deploying to production
5. **Loading States**: Always show loading indicators during transactions
6. **Success Handling**: Provide clear success feedback and next steps

## Migration Status

The migration from the legacy transaction system to ThirdWeb's direct approach is complete. All marketplace operations (listings and auctions) use the new pattern, with backward compatibility maintained for existing code.

Future enhancements could include:

1. Additional testing with actual transactions
2. UI improvements for transaction progress tracking
3. Enhanced error recovery mechanisms
4. Consolidation of transaction-related code
5. Complete transition to the direct transaction approach 