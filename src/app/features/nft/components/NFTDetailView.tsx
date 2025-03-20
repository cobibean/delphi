"use client";

import { buyoutAuction, buyWithMetis, getAuctionBidHistory, placeBid } from "@/app/features/marketplace/services/marketplace-v5";
import { useToast } from '@/components/feedback/Toast/useToast';
import { TransactionStatus } from "@/features/marketplace/components/TransactionStatus";
import { NFTCard } from "@/features/nft/components";
import { IListingWithNFT } from "@/interfaces/interfaces";
import { useTransaction } from "@/providers/TransactionProvider";
import { logTransaction, validateNetworkConnection } from '@/utils/debugging';
import { ethers } from "ethers";
import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useActiveAccount, useActiveWallet } from 'thirdweb/react';
import AuctionActions from './AuctionActions';
import { NFTAttributes } from './NFTAttributes';

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

// Helper for formatting crypto values
const formatCryptoValue = (value: string | number | undefined): string => {
  if (!value) return "0";
  
  try {
    // Log the incoming value for debugging
    console.log("Formatting value:", value, "Type:", typeof value);
    
    // If the value is a hex string, assume it's in wei
    if (typeof value === 'string' && value.startsWith('0x')) {
      return ethers.formatEther(value);
    }
    
    // If it's a very large number string, assume it's in wei
    if (typeof value === 'string' && !value.includes('.') && value.length > 15) {
      return ethers.formatEther(value);
    }
    
    // If it's already a decimal string, just return it
    if (typeof value === 'string' && value.includes('.')) {
      return value;
    }
    
    // If it's a number or a numeric string that's not obviously wei, check magnitude
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (numValue > 1e15) {
      // Likely wei
      return ethers.formatEther(value.toString());
    }
    
    // For other cases, return as is
    return numValue.toString();
  } catch (error) {
    console.error("Error formatting crypto value:", error, "Value:", value);
    return "0";
  }
};

