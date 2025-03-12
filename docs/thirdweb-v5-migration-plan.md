# Thirdweb SDK V5 Migration Plan

This document outlines the step-by-step plan to migrate our Delphi NFT Marketplace from ethers.js to Thirdweb SDK V5. We'll focus on the core files that interact with the marketplace contract in a logical order to ensure a smooth transition.

## Migration Order

1. Core Configuration Files
2. Interface Definitions
3. UI Components
4. Page Components
5. Provider Components

## 1. Core Configuration Files

### client.ts

Current file contains multiple contract getter functions that use ethers.js. We'll replace these with Thirdweb V5 implementations.

```typescript
// CURRENT (ethers.js based)
export const getMarketplaceContract = () => { ... }
export const getWMetisContract = () => { ... }
export const getERC721Contract = (address: string) => { ... }
export const getERC1155Contract = (address: string) => { ... }

// NEW (Thirdweb V5 based)
import { createThirdwebClient, getContract } from "thirdweb";
import { chain } from "./chain";

// Create a client
export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

// Contract addresses
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT as `0x${string}`;
export const WMETIS_ADDRESS = process.env.NEXT_PUBLIC_WMETIS_CONTRACT as `0x${string}`;

// Helper function to get marketplace contract
export const getMarketplaceContract = async () => {
  return await getContract({
    client,
    chain,
    address: CONTRACT_ADDRESS,
  });
};

// Helper function to get WMETIS contract
export const getWMetisContract = async () => {
  return await getContract({
    client,
    chain,
    address: WMETIS_ADDRESS,
  });
};

// Helper function to get ERC721 contract
export const getERC721Contract = async (address: string) => {
  return await getContract({
    client,
    chain,
    address: address as `0x${string}`,
  });
};

// Helper function to get ERC1155 contract
export const getERC1155Contract = async (address: string) => {
  return await getContract({
    client,
    chain,
    address: address as `0x${string}`,
  });
};
```

### chain.ts

Update the chain definition to use Thirdweb V5's `defineChain` function.

```typescript
import { defineChain } from "thirdweb";

// Define Metis Andromeda chain
export const chain = defineChain(1088);

// For more detailed configuration:
export const metisChain = defineChain({
  id: 1088,
  name: "Metis Andromeda",
  rpc: "https://andromeda.metis.io/?owner=1088",
  nativeCurrency: {
    name: "Metis",
    symbol: "METIS",
    decimals: 18,
  },
  blockExplorers: [
    {
      name: "Metis Explorer",
      url: "https://andromeda-explorer.metis.io",
    },
  ],
});
```

## 2. Interface Definitions

### interfaces.ts

Update the interfaces to align with Thirdweb V5's data structures. The core interfaces can remain largely the same, but we'll ensure they're compatible with Thirdweb V5's return types.

```typescript
// No major changes needed for the interfaces themselves
// They're already well-structured for the migration

// We'll ensure the types match Thirdweb V5's return values
// For example, ensuring BigInt is used where appropriate
```

## 3. UI Components

### NFTCard.tsx

Update the NFTCard component to use Thirdweb V5 hooks and methods.

```typescript
// Replace ethers.js imports
import { useActiveAccount, useActiveWallet } from "thirdweb/react";

// Replace ethers-based transaction handling
const handleQuickBuy = async (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  
  if (!account || !wallet) {
    addTransaction("error", "Connect your wallet first to buy this NFT");
    return;
  }
  
  try {
    setIsBuying(true);
    addTransaction("loading", `Buying NFT #${tokenId} with METIS...`);
    
    // Use Thirdweb V5 buyWithMetis function
    const result = await buyWithMetis(listingId, wallet);
    
    if (result && result.success) {
      addTransaction("success", `NFT purchased successfully!`, result.transactionHash);
    }
  } catch (error: any) {
    console.error(`NFTCard ${listingId}: Error buying NFT:`, error);
    addTransaction("error", `Error buying NFT: ${error.message}`);
  } finally {
    setIsBuying(false);
  }
};
```

### NFTDetailView.tsx

Update the NFTDetailView component to use Thirdweb V5 hooks and methods.

```typescript
// Replace ethers.js imports
import { useActiveAccount, useActiveWallet } from "thirdweb/react";

// Replace ethers-based balance checking
useEffect(() => {
  async function checkWMetisBalance() {
    if (account) {
      try {
        const balance = await getWMetisBalance(account.address);
        setWmetisBalance(balance);
        
        // Check if user has enough WMETIS
        const priceValue = parseFloat(pricePerToken);
        const balanceValue = parseFloat(balance);
        setEnoughWmetis(balanceValue >= priceValue);
      } catch (err) {
        console.error("Error checking WMETIS balance:", err);
      }
    }
  }
  
  if (account) {
    checkWMetisBalance();
  }
}, [account, pricePerToken]);

