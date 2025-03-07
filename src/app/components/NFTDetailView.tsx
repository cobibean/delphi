"use client";

import { useState, useEffect } from "react";
import { useAddress, useConnectionStatus, useWallet, useSigner } from "@thirdweb-dev/react";
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

export default function NFTDetailView({ listing, relatedListings = [] }: NFTDetailViewProps) {
  const { metadata, collectionName, tokenId, pricePerToken, listingCreator, listingId, assetContract } = listing;
  const sellerAddress = listing.sellerAddress || listingCreator; // Use sellerAddress if available, otherwise fall back to listingCreator
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [glitchText, setGlitchText] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [wmetisBalance, setWmetisBalance] = useState("0");
  const [enoughWmetis, setEnoughWmetis] = useState(false);
  
  const address = useAddress();
  const connectionStatus = useConnectionStatus();
  const wallet = useWallet();
  const signer = useSigner(); // Get the signer from ThirdWeb's hook
  
  const { addTransaction } = useTransaction();
  
  // Trigger glitch text effect randomly
  useEffect(() => {
    setIsMounted(true);
    
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchText(true);
        setTimeout(() => setGlitchText(false), 500);
      }
    }, 8000);
    
    return () => clearInterval(glitchInterval);
  }, []);
  
  // Check WMETIS balance when address changes
  useEffect(() => {
    async function checkWMetisBalance() {
      if (address) {
        try {
          const balance = await getWMetisBalance(address);
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
    
    if (address) {
      checkWMetisBalance();
    }
  }, [address, pricePerToken]);
  
  // Format address for display
  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };
  
  // Handle showing payment options
  const handleBuyClick = () => {
    if (!address) {
      addTransaction("error", "Connect your wallet first to buy this NFT");
      return;
    }
    
    setShowPaymentOptions(true);
  };
  
  // Handle buy with METIS
  const handleBuyWithMetis = async () => {
    if (!address || !signer) {
      addTransaction("error", "Connect your wallet first to buy this NFT");
      return;
    }
    
    try {
      setIsLoading(true);
      const txId = addTransaction("loading", `Buying NFT with METIS...`);
      
      console.log(`Buying listing ${listingId} with METIS using signer:`, signer);
      
      // Pass the signer to the buyWithMetis function
      const result = await buyWithMetis(listingId, signer);
      
      console.log("Transaction result:", result);
      
      if (result.transactionHash) {
        addTransaction("success", "NFT purchased successfully with METIS!", result.transactionHash);
      } else {
        addTransaction("error", "Transaction failed");
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
    if (!address || !signer) {
      addTransaction("error", "Connect your wallet first to buy this NFT");
      return;
    }
    
    try {
      setIsLoading(true);
      const txId = addTransaction("loading", `Buying NFT with WMETIS...`);
      
      console.log(`Buying listing ${listingId} with WMETIS using signer:`, signer);
      
      // Pass the signer to the buyWithWMetis function
      const result = await buyWithWMetis(listingId, signer);
      
      console.log("Transaction result:", result);
      
      if (result.transactionHash) {
        addTransaction("success", "NFT purchased successfully with WMETIS!", result.transactionHash);
      } else {
        addTransaction("error", "Transaction failed");
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
              {/* Main Image */}
              <img 
                src={metadata?.image} 
                alt={metadata?.name} 
                className="w-full object-cover aspect-square"
              />
              
              {/* Collection Badge */}
              <div className="absolute top-4 left-4 bg-sinister-black/70 border-sinister-orange/30 border px-3 py-1 text-sm font-heading text-sinister-orange">
                {collectionName}
              </div>
              
              {/* Token ID Badge */}
              <div className="absolute top-4 right-4 bg-sinister-black/70 border-sinister-teal/30 border px-3 py-1 text-sm font-heading text-sinister-teal">
                #{tokenId}
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
              data-text={metadata?.name || `Prophecy #${tokenId}`}
            >
              {metadata?.name || `Prophecy #${tokenId}`}
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
                {metadata?.description || "No description provided for this dark prophecy."}
              </p>
            </div>
            
            {/* Price and Buy Section */}
            <div className="bg-sinister-black/40 border-l-2 border-t-2 border-sinister-orange/30 p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <div className="text-sinister-scroll/70 text-sm">Current Price</div>
                  <div className="text-3xl font-heading text-sinister-gold mt-1">{pricePerToken} METIS</div>
                </div>
                
                {!showPaymentOptions ? (
                  <button 
                    onClick={handleBuyClick}
                    disabled={isLoading || address === sellerAddress || connectionStatus !== "connected"}
                    className={`btn-primary px-8 py-3 font-heading text-lg tracking-wider ${
                      (address === sellerAddress || connectionStatus !== "connected") ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : address === sellerAddress ? (
                      "You Own This"
                    ) : (
                      <span className="relative z-10">BUY NOW</span>
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
              
              {!address && (
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
                    {pricePerToken} METIS
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
            <h2 className="font-heading text-2xl text-gradient-oracle mb-8 uppercase tracking-wider">More Dark Prophecies</h2>
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