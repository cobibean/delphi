"use client";

import { metisChain } from "@/app/config/chain";
import { useMarketplaceWallet } from "@/app/features/marketplace/hooks/useMarketplaceWallet";
import { isAuctionEnded } from "@/app/features/marketplace/services/auctions/helpers";
import { useToast } from '@/components/feedback/Toast/useToast';
import { MARKETPLACE_ADDRESS, THIRDWEB_CLIENT_ID } from "@/constants/contracts";
import { IListingWithNFT } from "@/interfaces/interfaces";
import { useTransaction } from "@/providers/TransactionProvider";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createThirdwebClient, getContract } from "thirdweb";
import { buyFromListing } from "thirdweb/extensions/marketplace";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";

interface NFTCardProps {
  listing: IListingWithNFT;
  className?: string;
}

// Helper function to handle IPFS URLs
const formatIPFSUrl = (url: string): string => {
  if (!url) return '';
  
  // Handle IPFS URLs
  if (url.startsWith('ipfs://')) {
    return url.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }
  
  // Handle URLs that might be stored with gateway already
  if (url.includes('/ipfs/')) {
    const ipfsHash = url.split('/ipfs/')[1];
    return `https://ipfs.io/ipfs/${ipfsHash}`;
  }
  
  // Handle direct CID format
  if (/^[a-zA-Z0-9]{46,}$/.test(url)) {
    return `https://ipfs.io/ipfs/${url}`;
  }
  
  return url;
};

// Helper for formatting crypto values
const formatCryptoValue = (value: string | number | undefined): string => {
  if (!value) return "0";
  
  try {
    // Simple logging for transparency
    console.log("NFTCard processing price value:", value, typeof value);
    
    // Handle string values
    if (typeof value === 'string') {
      // If it's already a properly formatted decimal, return it directly
      if (value.includes('.')) {
        return value;
      }
      
      // If it happens to be a large integer string (wei format), convert it
      // This is a fallback in case our listing queries weren't updated properly
      if (value.length > 18) {
        console.log("  Converting large number (wei) to METIS:", value);
        return ethers.formatEther(value);
      }
      
      // Otherwise, parse it to a number to handle formatting
      return parseFloat(value).toString();
    }
    
    // For number values, just convert to string
    return value.toString();
  } catch (error) {
    console.error("Error formatting crypto value:", error, "Value:", value);
    return "0";
  }
};

