// app/components/NFTCard/NFTCard.tsx (Client Component)
"use client";

import React, { useState, useEffect } from "react";
import { IListingWithNFT } from "@/app/interfaces/interfaces";
import Link from "next/link";

interface NFTCardProps {
  listing: IListingWithNFT;
  className?: string;
}

export default function NFTCard({ listing, className }: NFTCardProps) {
  const { metadata, collectionName, tokenId, pricePerToken, listingId } = listing;
  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Set mounted state on client
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Simple placeholder during SSR
  if (!isMounted) {
    return <div className={`relative ${className} h-80 bg-gray-800 rounded-meme`}></div>;
  }
  
  // Client-side only random values
  const randomRotation = (Math.random() * 4 - 2).toFixed(2);
  const emojis = ["🚀", "💎", "🔥", "🤑", "💰", "🦍", "🧠", "👽", "🤖", "🦄"];
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  const priceStyles = [
    "font-comic text-psycho-rektPink",
    "font-comic text-psycho-kekGreen",
    "font-comic text-psycho-orange",
    "font-comic text-psycho-turquoise"
  ];
  const priceStyle = priceStyles[Math.floor(Math.random() * priceStyles.length)];

  return (
    <div 
      className={`relative group transform transition-all duration-500 hover:scale-105 hover:z-10 ${className}`}
      style={{ transform: `rotate(${randomRotation}deg)` }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Link href={`/nft/${listingId}`} className="block">
        <div className="degen-card">
          {/* Meme corner decorations - simplified */}
          <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-dashed border-psycho-rektPink"></div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-dashed border-psycho-kekGreen"></div>

          {/* Image Container */}
          <div className="relative overflow-hidden rounded-meme mb-3 border-2 border-psycho-orange">
            <img 
              src={metadata?.image} 
              alt={metadata?.name} 
              className="w-full aspect-square object-cover transform transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Token ID Badge */}
            <div className="absolute top-3 right-3 bg-psycho-rektPink rounded-full w-10 h-10 flex items-center justify-center text-white font-comic transform rotate-12">
              <span className="text-sm">{randomEmoji}</span>
            </div>
            
            {/* Collection Label */}
            <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-2 py-1 rounded-meme text-xs text-psycho-parchment border-2 border-dashed border-psycho-kekGreen/50">
              <span className="font-comic">{collectionName}</span>
            </div>
          </div>
          
          {/* NFT Title */}
          <h3 className="font-comic text-lg text-transparent bg-clip-text bg-gradient-to-r from-psycho-rektPink to-psycho-kekGreen mb-2 truncate">
            {metadata?.name || `NFT #${tokenId}`}
          </h3>
          
          {/* Price and View Button */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex flex-col">
              <span className="text-psycho-parchment text-xs font-comic">Price:</span>
              <span className={`font-bold ${priceStyle}`}>{pricePerToken} <span className="font-comic text-sm">METIS</span></span>
            </div>
            
            <button 
              className="degen-btn-primary py-2 px-4 text-sm rounded-meme transform transition-all duration-300"
            >
              <span className="relative z-10 font-comic">APE IN!</span>
            </button>
          </div>
        </div>
      </Link>
      
      {/* Neon glow on hover - toned down */}
      <div 
        className="absolute inset-0 rounded-meme transition-all duration-500 pointer-events-none"
        style={{ 
          boxShadow: isHovering ? '0 0 10px rgba(255, 0, 128, 0.3)' : 'none',
          opacity: isHovering ? 0.7 : 0 
        }}
      ></div>
    </div>
  );
}