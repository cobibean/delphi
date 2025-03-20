"use client";

import { useState, useEffect } from "react";
import { waitForReceipt } from "thirdweb";
import { client } from "@/config/client";
import { metisChain } from "@/config/chain";
import { useToast } from "@/components/feedback/Toast/useToast";

interface TransactionStatusProps {
  transactionHash?: string;
}

export function TransactionStatus({ transactionHash }: TransactionStatusProps) {
  const [status, setStatus] = useState<'pending' | 'confirmed' | 'failed' | 'unknown'>('pending');
  const { toast } = useToast();
  
  useEffect(() => {
    if (!transactionHash) return;
    
    const checkStatus = async () => {
      try {
        const receipt = await waitForReceipt({
          client,
          chain: metisChain,
          transactionHash: transactionHash as `0x${string}`,
        });
        
        const newStatus = receipt.status === 'success' ? 'confirmed' : 'failed';
        setStatus(newStatus);
        
        // Show toast notification based on status
        if (newStatus === 'confirmed') {
          toast.custom({
            title: "Transaction Confirmed",
            description: "Your transaction has been confirmed on the blockchain.",
            variant: "success",
            action: {
              label: "View on Explorer",
              onClick: () => window.open(`https://explorer.metis.io/tx/${transactionHash}`, '_blank')
            }
          });
        } else {
          toast.custom({
            title: "Transaction Failed",
            description: "Your transaction failed to execute on the blockchain.",
            variant: "error",
            action: {
              label: "View on Explorer",
              onClick: () => window.open(`https://explorer.metis.io/tx/${transactionHash}`, '_blank')
            }
          });
        }
      } catch (error) {
        console.error("Error checking transaction status:", error);
        setStatus('unknown');
        toast.custom({
          title: "Transaction Status Unknown",
          description: "We couldn't determine the status of your transaction. Please check the explorer for details.",
          variant: "warning",
          action: {
            label: "View on Explorer",
            onClick: () => window.open(`https://explorer.metis.io/tx/${transactionHash}`, '_blank')
          }
        });
      }
    };
    
    // Show pending toast when starting to check status
    toast.custom({
      title: "Transaction Pending",
      description: "Your transaction is being processed on the blockchain...",
      variant: "info",
      action: {
        label: "View on Explorer",
        onClick: () => window.open(`https://explorer.metis.io/tx/${transactionHash}`, '_blank')
      }
    });
    
    checkStatus();
  }, [transactionHash, toast]);
  
  useEffect(() => {
    if (status === "failed") {
      toast.custom({
        title: "Transaction Failed",
        description: "The transaction failed to complete. Please try again.",
        variant: "error"
      });
    } else if (status === "confirmed") {
      toast.custom({
        title: "Transaction Successful",
        description: "Your transaction has been confirmed!",
        variant: "success"
      });
    }
  }, [status, toast]);
  
  // Return null since we're using toasts instead of inline status
  return null;
} 