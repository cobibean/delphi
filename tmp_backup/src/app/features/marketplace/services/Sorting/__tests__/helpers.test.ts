import { IListingWithNFT } from '@/app/features/marketplace/services/types';
import {
    getSortOptionFromUrl,
    isSortOption,
    loadSortPreference,
    paginateListings,
    saveSortPreference,
    sortListings,
    updateUrlWithSort
} from '../helpers';

// Mock window object for URL and localStorage tests
const originalWindow = { ...global.window };

const mockWindow = () => {
  Object.defineProperty(global, 'window', {
    value: {
      location: {
        href: 'https://example.com',
        search: '',
        origin: 'https://example.com'
      },
      history: {
        replaceState: jest.fn()
      },
      localStorage: {
        getItem: jest.fn(),
        setItem: jest.fn()
      }
    },
    writable: true
  });
};

const resetWindow = () => {
  Object.defineProperty(global, 'window', {
    value: originalWindow,
    writable: true
  });
};

// Sample data for tests
const mockListings: IListingWithNFT[] = [
  {
    listingId: '1',
    tokenId: '1',
    assetContract: '0x123',
    pricePerToken: '10',
    startTimestamp: 1000,
    endTimestamp: 2000,
    quantity: '1',
    status: 1,
    currency: '0xabc',
    tokenType: 0,
    reserved: false,
    listingCreator: '0xowner',
    sellerAddress: '0xowner',
    isAuction: false,
    metadata: {
      name: 'NFT 1',
      description: 'Description 1',
      image: 'image1.jpg',
      attributes: []
    },
    collectionName: 'Collection A'
  },
  {
    listingId: '2',
    tokenId: '2',
    assetContract: '0x123',
    pricePerToken: '5',
    startTimestamp: 1200,
    endTimestamp: 2200,
    quantity: '1',
    status: 1,
    currency: '0xabc',
    tokenType: 0,
    reserved: false,
    listingCreator: '0xowner',
    sellerAddress: '0xowner',
    isAuction: false,
    metadata: {
      name: 'NFT 2',
      description: 'Description 2',
      image: 'image2.jpg',
      attributes: []
    },
    collectionName: 'Collection B'
  },
  {
    listingId: '3',
    tokenId: '3',
    assetContract: '0x123',
    pricePerToken: '20',
    startTimestamp: 800,
    endTimestamp: 1800,
    quantity: '1',
    status: 1,
    currency: '0xabc',
    tokenType: 0,
    reserved: false,
    listingCreator: '0xowner',
    sellerAddress: '0xowner',
    isAuction: false,
    metadata: {
      name: 'NFT 3',
      description: 'Description 3',
      image: 'image3.jpg',
      attributes: []
    },
    collectionName: 'Collection A'
  },
  {
    listingId: '4',
    tokenId: '4',
    assetContract: '0x123',
    pricePerToken: null as any, // Test handling of null prices
    startTimestamp: 1500,
    endTimestamp: 2500,
    quantity: '1',
    status: 1,
    currency: '0xabc',
    tokenType: 0,
    reserved: false,
    listingCreator: '0xowner',
    sellerAddress: '0xowner',
    isAuction: false,
    metadata: {
      name: 'NFT 4',
      description: 'Description 4',
      image: 'image4.jpg',
      attributes: []
    },
    collectionName: 'Collection B'
  },
  {
    listingId: '5',
    tokenId: '5',
    assetContract: '0x123',
    pricePerToken: '15',
    startTimestamp: 0,
    endTimestamp: 0,
    quantity: '1',
    status: 1,
    currency: '0xabc',
    tokenType: 0,
    reserved: false,
    listingCreator: '0xowner',
    sellerAddress: '0xowner',
    isAuction: true,
    currentBid: '12',
    minimumBidAmount: '10',
    metadata: {
      name: 'NFT 5 (Auction)',
      description: 'Description 5',
      image: 'image5.jpg',
      attributes: []
    },
    collectionName: 'Collection A'
  }
];

