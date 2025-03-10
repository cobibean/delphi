"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import * as ethers from "ethers";
import { getMarketplaceContract, getERC721Contract } from "@/app/client";
import { CONTRACT_ADDRESS, WMETIS_CONTRACT_ADDRESS } from "@/app/constants/contracts";
import { useTransaction } from "@/app/providers/TransactionProvider";
import Link from "next/link";

export default function AuctionPage() {
  const router = useRouter();
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const { addTransaction } = useTransaction();
  
  const [assetContract, setAssetContract] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [minimumBid, setMinimumBid] = useState("");
  const [buyoutPrice, setBuyoutPrice] = useState("");
  const [duration, setDuration] = useState(3); // Default 3 days
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [nftDetails, setNftDetails] = useState<{name: string, image: string} | null>(null);
  const [isNftLoading, setIsNftLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  
  // Format IPFS URL helper
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
  
  // Fetch NFT details when contract and token ID are provided
  useEffect(() => {
    const fetchNftDetails = async () => {
      if (!assetContract || !tokenId || !ethers.utils.isAddress(assetContract)) {
        setNftDetails(null);
        return;
      }
      
      try {
        setIsNftLoading(true);
        setError("");
        
        // Get NFT contract
        const nftContract = getERC721Contract(assetContract);
        
        // Check if the token exists and is owned by the user
        try {
          const owner = await nftContract.ownerOf(tokenId);
          if (owner.toLowerCase() !== account?.address.toLowerCase()) {
            setError("You don't own this NFT");
            setNftDetails(null);
            setIsNftLoading(false);
            return;
          }
        } catch (err: any) {
          console.error("Error checking ownership:", err);
          setError("Invalid token ID or contract");
          setNftDetails(null);
          setIsNftLoading(false);
          return;
        }
        
        // Check if the marketplace is approved to transfer the NFT
        try {
          const approvedAddress = await nftContract.getApproved(tokenId);
          setIsApproved(approvedAddress.toLowerCase() === CONTRACT_ADDRESS.toLowerCase());
        } catch (err: any) {
          console.error("Error checking approval:", err);
          setIsApproved(false);
        }
        
        // Get token URI and metadata
        try {
          const tokenURI = await nftContract.tokenURI(tokenId);
          console.log("Token URI:", tokenURI);
          
          // Fetch metadata
          const formattedURI = formatIPFSUrl(tokenURI);
          const response = await fetch(formattedURI);
          const metadata = await response.json();
          
          setNftDetails({
            name: metadata.name || `NFT #${tokenId}`,
            image: formatIPFSUrl(metadata.image) || ""
          });
        } catch (err: any) {
          console.error("Error fetching metadata:", err);
          setNftDetails({
            name: `NFT #${tokenId}`,
            image: ""
          });
        }
        
        setIsNftLoading(false);
      } catch (err: any) {
        console.error("Error fetching NFT details:", err);
        setError("Error fetching NFT details");
        setNftDetails(null);
        setIsNftLoading(false);
      }
    };
    
    fetchNftDetails();
  }, [assetContract, tokenId, account?.address]);
  
  // Approve NFT for marketplace
  const approveNFT = async () => {
    if (!wallet || !assetContract || !tokenId) return;
    
    try {
      setIsApproving(true);
      setError("");
      
      const nftContract = getERC721Contract(assetContract);
      
      console.log("Approving NFT for marketplace...");
      const tx = await nftContract.approve(CONTRACT_ADDRESS, tokenId);
      console.log("Approval transaction sent:", tx.hash);
      
      // Add transaction to the transaction provider
      addTransaction(
        "loading",
        `Approve NFT #${tokenId} for marketplace`,
        tx.hash
      );
      
      // Wait for transaction to be mined
      const receipt = await tx.wait();
      console.log("NFT approved:", receipt.hash);
      
      // Update transaction status
      addTransaction(
        "success",
        `Approve NFT #${tokenId} for marketplace`,
        tx.hash
      );
      
      setIsApproved(true);
    } catch (err: any) {
      console.error("Error approving NFT:", err);
      setError("Error approving NFT for marketplace");
      
      // Update transaction status if there was a hash
      if (err.hash) {
        addTransaction(
          "error",
          `Approve NFT #${tokenId} for marketplace`,
          err.hash
        );
      }
    } finally {
      setIsApproving(false);
    }
  };
  
  // Create auction
  const createAuction = async () => {
    if (!wallet || !assetContract || !tokenId || !minimumBid) {
      setError("Please fill in all required fields");
      return;
    }
    
    if (!isApproved) {
      setError("Please approve the NFT for marketplace first");
      return;
    }
    
    try {
      setIsLoading(true);
      setError("");
      
      const marketplaceContract = getMarketplaceContract();
      
      // Calculate timestamps
      const startTimestamp = Math.floor(Date.now() / 1000); // Now
      const endTimestamp = startTimestamp + (duration * 24 * 60 * 60); // Now + duration in days
      
      // Create auction parameters
      const auctionParams = {
        assetContract: assetContract,
        tokenId: tokenId,
        quantity: 1, // Single NFT
        currency: WMETIS_CONTRACT_ADDRESS, // WMETIS as the currency
        minimumBidAmount: ethers.utils.parseUnits(minimumBid, 18), // Convert to wei
        buyoutBidAmount: buyoutPrice ? ethers.utils.parseUnits(buyoutPrice, 18) : ethers.constants.MaxUint256, // Convert to wei or set to max if not provided
        timeBufferInSeconds: 300, // 5 minutes
        bidBufferBps: 500, // 5%
        startTimestamp: startTimestamp,
        endTimestamp: endTimestamp
      };
      
      console.log("Creating auction with params:", auctionParams);
      
      // Create the auction
      const tx = await marketplaceContract.createAuction(auctionParams);
      console.log("Auction transaction sent:", tx.hash);
      
      // Add transaction to the transaction provider
      addTransaction(
        "loading",
        `Create auction for NFT #${tokenId}`,
        tx.hash
      );
      
      // Wait for transaction to be mined
      const receipt = await tx.wait();
      console.log("Auction created successfully:", receipt.hash);
      
      // Update transaction status
      addTransaction(
        "success",
        `Create auction for NFT #${tokenId}`,
        tx.hash
      );
      
      // Navigate back to home page
      router.push("/");
    } catch (err: any) {
      console.error("Error creating auction:", err);
      setError("Error creating auction: " + (err.message || "Unknown error"));
      
      // Update transaction status if there was a hash
      if (err.hash) {
        addTransaction(
          "error",
          `Create auction for NFT #${tokenId}`,
          err.hash
        );
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <main className="bg-oracle-black min-h-screen pt-6 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading text-3xl text-oracle-orange mb-2">Create Listing</h1>
            <p className="text-oracle-white/70">
              Choose your listing type and set your parameters.
            </p>
          </div>
          
          {/* Listing Type Toggle */}
          <div className="bg-oracle-black-matter border border-oracle-orange/20 rounded-xl p-6 shadow-card-normal mb-8">
            <h2 className="font-heading text-xl text-oracle-orange mb-4">Listing Type</h2>
            <div className="flex space-x-4">
              <Link 
                href="/create/direct-listing"
                className="flex-1 bg-oracle-black-void border border-oracle-orange/30 rounded-lg p-4 text-oracle-orange font-heading tracking-wider hover:bg-oracle-orange/10 transition-colors text-center"
              >
                Direct Listing
              </Link>
              <button 
                className="flex-1 bg-cosmic-combustion rounded-lg p-4 text-oracle-white font-heading tracking-wider"
                disabled
              >
                Auction
              </button>
            </div>
            <p className="mt-4 text-oracle-white/70 text-sm">
              <span className="text-oracle-orange">Auction:</span> Set a minimum bid and duration. The highest bidder wins when the auction ends.
            </p>
          </div>
          
          {/* Form */}
          <div className="bg-oracle-black-matter border border-oracle-orange/20 rounded-xl p-6 shadow-card-normal mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - NFT Preview */}
              <div>
                <h2 className="font-heading text-xl text-oracle-orange mb-4">NFT Preview</h2>
                
                <div className="border-2 border-dashed border-oracle-orange/30 rounded-xl p-4 flex flex-col items-center justify-center bg-oracle-black/20 h-80 mb-4">
                  {isNftLoading ? (
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 border-2 border-oracle-orange border-t-transparent rounded-full animate-spin mb-4"></div>
                      <p className="text-oracle-white/70">Loading NFT details...</p>
                    </div>
                  ) : nftDetails?.image ? (
                    <img 
                      src={nftDetails.image} 
                      alt={nftDetails.name} 
                      className="max-h-full max-w-full object-contain rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-24 h-24 bg-cosmic-connection rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-oracle-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-oracle-white/70 text-center">
                        Enter NFT contract address and token ID to preview
                      </p>
                    </div>
                  )}
                </div>
                
                {nftDetails && (
                  <div className="bg-oracle-black-void/50 rounded-lg p-4 border border-oracle-orange/10">
                    <h3 className="font-heading text-lg text-oracle-orange mb-2">{nftDetails.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-oracle-white/70">Token ID: {tokenId}</span>
                      <span className="text-oracle-white/70">Contract: {`${assetContract.substring(0, 6)}...${assetContract.substring(assetContract.length - 4)}`}</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Right Column - Form Fields */}
              <div>
                <h2 className="font-heading text-xl text-oracle-orange mb-4">Auction Details</h2>
                
                <div className="space-y-6">
                  {/* NFT Contract Address */}
                  <div>
                    <label className="block text-oracle-white mb-2">NFT Contract Address</label>
                    <input 
                      type="text" 
                      className="w-full bg-oracle-black-void border border-oracle-orange/30 rounded-lg p-3 text-oracle-white focus:border-oracle-orange focus:outline-none transition-colors"
                      placeholder="0x..."
                      value={assetContract}
                      onChange={(e) => setAssetContract(e.target.value)}
                    />
                  </div>
                  
                  {/* Token ID */}
                  <div>
                    <label className="block text-oracle-white mb-2">Token ID</label>
                    <input 
                      type="text" 
                      className="w-full bg-oracle-black-void border border-oracle-orange/30 rounded-lg p-3 text-oracle-white focus:border-oracle-orange focus:outline-none transition-colors"
                      placeholder="123"
                      value={tokenId}
                      onChange={(e) => setTokenId(e.target.value)}
                    />
                  </div>
                  
                  {/* Minimum Bid */}
                  <div>
                    <label className="block text-oracle-white mb-2">Minimum Bid (METIS)</label>
                    <input 
                      type="text" 
                      className="w-full bg-oracle-black-void border border-oracle-orange/30 rounded-lg p-3 text-oracle-white focus:border-oracle-orange focus:outline-none transition-colors"
                      placeholder="0.1"
                      value={minimumBid}
                      onChange={(e) => setMinimumBid(e.target.value)}
                    />
                  </div>
                  
                  {/* Buyout Price */}
                  <div>
                    <label className="block text-oracle-white mb-2">Buyout Price (METIS, Optional)</label>
                    <input 
                      type="text" 
                      className="w-full bg-oracle-black-void border border-oracle-orange/30 rounded-lg p-3 text-oracle-white focus:border-oracle-orange focus:outline-none transition-colors"
                      placeholder="1.0"
                      value={buyoutPrice}
                      onChange={(e) => setBuyoutPrice(e.target.value)}
                    />
                    <p className="text-oracle-white/50 text-sm mt-1">
                      Leave empty for no buyout option
                    </p>
                  </div>
                  
                  {/* Duration */}
                  <div>
                    <label className="block text-oracle-white mb-2">Duration (Days)</label>
                    <div className="flex items-center">
                      <input 
                        type="range" 
                        min="1" 
                        max="14" 
                        step="1"
                        className="w-full h-2 bg-oracle-black-void rounded-lg appearance-none cursor-pointer accent-oracle-orange"
                        value={duration}
                        onChange={(e) => setDuration(parseInt(e.target.value))}
                      />
                      <span className="ml-4 text-oracle-white min-w-[40px] text-center">{duration}</span>
                    </div>
                    <div className="flex justify-between text-oracle-white/50 text-sm mt-1">
                      <span>1 day</span>
                      <span>14 days</span>
                    </div>
                  </div>
                  
                  {/* Approval Button */}
                  {nftDetails && !isApproved && (
                    <motion.button
                      className="w-full bg-oracle-black-void border border-oracle-orange rounded-lg p-3 text-oracle-orange hover:bg-oracle-orange/10 transition-colors relative overflow-hidden group"
                      onClick={approveNFT}
                      disabled={isApproving}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="absolute inset-0 w-full h-full bg-white/10 transform scale-0 group-hover:scale-100 rounded-full transition-transform duration-500 origin-center"></span>
                      <span className="relative z-10 flex items-center justify-center">
                        {isApproving ? (
                          <>
                            <div className="w-5 h-5 border-2 border-oracle-orange border-t-transparent rounded-full animate-spin mr-2"></div>
                            Approving...
                          </>
                        ) : (
                          <>Approve NFT for Marketplace</>
                        )}
                      </span>
                    </motion.button>
                  )}
                  
                  {/* Create Auction Button */}
                  <motion.button
                    className="w-full bg-cosmic-combustion rounded-lg p-4 text-oracle-white font-heading tracking-wider hover:bg-cosmic-combustion/90 transition-colors relative overflow-hidden group"
                    onClick={createAuction}
                    disabled={isLoading || !isApproved || !nftDetails}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="absolute inset-0 w-full h-full bg-white/10 transform scale-0 group-hover:scale-100 rounded-full transition-transform duration-500 origin-center"></span>
                    <span className="relative z-10 flex items-center justify-center">
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Creating Auction...
                        </>
                      ) : (
                        <>Create Auction</>
                      )}
                    </span>
                  </motion.button>
                  
                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-500">
                      {error}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Help Section */}
          <div className="bg-oracle-black-void/50 rounded-xl p-6 border border-oracle-orange/10">
            <h2 className="font-heading text-xl text-oracle-orange mb-4">How Auctions Work</h2>
            <ul className="space-y-3 text-oracle-white/70">
              <li className="flex items-start">
                <span className="text-oracle-orange mr-2">•</span>
                <span>Auctions allow users to bid on your NFT, with the highest bidder winning.</span>
              </li>
              <li className="flex items-start">
                <span className="text-oracle-orange mr-2">•</span>
                <span>You can set a minimum bid amount to ensure a baseline value.</span>
              </li>
              <li className="flex items-start">
                <span className="text-oracle-orange mr-2">•</span>
                <span>The optional buyout price allows someone to instantly purchase the NFT.</span>
              </li>
              <li className="flex items-start">
                <span className="text-oracle-orange mr-2">•</span>
                <span>Auctions have a time extension feature - if a bid is placed in the last 5 minutes, the auction extends by 5 minutes.</span>
              </li>
              <li className="flex items-start">
                <span className="text-oracle-orange mr-2">•</span>
                <span>Once the auction ends, the highest bidder can claim the NFT, and you can collect the payment.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
} 