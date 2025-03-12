# Component Migration Guides

This document provides comprehensive technical guides for migrating specific components from ethers.js to Thirdweb V5.

## Table of Contents
1. [Marketplace Service Migration](#marketplace-service-migration)
2. [Contract Hooks Migration](#contract-hooks-migration)
3. [NFT Components Migration](#nft-components-migration)

---

## Marketplace Service Migration

The `marketplace.ts` file is one of the most critical files in the Delphi NFT Marketplace, containing various contract interaction functions.

### Current Structure

The current `marketplace.ts` file contains the following key functions:

1. `getAllListings()`: Fetches all active listings from the marketplace
2. `getListing(listingId)`: Fetches a specific listing by ID
3. `buyWithMetis(listingId, wallet)`: Buys an NFT using native METIS
4. `getWMetisBalance(address)`: Gets a user's WMETIS balance
5. `buyWithWMetis(listingId, wallet)`: Buys an NFT using WMETIS

The file currently has a hybrid implementation that attempts to use Thirdweb V5 functions with fallbacks to ethers.js methods, which adds unnecessary complexity.

### Migration Strategy

#### 1. Remove Ethers.js Imports

```typescript
// REMOVE:
import { ethers } from "ethers";

// REPLACE WITH:
import { toEther, toWei, formatUnits, parseUnits } from "thirdweb/utils";
```

#### 2. Unify Contract Interaction Approach

Instead of having a hybrid approach with fallbacks, we'll standardize on Thirdweb V5:

```typescript
// FOR ALL CONTRACT INTERACTIONS:
const contract = await getContract({
  client,
  chain: metisChain,
  address: CONTRACT_ADDRESS as `0x${string}`,
});

// USE THE READ PATTERN:
const result = await contract.read.functionName([param1, param2]);

// USE THE WRITE PATTERN:
const transaction = await prepareContractCall({
  contract,
  method: "function functionName(...) returns (...)",
  params: [param1, param2],
});

const txResult = await sendTransaction({
  transaction,
  account,
});
```

#### 3. Update `getAllListings()` Function

```typescript
export const getAllListings = async (): Promise<IListingWithNFT[]> => {
  try {
    // Get the contract with ThirdWeb v5
    const contract = await getContract({
      client,
      chain: metisChain,
      address: CONTRACT_ADDRESS as `0x${string}`,
    });
    
    console.log(`Getting marketplace contract at ${CONTRACT_ADDRESS}`);
    
    // Use Thirdweb V5 marketplace extension
    const listings = await getThirdwebAllListings({ contract });
    console.log(`Found ${listings.length} listings using ThirdWeb v5`);
    
    // Convert BigInt values to strings to avoid serialization issues
    const processedListings = listings.map(listing => ({
      id: listing.id.toString(),
      creatorAddress: listing.creatorAddress,
      assetContractAddress: listing.assetContractAddress,
      tokenId: listing.tokenId.toString(),
      quantity: listing.quantity.toString(),
      currencyContractAddress: listing.currencyContractAddress,
      pricePerToken: listing.pricePerToken.toString(),
      startTimeInSeconds: listing.startTimeInSeconds?.toString() || '0',
      endTimeInSeconds: listing.endTimeInSeconds?.toString() || '0',
    }));
    
    // Fetch metadata for each listing
    const enhancedListings = await Promise.all(
      processedListings.map(async (listing) => {
        try {
          return await getListing(listing.id.toString());
        } catch (error) {
          console.error(`Error enhancing listing ${listing.id}:`, error);
          return null;
        }
      })
    );
    
    // Filter out null values and return
    return enhancedListings.filter(listing => listing !== null) as IListingWithNFT[];
  } catch (error) {
    console.error("Error fetching listings:", error);
    throw error;
  }
};
```

#### 4. Update `getListing()` Function

```typescript
export const getListing = async (listingId: string): Promise<IListingWithNFT | null> => {
  try {
    // Get the contract with ThirdWeb v5
    const contract = await getContract({
      client,
      chain: metisChain,
      address: CONTRACT_ADDRESS as `0x${string}`,
    });
    
    // Use Thirdweb V5 marketplace extension
    const listing = await getThirdwebListing({ 
      contract, 
      listingId: BigInt(listingId) 
    });
    
    if (!listing) {
      return null;
    }
    
    // Get NFT metadata
    const nftContract = await getContract({
      client,
      chain: metisChain,
      address: listing.assetContractAddress as `0x${string}`,
    });
    
    // Fetch token metadata
    let metadata: INFTMetadata;
    try {
      const tokenURI = await nftContract.read.tokenURI([listing.tokenId]);
      
      // Fetch metadata from tokenURI
      let formattedURI = formatIPFSUrl(tokenURI);
      const response = await fetch(formattedURI);
      const jsonMetadata = await response.json();
      
      // Format image URL if needed
      let imageUrl = formatIPFSUrl(jsonMetadata.image || "");
      
      // Create standardized metadata
      metadata = {
        image: imageUrl,
        name: jsonMetadata.name || `NFT #${listing.tokenId}`,
        description: jsonMetadata.description || "",
        attributes: jsonMetadata.attributes || []
      };
    } catch (err) {
      console.error(`Error fetching NFT metadata for token ${listing.tokenId}:`, err);
      metadata = {
        image: "",
        name: `NFT #${listing.tokenId}`,
        description: "Metadata unavailable",
        attributes: []
      };
    }
    
    // Get collection name
    let collectionName = "Unknown Collection";
    try {
      collectionName = await nftContract.read.name();
    } catch (nameError) {
      console.warn("Could not fetch collection name", nameError);
    }
    
    // Format price
    const formattedPrice = toEther(listing.pricePerToken.toString());
    
    return {
      listingId: listing.id.toString(),
      tokenId: listing.tokenId.toString(),
      quantity: listing.quantity.toString(),
      pricePerToken: formattedPrice,
      startTimestamp: Number(listing.startTimeInSeconds || '0'),
      endTimestamp: Number(listing.endTimeInSeconds || '0'),
      listingCreator: listing.creatorAddress,
      assetContract: listing.assetContractAddress,
      currency: listing.currencyContractAddress,
      tokenType: 0, // Assuming ERC721
      status: 1, // Assuming active
      reserved: false,
      metadata,
      collectionName,
      sellerAddress: listing.creatorAddress
    } as IListingWithNFT;
  } catch (error) {
    console.error(`Error fetching listing ${listingId}:`, error);
    return null;
  }
};
```

#### 5. Update `buyWithMetis()` Function

```typescript
export async function buyWithMetis(
  listingId: string, 
  account: Account
): Promise<{transactionHash: string, listingId: string, success: boolean}> {
  try {
    // Get the marketplace contract
    const contract = await getContract({
      client,
      chain: metisChain,
      address: CONTRACT_ADDRESS as `0x${string}`,
    });
    
    // Get the listing details to determine price
    const listing = await getThirdwebListing({ 
      contract, 
      listingId: BigInt(listingId) 
    });
    
    if (!listing) {
      throw new Error(`Listing ${listingId} not found`);
    }
    
    // Execute the buy transaction using Thirdweb marketplace extension
    const tx = await thirdwebBuyFromListing({
      contract,
      listingId: BigInt(listingId),
      quantity: 1n, // Usually 1 for NFTs
      buyer: account.address,
    });
    
    // Return transaction information
    return {
      transactionHash: tx.transactionHash,
      listingId,
      success: true
    };
  } catch (error) {
    console.error(`Error buying with METIS for listing ${listingId}:`, error);
    throw error;
  }
}
```

#### 6. Update `getWMetisBalance()` Function

```typescript
export const getWMetisBalance = async (address: string): Promise<string> => {
  try {
    // Get the WMETIS contract
    const contract = await getContract({
      client,
      chain: metisChain,
      address: WMETIS_CONTRACT_ADDRESS as `0x${string}`,
    });
    
    // Call balanceOf function
    const balance = await contract.read.balanceOf([address]);
    
    // Format the balance to a human-readable number
    return toEther(balance.toString());
  } catch (error) {
    console.error(`Error getting WMETIS balance for ${address}:`, error);
    return "0";
  }
};
```

#### 7. Update `buyWithWMetis()` Function

```typescript
export const buyWithWMetis = async (
  listingId: string, 
  account: Account
): Promise<{transactionHash: string, listingId: string, success: boolean}> {
  try {
    // Get the marketplace contract
    const marketplaceContract = await getContract({
      client,
      chain: metisChain,
      address: CONTRACT_ADDRESS as `0x${string}`,
    });
    
    // Get the WMETIS contract
    const wmetisContract = await getContract({
      client,
      chain: metisChain,
      address: WMETIS_CONTRACT_ADDRESS as `0x${string}`,
    });
    
    // Get the listing details to determine price
    const listing = await getThirdwebListing({ 
      contract: marketplaceContract, 
      listingId: BigInt(listingId) 
    });
    
    if (!listing) {
      throw new Error(`Listing ${listingId} not found`);
    }
    
    // Get the total price
    const totalPrice = listing.pricePerToken;
    
    // First, approve the marketplace to spend WMETIS
    const approveCall = prepareContractCall({
      contract: wmetisContract,
      method: "function approve(address spender, uint256 amount) external returns (bool)",
      params: [CONTRACT_ADDRESS, totalPrice],
    });
    
    const approveTx = await sendTransaction({
      transaction: approveCall,
      account,
    });
    
    console.log("Approve transaction:", approveTx);
    
    // Now buy the NFT from the marketplace
    const tx = await thirdwebBuyFromListing({
      contract: marketplaceContract,
      listingId: BigInt(listingId),
      quantity: 1n, // Usually 1 for NFTs
      buyer: account.address,
    });
    
    return {
      transactionHash: tx.transactionHash,
      listingId,
      success: true
    };
  } catch (error) {
    console.error(`Error buying with WMETIS for listing ${listingId}:`, error);
    throw error;
  }
};
```

### Testing Checklist

1. Test `getAllListings()`:
   - Ensure it returns all active listings
   - Verify metadata is correctly retrieved
   - Check performance compared to the previous implementation

2. Test `getListing(listingId)`:
   - Test with valid listing IDs
   - Test with invalid listing IDs
   - Verify all metadata fields are correctly populated

3. Test `buyWithMetis(listingId, wallet)`:
   - Test buying an NFT with native METIS
   - Verify transaction success
   - Check error handling for various edge cases

4. Test `getWMetisBalance(address)`:
   - Verify it returns the correct balance
   - Test with addresses that have and don't have WMETIS

5. Test `buyWithWMetis(listingId, wallet)`:
   - Test buying an NFT with WMETIS
   - Verify approval transaction works
   - Verify buy transaction works

### Common Patterns to Watch For

1. `ethers.BigNumber` → Use native `bigint` instead
2. `ethers.utils.formatEther()` → Use `toEther()` instead
3. `ethers.utils.parseEther()` → Use `toWei()` instead
4. `ethers.utils.formatUnits()` → Use `formatUnits()` from thirdweb/utils
5. `new ethers.Contract()` → Use `getContract()` instead
6. Direct contract calls → Use read/write pattern from Thirdweb V5

---

## Contract Hooks Migration

### useMarketplaceMint.ts

The `useMarketplaceMint.ts` hook already uses some V5 functions but needs to be fully migrated to eliminate any remaining ethers.js dependencies.

#### Current Structure

This hook handles the wrapping of METIS into WMETIS and then using that WMETIS to buy NFTs. It includes:

1. A wrapper function that handles the deposit and approval flow
2. Error handling for transactions
3. Transaction status updates via a notification system

#### Migration Strategy

1. Update any remaining ethers.js references:

```typescript
// FROM (already migrated):
const depositCall = prepareContractCall({
  contract: wmetisContract,
  method: "function deposit() external payable",
  params: [],
  value: totalPriceWei,
});

