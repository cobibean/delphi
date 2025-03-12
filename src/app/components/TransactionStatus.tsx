"use client";

import { useState, useEffect } from "react";
import { waitForReceipt } from "thirdweb";
import { client } from "../client";
import { metisChain } from "../config/chain";

interface TransactionStatusProps {
  transactionHash?: string;
}

export function TransactionStatus({ transactionHash }: TransactionStatusProps) {
  const [status, setStatus] = useState<'pending' | 'confirmed' | 'failed' | 'unknown'>('pending');
  
  useEffect(() => {
    if (!transactionHash) return;
    
    const checkStatus = async () => {
      try {
        const receipt = await waitForReceipt({
          client,
          chain: metisChain,
          transactionHash: transactionHash as `0x${string}`,
        });
        
        setStatus(receipt.status === 'success' ? 'confirmed' : 'failed');
      } catch (error) {
        console.error("Error checking transaction status:", error);
        setStatus('unknown');
      }
    };
    
    checkStatus();
  }, [transactionHash]);
  
  return (
    <div className="mt-2">
      {status === 'pending' && (
        <span className="text-sinister-orange">Transaction pending...</span>
      )}
      {status === 'confirmed' && (
        <span className="text-sinister-teal">Transaction confirmed!</span>
      )}
      {status === 'failed' && (
        <span className="text-sinister-red">Transaction failed on-chain</span>
      )}
      {status === 'unknown' && (
        <span className="text-sinister-scroll">Transaction status unknown</span>
      )}
      
      {transactionHash && (
        <a
          href={`https://explorer.metis.io/tx/${transactionHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-sinister-teal hover:text-sinister-teal/80 underline ml-2"
        >
          View on Metis Explorer
        </a>
      )}
    </div>
  );
} 