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
  const [animationFrame, setAnimationFrame] = useState(0);

  // Generate a random rotation for the card between -5 and 5 degrees
  const randomRotation = React.useMemo(() => (Math.random() * 10 - 5).toFixed(2), []);
  
  // Random emoji for each card
  const emojis = ["🚀", "💎", "🔥", "🤑", "💰", "🦍", "🧠", "👽", "🤖", "🦄"];
  const randomEmoji = React.useMemo(() => emojis[Math.floor(Math.random() * emojis.length)], []);
  
  // Price display with random styling
  const priceStyle = React.useMemo(() => {
    const styles = [
      "font-comic text-psycho-rektPink",
      "font-comic text-psycho-kekGreen",
      "font-impact text-psycho-orange",
      "font-comic text-psycho-turquoise"
    ];
    return styles[Math.floor(Math.random() * styles.length)];
  }, []);
  
  // Animate on hover
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovering) {
      interval = setInterval(() => {
        setAnimationFrame(prev => (prev + 1) % 3);
      }, 300);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovering]);

  return (
    <div 
      className={`relative group transform transition-all duration-500 hover:scale-110 hover:z-10 ${className}`}
      style={{ transform: `rotate(${randomRotation}deg)` }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Link href={`/nft/${listingId}`} className="block">
        <div className="degen-card">
          {/* Meme corner decorations */}
          <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-dashed border-psycho-rektPink"></div>
          <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-dashed border-psycho-kekGreen"></div>
          <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-dashed border-psycho-kekGreen"></div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-dashed border-psycho-rektPink"></div>

          {/* Image Container */}
          <div className="relative overflow-hidden rounded-meme mb-3 border-2 border-psycho-orange transform rotate-1">
            <img 
              src={metadata?.image} 
              alt={metadata?.name} 
              className="w-full aspect-square object-cover transform transition-transform duration-700 group-hover:scale-110"
              style={{ 
                transform: isHovering ? `scale(1.1) rotate(${animationFrame * 2}deg)` : 'scale(1)',
                transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)' 
              }}
            />
            
            {/* Token ID Badge */}
            <div className="absolute top-3 right-3 bg-psycho-rektPink rounded-full w-12 h-12 flex items-center justify-center text-white font-comic transform rotate-12 animate-pulse-neon">
              <span className="text-sm font-bold">{randomEmoji}{tokenId}</span>
            </div>
            
            {/* Collection Label */}
            <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-2 py-1 rounded-meme text-xs text-psycho-parchment border-2 border-dashed border-psycho-kekGreen/50 transform -rotate-2">
              <span className="font-comic">{collectionName}</span>
            </div>
          </div>
          
          {/* NFT Title with wiggle */}
          <h3 className="font-comic text-lg text-transparent bg-clip-text bg-gradient-to-r from-psycho-rektPink to-psycho-kekGreen mb-2 truncate wiggly-text">
            {metadata?.name || `NFT #${tokenId}`}
          </h3>
          
          {/* Speech bubble description (only on hover) */}
          {isHovering && metadata?.description && (
            <div className="speech-bubble mb-3 transform -rotate-2 text-xs">
              <p className="font-comic">
                {metadata.description.slice(0, 50)}
                {metadata.description.length > 50 ? '...' : ''}
              </p>
            </div>
          )}
          
          {/* Price and View Button */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex flex-col transform -rotate-3">
              <span className="text-psycho-parchment text-xs font-comic">Price:</span>
              <span className={`font-bold ${priceStyle}`}>{pricePerToken} <span className="font-comic text-sm">METIS</span></span>
            </div>
            
            <button 
              className="degen-btn-primary py-2 px-4 text-sm rounded-meme transform transition-all duration-300"
            >
              <span className="relative z-10 font-comic text-glow-pink">APE IN!</span>
            </button>
          </div>
        </div>
      </Link>
      
      {/* Meme stickers randomly positioned */}
      <div className="absolute -top-3 -right-3 transform rotate-12">
        {Math.random() > 0.5 && (
          <img 
            src={`https://api.dicebear.com/6.x/bottts/svg?seed=${tokenId}`} 
            alt="Sticker" 
            className="w-8 h-8 animate-pulse-neon"
          />
        )}
      </div>
      
      {/* Neon glow on hover */}
      <div 
        className="absolute inset-0 rounded-meme transition-all duration-500 pointer-events-none"
        style={{ 
          boxShadow: isHovering ? '0 0 20px rgba(255, 0, 128, 0.5), 0 0 40px rgba(0, 255, 0, 0.3)' : 'none',
          opacity: isHovering ? 1 : 0 
        }}
      ></div>
    </div>
  );
}