/**
 * Marketplace Services
 * 
 * This index file exports all marketplace service functions and types.
 * The listing functions have been replaced with simplified implementations
 * that use the ThirdWeb template pattern with sendAndConfirmTransaction.
 */

// Export types
export * from './types';

// Export utility functions (including the transaction adapter)
export {
    executeThirdwebTransaction,
    formatIPFSUrl,
    formatPrice,
    getMarketplaceAddress,
    hasTimestampPassed,
    logContractError,
    parseBigInt
} from './utils';

// Export auction services
export {
    buyoutAuction,
    checkIfNewWinningBid,
    collectAuctionNFT,
    collectAuctionPayoutForSeller,
    createAuction,
    getAllAuctions,
    getAuction,
    getAuctionBidHistory,
    getAuctionWinningBid,
    placeBid
} from './auctions';

// Export listing services
// These are the new simplified implementations using ThirdWeb's template pattern
export * from './listings';

// Export contract services
//export * from './contracts';

// Export transaction preparation utilities
export * from './prepareTransactions';
