"use client";

import { useMarketplaceWallet } from '@/app/features/marketplace/hooks/useMarketplaceWallet';
import { getAuctionWinningBid } from '@/app/features/marketplace/services';
import { isAuctionEnded } from '@/app/features/marketplace/services/auctions/helpers';
import { formatNumber } from '@/app/utils/format';
import { useToast } from '@/components/feedback';
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
  // Keep original wallet references for compatibility
  const wallet = useActiveWallet();
  const account = useActiveAccount();
  
  // Add the marketplace wallet hook
  const { 
    executeMarketplaceFunction, 
    isConnected,
    account: marketplaceAccount,
    executeDirectTransaction
  } = useMarketplaceWallet();
  
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
  const [timeRemaining, setTimeRemaining] = useState('');
  const [winningBid, setWinningBid] = useState<{
    bidder: string;
    bidAmount: string;
  } | null>(null);
  
  // Check if the current user is the seller
  useEffect(() => {
    if (account?.address && creatorAddress) {
      setIsSeller(account.address.toLowerCase() === creatorAddress.toLowerCase());
    } else {
      setIsSeller(false);
    }
  }, [account, creatorAddress]);

  // Check auction status on mount and periodically
  useEffect(() => {
    const checkAuctionStatus = async () => {
      try {
        // Check if auction has ended
        const hasEnded = isAuctionEnded(endTimestamp);
        setAuctionEnded(hasEnded);
        
        // Get the current winning bid
        const currentWinningBid = await getAuctionWinningBid(auctionId);
        setWinningBid(currentWinningBid);
        
        // Check if the current user is the winner
        if (hasEnded && currentWinningBid && account?.address) {
          setIsWinner(
            currentWinningBid.bidder.toLowerCase() === account.address.toLowerCase()
          );
        } else {
          setIsWinner(false);
        }
      } catch (error) {
        console.error("Error checking auction status:", error);
      }
    };
    
    checkAuctionStatus();
    
    // Refresh every 30 seconds
    const interval = setInterval(() => {
      setRefreshTrigger(prev => prev + 1);
    }, 30000);
    
    return () => clearInterval(interval);
  }, [auctionId, endTimestamp, account, refreshTrigger]);
  
  // Update time remaining
  useEffect(() => {
    const updateTimeRemaining = () => {
      const now = Math.floor(Date.now() / 1000);
      const remaining = endTimestamp - now;
      
      if (remaining <= 0) {
        setTimeRemaining('Auction ended');
        setAuctionEnded(true);
        return;
      }
      
      // Format the time
      const days = Math.floor(remaining / 86400);
      const hours = Math.floor((remaining % 86400) / 3600);
      const minutes = Math.floor((remaining % 3600) / 60);
      const seconds = remaining % 60;
      
      if (days > 0) {
        setTimeRemaining(`${days}d ${hours}h ${minutes}m`);
      } else if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      } else if (minutes > 0) {
        setTimeRemaining(`${minutes}m ${seconds}s`);
      } else {
        setTimeRemaining(`${seconds}s`);
      }
    };
    
    updateTimeRemaining();
    
    const timer = setInterval(updateTimeRemaining, 1000);
    return () => clearInterval(timer);
  }, [endTimestamp]);
  
  const handleShowBidForm = () => {
    if (!account) {
      toast.error("Please connect your wallet to place a bid");
      return;
    }
    
    setShowBidForm(true);
    // Set initial bid to minimum required
    const minRequired = Math.max(
      parseFloat(minimumBidAmount),
      parseFloat(currentBid) * 1.05
    );
    setBidAmount(minRequired.toFixed(4));
  };
  
  const handleBidSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!account) {
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
      
      // Check if bid exceeds buyout price
      if (buyoutPrice && parseFloat(buyoutPrice) > 0) {
        const buyoutPriceFloat = parseFloat(buyoutPrice);
        // Add a small buffer (0.5%) to avoid edge cases where validations might fail
        if (bidAmountFloat > buyoutPriceFloat * 0.995) {
          toast.error(`Your bid is too close to the buyout price. Please use the buyout option instead, or lower your bid to at most ${(buyoutPriceFloat * 0.99).toFixed(4)} METIS.`);
          return;
        }
      }
      
      // Start loading state
      setIsBidding(true);
      
      // Using executeMarketplaceFunction instead of direct placeBid call
      await executeMarketplaceFunction(
        "placeBid",
        { 
          auctionId,
          bidAmount: bidAmount
        },
        {
          description: `Placing bid of ${bidAmount} METIS on NFT #${tokenId}`,
          onSuccess: async () => {
            // Refresh auction status
            setRefreshTrigger(prev => prev + 1);
            
            // Close bid form
            setShowBidForm(false);
            
            // Reset bid amount
            setBidAmount('');
            
            // Show success message
            toast.success(`Bid of ${bidAmount} METIS placed successfully!`);
          },
          onError: (error) => {
            toast.error(error.message || "Failed to place bid");
          }
        }
      );
    } catch (error: any) {
      console.error("Error placing bid:", error);
      toast.error(error.message || "Failed to place bid");
    } finally {
      setIsBidding(false);
    }
  };
  
  const handleClaimNFT = async () => {
    try {
      if (!account) {
        toast.error("Please connect your wallet to claim this NFT");
        return;
      }
      
      // Start loading state
      setIsClaimingNFT(true);
      
      // Using executeMarketplaceFunction instead of direct collectAuctionNFT call
      await executeMarketplaceFunction(
        "collectAuctionNFT",
        { auctionId },
        {
          description: `Claiming NFT #${tokenId} from auction`,
          onSuccess: () => {
            // Refresh auction status
            setRefreshTrigger(prev => prev + 1);
            
            // Show success message
            toast.success("NFT claimed successfully! Check your wallet to view your new NFT.");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to claim NFT");
          }
        }
      );
    } catch (error: any) {
      console.error("Error claiming NFT:", error);
      toast.error(error.message || "Failed to claim NFT");
    } finally {
      setIsClaimingNFT(false);
    }
  };
  
  const handleCollectPayout = async () => {
    try {
      if (!account) {
        toast.error("Please connect your wallet to collect payout");
        return;
      }
      
      // Start loading state
      setIsCollectingPayout(true);
      
      // Using executeMarketplaceFunction instead of direct collectAuctionPayoutForSeller call
      await executeMarketplaceFunction(
        "collectAuctionPayoutForSeller",
        { auctionId },
        {
          description: `Collecting auction payout for NFT #${tokenId}`,
          onSuccess: () => {
            // Refresh auction status
            setRefreshTrigger(prev => prev + 1);
            
            // Show success message
            toast.success("Payout collected successfully!");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to collect payout");
          }
        }
      );
    } catch (error: any) {
      console.error("Error collecting payout:", error);
      toast.error(error.message || "Failed to collect payout");
    } finally {
      setIsCollectingPayout(false);
    }
  };
  
  const handleBuyout = async () => {
    try {
      if (!account) {
        toast.error("Please connect your wallet to buy out this auction");
        return;
      }
      
      if (!buyoutPrice) {
        toast.error("This auction does not support buyout");
        return;
      }
      
      // Start loading state
      setIsBuyingOut(true);
      
      // Using executeMarketplaceFunction instead of direct buyoutAuction call
      await executeMarketplaceFunction(
        "buyoutAuction",
        { auctionId },
        {
          description: `Buying out auction for NFT #${tokenId} at ${buyoutPrice} METIS`,
          onSuccess: () => {
            // Refresh auction status
            setRefreshTrigger(prev => prev + 1);
            
            // Show success message
            toast.success("Auction bought out successfully! The NFT will be transferred to your wallet.");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to buy out auction");
          }
        }
      );
    } catch (error: any) {
      console.error("Error buying out auction:", error);
      toast.error(error.message || "Failed to buy out auction");
    } finally {
      setIsBuyingOut(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Time Remaining */}
      <div className="flex justify-between items-center">
        <span className="text-sinister-scroll">Time Remaining:</span>
        <span className={`font-mono ${auctionEnded ? 'text-cosmic-combustion' : 'text-oracle-white'}`}>
          {timeRemaining}
        </span>
      </div>
      
      {/* Current Bid */}
      <div>
        <div className="flex justify-between items-center">
          <span className="text-sinister-scroll">Current Bid:</span>
          <span className="text-oracle-white font-mono">{formatNumber(currentBid)} METIS</span>
        </div>
        {winningBid && (
          <div className="text-xs text-sinister-scroll text-right mt-1">
            by {winningBid.bidder.substring(0, 6)}...{winningBid.bidder.substring(winningBid.bidder.length - 4)}
          </div>
        )}
      </div>
      
      {/* Actions based on auction state */}
      {!auctionEnded ? (
        <div className="space-y-3">
          {/* Place Bid Button */}
          <button
            onClick={handleShowBidForm}
            className="btn-outline-primary w-full"
            disabled={isBidding}
          >
            {isBidding ? 'Processing...' : 'Place Bid'}
          </button>
          
          {/* Buyout Button (if available) */}
          {buyoutPrice && (
            <button
              onClick={handleBuyout}
              className="btn-primary w-full"
              disabled={isBuyingOut}
            >
              {isBuyingOut ? 'Processing...' : `Buy Now for ${formatNumber(buyoutPrice)} METIS`}
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {/* Claim NFT (for winner) */}
          {isWinner && (
            <button
              onClick={handleClaimNFT}
              className="btn-primary w-full"
              disabled={isClaimingNFT}
            >
              {isClaimingNFT ? 'Processing...' : 'Claim Your NFT'}
            </button>
          )}
          
          {/* Collect Payout (for seller) */}
          {isSeller && (
            <button
              onClick={handleCollectPayout}
              className="btn-outline-primary w-full"
              disabled={isCollectingPayout}
            >
              {isCollectingPayout ? 'Processing...' : 'Collect Auction Payout'}
            </button>
          )}
          
          {/* If not seller or winner */}
          {!isWinner && !isSeller && (
            <div className="text-center text-sinister-scroll">
              Auction has ended
            </div>
          )}
        </div>
      )}
      
      {/* Bid Form Dialog */}
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
              
              <form onSubmit={handleBidSubmit}>
                <div className="mb-4">
                  <label htmlFor="bidAmount" className="block text-oracle-white mb-1">Your Bid (METIS)</label>
                  <input
                    type="number"
                    id="bidAmount"
                    className="w-full bg-oracle-black/50 border border-oracle-orange/30 rounded-md px-4 py-2 text-oracle-white focus:outline-none focus:ring-2 focus:ring-oracle-orange/50 focus:border-transparent"
                    placeholder="Enter bid amount"
                    step="0.0001"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    required
                  />
                  <p className="text-sinister-scroll text-xs mt-1">
                    Minimum bid: {formatNumber(Math.max(parseFloat(minimumBidAmount), parseFloat(currentBid) * 1.05))} METIS
                  </p>
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
                    'Place Bid'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 