export default function NFTDetailView({ listing, relatedListings = [] }: NFTDetailViewProps) {
  const { metadata, collectionName, tokenId, listingCreator, listingId, assetContract } = listing;
  const sellerAddress = listing.sellerAddress || listingCreator;
  
  // Format prices properly using ethers
  const pricePerToken = formatCryptoValue(listing.pricePerToken);
  
  // Check if this is an auction
  const isAuction = (listing as any).type === "auction";
  const minimumBidAmount = isAuction ? formatCryptoValue((listing as any).minimumBidAmount) : "0";
  const buyoutPrice = isAuction ? formatCryptoValue((listing as any).buyoutPrice) : "";
  const currentBid = isAuction ? formatCryptoValue((listing as any).currentBid) : pricePerToken;
  
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
  
  // For auctions
  const [bidAmount, setBidAmount] = useState('');
  const [isBidding, setIsBidding] = useState(false);
  const [isBuyingOut, setIsBuyingOut] = useState(false);
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidHistory, setBidHistory] = useState<any[]>([]);
  const [loadingBidHistory, setLoadingBidHistory] = useState(false);
  
  const wallet = useActiveWallet();
  const account = useActiveAccount();
  
  const { addTransaction } = useTransaction();
  const { toast } = useToast();
  
  // Animations
  const controls = useAnimation();
  
  const router = useRouter();
  
  // Fetch auction bid history
  const fetchBidHistory = async () => {
    try {
      setLoadingBidHistory(true);
      const history = await getAuctionBidHistory(listingId);
      setBidHistory(history || []);
    } catch (error) {
      console.error("Failed to fetch bid history:", error);
    } finally {
      setLoadingBidHistory(false);
    }
  };
  
  // Set mounted state on client
  useEffect(() => {
    setIsMounted(true);
    
    // Apply glitch effect to title periodically
    const glitchInterval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 200);
    }, 5000);
    
    // Validate network connection for debugging
    const validateNetwork = async () => {
      try {
        const isValid = await validateNetworkConnection();
        setNetworkValidated(isValid);
        console.log(`NFTDetailView: Network validation ${isValid ? 'successful' : 'failed'}`);
      } catch (error) {
        console.error("NFTDetailView: Network validation error:", error);
      }
    };
    
    validateNetwork();
    
    // If this is an auction, fetch bid history
    if (isAuction) {
      fetchBidHistory();
    }
    
    return () => {
      clearInterval(glitchInterval);
    };
  }, [isAuction, listingId]);
  
  // Handle image load success
  const handleImageLoad = () => {
    console.log(`NFTDetailView: Image loaded successfully for NFT ${listingId}`);
    setImageLoaded(true);
  };
  
  // Handle image load error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error(`NFTDetailView: Failed to load image for NFT ${listingId}:`, metadata?.image);
    setImageError(true);
    
    // Try alternative gateways if we haven't tried too many already
    if (metadata?.image && attemptedGateways.length < 3) {
      const gateways = [
        'https://ipfs.io/ipfs/',
        'https://cloudflare-ipfs.com/ipfs/',
        'https://gateway.pinata.cloud/ipfs/'
      ];
      
      // Find a gateway we haven't tried yet
      const unusedGateways = gateways.filter(gw => !attemptedGateways.includes(gw));
      
      if (unusedGateways.length > 0) {
        const newGateway = unusedGateways[0];
        console.log(`NFTDetailView: Trying alternative IPFS gateway: ${newGateway}`);
        
        // Extract the IPFS hash
        let ipfsHash = '';
        if (metadata.image.startsWith('ipfs://')) {
          ipfsHash = metadata.image.replace('ipfs://', '');
        } else if (metadata.image.includes('/ipfs/')) {
          ipfsHash = metadata.image.split('/ipfs/')[1];
        } else {
          ipfsHash = metadata.image; // Assume it's just the hash
        }
        
        // Set the new URL with the alternative gateway
        const alternativeUrl = `${newGateway}${ipfsHash}`;
        
        // Update the image source
        const img = e.target as HTMLImageElement;
        img.src = alternativeUrl;
        
        // Record that we've tried this gateway
        setAttemptedGateways([...attemptedGateways, newGateway]);
        
        // Reset error state to allow the image to try loading again
        setImageError(false);
      }
    }
  };

  // Format address for display
  const formatAddress = (addr: string) => {
    return addr ? `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}` : "Unknown";
  };

  // Show payment options
  const handleBuyClick = () => {
    // Check if user is connected
    if (!account || !wallet) {
      toast.error("Please connect your wallet to buy this NFT");
      return;
    }
    
    // Check if user has enough information to proceed
    if (!listing) {
      toast.error("Listing information is missing or incomplete");
      return;
    }
    
    // Handle differently based on listing type
    if (isAuction) {
      // For auctions, show bid form or proceed to buyout
      setShowBidForm(true);
    } else {
      // For direct listings, proceed with METIS purchase
      handleBuyWithMetis();
    }
  };
  
  /**
   * Handle buying with native METIS
   * @param assetContract The NFT contract address
   * @param tokenId The NFT token ID  
   * @param pricePerToken The price per token in METIS
   * @param wallet The user's active wallet
   */
  const handleBuyWithMetis = async () => {
    try {
      if (!wallet) {
        toast.error("Please connect your wallet to make this purchase");
        return;
      }
      
      // Start loading state
      setProcessingPayment(true);
      
      // Reset transaction state
      setTxHash(null);
      setReceiptData(null);
      
      // Log the action
      logTransaction({ 
        transactionHash: "",
        listingId, 
        tokenId, 
        price: pricePerToken 
      }, "buy_with_metis");
      
      // Add a transaction notification
      const txId = addTransaction("loading", `Buying NFT #${tokenId} for ${pricePerToken} METIS...`);
      
      // Get the buyer's address
      const buyerAddress = account?.address;
      
      if (!buyerAddress) {
        throw new Error("Wallet address not found");
      }
      
      // Execute the purchase using appropriate function based on listing type
      let result;
      
      if (isAuction && buyoutPrice) {
        // For auctions with buyout price, use buyoutAuction
        result = await buyoutAuction(listingId, wallet);
      } else {
        // For direct listings, use buyWithMetis
        result = await buyWithMetis(listingId, wallet);
      }
      
      // Store the transaction hash
      setTxHash(result.transactionHash);
      
      // Store the receipt data
      setReceiptData(result.receipt);
      
      // Update the transaction status
      addTransaction(
        "success",
        `Successfully purchased NFT #${tokenId} for ${isAuction ? buyoutPrice : pricePerToken} METIS`,
        result.transactionHash
      );
      
      // Show success message
      toast.success("Purchase successful! Your NFT will be available in your wallet soon.");
      
      // Redirect to profile page after 2 seconds
      setTimeout(() => {
        router.push("/profile");
      }, 2000);
      
    } catch (error: any) {
      console.error("Purchase failed:", error);
      
      // Add failed transaction to history
      addTransaction(
        "error",
        `Failed to purchase NFT #${tokenId}: ${error.message || "Unknown error"}`,
        txHash || ""
      );
      
      // Show error message
      toast.error(error.message || "Failed to complete purchase. Please try again.");
      
    } finally {
      // End loading state
      setProcessingPayment(false);
    }
  };
  
  // Handle cancelling the payment
  const handleCancelPayment = () => {
    setShowPaymentOptions(false);
    setShowBidForm(false);
    
    // Clear any transaction state
    setTxHash(null);
    setReceiptData(null);
  };
  
  // Handle submitting a bid
  const handleBidSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!wallet) {
        toast.error("Please connect your wallet to place a bid");
        return;
      }
      
      if (!bidAmount || isNaN(parseFloat(bidAmount)) || parseFloat(bidAmount) <= 0) {
        toast.error("Please enter a valid bid amount");
        return;
      }
      
      // Parse and validate bid amount
      const bidAmountFloat = parseFloat(bidAmount);
      const minBidAmount = parseFloat(minimumBidAmount);
      const currentBidAmount = parseFloat(currentBid);
      
      // Check if bid is high enough
      const minimumRequired = Math.max(minBidAmount, currentBidAmount * 1.05); // 5% higher than current bid
      
      if (bidAmountFloat < minimumRequired) {
        toast.error(`Bid must be at least ${minimumRequired.toFixed(4)} METIS (5% higher than current bid)`);
        return;
      }
      
      // Start loading state
      setIsBidding(true);
      
      // Reset transaction state
      setTxHash(null);
      setReceiptData(null);
      
      // Log the action
      logTransaction({ 
        transactionHash: "",
        listingId, 
        tokenId, 
        bidAmount 
      }, "place_bid");
      
      // Add a transaction notification
      const txId = addTransaction("loading", `Placing bid of ${bidAmount} METIS on NFT #${tokenId}...`);
      
      // Convert bid amount to wei format for the contract
      const bidAmountInWei = ethers.parseEther(bidAmount).toString();
      
      // Call the placeBid function with properly formatted bid amount
      const result = await placeBid(listingId, bidAmountInWei, wallet);
      
      console.log("Bid result:", result);
      
      // Update transaction state
      if (result.transactionHash) {
        setTxHash(result.transactionHash);
      }
      
      // Update the transaction notification
      if (result.success) {
        addTransaction("success", `Successfully placed bid of ${bidAmount} METIS on NFT #${tokenId}!`, result.transactionHash);
        
        // Close the bid form
        setShowBidForm(false);
        
        // Update bid history
        await fetchBidHistory();
        
        // Show success message and reset form
        setBidAmount('');
      } else {
        addTransaction("error", `Failed to place bid on NFT #${tokenId}`, result.transactionHash);
      }
    } catch (error: any) {
      console.error("Error placing bid:", error);
      
      // Show error message
      toast.error(error.message || "Failed to place bid");
      
      // Add error transaction
      addTransaction("error", `Error: ${error.message || "Transaction failed"}`);
    } finally {
      setIsBidding(false);
    }
  };
  
  // Format wallet address for display in bid history
  const formatWalletAddress = (address: string) => {
    return address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : "Unknown";
  };
  
  // Handle buying out auction
  const handleBuyout = async () => {
    try {
      if (!wallet) {
        toast.error("Please connect your wallet to buy out this auction");
        return;
      }
      
      if (!buyoutPrice) {
        toast.error("This auction does not support buyout");
        return;
      }
      
      // Start loading state
      setIsBuyingOut(true);
      
      // Reset transaction state
      setTxHash(null);
      setReceiptData(null);
      
      // Log the action
      logTransaction({ 
        transactionHash: "",
        listingId, 
        tokenId, 
        buyoutAmount: buyoutPrice 
      }, "buyout_auction");
      
      // Add a transaction notification
      const txId = addTransaction("loading", `Buying out auction for NFT #${tokenId} at ${buyoutPrice} METIS...`);
      
      // Call the buyoutAuction function
      const result = await buyoutAuction(listingId, wallet);
      
      // Update transaction state
      setTxHash(result.transactionHash);
      setReceiptData(result.receipt);
      
      // Update the transaction notification
      if (result.success) {
        addTransaction("success", `Successfully bought out auction for NFT #${tokenId}!`, result.transactionHash);
        
        // Redirect to profile page after successful purchase
        setTimeout(() => {
          router.push("/profile");
        }, 2000);
      } else {
        addTransaction("error", `Failed to buy out auction for NFT #${tokenId}`, result.transactionHash);
      }
    } catch (error: any) {
      console.error("Error buying out auction:", error);
      
      // Show error message
      toast.error(error.message || "Failed to buy out auction");
      
      // Add error transaction
      addTransaction("error", `Error: ${error.message || "Transaction failed"}`);
    } finally {
      setIsBuyingOut(false);
    }
  };

  // Simple placeholder during SSR
  if (!isMounted) {
    return <div className="min-h-screen bg-sinister-black"></div>;
  }
  
  return (
    <div className="bg-sinister-black min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <Link href="/" className="inline-block mb-6 text-sinister-scroll hover:text-sinister-orange transition-colors">
          ← Back to Marketplace
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - NFT Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg border border-sinister-orange/40 bg-sinister-black/30">
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
              
              {/* Auction Badge */}
              {isAuction && (
                <div className="absolute bottom-4 right-4 bg-cosmic-combustion text-white px-3 py-1 text-sm font-bold rounded">
                  AUCTION
                </div>
              )}
            </div>
            
            {/* NFT Contract Information */}
            <div className="mt-4 p-4 bg-sinister-black/40 border border-sinister-orange/20 rounded-lg">
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
              <NFTAttributes attributes={metadata.attributes} />
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
            <motion.h1 
              className={`text-3xl lg:text-4xl font-heading text-oracle-white mb-2 ${glitchText ? 'glitch' : ''}`}
              animate={controls}
            >
              {metadata?.name || `NFT #${tokenId}`}
            </motion.h1>
            
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-sinister-scroll">By</span>
              <span className="text-sinister-orange font-mono">{formatAddress(sellerAddress)}</span>
            </div>
            
            {/* Description */}
            {metadata?.description && (
              <div className="mb-6">
                <h3 className="text-oracle-orange text-lg mb-2">Description</h3>
                <p className="text-sinister-scroll leading-relaxed">{metadata.description}</p>
              </div>
            )}
            
            {/* Price and Purchase Info */}
            <div className="bg-ancient-wisdom p-6 rounded-lg mb-6 border border-oracle-orange/20">
              {isAuction ? (
                <div>
                  <h3 className="text-oracle-orange text-lg mb-2">Current Auction</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sinister-scroll text-sm">Current Bid</p>
                      <p className="text-oracle-white text-2xl font-mono">{currentBid} METIS</p>
                    </div>
                    {buyoutPrice && (
                      <div>
                        <p className="text-sinister-scroll text-sm">Buy Now Price</p>
                        <p className="text-oracle-white text-2xl font-mono">{buyoutPrice} METIS</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Use AuctionActions component for all auction-related functionality */}
                  <AuctionActions 
                    auctionId={listingId}
                    tokenId={tokenId}
                    minimumBidAmount={minimumBidAmount}
                    currentBid={currentBid}
                    buyoutPrice={buyoutPrice}
                    endTimestamp={(listing as any).endTimeInSeconds || 0}
                    creatorAddress={(listing as any).creatorAddress || sellerAddress || ''}
                  />
                </div>
              ) : (
                <div>
                  <h3 className="text-oracle-orange text-lg mb-2">NFT Price</h3>
                  <p className="text-oracle-white text-3xl font-mono mb-6">{pricePerToken} METIS</p>
                  
                  <button 
                    onClick={handleBuyClick}
                    className="btn-primary w-full"
                    disabled={processingPayment}
                  >
                    {processingPayment ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin h-5 w-5 border-2 border-oracle-black border-t-transparent rounded-full mr-2"></div>
                        <span className="relative z-10">Processing...</span>
                      </div>
                    ) : (
                      <span className="relative z-10">Buy Now</span>
                    )}
                  </button>
                </div>
              )}
            </div>
            
            {/* Transaction Status */}
            {txHash && (
              <div className="mb-6">
                <TransactionStatus transactionHash={txHash} />
              </div>
            )}
            
            {/* Bid History for Auctions */}
            {isAuction && (
              <div className="bg-ancient-wisdom p-6 rounded-lg border border-oracle-orange/20">
                <h3 className="text-oracle-orange text-lg mb-4">Bid History</h3>
                
                {loadingBidHistory ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin h-6 w-6 border-2 border-oracle-orange border-t-transparent rounded-full"></div>
                  </div>
                ) : bidHistory.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-oracle-orange/20">
                          <th className="px-4 py-2 text-sinister-scroll text-xs">Bidder</th>
                          <th className="px-4 py-2 text-sinister-scroll text-xs">Amount</th>
                          <th className="px-4 py-2 text-sinister-scroll text-xs">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bidHistory.map((bid, index) => (
                          <tr key={index} className="border-b border-oracle-orange/10">
                            <td className="px-4 py-3 text-oracle-white font-mono text-sm">
                              {formatWalletAddress(bid.bidder)}
                            </td>
                            <td className="px-4 py-3 text-oracle-white text-sm">{bid.bidAmount} METIS</td>
                            <td className="px-4 py-3 text-oracle-white text-sm">
                              {new Date(bid.timestamp * 1000).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-sinister-scroll text-center py-4">No bids placed yet</p>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Related NFTs Section */}
        {relatedListings && relatedListings.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-heading text-oracle-orange mb-6">More from this Collection</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {relatedListings.slice(0, 4).map((related) => (
                <NFTCard key={related.listingId} listing={related} />
              ))}
            </div>
          </div>
        )}
        
        {/* Payment Options Modal */}
        {showPaymentOptions && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-oracle-black/80">
            <div className="bg-ancient-wisdom border border-oracle-orange/20 rounded-xl w-full max-w-md shadow-card-hover">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-heading text-2xl text-oracle-orange">Purchase Options</h3>
                  <button 
                    onClick={handleCancelPayment}
                    className="text-oracle-white/70 hover:text-oracle-orange"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="mb-6">
                  <p className="text-oracle-white mb-2">Complete your purchase of <span className="font-bold">{metadata?.name || `NFT #${tokenId}`}</span></p>
                  <p className="text-oracle-white/70 text-sm mb-4">Price: <span className="text-oracle-orange font-mono">{pricePerToken} METIS</span></p>
                  
                  <div className="space-y-3">
                    <button 
                      onClick={handleBuyWithMetis}
                      className="w-full bg-gradient-to-r from-oracle-orange to-oracle-orange/80 text-oracle-black font-bold py-3 px-4 rounded-md hover:from-oracle-orange/90 hover:to-oracle-orange/70 transition-all flex items-center justify-center"
                      disabled={processingPayment}
                    >
                      {processingPayment ? (
                        <div className="flex items-center">
                          <div className="animate-spin h-5 w-5 border-2 border-oracle-black border-t-transparent rounded-full mr-2"></div>
                          Processing...
                        </div>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          Buy with METIS
                        </>
                      )}
                    </button>
                    
                    {/* Could add more payment options here in the future */}
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-oracle-white/50 text-xs">
                    By completing this purchase, you agree to our terms of service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Bid Form Modal */}
        {showBidForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-oracle-black/80">
            <div className="bg-ancient-wisdom border border-oracle-orange/20 rounded-xl w-full max-w-md shadow-card-hover">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-heading text-2xl text-oracle-orange">Place a Bid</h3>
                  <button 
                    onClick={handleCancelPayment}
                    className="text-oracle-white/70 hover:text-oracle-orange"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="mb-6">
                  <p className="text-oracle-white mb-2">Bidding on <span className="font-bold">{metadata?.name || `NFT #${tokenId}`}</span></p>
                  <p className="text-oracle-white/70 text-sm mb-4">Current Bid: <span className="text-oracle-orange font-mono">{currentBid} METIS</span></p>
                  <p className="text-oracle-white/70 text-sm mb-4">Minimum Bid: <span className="text-oracle-orange font-mono">{Math.max(parseFloat(minimumBidAmount), parseFloat(currentBid) * 1.05).toFixed(4)} METIS</span></p>
                  
                  <form onSubmit={handleBidSubmit}>
                    <div className="mb-4">
                      <label htmlFor="bidAmount" className="block text-oracle-white mb-1">Your Bid (METIS)</label>
                      <input 
                        type="number" 
                        id="bidAmount"
                        className="w-full bg-oracle-black/50 border border-oracle-orange/30 rounded-md px-4 py-2 text-oracle-white focus:outline-none focus:ring-2 focus:ring-oracle-orange/50 focus:border-transparent"
                        placeholder="Enter bid amount"
                        step="0.0001"
                        min={Math.max(parseFloat(minimumBidAmount), parseFloat(currentBid) * 1.05).toFixed(4)}
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        required
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-cosmic-combustion to-cosmic-combustion/80 text-oracle-black font-bold py-3 px-4 rounded-md hover:from-cosmic-combustion/90 hover:to-cosmic-combustion/70 transition-all flex items-center justify-center"
                      disabled={isBidding}
                    >
                      {isBidding ? (
                        <div className="flex items-center">
                          <div className="animate-spin h-5 w-5 border-2 border-oracle-black border-t-transparent rounded-full mr-2"></div>
                          Processing...
                        </div>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Place Bid
                        </>
                      )}
                    </button>
                  </form>
                </div>
                
                <div className="text-center">
                  <p className="text-oracle-white/50 text-xs">
                    By placing a bid, you agree to our terms of service. If your bid is successful, you will be charged the bid amount.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 