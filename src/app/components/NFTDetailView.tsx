"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useActiveAccount, useActiveWallet } from 'thirdweb/react';
import Link from 'next/link';
import { validateNetworkConnection, logTransaction } from '@/app/utils/debugging';
import { IListingWithNFT } from "@/app/interfaces/interfaces";
import { buyWithMetis } from "@/app/services/marketplace-v5";
import { useTransaction } from "@/app/providers/TransactionProvider";
import NFTCard from "@/app/components/NFTCard/NFTCard";
import { TransactionStatus } from "@/app/components/TransactionStatus";
import { useErrorStore } from '@/app/stores/errorStore';
import LoadingState from './SharedComponents/LoadingState';
import { motion, useAnimation } from 'framer-motion';

interface NFTDetailViewProps {
  listing: IListingWithNFT;
  relatedListings?: IListingWithNFT[];
}

// Helper function to handle IPFS URLs
const formatIPFSUrl = (url: string): string => {
  if (!url) return '';
  
  // For debugging
  console.log(`NFTDetailView: Formatting IPFS URL: ${url}`);
  
  // Handle IPFS URLs
  if (url.startsWith('ipfs://')) {
    // Use a reliable gateway - Cloudflare tends to be more reliable than ipfs.io
    return url.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/');
  }
  
  // Handle URLs that might be stored with gateway already
  if (url.includes('/ipfs/')) {
    const ipfsHash = url.split('/ipfs/')[1];
    return `https://cloudflare-ipfs.com/ipfs/${ipfsHash}`;
  }
  
  // Handle direct CID format (corrected regex for proper IPFS hash detection)
  if (/^[a-zA-Z0-9]{46,}$/.test(url)) {
    return `https://cloudflare-ipfs.com/ipfs/${url}`;
  }
  
  // Handle HTTP URLs that point to IPFS gateways
  if (url.includes('ipfs.io') || url.includes('cloudflare-ipfs.com')) {
    return url;
  }
  
  return url;
};

