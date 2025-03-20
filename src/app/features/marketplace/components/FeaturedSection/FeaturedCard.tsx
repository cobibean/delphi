"use client";
import React, { useState } from "react";
import { IListingWithNFT } from "@/interfaces/interfaces";
import { useToast } from "@/components/feedback/Toast/useToast";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import { buyWithMetis } from "@/app/features/marketplace/services/marketplace-v5";

interface FeaturedCardProps {
  listing: IListingWithNFT;
  className?: string;
  onAcquire?: (listing: IListingWithNFT) => Promise<void>;
}

export default function FeaturedCard({ listing, className, onAcquire }: FeaturedCardProps) {
  const { metadata, collectionName, pricePerToken, listingId } = listing;
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const account = useActiveAccount();
  const wallet = useActiveWallet();

  const handleAcquire = async () => {
    // If the onAcquire prop is provided, use that (for custom handling)
    if (onAcquire) {
      try {
        setIsLoading(true);
        await onAcquire(listing);
        toast.custom({
          title: "NFT Acquisition Started",
          description: "Your request to acquire this NFT has been initiated. Please check your wallet for confirmation.",
          variant: "success"
        });
      } catch (error) {
        console.error("Error acquiring NFT:", error);
        toast.custom({
          title: "Failed to Acquire NFT",
          description: error instanceof Error ? error.message : "An error occurred while trying to acquire this NFT. Please try again.",
          variant: "error"
        });
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Otherwise, handle the acquisition directly here
    try {
      // Check if user is connected
      if (!account || !wallet) {
        toast.custom({
          title: "Wallet Required",
          description: "Please connect your wallet to acquire this NFT.",
          variant: "warning"
        });
        return;
      }

      setIsLoading(true);

      // Use buyWithMetis function
      const result = await buyWithMetis(listingId, wallet);

      if (result.success) {
        toast.custom({
          title: "Purchase Successful",
          description: `You have successfully acquired ${metadata?.name || "this NFT"}!`,
          variant: "success"
        });
      } else {
        toast.custom({
          title: "Purchase Failed",
          description: "The transaction could not be completed. Please try again.",
          variant: "error"
        });
      }
    } catch (error) {
      console.error("Error acquiring NFT:", error);
      toast.custom({
        title: "Failed to Acquire NFT",
        description: error instanceof Error ? error.message : "An error occurred while trying to acquire this NFT. Please try again.",
        variant: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`featured-card bg-[#0a0a0a] rounded-xl overflow-hidden shadow-2xl border-2 border-turquoise-400 hover:border-orange-400 transition-all duration-300 flex ${className}`}>
      <div className="flex-shrink-0 w-96 aspect-square overflow-hidden bg-gray-900">
        {metadata?.image ? (
          <img
            src={metadata.image}
            alt={metadata.name || "Featured NFT"}
            className="w-full h-full object-cover object-center"
            onError={() => {
              toast.custom({
                title: "Image Load Failed",
                description: "Failed to load the NFT image. Please check your connection and try again.",
                variant: "warning"
              });
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>
      
      <div className="flex-1 p-8 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] flex flex-col justify-center">
        <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-turquoise-400 mb-4">
          {metadata?.name || "Unnamed NFT"}
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-turquoise-300 text-lg font-mono">Collection:</span>
            <span className="text-white text-lg">{collectionName || "Unknown Collection"}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-turquoise-300 text-lg font-mono">Price:</span>
            <span className="text-white text-lg">{pricePerToken || "—"} METIS</span>
          </div>
          
          <div className="flex items-center mt-8">
            <button 
              className={`btn-primary-glow px-6 py-3 w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleAcquire}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Acquire this NFT"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 