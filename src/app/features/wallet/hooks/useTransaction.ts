"use client";

import { useToast } from "@/components/feedback";
import { useCallback, useState } from "react";

export interface TransactionState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
  hash: string | null;
  receipt: TransactionReceipt | null;
  reset: () => void;
}

// Define a TransactionReceipt interface to replace 'any'
interface TransactionReceipt {
  blockHash: string;
  blockNumber: number;
  contractAddress: string | null;
  status?: boolean;
  transactionHash: string;
  transactionIndex: number;
}

/**
 * Custom hook for tracking and managing transaction state
 * Provides helper functions for transaction lifecycle
 */
export function useTransaction() {
  const { toast } = useToast();
  const [state, setState] = useState<TransactionState>({
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
    hash: null,
    receipt: null,
    reset: () => { /* Initialize with empty function, will be replaced */ },
  });
  
  // Reset transaction state
  const reset = useCallback(() => {
    setState({
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: null,
      hash: null,
      receipt: null,
      reset,
    });
  }, []);
  
  // Handle transaction start
  const handleTransactionStart = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      isSuccess: false,
      isError: false,
      error: null,
      reset,
    }));
    
    toast.info("Transaction Initiated", "Your transaction has been initiated. Please confirm in your wallet.");
  }, [toast, reset]);
  
  // Handle transaction hash
  const handleTransactionHash = useCallback((hash: string) => {
    setState((prev) => ({
      ...prev,
      hash,
      reset,
    }));
    
    toast.info("Transaction Submitted", `Transaction hash: ${hash.slice(0, 10)}...`);
  }, [toast, reset]);
  
  // Handle transaction success
  const handleTransactionSuccess = useCallback((receipt: TransactionReceipt) => {
    setState((prev) => ({
      ...prev,
      isLoading: false,
      isSuccess: true,
      receipt,
      reset,
    }));
    
    toast.success("Transaction Successful", "Your transaction has been successfully processed.");
  }, [toast, reset]);
  
  // Handle transaction error
  const handleTransactionError = useCallback((error: Error) => {
    setState((prev) => ({
      ...prev,
      isLoading: false,
      isError: true,
      error,
      reset,
    }));
    
    toast.error("Transaction Failed", error.message || "An error occurred during the transaction.");
  }, [toast, reset]);
  
  // Initialize state with reset function
  useState(() => {
    setState((prev) => ({ ...prev, reset }));
  });
  
  return {
    ...state,
    handleTransactionStart,
    handleTransactionHash,
    handleTransactionSuccess,
    handleTransactionError,
  };
} 