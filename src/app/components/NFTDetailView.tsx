"use client";

import React, { useState, useEffect } from "react";
import { IListingWithNFT } from "@/app/interfaces/interfaces";
import { useMarketplaceMint } from "@/app/hooks/useMarketplaceMint";
import Link from "next/link";
import { useActiveAccount } from "thirdweb/react";
import { WMETIS_CONTRACT_ADDRESS } from "@/app/constants/contracts";

// Native token address constant
const NATIVE_TOKEN_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

// Helper function to get currency symbol
const getCurrencySymbol = (currencyAddress: string): string => {
  if (currencyAddress === NATIVE_TOKEN_ADDRESS) {
    return "METIS";
  } else if (currencyAddress.toLowerCase() === WMETIS_CONTRACT_ADDRESS.toLowerCase()) {
    return "WMETIS";
  } else {
    // Truncate unknown token addresses
    return `${currencyAddress.substring(0, 6)}...${currencyAddress.substring(currencyAddress.length - 4)}`;
  }
};

interface NFTDetailViewProps {
  listing: IListingWithNFT;
}

export default function NFTDetailView({ listing }: NFTDetailViewProps) {
  const { metadata, collectionName, tokenId, pricePerToken, assetContract, listingCreator, currency } = listing;
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const { wrapAndBuy } = useMarketplaceMint();
  const account = useActiveAccount();

  // Get currency symbol
  const currencySymbol = getCurrencySymbol(currency);

  // Calculate total price
  const totalPrice = Number(pricePerToken) * quantity;

  // Handle quantity change
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Handle buy
  const handleBuy = async () => {
    if (!account) {
      alert("Please connect your wallet first");
      return;
    }
    
    try {
      setIsProcessing(true);
      
      // Check if the currency is supported
      if (currency !== NATIVE_TOKEN_ADDRESS && 
          currency.toLowerCase() !== WMETIS_CONTRACT_ADDRESS.toLowerCase()) {
        alert(`This NFT requires payment in a currency that is not currently supported: ${currencySymbol}`);
        return;
      }
      
      // Call wrapAndBuy function
      await wrapAndBuy(listing, quantity);
      
      // Optional: Add success message here if needed
    } catch (error) {
      console.error("Error buying NFT:", error);
      
      // Format error message for user
      let errorMessage = "Failed to purchase NFT";
      
      if (error instanceof Error) {
        if (error.message.includes("invalid currency")) {
          errorMessage = `This NFT can only be purchased with ${currencySymbol}`;
        } else if (error.message.includes("insufficient funds")) {
          errorMessage = `You don't have enough ${currencySymbol} to complete this purchase`;
        } else if (error.message.includes("user rejected")) {
          errorMessage = "Transaction was cancelled";
        } else {
          errorMessage = error.message;
        }
      }
      
      alert(`Purchase failed: ${errorMessage}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-turquoise-400">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/explore" className="hover:text-turquoise-400">Explore</Link>
        <span className="mx-2">/</span>
        <span className="text-turquoise-400">{metadata?.name || `NFT #${tokenId}`}</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Column - NFT Image */}
        <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl">
          <div className="relative aspect-square">
            <img 
              src={metadata?.image} 
              alt={metadata?.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Right Column - NFT Details */}
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-turquoise-400">
              {metadata?.name || `NFT #${tokenId}`}
            </h1>
            <div className="flex items-center mb-4">
              <span className="text-gray-500 dark:text-gray-400 mr-2">Collection:</span>
              <span className="font-medium text-turquoise-300">{collectionName}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {metadata?.description || "No description available"}
            </p>
          </div>
          
          {/* Price and Purchase Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-gray-500 dark:text-gray-400 text-sm">Current Price</span>
                <div className="text-2xl font-bold">{pricePerToken} {currencySymbol}</div>
              </div>
              
              {/* Quantity Selector */}
              <div className="flex items-center">
                <span className="text-gray-500 dark:text-gray-400 mr-3">Quantity:</span>
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full">
                  <button 
                    onClick={handleDecreaseQuantity}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                    disabled={quantity <= 1}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                  <span className="w-8 text-center">{quantity}</span>
                  <button 
                    onClick={handleIncreaseQuantity}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Total Price */}
            <div className="mb-6 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="flex justify-between">
                <span>Total Price:</span>
                <span className="font-bold">{totalPrice.toFixed(6)} {currencySymbol}</span>
              </div>
            </div>
            
            {/* Buy Button */}
            <button 
              onClick={handleBuy}
              disabled={isProcessing || !account}
              className="w-full bg-gradient-to-r from-turquoise-400 to-orange-400 text-white py-3 px-6 rounded-full font-bold text-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Processing..." : account ? `Buy Now for ${totalPrice.toFixed(6)} ${currencySymbol}` : "Connect Wallet to Buy"}
            </button>
          </div>
          
          {/* NFT Details */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Token ID</span>
                <span className="font-mono">{tokenId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Contract Address</span>
                <span className="font-mono text-sm truncate max-w-[200px]">{assetContract}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Creator</span>
                <span className="font-mono text-sm truncate max-w-[200px]">{listingCreator}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related NFTs Section - Placeholder for now */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">More from this collection</h2>
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
          <p className="text-gray-500 dark:text-gray-400">Related NFTs will be shown here</p>
        </div>
      </div>
    </div>
  );
} 