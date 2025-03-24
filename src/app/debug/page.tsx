"use client";

import { getAllListings } from "@/app/features/marketplace/services";
import TestToast from "@/components/feedback/test/TestToast";
import { MARKETPLACE_ADDRESS } from "@/constants/contracts";
import { IListingWithNFT } from "@/interfaces/interfaces";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DebugPage() {
  const [listings, setListings] = useState<IListingWithNFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching listings from contract at:", MARKETPLACE_ADDRESS);
        setIsLoading(true);
        const result = await getAllListings();
        console.log("Fetched listings:", result);
        setListings(result);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4 text-oracle-orange">Marketplace Debug</h1>
      
      {/* Toast Test Section */}
      <div className="mb-8 border border-oracle-orange/20 rounded-lg p-6 bg-oracle-black/20">
        <h2 className="text-2xl font-bold mb-4 text-oracle-turquoise">Toast Testing</h2>
        <TestToast />
      </div>
      
      <div className="mb-6">
        <p className="text-white mb-2">Contract Address: <span className="font-mono text-oracle-turquoise">{MARKETPLACE_ADDRESS}</span></p>
        <Link href="/" className="text-oracle-orange hover:underline mb-4 inline-block">
          &larr; Back to Home
        </Link>
      </div>

      {isLoading && (
        <div className="p-4 bg-oracle-black/30 rounded mb-4">
          <p className="text-oracle-orange">Loading marketplace data...</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-900/30 border border-red-500 rounded mb-4">
          <h2 className="text-red-400 font-bold mb-2">Error Loading Data</h2>
          <p className="text-red-300">{error}</p>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-oracle-turquoise">Raw Response</h2>
        <p className="mb-2">Total Listings: {listings.length}</p>
        
        <pre className="bg-oracle-black/50 p-4 rounded overflow-auto max-h-40 mb-4 text-xs">
          {JSON.stringify(listings, null, 2)}
        </pre>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-oracle-turquoise">Listing Details</h2>
        
        {listings.length === 0 && !isLoading && (
          <div className="p-4 bg-oracle-black/30 rounded mb-4">
            <p className="text-oracle-orange">No listings found. This could mean:</p>
            <ul className="list-disc pl-5 mt-2 text-oracle-white">
              <li>The marketplace contract has no active listings</li>
              <li>There was an error fetching or parsing the listings</li>
              <li>The contract address is incorrect</li>
            </ul>
          </div>
        )}
        
        {listings.map((listing) => (
          <div key={listing.listingId} className="border border-oracle-orange/20 rounded-lg p-6 mb-6 bg-oracle-black/20">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image */}
              <div className="w-full md:w-1/3">
                {listing.metadata?.image ? (
                  <img 
                    src={listing.metadata.image} 
                    alt={listing.metadata.name || `NFT #${listing.tokenId}`}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-40 bg-oracle-black/50 rounded-lg flex items-center justify-center">
                    <p className="text-oracle-orange">No Image Available</p>
                  </div>
                )}
              </div>
              
              {/* Details */}
              <div className="w-full md:w-2/3">
                <h3 className="text-2xl font-bold mb-2 text-oracle-orange">
                  {listing.metadata?.name || `NFT #${listing.tokenId}`}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-oracle-white"><span className="text-oracle-turquoise">Listing ID:</span> {listing.listingId}</p>
                    <p className="text-oracle-white"><span className="text-oracle-turquoise">Token ID:</span> {listing.tokenId}</p>
                    <p className="text-oracle-white"><span className="text-oracle-turquoise">Price:</span> {listing.pricePerToken} METIS</p>
                    <p className="text-oracle-white"><span className="text-oracle-turquoise">Collection:</span> {listing.collectionName || "Unknown"}</p>
                  </div>
                  <div>
                    <p className="text-oracle-white"><span className="text-oracle-turquoise">Asset Contract:</span></p>
                    <p className="text-oracle-white/70 text-sm font-mono break-all">{listing.assetContract}</p>
                    <p className="text-oracle-white mt-2"><span className="text-oracle-turquoise">Seller:</span></p>
                    <p className="text-oracle-white/70 text-sm font-mono break-all">{listing.sellerAddress}</p>
                  </div>
                </div>
                
                {listing.metadata?.description && (
                  <div className="mb-4">
                    <h4 className="text-oracle-turquoise mb-1">Description:</h4>
                    <p className="text-oracle-white/90">{listing.metadata.description}</p>
                  </div>
                )}
                
                {/* Metadata */}
                <div className="mb-4">
                  <h4 className="text-oracle-turquoise mb-1">Attributes:</h4>
                  {listing.metadata?.attributes && listing.metadata.attributes.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {listing.metadata.attributes.map((attr: any, index: number) => (
                        <div key={index} className="bg-oracle-black/50 rounded px-2 py-1 text-sm">
                          <span className="text-oracle-turquoise">{attr.trait_type}:</span> {attr.value}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-oracle-white/50">No attributes found</p>
                  )}
                </div>
                
                <div className="mt-4">
                  <Link 
                    href={`/nft/${listing.listingId}`}
                    className="bg-oracle-orange text-oracle-black px-4 py-2 rounded hover:bg-oracle-orange/80 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 