/**
 * Wallet and Account Type Definitions
 * 
 * This file provides standardized interfaces for wallet and account handling
 * throughout the application. It aligns with ThirdWeb V5 patterns while
 * providing our application-specific abstractions.
 */

import { metisChain } from "@/app/config/chain";
import { client } from "@/app/config/client";
import type { Chain as ThirdwebChain } from "thirdweb";

import {
    type DirectListing,
    type EnglishAuction,
    type Offer
} from "thirdweb/extensions/marketplace";

// Re-export chain from our config for consistency
export { client, metisChain };
export type Chain = ThirdwebChain;

// ThirdWeb Account type reference (for documentation purposes)
// We can't directly import it due to module structure, so we define compatible interface
export interface ThirdwebAccount {
  address: `0x${string}`;
  sendTransaction: (tx: any) => Promise<any>;
  signMessage: (params: { message: string | Uint8Array; originalMessage?: string; chainId?: number }) => Promise<`0x${string}`>;
  signTypedData: (data: any) => Promise<`0x${string}`>;
  estimateGas?: (tx: any) => Promise<bigint>;
  signTransaction?: (tx: any) => Promise<`0x${string}`>;
  sendBatchTransaction?: (txs: any[]) => Promise<any>;
  sendRawTransaction?: (tx: any) => Promise<any>;
  onTransactionRequested?: (transaction: any) => Promise<void>;
  watchAsset?: (asset: any) => Promise<boolean>;
}

// Marketplace types from ThirdWeb
export type {
    DirectListing,
    EnglishAuction,
    Offer
};

// Additional marketplace types that match ThirdWeb's models
export interface AuctionListing {
  id: bigint;
  assetContractAddress: string;
  tokenId: bigint;
  quantity: bigint;
  currencyContractAddress: string;
  minimumBidAmount: bigint;
  buyoutBidAmount: bigint | null;
  timeBufferInSeconds: bigint;
  bidBufferBps: bigint;
  startTimeInSeconds: bigint;
  endTimeInSeconds: bigint;
  creatorAddress: string;
}

export enum ListingType {
  Direct = 0,
  Auction = 1
}

// Adapter interface to align our WalletAccount with ThirdWeb's Account
export interface ThirdwebAccountAdapter extends ThirdwebAccount {
  // Any additional methods we need to implement
}

// Account Types - Extended to align with ThirdWeb V5
export interface WalletAccount {
  address: `0x${string}`; // Typed hex address matching ThirdWeb's format
  chainId?: number;
  isConnected: boolean;
  getChain?: () => Promise<Chain | null>;
  signMessage?: (params: { message: string }) => Promise<`0x${string}`>; // Updated to match ThirdWeb signature format
  signTransaction?: (transaction: TransactionRequest) => Promise<`0x${string}`>; 
  sendTransaction?: (transaction: TransactionRequest) => Promise<TransactionResponse>;
  
  // Optional ThirdWeb-specific methods
  authenticate?: (params?: { message?: string }) => Promise<{ address: string, chainId: number }>;
  getBalance?: () => Promise<{ decimals: number, name: string, symbol: string, value: bigint, displayValue: string }>;
}

// Transaction Types
export type TransactionState = 'pending' | 'success' | 'failed' | 'cancelled';

// Aligned with ThirdWeb's transaction request structure
export interface TransactionRequest {
  to: `0x${string}`;
  value?: bigint;
  data?: `0x${string}`;
  gasLimit?: bigint;
  maxFeePerGas?: bigint;
  maxPriorityFeePerGas?: bigint;
  nonce?: number;
  chainId?: number; // Added to match ThirdWeb transaction parameters
  type?: number;    // Added to support EIP-1559 transactions
}

export interface TransactionResponse {
  hash: `0x${string}`;
  from: `0x${string}`;
  to?: `0x${string}`;
  nonce: number;
  gasLimit: bigint;
  value: bigint;
  data: `0x${string}`;
  chainId?: number;
}

export interface TransactionReceipt {
  transactionHash: `0x${string}`;
  blockNumber: number;
  blockHash: `0x${string}`;
  status?: number;
  to?: `0x${string}`;
  from: `0x${string}`;
  contractAddress?: `0x${string}`;
  gasUsed: bigint;
  effectiveGasPrice?: bigint; // Added to match chain receipts
  cumulativeGasUsed?: bigint; // Added to match chain receipts
  logs: Array<{
    address: `0x${string}`;
    topics: Array<string>;
    data: string;
    logIndex?: number;
    blockNumber?: number;
    blockHash?: `0x${string}`;
    transactionIndex?: number;
    transactionHash?: `0x${string}`;
  }>;
}

export interface WalletTransaction {
  id: string;
  hash?: `0x${string}`;
  description: string;
  state: TransactionState;
  createdAt: number;
  completedAt?: number;
  receipt?: TransactionReceipt;
  metadata?: Record<string, any>;
  
  // New fields to match ThirdWeb's transaction tracking
  from?: `0x${string}`;
  to?: `0x${string}`;
  value?: bigint;
  walletId?: string;
  chainId?: number;
}

// Extended Wallet Types to align with ThirdWeb V5
export interface Wallet {
  id: string;
  name: string;
  label?: string;
  icon?: string;
  
  // Core wallet methods
  getAccount: () => WalletAccount | null;
  connect: (config?: { chainId?: number }) => Promise<WalletAccount>;
  disconnect: () => Promise<void>;
  
  // ThirdWeb-specific properties
  isConnected: () => boolean;
  isReconnectable: () => boolean;
  getMeta?: () => { name: string, iconURL: string };
  
  // Optional access to the underlying wallet instance
  walletInstance?: any;
  client?: any;
  
  // Transaction methods
  signMessage?: (params: { message: string }) => Promise<`0x${string}`>;
  signTransaction?: (transaction: TransactionRequest) => Promise<`0x${string}`>;
  sendTransaction: (transaction: TransactionRequest) => Promise<TransactionResponse>;
  
  // Chain methods
  getSupportedChains?: () => Chain[];
  switchChain?: (chainId: number) => Promise<Chain>;
}

// Connection Types
export interface WalletConnectionState {
  status: 'connecting' | 'connected' | 'disconnected' | 'error';
  account: WalletAccount | null;
  wallet: Wallet | null;
  error?: Error;
}

// Event Types
export type WalletEvent = 
  | { type: 'connect'; wallet: Wallet; account: WalletAccount }
  | { type: 'disconnect'; wallet: Wallet }
  | { type: 'accountChanged'; wallet: Wallet; account: WalletAccount }
  | { type: 'chainChanged'; wallet: Wallet; chainId: number }
  | { type: 'error'; wallet: Wallet; error: Error };

// Context Types - Extended to match ThirdWeb V5's context
export interface WalletContextType {
  isConnected: boolean;
  isConnecting: boolean;
  address?: `0x${string}`;
  displayAddress: string;
  connectWallet: (walletId: string, options?: { chainId?: number }) => Promise<void>; // Added options
  disconnectWallet: () => Promise<void>;
  copyAddressToClipboard: () => void;
  handleNetworkSwitch: (chainId: number) => Promise<void>;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;
  chain: Chain | null;
  wallet: Wallet | null;
  account: WalletAccount | null;
  walletOptions: Array<{ id: string; name: string; icon: string }>;
  
  // New ThirdWeb V5 aligned methods
  signMessage?: (message: string) => Promise<string>;
  getBalance?: () => Promise<{ displayValue: string; symbol: string; value: bigint; }>;
}