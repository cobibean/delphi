"use client";

import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { formatAddress } from "@/app/utils/formatting";

interface ProfileHeaderProps {
  onConnectClick: () => void;
}

export default function ProfileHeader({ onConnectClick }: ProfileHeaderProps) {
  const account = useActiveAccount();
  const [imageError, setImageError] = useState(false);

  return (
    <div className="max-w-4xl mx-auto bg-ancient-wisdom rounded-xl p-8 border border-oracle-orange/20 shadow-card-normal">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="w-32 h-32 rounded-full border-4 border-oracle-orange overflow-hidden flex-shrink-0 shadow-card-hover">
          <div className="w-full h-full bg-oracle-orange/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-oracle-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
        
        <div className="flex-grow text-center md:text-left">
          <h1 className="font-heading text-3xl text-oracle-orange mb-2">
            {account ? formatAddress(account.address) : "YOUR PROFILE"}
          </h1>
          <p className="text-oracle-white/70 mb-4">
            {account 
              ? "View your NFT collection, transaction history, and more."
              : "Connect your wallet to view your NFT collection, transaction history, and more."
            }
          </p>
          {!account && (
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={onConnectClick}
                className="btn-primary"
              >
                <span className="relative z-10">CONNECT WALLET</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 