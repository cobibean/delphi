# NFT Marketplace Sorting Implementation

This directory contains the implementation of sorting and pagination functionality for the Delphi NFT Marketplace.

## Features

- Type-safe sorting options with TypeScript literal types
- Server-side pagination and sorting for better performance
- Client-side fallback when needed
- URL parameter integration for shareable links
- localStorage persistence for user preferences
- Support for different listing types (direct listings and auctions)
- Comprehensive error handling for null/undefined values

## Directory Structure

```
Sorting/
├── types.ts            # Type definitions and constants
├── helpers.ts          # Sorting and pagination helper functions
├── index.ts            # Export file
├── README.md           # This documentation
└── __tests__/          # Test files
    └── helpers.test.ts # Unit tests for helper functions
```

## Usage

### Importing

```typescript
import { 
  SortOption, 
  sortListings, 
  paginateListings, 
  updateUrlWithSort,
  saveSortPreference,
  loadSortPreference
} from '@/app/features/marketplace/services/Sorting';
```

### Server-Side API

Use the `/api/marketplace/listings` endpoint with these query parameters:

```
/api/marketplace/listings?page=1&limit=20&sort=newest&collection=collection-name
```

### Available Sort Options

- `price-high-low`: Sort listings by price (highest first)
- `price-low-high`: Sort listings by price (lowest first)
- `newest`: Sort by listing creation date (newest first)
- `oldest`: Sort by listing creation date (oldest first)
- `highest-bid`: Sort by highest bid amount (auctions) or price (direct)
- `lowest-bid`: Sort by lowest bid amount (auctions) or price (direct)
- `ending-soon`: Sort by auction end time (soonest first)

## Components

The sorting implementation includes these UI components:

- `SortingDropdown`: Headless UI dropdown for selecting sort options
- `Pagination`: Component for navigating between pages of results

## Development

### Running Tests

```bash
npm test
# or specific tests
npm test -- src/app/features/marketplace/services/Sorting/__tests__/helpers.test.ts
```

### Adding New Sort Options

1. Add the new option to the `SortOption` type in `types.ts`
2. Add the sorting logic in the `sortListings` function in `helpers.ts`
3. Add the option to the `SORT_OPTIONS` array in `types.ts` with a label and description
4. Add tests for the new option in `__tests__/helpers.test.ts`

## Performance Considerations

- Server-side pagination is used for large datasets
- Sorting functions gracefully handle null/undefined values
- Toast notifications are streamlined to prevent notification fatigue
- URL parameters are updated with `replaceState` to avoid browser history pollution

## Future Improvements

- Virtual scrolling for very large collections
- Filter by price range and other attributes
- React Query implementation for caching
- Animation transitions for sorting changes 