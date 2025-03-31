# Currency Conversion Issues in Delphi

## Current Issues

We've identified several issues with currency conversion and price display throughout the app:

1. **Inconsistent Wei/METIS conversion**:
   - Some values come as full Wei values (e.g., 10000000000000000000000000000000000)
   - Some values come pre-formatted as METIS (e.g., "0.01", "0.0121")
   - Some values come as Wei but with fewer digits (e.g., 10000000000000000.0)

2. **Auction vs. Direct Listing Detection**:
   - Auction detection is currently based on hardcoded IDs
   - Need a more reliable way to distinguish listing types

3. **Price formatting inconsistencies**:
   - Some prices show with exponents (0.00e+0)
   - Some small values need more precision (0.0121)
   - Regular values should have fewer decimal places

## Logs Analysis

From our debugging logs, we observed:

```
Auction 4 price details:
- Minimum bid: 10000000000000000.0 METIS (from 10000000000000000000000000000000000 wei)
- Buyout price: 1000000000000000000.0 METIS (from 1000000000000000000000000000000000000 wei)

Current winning bid for auction 7: 0.0121 METIS (from 12100000000000000 wei)
Auction 7 price details:
- Minimum bid: 0.01 METIS (from 10000000000000000 wei)
- Buyout price: 0.5 METIS (from 500000000000000000 wei)
```

This shows the complexity of the data we're handling:
- Extremely large wei values for some auctions
- Pre-formatted METIS values in others
- Different formats even within the same auction

## Solution Path

### 1. Centralized Currency Utility

We should create a centralized currency utility module that handles all conversions:

```typescript
// Proposed structure in src/app/utils/currency.ts

// Convert various wei formats to METIS
export function weiToMetis(value: string | number | bigint): number {
  // Logic to detect and handle various wei formats
}

// Format METIS values with appropriate precision
export function formatMetis(value: number | string, options?: FormatOptions): string {
  // Smart formatting based on value size
}

// Single function that handles both conversion and formatting
export function formatCryptoCurrency(value: any, options?: FormatOptions): string {
  // Detect format, convert if needed, then format
}
```

### 2. Listing Type Detection

Implement a more robust detection system for listing types:

```typescript
// Proposed type definition
export enum ListingType {
  DIRECT = 'direct',
  AUCTION = 'auction',
  UNKNOWN = 'unknown'
}

export function detectListingType(listing: IListingWithNFT): ListingType {
  // Use multiple signals (timestamps, data fields, etc.)
}
```

### 3. Price Display Components

Create specialized components for different price display needs:

```tsx
// For simple price displays
<PriceDisplay value={listing.pricePerToken} />

// For auction displays
<AuctionPriceDisplay 
  minimumBid={listing.pricePerToken}
  currentBid={listing.currentBid}
  buyoutPrice={listing.buyoutPrice}
/>
```

## Next Steps

1. **Audit existing conversions**: Identify all places in the codebase doing currency conversion
2. **Create central utility**: Implement the currency.ts module
3. **Refactor components**: Update FeaturedCard.tsx and other components to use the new utilities
4. **Add tests**: Create test cases for the various conversion scenarios
5. **Standardize interfaces**: Ensure we have consistent typing for price/currency data

## Affected Components

- FeaturedCard.tsx
- NFTCard.tsx
- NFTDetailView.tsx
- And potentially many others

## References

- [Ethereum Unit Converter](https://eth-converter.com/)
- [ThirdWeb Docs on Currency](https://portal.thirdweb.com/react/react.usetoken) 