"use client";

import { useTransaction } from "@/app/features/wallet/hooks/useTransaction";
import { useWallet } from "@/app/features/wallet/hooks/useWallet";
import { WalletAccount } from "@/app/features/wallet/types";
import { formatError } from "@/app/features/wallet/utils";
import { useToast } from "@/components/feedback";
import { metisChain } from "@/config/chain";
import { useState } from "react";
import { sendAndConfirmTransaction } from "thirdweb";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import { executeMarketplaceTransaction } from "../services/prepareTransactions";

/**
 * Custom hook for marketplace-specific wallet operations
 * Provides a standardized interface for marketplace functions to interact with wallets
 */
export function useMarketplaceWallet() {
  const { toast } = useToast();
  const { isConnected, displayAddress } = useWallet();
  // Use ThirdWeb hooks directly
  const thirdwebAccount = useActiveAccount();
  const activeWallet = useActiveWallet();
  const { handleTransactionStart, handleTransactionSuccess, handleTransactionError } = useTransaction();
  
  // Transaction state management
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    txHash: "",
    error: ""
  });
  
  // Create a basic wallet account that just contains the address
  // We'll use the toThirdwebAccount utility later to properly convert this for transactions
  const walletAccount: WalletAccount | null = thirdwebAccount ? {
    address: thirdwebAccount.address as `0x${string}`,
    chainId: metisChain.id,
    isConnected: true
  } : null;
  
  /**
   * Execute a marketplace function with proper error handling and transaction tracking
   * 
   * This simplified version supports both the legacy and direct ThirdWeb approaches
   */
  const executeMarketplaceFunction = async (
    functionName: string,
    params: any,
    options: {
      description?: string;
      onSuccess?: (result: any) => void;
      onError?: (error: any) => void;
      useDirectExecution?: boolean;  // Option to directly use executeThirdwebTransaction
    } = {}
  ) => {
    // Validate wallet connection
    if (!isConnected || !thirdwebAccount || !walletAccount) {
      toast.error(
        "Wallet not connected",
        "Please connect your wallet to perform this action"
      );
      return null;
    }
    
    // For now we'll skip the chain check since we don't have reliable chain information
    
    const description = options.description || `Executing ${functionName}`;
    
    try {
      // Signal that transaction is starting
      handleTransactionStart();
      setStatus(prev => ({ ...prev, loading: true, error: "", success: false }));
      
      // Show pending toast
      toast.info(
        "Transaction initiated",
        `${description} - waiting for confirmation...`
      );
      
      // Execute the marketplace transaction
      // Now we can pass thirdwebAccount directly because executeMarketplaceTransaction
      // has been updated to accept any account type with an address
      const result = await executeMarketplaceTransaction(
        functionName,
        params,
        thirdwebAccount // Use the ThirdWeb account directly
      );
      
      // Check if the transaction was successful
      if (!result || result.success === false) {
        // Handle transaction failure
        if (result && result.error) {
          throw new Error(result.error);
        } else {
          throw new Error("Transaction failed with no specific error message");
        }
      }
      
      // Signal success
      handleTransactionSuccess(result);
      setStatus({
        loading: false,
        success: true,
        txHash: result.transactionHash || "",
        error: ""
      });
      
      // Call success callback if provided
      if (options.onSuccess) {
        options.onSuccess(result);
      }
      
      // Show success toast
      toast.success(
        "Transaction successful",
        `${description} completed successfully`
      );
      
      return result;
    } catch (error: any) {
      console.error(`Error in ${functionName}:`, error);
      
      // Extract the most user-friendly error message
      let errorMessage = formatError(error);
      
      // Check for common errors and provide more user-friendly messages
      if (errorMessage.includes("insufficient balance")) {
        errorMessage = "You don't have enough funds to complete this transaction";
      } else if (errorMessage.includes("user rejected transaction")) {
        errorMessage = "Transaction was rejected in your wallet";
      }
      
      // Signal that transaction failed
      handleTransactionError(error as Error);
      setStatus({
        loading: false,
        success: false,
        txHash: "",
        error: errorMessage
      });
      
      // Show error toast with better formatting
      toast.error(
        "Transaction failed",
        errorMessage
      );
      
      // Call the error callback if provided
      if (options.onError) {
        options.onError(error);
      }
      
      return null;
    }
  };
  
  /**
   * Execute a transaction directly using ThirdWeb's sendAndConfirmTransaction
   * This is the recommended way for new code
   */
  const executeDirectTransaction = async (
    transaction: any,
    options: {
      description?: string;
      onSuccess?: (receipt: any) => void;
      onError?: (error: any) => void;
    } = {}
  ) => {
    // Validate wallet connection
    if (!isConnected || !thirdwebAccount) {
      toast.error(
        "Wallet not connected",
        "Please connect your wallet to perform this action"
      );
      return null;
    }
    
    const description = options.description || "Executing transaction";
    
    try {
      // Signal that transaction is starting
      setStatus(prev => ({ ...prev, loading: true, error: "", success: false }));
      
      // Show pending toast
      toast.info(
        "Transaction initiated",
        `${description} - please confirm in your wallet`
      );
      
      // Send and confirm the transaction
      const receipt = await sendAndConfirmTransaction({
        transaction,
        account: thirdwebAccount,
      });
      
      // Signal success
      setStatus({
        loading: false,
        success: true,
        txHash: receipt.transactionHash,
        error: ""
      });
      
      // Call success callback if provided
      if (options.onSuccess) {
        options.onSuccess(receipt);
      }
      
      // Show success toast
      toast.success(
        "Transaction successful",
        `${description} completed successfully`
      );
      
      return receipt;
    } catch (error: any) {
      console.error("Error in direct transaction:", error);
      
      // Extract the most user-friendly error message
      let errorMessage = formatError(error);
      
      // Check for common errors and provide more user-friendly messages
      if (errorMessage.includes("insufficient balance")) {
        errorMessage = "You don't have enough funds to complete this transaction";
      } else if (errorMessage.includes("user rejected transaction")) {
        errorMessage = "Transaction was rejected in your wallet";
      }
      
      // Update status
      setStatus({
        loading: false,
        success: false,
        txHash: "",
        error: errorMessage
      });
      
      // Show error toast with better formatting
      toast.error(
        "Transaction failed",
        errorMessage
      );
      
      // Call the error callback if provided
      if (options.onError) {
        options.onError(error);
      }
      
      return null;
    }
  };
  
  return {
    isConnected,
    account: thirdwebAccount, // Return the full ThirdWeb account to ensure it has all needed methods
    wallet: activeWallet,
    displayAddress,
    executeMarketplaceFunction,
    executeDirectTransaction, // New preferred method for direct ThirdWeb transactions
    isLoading: status.loading,
    isSuccess: status.success,
    isError: !!status.error,
    errorMessage: status.error,
    transactionHash: status.txHash
  };
} 