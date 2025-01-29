// app/components/NFTMarketplaceDashboard.tsx (Client or Server depending on your usage)
"use client"; // If it needs to be interactive

import React from "react";
import { IListingWithNFT } from "@/app/interfaces/interfaces";
import NFTCard from "@/app/components/NFTCard/NFTCard";

interface NFTMarketplaceDashboardProps {
  listings: IListingWithNFT[];
  featuredListings?: IListingWithNFT[]; // Optional featured items
}

export default function NFTMarketplaceDashboard({
  listings,
}: NFTMarketplaceDashboardProps) {
  return (
    <section className="nft-marketplace-dashboard container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-turquoise-400 mb-8">All Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listings.map(listing => (
          <NFTCard 
            key={listing.listingId}
            listing={listing}
            className="w-full"
          />
        ))}
      </div>
    </section>
  );
}