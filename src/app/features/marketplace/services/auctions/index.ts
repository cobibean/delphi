/**
 * Auction Services
 * 
 * This module provides all auction-related functionality for the marketplace.
 * Re-exports all functions from the individual modules.
 */

// Query Functions
export {
    getAllAuctions,
    getAuction,
    getAuctionBidHistory,
    getAuctionWinningBid
} from './queries';

// Re-export the simplified implementations as the primary API
export {
    buyoutAuctionSimplified as buyoutAuction,
    cancelAuctionSimplified as cancelAuction,
    checkIfNewWinningBid,
    collectAuctionNFTSimplified as collectAuctionNFT,
    collectAuctionPayoutForSellerSimplified as collectAuctionPayoutForSeller,
    createAuctionSimplified as createAuction,
    placeBidSimplified as placeBid
} from './simplified';

// Helper functions
export {
    isAuctionEnded,
    validateAuctionParams
} from './helpers';
