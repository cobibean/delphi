"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/app/components/feedback';
import { metisChain } from '@/config/chain';
import { v4 as uuidv4 } from 'uuid';

export type TransactionStatusType = 'loading' | 'success' | 'error' | 'info';

interface Transaction {
  id: string;
  type: TransactionStatusType;
  message: string;
  txHash?: string;
  timestamp: number;
  toastId?: string;
}

interface TransactionContextType {
  addTransaction: (type: TransactionStatusType, message: string, txHash?: string) => string;
  removeTransaction: (id: string) => void;
  updateTransaction: (id: string, type: TransactionStatusType, message: string, txHash?: string) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { add, dismiss } = useToast();

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
      showToast(toastId, type, message, txHash);
      
      // Update the transaction in state
      setTransactions(prev => 
        prev.map(tx => 
          tx.id === id 
            ? { ...tx, type, message, txHash: txHash || tx.txHash, toastId }
            : tx
        )
      );
    }
  };
  
  // Helper to show appropriate toast based on type
  const showToast = (toastId: string, type: TransactionStatusType, message: string, txHash?: string): void => {
    let action;
    
    // Add action button for transaction hash
    if (txHash) {
      action = {
        label: "View on Explorer",
        onClick: () => window.open(`https://explorer.metis.io/tx/${txHash}`, '_blank')
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
    <TransactionContext.Provider value={{ addTransaction, removeTransaction, updateTransaction }}>
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