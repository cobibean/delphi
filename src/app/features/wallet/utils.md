/**
 * Wallet Utility Functions
 * 
 * This file provides standardized functions for wallet operations across the application.
 * These utilities abstract common wallet operations and provide consistent patterns
 * for interacting with different wallet types.
 */

import { metisChain } from "@/app/config/chain";
import { shortenAddress } from "@/app/utils/format";
import type { Chain, TransactionRequest, Wallet, WalletAccount } from "./types";

/**
 * Extracts an account from a wallet object, handling different wallet formats
 * Provides a consistent account interface regardless of wallet implementation
 */
export const getAccountFromWallet = (wallet: any): WalletAccount | null => {
  // Prioritize ThirdWeb v5 patterns (using function)
  if (wallet?.getAccount && typeof wallet.getAccount === 'function') {
    return wallet.getAccount();
  }
  
  // Fall back to direct properties (common in some implementations)
  if (wallet?.account) {
    return wallet.account;
  }
  
  // Last resort - create a minimal account object if we at least have an address
  if (wallet?.address) {
    return {
      address: wallet.address as `0x${string}`,
      chainId: wallet.chainId || 0,
      isConnected: true
    };
  }
  
  return null;
};

/**
 * Validates if a wallet is connected to the expected chain
 * Returns an object with validation status and error message if applicable
 */
export const validateWalletConnection = (
  wallet: Wallet | null, 
  account: WalletAccount | null,
  expectedChainId = metisChain.id
): { isValid: boolean; error?: string } => {
  // Check if wallet and account exist
  if (!wallet || !account) {
    return { isValid: false, error: 'Wallet not connected' };
  }
  
  // Check if account is connected
  if (!account.isConnected) {
    return { isValid: false, error: 'Wallet is not connected' };
  }
  
  // Check if we're on the expected chain
  if (account.chainId && account.chainId !== expectedChainId) {
    return { 
      isValid: false, 
      error: `Wrong network. Please switch to ${metisChain.name}` 
    };
  }
  
  return { isValid: true };
};

/**
 * Format wallet address for display with configurable length
 * @param address The address to format
 * @param chars Number of characters to show at start and end (default: 4)
 * @returns Formatted address string
 */
export const formatWalletAddress = (
  address?: string | null,
  chars = 4
): string => {
  if (!address) return '';
  return shortenAddress(address, chars);
};

/**
 * Check if a wallet needs to switch chains
 */
export const needsChainSwitch = (
  account: WalletAccount | null, 
  targetChainId = metisChain.id
): boolean => {
  if (!account) return false;
  return account.chainId !== targetChainId;
};

/**
 * Create a standard transaction request
 * Supports multiple parameter formats for flexibility
 */
export const createTransactionRequest = (
  toOrParams: `0x${string}` | {
    to: string;
    value?: string | bigint;
    data?: string;
    gasLimit?: bigint;
    chainId?: number;
  },
  options: {
    value?: bigint;
    data?: `0x${string}`;
    chainId?: number;
  } = {}
): TransactionRequest => {
  // Handle object parameter format
  if (typeof toOrParams === 'object') {
    return {
      to: toOrParams.to as `0x${string}`,
      value: typeof toOrParams.value === 'string' ? BigInt(toOrParams.value) : toOrParams.value as bigint,
      data: toOrParams.data as `0x${string}`,
      chainId: toOrParams.chainId || metisChain.id,
      gasLimit: toOrParams.gasLimit
    };
  }
  
  // Handle string + options format
  return {
    to: toOrParams,
    value: options.value,
    data: options.data,
    chainId: options.chainId || metisChain.id
  };
};

/**
 * Get chain info for a chain ID
 */
export const getChainInfo = (chainId: number): Chain | null => {
  if (chainId === metisChain.id) {
    return metisChain;
  }
  
  // If we support more chains in the future, add them here
  return null;
};

/**
 * Check if a wallet supports a specific chain
 */
export const walletSupportsChain = (wallet: Wallet, chainId: number): boolean => {
  // If the wallet doesn't provide a list of supported chains, assume it supports everything
  if (!wallet.getSupportedChains) return true;
  
  const supportedChains = wallet.getSupportedChains();
  return supportedChains.some(chain => chain.id === chainId);
};

