import { getContract, sendTransaction } from "thirdweb";
import { client } from "../config/client";
import { metisChain } from "../config/chain";
import { toEther, toWei } from "thirdweb/utils";
import { IDirectListing, INFTMetadata, IListingWithNFT, INFTAttribute } from "../interfaces/interfaces";
import { getAllValidListings, getAllValidAuctions, bidInAuction as bidInAuctionThirdweb, buyoutAuction as buyoutAuctionThirdweb } from "thirdweb/extensions/marketplace";
import { getNFT } from "thirdweb/extensions/erc721";
import { buyFromListing } from "thirdweb/extensions/marketplace";
import { getContractMetadata } from "thirdweb/extensions/common";
import { waitForReceipt } from "thirdweb";
import { balanceOf, allowance, approve } from "thirdweb/extensions/erc20";
import { getContractEvents } from "thirdweb";
import { getWinningBid, newBidEvent } from "thirdweb/extensions/marketplace";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT || '';
console.log(`Marketplace Contract: ${CONTRACT_ADDRESS}`);

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

export interface IAuctionWithNFT extends IAuction {
  metadata?: INFTMetadata;
  collectionName?: string;
  sellerAddress?: string; // Alias for auctionCreator
}

/**
 * Get all active listings from the marketplace
 */
export const getAllListings = async (): Promise<IListingWithNFT[]> => {
  try {
    console.log("Getting marketplace contract at", CONTRACT_ADDRESS);
    
    // Get the marketplace contract
    const marketplaceContract = getContract({
      client,
      chain: metisChain,
      address: CONTRACT_ADDRESS as `0x${string}`,
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
      address: CONTRACT_ADDRESS as `0x${string}`,
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
 */
export const getAuction = async (auctionId: string): Promise<IListingWithNFT | null> => {
  try {
    // Get the marketplace contract
    const marketplaceContract = getContract({
      client,
      chain: metisChain,
      address: CONTRACT_ADDRESS as `0x${string}`,
    });
    
    // Get all valid auctions to find the one we want
    const allAuctions = await getAllValidAuctions({
      contract: marketplaceContract
    });
    
    // Find the auction with the matching ID
    const auction = allAuctions.find(a => a.id.toString() === auctionId);
    
    if (!auction) {
      console.error(`Auction ${auctionId} not found`);
      return null;
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
          trait_type: String(attr.trait_type || ''),
          value: String(attr.value || '')
        })) 
      : [];
    
    // Format NFT metadata
    const metadata: INFTMetadata = {
      name: nft.metadata.name || `NFT #${auction.tokenId.toString()}`,
      description: nft.metadata.description || '',
      image: formatIPFSUrl(nft.metadata.image || ''),
      attributes
    };
    
    // Get collection name
    let collectionName = "Unknown Collection";
    try {
      const contractMetadata = await getContractMetadata({
        contract: nftContract
      });
      collectionName = contractMetadata.name;
      console.log(`Collection name: ${collectionName}`);
    } catch (err) {
      console.warn("Could not fetch collection metadata", err);
    }
    
    // Get current highest bid
    let currentBid = auction.minimumBidAmount;
    let highestBidder = "";
    
    try {
      const winningBid = await getWinningBid({
        contract: marketplaceContract,
        auctionId: auction.id
      });
      
      if (winningBid) {
        currentBid = winningBid.bidAmountWei;
        highestBidder = winningBid.bidderAddress;
        console.log(`Auction ${auctionId} has highest bid of ${toEther(currentBid)} from ${highestBidder}`);
      }
    } catch (error) {
      console.warn(`Could not fetch winning bid for auction ${auctionId}:`, error);
    }
    
    // Format price - use the highest bid if it exists, otherwise use minimum bid
    let formattedPrice = "0";
    try {
      formattedPrice = toEther(currentBid);
      console.log(`Formatted price for token ${auction.tokenId}: ${formattedPrice}`);
    } catch (priceError) {
      console.error(`Error formatting price for token ${auction.tokenId}:`, priceError);
    }
    
    // Convert auction to listing format for compatibility with existing UI
    const enhancedListing = {
      listingId: auction.id.toString(),
      tokenId: auction.tokenId.toString(),
      quantity: auction.quantity.toString(),
      pricePerToken: formattedPrice, // Use current highest bid as display price
      startTimestamp: Number(auction.startTimeInSeconds || 0),
      endTimestamp: Number(auction.endTimeInSeconds || 0),
      listingCreator: auction.creatorAddress,
      assetContract: auction.assetContractAddress,
      currency: auction.currencyContractAddress,
      tokenType: 0, // Assuming ERC721
      status: 1, // Assuming active
      reserved: false,
      metadata,
      collectionName,
      sellerAddress: auction.creatorAddress,
      // Add auction-specific fields
      isAuction: true,
      minimumBidAmount: toEther(auction.minimumBidAmount),
      buyoutBidAmount: auction.buyoutBidAmount ? toEther(auction.buyoutBidAmount) : undefined,
      highestBid: highestBidder ? {
        bidder: highestBidder,
        amount: formattedPrice
      } : undefined,
      currentBid: formattedPrice // Add the current bid amount
    } as IListingWithNFT & { isAuction: boolean };
    
    console.log(`Enhanced auction created for ${auctionId}`);
    
    return enhancedListing;
  } catch (error) {
    console.error(`Error getting auction ${auctionId}:`, error);
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
      address: CONTRACT_ADDRESS as `0x${string}`,
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
      address: CONTRACT_ADDRESS as `0x${string}`,
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
 */
export async function bidInAuction(
  auctionId: string,
  bidAmount: string,
  wallet: any
): Promise<{ transactionHash: string, success: boolean, receipt: any }> {
  try {
    console.log("Placing bid on auction with parameters:", {
      auctionId,
      bidAmount
    });
    
    // Get the marketplace contract
    const marketplaceContract = await getContract({
      client,
      chain: metisChain,
      address: CONTRACT_ADDRESS as `0x${string}`,
    });
    
    // Create the bid transaction
    const tx = bidInAuctionThirdweb({
      contract: marketplaceContract,
      auctionId: BigInt(auctionId),
      bidAmount: bidAmount
    });
    
    // Get the account from wallet
    const account = wallet.getAccount();
    if (!account) {
      throw new Error("No connected account found");
    }
    
    // Send the transaction
    const result = await sendTransaction({
      transaction: tx,
      account
    });
    
    console.log("Bid transaction sent:", result.transactionHash);
    
    // Wait for transaction confirmation
    const confirmedReceipt = await waitForReceipt({
      client,
      chain: metisChain,
      transactionHash: result.transactionHash,
    });
    
    console.log("Bid transaction confirmed:", confirmedReceipt);
    
    return {
      transactionHash: result.transactionHash,
      success: true, 
      receipt: confirmedReceipt
    };
  } catch (error: any) {
    console.error("Error placing bid:", error);
    throw error;
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
      address: CONTRACT_ADDRESS as `0x${string}`,
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
        spender: CONTRACT_ADDRESS as `0x${string}`,
      });
      
      console.log(`Current allowance: ${currentAllowance.toString()}, Buyout price: ${auction.buyoutBidAmount.toString()}`);
      
      // If allowance is less than buyout price, approve
      if (currentAllowance < auction.buyoutBidAmount) {
        console.log("Approving marketplace to spend tokens...");
        
        // Create approval transaction
        const approveTx = approve({
          contract: tokenContract,
          spender: CONTRACT_ADDRESS as `0x${string}`,
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

