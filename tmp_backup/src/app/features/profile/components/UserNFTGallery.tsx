"use client";

import Link from "next/link";
import { useActiveAccount } from "thirdweb/react";
import { useUserNFTs } from "../hooks/useUserNFTs";
import ProfileNFTCard from "./NFTCard";
import "./styles.css";

interface UserNFTGalleryProps {
  className?: string;
}

export default function UserNFTGallery({ className = "" }: UserNFTGalleryProps) {
  const { nfts, isLoading, error, totalCount } = useUserNFTs();
  const account = useActiveAccount();
  
  // If no wallet is connected, show connect prompt
  if (!account) {
    return (
      <div className="bg-night/80 rounded-lg p-8 max-w-md mx-auto">
        <h2 className="text-2xl font-heading text-oracle-orange mb-4">My NFTs</h2>
        <p className="text-oracle-white/70 mb-6">Please connect your wallet to view your NFTs</p>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-oracle-orange/20 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-oracle-orange/20 rounded col-span-2"></div>
                <div className="h-2 bg-oracle-orange/20 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-oracle-orange/20 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-night/80 rounded-lg p-8 max-w-md mx-auto">
        <h2 className="text-2xl font-heading text-oracle-orange mb-4">Error Loading NFTs</h2>
        <p className="text-oracle-white/70 mb-6">{error.message}</p>
      </div>
    );
  }

  // Show empty state
  if (nfts.length === 0) {
    return (
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
            className="mx-auto mb-4 text-oracle-orange/60"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          <h3 className="text-xl font-heading mb-2 text-oracle-orange">No NFTs Found</h3>
          <p className="text-oracle-white/70 mb-6">You haven&apos;t acquired any NFTs yet.</p>
          <Link 
            href="/explore"
            className="btn-primary rounded-md inline-block"
          >
            Explore NFTs
          </Link>
        </div>
      </div>
    );
  }

  // Show NFT gallery
  return (
    <div className={`${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-heading text-oracle-orange">My NFT Collection</h2>
        <span className="text-oracle-white/70">{totalCount} NFTs</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nfts.map((nft) => (
          <ProfileNFTCard key={`${nft.contractAddress}-${nft.id}`} nft={nft} />
        ))}
      </div>
    </div>
  );
} 