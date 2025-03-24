# Documentation Directory

This directory contains all documentation for the Delphi NFT Marketplace project.

## Table of Contents

### Project Planning
- [ROADMAP.md](ROADMAP.md) - Project roadmap and planned features
- [TECHSTACK.md](TECHSTACK.md) - Technical stack overview
- [DELPHI_DESIGN_SYSTEM.md](DELPHI_DESIGN_SYSTEM.md) - Design system guidelines

### Thirdweb V5 Migration
- [Sunday March 9 Thidweb v5 Migration and upgrades.md](Sunday%20March%209%20Thidweb%20v5%20Migration%20and%20upgrades.md) - Main migration plan
- [Ethers to Thirdweb V5 Conversion Guide.md](Ethers%20to%20Thirdweb%20V5%20Conversion%20Guide.md) - Conversion patterns from ethers.js to Thirdweb V5
- [Project Structure Template.md](Project%20Structure%20Template.md) - Recommended project structure
- [Task 1 Summary.md](Task%201%20Summary.md) - Summary of Task 1 (Environment Setup)

## Documentation Process

All documentation for this project should be kept in this directory. When adding new documentation:

1. Use descriptive filenames
2. Update this README.md with new entries
3. Keep documents focused on specific topics
4. Use Markdown formatting consistently

## References

- [Thirdweb V5 Documentation](../thirdweb_typescript_docs/)
- [Thirdweb Marketplace Template](../reference/thirdweb-marketplace-template/)

# ThirdWeb Marketplace Standardization Guide

This folder contains guides for standardizing our marketplace functions to use ThirdWeb directly, eliminating unnecessary wrapper functions like `buyWithMetis` and `buyFromDirectListing`.

## Documents in this Folder

1. **standardizing-marketplace-functions.md**  
   A comprehensive guide outlining the approach to standardize our marketplace functions, with detailed examples for each function type (direct listings, auctions, etc.).

2. **standardizing-marketplace-example.md**  
   A concrete example of refactoring the `NFTDetailView.tsx` component, showing both the current implementation and the refactored version using ThirdWeb directly.

## Key Benefits of This Standardization

1. **Improved maintainability** - Easier to update when ThirdWeb changes
2. **Reduced code complexity** - Fewer abstraction layers 
3. **Consistent patterns** - Direct ThirdWeb calls throughout the app
4. **Better type safety** - Using ThirdWeb's TypeScript definitions
5. **Easier debugging** - Clear code path to the library

## Implementation Approach

The standardization follows this approach:

1. Replace custom wrapper functions with direct ThirdWeb function calls
2. Use `useActiveAccount()` consistently for transactions
3. Maintain the same transaction tracking and UI behavior
4. Apply consistent error handling patterns

## Getting Started

1. Read the standardizing-marketplace-functions.md document first to understand the overall approach
2. Review the standardizing-marketplace-example.md to see a concrete example
3. Follow the migration checklist in the main document
4. Start with low-risk components and test thoroughly

## Example Implementation

```typescript
// Before: Using custom wrapper function
const handleBuy = async () => {
  const result = await buyWithMetis(listingId, wallet);
  // ...handle result
};

// After: Using ThirdWeb directly
const handleBuy = async () => {
  const marketplaceContract = getContract({
    client,
    chain: metisChain,
    address: MARKETPLACE_ADDRESS,
  });
  
  const transaction = buyFromListing({
    contract: marketplaceContract,
    listingId: BigInt(listingId),
    quantity: 1n,
    recipient: account.address as `0x${string}`
  });
  
  const tx = await sendTransaction({
    transaction,
    account
  });
  
  // ...wait for receipt and handle result
};
``` 