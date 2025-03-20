"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { TransactionNotification, TransactionStatusType as NotificationType } from "@/features/marketplace/components/TransactionNotification";

interface Transaction {
  id: string;
  type: NotificationType;
  message: string;
  txHash?: string;
  timestamp: number;
}

interface TransactionContextType {
  addTransaction: (type: NotificationType, message: string, txHash?: string) => string;
  removeTransaction: (id: string) => void;
  clearTransactions: () => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error("useTransactions must be used within a TransactionProvider");
  }
  return context;
}

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (type: NotificationType, message: string, txHash?: string): string => {
    const id = Date.now().toString();
    setTransactions(prev => [...prev, { id, type, message, txHash, timestamp: Date.now() }]);
    return id;
  };

  const removeTransaction = (id: string) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  };

  const clearTransactions = () => {
    setTransactions([]);
  };

  return (
    <TransactionContext.Provider value={{ addTransaction, removeTransaction, clearTransactions }}>
      {children}
      {/* Render notifications */}
      <div className="notification-container">
        {transactions.map((tx) => (
          <TransactionNotification
            key={tx.id}
            notification={{
              id: tx.id,
              type: tx.type,
              message: tx.message,
              transactionHash: tx.txHash,
              timestamp: tx.timestamp
            }}
            onClose={() => removeTransaction(tx.id)}
          />
        ))}
      </div>
    </TransactionContext.Provider>
  );
} 