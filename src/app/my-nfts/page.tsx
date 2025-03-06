"use client";

import { useActiveAccount } from "thirdweb/react";
import Link from "next/link";

export default function MyNFTsPage() {
  const account = useActiveAccount();
  
  // If no wallet is connected, show a message
  if (!account) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">My NFTs</h1>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 max-w-md mx-auto">
          <p className="text-lg mb-6">Please connect your wallet to view your NFTs</p>
          <Link 
            href="/"
            className="inline-block bg-gradient-to-r from-turquoise-400 to-orange-400 text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My NFTs</h1>
      
      {/* Content Area - NFTs Tab (Default) */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="text-center py-12">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="mx-auto mb-4 text-gray-400"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          <h3 className="text-xl font-medium mb-2">No NFTs Found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">You don't own any NFTs yet.</p>
          <Link 
            href="/explore"
            className="inline-block bg-gradient-to-r from-turquoise-400 to-orange-400 text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-all"
          >
            Explore NFTs
          </Link>
        </div>
      </div>
    </div>
  );
} 