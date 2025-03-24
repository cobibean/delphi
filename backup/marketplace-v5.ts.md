import { metisChain } from "@/app/config/chain";
import { client } from "@/app/config/client";
import { INFTAttribute, INFTMetadata } from "@/app/interfaces/interfaces";
import { CONTRACT_ADDRESS } from "@/constants/contracts";
import { ethers } from "ethers";
import { getContract, getContractEvents, NATIVE_TOKEN_ADDRESS, prepareContractCall, sendTransaction, waitForReceipt } from "thirdweb";
import { getContractMetadata } from "thirdweb/extensions/common";
import { allowance, approve } from "thirdweb/extensions/erc20";
import { getNFT } from "thirdweb/extensions/erc721";
import { bidInAuction as bidInAuctionThirdweb, buyFromListing, buyoutAuction as buyoutAuctionThirdweb, getAllValidAuctions, getAllValidListings, getWinningBid, isNewWinningBid, newBidEvent } from "thirdweb/extensions/marketplace";
import { toEther } from "thirdweb/utils";

// Fix for wallet provider access
declare global {
  interface Window {
    ethereum: any;
  }
}

// Log the marketplace contract address for debugging
console.log(`Marketplace Contract: ${CONTRACT_ADDRESS.MARKETPLACE_V5}`);

// Enhanced error logging utility for contract interactions
const logContractError = (error: any, operation: string) => {
  console.error(`Error during ${operation}:`, error);
  console.error("Error type:", typeof error);
  console.error("Error code:", error.code);
  console.error("Error message:", error.message);
  
  // Log additional error details if available
  if (error.data) console.error("Error data:", error.data);
  if (error.transaction) console.error("Error transaction:", error.transaction);
  if (error.receipt) console.error("Error receipt:", error.receipt);
  if (error.reason) console.error("Error reason:", error.reason);
  
  // Try to parse error message for more details
  if (error.message) {
    if (error.message.includes("execution reverted")) {
      console.error("Contract execution reverted");
      
      // Try to extract revert reason
      const revertMatch = error.message.match(/reason string '([^']+)'/);
      if (revertMatch && revertMatch[1]) {
        console.error("Revert reason:", revertMatch[1]);
      }
    }
  }
};

// Enhanced formatIPFSUrl function with better IPFS handling
const formatIPFSUrl = (url: string): string => {
  if (!url) {
    return '';
  }
  
  // Extract the IPFS hash from various formats
  let ipfsHash = '';
  
  // Handle ipfs:// protocol
  if (url.startsWith('ipfs://')) {
    ipfsHash = url.substring(7); // Remove 'ipfs://'
  }
  // Handle URLs with /ipfs/ path
  else if (url.includes('/ipfs/')) {
    ipfsHash = url.split('/ipfs/')[1];
  }
  // Handle direct CID format
  else if (/^[a-zA-Z0-9]{46,}$/.test(url)) {
    ipfsHash = url;
  }
  
  // If we extracted an IPFS hash, use our proxy
  if (ipfsHash) {
    // Use our own proxy API route
    const proxyUrl = `/api/ipfs-proxy?hash=${encodeURIComponent(ipfsHash)}`;
    return proxyUrl;
  }
  
  // If it's already an HTTP URL, return it as is
  if (url.startsWith('http')) {
    return url;
  }
  
  // Default case: return the original URL
  return url;
};

// Add interfaces for auctions
export interface IAuction {
  auctionId: string;
  tokenId: string;
  quantity: string;
  minimumBidAmount: string;
  buyoutBidAmount: string;
  timeBufferInSeconds: number;
  bidBufferBps: number;
  startTimestamp: number;
  endTimestamp: number;
  auctionCreator: string;
  assetContract: string;
  currency: string;
  tokenType: number;
  status: number;
  highestBid?: {
    bidder: string;
    amount: string;
  };
}

// Define the IDirectListing interface
export interface IDirectListing {
  listingId: string;
  tokenId: string;
  quantity: string;
  pricePerToken: string;
  assetContract: string;
  startTimestamp: number;
  endTimestamp: number;
  status: number;
  currency: string;
  tokenType: number;
  reserved: false;
  listingCreator: string;
}

// Update the IListingWithNFT interface to fix buyoutPrice type
export interface IListingWithNFT extends IDirectListing {
  metadata?: INFTMetadata;
  collectionName?: string;
  sellerAddress?: string;
  currentBid?: string;
  currentBidder?: string;
  minimumBidAmount?: string;
  buyoutPrice?: string; // Keep it simple - just string or undefined
  assetContractAddress?: string;
  type?: string;
  contractName?: string;
  contractSymbol?: string;
  endTimeInSeconds?: number;
  creatorAddress?: string;
  id?: string;
  isAuction?: boolean; // Add this property to explicitly check auction type
}

/**
 * Get all active listings from the marketplace
 */
