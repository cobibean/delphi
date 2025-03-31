"use client";

import { useToast } from "@/components/feedback";
import { metisChain } from "@/config/chain";
import { client } from "@/config/client";
import { MARKETPLACE_ADDRESS, NATIVE_TOKEN_ADDRESS } from "@/constants/contracts";
import { useTransaction } from "@/providers/TransactionProvider";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getContract, isAddress, readContract, sendAndConfirmTransaction, sendTransaction, waitForReceipt } from "thirdweb";
import { isApprovedForAll, setApprovalForAll } from "thirdweb/extensions/erc721";
import { createAuction } from "thirdweb/extensions/marketplace";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";

export default function AuctionPage() {
  const router = useRouter();
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const { addTransaction } = useTransaction();
  const { toast } = useToast();
  
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
  const [isWaitingForConfirmation, setIsWaitingForConfirmation] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Helper function to create an ERC721 contract
  const getERC721Contract = async (address: string) => {
    return getContract({
      client,
      chain: metisChain,
      address: address as `0x${string}`,
    });
  };
  
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
      if (!assetContract || !tokenId || !isAddress(assetContract)) {
        setNftDetails(null);
        return;
      }
      
      try {
        setIsNftLoading(true);
        setError("");
        
        // Get NFT contract using thirdweb
        const nftContract = await getERC721Contract(assetContract);
        
        // Check if the token exists and is owned by the user
        try {
          const ownerResult = await readContract({
            contract: nftContract,
            method: "function ownerOf(uint256 tokenId) view returns (address)",
            params: [BigInt(tokenId)]
          });
          
          if (ownerResult.toLowerCase() !== account?.address.toLowerCase()) {
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
          const isApprovedResult = await isApprovedForAll({
            contract: nftContract,
            owner: account?.address as `0x${string}`,
            operator: MARKETPLACE_ADDRESS,
          });
          
          setIsApproved(isApprovedResult);
        } catch (err: any) {
          console.error("Error checking approval:", err);
          setIsApproved(false);
        }
        
        // Get token URI and metadata
        try {
          const tokenURI = await readContract({
            contract: nftContract,
            method: "function tokenURI(uint256 tokenId) view returns (string)",
            params: [BigInt(tokenId)]
          });
          
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
      setIsWaitingForConfirmation(false);
      setError("");
      
      console.log("Approving NFT for marketplace...");
      
      // Get the NFT contract with ThirdWeb
      const nftContract = await getERC721Contract(assetContract);
      
      // Create the approval transaction
      const tx = setApprovalForAll({
        contract: nftContract,
        operator: MARKETPLACE_ADDRESS,
        approved: true,
      });

      // Add transaction to the transaction provider (before sending)
      addTransaction(
        "loading",
        `Approve NFT #${tokenId} for marketplace`,
        "Preparing transaction..."
      );
      
      // Get the account from the wallet
      const account = wallet.getAccount();
      if (!account) {
        throw new Error("No connected account found");
      }
      
      // Send the transaction using the connected account
      const result = await sendTransaction({
        transaction: tx,
        account
      });
      
      console.log("Approval transaction sent:", result.transactionHash);
      
      // Set waiting for confirmation state
      setIsWaitingForConfirmation(true);

      // Update transaction status to pending while we wait for confirmation
      addTransaction(
        "loading",
        `Approve NFT #${tokenId} for marketplace`,
        `Waiting for confirmation: ${result.transactionHash}`
      );
      
      // IMPORTANT: Wait for the transaction to be confirmed
      const receipt = await waitForReceipt({
        client,
        chain: metisChain,
        transactionHash: result.transactionHash,
      });
      
      console.log("Approval transaction confirmed:", receipt);

      // Verify the approval again after confirmation to be sure
      const isApprovedAfterTx = await isApprovedForAll({
        contract: nftContract,
        owner: account.address as `0x${string}`,
        operator: MARKETPLACE_ADDRESS,
      });
      
      if (!isApprovedAfterTx) {
        throw new Error("Approval transaction was confirmed but approval status is still false");
      }
      
      // Now that we have confirmation, update the transaction status
      addTransaction(
        "success",
        `Approve NFT #${tokenId} for marketplace`,
        result.transactionHash
      );
      
      // Only set approved after confirmation
      setIsApproved(true);
    } catch (err: any) {
      console.error("Error approving NFT:", err);
      setError("Error approving NFT for marketplace: " + (err.message || "Unknown error"));
      
      // Update transaction status if there was a hash
      if (err.transactionHash) {
        addTransaction(
          "error",
          `Approve NFT #${tokenId} for marketplace`,
          err.transactionHash
        );
      }
    } finally {
      setIsWaitingForConfirmation(false);
      setIsApproving(false);
    }
  };
  
  // Create auction
  const handleCreateAuction = async () => {
    if (!account || !assetContract || !tokenId || !minimumBid) {
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
      
      // Calculate timestamps
      const startDate = new Date();
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + duration);
      
      // Get the marketplace contract
      const marketplaceContract = getContract({
        client,
        chain: metisChain,
        address: MARKETPLACE_ADDRESS as `0x${string}`,
      });
      
      // Log auction parameters for debugging
      console.log("Creating auction with parameters:", {
        assetContract,
        tokenId,
        minimumBid,
        buyoutPrice: buyoutPrice || "0",
        startDate,
        endDate
      });
      
      // Show toast notification
      toast.info("Auction Creation Initiated", "Please confirm the transaction in your wallet.");
      
      // Let ThirdWeb handle the price conversion directly, just like in direct-listings
      // No need for explicit conversion, which can cause issues with astronomical prices

      // Prepare a transaction
      const transaction = createAuction({
        contract: marketplaceContract,
        assetContractAddress: assetContract as `0x${string}`,
        tokenId: BigInt(tokenId),
        quantity: 1n,
        currencyContractAddress: NATIVE_TOKEN_ADDRESS as `0x${string}`,
        minimumBidAmount: minimumBid, // Direct pass-through without conversion
        buyoutBidAmount: buyoutPrice || "1000000", // Direct pass-through with fallback
        timeBufferInSeconds: 300, // 5 minutes
        bidBufferBps: 500, // 5%
        startTimestamp: startDate,
        endTimestamp: endDate
      });
      
      try {
        // Use sendAndConfirmTransaction like the direct-listing page
        const receipt = await sendAndConfirmTransaction({
          transaction,
          account,
        });
        
        console.log("Auction created successfully:", receipt);
        toast.success("Auction Created", `Your NFT #${tokenId} is now up for auction`);
        
        // Update UI state
        setIsLoading(false);
        setSuccess(true);
        
        // Navigate to marketplace page after delay
        setTimeout(() => {
          router.push("/features/marketplace");
        }, 3000);
      } catch (error: any) {
        // Extract error message
        console.error("Error in auction creation:", error);
        setIsLoading(false);
        
        let errorMessage = "Failed to create auction: ";
        
        if (error.code === "ACTION_REJECTED") {
          errorMessage += "Transaction was rejected by the user";
        } else if (error.message) {
          errorMessage += error.message;
        } else {
          errorMessage += "Unknown error";
        }
        
        toast.error("Auction Creation Failed", errorMessage);
        setError(errorMessage);
      }
      
    } catch (err: any) {
      console.error("Error preparing auction transaction:", err);
      setError("Error preparing auction transaction: " + (err.message || "Unknown error"));
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
                
                {/* Approval Status Card - Added to make approval flow clear */}
                {nftDetails && (
                  <div className={`mt-4 rounded-lg p-4 border ${
                    isApproved 
                      ? "border-green-500 bg-green-500/10" 
                      : "border-oracle-orange bg-oracle-orange/10"
                  }`}>
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 rounded-full w-8 h-8 flex items-center justify-center mr-3 ${
                        isApproved ? "bg-green-500" : "bg-oracle-orange"
                      }`}>
                        {isApproved 
                          ? <span className="text-white text-sm">✓</span> 
                          : <span className="text-white text-sm">1</span>}
                      </div>
                      <div>
                        <h3 className="font-heading text-sm">
                          {isApproved 
                            ? "NFT Approved" 
                            : "Approval Required"}
                        </h3>
                        <p className={`text-xs ${isApproved ? "text-green-500" : "text-oracle-orange"}`}>
                          {isApproved 
                            ? "Your NFT is approved for trading" 
                            : "Approve this NFT for marketplace trading first"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Right Column - Form Fields */}
              <div>
                <h2 className="font-heading text-xl text-oracle-orange mb-4">Auction Details</h2>
                
                {/* Approval Step Status - Added to make the steps clear */}
                {nftDetails && (
                  <div className="mb-6 flex items-center">
                    <div className="flex-1 flex items-center">
                      <div className={`rounded-full w-8 h-8 flex items-center justify-center mr-2 ${
                        isApproved ? "bg-green-500" : "bg-oracle-orange"
                      }`}>
                        <span className="text-white text-sm">1</span>
                      </div>
                      <span className={`text-sm ${isApproved ? "text-green-500" : "text-oracle-orange"}`}>
                        {isApproved ? "NFT Approved ✓" : "Approve NFT"}
                      </span>
                    </div>
                    
                    <div className="w-8 h-px bg-oracle-orange/30"></div>
                    
                    <div className="flex-1 flex items-center">
                      <div className={`rounded-full w-8 h-8 flex items-center justify-center mr-2 ${
                        isApproved ? "bg-oracle-orange" : "bg-oracle-black-void border border-oracle-orange/30"
                      }`}>
                        <span className={`text-sm ${isApproved ? "text-white" : "text-oracle-orange/50"}`}>2</span>
                      </div>
                      <span className={`text-sm ${isApproved ? "text-oracle-orange" : "text-oracle-orange/50"}`}>
                        Create Auction
                      </span>
                    </div>
                  </div>
                )}
                
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
                      onChange={(e) => {
                        // Only allow numbers and a single decimal point
                        const val = e.target.value;
                        if (val === '' || /^(\d+\.?\d*|\.\d+)$/.test(val)) {
                          // Validate the value is not too large (prevent astronomical prices)
                          if (parseFloat(val || '0') <= 100000) {
                            setMinimumBid(val);
                          } else {
                            setError("Minimum bid cannot exceed 100,000 METIS");
                          }
                        }
                      }}
                    />
                    <p className="text-oracle-white/50 text-sm mt-1">
                      Enter a reasonable price (max 100,000 METIS)
                    </p>
                  </div>
                  
                  {/* Buyout Price */}
                  <div>
                    <label className="block text-oracle-white mb-2">Buyout Price (METIS, Optional)</label>
                    <input 
                      type="text" 
                      className="w-full bg-oracle-black-void border border-oracle-orange/30 rounded-lg p-3 text-oracle-white focus:border-oracle-orange focus:outline-none transition-colors"
                      placeholder="1.0"
                      value={buyoutPrice}
                      onChange={(e) => {
                        // Only allow numbers and a single decimal point
                        const val = e.target.value;
                        if (val === '' || /^(\d+\.?\d*|\.\d+)$/.test(val)) {
                          // Validate the value is not too large (prevent astronomical prices)
                          if (val === '' || parseFloat(val) <= 100000) {
                            setBuyoutPrice(val);
                          } else {
                            setError("Buyout price cannot exceed 100,000 METIS");
                          }
                        }
                      }}
                    />
                    <p className="text-oracle-white/50 text-sm mt-1">
                      Leave empty for no buyout option (max 100,000 METIS)
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
                      className="w-full bg-oracle-orange text-white rounded-lg p-4 font-heading tracking-wider hover:bg-oracle-orange/90 transition-colors relative overflow-hidden group"
                      onClick={approveNFT}
                      disabled={isApproving}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="absolute inset-0 w-full h-full bg-white/10 transform scale-0 group-hover:scale-100 rounded-full transition-transform duration-500 origin-center"></span>
                      <span className="relative z-10 flex items-center justify-center">
                        {isApproving ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            {isWaitingForConfirmation ? "Waiting for confirmation..." : "Approving..."}
                          </>
                        ) : (
                          <>Step 1: Approve NFT for Marketplace</>
                        )}
                      </span>
                    </motion.button>
                  )}
                  
                  {/* Create Auction Button */}
                  <motion.button
                    className={`w-full rounded-lg p-4 text-white font-heading tracking-wider relative overflow-hidden group ${
                      (!isApproved || !nftDetails || isLoading) 
                        ? "bg-cosmic-combustion/50 cursor-not-allowed" 
                        : "bg-cosmic-combustion hover:bg-cosmic-combustion/90"
                    }`}
                    onClick={handleCreateAuction}
                    disabled={isLoading || !isApproved || !nftDetails}
                    whileHover={isApproved && nftDetails && !isLoading ? { scale: 1.02 } : {}}
                    whileTap={isApproved && nftDetails && !isLoading ? { scale: 0.98 } : {}}
                  >
                    <span className={`absolute inset-0 w-full h-full bg-white/10 transform scale-0 ${isApproved && nftDetails && !isLoading ? "group-hover:scale-100" : ""} rounded-full transition-transform duration-500 origin-center`}></span>
                    <span className="relative z-10 flex items-center justify-center">
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Creating Auction...
                        </>
                      ) : (
                        <>{isApproved ? "Create Auction" : "Step 2: Create Auction"}</>
                      )}
                    </span>
                  </motion.button>
                  
                  {/* Approval reminder message */}
                  {nftDetails && !isApproved && (
                    <div className="text-oracle-orange text-sm mt-2 text-center">
                      You must approve your NFT for marketplace trading before creating an auction
                    </div>
                  )}
                  
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