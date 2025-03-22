import { metisChain } from "@/app/config/chain";
import { client } from "@/app/config/client";
import { INFTAttribute, INFTMetadata } from "@/app/interfaces/interfaces";
import { MARKETPLACE_ADDRESS, NATIVE_TOKEN_ADDRESS } from "@/constants/contracts";
import { ethers } from "ethers";
import { getContract, getContractEvents, sendTransaction, waitForReceipt } from "thirdweb";
import { getContractMetadata } from "thirdweb/extensions/common";
import { allowance, approve } from "thirdweb/extensions/erc20";
import { getNFT } from "thirdweb/extensions/erc721";
import { bidInAuction as bidInAuctionThirdweb, buyFromListing, buyoutAuction as buyoutAuctionThirdweb, collectAuctionPayout, getAllValidAuctions, getAllValidListings, getWinningBid, isNewWinningBid, newBidEvent } from "thirdweb/extensions/marketplace";
import { toEther } from "thirdweb/utils";

// Fix for wallet provider access
declare global {
  interface Window {
    ethereum: any;
  }
}

// Log the marketplace contract address for debugging
console.log(`Marketplace Contract: ${MARKETPLACE_ADDRESS}`);

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
    console.log("Getting marketplace contract at", MARKETPLACE_ADDRESS);
    
    // Get the marketplace contract
    const marketplaceContract = getContract({
      client,
      chain: metisChain,
      address: MARKETPLACE_ADDRESS,
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
      address: MARKETPLACE_ADDRESS,
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
      address: MARKETPLACE_ADDRESS,
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
      address: MARKETPLACE_ADDRESS,
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
  wallet: any
): Promise<{transactionHash: string, listingId: string, success: boolean, receipt: any}> {
  try {
    // Enhanced debugging - dump more wallet details
    console.log("==================== WALLET DEBUG START ====================");
    console.log("Wallet type:", typeof wallet);
    console.log("Wallet instanceof Object:", wallet instanceof Object);
    console.log("Wallet is null or undefined:", wallet === null || wallet === undefined);
    
    if (wallet) {
      // List all properties on the wallet object
      console.log("Wallet properties:", Object.getOwnPropertyNames(wallet).sort());
      
      // Check for common properties
      console.log("Has address property:", 'address' in wallet);
      console.log("Has account property:", 'account' in wallet);
      console.log("Has getAccount method:", typeof wallet.getAccount === 'function');
      console.log("Has connect method:", typeof wallet.connect === 'function');
      
      // Try to safely log specific properties
      if ('address' in wallet) console.log("wallet.address:", wallet.address);
      if ('account' in wallet) console.log("wallet.account:", wallet.account);
      
      // If account exists, log its properties
      if (wallet.account) {
        console.log("Account properties:", Object.getOwnPropertyNames(wallet.account).sort());
        if ('address' in wallet.account) console.log("wallet.account.address:", wallet.account.address);
      }
      
      // If it's a function, log that
      if (typeof wallet === 'function') {
        console.log("Wallet is a function");
      }
      
      // Check prototype chain
      let proto = Object.getPrototypeOf(wallet);
      let protoChain = [];
      while (proto && proto !== Object.prototype) {
        protoChain.push(proto.constructor ? proto.constructor.name : 'unknown');
        proto = Object.getPrototypeOf(proto);
      }
      console.log("Prototype chain:", protoChain);
      
      // If wallet has a getAccount method, try calling it
      if (typeof wallet.getAccount === 'function') {
        try {
          const account = wallet.getAccount();
          console.log("Result of wallet.getAccount():", account);
          if (account) {
            console.log("Account properties:", Object.getOwnPropertyNames(account).sort());
            if (account.address) console.log("account.address from getAccount():", account.address);
          }
        } catch (e) {
          console.error("Error calling wallet.getAccount():", e);
        }
      }
      
      // Dump the whole wallet object as JSON
      try {
        const safeWallet = {...wallet};
        console.log("Wallet JSON:", JSON.stringify(safeWallet, (key, value) => {
          // Skip functions and circular references
          if (typeof value === 'function') return '[Function]';
          return value;
        }, 2));
      } catch (e) {
        console.error("Error stringifying wallet:", e);
      }
    }
    console.log("==================== WALLET DEBUG END ====================");
    
    // Extract the recipient address from the wallet, with multiple fallbacks
    let recipientAddress: string | undefined;
    let accountObject: any = null;
    
    // Try to get a valid account object according to ThirdWeb V5 documentation
    
    // Method 1: Check if wallet is already a valid account (has address and signMessage)
    if (wallet && wallet.address && typeof wallet.signMessage === 'function') {
      recipientAddress = wallet.address;
      accountObject = wallet;
      console.log("Wallet is already a valid account with address and signMessage");
    }
    // Method 2: Check if wallet has getAccount method
    else if (wallet && typeof wallet.getAccount === 'function') {
      try {
        const account = wallet.getAccount();
        if (account && account.address) {
          recipientAddress = account.address;
          accountObject = account;
          console.log("Using account from wallet.getAccount() with address:", recipientAddress);
        }
      } catch (e) {
        console.warn("Error getting account via getAccount():", e);
      }
    }
    // Method 3: Check if wallet has account property
    else if (wallet && wallet.account && wallet.account.address) {
      recipientAddress = wallet.account.address;
      accountObject = wallet.account;
      console.log("Using wallet.account with address:", recipientAddress);
    }
    // Method 4: Check if wallet itself has an address
    else if (wallet && wallet.address) {
      recipientAddress = wallet.address;
      
      // Create a basic account object with the required properties
      accountObject = {
        address: wallet.address,
        // Add minimal methods required for an account
        signMessage: wallet.signMessage || ((params: any) => Promise.reject("Not implemented")),
        signTransaction: wallet.signTransaction || ((params: any) => Promise.reject("Not implemented")),
        sendTransaction: wallet.sendTransaction || ((params: any) => Promise.reject("Not implemented")),
      };
      
      console.log("Created basic account with address:", recipientAddress);
    }
    
    // If we still don't have a valid account object and address
    if (!recipientAddress || !accountObject) {
      console.error("Could not determine recipient address or create a valid account object");
      console.error("Wallet type:", typeof wallet);
      console.error("Wallet properties:", Object.keys(wallet || {}));
      throw new Error("Could not determine recipient address from wallet");
    }
    
    // Get the marketplace contract
    const marketplaceContract = getContract({
      client,
      chain: metisChain,
      address: MARKETPLACE_ADDRESS,
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
    
    // IMPORTANT: For debugging, log what we're passing to sendTransaction
    console.log("Sending transaction with:")
    console.log("- Transaction:", transaction);
    console.log("- Account type:", typeof accountObject);
    console.log("- Account address:", accountObject.address);
    
    // Use the accountObject we created or extracted
    const receipt = await sendTransaction({
      transaction,
      account: accountObject,
    });
    
    console.log("Transaction sent:", receipt);
    
    // Wait for transaction confirmation
    const confirmedReceipt = await waitForReceipt({
      client,
      chain: metisChain,
      transactionHash: receipt.transactionHash,
    });
    
    console.log("Transaction confirmed:", confirmedReceipt);
    
    return {
      transactionHash: receipt.transactionHash,
      listingId,
      success: true,
      receipt: confirmedReceipt
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
 * @param wallet The user's wallet
 */
export async function placeBid(
  auctionId: string,
  bidAmount: string,
  wallet: any
): Promise<{ transactionHash?: string, success: boolean, error?: string }> {
  try {
    // Determine if bidAmount is already in wei format
    const isWeiFormat = bidAmount.length > 18 || bidAmount.startsWith('0x');
    
    // Convert to ETH format for logging and checking
    const bidAmountInEth = isWeiFormat ? ethers.formatEther(bidAmount) : bidAmount;
    
    console.log(`Placing bid for auction ${auctionId} with amount ${bidAmountInEth} METIS`);
    
    // Check if this bid would be a winning bid - use ETH format for the check
    const wouldBeWinningBid = await checkIfNewWinningBid(auctionId, bidAmountInEth);
    
    if (!wouldBeWinningBid) {
      return {
        success: false,
        error: "Bid amount is not high enough to become the winning bid"
      };
    }
    
    // Get the marketplace contract
    const marketplaceContract = await getContract({
      client,
      chain: metisChain,
      address: MARKETPLACE_ADDRESS,
    });
    
    // Extract account from wallet
    let account = wallet;
    if (wallet && typeof wallet.getAccount === 'function') {
      account = wallet.getAccount();
    }
    
    if (!account) {
      throw new Error("No connected account found");
    }
    
    // Log bid details
    console.log("Bidding with amount:", bidAmountInEth, "METIS");
    console.log("Auction ID:", auctionId);
    console.log("Contract address:", MARKETPLACE_ADDRESS);
    
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
  wallet: any
): Promise<{ transactionHash: string, success: boolean, receipt: any }> {
  try {
    console.log("Buying out auction with ID:", auctionId);
    
    // Get the marketplace contract
    const marketplaceContract = await getContract({
      client,
      chain: metisChain,
      address: MARKETPLACE_ADDRESS,
    });
    
    // First we need to get the auction details to determine the currency and price
    const allAuctions = await getAllValidAuctions({
      contract: marketplaceContract
    });
    
    // Find the auction with the matching ID
    const auction = allAuctions.find(a => a.id.toString() === auctionId);
    
    if (!auction) {
      throw new Error(`Auction ${auctionId} not found`);
    }
    
    // Get the account from wallet
    const account = wallet.getAccount();
    if (!account) {
      throw new Error("No connected account found");
    }
    
    // For non-native token buyouts, we need to check allowance and approve if needed
    if (auction.currencyContractAddress !== NATIVE_TOKEN_ADDRESS) {
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
        spender: MARKETPLACE_ADDRESS,
      });
      
      console.log(`Current allowance: ${currentAllowance.toString()}, Buyout price: ${auction.buyoutBidAmount.toString()}`);
      
      // If allowance is less than buyout price, approve
      if (currentAllowance < auction.buyoutBidAmount) {
        console.log("Approving marketplace to spend tokens...");
        
        // Create approval transaction
        const approveTx = approve({
          contract: tokenContract,
          spender: MARKETPLACE_ADDRESS,
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
 * @param tokenContract The address of the NFT contract
 * @param tokenId The ID of the NFT to list
 * @param pricePerToken The price per token in ETH
 * @param quantity The quantity to list
 * @param startTime The start time of the listing (optional)
 * @param endTime The end time of the listing (optional)
 * @returns Transaction details
 */
export const createDirectListing = async (
  tokenContract: string,
  tokenId: string,
  pricePerToken: string,
  quantity: number = 1,
  startTime?: number,
  endTime?: number
) => {
  try {
    console.log(`Creating listing for token ${tokenId} at ${pricePerToken} ETH`);
    
    // Check if browser wallet is available
    if (!window.ethereum) {
      throw new Error("No Ethereum wallet found. Please install MetaMask or another wallet.");
    }
    
    // Get the provider and signer using ethers directly
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    // Import the ABI and create contract instance with ethers
    const abi = (await import("@/app/constants/MarketplaceABI")).default;
    const contract = new ethers.Contract(
      MARKETPLACE_ADDRESS,
      abi,
      signer
    );
    
    // Set default times if not provided
    const now = Math.floor(Date.now() / 1000);
    const listingStartTime = startTime || now;
    const listingEndTime = endTime || now + 30 * 24 * 60 * 60; // Default 30 days
    
    // Convert price to wei
    const priceInWei = ethers.parseEther(pricePerToken);
    
    // Configure the listing parameters according to the ABI structure
    const listingParams = {
      assetContract: tokenContract,
      tokenId: tokenId,
      quantity: quantity,
      currency: NATIVE_TOKEN_ADDRESS, // Using native METIS token
      pricePerToken: priceInWei,
      startTimestamp: listingStartTime,
      endTimestamp: listingEndTime,
      reserved: false,
    };
    
    console.log("Creating listing with params:", listingParams);
    
    // Create the listing
    const tx = await contract.createListing(listingParams);
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
    console.error("Error creating listing:", error);
    logContractError(error, "creating direct listing");
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
    
    // Get the contract directly with the signer
    const contract = new ethers.Contract(
        MARKETPLACE_ADDRESS,
      (await import("@/app/constants/MarketplaceABI")).default,
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
    console.log("Marketplace contract address:", MARKETPLACE_ADDRESS);
    console.log("Token contract address:", tokenContract);
    
    // Check if browser wallet is available
    if (!window.ethereum) {
      throw new Error("No Ethereum wallet found. Please install MetaMask or another wallet.");
    }
    
    // Get the provider and signer
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    // Get the contract directly with the signer
    const contract = new ethers.Contract(
      MARKETPLACE_ADDRESS,
      (await import("@/app/constants/MarketplaceABI")).default,
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

/**
 * Buy NFT from a direct listing
 * @param listingId The ID of the listing to buy from
 * @param wallet The wallet to buy with
 * @returns Transaction result object
 */
export async function buyFromDirectListing(
  listingId: string,
  wallet: any
): Promise<{ success: boolean; transactionHash?: string; error?: string }> {
  try {
    console.log(`Buying NFT from listing ${listingId}`);
    
    // Get the marketplace contract
    const marketplaceContract = await getContract({
      client,
      chain: metisChain,
      address: MARKETPLACE_ADDRESS,
    });
    
    // Extract wallet address for recipient
    let recipientAddress: string | undefined;
    
    // Try to extract address from wallet
    if (wallet && typeof wallet.getAccount === 'function') {
      const account = wallet.getAccount();
      if (account && account.address) {
        recipientAddress = account.address;
      }
    } else if (wallet && wallet.account && wallet.account.address) {
      recipientAddress = wallet.account.address;
    } else if (wallet && wallet.address) {
      recipientAddress = wallet.address;
    }
    
    if (!recipientAddress) {
      throw new Error("Could not determine recipient address from wallet");
    }
    
    // Create the transaction with recipient parameter
    const transaction = buyFromListing({
      contract: marketplaceContract,
      listingId: BigInt(listingId),
      quantity: 1n,
      recipient: recipientAddress as `0x${string}` // Add recipient address
    });
    
    // Send the transaction
    const tx = await sendTransaction({
      transaction,
      account: wallet,
    });
    
    console.log("Buy transaction sent:", tx.transactionHash);
    
    // Wait for the transaction to be confirmed
    const receipt = await waitForReceipt({
      client,
      chain: metisChain,
      transactionHash: tx.transactionHash,
    });
    
    console.log("Buy transaction confirmed:", receipt);
    
    return {
      success: true,
      transactionHash: tx.transactionHash
    };
  } catch (error: any) {
    console.error("Error buying from listing:", error);
    return {
      success: false,
      error: error.message || "Failed to buy from listing",
      transactionHash: error.transactionHash
    };
  }
}

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
      address: MARKETPLACE_ADDRESS,
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
    console.error("Error fetching direct listing:", error);
    return null;
  }
}

/**
 * Check if a bid amount would be the new winning bid for an auction
 * 
 * @param auctionId The ID of the auction
 * @param bidAmount The bid amount to check in ETH
 * @returns Boolean indicating if the bid would be the new winning bid
 */
export async function checkIfNewWinningBid(
  auctionId: string, 
  bidAmount: string
): Promise<boolean> {
  try {
    // Get the marketplace contract
    const marketplaceContract = await getContract({
      client,
      chain: metisChain,
      address: MARKETPLACE_ADDRESS,
    });
    
    // Convert bid amount to wei as BigInt
    const bidAmountWei = ethers.parseEther(bidAmount);
    
    // Log the check details
    console.log("Checking if winning bid:", {
      auctionId,
      bidAmount,
      bidAmountWei: bidAmountWei.toString()
    });
    
    // Check if this would be a winning bid
    const result = await isNewWinningBid({
      contract: marketplaceContract,
      auctionId: BigInt(auctionId),
      bidAmount: bidAmountWei // Must be BigInt for isNewWinningBid
    });
    
    console.log("Bid would be winning bid:", result);
    
    return result;
  } catch (error) {
    console.error("Error checking if new winning bid:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message, error.stack);
    }
    // Return false in case of error to be safe
    return false;
  }
}

/**
 * Get the current winning bid for an auction
 * 
 * @param auctionId The ID of the auction
 * @returns The winning bid details or null if no bids
 */
export async function getAuctionWinningBid(auctionId: string): Promise<{
  bidder: string;
  bidAmount: string;
  timestamp: number;
} | null> {
  try {
    // Get the marketplace contract
    const marketplaceContract = await getContract({
      client,
      chain: metisChain,
      address: MARKETPLACE_ADDRESS,
    });
    
    // Get the winning bid
    const winningBid = await getWinningBid({
      contract: marketplaceContract,
      auctionId: BigInt(auctionId)
    });
    
    if (!winningBid || winningBid.bidderAddress === ethers.ZeroAddress) {
      return null;
    }
    
    // Convert from wei to METIS
    const bidAmountInMetis = toEther(winningBid.bidAmountWei);
    
    return {
      bidder: winningBid.bidderAddress,
      bidAmount: bidAmountInMetis,
      timestamp: Date.now() // ThirdWeb doesn't return timestamp, so use current time
    };
  } catch (error) {
    console.error("Error getting winning bid:", error);
    return null;
  }
}

/**
 * Collect NFT from a won auction (for buyers)
 * 
 * @param auctionId The ID of the auction
 * @param wallet The wallet to use for the transaction
 * @returns Transaction details
 */
export async function collectAuctionNFT(
  auctionId: string,
  wallet: any
): Promise<{ transactionHash?: string, success: boolean, error?: string }> {
  try {
    console.log(`Claiming NFT for auction ${auctionId}`);
    
    // Get the marketplace contract
    const marketplaceContract = await getContract({
      client,
      chain: metisChain,
      address: MARKETPLACE_ADDRESS,
    });
    
    // Extract account from wallet
    let account = wallet;
    if (wallet && typeof wallet.getAccount === 'function') {
      account = wallet.getAccount();
    }
    
    if (!account) {
      throw new Error("No connected account found");
    }
    
    // For ThirdWeb SDK, we need to create a contract with ethers directly to access functions
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const abi = (await import("@/app/constants/MarketplaceABI")).default;
    const marketplaceEthersContract = new ethers.Contract(
      MARKETPLACE_ADDRESS,
      abi,
      signer
    );
    
    // Check if the collect tokens function exists
    if (typeof marketplaceEthersContract.collectAuctionTokens !== 'function') {
      throw new Error("collectAuctionTokens function not found on marketplace contract");
    }
    
    // Create the transaction to collect the tokens
    const tx = await marketplaceEthersContract.collectAuctionTokens(BigInt(auctionId));
    
    console.log("NFT claim transaction sent:", tx.hash);
    
    // Wait for transaction to be mined
    const receipt = await tx.wait();
    console.log("NFT claim transaction confirmed:", receipt);
    
    return {
      transactionHash: tx.hash,
      success: true
    };
  } catch (error: any) {
    console.error("Error claiming NFT:", error);
    return {
      success: false,
      error: error.message || "Failed to claim NFT",
      transactionHash: error.transactionHash
    };
  }
}

/**
 * Collect payout for an auction (for sellers)
 * 
 * @param auctionId The ID of the auction
 * @param wallet The wallet to use for the transaction
 * @returns Transaction details
 */
export async function collectAuctionPayoutForSeller(
  auctionId: string,
  wallet: any
): Promise<{ transactionHash?: string, success: boolean, error?: string }> {
  try {
    console.log(`Collecting payout for auction ${auctionId}`);
    
    // Get the marketplace contract
    const marketplaceContract = await getContract({
      client,
      chain: metisChain,
      address: MARKETPLACE_ADDRESS,
    });
    
    // Extract account from wallet
    let account = wallet;
    if (wallet && typeof wallet.getAccount === 'function') {
      account = wallet.getAccount();
    }
    
    if (!account) {
      throw new Error("No connected account found");
    }
    
    // Create the transaction to collect the payout
    const transaction = collectAuctionPayout({
      contract: marketplaceContract,
      auctionId: BigInt(auctionId)
    });
    
    // Send the transaction
    const result = await sendTransaction({
      transaction,
      account
    });
    
    console.log("Payout collection transaction sent:", result.transactionHash);
    
    // Wait for the transaction to be confirmed
    const receipt = await waitForReceipt({
      client,
      chain: metisChain,
      transactionHash: result.transactionHash,
    });
    
    console.log("Payout collection transaction confirmed:", receipt);
    
    return {
      transactionHash: result.transactionHash,
      success: true
    };
  } catch (error: any) {
    console.error("Error collecting payout:", error);
    return {
      success: false,
      error: error.message || "Failed to collect payout",
      transactionHash: error.transactionHash
    };
  }
}

/**
 * Check if an auction has ended
 * 
 * @param endTimestamp The end timestamp of the auction
 * @returns Boolean indicating if the auction has ended
 */
export function isAuctionEnded(endTimestamp: number): boolean {
  const now = Math.floor(Date.now() / 1000);
  return now >= endTimestamp;
}

/**
 * Watch for auction closed events
 * 
 * @param callback Function to call when an auction is closed
 * @returns Function to stop watching
 */
export function watchForAuctionClosedEvents(
  callback: (auctionId: string) => void,
  retryInterval: number = 60000 // Check every minute by default
): { stop: () => void } {
  let isRunning = true;
  const checkedAuctions = new Set<string>();
  
  // Function to check for closed auctions
  const checkForClosedAuctions = async () => {
    try {
      // Get the marketplace contract
      const marketplaceContract = await getContract({
        client,
        chain: metisChain,
        address: MARKETPLACE_ADDRESS,
      });
      
      // In a real implementation, we would fetch all auctions and check which ones have ended
      // This is a simplified approach that just checks a few example auctions
      
      // Example auction IDs to check (in a real app, you'd have a way to get all active auctions)
      const exampleAuctionIds = ["0", "1", "2"];
      
      for (const auctionId of exampleAuctionIds) {
        // Skip if we already processed this auction
        if (checkedAuctions.has(auctionId)) continue;
        
        try {
          // Get the auction by ID
          const auction = await getAuction(auctionId);
          
          // Check if it exists and if it's ended
          if (auction && auction.endTimestamp && isAuctionEnded(auction.endTimestamp)) {
            // Add to processed set
            checkedAuctions.add(auctionId);
            
            // Call the callback
            callback(auctionId);
          }
        } catch (error) {
          console.error(`Error checking auction ${auctionId}:`, error);
        }
      }
    } catch (error) {
      console.error("Error checking for closed auctions:", error);
    }
    
    // Schedule next check if still running
    if (isRunning) {
      setTimeout(checkForClosedAuctions, retryInterval);
    }
  };
  
  // Start checking
  checkForClosedAuctions();
  
  // Return a function to stop watching
  return {
    stop: () => {
      isRunning = false;
    }
  };
} 
