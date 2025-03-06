// app/components/NFTCard/NFTCard.tsx (Client Component)
"use client";

import React, { useState, useEffect, useContext } from "react";
import { IListingWithNFT } from "@/app/interfaces/interfaces";
import Link from "next/link";
import { ThemeContext } from "@/app/context/ThemeContext";

interface NFTCardProps {
  listing: IListingWithNFT;
  className?: string;
}

export default function NFTCard({ listing, className }: NFTCardProps) {
  const { metadata, collectionName, tokenId, pricePerToken, listingId } = listing;
  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const { isDegenMode } = useContext(ThemeContext);
  
  // Set mounted state on client
  useEffect(() => {
    setIsMounted(true);
    
    // Random glitch effect - more frequent in degen mode
    const glitchInterval = setInterval(() => {
      if (Math.random() > (isDegenMode ? 0.6 : 0.8)) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), isDegenMode ? 300 : 200);
      }
    }, isDegenMode ? 2000 : 4000);
    
    return () => clearInterval(glitchInterval);
  }, [isDegenMode]);
  
  // Simple placeholder during SSR
  if (!isMounted) {
    return <div className={`relative ${className} h-80 bg-gutter-glow rounded-sm`}></div>;
  }
  
  // Client-side only random values
  const priceStyles = isDegenMode ? [
    "text-blood font-bold",
    "text-sinister-red",
    "text-sinister-gold",
  ] : [
    "text-sinister-orange",
    "text-sinister-teal",
    "text-sinister-gold",
  ];
  const priceStyle = priceStyles[Math.floor(Math.random() * priceStyles.length)];

  return (
    <div 
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Link href={`/nft/${listingId}`} className="block">
        <div className={`${isDegenMode ? 'dark-degen-card' : 'dark-card'} transition-all duration-500 ${glitchActive ? 'animate-glitch' : ''}`}>
          {/* Burned corner effect */}
          <div className={`absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 ${
            isDegenMode ? 'border-sinister-red/60' : 'border-sinister-orange/60'
          } rounded-tl-sm`}></div>
          
          {/* Image Container */}
          <div className="relative overflow-hidden rounded-sm mb-3">
            {/* Overlay for degen mode */}
            {isDegenMode && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
            )}
            
            <img 
              src={metadata?.image} 
              alt={metadata?.name} 
              className={`w-full aspect-square object-cover transform transition-transform duration-700 
                ${isHovering ? (isDegenMode ? 'scale-110 filter-static' : 'scale-105') : ''}
                ${isDegenMode ? 'filter-dark' : ''}`}
            />
            
            {/* Token ID Badge */}
            <div className={`absolute top-3 right-3 ${
              isDegenMode 
                ? 'bg-sinister-black/80 text-sinister-red border-r border-t border-sinister-red/40' 
                : 'bg-sinister-black/70 text-sinister-orange border-r border-t border-sinister-orange/40'
            } rounded-sm px-2 py-1 font-heading text-xs uppercase tracking-wider z-20`}>
              #{tokenId}
            </div>
            
            {/* Collection Label */}
            <div className={`absolute bottom-3 left-3 ${
              isDegenMode 
                ? 'bg-black/70 backdrop-blur-sm border-l border-b border-blood/40' 
                : 'bg-black/70 backdrop-blur-sm border-l border-b border-sinister-teal/40'
            } px-2 py-1 rounded-sm text-xs text-sinister-scroll uppercase tracking-wider z-20`}>
              <span className="font-heading">{collectionName}</span>
            </div>
          </div>
          
          {/* NFT Title */}
          <h3 className={`font-heading text-lg uppercase ${
            isDegenMode 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-blood to-sinister-red' 
              : 'text-transparent bg-clip-text bg-tarnished-fortune'
          } mb-2 truncate`}>
            {metadata?.name || `NFT #${tokenId}`}
          </h3>
          
          {/* Price and View Button */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex flex-col">
              <span className="text-sinister-scroll/70 text-xs uppercase tracking-wider">Price:</span>
              <span className={`font-bold ${priceStyle}`}>
                {pricePerToken} <span className="text-sm">METIS</span>
              </span>
            </div>
            
            <button 
              className={`${
                isDegenMode ? 'dark-degen-btn-primary' : 'dark-btn-primary'
              } py-2 px-4 text-sm rounded-sm transform transition-all duration-300`}
            >
              <span className="relative z-10 font-heading">
                {isDegenMode ? 'CLAIM SOUL' : 'VIEW DETAILS'}
              </span>
            </button>
          </div>
        </div>
      </Link>
      
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 rounded-sm transition-all duration-500 pointer-events-none"
        style={{ 
          boxShadow: isHovering 
            ? isDegenMode 
              ? '0 0 20px rgba(255, 45, 85, 0.3)' 
              : '0 0 20px rgba(237, 137, 54, 0.2)'
            : 'none',
          opacity: isHovering ? 0.7 : 0 
        }}
      ></div>
    </div>
  );
}