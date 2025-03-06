"use client";

import { useActiveAccount } from "thirdweb/react";
import Link from "next/link";

export default function MyListingsPage() {
  const account = useActiveAccount();
  
  // If no wallet is connected, show a message
  if (!account) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">My Listings</h1>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 max-w-md mx-auto">
          <p className="text-lg mb-6">Please connect your wallet to view your listings</p>
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
      <h1 className="text-3xl font-bold mb-8 text-center">My Listings</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-6">
          <Link 
            href="/create"
            className="bg-gradient-to-r from-turquoise-400 to-orange-400 text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-all"
          >
            Create New Listing
          </Link>
        </div>
        
        {/* Content Area - Listings */}
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
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            <h3 className="text-xl font-medium mb-2">No Listings Found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">You haven't created any listings yet.</p>
            <Link 
              href="/create"
              className="inline-block bg-gradient-to-r from-turquoise-400 to-orange-400 text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-all"
            >
              Create Your First Listing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 