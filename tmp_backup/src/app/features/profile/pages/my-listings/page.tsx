"use client";

import Link from "next/link";
import { useState } from "react";

// Define the listing type
interface Listing {
  id: string;
  name: string;
  price: number;
  description: string;
}

export default function MyListings() {
  // Mock data for demonstration
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="container py-12">
      <div className="bg-night/80 rounded-lg p-8 max-w-md mx-auto">
        <h1 className="text-3xl font-anton text-gradient mb-6">MY LISTINGS</h1>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-orange/20 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-orange/20 rounded col-span-2"></div>
                    <div className="h-2 bg-orange/20 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-orange/20 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ) : listings.length > 0 ? (
          <div className="space-y-6">
            {listings.map((listing) => (
              <div key={listing.id} className="bg-night rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-anton text-orange">{listing.name}</h3>
                  <span className="badge-orange">{listing.price} METIS</span>
                </div>
                <p className="mb-4 text-parchment/80">{listing.description}</p>
                <div className="flex justify-between">
                  <Link href={`/nft/${listing.id}`} className="btn-secondary text-sm py-2 px-4 rounded-md">
                    View Details
                  </Link>
                  <button className="btn-primary text-sm py-2 px-4 rounded-md">
                    Cancel Listing
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-parchment/70 mb-6">You haven&apos;t created any listings yet.</p>
            <Link href="/create" className="btn-primary rounded-md inline-block">
              Create Listing
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 