/**
 * Wallet Utilities
 * 
 * Common helper functions for wallet operations
 */

/**
 * Format an error message to be user-friendly
 * @param error The error object or message
 * @returns A formatted error message string
 */
export function formatError(error: any): string {
  if (!error) return 'Unknown error occurred';
  
  // Handle different error types
  if (typeof error === 'string') return error;
  
  // Check for user rejected transaction
  if (error.code === 4001 || 
      error.message?.includes('rejected') || 
      error.message?.includes('denied') || 
      error.message?.includes('cancelled')) {
    return 'Transaction was rejected by user';
  }
  
  // Check for insufficient funds
  if (error.message?.includes('insufficient funds') || 
      error.message?.toLowerCase().includes('not enough balance')) {
    return 'Insufficient funds to complete transaction';
  }
  
  // Check for gas-related errors
  if (error.message?.includes('gas') && error.message?.includes('exceed')) {
    return 'Gas limit exceeded, try increasing gas limit';
  }
  
  // Network errors
  if (error.message?.includes('network') || error.message?.includes('connection')) {
    return 'Network error occurred, please check your connection';
  }
  
  // Return the error message if available, otherwise a generic message
  return error.message || error.reason || 'Transaction failed';
}

/**
 * Format wallet address for display
 * @param address The full wallet address
 * @param start Number of characters to show at start
 * @param end Number of characters to show at end
 * @returns Formatted address (e.g., 0x1234...5678)
 */
export function formatAddress(address: string, start = 6, end = 4): string {
  if (!address || address.length < (start + end + 3)) {
    return address || '';
  }
  
  return `${address.substring(0, start)}...${address.substring(address.length - end)}`;
}

/**
 * Check if the wallet account has a valid address
 * @param account The wallet account to check
 * @returns Boolean indicating if the account is valid
 */
export function isValidAccount(account: WalletAccount | null): boolean {
  return !!account && !!account.address && account.address.startsWith('0x');
}

/**
 * Extract relevant account details for display and usage
 * @param account The wallet account
 * @returns Object with essential account information
 */
export function extractAccountInfo(account: WalletAccount) {
  return {
    address: account.address,
    displayAddress: formatAddress(account.address),
    chainId: account.chainId || '',
    isConnected: true,
  };
}

/**
 * Converts our WalletAccount to ThirdWeb's Account type
 * This adapter function removes the need for unsafe "as any" type casts
 * when calling ThirdWeb functions that expect their Account type
 */
export function toThirdwebAccount(account: WalletAccount): any {
  if (!account || !account.address) {
    throw new Error("Valid wallet account is required");
  }
  
  // Return a ThirdWeb compatible account object
  return {
    address: account.address,
    
    // Map signMessage to ThirdWeb's expected format
    signMessage: async ({ message }: { message: string | Uint8Array; originalMessage?: string; chainId?: number }) => {
      if (!account.signMessage) {
        throw new Error("Wallet does not support message signing");
      }
      
      const messageString = typeof message === 'string' 
        ? message 
        : new TextDecoder().decode(message);
        
      return account.signMessage({ message: messageString });
    },
    
    // Map sendTransaction to ThirdWeb's expected format
    sendTransaction: async (tx: any) => {
      if (!account.sendTransaction) {
        throw new Error("Wallet does not support transaction sending");
      }
      
      // Convert ThirdWeb transaction format to our TransactionRequest format
      const transactionRequest = {
        to: tx.to,
        value: tx.value,
        data: tx.data,
        gasLimit: tx.gasLimit,
        maxFeePerGas: tx.maxFeePerGas,
        maxPriorityFeePerGas: tx.maxPriorityFeePerGas,
        nonce: tx.nonce,
        chainId: tx.chainId,
        type: tx.type
      };
      
      return account.sendTransaction(transactionRequest);
    },
    
    // Add minimal implementation of signTypedData required by ThirdWeb
    signTypedData: async (typedData: any) => {
      if (!account.signTransaction) {
        throw new Error("Wallet does not support typed data signing");
      }
      
      // For basic implementation, we stringify the typed data
      // A full implementation would properly handle EIP-712 typed data
      const message = JSON.stringify(typedData);
      return account.signMessage?.({ message }) || "0x";
    },
    
    // Add any other methods ThirdWeb might need with graceful fallbacks
  };
} 