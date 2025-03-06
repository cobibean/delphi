"use client";

import { useActiveAccount } from "thirdweb/react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const account = useActiveAccount();
  const [copySuccess, setCopySuccess] = useState(false);
  
  // If no wallet is connected, show a message
  if (!account) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 max-w-md mx-auto">
          <p className="text-lg mb-6">Please connect your wallet to view your profile</p>
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

  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Copy address to clipboard
  const copyAddressToClipboard = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My Profile</h1>
      
      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-8">
          <div className="flex flex-col md:flex-row items-center">
            {/* Avatar Placeholder */}
            <div className="w-24 h-24 bg-gradient-to-r from-turquoise-400 to-orange-400 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 md:mb-0 md:mr-6">
              {account.address.substring(2, 4).toUpperCase()}
            </div>
            
            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">Wallet Address</h2>
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-4">
                <span className="text-gray-700 dark:text-gray-300 mr-2 font-mono">
                  {account.address}
                </span>
                <button 
                  onClick={copyAddressToClipboard}
                  className="text-turquoise-400 hover:text-turquoise-500"
                >
                  {copySuccess ? (
                    <span className="text-green-500 text-sm">Copied!</span>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  )}
                </button>
              </div>
              
              {/* Wallet Type */}
              <div className="flex items-center mb-4">
                <span className="text-gray-600 dark:text-gray-400 mr-2">Wallet Type:</span>
                <span className="font-medium">Connected Wallet</span>
              </div>
              
              {/* Edit Profile Button */}
              <button className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs for NFTs, Listings, etc. */}
      <div className="max-w-4xl mx-auto">
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="flex space-x-8">
            <button className="border-b-2 border-turquoise-400 text-turquoise-400 py-4 px-1 font-medium">
              My NFTs
            </button>
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 py-4 px-1 font-medium">
              My Listings
            </button>
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 py-4 px-1 font-medium">
              Transaction History
            </button>
          </nav>
        </div>
        
        {/* Content Area - NFTs Tab (Default) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
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
    </div>
  );
} 