export function NFTCard({ listing, className = "" }: NFTCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuying, setIsBuying] = useState(false);
  const [glitchText, setGlitchText] = useState(false);
  
  const wallet = useActiveWallet();
  const account = useActiveAccount();
  const router = useRouter();
  const { addTransaction } = useTransaction();
  const { toast } = useToast();
  
  // Add the useMarketplaceWallet hook at the component level
  const { executeDirectTransaction } = useMarketplaceWallet();
  
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Access listing properties with fallbacks
  const { 
    tokenId,
    assetContract,
    metadata,
    collectionName,
    sellerAddress,
    listingId
  } = listing;
  
  // Format prices properly using ethers
  const pricePerToken = formatCryptoValue(listing.pricePerToken);

  // Check if this is an auction listing
  const isAuction = (listing as any).type === "auction" || ('isAuction' in listing && (listing as any).isAuction === true);
  const endTimestamp = isAuction && 'endTimestamp' in listing ? (listing as any).endTimestamp : 
                     isAuction && 'endTimeInSeconds' in listing ? (listing as any).endTimeInSeconds : undefined;
  const minimumBidAmount = isAuction ? formatCryptoValue((listing as any).minimumBidAmount) : "0";
  
  // Calculate auction status based on current time and end timestamp
  const hasAuctionEnded = useMemo(() => {
    if (!isAuction || !endTimestamp) return false;
    
    // Use the auction helper function
    return isAuctionEnded(endTimestamp);
  }, [isAuction, endTimestamp]);
  
  const currentBid = isAuction ? formatCryptoValue((listing as any).currentBid) : pricePerToken;
  const buyoutPrice = isAuction ? formatCryptoValue((listing as any).buyoutPrice || (listing as any).buyoutBidAmount) : undefined;
  
  // Apply random glitch effect to card text
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchText(true);
        setTimeout(() => setGlitchText(false), 150);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Calculate time remaining for auctions
  const timeRemaining = useMemo(() => {
    if (!isAuction || !endTimestamp) return null;
    
    // Check if auction has ended
    if (hasAuctionEnded) return "Ended";
    
    const end = endTimestamp * 1000; // Convert seconds to milliseconds if needed
    const now = Date.now();
    const diff = end - now;
    
    if (diff <= 0) return "Ended";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  }, [isAuction, endTimestamp, hasAuctionEnded]);
  
  // Format price value for display, including auction specifics
  const formattedPrice = useMemo(() => {
    if (isAuction) {
      // For auctions, calculate the minimum amount needed to acquire the NFT
      
      // Calculate the minimum next bid (current bid + 5% increment)
      const nextMinBidValue = parseFloat(currentBid) > 0 
        ? (parseFloat(currentBid) * 1.05)
        : parseFloat(minimumBidAmount || "0");
      
      const nextMinBid = nextMinBidValue.toFixed(6);
      
      // If there's a buyout price, compare it with the next minimum bid
      if (buyoutPrice && parseFloat(buyoutPrice) > 0) {
        const nextBidValue = parseFloat(nextMinBid);
        const buyoutValue = parseFloat(buyoutPrice);
        
        // If buyout is lower or close to the next minimum bid, show the buyout price
        if (buyoutValue <= nextBidValue * 1.1) { // Within 10% of next bid
          return `${parseFloat(buyoutPrice).toFixed(6)} METIS (Buy Now)`;
        }
      }
      
      // Otherwise show current/minimum bid
      const displayPrice = parseFloat(currentBid) > 0 
        ? `${parseFloat(currentBid).toFixed(6)} METIS (Current Bid)`
        : `${parseFloat(minimumBidAmount || "0").toFixed(6)} METIS (Min Bid)`;
      
      return displayPrice;
    }
    
    // For direct listings, show the price with proper formatting
    // Round to 6 decimals for display but keep trailing zeros only if needed
    const priceValue = parseFloat(pricePerToken);
    let displayPrice;
    
    if (priceValue < 0.000001) {
      // For extremely small values, use scientific notation
      displayPrice = priceValue.toExponential(2);
    } else if (priceValue < 0.01) {
      // For small values up to 0.01, show up to 6 decimal places
      displayPrice = priceValue.toFixed(6).replace(/\.?0+$/, '');
    } else {
      // For normal values, show up to 4 decimal places
      displayPrice = priceValue.toFixed(4).replace(/\.?0+$/, '');
    }
    
    return `${displayPrice} METIS`;
  }, [isAuction, pricePerToken, currentBid, minimumBidAmount, buyoutPrice]);
  
  // Format NFT name, adding fallback
  const displayName = useMemo(() => {
    return metadata?.name || `NFT #${tokenId}`;
  }, [metadata, tokenId]);
  
  // Handle image loading complete
  const handleImageLoaded = () => {
    setIsLoading(false);
  };
  
  // Handle image loading error
  const handleImageError = () => {
    console.error(`Failed to load image for NFT ${tokenId}`);
    toast.warning("Failed to load NFT image");
    setImageError(true);
  };
  
  // Handle NFT purchase
  const handleBuyNow = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!account) {
      toast.error("Please connect your wallet to proceed");
      return;
    }

    if (isBuying) {
      toast.warning("Transaction in progress, please wait");
      return;
    }

    // For auctions that have ended, just navigate to the details page
    if (isAuction && hasAuctionEnded) {
      router.push(`/nft/${listing.listingId}`);
      return;
    }

    try {
      setIsBuying(true);
      
      // For auctions, just navigate to the detail page for proper bidding flow
      if (isAuction) {
        router.push(`/nft/${listing.listingId}`);
        return;
      }
      
      // Add transaction notification
      const txId = addTransaction("loading", `Buying NFT #${tokenId}...`);
      
      // Create a client instance
      const localClient = createThirdwebClient({
        clientId: THIRDWEB_CLIENT_ID || ""
      });
      
      // Get marketplace contract
      const marketplaceContract = getContract({
        client: localClient,
        chain: metisChain,
        address: MARKETPLACE_ADDRESS as `0x${string}`
      });
      
      // Prepare the transaction directly using ThirdWeb's buyFromListing
      const transaction = buyFromListing({
        contract: marketplaceContract,
        listingId: BigInt(listingId),
        quantity: 1n,
        recipient: account.address
      });
      
      // Show pending toast
      toast.info(
        "Transaction initiated",
        "Please confirm the transaction in your wallet"
      );
      
      // Execute the transaction directly using our hook (which we got at the component level)
      const receipt = await executeDirectTransaction(
        transaction,
        {
          description: `Buying NFT #${tokenId} for ${formattedPrice}`,
          onSuccess: (result) => {
            // Update transaction status
            addTransaction("success", `Successfully purchased NFT #${tokenId}`, result.transactionHash);
            
            // Show success message
            toast.success("Purchase successful! Your NFT will be available in your wallet soon.");
            
            // Redirect to profile page after 2 seconds
            setTimeout(() => {
              router.push("/profile");
            }, 2000);
          }
        }
      );
      
      // If we get here, the transaction was successful
      console.log("Purchase receipt:", receipt);
    } catch (error) {
      console.error('Buy transaction failed:', error);
      // Handle errors - the toast is already shown by executeDirectTransaction
      // Just update the transaction notification
      addTransaction("error", `Failed to purchase NFT #${tokenId}`);
      toast.error(error instanceof Error ? error.message : "Failed to process transaction. Please try again.");
    } finally {
      setIsBuying(false);
    }
  };
  
  // Get appropriate button text based on listing type
  const getButtonText = () => {
    if (isBuying) {
      return (
        <div className="flex items-center justify-center">
          <div className="animate-spin h-4 w-4 border-2 border-sinister-black border-t-transparent rounded-full mr-2"></div>
          Processing...
        </div>
      );
    }
    
    if (isAuction) {
      if (hasAuctionEnded) {
        return "View Details";
      }
      
      // If buyout price is close to or lower than next minimum bid, suggest buyout
      const nextMinBid = currentBid && parseFloat(currentBid) > 0 
        ? (parseFloat(currentBid) * 1.05) 
        : parseFloat(minimumBidAmount || "0");
        
      if (buyoutPrice && parseFloat(buyoutPrice) > 0 && parseFloat(buyoutPrice) <= nextMinBid * 1.1) {
        return "Buy Now";
      }
      
      return "Place Bid";
    }
    
    return "Buy Now";
  };
  
  return (
    <Link
      href={`/nft/${isAuction ? 'auction-' : 'direct-'}${listing.listingId}`}
      className={`block relative ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={cardRef}
      >
        <div className="relative overflow-hidden bg-sinister-black border border-sinister-orange/20 shadow-card rounded-lg transition-all duration-300 hover:shadow-card-hover hover:border-sinister-orange/60">
          {/* NFT Image Container */}
          <div className="relative aspect-square overflow-hidden">
            {/* Loading Skeleton */}
            {isLoading && (
              <div className="absolute inset-0 bg-sinister-black/40 flex items-center justify-center">
                <div className="animate-pulse h-full w-full bg-gradient-to-br from-sinister-black/40 to-sinister-black/60"></div>
              </div>
            )}
            
            {/* Actual Image */}
            {!imageError ? (
              <img
                src={formatIPFSUrl(metadata?.image || "")}
                alt={displayName}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isHovered ? "scale-110" : "scale-100"
                } ${isLoading ? "opacity-0" : "opacity-100"}`}
                onLoad={handleImageLoaded}
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-sinister-black/80">
                <div className="text-center p-4">
                  <span className="text-sinister-teal text-sm">Image Unavailable</span>
                </div>
              </div>
            )}
            
            {/* Collection Badge */}
            {collectionName && (
              <div className="absolute top-3 left-3 bg-sinister-black/70 border border-sinister-orange/30 px-2 py-1 text-xs font-heading text-sinister-orange rounded">
                {collectionName}
              </div>
            )}
            
            {/* Auction Badge */}
            {isAuction && (
              <div className="absolute top-3 right-3 bg-cosmic-combustion text-white px-2 py-1 text-xs font-bold rounded">
                {hasAuctionEnded ? "ENDED" : "AUCTION"}
              </div>
            )}
            
            {/* Token ID Badge */}
            <div className="absolute bottom-3 left-3 bg-sinister-black/70 border border-sinister-teal/30 px-2 py-1 text-xs font-mono text-sinister-teal rounded">
              #{tokenId || "0"}
            </div>
            
            {/* Time Remaining Badge (for auctions) */}
            {isAuction && timeRemaining && !hasAuctionEnded && (
              <div className="absolute bottom-3 right-3 bg-sinister-black/70 border border-cosmic-combustion/30 px-2 py-1 text-xs font-mono text-cosmic-combustion rounded flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {timeRemaining}
              </div>
            )}
            
            {/* Hover Overlay - Update button text */}
            <div className={`absolute inset-0 bg-gradient-to-t from-sinister-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4`}>
              <div className="w-full text-center">
                <button
                  onClick={handleBuyNow}
                  disabled={isBuying}
                  className="w-full bg-gradient-to-r from-sinister-orange to-sinister-orange/80 text-sinister-black font-bold py-2 px-4 rounded-sm hover:from-sinister-orange/90 hover:to-sinister-orange/70 transition-all"
                >
                  {getButtonText()}
                </button>
              </div>
            </div>
          </div>
          
          {/* NFT Details - Update price display */}
          <div className="p-4 bg-ancient-wisdom">
            <div className="flex justify-between items-start mb-2">
              <h3 className={`text-lg font-heading text-oracle-white truncate flex-1 ${glitchText ? 'text-glitch' : ''}`}>
                {displayName}
              </h3>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-sinister-scroll mb-1">
                  {isAuction ? (
                    currentBid && parseFloat(currentBid) > 0 ? "Current Bid" : "Minimum Bid"
                  ) : "Price"}
                </p>
                <p className="text-oracle-orange font-mono">
                  {formattedPrice}
                </p>
              </div>
              
              {/* Buyout Price for Auctions - Only show if significantly higher than current bid */}
              {isAuction && buyoutPrice && parseFloat(buyoutPrice) > 0 && 
               (!currentBid || parseFloat(buyoutPrice) > parseFloat(currentBid) * 1.1) && 
               !hasAuctionEnded && (
                <div className="text-right">
                  <p className="text-xs text-sinister-scroll mb-1">
                    Buy Now
                  </p>
                  <p className="text-oracle-orange font-mono">
                    {buyoutPrice} METIS
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
} 