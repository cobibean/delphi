/**
 * Wallet Module
 * 
 * This module provides standardized wallet handling for the application.
 * It exports types, utilities, hooks, and components for wallet operations.
 */

// Export all type definitions except TransactionState (to resolve ambiguity)
export type {
    AuctionListing, Chain,
    DirectListing,
    EnglishAuction, ListingType, Offer, ThirdwebAccountAdapter, TransactionReceipt, TransactionRequest,
    TransactionResponse, Wallet, WalletAccount, WalletConnectionState, WalletContextType, WalletEvent, WalletTransaction
} from './types';

// Export the common TransactionState from hooks/useTransaction
export type { TransactionState } from './hooks/useTransaction';

// Export wallet utilities
export * from './utils';

// Export components and hooks
export * from './components';
export * from './hooks';