export default function NFTDetailView({ listing, relatedListings = [] }: NFTDetailViewProps) {
  const { metadata, collectionName, tokenId, pricePerToken, listingCreator, listingId, assetContract } = listing;
  const sellerAddress = listing.sellerAddress || listingCreator; // Use sellerAddress if available, otherwise fall back to listingCreator
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [glitchText, setGlitchText] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [receiptData, setReceiptData] = useState<any>(null);
  const [networkValidated, setNetworkValidated] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [attemptedGateways, setAttemptedGateways] = useState<string[]>([]);
  
  const wallet = useActiveWallet();
  const account = useActiveAccount();
  
  const { addTransaction } = useTransaction();
  const { addError } = useErrorStore();
  
  // Trigger glitch text effect randomly
  useEffect(() => {
    setIsMounted(true);
    
    // Debug: Log the listing data
    console.log("NFTDetailView - Listing:", listing);
    console.log("NFTDetailView - Metadata:", metadata);
    console.log("NFTDetailView - Image URL:", metadata?.image);
    
    // If there's an image, log the formatted URL
    if (metadata?.image) {
      const formattedUrl = formatIPFSUrl(metadata.image);
      console.log("NFTDetailView - Formatted image URL:", formattedUrl);
    }
    
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchText(true);
        setTimeout(() => setGlitchText(false), 500);
      }
    }, 8000);
    
    return () => clearInterval(glitchInterval);
  }, [listing, metadata]);
  
  // Debug image URL when metadata changes
  useEffect(() => {
    if (metadata?.image) {
      console.log(`NFTDetailView for ${listingId}: Original image URL:`, metadata.image);
      const formattedUrl = formatIPFSUrl(metadata.image);
      console.log(`NFTDetailView for ${listingId}: Formatted image URL:`, formattedUrl);
      
      // Test if URL is accessible
      fetch(formattedUrl, { method: 'HEAD' })
        .then(response => {
          console.log(`Image URL test result: ${response.status} ${response.statusText}`);
        })
        .catch(error => {
          console.error(`Failed to test image URL:`, error);
        });
    }
  }, [metadata, listingId]);
  
  // Handle image load success
  const handleImageLoad = () => {
    console.log("NFTDetailView - Image loaded successfully");
    setImageLoaded(true);
  };
  
  // Enhanced image error handler with multiple fallback options
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error(`NFTDetailView: Failed to load image for listing ${listingId}:`, e.currentTarget.src);
    
    if (!metadata?.image) {
      console.log(`NFTDetailView for ${listingId}: No metadata image to try fallbacks for`);
      setImageError(true);
      return;
    }
    
    // Array of gateway domains to try in order
    const gatewayOptions = [
      'cloudflare-ipfs.com', 
      'ipfs.io', 
      'gateway.ipfs.io', 
      'ipfs.infura.io', 
      'gateway.pinata.cloud'
    ];
    
    // Find the next gateway to try
    let nextGateway = null;
    for (const gateway of gatewayOptions) {
      if (!attemptedGateways.includes(gateway) && !e.currentTarget.src.includes(gateway)) {
        nextGateway = gateway;
        break;
      }
    }
    
    if (nextGateway) {
      // Extract the IPFS hash/path regardless of current format
      let ipfsPath = metadata.image;
      if (ipfsPath.startsWith('ipfs://')) {
        ipfsPath = ipfsPath.substring(7); // Remove 'ipfs://'
      } else if (ipfsPath.includes('/ipfs/')) {
        ipfsPath = ipfsPath.split('/ipfs/')[1];
      }
      
      // Ensure we have a clean path/CID
      if (ipfsPath) {
        const newUrl = `https://${nextGateway}/ipfs/${ipfsPath}`;
        console.log(`NFTDetailView for ${listingId}: Trying next gateway: ${newUrl}`);
        
        // Update state
        setAttemptedGateways([...attemptedGateways, nextGateway]);
        e.currentTarget.src = newUrl;
        return;
      }
    }
    
    console.log(`NFTDetailView for ${listingId}: All gateway options exhausted`);
    setImageError(true);
  };
  
  // Format address for display
  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };
  
  const handleBuyClick = () => {
    if (!account) {
      addError({
        message: "Please connect your wallet first",
        type: 'warning',
        recoveryAction: {
          label: "Connect Wallet",
          action: () => document.getElementById('connect-wallet-button')?.click()
        }
      });
      return;
    }
    
    if (!networkValidated) {
      validateNetworkConnection()
        .then(isValid => {
          if (isValid) {
            setNetworkValidated(true);
            handleBuyWithMetis();
          } else {
            addError({
              message: "Please connect to the Metis Andromeda network",
              type: 'error'
            });
          }
        })
        .catch(err => {
          console.error("Error validating network:", err);
          addError({
            message: "Error validating network connection. Please make sure you're connected to the Metis Andromeda network.",
            type: 'error'
          });
        });
      return;
    }
    
    handleBuyWithMetis();
  };
  
  const handleBuyWithMetis = async () => {
    if (!account || !wallet) {
      addError({
        message: "Please connect your wallet first",
        type: 'warning',
        recoveryAction: {
          label: "Connect Wallet",
          action: () => document.getElementById('connect-wallet-button')?.click()
        }
      });
      return;
    }
    
    setIsLoading(true);
    setProcessingPayment(true);
    setTxHash(null);
    
    try {
      console.log("Buying NFT with listing ID:", listingId);
      
      addError({
        message: "Preparing your purchase...",
        type: 'info'
      });
      
      const result = await buyWithMetis(listingId, wallet);
      
      console.log("Purchase result:", result);
      
      if (result && result.transactionHash) {
        setTxHash(result.transactionHash);
        setReceiptData(result.receipt);
        
        if (result.success) {
          addError({
            message: "NFT purchased successfully! 🎉",
            type: 'success'
          });
        }
      }
    } catch (error: any) {
      console.error("Error buying NFT with METIS:", error);
      if (error.code !== 4001 && !error.message?.toLowerCase().includes('user rejected')) {
        addError({
          message: error.message || "Failed to purchase NFT",
          type: 'error',
          recoveryAction: error.recoveryAction
        });
      }
    } finally {
      setIsLoading(false);
      setProcessingPayment(false);
    }
  };
  
  const handleCancelPayment = () => {
    setIsLoading(false);
    setTxHash(null);
    setShowPaymentOptions(false);
  };
  
  // Format price with proper decimal places for small values
  const formattedPrice = (() => {
    try {
      // Debug: Log the raw price
      console.log(`NFTDetailView raw price:`, pricePerToken);
      
      // Make sure pricePerToken is a valid number
      if (!pricePerToken || pricePerToken === undefined) {
        console.warn(`Missing price for NFT ${listingId}`);
        return "0";
      }
      
      if (typeof pricePerToken !== 'string' && typeof pricePerToken !== 'number') {
        console.warn(`Invalid price type for NFT ${listingId}:`, typeof pricePerToken);
        return "0";
      }
      
      const price = parseFloat(pricePerToken.toString());
      console.log(`NFTDetailView formatted price:`, price.toString());
      return price.toString();
    } catch (error) {
      console.error(`Error formatting price for NFT ${listingId}:`, error);
      return "0";
    }
  })();
  
  // Simple placeholder during SSR
  if (!isMounted) {
    return <div className="min-h-screen bg-sinister-black"></div>;
  }
  
  return (
    <div className="bg-sinister-black min-h-screen">
      <div className="container py-12">
        <Link href="/" className="inline-block mb-6 text-sinister-scroll hover:text-sinister-orange transition-colors">
          ← Back to Marketplace
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - NFT Image */}
          <div className="relative">
            <div className="relative overflow-hidden distortion-overlay border-l-2 border-t-2 border-sinister-orange/40 bg-sinister-black/30">
              {/* Loading state */}
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-sinister-black/50 z-10">
                  <div className="animate-spin h-12 w-12 border-4 border-oracle-orange border-t-transparent rounded-full"></div>
                </div>
              )}
              
              {/* Main Image */}
              {metadata?.image ? (
                <img 
                  src={formatIPFSUrl(metadata.image)} 
                  alt={metadata?.name || `NFT #${tokenId}`} 
                  className={`w-full object-cover aspect-square ${imageLoaded ? 'opacity-100' : 'opacity-30'} transition-opacity duration-300`}
                  onLoad={() => setImageLoaded(true)}
                  onError={handleImageError}
                />
              ) : (
                <div className="w-full h-full aspect-square bg-sinister-black/60 flex items-center justify-center">
                  <span className="text-sinister-text text-opacity-50">No Image Available</span>
                </div>
              )}
              
              {/* Collection Badge */}
              <div className="absolute top-4 left-4 bg-sinister-black/70 border-sinister-orange/30 border px-3 py-1 text-sm font-heading text-sinister-orange">
                {collectionName || "Unknown Collection"}
              </div>
              
              {/* Token ID Badge */}
              <div className="absolute top-4 right-4 bg-sinister-black/70 border-sinister-teal/30 border px-3 py-1 text-sm font-heading text-sinister-teal">
                #{tokenId || "0"}
              </div>
            </div>
            
            {/* NFT Contract Information */}
            <div className="mt-4 p-3 bg-sinister-black/40 border-l border-t border-sinister-orange/20">
              <h4 className="text-sinister-scroll text-xs uppercase mb-1">NFT Contract</h4>
              <div className="flex items-center space-x-2">
                <span className="text-sinister-scroll/80 text-sm font-mono">{formatAddress(assetContract)}</span>
                <a 
                  href={`https://explorer.metis.io/token/${assetContract}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sinister-teal text-xs hover:underline"
                >
                  View on Metis Explorer
                </a>
              </div>
            </div>
            
            {/* NFT Attributes */}
            {metadata?.attributes && metadata.attributes.length > 0 && (
              <div className="mt-8">
                <h3 className="font-heading text-xl text-sinister-orange mb-4 uppercase tracking-wider">Attributes</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {metadata.attributes.map((attr: any, index: number) => (
                    <div 
                      key={index} 
                      className="bg-sinister-black/60 border-l border-t border-sinister-orange/20 p-3"
                    >
                      <div className="text-sinister-scroll/60 text-xs uppercase font-heading">{attr.trait_type}</div>
                      <div className="text-sinister-scroll font-medium mt-1">{attr.value.toString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Fallback for image error */}
            {imageError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-sinister-black/80">
                <div className="text-sinister-text mb-2">Image Failed to Load</div>
                <button 
                  className="text-sm bg-oracle-orange text-black px-4 py-2 rounded"
                  onClick={() => {
                    // Reset image state and try loading again
                    setImageError(false);
                    setImageLoaded(false);
                    const img = document.querySelector(`img[alt="${metadata?.name || `NFT #${tokenId}`}"]`) as HTMLImageElement;
                    if (img) {
                      img.src = formatIPFSUrl(metadata?.image || '');
                    }
                  }}
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
          
          {/* Right Column - NFT Details */}
          <div>
            {/* NFT Title */}
            <h1 
              className={`font-heading text-4xl uppercase mb-4 ${glitchText ? 'glitch-text' : 'text-gradient-oracle'}`}
              data-text={metadata?.name || `NFT #${tokenId}`}
            >
              {metadata?.name || `NFT #${tokenId}`}
            </h1>
            
            {/* Owner/Seller Info */}
            <div className="flex items-center mb-6">
              <div className="text-sinister-scroll/70">
                Listed by <span className="text-sinister-teal">{formatAddress(sellerAddress)}</span>
              </div>
            </div>
            
            {/* NFT Description */}
            <div className="mb-8">
              <h3 className="font-heading text-xl text-sinister-orange mb-2 uppercase tracking-wider">Description</h3>
              <p className="text-sinister-scroll/80 leading-relaxed">
                {metadata?.description || "No description provided for this NFT."}
              </p>
            </div>
            
            {/* Price and Buy Section */}
            <div className="bg-sinister-black/40 border-l-2 border-t-2 border-sinister-orange/30 p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <div className="text-sinister-scroll/70 text-sm">Current Price</div>
                  <div className="text-3xl font-heading text-sinister-gold mt-1">{formattedPrice} METIS</div>
                </div>
                
                {!showPaymentOptions ? (
                  <button 
                    onClick={handleBuyClick}
                    disabled={isLoading || account?.address === sellerAddress}
                    className={`btn-primary px-8 py-3 font-heading text-lg tracking-wider ${
                      account?.address === sellerAddress ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? (
                      <LoadingState 
                        message="Processing your cosmic transaction..." 
                        size="lg"
                      />
                    ) : (account?.address === sellerAddress) ? (
                      "You Own This"
                    ) : (
                      <span className="relative z-10">Buy Now</span>
                    )}
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button 
                      onClick={handleCancelPayment}
                      className="btn-secondary px-4 py-2"
                    >
                      <span className="relative z-10">Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Display transaction status */}
              {txHash && (
                <div className="mt-4 p-4 bg-sinister-black/30 border border-sinister-orange/20 rounded">
                  <TransactionStatus transactionHash={txHash} />
                </div>
              )}
            </div>
            
            {/* Transaction History */}
            <div className="mb-8">
              <h3 className="font-heading text-xl text-sinister-orange mb-4 uppercase tracking-wider">Transaction History</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-sinister-orange/10">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-sinister-teal rounded-full mr-3"></div>
                    <span className="text-sinister-scroll">Listed</span>
                  </div>
                  <div className="text-sinister-scroll/70 text-sm">
                    by <span className="text-sinister-teal">{formatAddress(sellerAddress)}</span>
                  </div>
                  <div className="text-sinister-scroll/70 text-sm">
                    {formattedPrice} METIS
                  </div>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-sinister-orange/10">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-sinister-orange rounded-full mr-3"></div>
                    <span className="text-sinister-scroll">Minted</span>
                  </div>
                  <div className="text-sinister-scroll/70 text-sm">
                    by <span className="text-sinister-teal">{formatAddress(sellerAddress)}</span>
                  </div>
                  <div className="text-sinister-scroll/70 text-sm">
                    -
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related NFTs */}
        {relatedListings.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl text-gradient-oracle mb-8 uppercase tracking-wider">More from this Collection</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedListings.slice(0, 4).map((relatedListing) => (
                <NFTCard 
                  key={relatedListing.listingId} 
                  listing={relatedListing} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 