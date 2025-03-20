"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getListing, getAuction, getAllListings } from "@/app/features/marketplace/services/marketplace-v5";
import NFTDetailView from "@/app/features/nft/components/NFTDetailView";
import LoadingIndicator from "@/app/components/feedback/LoadingIndicator";
import Link from "next/link";
import { IListingWithNFT } from "@/app/interfaces/interfaces";

export default function NFTDetailPage() {
  const params = useParams();
  const listingId = params?.id as string;
  
  const [listing, setListing] = useState<IListingWithNFT | null>(null);
  const [relatedListings, setRelatedListings] = useState<IListingWithNFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        // Fetch the specific listing by ID
        console.log(`Fetching listing ID: ${listingId}`);
        
        // Try to fetch as a direct listing first
        let fetchedListing = await getListing(listingId);
        
        // If not found as a direct listing, try as an auction
        if (!fetchedListing) {
          console.log(`Listing not found, trying as auction ID: ${listingId}`);
          fetchedListing = await getAuction(listingId);
        }
        
        if (!fetchedListing) {
          setError("NFT listing not found");
          setIsLoading(false);
          return;
        }
        
        console.log("Fetched listing:", fetchedListing);
        console.log("Listing metadata:", fetchedListing.metadata);
        console.log("Listing image URL:", fetchedListing.metadata?.image);
        console.log("Is auction:", 'isAuction' in fetchedListing && fetchedListing.isAuction);
        
        setListing(fetchedListing);
        
        // Fetch all listings to find related ones
        const allListings = await getAllListings();
        
        // Filter related listings (same collection but not the current one)
        const related = allListings.filter(
          item => item.collectionName === fetchedListing.collectionName && 
          item.listingId !== fetchedListing.listingId
        );
        
        console.log(`Found ${related.length} related listings`);
        
        setRelatedListings(related);
        setIsLoading(false);
      } catch (err: any) {
        console.error("Error fetching listing:", err);
        setError(err.message || "Failed to load NFT details");
        setIsLoading(false);
      }
    }
    
    if (listingId) {
      fetchData();
    }
  }, [listingId]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sinister-black">
        <div className="text-center">
          <LoadingIndicator size="large" />
          <p className="mt-4 text-sinister-orange">Loading NFT data...</p>
        </div>
      </div>
    );
  }
  
  if (error || !listing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sinister-black p-4">
        <div className="bg-sinister-black/50 border border-sinister-orange/30 p-6 rounded-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-heading text-sinister-orange mb-4">Error</h2>
          <p className="text-sinister-scroll mb-6">{error || "NFT not found"}</p>
          <Link href="/" className="btn-primary inline-block">
            <span className="relative z-10">Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }
  
  // Debug: Log the listing data before passing it to the NFTDetailView component
  console.log("Passing listing to NFTDetailView:", listing);
  console.log("Listing metadata:", listing.metadata);
  console.log("Listing image URL:", listing.metadata?.image);
  
  return (
    <div className="bg-sinister-black">
      <NFTDetailView listing={listing} relatedListings={relatedListings} />
    </div>
  );
} 