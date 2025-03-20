"use client";

import { metisChain } from "@/config/chain";
import { client } from "@/config/client";
import { CONTRACT_ADDRESS, NATIVE_TOKEN_ADDRESS } from "@/constants/contracts";
import { useTransaction } from "@/providers/TransactionProvider";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getContract, isAddress, readContract, sendTransaction, waitForReceipt } from "thirdweb";
import { isApprovedForAll, setApprovalForAll } from "thirdweb/extensions/erc721";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";

export default function DirectListingPage() {
  const router = useRouter();
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const { addTransaction } = useTransaction();
  
  const [assetContract, setAssetContract] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState(7); // Default 7 days
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
  
  // Helper function to create a marketplace contract
  const getMarketplaceContract = async () => {
    return getContract({
      client,
      chain: metisChain,
      address: CONTRACT_ADDRESS.MARKETPLACE_V5,
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
            operator: CONTRACT_ADDRESS.MARKETPLACE_V5,
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
        operator: CONTRACT_ADDRESS.MARKETPLACE_V5,
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
        operator: CONTRACT_ADDRESS.MARKETPLACE_V5,
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
      
      // ADD DELAY to ensure blockchain state is updated
      await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3 seconds
      
      // Double check approval one more time
      const finalApprovalCheck = await isApprovedForAll({
        contract: nftContract,
        owner: account.address as `0x${string}`,
        operator: CONTRACT_ADDRESS.MARKETPLACE_V5,
      });
      
      console.log("Final approval status check:", finalApprovalCheck);
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
  
  // Create direct listing
  const handleCreateListing = async () => {
    if (!wallet || !assetContract || !tokenId || !price) {
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
      
      // ADDITIONAL VERIFICATION: Double check ownership and approval before creating listing
      const nftContract = await getERC721Contract(assetContract);
      
      try {
        // Verify ownership
        const ownerResult = await readContract({
          contract: nftContract,
          method: "function ownerOf(uint256 tokenId) view returns (address)",
          params: [BigInt(tokenId)]
        });
        
        if (ownerResult.toLowerCase() !== account?.address.toLowerCase()) {
          setError("You don't own this NFT. Ownership verification failed.");
          setIsLoading(false);
          return;
        }
        
        // Verify approval again
        const isStillApproved = await isApprovedForAll({
          contract: nftContract,
          owner: account?.address as `0x${string}`,
          operator: CONTRACT_ADDRESS.MARKETPLACE_V5,
        });
        
        if (!isStillApproved) {
          setError("Marketplace approval is no longer valid. Please approve again.");
          setIsApproved(false);
          setIsLoading(false);
          return;
        }
        
        console.log("Pre-listing verification passed: You own the NFT and marketplace is approved.");
      } catch (verifyErr: any) {
        console.error("Error during pre-listing verification:", verifyErr);
        setError("Failed to verify NFT ownership or approval: " + 
          (verifyErr.message || "Unknown error"));
        setIsLoading(false);
        return;
      }
      
      // Calculate timestamps
      const startTimestamp = Math.floor(Date.now() / 1000);
      const endTimestamp = startTimestamp + (duration * 24 * 60 * 60); // Convert days to seconds
      
      // Get the marketplace contract with ThirdWeb
      const marketplaceContract = getContract({
        client,
        chain: metisChain,
        address: CONTRACT_ADDRESS.MARKETPLACE_V5,
      });
      
      // Add transaction to the transaction provider
      addTransaction(
        "loading",
        `Create listing for NFT #${tokenId}`,
        "Preparing transaction..."
      );
      
      // Use ThirdWeb's direct listing function
      const { createListing } = await import("thirdweb/extensions/marketplace");
      
      // Create the listing transaction
      const listingTx = createListing({
        contract: marketplaceContract,
        assetContractAddress: assetContract as `0x${string}`,
        tokenId: BigInt(tokenId),
        pricePerToken: ethers.parseEther(price).toString(),
        currencyContractAddress: NATIVE_TOKEN_ADDRESS, // Using native token
        quantity: BigInt(1), // For ERC721, always 1
        startTimestamp: new Date(startTimestamp * 1000),
        endTimestamp: new Date(endTimestamp * 1000),
        isReservedListing: false
      });
      
      // Send the transaction
      const listingResult = await sendTransaction({
        transaction: listingTx,
        account
      });
      
      console.log("Listing transaction sent:", listingResult.transactionHash);
      
      // Update transaction status to pending
      addTransaction(
        "loading",
        `Create listing for NFT #${tokenId}`,
        `Waiting for confirmation: ${listingResult.transactionHash}`
      );
      
      // Wait for transaction confirmation
      const receipt = await waitForReceipt({
        client,
        chain: metisChain,
        transactionHash: listingResult.transactionHash,
      });
      
      console.log("Listing transaction confirmed:", receipt);
      
      // Mark transaction as successful
      addTransaction(
        "success",
        `Listed NFT #${tokenId} for ${price} METIS`,
        listingResult.transactionHash
      );
      
      // Update UI state
      setIsLoading(false);
      setSuccess(true);
      
      // Delay redirect to give time for user to see success message
      setTimeout(() => {
        router.push('/features/marketplace');
      }, 3000);
      
    } catch (err: any) {
      console.error("Error creating listing:", err);
      
      // For debugging, log complete error details
      if (err.transaction) console.error("Error transaction:", err.transaction);
      if (err.receipt) console.error("Error receipt:", err.receipt);
      if (err.reason) console.error("Error reason:", err.reason);
      
      // Extract error message
      let errorMessage = "Failed to create listing: ";
      
      if (err.message && err.message.includes("execution reverted")) {
        if (err.message.includes("not owner or approved tokens")) {
          errorMessage += "You don't own this NFT or haven't approved it for the marketplace.";
        } else {
          // Try to extract revert reason
          const revertMatch = err.message.match(/reason string '([^']+)'/);
          if (revertMatch && revertMatch[1]) {
            errorMessage += revertMatch[1];
          } else {
            errorMessage += "Transaction reverted by the contract";
          }
        }
      } else {
        errorMessage += (err.message || "Unknown error");
      }
      
      setError(errorMessage);
      
      // Update transaction status if there was a hash
      if (err.transactionHash) {
        addTransaction(
          "error",
          `Create listing for NFT #${tokenId}`,
          err.transactionHash
        );
      }
      
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
              <button 
                className="flex-1 bg-cosmic-combustion rounded-lg p-4 text-oracle-white font-heading tracking-wider"
                disabled
              >
                Direct Listing
              </button>
              <Link 
                href="/create/auction"
                className="flex-1 bg-oracle-black-void border border-oracle-orange/30 rounded-lg p-4 text-oracle-orange font-heading tracking-wider hover:bg-oracle-orange/10 transition-colors text-center"
              >
                Auction
              </Link>
            </div>
            <p className="mt-4 text-oracle-white/70 text-sm">
              <span className="text-oracle-orange">Direct Listing:</span> Set a fixed price for your NFT. Buyers can purchase immediately at your listed price.
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
                <h2 className="font-heading text-xl text-oracle-orange mb-4">Listing Details</h2>
                
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
                        Create Listing
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
                  
                  {/* Price */}
                  <div>
                    <label className="block text-oracle-white mb-2">Price (METIS)</label>
                    <input 
                      type="text" 
                      className="w-full bg-oracle-black-void border border-oracle-orange/30 rounded-lg p-3 text-oracle-white focus:border-oracle-orange focus:outline-none transition-colors"
                      placeholder="0.1"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  
                  {/* Duration */}
                  <div>
                    <label className="block text-oracle-white mb-2">Duration (Days)</label>
                    <div className="flex items-center">
                      <input 
                        type="range" 
                        min="1" 
                        max="30" 
                        step="1"
                        className="w-full h-2 bg-oracle-black-void rounded-lg appearance-none cursor-pointer accent-oracle-orange"
                        value={duration}
                        onChange={(e) => setDuration(parseInt(e.target.value))}
                      />
                      <span className="ml-4 text-oracle-white min-w-[40px] text-center">{duration}</span>
                    </div>
                    <div className="flex justify-between text-oracle-white/50 text-sm mt-1">
                      <span>1 day</span>
                      <span>30 days</span>
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
                  
                  {/* Create Listing Button */}
                  <motion.button
                    className={`w-full rounded-lg p-4 text-white font-heading tracking-wider relative overflow-hidden group ${
                      (!isApproved || !nftDetails || isLoading) 
                        ? "bg-cosmic-combustion/50 cursor-not-allowed" 
                        : "bg-cosmic-combustion hover:bg-cosmic-combustion/90"
                    }`}
                    onClick={handleCreateListing}
                    disabled={isLoading || !isApproved || !nftDetails}
                    whileHover={isApproved && nftDetails && !isLoading ? { scale: 1.02 } : {}}
                    whileTap={isApproved && nftDetails && !isLoading ? { scale: 0.98 } : {}}
                  >
                    <span className={`absolute inset-0 w-full h-full bg-white/10 transform scale-0 ${isApproved && nftDetails && !isLoading ? "group-hover:scale-100" : ""} rounded-full transition-transform duration-500 origin-center`}></span>
                    <span className="relative z-10 flex items-center justify-center">
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Creating Listing...
                        </>
                      ) : (
                        <>{isApproved ? "Create Listing" : "Step 2: Create Listing"}</>
                      )}
                    </span>
                  </motion.button>
                  
                  {/* Approval reminder message */}
                  {nftDetails && !isApproved && (
                    <div className="text-oracle-orange text-sm mt-2 text-center">
                      You must approve your NFT for marketplace trading before creating a listing
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
            <h2 className="font-heading text-xl text-oracle-orange mb-4">How Direct Listings Work</h2>
            <ul className="space-y-3 text-oracle-white/70">
              <li className="flex items-start">
                <span className="text-oracle-orange mr-2">•</span>
                <span>Direct listings allow you to sell your NFT at a fixed price.</span>
              </li>
              <li className="flex items-start">
                <span className="text-oracle-orange mr-2">•</span>
                <span>Buyers can purchase your NFT immediately at your listed price.</span>
              </li>
              <li className="flex items-start">
                <span className="text-oracle-orange mr-2">•</span>
                <span>You can set a duration for how long the listing will be active.</span>
              </li>
              <li className="flex items-start">
                <span className="text-oracle-orange mr-2">•</span>
                <span>Once a buyer purchases your NFT, the payment will be sent directly to your wallet.</span>
              </li>
              <li className="flex items-start">
                <span className="text-oracle-orange mr-2">•</span>
                <span>You can cancel your listing at any time before it's purchased.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
} 