"use client";

import { useActiveAccount } from "thirdweb/react";

interface ProfileStatsProps {
  nftCount?: number;
  transactionCount?: number;
  totalValue?: string;
}

export default function ProfileStats({ nftCount = 0, transactionCount = 0, totalValue = "0" }: ProfileStatsProps) {
  const account = useActiveAccount();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="stat-card">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-oracle-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
        <div className="stat-number text-oracle-white/50">
          {account ? nftCount : "--"}
        </div>
        <div className="stat-label">NFTs Owned</div>
      </div>
      
      <div className="stat-card">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-oracle-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
        <div className="stat-number text-oracle-white/50">
          {account ? transactionCount : "--"}
        </div>
        <div className="stat-label">Transactions</div>
      </div>
      
      <div className="stat-card">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-oracle-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="stat-number text-oracle-white/50">
          {account ? `${totalValue} METIS` : "--"}
        </div>
        <div className="stat-label">Total Value</div>
      </div>
    </div>
  );
} 