export const getAllListings = async (): Promise<IListingWithNFT[]> => {
  try {
    console.log("Getting marketplace contract at", CONTRACT_ADDRESS.MARKETPLACE_V5);
    
    // Get the marketplace contract
    const marketplaceContract = getContract({
      client,
      chain: metisChain,
      address: CONTRACT_ADDRESS.MARKETPLACE_V5,
    });
    
    // Get all valid listings using the marketplace extension
    const listings = await getAllValidListings({
      contract: marketplaceContract
    });
    
    console.log(`Found ${listings.length} direct listings`);
    
    // Get all valid auctions
    const auctions = await getAllValidAuctions({
      contract: marketplaceContract
    });
    
    console.log(`Found ${auctions.length} auctions`);
    
    // Convert listings to our interface format
    const enhancedListings = await Promise.all(
      listings.map(async (listing) => {
        try {
          return await getListing(listing.id.toString());
        } catch (error) {
          console.error(`Error enhancing listing ${listing.id}:`, error);
          return null;
        }
      })
    );
    
    // Convert auctions to our interface format
    const enhancedAuctions = await Promise.all(
      auctions.map(async (auction) => {
        try {
          return await getAuction(auction.id.toString());
        } catch (error) {
          console.error(`Error enhancing auction ${auction.id}:`, error);
          return null;
        }
      })
    );
    
    // Filter out null listings and auctions
    const validListings = enhancedListings.filter(listing => listing !== null) as IListingWithNFT[];
    const validAuctions = enhancedAuctions.filter(auction => auction !== null) as IListingWithNFT[];
    
    // Combine both types into a single array
    const allItems = [...validListings, ...validAuctions];
    
    console.log(`Found ${validListings.length} valid direct listings and ${validAuctions.length} valid auctions`);
    return allItems;
    
  } catch (error) {
    console.error("Error fetching listings:", error);
    return [];
  }
};

/**
 * Get a specific listing by ID with NFT metadata
 */
export const getListing = async (listingId: string): Promise<IListingWithNFT | null> => {
  try {
    // Get the marketplace contract
    const marketplaceContract = getContract({
      client,
      chain: metisChain,
      address: CONTRACT_ADDRESS.MARKETPLACE_V5,
    });
    
    // Get all valid listings to find the one we want
    const allListings = await getAllValidListings({
      contract: marketplaceContract
    });
    
    // Find the listing with the matching ID
    const listing = allListings.find(l => l.id.toString() === listingId);
    
    if (!listing) {
      console.error(`Listing ${listingId} not found`);
      return null;
    }
    
    // Get the NFT contract
    const nftContract = getContract({
      client,
      chain: metisChain,
      address: listing.assetContractAddress as `0x${string}`,
    });
    
    // Get NFT metadata
    const nft = await getNFT({
      contract: nftContract,
      tokenId: listing.asset.id
    });
    
    // Parse listing data to match our interface
    const parsedListing: IDirectListing = {
      listingId: listing.id.toString(),
      tokenId: listing.asset.id.toString(),
      quantity: listing.quantity.toString(),
      pricePerToken: listing.currencyValuePerToken.displayValue,
      assetContract: listing.assetContractAddress,
      startTimestamp: Number(listing.startTimeInSeconds || 0),
      endTimestamp: Number(listing.endTimeInSeconds || 0),
      status: 1, // Assuming active
      currency: listing.currencyContractAddress,
      tokenType: 0, // Assuming ERC721
      reserved: false,
      listingCreator: listing.creatorAddress
    };
    
    // Format metadata
    const attributes = Array.isArray(nft.metadata.attributes) 
      ? nft.metadata.attributes.map(attr => ({
          trait_type: String(attr.trait_type || ''),
          value: String(attr.value || '')
        })) 
      : [];
      
    // Log the raw image URL from the NFT metadata
    console.log(`Listing ${listingId} - Raw image URL:`, nft.metadata.image);
    
    // Format the image URL
    const formattedImageUrl = formatIPFSUrl(nft.metadata.image || '');
    
    // Log the formatted image URL
    console.log(`Listing ${listingId} - Formatted image URL:`, formattedImageUrl);
      
    const metadata: INFTMetadata = {
      image: formattedImageUrl,
      name: nft.metadata.name || `NFT #${listing.asset.id}`,
      description: nft.metadata.description || "",
      attributes: attributes as INFTAttribute[]
    };
    
    // Get collection name
    let collectionName = "Unknown Collection";
    try {
      const contractMetadata = await getContractMetadata({
        contract: nftContract
      });
      if (contractMetadata && contractMetadata.name) {
        collectionName = contractMetadata.name;
      }
    } catch (nameError) {
      console.warn("Could not fetch collection name", nameError);
    }
    
    // Combine listing data with token metadata
    const listingWithNFT: IListingWithNFT = {
      ...parsedListing,
      metadata,
      collectionName
    };
    
    return listingWithNFT;
    
  } catch (error) {
    console.error(`Error fetching listing ${listingId}:`, error);
    return null;
  }
};

