"use client";

import {
  buyoutAuction,
  collectAuctionNFT,
  collectAuctionPayoutForSeller,
  getAuctionWinningBid,
  isAuctionEnded,
  placeBid
} from '@/app/features/marketplace/services/marketplace-v5';
import { formatNumber } from '@/app/utils/format';
import { useToast } from '@/components/feedback/Toast/useToast';
import { useTransaction } from '@/providers/TransactionProvider';
import React, { useEffect, useState } from 'react';
import { useActiveAccount, useActiveWallet } from 'thirdweb/react';

interface AuctionActionsProps {
  auctionId: string;
  tokenId: string;
  minimumBidAmount: string;
  currentBid: string;
  buyoutPrice?: string;
  endTimestamp: number;
  creatorAddress: string;
}

export default function AuctionActions({
  auctionId,
  tokenId,
  minimumBidAmount,
  currentBid,
  buyoutPrice,
  endTimestamp,
  creatorAddress
}: AuctionActionsProps) {
  const wallet = useActiveWallet();
  const account = useActiveAccount();
  const { addTransaction } = useTransaction();
  const { toast } = useToast();
  
  const [bidAmount, setBidAmount] = useState('');
  const [isBidding, setIsBidding] = useState(false);
  const [isBuyingOut, setIsBuyingOut] = useState(false);
  const [showBidForm, setShowBidForm] = useState(false);
  const [isClaimingNFT, setIsClaimingNFT] = useState(false);
  const [isCollectingPayout, setIsCollectingPayout] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Auction state
  const [auctionEnded, setAuctionEnded] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  
  // Check if user is seller
  useEffect(() => {
    if (account?.address && creatorAddress) {
      setIsSeller(account.address.toLowerCase() === creatorAddress.toLowerCase());
    }
  }, [account?.address, creatorAddress]);
  
  // Check auction status and timing
  useEffect(() => {
    const checkAuctionStatus = async () => {
      const ended = isAuctionEnded(endTimestamp);
      setAuctionEnded(ended);
      
      // If auction has ended, check if user is the winner
      if (ended && account?.address) {
        try {
          const winningBid = await getAuctionWinningBid(auctionId);
          if (winningBid && winningBid.bidder.toLowerCase() === account.address.toLowerCase()) {
            setIsWinner(true);
          }
        } catch (error) {
          console.error("Error checking winning bid:", error);
        }
      }
    };
    
    checkAuctionStatus();
    
    // Set up interval to check auction status and update countdown
    const interval = setInterval(() => {
      checkAuctionStatus();
      updateTimeRemaining();
    }, 1000);
    
    return () => clearInterval(interval);
  }, [auctionId, endTimestamp, account?.address, refreshTrigger]);
  
  // Update time remaining display
  const updateTimeRemaining = () => {
    const now = Math.floor(Date.now() / 1000);
    const secondsRemaining = endTimestamp - now;
    
    if (secondsRemaining <= 0) {
      setTimeRemaining('Auction ended');
      return;
    }
    
    // Format time remaining
    const days = Math.floor(secondsRemaining / 86400);
    const hours = Math.floor((secondsRemaining % 86400) / 3600);
    const minutes = Math.floor((secondsRemaining % 3600) / 60);
    const seconds = secondsRemaining % 60;
    
    if (days > 0) {
      setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    } else if (hours > 0) {
      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
    } else if (minutes > 0) {
      setTimeRemaining(`${minutes}m ${seconds}s`);
    } else {
      setTimeRemaining(`${seconds}s`);
    }
  };
  
  // Handle showing bid form
  const handleShowBidForm = () => {
    if (!wallet) {
      toast.error("Please connect your wallet to place a bid");
      return;
    }
    
    setShowBidForm(true);
  };
  
  // Handle bid submission
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
      
      // Check if bid is high enough (minimum bid or 5% higher than current bid)
      const minimumRequired = Math.max(minBidAmount, currentBidAmount * 1.05);
      
      if (bidAmountFloat < minimumRequired) {
        toast.error(`Bid must be at least ${formatNumber(minimumRequired)} METIS (5% higher than current bid)`);
        return;
      }
      
      // Start loading state
      setIsBidding(true);
      
      // Add a transaction notification
      addTransaction("loading", `Placing bid of ${bidAmount} METIS on NFT #${tokenId}...`);
      
      // Place the bid
      const result = await placeBid(auctionId, bidAmount, wallet);
      
      // Update transaction notification
      if (result.success) {
        addTransaction("success", `Successfully placed bid of ${bidAmount} METIS on NFT #${tokenId}!`, result.transactionHash);
        
        // Close the bid form and reset
        setShowBidForm(false);
        setBidAmount('');
        
        // Trigger refresh of auction state
        setRefreshTrigger(prev => prev + 1);
        
        // Show success message
        toast.success("Bid placed successfully!");
      } else {
        addTransaction("error", `Failed to place bid on NFT #${tokenId}`, result.transactionHash);
        toast.error("Failed to place bid");
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
  
  // Handle NFT claim for auction winner
  const handleClaimNFT = async () => {
    if (!wallet || !isWinner) return;
    
    try {
      setIsClaimingNFT(true);
      
      // Add transaction notification
      addTransaction("loading", `Claiming NFT #${tokenId} from auction...`);
      
      // Collect the NFT
      const result = await collectAuctionNFT(auctionId, wallet);
      
      if (result.success) {
        addTransaction("success", `Successfully claimed NFT #${tokenId} from auction!`, result.transactionHash);
        toast.success("NFT claimed successfully!");
        
        // Trigger refresh
        setRefreshTrigger(prev => prev + 1);
      } else {
        addTransaction("error", `Failed to claim NFT #${tokenId}`, result.transactionHash);
        toast.error("Failed to claim NFT");
      }
    } catch (error: any) {
      console.error("Error claiming NFT:", error);
      toast.error(error.message || "Failed to claim NFT");
      addTransaction("error", `Error: ${error.message || "Transaction failed"}`);
    } finally {
      setIsClaimingNFT(false);
    }
  };
  
  // Handle payout collection for seller
  const handleCollectPayout = async () => {
    if (!wallet || !isSeller) return;
    
    try {
      setIsCollectingPayout(true);
      
      // Add transaction notification
      addTransaction("loading", `Collecting payout for NFT #${tokenId} auction...`);
      
      // Collect the payout
      const result = await collectAuctionPayoutForSeller(auctionId, wallet);
      
      if (result.success) {
        addTransaction("success", `Successfully collected payout for NFT #${tokenId} auction!`, result.transactionHash);
        toast.success("Payout collected successfully!");
        
        // Trigger refresh
        setRefreshTrigger(prev => prev + 1);
      } else {
        addTransaction("error", `Failed to collect payout for NFT #${tokenId}`, result.transactionHash);
        toast.error("Failed to collect payout");
      }
    } catch (error: any) {
      console.error("Error collecting payout:", error);
      toast.error(error.message || "Failed to collect payout");
      addTransaction("error", `Error: ${error.message || "Transaction failed"}`);
    } finally {
      setIsCollectingPayout(false);
    }
  };
  
  // Handle auction buyout
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
      
      // Log the action
      // Add a transaction notification
      const txId = addTransaction("loading", `Buying out auction for NFT #${tokenId} at ${buyoutPrice} METIS...`);
      
      // Show confirmation dialog
      const confirmed = window.confirm(`Are you sure you want to buy out this auction for ${buyoutPrice} METIS?`);
      
      if (!confirmed) {
        addTransaction("info", "Buyout cancelled");
        setIsBuyingOut(false);
        return;
      }
      
      // Call the buyoutAuction function
      const result = await buyoutAuction(auctionId, wallet);
      
      // Update the transaction notification
      if (result.success) {
        addTransaction("success", `Successfully bought out auction for NFT #${tokenId}!`, result.transactionHash);
        
        // Redirect to profile page after successful purchase
        setTimeout(() => {
          window.location.href = '/profile';
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

  return (
    <div className="space-y-4">
      {/* Auction Timer */}
      <div className="mb-4">
        <p className="text-sinister-scroll text-sm">
          {auctionEnded ? 'Auction ended' : 'Ends in'}
        </p>
        <p className="text-oracle-white font-mono text-xl">
          {timeRemaining}
        </p>
      </div>
      
      {/* Active Auction Actions */}
      {!auctionEnded && (
        <div className="flex gap-3">
          <button 
            onClick={handleShowBidForm}
            className="btn-primary flex-1"
            disabled={isBidding}
          >
            <span className="relative z-10">Place Bid</span>
          </button>
          
          {buyoutPrice && (
            <button 
              onClick={handleBuyout}
              className="btn-secondary flex-1"
              disabled={isBuyingOut}
            >
              {isBuyingOut ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin h-4 w-4 border-2 border-oracle-black border-t-transparent rounded-full mr-2"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <span>Buy Now</span>
              )}
            </button>
          )}
        </div>
      )}
      
      {/* Post-Auction Actions - For Winner */}
      {auctionEnded && isWinner && (
        <button
          onClick={handleClaimNFT}
          className="btn-primary w-full"
          disabled={isClaimingNFT}
        >
          {isClaimingNFT ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin h-4 w-4 border-2 border-oracle-black border-t-transparent rounded-full mr-2"></div>
              <span>Claiming NFT...</span>
            </div>
          ) : (
            <span>Claim Your NFT</span>
          )}
        </button>
      )}
      
      {/* Post-Auction Actions - For Seller */}
      {auctionEnded && isSeller && (
        <button
          onClick={handleCollectPayout}
          className="btn-secondary w-full"
          disabled={isCollectingPayout}
        >
          {isCollectingPayout ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin h-4 w-4 border-2 border-oracle-black border-t-transparent rounded-full mr-2"></div>
              <span>Collecting Payout...</span>
            </div>
          ) : (
            <span>Collect Auction Proceeds</span>
          )}
        </button>
      )}
      
      {/* Bid Form Modal */}
      {showBidForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-oracle-black/80">
          <div className="bg-ancient-wisdom border border-oracle-orange/20 rounded-xl w-full max-w-md shadow-card-hover">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading text-2xl text-oracle-orange">Place a Bid</h3>
                <button 
                  onClick={() => setShowBidForm(false)}
                  className="text-oracle-white/70 hover:text-oracle-orange"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-oracle-white mb-2">Bidding on NFT #{tokenId}</p>
                <p className="text-oracle-white/70 text-sm mb-4">Current Bid: <span className="text-oracle-orange font-mono">{currentBid} METIS</span></p>
                <p className="text-oracle-white/70 text-sm mb-4">Minimum Bid: <span className="text-oracle-orange font-mono">
                  {formatNumber(Math.max(parseFloat(minimumBidAmount), parseFloat(currentBid) * 1.05))} METIS
                </span></p>
                
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 