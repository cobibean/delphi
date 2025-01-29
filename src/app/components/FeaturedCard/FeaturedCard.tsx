"use client";
import React, { useState } from "react";
import { IListingWithNFT } from "@/app/interfaces/interfaces";

interface FeaturedCardProps {
  listing: IListingWithNFT;
  className?: string;
}

export default function FeaturedCard({ listing, className }: FeaturedCardProps) {
  const { metadata, collectionName, pricePerToken } = listing;
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={`featured-card bg-[#0a0a0a] rounded-xl overflow-hidden shadow-2xl border-2 border-turquoise-400 hover:border-orange-400 transition-all duration-300 flex ${className}`}>
      <div className="flex-shrink-0 w-96 aspect-square overflow-hidden bg-gray-900">
        <img
          src={metadata?.image}
          alt={metadata?.name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="flex-1 p-8 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] flex flex-col justify-center">
        <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-turquoise-400 mb-4">
          {metadata?.name}
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-turquoise-300 text-lg font-mono">Collection:</span>
            <span className="text-orange-300 text-lg font-semibold">{collectionName}</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-turquoise-400 hover:bg-turquoise-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 border-2 border-white hover:border-orange-400">
              Mint for {pricePerToken} WMETIS
            </button>
            <div className="flex items-center gap-2 bg-transparent border border-white/20 rounded-full p-1">
              <button className="w-8 h-8 rounded-full bg-transparent text-white hover:bg-white/10">-</button>
              <span className="px-3 text-white">{quantity}</span>
              <button className="w-8 h-8 rounded-full bg-transparent text-white hover:bg-white/10">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 