/**
 * Get a specific auction by ID with NFT metadata
 * Overloaded to also find auctions by contract address and token ID
 */
export const getAuction = async (auctionIdOrContractAddress: string, tokenId?: string): Promise<IListingWithNFT | null> => {
  try {
    // Get the marketplace contract
    const marketplaceContract = getContract({
      client,
      chain: metisChain,
      address: CONTRACT_ADDRESS.MARKETPLACE_V5,
    });
    
    // Get all valid auctions to find the one we want
    const allAuctions = await getAllValidAuctions({
      contract: marketplaceContract
    });
    
    let auction;
    
    // If tokenId is provided, we're looking for an auction by contract and token ID
    if (tokenId) {
      auction = allAuctions.find(a => 
        a.assetContractAddress.toLowerCase() === auctionIdOrContractAddress.toLowerCase() && 
        a.tokenId.toString() === tokenId.toString()
      );
      
      if (!auction) {
        console.log(`No auction found for NFT ${auctionIdOrContractAddress}/${tokenId}`);
        return null;
      }
    } else {
      // Otherwise, we're looking for an auction by ID
      auction = allAuctions.find(a => a.id.toString() === auctionIdOrContractAddress);
      
      if (!auction) {
        console.error(`Auction ${auctionIdOrContractAddress} not found`);
        return null;
      }
    }
    
    // Get the NFT contract
    const nftContract = getContract({
      client,
      chain: metisChain,
      address: auction.assetContractAddress as `0x${string}`,
    });
    
    // Get NFT metadata
    const nft = await getNFT({
      contract: nftContract,
      tokenId: auction.tokenId
    });
    
    // Format attributes to match our interface
    const attributes = Array.isArray(nft.metadata.attributes) 
      ? nft.metadata.attributes.map(attr => ({
        trait_type: attr.trait_type || "",
        value: attr.value?.toString() || ""
      }))
      : [];
    
    // Get contract name and symbol for reference
    const contractMetadata = await getContractMetadata({
      contract: nftContract
    });
    
    // Get the winning bid if any
    let currentBid: string | undefined = undefined;
    let currentBidder: string | undefined = undefined;
    
    try {
      const winningBid = await getWinningBid({
        contract: marketplaceContract,
        auctionId: auction.id
      });
      
      if (winningBid && winningBid.bidderAddress !== ethers.ZeroAddress) {
        currentBid = ethers.formatEther(winningBid.bidAmountWei);
        currentBidder = winningBid.bidderAddress;
      }
    } catch (error) {
      console.error("Error fetching winning bid:", error);
    }
    
    // Format the auction with NFT data
    const auctionWithNFT: IListingWithNFT = {
      listingId: auction.id.toString(),
      assetContract: auction.assetContractAddress,
      tokenId: auction.tokenId.toString(),
      quantity: auction.quantity.toString(),
      listingCreator: auction.creatorAddress,
      startTimestamp: Number(auction.startTimeInSeconds),
      endTimestamp: Number(auction.endTimeInSeconds),
      endTimeInSeconds: Number(auction.endTimeInSeconds),
      currency: auction.currencyContractAddress,
      pricePerToken: "0",
      status: 1,
      tokenType: 0,
      reserved: false,
      currentBid,
      currentBidder,
      type: "auction",
      minimumBidAmount: ethers.formatEther(auction.minimumBidAmount),
      buyoutPrice: auction.buyoutBidAmount ? ethers.formatEther(auction.buyoutBidAmount) : "", // Use empty string instead of null
      metadata: {
        name: nft.metadata.name || "Unnamed NFT",
        description: nft.metadata.description || "",
        image: formatIPFSUrl(nft.metadata.image || ""),
        attributes: attributes
      },
      contractName: contractMetadata.name,
      collectionName: contractMetadata.name,
      contractSymbol: contractMetadata.symbol,
      assetContractAddress: auction.assetContractAddress,
      creatorAddress: auction.creatorAddress,
      id: auction.id.toString()
    };
    
    return auctionWithNFT;
  } catch (error) {
    console.error(`Error fetching auction:`, error);
    return null;
  }
};

/**
 * Get bid history for an auction
 */
