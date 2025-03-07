"use client";

import { useState } from "react";
import { IListingWithNFT } from "@/app/interfaces/interfaces";
import NFTCard from "./NFTCard/NFTCard";

interface NFTMarketplaceDashboardProps {
  listings: IListingWithNFT[];
}

export default function NFTMarketplaceDashboard({ listings }: NFTMarketplaceDashboardProps) {
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter listings based on active tab
  const filteredListings = listings.filter((listing) => {
    if (activeTab === "all") return true;
    return listing.collectionName?.toLowerCase().includes(activeTab);
  });
  
  // Get unique collection names for tabs
  const collections = [...new Set(listings.map((listing) => listing.collectionName))];
  
  return (
    <section className="py-16 bg-sinister-black">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <h2 className="text-3xl font-heading uppercase mb-6 md:mb-0 text-gradient-oracle">
            EXPLORE PROPHECIES
          </h2>
          
          {/* Collection Tabs */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 font-heading text-sm uppercase tracking-wider transition-colors ${
                activeTab === "all"
                  ? "bg-sinister-orange text-sinister-black"
                  : "bg-sinister-black/40 text-sinister-scroll border border-sinister-orange/30 hover:bg-sinister-orange/10"
              }`}
            >
              All
            </button>
            
            {collections.map((collection) => (
              <button
                key={collection}
                onClick={() => setActiveTab(collection?.toLowerCase() || "")}
                className={`px-4 py-2 font-heading text-sm uppercase tracking-wider transition-colors ${
                  activeTab === collection?.toLowerCase()
                    ? "bg-sinister-orange text-sinister-black"
                    : "bg-sinister-black/40 text-sinister-scroll border border-sinister-orange/30 hover:bg-sinister-orange/10"
                }`}
              >
                {collection}
              </button>
            ))}
          </div>
        </div>
        
        {/* NFT Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map((listing) => (
            <NFTCard key={listing.listingId} listing={listing} />
          ))}
        </div>
        
        {/* Empty State */}
        {filteredListings.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-heading text-sinister-orange mb-4">NO PROPHECIES FOUND</h3>
            <p className="text-sinister-scroll/70">
              There are no prophecies available in this collection yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
} 