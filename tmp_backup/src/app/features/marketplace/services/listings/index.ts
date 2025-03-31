/**
 * Marketplace Listings Module
 * 
 * This file exports the simplified ThirdWeb marketplace listing functions.
 * These implementations use the newer pattern with sendAndConfirmTransaction 
 * which resolves ABI decoding issues.
 */

// Export the simplified implementation as the primary API
export {
    buyFromDirectListingSimplified as buyFromDirectListing,
    buyFromDirectListingSimplified as buyWithMetis,
    cancelListingSimplified as cancelListing, createDirectListingSimplified as createDirectListing
} from './simplified';

// Export query functions from the queries file (ADD AUCTIONS TO THE QUERIES FILE)
export {
    getAllListings, getDirectListing, getListing
} from './queries';

// Export helpers
export {
    getMarketplaceContract
} from './helpers';