export const getAuctionBidHistory = async (auctionId: string): Promise<any[]> => {
  try {
    // Get the marketplace contract
    const marketplaceContract = getContract({
      client,
      chain: metisChain,
      address: CONTRACT_ADDRESS.MARKETPLACE_V5,
    });
    
    // Get bid events
    const bidEvents = await getContractEvents({
      contract: marketplaceContract,
      events: [
        newBidEvent({
          auctionId: BigInt(auctionId)
        })
      ],
      // Get the last 100 events to ensure we don't miss any
      fromBlock: "earliest",
      toBlock: "latest"
    });
    
    // Format bid history
    const formattedBidHistory = bidEvents.map(event => {
      // Access the args property safely with type assertion
      const args = event.args as { bidder: string; bidAmount: bigint; };
      
      return {
        bidder: args.bidder,
        bidAmount: toEther(args.bidAmount),
        // Just use current time as fallback since we can't access block timestamp reliably
        timestamp: Math.floor(Date.now() / 1000) - (bidEvents.indexOf(event) * 60), // Approximate time (newer bids first)
        transactionHash: event.transactionHash || ""
      };
    }).sort((a, b) => b.timestamp - a.timestamp); // Sort by timestamp (newest first)
    
    console.log(`Found ${formattedBidHistory.length} bids for auction ${auctionId}`);
    
    return formattedBidHistory;
  } catch (error) {
    console.error(`Error getting bid history for auction ${auctionId}:`, error);
    return [];
  }
};

/**
 * Buy an NFT with METIS (native token)
 */
export async function buyWithMetis(
  listingId: string, 
  account: any
): Promise<{transactionHash: string, listingId: string, success: boolean, receipt: any}> {
  try {
    // Basic validation
    if (!account || !account.address) {
      throw new Error("No valid account provided");
    }
    
    const recipientAddress = account.address;
    console.log("Using account with address:", recipientAddress);
    
    // Get the marketplace contract
    const marketplaceContract = getContract({
      client,
      chain: metisChain,
      address: CONTRACT_ADDRESS.MARKETPLACE_V5,
    });
    
    // Get all valid listings to find the one we want
    const allListings = await getAllValidListings({
      contract: marketplaceContract
    });
    
    // Find the listing with the matching ID
    const listing = allListings.find(l => l.id.toString() === listingId);
    
    if (!listing) {
      throw new Error(`Listing ${listingId} not found`);
    }
    
    // Create the buy transaction
    const transaction = buyFromListing({
      contract: marketplaceContract,
      listingId: listing.id,
      quantity: listing.quantity,
      recipient: recipientAddress as `0x${string}`,
    });
    
    // Send the transaction with the account directly
    const receipt = await sendTransaction({
      transaction,
      account,
    });
    
    return {
      transactionHash: receipt.transactionHash,
      listingId,
      success: true,
      receipt: receipt
    };
  } catch (error: any) {
    console.error("Error buying NFT:", error);
    throw error;
  }
}

/**
 * Place a bid on an auction
 * @param auctionId The ID of the auction
 * @param bidAmount The bid amount (can be in ETH format or wei format)
 * @param account The user's account
 */
export async function placeBid(
  auctionId: string,
  bidAmount: string,
  account: any
): Promise<{ transactionHash?: string, success: boolean, error?: string }> {
  try {
    // Determine if bidAmount is already in wei format
    const isWeiFormat = bidAmount.length > 18 || bidAmount.startsWith('0x');
    
    // Convert to ETH format for logging and checking
    const bidAmountInEth = isWeiFormat ? ethers.formatEther(bidAmount) : bidAmount;
    
    console.log(`Placing bid for auction ${auctionId} with amount ${bidAmountInEth} METIS`);
    
    // Get the marketplace contract
    const marketplaceContract = await getContract({
      client,
      chain: metisChain,
      address: CONTRACT_ADDRESS.MARKETPLACE_V5,
    });
    
    // Use account directly - no need to extract it
    if (!account || !account.address) {
      throw new Error("No connected account found");
    }
    
    // Check if this bid would be a winning bid - use ETH format for the check
    const wouldBeWinningBid = await isNewWinningBid({
      contract: marketplaceContract,
      auctionId: BigInt(auctionId),
      bidAmount: ethers.parseEther(bidAmountInEth)
    });
    
    if (!wouldBeWinningBid) {
      return {
        success: false,
        error: "Bid amount is not high enough to become the winning bid"
      };
    }
    
    // Log bid details
    console.log("Bidding with amount:", bidAmountInEth, "METIS");
    console.log("Auction ID:", auctionId);
    console.log("Contract address:", CONTRACT_ADDRESS.MARKETPLACE_V5);
    
    // Ensure bidAmount is in wei format for the contract call
    const bidAmountInWei = isWeiFormat ? bidAmount : ethers.parseEther(bidAmount).toString();
    
    // Create the transaction
    const transaction = bidInAuctionThirdweb({
      contract: marketplaceContract,
      auctionId: BigInt(auctionId),
      bidAmount: bidAmountInWei // Ensure we're using wei format for the contract
    });
    
    console.log("Transaction created:", transaction);
    
    // Send the transaction
    const result = await sendTransaction({
      transaction,
      account
    });
    
    console.log("Bid transaction sent:", result.transactionHash);
    
    // Wait for the transaction to be confirmed
    const receipt = await waitForReceipt({
      client,
      chain: metisChain,
      transactionHash: result.transactionHash,
    });
    
    console.log("Bid transaction confirmed:", receipt);
    
    return {
      transactionHash: result.transactionHash,
      success: true
    };
    
  } catch (error: any) {
    console.error("Error placing bid:", error);
    return {
      success: false,
      error: error.message || "Failed to place bid"
    };
  }
}