describe('Sorting Helpers', () => {
  // Reset window mock before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('sortListings', () => {
    test('should sort by price high to low', () => {
      const sorted = sortListings(mockListings, 'price-high-low');
      expect(sorted[0].listingId).toBe('3'); // 20
      expect(sorted[1].listingId).toBe('5'); // 15
      expect(sorted[2].listingId).toBe('1'); // 10
      expect(sorted[3].listingId).toBe('2'); // 5
      expect(sorted[4].listingId).toBe('4'); // null -> 0
    });

    test('should sort by price low to high', () => {
      const sorted = sortListings(mockListings, 'price-low-high');
      expect(sorted[0].listingId).toBe('4'); // null -> 0
      expect(sorted[1].listingId).toBe('2'); // 5
      expect(sorted[2].listingId).toBe('1'); // 10
      expect(sorted[3].listingId).toBe('5'); // 15
      expect(sorted[4].listingId).toBe('3'); // 20
    });

    test('should sort by newest first', () => {
      const sorted = sortListings(mockListings, 'newest');
      expect(sorted[0].listingId).toBe('4'); // 1500
      expect(sorted[1].listingId).toBe('2'); // 1200
      expect(sorted[2].listingId).toBe('1'); // 1000
      expect(sorted[3].listingId).toBe('3'); // 800
      expect(sorted[4].listingId).toBe('5'); // undefined -> 0
    });

    test('should sort by oldest first', () => {
      const sorted = sortListings(mockListings, 'oldest');
      expect(sorted[0].listingId).toBe('5'); // undefined -> 0
      expect(sorted[1].listingId).toBe('3'); // 800
      expect(sorted[2].listingId).toBe('1'); // 1000
      expect(sorted[3].listingId).toBe('2'); // 1200
      expect(sorted[4].listingId).toBe('4'); // 1500
    });

    test('should sort by highest bid for auctions', () => {
      const sorted = sortListings(mockListings, 'highest-bid');
      // Auction with bid 12
      expect(sorted[0].listingId).toBe('5');
      
      // Then regular listings by price
      expect(sorted[1].listingId).toBe('3'); // 20
      expect(sorted[2].listingId).toBe('1'); // 10
      expect(sorted[3].listingId).toBe('2'); // 5
      expect(sorted[4].listingId).toBe('4'); // null -> 0
    });

    test('should handle empty array', () => {
      const result = sortListings([], 'newest');
      expect(result).toEqual([]);
    });

    test('should handle non-array input gracefully', () => {
      const result = sortListings(null as any, 'newest');
      expect(result).toEqual([]);
    });

    test('should handle unknown sort option gracefully', () => {
      const result = sortListings(mockListings, 'unknown' as any);
      expect(result).toHaveLength(5);
      expect(console.warn).toHaveBeenCalled;
    });
  });

  describe('paginateListings', () => {
    test('should paginate listings correctly', () => {
      const result = paginateListings(mockListings, { currentPage: 1, itemsPerPage: 2 });
      expect(result).toHaveLength(2);
      expect(result[0].listingId).toBe('1');
      expect(result[1].listingId).toBe('2');
    });

    test('should handle last page with fewer items', () => {
      const result = paginateListings(mockListings, { currentPage: 3, itemsPerPage: 2 });
      expect(result).toHaveLength(1);
      expect(result[0].listingId).toBe('5');
    });

    test('should use default pagination when not provided', () => {
      const result = paginateListings(mockListings);
      expect(result).toHaveLength(5); // All items since default is 20 per page
    });

    test('should handle empty array', () => {
      const result = paginateListings([], { currentPage: 1, itemsPerPage: 10 });
      expect(result).toEqual([]);
    });

    test('should handle invalid pagination gracefully', () => {
      const result = paginateListings(mockListings, { currentPage: -1, itemsPerPage: 0 });
      expect(result).toHaveLength(5); // Should default to showing all
    });
  });

  describe('URL parameter helpers', () => {
    beforeEach(() => {
      mockWindow();
    });

    afterEach(() => {
      resetWindow();
    });

    test('getSortOptionFromUrl should return sort option when present', () => {
      global.window.location.search = '?sort=price-high-low';
      expect(getSortOptionFromUrl()).toBe('price-high-low');
    });

    test('getSortOptionFromUrl should return null for invalid sort option', () => {
      global.window.location.search = '?sort=invalid';
      expect(getSortOptionFromUrl()).toBeNull();
    });

    test('updateUrlWithSort should update URL with sort and page parameters', () => {
      updateUrlWithSort('price-low-high', 2);
      expect(window.history.replaceState).toHaveBeenCalled();
    });
  });

  describe('isSortOption', () => {
    test('should return true for valid sort options', () => {
      expect(isSortOption('price-high-low')).toBe(true);
      expect(isSortOption('newest')).toBe(true);
      expect(isSortOption('ending-soon')).toBe(true);
    });

    test('should return false for invalid sort options', () => {
      expect(isSortOption('invalid')).toBe(false);
      expect(isSortOption('')).toBe(false);
    });
  });

  describe('localStorage helpers', () => {
    beforeEach(() => {
      mockWindow();
    });

    afterEach(() => {
      resetWindow();
    });

    test('saveSortPreference should save to localStorage', () => {
      saveSortPreference('price-high-low');
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        'nft-sort-preference',
        'price-high-low'
      );
    });

    test('loadSortPreference should load from localStorage', () => {
      (window.localStorage.getItem as jest.Mock).mockReturnValue('price-low-high');
      expect(loadSortPreference()).toBe('price-low-high');
    });

    test('loadSortPreference should validate the option', () => {
      (window.localStorage.getItem as jest.Mock).mockReturnValue('invalid');
      expect(loadSortPreference()).toBeNull();
    });
  });
}); 