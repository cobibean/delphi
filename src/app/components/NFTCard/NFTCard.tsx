// app/components/NFTCard/NFTCard.tsx (Client Component)
"use client";

import React from "react";
import { IListingWithNFT } from "@/app/interfaces/interfaces";
import Link from "next/link";

interface NFTCardProps {
  listing: IListingWithNFT;
  className?: string;
}

export default function NFTCard({ listing, className }: NFTCardProps) {
  const { metadata, collectionName, tokenId, pricePerToken, listingId } = listing;

  return (
    <div className={`nft-card bg-[#0a0a0a] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-orange-400 ${className}`}>
      <Link href={`/nft/${listingId}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-900">
          <img 
            src={metadata?.image} 
            alt={metadata?.name} 
            className="absolute inset-0 w-full h-full object-cover object-center border-b-4 border-turquoise-400"
          />
          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
            #{tokenId}
          </div>
        </div>
        <div className="p-4 space-y-2 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-turquoise-400 truncate">
            {metadata?.name || `NFT #${tokenId}`}
          </h3>
          <p className="text-turquoise-300 text-sm font-mono truncate">{collectionName}</p>
          <div className="flex justify-between items-center mt-4">
            <div className="text-white font-bold">
              {pricePerToken} <span className="text-xs text-gray-400">METIS</span>
            </div>
            <button 
              className="bg-turquoise-400 hover:bg-turquoise-500 text-white text-sm font-bold py-2 px-4 rounded-full transition-all duration-300 border-2 border-white hover:border-orange-400"
            >
              View Details
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}