/**
 * Buyout an auction at the buyout price
 */
export async function buyoutAuction(
  auctionId: string,
  account: any
): Promise<{ transactionHash: string, success: boolean, receipt: any }> {
  try {
    console.log("Buying out auction with ID:", auctionId);
    
    // Get the marketplace contract
    const marketplaceContract = await getContract({
      client,
      chain: metisChain,
      address: CONTRACT_ADDRESS.MARKETPLACE_V5,
    });
    
    // Use account directly
    if (!account || !account.address) {
      throw new Error("No connected account found");
    }
    
    // First we need to get the auction details to determine the currency and price
    const allAuctions = await getAllValidAuctions({
      contract: marketplaceContract
    });
    
    // Find the auction with the matching ID
    const auction = allAuctions.find(a => a.id.toString() === auctionId);
    
    if (!auction) {
      throw new Error(`Auction ${auctionId} not found`);
    }
    
    // For non-native token buyouts, we need to check allowance and approve if needed
    if (auction.currencyContractAddress !== "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE") {
      console.log(`Non-native token auction: ${auction.currencyContractAddress}`);
      
      // Get the ERC20 token contract
      const tokenContract = getContract({
        client,
        chain: metisChain,
        address: auction.currencyContractAddress as `0x${string}`,
      });
      
      // Check if the marketplace has enough allowance
      const currentAllowance = await allowance({
        contract: tokenContract,
        owner: account.address,
        spender: CONTRACT_ADDRESS.MARKETPLACE_V5,
      });
      
      console.log(`Current allowance: ${currentAllowance.toString()}, Buyout price: ${auction.buyoutBidAmount.toString()}`);
      
      // If allowance is less than buyout price, approve
      if (currentAllowance < auction.buyoutBidAmount) {
        console.log("Approving marketplace to spend tokens...");
        
        // Create approval transaction
        const approveTx = approve({
          contract: tokenContract,
          spender: CONTRACT_ADDRESS.MARKETPLACE_V5,
          amount: auction.buyoutBidAmount.toString()
        });
        
        // Send approval transaction
        const approveResult = await sendTransaction({
          transaction: approveTx,
          account
        });
        
        console.log("Approval transaction sent:", approveResult.transactionHash);
        
        // Wait for approval transaction to be confirmed
        await waitForReceipt({
          client,
          chain: metisChain,
          transactionHash: approveResult.transactionHash,
        });
        
        console.log("Approval transaction confirmed");
      }
    }
    
    // After ensuring proper approval, create the buyout transaction
    const tx = buyoutAuctionThirdweb({
      contract: marketplaceContract,
      auctionId: BigInt(auctionId)
    });
    
    // Send the transaction
    const result = await sendTransaction({
      transaction: tx,
      account
    });
    
    console.log("Buyout transaction sent:", result.transactionHash);
    
    // Wait for transaction confirmation
    const confirmedReceipt = await waitForReceipt({
      client,
      chain: metisChain,
      transactionHash: result.transactionHash,
    });
    
    console.log("Buyout transaction confirmed:", confirmedReceipt);
    
    return {
      transactionHash: result.transactionHash,
      success: true, 
      receipt: confirmedReceipt
    };
  } catch (error: any) {
    console.error("Error buying out auction:", error);
    throw error;
  }
}

/**
 * Create a direct listing
 * 
 * @param assetContract The address of the NFT contract
 * @param tokenId The ID of the NFT to list
 * @param pricePerToken The price per token in ETH
 * @param quantity The quantity to list
 * @param startTime The start time of the listing (optional)
 * @param endTime The end time of the listing (optional)
 * @param account The account to use for the transaction
 * @returns Transaction details
 */