// Replace ethers-based buy functions
const handleBuyWithMetis = async () => {
  if (!account || !wallet) {
    addTransaction("error", "Connect your wallet first to buy this NFT");
    return;
  }
  
  try {
    setIsLoading(true);
    addTransaction("loading", `Buying NFT with METIS...`);
    
    // Use Thirdweb V5 buyWithMetis function
    const result = await buyWithMetis(listingId, wallet);
    
    if (result && result.transactionHash) {
      addTransaction("success", "NFT purchased successfully with METIS!", result.transactionHash);
    } else {
      addTransaction("error", "Transaction completed but no transaction hash returned");
    }
  } catch (error: any) {
    console.error("Error buying with METIS:", error);
    addTransaction("error", error.message || "Failed to buy NFT");
  } finally {
    setIsLoading(false);
    setShowPaymentOptions(false);
  }
};

// Similarly update handleBuyWithWMetis
```

## 4. Page Components

### page.tsx (Home Page)

Update the home page to use Thirdweb V5 hooks and methods.

```typescript
// Replace ethers.js imports with Thirdweb V5
import { useActiveAccount } from "thirdweb/react";

// Update the fetchListings function
useEffect(() => {
  async function fetchListings() {
    try {
      setIsLoading(true);
      console.log("Fetching marketplace listings...");
      const fetchedListings = await getAllListings();
      console.log(`Fetched ${fetchedListings.length} listings from marketplace contract`);
      
      setListings(fetchedListings);
      
      // Select the first 3 listings as featured (or all if less than 3)
      setFeaturedListings(fetchedListings.slice(0, Math.min(3, fetchedListings.length)));
      
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching listings:", err);
      setError("Failed to load marketplace data. Please try again later.");
      setIsLoading(false);
    }
  }
  
  fetchListings();
}, []);
```

### nft/[id]/page.tsx (NFT Detail Page)

Update the NFT detail page to use Thirdweb V5 hooks and methods.

```typescript
// Replace ethers.js imports with Thirdweb V5
import { useActiveAccount } from "thirdweb/react";

// Update the fetchData function
async function fetchData() {
  try {
    setIsLoading(true);
    
    // Get the listing using Thirdweb V5
    const fetchedListing = await getListing(params.id);
    
    if (!fetchedListing) {
      setError("Listing not found");
      setIsLoading(false);
      return;
    }
    
    setListing(fetchedListing);
    
    // Get related listings (same collection)
    if (fetchedListing.assetContract) {
      const allListings = await getAllListings();
      const related = allListings.filter(
        l => l.assetContract === fetchedListing.assetContract && l.listingId !== fetchedListing.listingId
      );
      setRelatedListings(related);
    }
    
    setIsLoading(false);
  } catch (err) {
    console.error("Error fetching NFT:", err);
    setError("Failed to load NFT data. Please try again later.");
    setIsLoading(false);
  }
}
```

## 5. Provider Components

### TransactionProvider.tsx

The TransactionProvider doesn't directly interact with blockchain, so minimal changes are needed. We'll ensure it's compatible with Thirdweb V5's transaction results.

```typescript
// No major changes needed for the TransactionProvider itself
// It's already well-structured for the migration

// We'll ensure the transaction types match Thirdweb V5's return values
// For example, ensuring txHash is handled correctly
```

## Implementation Strategy

For each file, follow these steps:

1. **Analyze**: Review the current implementation and identify ethers.js dependencies
2. **Reference**: Check the Thirdweb V5 documentation for equivalent functionality
3. **Implement**: Replace ethers.js code with Thirdweb V5 equivalents
4. **Test**: Verify the functionality works as expected
5. **Refine**: Optimize and clean up the code

## Thirdweb V5 Documentation References

When implementing these changes, refer to the following documentation sections:

- **Core Functions**: For basic contract interaction, utility functions, and chain definitions
- **React Hooks**: For wallet connection, contract reading/writing, and transaction management
- **UI Components**: For pre-built UI elements that can simplify the implementation
- **Advanced Topics**: For complex scenarios and optimizations

## Common Replacements

| ethers.js | Thirdweb V5 |
|-----------|-------------|
| `ethers.Contract` | `getContract()` |
| `contract.functions.xyz()` | `contract.call("xyz", [args])` |
| `contract.xyz()` | `contract.call("xyz", [args])` |
| `signer.sendTransaction()` | `wallet.sendTransaction(tx)` |
| `ethers.utils.formatEther()` | `toEther(value)` |
| `ethers.utils.parseEther()` | `toWei(value)` |
| `BigNumber.from()` | `BigInt()` |

## Testing Strategy

After implementing each section:

1. Test wallet connection
2. Test reading NFT listings
3. Test viewing NFT details
4. Test buying NFTs with METIS
5. Test buying NFTs with WMETIS

## Conclusion

By following this migration plan, we'll successfully transition from ethers.js to Thirdweb SDK V5, resulting in a more maintainable and feature-rich NFT marketplace. The migration will be done in a logical order to minimize disruption and ensure a smooth transition. 