const depositTx = await sendTransaction({
  transaction: depositCall,
  account,
});

// Enhanced error handling:
try {
  // transaction code
} catch (error) {
  if (error.message?.includes("user rejected")) {
    updateTransaction(txId, "error", "Transaction was rejected by the user");
  } else {
    updateTransaction(txId, "error", error.message || "Transaction failed");
  }
  throw error;
}
```

#### Best Practices

1. **Transaction Flow**:
   - Clearly separate steps (deposit, approve, buy)
   - Add appropriate waiting periods between transactions
   - Show clear status updates to the user

2. **Error Handling**:
   - Handle specific error types differently
   - Provide user-friendly error messages
   - Log detailed errors for debugging

3. **Performance**:
   - Add appropriate caching for repeated contract calls
   - Optimize for minimum gas costs

---

## NFT Components Migration

### NFTCard.tsx

The NFTCard component displays individual NFTs and handles quick-buy functionality.

#### Migration Strategy

```typescript
// FROM (if using ethers.js):
const buyTx = await buyWithMetis(listingId);
// TO:
const buyTx = await buyWithMetis(listingId, account);

// Improve loading states:
const [isBuying, setIsBuying] = useState(false);

const handleQuickBuy = async (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  
  if (!account) {
    // Show connect wallet message
    return;
  }
  
  setIsBuying(true);
  try {
    await buyWithMetis(listingId.toString(), account);
    // Success message
  } catch (error) {
    // Error handling
  } finally {
    setIsBuying(false);
  }
};
```

### NFTDetailView.tsx

The NFTDetailView component displays detailed information about an NFT and provides buying options.

#### Migration Strategy

1. Update data fetching to use Thirdweb V5 hooks
2. Replace ethers.js utility functions
3. Implement loading and error states properly
4. Ensure all buying functions use the updated marketplace.ts functions

### ListingOptionsModal.tsx

This component handles the creation of new NFT listings.

#### Migration Strategy

1. Update form submission to use Thirdweb V5 hooks
2. Replace any ethers.js formatting functions
3. Add proper validation and error handling
4. Improve user feedback during transaction submission

---

## General Component Migration Guidelines

### 1. Follow Clean Component Structure

```typescript
// Component interface
interface ComponentProps {
  // Clear prop definitions
}

// Component implementation
export function Component({ prop1, prop2 }: ComponentProps) {
  // State and hooks
  
  // Helper functions
  
  // Event handlers
  
  // Render
  return (
    // JSX
  );
}
```

### 2. Consistent Contract Interaction

```typescript
// For read operations in components
const { data, isLoading, error } = useReadContract({
  contract,
  method: "methodName",
  params: [param1, param2]
});

// For write operations
const { mutate, isLoading } = useSendTransaction();

const handleSubmit = async () => {
  try {
    await mutate({
      contract,
      method: "methodName",
      params: [param1, param2]
    });
    // Success handling
  } catch (error) {
    // Error handling
  }
};
```

### 3. Loading and Error States

Always implement proper loading and error states:

```tsx
if (isLoading) {
  return <LoadingComponent />;
}

if (error) {
  return <ErrorComponent message={error.message} />;
}

// Render successful state
```

### 4. Testing Checklist for Each Component

1. Verify component renders without errors
2. Test all interactive elements
3. Verify data fetching and display
4. Test error states and recovery
5. Verify transaction flows work end-to-end 