export const createDirectListing = async (
  assetContract: string,
  tokenId: string,
  pricePerToken: string,
  quantity: number = 1,
  account: any,
  startTime?: number,
  endTime?: number
) => {
  try {
    console.log(`Creating listing for token ${tokenId} at ${pricePerToken} METIS`);
    
    // Get the marketplace contract
    const marketplaceContract = await getContract({
      client,
      chain: metisChain,
      address: CONTRACT_ADDRESS.MARKETPLACE_V5,
    });

    // METIS native token address - this is the standard across EVM chains
    const nativeTokenAddress = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
    
    // Convert price to wei
    const priceInWei = ethers.parseEther(pricePerToken).toString();
    console.log("Price in wei:", priceInWei);

    // Set timestamps
    const startTimestamp = startTime || Math.floor(Date.now() / 1000);
    const endTimestamp = endTime || startTimestamp + (30 * 24 * 60 * 60);

    // Debug info
    console.log("Debug info:", {
      account: account.address,
      assetContract,
      tokenId,
      quantity,
      currency: nativeTokenAddress,
      pricePerToken: priceInWei,
      startTimestamp,
      endTimestamp
    });

    // Prepare the listing parameters
    const listingParams = {
      assetContract: assetContract as `0x${string}`,
      tokenId: BigInt(tokenId),
      quantity: BigInt(quantity),
      currency: nativeTokenAddress as `0x${string}`, // Use standard EVM native token address
      pricePerToken: BigInt(priceInWei),
      startTimestamp: BigInt(startTimestamp),
      endTimestamp: BigInt(endTimestamp),
      reserved: false
    };

    console.log("Creating listing with parameters:", listingParams);

    // Prepare the transaction using prepareContractCall
    const transaction = prepareContractCall({
      contract: marketplaceContract,
      method: "function createListing((address assetContract, uint256 tokenId, uint256 quantity, address currency, uint256 pricePerToken, uint128 startTimestamp, uint128 endTimestamp, bool reserved) _params) returns (uint256 listingId)",
      params: [listingParams],
    });

    // Send the transaction
    const result = await sendTransaction({ 
      transaction, 
      account 
    });

    console.log("Listing transaction sent:", result.transactionHash);

    // Wait for confirmation
    const receipt = await waitForReceipt({
      client,
      chain: metisChain,
      transactionHash: result.transactionHash,
    });

    console.log("Listing transaction confirmed:", receipt);

    return {
      success: true,
      transactionHash: result.transactionHash,
      receipt
    };
  } catch (error) {
    console.error("Error creating listing:", error);
    throw error;
  }
};

/**
 * Cancel a listing
 * 
 * @param listingId The ID of the listing to cancel
 * @returns Transaction details
 */
export const cancelListing = async (listingId: string) => {
  try {
    console.log(`Cancelling listing ${listingId}`);
    
    // Check if browser wallet is available
    if (!window.ethereum) {
      throw new Error("No Ethereum wallet found. Please install MetaMask or another wallet.");
    }
    
    // Get the provider and signer
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    // Fix: Use Interface instead of direct ABI for the contract
    const abiInterface = new ethers.Interface((await import("@/app/constants/MarketplaceABI")).default[0]);
    
    // Get the contract directly with the signer
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS.MARKETPLACE_V5,
      abiInterface,
      signer
    );
    
    // Cancel the listing
    const tx = await contract.cancelListing(listingId);
    console.log("Transaction submitted:", tx.hash);
    
    // Wait for transaction to be mined
    const receipt = await tx.wait();
    console.log("Transaction confirmed:", receipt);
    
    return {
      transactionHash: tx.hash,
      success: true,
      receipt: receipt
    };
  } catch (error) {
    console.error(`Error cancelling listing ${listingId}:`, error);
    throw error;
  }
};

/**
 * Deploy an NFT contract
 * 
 * @param collectionName The name of the collection
 * @param symbol The symbol of the collection
 * @param description The description of the collection
 * @param contractType The type of contract (ERC721, ERC1155)
 * @param royaltyPercentage The royalty percentage (0-15%)
 * @param royaltyRecipient The address that will receive royalties
 * @returns Transaction details
 */
export const deployNFTContract = async (
  collectionName: string,
  symbol: string,
  description: string,
  contractType: string,
  royaltyPercentage: number,
  royaltyRecipient: string
) => {
  try {
    console.log(`Deploying ${contractType} contract: ${collectionName} (${symbol})`);
    
    // Check if browser wallet is available
    if (!window.ethereum) {
      throw new Error("No Ethereum wallet found. Please install MetaMask or another wallet.");
    }
    
    // Get the provider and signer
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    // For a real implementation, you'd deploy the contract here using ethers.js
    // This is a placeholder implementation
    console.log("Contract deployment parameters:", {
      collectionName,
      symbol,
      description,
      contractType,
      royaltyPercentage,
      royaltyRecipient
    });
    
    // Simulate contract deployment
    // In a real implementation, you would use ContractFactory from ethers.js
    // const factory = new ethers.ContractFactory(abi, bytecode, signer);
    // const contract = await factory.deploy(collectionName, symbol, royaltyRecipient, royaltyPercentage * 100);
    
    // Simulate a transaction hash for now
    const mockTxHash = "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890";
    console.log("Mock deployment transaction:", mockTxHash);
    
    // Return simulated success response
    return {
      transactionHash: mockTxHash,
      success: true,
      contractAddress: "0x1234567890123456789012345678901234567890", // Mock contract address
      receipt: {
        status: 1,
        blockNumber: 12345678
      }
    };
  } catch (error) {
    console.error("Error deploying NFT contract:", error);
    throw error;
  }
};

