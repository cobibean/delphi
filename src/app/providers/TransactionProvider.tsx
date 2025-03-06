"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import TransactionNotification, { NotificationType } from '../components/TransactionNotification';

interface Transaction {
  id: string;
  type: NotificationType;
  message: string;
  txHash?: string;
}

interface TransactionContextType {
  addTransaction: (type: NotificationType, message: string, txHash?: string) => string;
  removeTransaction: (id: string) => void;
  updateTransaction: (id: string, type: NotificationType, message: string, txHash?: string) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (type: NotificationType, message: string, txHash?: string): string => {
    const id = Date.now().toString();
    setTransactions(prev => [...prev, { id, type, message, txHash }]);
    return id;
  };

  const removeTransaction = (id: string) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  };

  const updateTransaction = (id: string, type: NotificationType, message: string, txHash?: string) => {
    setTransactions(prev => 
      prev.map(tx => 
        tx.id === id ? { ...tx, type, message, txHash } : tx
      )
    );
  };

  return (
    <TransactionContext.Provider value={{ addTransaction, removeTransaction, updateTransaction }}>
      {children}
      <div className="notification-container">
        {transactions.map((tx) => (
          <TransactionNotification
            key={tx.id}
            type={tx.type}
            message={tx.message}
            txHash={tx.txHash}
            onClose={() => removeTransaction(tx.id)}
          />
        ))}
      </div>
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