"use client";

import { useState, useEffect } from "react";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import { IListingWithNFT } from "@/app/interfaces/interfaces";
import { useTransaction } from "@/app/providers/TransactionProvider";
import { buyWithMetis, buyWithWMetis, getWMetisBalance } from "@/app/services/marketplace";
import NFTCard from "./NFTCard/NFTCard";
import Link from "next/link";
import { ethers } from "ethers";

interface NFTDetailViewProps {
  listing: IListingWithNFT;
  relatedListings?: IListingWithNFT[];
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

export default function NFTDetailView({ listing, relatedListings = [] }: NFTDetailViewProps) {
  const { metadata, collectionName, tokenId, pricePerToken, listingCreator, listingId, assetContract } = listing;
  const sellerAddress = listing.sellerAddress || listingCreator; // Use sellerAddress if available, otherwise fall back to listingCreator
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [glitchText, setGlitchText] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [wmetisBalance, setWmetisBalance] = useState("0");
  const [enoughWmetis, setEnoughWmetis] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  
  const { addTransaction } = useTransaction();
  
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
  
  // Handle image load success
  const handleImageLoad = () => {
    console.log("NFTDetailView - Image loaded successfully");
    setImageLoaded(true);
  };
  
  // Handle image load error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error("NFTDetailView - Failed to load image:", metadata?.image);
    setImageError(true);
    
    // Try to load from a different IPFS gateway if the first one failed
    const currentSrc = (e.target as HTMLImageElement).src;
    if (currentSrc.includes('ipfs.io')) {
      console.log("Trying alternative IPFS gateway...");
      (e.target as HTMLImageElement).src = currentSrc.replace('ipfs.io', 'cloudflare-ipfs.com');
    } else if (metadata?.image) {
      // If we have an image URL but it failed to load, try a different approach
      console.log("Trying direct IPFS URL...");
      const ipfsUrl = metadata.image.startsWith('ipfs://') 
        ? metadata.image.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/')
        : metadata.image;
      (e.target as HTMLImageElement).src = ipfsUrl;
    }
  };
  
  // Check WMETIS balance when address changes
  useEffect(() => {
    async function checkWMetisBalance() {
      if (account) {
        try {
          const balance = await getWMetisBalance(account.address);
          setWmetisBalance(balance);
          
          // Check if user has enough WMETIS
          const priceValue = parseFloat(pricePerToken);
          const balanceValue = parseFloat(balance);
          setEnoughWmetis(balanceValue >= priceValue);
        } catch (err) {
          console.error("Error checking WMETIS balance:", err);
        }
      }
    }
    
    if (account) {
      checkWMetisBalance();
    }
  }, [account, pricePerToken]);
  