/**
 * Create an auction
 * 
 * @param tokenContract The address of the NFT contract
 * @param tokenId The ID of the NFT to auction
 * @param minimumBidAmount The minimum bid amount in ETH
 * @param buyoutBidAmount The buyout bid amount in ETH
 * @param timeBufferInSeconds The time buffer in seconds
 * @param bidBufferBps The bid buffer BPS
 * @param startTime The start time of the auction
 * @param endTime The end time of the auction
 * @returns Transaction details
 */
export const createAuction = async (
  tokenContract: string,
  tokenId: string,
  minimumBidAmount: string,
  buyoutBidAmount: string,
  timeBufferInSeconds: number = 300, // Default: 5 minutes
  bidBufferBps: number = 500, // Default: 5%
  startTime?: number,
  endTime?: number
): Promise<{ transactionHash: string; success: boolean; receipt: any }> => {
  try {
    console.log(`Creating auction for token ${tokenId} with minimum bid ${minimumBidAmount} ETH`);
    console.log("Marketplace contract address:", CONTRACT_ADDRESS.MARKETPLACE_V5);
    console.log("Token contract address:", tokenContract);
    
    // Check if browser wallet is available
    if (!window.ethereum) {
      throw new Error("No Ethereum wallet found. Please install MetaMask or another wallet.");
    }
    
    // Get the provider and signer
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    // Fix: Use Interface instead of direct ABI for the contract
    const abiInterface = new ethers.Interface((await import("@/app/constants/MarketplaceABI")).default[0]);
    
    // Get the contract directly with the signer
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS.MARKETPLACE_V5,
      abiInterface,
      signer
    );
    
    // Set default times if not provided
    const now = Math.floor(Date.now() / 1000);
    const auctionStartTime = startTime || now;
    const auctionEndTime = endTime || now + 7 * 24 * 60 * 60; // Default 7 days
    
    // Convert parameters to wei
    const minimumBidAmountWei = ethers.parseEther(minimumBidAmount);
    const buyoutBidAmountWei = ethers.parseEther(buyoutBidAmount);
    
    // Configure the auction parameters according to the ABI structure
    const auctionParams = {
      assetContract: tokenContract,
      tokenId: tokenId,
      quantity: 1, // For ERC721, always 1
      currency: NATIVE_TOKEN_ADDRESS, // Using native METIS token
      minimumBidAmount: minimumBidAmountWei,
      buyoutBidAmount: buyoutBidAmountWei,
      timeBufferInSeconds: timeBufferInSeconds,
      bidBufferBps: bidBufferBps,
      startTimestamp: auctionStartTime,
      endTimestamp: auctionEndTime
    };
    
    console.log("Creating auction with params:", auctionParams);
    
    // Debug code to verify the createAuction method exists
    if (typeof contract.createAuction !== 'function') {
      console.error("createAuction method not found on contract!");
      console.error("Available methods:", Object.keys(contract.functions));
      throw new Error("createAuction method not found on contract - ABI may be incorrect");
    }
    
    // Log parameters for debugging
    console.log("Creating auction with params:", {
      ...auctionParams,
      minimumBidAmount: auctionParams.minimumBidAmount.toString(),
      buyoutBidAmount: auctionParams.buyoutBidAmount.toString()
    });
    
    // Create the auction
    const tx = await contract.createAuction(auctionParams);
    console.log("Transaction submitted:", tx.hash);
    
    // Wait for transaction to be mined
    const receipt = await tx.wait();
    console.log("Transaction confirmed:", receipt);
    
    return {
      transactionHash: tx.hash,
      success: true,
      receipt: receipt
    };
  } catch (error) {
    console.error("Error creating auction:", error);
    logContractError(error, "creating auction");
    throw error;
  }
};

// Update the isNativeToken check to handle all possible METIS native token addresses
const isNativeToken = (address: string): boolean => {
  if (!address) return false;
  
  const knownNativeAddresses = [
    NATIVE_TOKEN_ADDRESS.toLowerCase(),
    "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"
  ];
  
  return knownNativeAddresses.includes(address.toLowerCase());
};

