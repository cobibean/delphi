"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { IListingWithNFT } from "@/app/interfaces/interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import { buyWithMetis } from "@/app/services/marketplace";
import { buyoutAuction } from "@/app/services/marketplace-v5";
import { useTransaction } from "@/app/providers/TransactionProvider";

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
  if (/^[a-zA-Z0-9]{46}/.test(url)) {
    return `https://ipfs.io/ipfs/${url}`;
  }
  
  return url;
};

export default function NFTCard({ listing, className }: NFTCardProps) {
  const router = useRouter();
  const { listingId, tokenId, assetContract, pricePerToken, metadata, collectionName } = listing;
  
  // Check if this is an auction
  const isAuction = 'isAuction' in listing && listing.isAuction === true;
  const minimumBidAmount = isAuction && 'minimumBidAmount' in listing ? listing.minimumBidAmount as string : null;
  const currentBid = isAuction && 'currentBid' in listing ? listing.currentBid as string : pricePerToken;
  const buyoutBidAmount = isAuction && 'buyoutBidAmount' in listing ? listing.buyoutBidAmount as string : undefined;
  
  const [isHovering, setIsHovering] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [isBuying, setIsBuying] = useState(false);
  
  // Get wallet and transaction context
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const { addTransaction } = useTransaction();
  
  // Set mounted state on client
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    
    // Initialize image source
    if (metadata?.image) {
      setImageSrc(formatIPFSUrl(metadata.image));
    }
  }, [metadata]);
  
  // Format price for display
  const formattedPrice = useMemo(() => {
    // For auctions, use currentBid if available, otherwise use minimumBidAmount
    const priceToFormat = isAuction ? currentBid : pricePerToken;
    
    if (!priceToFormat) return "0";
    
    try {
      const priceValue = parseFloat(priceToFormat);
      
      // Log the raw price for debugging
      console.log(`NFTCard ${listingId} raw price:`, priceValue);
      
      if (isNaN(priceValue) || priceValue === 0) {
        console.warn(`NFTCard ${listingId}: Invalid price:`, priceToFormat);
        return "0";
      }
      
      // Format based on the value size
      let price;
      if (priceValue === 0) {
        price = "0";
      } else if (priceValue < 0.01) {
        // For very small values, show more decimal places
        price = priceValue.toString();
      } else if (priceValue < 1) {
        // For values less than 1, show 4 decimal places
        price = priceValue.toFixed(4);
      } else {
        // For larger values, show 2 decimal places
        price = priceValue.toFixed(2);
      }
      
      console.log(`NFTCard ${listingId} formatted price:`, price);
      return price;
    } catch (error) {
      console.error(`NFTCard ${listingId}: Error formatting price:`, error);
      return "0";
    }
  }, [pricePerToken, listingId, isAuction, currentBid]);
  
  // Handle image load success
  const handleImageLoad = () => {
    console.log(`NFTCard ${listingId}: Image loaded successfully`);
    setImageLoaded(true);
  };
  
  // Handle image load error
  const handleImageError = () => {
    console.error(`NFTCard ${listingId}: Failed to load image:`, metadata?.image);
    setImageError(true);
    
    // Try to load from a different IPFS gateway
    if (metadata?.image) {
      console.log(`NFTCard ${listingId}: Trying alternative IPFS gateway...`);
      const alternativeUrl = metadata.image.startsWith('ipfs://') 
        ? metadata.image.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/')
        : metadata.image;
      setImageSrc(alternativeUrl);
    }
  };
  
  // Handle quick buy or place bid
  const handleQuickBuy = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to detail page
    e.stopPropagation(); // Stop event propagation
    
    if (!account || !wallet) {
      addTransaction("error", "Connect your wallet first to buy this NFT");
      return;
    }
    
    // For auctions, redirect to the detail page for bidding
    if (isAuction) {
      router.push(`/nft/${listingId}`);
      return;
    }
    
    try {
      setIsBuying(true);
      const txId = addTransaction("loading", `Buying NFT #${tokenId} with METIS...`);
      
      console.log(`Quick buying listing ${listingId} with METIS using wallet:`, wallet);
      
      // Pass the wallet to the buyWithMetis function
      const result = await buyWithMetis(listingId, wallet);
      
      if (result && result.success) {
        addTransaction("success", `Successfully purchased NFT #${tokenId}!`, result.transactionHash);
      } else {
        addTransaction("error", `Failed to purchase NFT #${tokenId}`, result?.transactionHash);
      }
    } catch (error: any) {
      console.error("Error buying NFT:", error);
      addTransaction("error", error.message || "Failed to purchase NFT");
    } finally {
      setIsBuying(false);
    }
  };
  
  // Handle buyout for auctions
  const handleBuyoutAuction = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to detail page
    e.stopPropagation(); // Stop event propagation
    
    if (!account || !wallet) {
      addTransaction("error", "Connect your wallet first to buy this NFT");
      return;
    }
    
    try {
      setIsBuying(true);
      const txId = addTransaction("loading", `Buying out auction for NFT #${tokenId}...`);
      
      console.log(`Buying out auction ${listingId} with wallet:`, wallet);
      
      // Pass the wallet to the buyoutAuction function
      const result = await buyoutAuction(listingId, wallet);
      
      if (result && result.success) {
        addTransaction("success", `Successfully bought out auction for NFT #${tokenId}!`, result.transactionHash);
        
        // Redirect to profile page after successful purchase
        setTimeout(() => {
          window.location.href = '/profile';
        }, 2000);
      } else {
        addTransaction("error", `Failed to buyout auction for NFT #${tokenId}`, result?.transactionHash);
      }
    } catch (error: any) {
      console.error("Error buying out auction:", error);
      addTransaction("error", error.message || "Failed to buyout auction");
    } finally {
      setIsBuying(false);
    }
  };
  
  // Don't render anything until mounted (to avoid hydration issues)
  if (!isMounted) return null;
  
  return (
    <div className={className}>
      <motion.div 
        className="group relative overflow-hidden border-l-2 border-t-2 border-sinister-orange/40 bg-sinister-black/30 hover:bg-sinister-black/50 transition-colors duration-300"
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
      >
        {/* Card content that navigates to detail page */}
        <Link href={`/nft/${listingId}`} className="block">
          <div className="relative">
            {/* Loading state */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-sinister-black/50 z-10">
                <div className="animate-spin h-8 w-8 border-2 border-oracle-orange border-t-transparent rounded-full"></div>
              </div>
            )}
            
            {/* NFT Image */}
            <div className="relative overflow-hidden aspect-square bg-sinister-black/30">
              {metadata?.image ? (
                <motion.img 
                  src={imageSrc} 
                  alt={metadata?.name || `NFT #${tokenId}`}
                  className={`w-full h-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-30'} transition-opacity duration-300`}
                  animate={isHovering ? { scale: 1.05 } : { scale: 1 }}
                  transition={{ duration: 0.5 }}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-sinister-orange text-center p-4">
                    <div className="text-2xl mb-1">🖼️</div>
                    <p className="text-xs">No image</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Collection name sticker */}
            <div className="absolute top-2 left-2 bg-sinister-black/70 border-sinister-orange/30 border px-2 py-0.5 text-xs font-heading text-sinister-orange">
              {collectionName || "Unknown Collection"}
            </div>
            
            {/* Token ID sticker */}
            <div className="absolute top-2 right-2 bg-sinister-black/70 border-sinister-teal/30 border px-2 py-0.5 text-xs font-heading text-sinister-teal">
              #{tokenId || "0"}
            </div>
            
            {/* Auction badge */}
            {isAuction && (
              <div className="absolute bottom-2 right-2 bg-cosmic-combustion text-white px-2 py-1 text-xs font-bold rounded">
                AUCTION
              </div>
            )}
          </div>
          
          {/* NFT Details */}
          <div className="p-3">
            <h3 className="text-sinister-white font-heading text-lg truncate">
              {metadata?.name || `NFT #${tokenId}`}
            </h3>
            
            <div className="flex justify-between items-center mt-2">
              <div className="text-sinister-orange font-mono">
                {formattedPrice} <span className="text-xs">METIS</span>
                {isAuction && (
                  <span className="text-xs ml-1">
                    {parseFloat(currentBid) > parseFloat(minimumBidAmount || "0") ? "(current bid)" : "(min bid)"}
                  </span>
                )}
              </div>
              
              <div className="text-sinister-scroll text-xs">
                ID: {listingId}
              </div>
            </div>
          </div>
        </Link>
        
        {/* Quick Buy Button - Outside the Link component */}
        <div className="px-3 pb-3">
          {isAuction ? (
            <div className="space-y-2">
              <motion.button
                className="w-full py-1.5 px-3 bg-cosmic-combustion text-sinister-black font-bold rounded-sm text-xs hover:opacity-90 transition-colors flex items-center justify-center"
                onClick={handleQuickBuy}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isBuying}
              >
                {isBuying ? (
                  <>
                    <div className="animate-spin h-3 w-3 border-2 border-sinister-black border-t-transparent rounded-full mr-1"></div>
                    Processing...
                  </>
                ) : 'Place Bid'}
              </motion.button>
              
              {/* Only show buyout option if buyoutBidAmount exists */}
              {buyoutBidAmount && (
                <motion.button
                  className="w-full py-1.5 px-3 bg-sinister-orange text-sinister-black font-bold rounded-sm text-xs hover:opacity-90 transition-colors flex items-center justify-center"
                  onClick={handleBuyoutAuction}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isBuying}
                >
                  {isBuying ? (
                    <>
                      <div className="animate-spin h-3 w-3 border-2 border-sinister-black border-t-transparent rounded-full mr-1"></div>
                      Processing...
                    </>
                  ) : `Buy Now: ${buyoutBidAmount} METIS`}
                </motion.button>
              )}
            </div>
          ) : (
            <motion.button
              className="w-full py-2 px-4 bg-sinister-orange text-sinister-black font-bold rounded-sm text-sm hover:opacity-90 transition-colors flex items-center justify-center"
              onClick={handleQuickBuy}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isBuying}
            >
              {isBuying ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-sinister-black border-t-transparent rounded-full mr-2"></div>
                  Processing...
                </>
              ) : 'Quick Buy'}
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
} 