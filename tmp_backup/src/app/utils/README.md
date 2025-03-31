# Featured Section Helpers

This directory contains utility functions for managing the Featured Section of the NFT marketplace.

## featuredHelpers.ts

This file contains:

1. `FEATURED_COLLECTION_ADDRESSES`: An array of NFT contract addresses that should be featured on the homepage carousel.

2. `filterFeaturedListings()`: Helper function that filters a list of NFT listings to only include those from the featured collections.

3. `getFeaturedCollectionListings()`: Function that fetches all marketplace listings and filters them to only include listings from the featured collections.

## How to Use

### Adding or Changing Featured Collections

To modify which collections are featured, simply edit the `FEATURED_COLLECTION_ADDRESSES` array in `featuredHelpers.ts`:

```typescript
export const FEATURED_COLLECTION_ADDRESSES = [
  "0x3d9a9BA8D73c81a754ebCCA6a2483A2F8C7a5403", // Add a descriptive comment for each collection
  "0x1Cb88959be69068Eb67c09310D0140434D516985", 
  // Add more addresses as needed
];
```

The Featured Section component will automatically display NFTs from these collections in the carousel on the homepage. 