export const buyFromDirectListing = async (
  listingId: string,
  quantityOrAccount: any,
  accountOrUndefined?: any
) => {
  try {
    console.log(`Buying NFT from listing ${listingId}`);
    
    // Determine if parameters are in wrong order by checking types
    let quantity = 1;
    let account;
    
    if (typeof quantityOrAccount === 'object' && quantityOrAccount?.address) {
      // If second param is an account object, use it
      account = quantityOrAccount;
      console.log("Parameter fix: using second parameter as account");
    } else if (typeof quantityOrAccount === 'number' || typeof quantityOrAccount === 'string') {
      // If second param is a number or string, use as quantity
      quantity = Number(quantityOrAccount);
      account = accountOrUndefined;
      console.log("Using standard parameter order");
    } else {
      throw new Error("Invalid parameters: need listingId, quantity, and account");
    }
    
    if (!account || !account.address) {
      throw new Error("No valid account provided for purchase");
    }
    
    // Get the marketplace contract
    const marketplaceContract = await getContract({
      client,
      chain: metisChain,
      address: CONTRACT_ADDRESS.MARKETPLACE_V5,
    });

    // Get listing details to determine price
    const listing = await getListing(listingId);
    if (!listing) {
      throw new Error(`Listing ${listingId} not found`);
    }

    console.log("Listing price:", listing.pricePerToken);
    console.log("Listing currency:", listing.currency);
    
    // ThirdWeb format matches your contract
    const nativeTokenAddress = "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000";
    
    // Check if the listing is using native token
    const isNativeListing = listing.currency.toLowerCase() === nativeTokenAddress.toLowerCase();
    console.log("Is native token listing:", isNativeListing);
    
    // Safe string conversions
    const safeListingId = String(listingId);
    const safeQuantity = String(quantity);
    const safePricePerToken = String(listing.pricePerToken);
    
    // Calculate total price using safe string values
    const totalPrice = BigInt(safePricePerToken) * BigInt(safeQuantity);
    console.log("Total price (wei):", totalPrice.toString());
    
    // Prepare buy transaction with explicit type conversions
    const transaction = prepareContractCall({
      contract: marketplaceContract,
      method: "function buyFromListing(uint256 _listingId, address _buyFor, uint256 _quantity, address _currency, uint256 _totalPrice) returns ()",
      params: [
        BigInt(safeListingId),
        account.address, // Not converting to BigInt, this is an address
        BigInt(safeQuantity),
        listing.currency, // Not converting to BigInt, this is an address
        totalPrice
      ],
      value: isNativeListing ? totalPrice : undefined, // Only send value if it's a native token listing
    });

    console.log("Buy transaction params:", {
      listingId: safeListingId,
      buyFor: account.address,
      quantity: safeQuantity,
      currency: listing.currency,
      totalPrice: totalPrice.toString(),
      value: isNativeListing ? totalPrice.toString() : "0"
    });

    // Send the transaction
    const result = await sendTransaction({
      transaction,
      account
    });

    console.log("Buy transaction sent:", result.transactionHash);

    // Wait for confirmation
    const receipt = await waitForReceipt({
      client,
      chain: metisChain,
      transactionHash: result.transactionHash,
    });

    console.log("Buy transaction confirmed:", receipt);

    return {
      success: true,
      transactionHash: result.transactionHash,
      receipt
    };
  } catch (error) {
    console.error("Error buying from listing:", error);
    throw error;
  }
};

/**
 * Get a direct listing by NFT contract address and token ID
 * @param contractAddress The NFT contract address
 * @param tokenId The NFT token ID
 * @returns The direct listing data if found, null otherwise
 */
export async function getDirectListing(contractAddress: string, tokenId: string): Promise<any> {
  try {
    console.log(`Searching for direct listing for NFT ${contractAddress}/${tokenId}`);
    
    // Get the marketplace contract
    const marketplaceContract = await getContract({
      client,
      chain: metisChain,
      address: CONTRACT_ADDRESS.MARKETPLACE_V5,
    });
    
    // Get all active listings
    const allListings = await getAllValidListings({
      contract: marketplaceContract,
    });
    
    // Find the listing for this specific NFT
    const matchingListing = allListings.find(listing => 
      listing.assetContractAddress.toLowerCase() === contractAddress.toLowerCase() && 
      listing.tokenId.toString() === tokenId.toString()
    );
    
    if (matchingListing) {
      console.log(`Found direct listing for NFT ${contractAddress}/${tokenId}:`, matchingListing);
      
      // Format the listing data
      return {
        id: matchingListing.id.toString(),
        assetContractAddress: matchingListing.assetContractAddress,
        tokenId: matchingListing.tokenId.toString(),
        quantity: matchingListing.quantity.toString(),
        creatorAddress: matchingListing.creatorAddress,
        startTimeInSeconds: Number(matchingListing.startTimeInSeconds),
        endTimeInSeconds: Number(matchingListing.endTimeInSeconds),
        pricePerToken: ethers.formatEther(matchingListing.pricePerToken),
        currencyContractAddress: matchingListing.currencyContractAddress
      };
    }
    
    console.log(`No direct listing found for NFT ${contractAddress}/${tokenId}`);
    return null;
  } catch (error) {
    console.error(`Error getting direct listing for NFT ${contractAddress}/${tokenId}:`, error);
    return null;
  }
}

/**
 * Check if an auction has ended
 * @param endTimestamp The end timestamp of the auction in seconds
 * @returns boolean indicating if the auction has ended
 */
export const isAuctionEnded = (endTimestamp: number): boolean => {
  const now = Math.floor(Date.now() / 1000);
  return endTimestamp < now;
};