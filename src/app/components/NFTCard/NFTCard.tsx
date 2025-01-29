// app/components/NFTCard/NFTCard.tsx (Client Component)
"use client";

import React, { useState } from "react";
import { IListingWithNFT } from "@/app/interfaces/interfaces";

interface NFTCardProps {
  listing: IListingWithNFT;
  className?: string;
}

export default function NFTCard({ listing, className }: NFTCardProps) {
  const { metadata, collectionName, tokenId, pricePerToken } = listing;
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={`nft-card bg-[#0a0a0a] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-orange-400 ${className}`}>
      <div className="relative aspect-square overflow-hidden bg-gray-900">
        <img 
          src={metadata?.image} 
          alt={metadata?.name} 
          className="absolute inset-0 w-full h-full object-cover object-center border-b-4 border-turquoise-400"
        />
      </div>
      <div className="p-4 space-y-2 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-turquoise-400">
          {metadata?.name || `NFT #${tokenId}`}
        </h3>
        <p className="text-turquoise-300 text-sm font-mono">{collectionName}</p>
        <div className="flex justify-between items-center mt-4">
          <button className="bg-turquoise-400 hover:bg-turquoise-500 text-white text-sm font-bold py-2 px-4 rounded-full transition-all duration-300 border-2 border-white hover:border-orange-400">
            Mint for {pricePerToken} WMETIS
          </button>
          <div className="flex items-center gap-1 bg-transparent border border-white/20 rounded-full p-1">
            <button className="w-6 h-6 rounded-full bg-transparent text-white hover:bg-white/10 text-xs">-</button>
            <span className="px-2 text-sm text-white">1</span>
            <button className="w-6 h-6 rounded-full bg-transparent text-white hover:bg-white/10 text-xs">+</button>
          </div>
        </div>
      </div>
    </div>
  );
}