  // Format address for display
  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };
  
  // Handle showing payment options
  const handleBuyClick = () => {
    if (!account) {
      addTransaction("error", "Connect your wallet first to buy this NFT");
      return;
    }
    
    setShowPaymentOptions(true);
  };
  
  // Handle buy with METIS
  const handleBuyWithMetis = async () => {
    if (!account || !wallet) {
      addTransaction("error", "Connect your wallet first to buy this NFT");
      return;
    }
    
    try {
      setIsLoading(true);
      const txId = addTransaction("loading", `Buying NFT with METIS...`);
      
      console.log(`Buying listing ${listingId} with METIS using wallet:`, wallet);
      
      // Pass the wallet to the buyWithMetis function
      const result = await buyWithMetis(listingId, wallet);
      
      console.log("Transaction result:", result);
      
      if (result && result.transactionHash) {
        addTransaction("success", "NFT purchased successfully with METIS!", result.transactionHash);
      } else {
        addTransaction("error", "Transaction completed but no transaction hash returned");
      }
    } catch (error) {
      console.error("Error buying with METIS:", error);
      addTransaction("error", error instanceof Error ? error.message : "Failed to buy NFT");
    } finally {
      setIsLoading(false);
      setShowPaymentOptions(false);
    }
  };
  
  // Handle buy with WMETIS
  const handleBuyWithWMetis = async () => {
    if (!account || !wallet) {
      addTransaction("error", "Connect your wallet first to buy this NFT");
      return;
    }
    
    try {
      setIsLoading(true);
      const txId = addTransaction("loading", `Buying NFT with WMETIS...`);
      
      console.log(`Buying listing ${listingId} with WMETIS using wallet:`, wallet);
      
      // Pass the wallet to the buyWithWMetis function
      const result = await buyWithWMetis(listingId, wallet);
      
      console.log("Transaction result:", result);
      
      if (result && result.transactionHash) {
        addTransaction("success", "NFT purchased successfully with WMETIS!", result.transactionHash);
      } else {
        addTransaction("error", "Transaction completed but no transaction hash returned");
      }
    } catch (error) {
      console.error("Error buying with WMETIS:", error);
      addTransaction("error", error instanceof Error ? error.message : "Failed to buy NFT");
    } finally {
      setIsLoading(false);
      setShowPaymentOptions(false);
    }
  };
  
  // Handle cancel payment selection
  const handleCancelPayment = () => {
    setShowPaymentOptions(false);
  };
  
  // Simple placeholder during SSR
  if (!isMounted) {
    return <div className="min-h-screen bg-sinister-black"></div>;
  }
  
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
      
      if (isNaN(parseFloat(String(pricePerToken)))) {
        console.warn(`Invalid price for NFT ${listingId}: ${pricePerToken}`);
        return "0";
      }
      
      // Parse the price as a float
      const priceValue = parseFloat(String(pricePerToken));
      
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
      
      console.log(`NFTDetailView formatted price:`, price);
      return price;
    } catch (error) {
      console.error(`Error formatting price for NFT ${listingId}:`, error);
      return "0";
    }
  })();
  
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
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              ) : (
                <div className="w-full aspect-square bg-sinister-black/50 flex items-center justify-center">
                  <div className="text-sinister-orange text-center p-4">
                    <div className="text-4xl mb-2">🖼️</div>
                    <p>Image not available</p>
                    <p className="text-xs mt-2 text-sinister-scroll">Token ID: {tokenId}</p>
                  </div>
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
                  {metadata.attributes.map((attr, index) => (
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
                    disabled={isLoading || (account && account.address === sellerAddress)}
                    className={`btn-primary px-8 py-3 font-heading text-lg tracking-wider ${
                      (account && account.address === sellerAddress) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center w-full">
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processing...</span>
                      </span>
                    ) : (account && account.address === sellerAddress) ? (
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
              
              {/* Payment options */}
              {showPaymentOptions && (
                <div className="bg-sinister-black/70 border border-sinister-orange/30 p-4 rounded-lg mt-4">
                  <h4 className="text-sinister-orange font-heading text-lg mb-4">Select Payment Method</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={handleBuyWithMetis}
                      disabled={isLoading}
                      className="btn-primary p-4 flex flex-col items-center justify-center h-32"
                    >
                      <span className="text-2xl mb-2">METIS</span>
                      <span className="text-sm opacity-80">Pay with native METIS</span>
                    </button>
                    
                    <button
                      onClick={handleBuyWithWMetis}
                      disabled={isLoading || !enoughWmetis}
                      className={`btn-tertiary p-4 flex flex-col items-center justify-center h-32 ${!enoughWmetis ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <span className="text-2xl mb-2">WMETIS</span>
                      <span className="text-sm opacity-80">Pay with Wrapped METIS</span>
                      <span className="text-xs mt-2">Balance: {wmetisBalance} WMETIS</span>
                      {!enoughWmetis && <span className="text-xs text-red-400 mt-1">Insufficient balance</span>}
                    </button>
                  </div>
                </div>
              )}
              
              {!account && (
                <div className="text-sinister-red text-sm italic">
                  Connect your wallet to purchase this NFT
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