"use client";

import { useState, useEffect } from "react";
import { IListingWithNFT } from "@/interfaces/interfaces";
import { NFTCard } from "@/features/nft/components";
import { useToast } from "@/components/feedback/Toast/useToast";

interface NFTMarketplaceDashboardProps {
  listings: IListingWithNFT[];
}

export default function NFTMarketplaceDashboard({ listings }: NFTMarketplaceDashboardProps) {
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();
  
  // Filter listings based on active tab
  const filteredListings = listings.filter((listing) => {
    if (activeTab === "all") return true;
    return listing.collectionName?.toLowerCase().includes(activeTab);
  });
  
  // Get unique collection names for tabs
  const collections = listings
    .map((listing) => listing.collectionName || "Unknown")
    .filter((value, index, self) => self.indexOf(value) === index);
  
  useEffect(() => {
    // Show toast when switching to a collection with no NFTs
    if (activeTab !== "all" && filteredListings.length === 0) {
      toast.custom({
        title: "No NFTs Found",
        description: `No NFTs found in the ${activeTab} collection. Try selecting a different collection.`,
        variant: "info"
      });
    }
  }, [activeTab, filteredListings.length, toast]);
  
  const handleTabChange = (collection: string) => {
    setActiveTab(collection.toLowerCase());
    if (collection === "all") {
      toast.custom({
        title: "Showing All NFTs",
        description: "Displaying NFTs from all collections.",
        variant: "info"
      });
    } else {
      toast.custom({
        title: `Showing ${collection} NFTs`,
        description: `Filtering NFTs from the ${collection} collection.`,
        variant: "info"
      });
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-heading text-oracle-white">Explore NFTs</h2>
        
        {/* Collection filter tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleTabChange("all")}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === "all"
                ? "bg-cosmic-combustion text-oracle-white"
                : "bg-oracle-black-void text-oracle-white/60 hover:bg-oracle-black-matter"
            }`}
          >
            All
          </button>
          
          {collections.map((collection) => (
            <button
              key={collection}
              onClick={() => handleTabChange(collection)}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === collection.toLowerCase()
                  ? "bg-cosmic-combustion text-oracle-white"
                  : "bg-oracle-black-void text-oracle-white/60 hover:bg-oracle-black-matter"
              }`}
            >
              {collection}
            </button>
          ))}
        </div>
      </div>
      
      {/* NFT Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredListings.map((listing) => (
          <NFTCard key={listing.listingId} listing={listing} />
        ))}
        
        {filteredListings.length === 0 && (
          <div className="col-span-full py-12 text-center text-oracle-white/60">
            <p className="text-xl">No NFTs found in this collection</p>
          </div>
        )}
      </div>
    </div>
  );
} 