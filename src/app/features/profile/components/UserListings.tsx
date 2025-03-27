"use client";

import { executeMarketplaceTransaction } from "@/app/features/marketplace/services/prepareTransactions";
import Link from "next/link";
import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { useUserListings } from "../hooks/useUserListings";
import ListingCard from "./ListingCard";
import "./styles.css";

interface UserListingsProps {
  className?: string;
}

export default function UserListings({ className = "" }: UserListingsProps) {
  const { listings, isLoading, error, refetch, directListingsCount, auctionListingsCount } = useUserListings();
  const account = useActiveAccount();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string, type: 'success' | 'error' | 'info' } | null>(null);
  
  // Handle listing cancellation
  const handleCancelListing = async (listingId: string, isAuction = false) => {
    if (!account || isProcessing) {
      return;
    }
    
    setIsProcessing(true);
    setStatusMessage({ text: "Processing cancellation...", type: "info" });
    
    try {
      // Use the executeMarketplaceTransaction which can handle ThirdWeb accounts
      const result = isAuction 
        ? await executeMarketplaceTransaction('cancelAuction', { auctionId: listingId }, account)
        : await executeMarketplaceTransaction('cancelListing', { listingId }, account);
      
      if (result.success) {
        setStatusMessage({ 
          text: `${isAuction ? 'Auction' : 'Listing'} cancelled successfully!`, 
          type: "success" 
        });
        // Refresh the listings after a successful cancellation
        await refetch();
      } else {
        setStatusMessage({ 
          text: `Error: ${result.error}`, 
          type: "error" 
        });
      }
    } catch (error) {
      setStatusMessage({ 
        text: `Error: ${error instanceof Error ? error.message : "Failed to cancel"}`, 
        type: "error" 
      });
    } finally {
      setIsProcessing(false);
      // Clear status message after 5 seconds
      setTimeout(() => {
        setStatusMessage(null);
      }, 5000);
    }
  };
  
  // If no wallet is connected, show connect prompt
  if (!account) {
    return (
      <div className="bg-night/80 rounded-lg p-8 max-w-md mx-auto">
        <h2 className="text-2xl font-heading text-oracle-orange mb-4">My Listings</h2>
        <p className="text-oracle-white/70 mb-6">Please connect your wallet to view your marketplace listings</p>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-oracle-orange/20 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-oracle-orange/20 rounded col-span-2"></div>
                <div className="h-2 bg-oracle-orange/20 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-oracle-orange/20 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-night/80 rounded-lg p-8 max-w-md mx-auto">
        <h2 className="text-2xl font-heading text-oracle-orange mb-4">Error Loading Listings</h2>
        <p className="text-oracle-white/70 mb-6">{error.message}</p>
      </div>
    );
  }

  // Show empty state
  if (listings.length === 0) {
    return (
      <div className="max-w-4xl mx-auto bg-night/80 rounded-xl shadow-md p-6">
        <div className="text-center py-12">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="mx-auto mb-4 text-oracle-orange/60"
          >
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-xl font-heading mb-2 text-oracle-orange">No Listings Found</h3>
          <p className="text-oracle-white/70 mb-6">You haven&apos;t created any marketplace listings yet.</p>
          <Link 
            href="/create"
            className="btn-primary rounded-md inline-block"
          >
            Create Listing
          </Link>
        </div>
      </div>
    );
  }

  // Show listings
  return (
    <div className={`${className} relative`}>
      {statusMessage && (
        <div className={`fixed inset-x-0 top-4 mx-auto max-w-md z-50 animate-fade-in ${statusMessage.type === 'success' ? 'bg-gradient-to-r from-cosmic-connection to-nebula-energy' : 'bg-night/80'}`}>
          <div className="p-4 rounded-lg shadow-lg flex items-center justify-between">
            <div className="flex items-center">
              {statusMessage.type === 'success' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2 2m2 2l2 2" />
                </svg>
              )}
              <span className="font-medium text-white">{statusMessage.text}</span>
            </div>
            <button onClick={() => setStatusMessage(null)} className="text-white/70 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-heading text-oracle-orange">My Marketplace Listings</h2>
        <div className="text-oracle-white/70">
          <span className="mr-4">Direct: {directListingsCount}</span>
          <span>Auctions: {auctionListingsCount}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <ListingCard 
            key={listing.listingId}
            listing={listing}
            onCancelClick={handleCancelListing}
          />
        ))}
      </div>
    </div>
  );
} 