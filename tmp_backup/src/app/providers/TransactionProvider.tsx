"use client";

/**
 * TransactionProvider.tsx
 * 
 * This file implements the newer version of the transaction notification system, 
 * integrating with the application's Toast notification system.
 * 
 * Key functionality:
 * - Tracks blockchain transactions with their status (loading, success, error, info)
 * - Provides methods to add, update, and remove transaction notifications
 * - Uses the Toast system instead of rendering its own notifications
 * - Includes explorer links for transaction hashes
 * - Links transactions to specific wallets and chains
 * - Integrates with ThirdWeb V5's transaction functions
 * 
 * Note on duplication:
 * - This file appears to be an evolution of src/app/context/TransactionContext.tsx
 * - Both files create similar contexts but use different notification systems
 * - This version (in providers/) seems to be the actively used one based on the layout.tsx
 * - Consider consolidating these implementations to avoid confusion
 *
 * Used by:
 * - Various blockchain operations throughout the application
 * - NFT minting, marketplace listings, auctions, etc.
 */

import { useToast } from '@/components/feedback';
import { metisChain } from '@/config/chain';
import { createContext, ReactNode, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type TransactionStatusType = 'loading' | 'success' | 'error' | 'info';

interface Transaction {
  id: string;
  type: TransactionStatusType;
  message: string;
  txHash?: string;
  timestamp: number;
  toastId?: string;
  // New fields for wallet integration
  walletAddress?: string;
  walletType?: string;
  chainId?: number;
  metadata?: Record<string, any>;
}

interface WalletTransactionParams {
  type: TransactionStatusType;
  message: string;
  walletAddress?: string;
  walletType?: string;
  chainId?: number;
  txHash?: string;
  metadata?: Record<string, any>;
}

interface TransactionContextType {
  // Original methods
  addTransaction: (type: TransactionStatusType, message: string, txHash?: string) => string;
  removeTransaction: (id: string) => void;
  updateTransaction: (id: string, type: TransactionStatusType, message: string, txHash?: string) => void;
  
  // New methods for wallet integration
  addWalletTransaction: (params: WalletTransactionParams) => string;
  getTransactions: (walletAddress?: string) => Transaction[];
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { add, dismiss } = useToast();

  // Legacy method - kept for backward compatibility
  const addTransaction = (type: TransactionStatusType, message: string, txHash?: string): string => {
    const id = Date.now().toString();
    const timestamp = Date.now();
    const toastId = uuidv4();
    
    // Create a toast notification
    showToast(toastId, type, message, txHash);
    
    // Store the transaction
    setTransactions(prev => [...prev, { id, type, message, txHash, timestamp, toastId }]);
    return id;
  };

  // New method - with full wallet integration
  const addWalletTransaction = (params: WalletTransactionParams): string => {
    const { type, message, walletAddress, walletType, chainId, txHash, metadata } = params;
    const id = Date.now().toString();
    const timestamp = Date.now();
    const toastId = uuidv4();
    
    // Create a toast notification
    showToast(toastId, type, message, txHash, chainId);
    
    // Store the transaction with wallet details
    setTransactions(prev => [
      ...prev, 
      { 
        id, 
        type, 
        message, 
        txHash, 
        timestamp, 
        toastId,
        walletAddress,
        walletType,
        chainId,
        metadata
      }
    ]);
    
    return id;
  };

  const removeTransaction = (id: string) => {
    // Find the transaction to get its toastId
    const transaction = transactions.find(tx => tx.id === id);
    
    // If we have a toastId, dismiss the toast
    if (transaction?.toastId) {
      dismiss(transaction.toastId);
    }
    
    // Remove from state
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  };

  const updateTransaction = (id: string, type: TransactionStatusType, message: string, txHash?: string) => {
    // Find the existing transaction
    const transaction = transactions.find(tx => tx.id === id);
    
    if (transaction) {
      // If we have a toastId, dismiss the old toast
      if (transaction.toastId) {
        dismiss(transaction.toastId);
      }
      
      // Create a new toast ID
      const toastId = uuidv4();
      
      // Create a new toast with the updated information
      showToast(toastId, type, message, txHash, transaction.chainId);
      
      // Update the transaction in state (preserve wallet info)
      setTransactions(prev => 
        prev.map(tx => 
          tx.id === id 
            ? { 
                ...tx, 
                type, 
                message, 
                txHash: txHash || tx.txHash, 
                toastId 
              }
            : tx
        )
      );
    }
  };

  // Get transactions (optionally filtered by wallet address)
  const getTransactions = (walletAddress?: string): Transaction[] => {
    if (!walletAddress) {
      return transactions;
    }
    
    return transactions.filter(tx => tx.walletAddress === walletAddress);
  };
  
  // Helper to show appropriate toast based on type
  const showToast = (
    toastId: string, 
    type: TransactionStatusType, 
    message: string, 
    txHash?: string,
    chainId?: number
  ): void => {
    let action;
    
    // Add action button for transaction hash
    if (txHash) {
      // Determine the correct explorer URL based on chainId
      const explorerUrl = chainId && chainId !== metisChain.id
        ? `https://etherscan.io/tx/${txHash}` // Default to Ethereum 
        : `https://explorer.metis.io/tx/${txHash}`; // Default to Metis
      
      action = {
        label: "View on Explorer",
        onClick: () => window.open(explorerUrl, '_blank')
      };
    }
    
    // Show appropriate toast based on type
    switch (type) {
      case 'loading':
        // Loading toasts should not auto-dismiss
        add({
          title: message,
          description: "Transaction in progress...",
          variant: "info",
          duration: 0, // No auto-dismiss
          action
        });
        break;
      case 'success':
        add({
          title: message,
          description: txHash ? "Transaction confirmed" : undefined,
          variant: "success",
          action
        });
        break;
      case 'error':
        add({
          title: message,
          description: txHash ? "Transaction failed" : undefined,
          variant: "error",
          action,
          duration: 10000 // Show errors longer
        });
        break;
      case 'info':
      default:
        add({
          title: message,
          variant: "info",
          action
        });
        break;
    }
  };

  return (
    <TransactionContext.Provider value={{ 
      addTransaction, 
      removeTransaction, 
      updateTransaction,
      addWalletTransaction,
      getTransactions
    }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransaction() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransaction must be used within a TransactionProvider');
  }
  return context;
} 