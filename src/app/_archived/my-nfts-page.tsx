"use client";

import { useState } from "react";
import Link from "next/link";

// Define the NFT type
interface NFT {
  id: string;
  name: string;
  image: string;
}

export default function MyNFTs() {
  // Mock data for demonstration
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  
  // If no wallet is connected, show a message
  if (!isConnected) {
    return (
      <div className="container py-12">
        <div className="bg-night/80 rounded-lg p-8 max-w-md mx-auto">
          <h1 className="text-3xl font-anton text-gradient mb-6">MY NFTS</h1>
          <p className="text-parchment/80 mb-6">Please connect your wallet to view your NFTs</p>
          <Link 
            href="/"
            className="btn-primary rounded-md inline-block"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-anton text-gradient mb-8 text-center">MY NFTS</h1>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-orange/20 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-orange/20 rounded col-span-2"></div>
                  <div className="h-2 bg-orange/20 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-orange/20 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ) : nfts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map((nft) => (
            <div key={nft.id} className="bg-night/80 rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-orange/20 to-turquoise/20 relative">
                {nft.image && (
                  <img 
                    src={nft.image} 
                    alt={nft.name} 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-anton text-orange mb-2">{nft.name}</h3>
                <Link 
                  href={`/nft/${nft.id}`} 
                  className="btn-secondary text-sm py-2 px-4 rounded-md inline-block mt-2"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-night/80 rounded-xl shadow-md p-6">
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
              className="mx-auto mb-4 text-orange/60"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <h3 className="text-xl font-anton mb-2 text-orange">No NFTs Found</h3>
            <p className="text-parchment/70 mb-6">You don't own any NFTs yet.</p>
            <Link 
              href="/explore"
              className="btn-primary rounded-md inline-block"
            >
              Explore NFTs
            </Link>
          </div>
        </div>
      )}
    </div>
  );
} 