import { ethers } from "ethers";
import { 
  client, 
  getProvider, 
  getMarketplaceContract, 
  getWMetisContract, 
  getERC721Contract, 
  getERC1155Contract,
  metisChain 
} from "@/app/client";
import { CONTRACT_ADDRESS, WMETIS_CONTRACT_ADDRESS } from "@/app/constants/contracts";
import { IListingWithNFT, INFTMetadata } from "@/app/interfaces/interfaces";
import { getContract } from "thirdweb";
import { 
  getListing as getThirdwebListing, 
  getAllListings as getThirdwebAllListings,
  buyFromListing as thirdwebBuyFromListing
} from "thirdweb/extensions/marketplace";

// Using any type temporarily to bypass type issues during migration
type ContractWithCall = any;

// Add the IPFS URL formatting helper at the top of the file
// Helper function to handle IPFS URLs
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

/**
 * Function to get all active listings from the marketplace
 */
export const getAllListings = async (): Promise<IListingWithNFT[]> => {
  try {
    // Get the contract with ThirdWeb v5
    const contract = await getContract({
      client,
      chain: metisChain,
      address: CONTRACT_ADDRESS as `0x${string}`,
    }) as ContractWithCall;
    
    console.log(`Getting marketplace contract at ${CONTRACT_ADDRESS}`);
    
    try {
      console.log(`Fetching all listings using ThirdWeb v5 marketplace extension...`);
      const listings = await getThirdwebAllListings({ contract });
      console.log(`Found ${listings.length} listings using ThirdWeb v5`);
      
      // Convert BigInt values to strings to avoid serialization issues
      const processedListings = listings.map(listing => ({
        id: listing.id.toString(),
        creatorAddress: listing.creatorAddress,
        assetContractAddress: listing.assetContractAddress,
        tokenId: listing.tokenId.toString(),
        quantity: listing.quantity.toString(),
        currencyContractAddress: listing.currencyContractAddress,
        pricePerToken: listing.pricePerToken.toString(),
        startTimeInSeconds: listing.startTimeInSeconds?.toString() || '0',
        endTimeInSeconds: listing.endTimeInSeconds?.toString() || '0',
        // Include any other properties needed
      }));
      
      console.log(`Processed ${processedListings.length} listings for serialization`);
      
      // Now fetch metadata for each listing
      const enhancedListings = await Promise.all(
        processedListings.map(async (listing) => {
          try {
            const enhancedListing = await getListing(listing.id.toString());
            return enhancedListing;
          } catch (error) {
            console.error(`Error enhancing listing ${listing.id}:`, error);
            return null;
          }
        })
      );
      
      // Filter out null values and return
      const validListings = enhancedListings.filter(listing => listing !== null) as IListingWithNFT[];
      console.log(`Found ${validListings.length} valid listings`);
      return validListings;
    } catch (v5Error) {
      console.warn("ThirdWeb v5 approach failed, falling back to legacy approach:", v5Error);
      
      // Legacy approach (v4)
      const marketplaceContract = getMarketplaceContract();
      const totalListings = await marketplaceContract.totalListings();
      console.log(`Total listings found: ${totalListings}`);
      
      const listingIds = [];
      for (let i = 0; i < totalListings; i++) {
        listingIds.push(i);
      }
      
      // Filter for valid/active listings only
      const validListings = [];
      for (const id of listingIds) {
        try {
          const listing = await marketplaceContract.getListing(id);
          // Check if listing is still active (status 1) and has valid data
          if (listing && 
              listing.status === 1 && 
              listing.tokenId && 
              listing.assetContract && 
              ethers.BigNumber.from(listing.pricePerToken).gt(0)) {
            validListings.push({...listing, id});
          }
        } catch (err) {
          console.log(`Listing ${id} not available or invalid`);
        }
      }
      
      console.log("Found", validListings.length, "valid listings");
      
      // Transform the listings and fetch additional metadata
      const enhancedListings = await Promise.all(
        validListings.map(async (listing: any) => {
          try {
            // Extract listing data
            const assetContractAddress = listing.assetContract;
            const id = listing.id;
            const tokenId = listing.tokenId;
            const quantity = listing.quantity;
            const currency = listing.currency;
            const pricePerToken = listing.pricePerToken;
            const startTime = listing.startTimestamp;
            const endTime = listing.endTimestamp;
            const creator = listing.listingCreator || listing.seller;
            
            console.log(`Processing listing ${id} for token ${tokenId} from contract ${assetContractAddress}`);
                  
            // Get NFT metadata using ERC721 contract
            const nftContract = getERC721Contract(assetContractAddress);
            let metadata: INFTMetadata;
            
            try {
              // Try to get tokenURI
              const tokenURI = await nftContract.tokenURI(tokenId);
              console.log(`Token URI for ${tokenId}: ${tokenURI}`);
              
              // Fetch metadata from tokenURI
              let jsonMetadata;
              try {
                // Handle ipfs:// links
                let formattedURI = tokenURI;
                if (tokenURI.startsWith('ipfs://')) {
                  formattedURI = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/');
                }
                console.log(`Fetching metadata from: ${formattedURI}`);
                const response = await fetch(formattedURI);
                jsonMetadata = await response.json();
              } catch (err) {
                console.error("Error fetching metadata from URI:", err);
                jsonMetadata = { name: `NFT #${tokenId}`, description: "", image: "" };
              }
              
              // Format image URL if needed
              let imageUrl = jsonMetadata.image || "";
              if (imageUrl.startsWith('ipfs://')) {
                imageUrl = imageUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
              }
              
              // Create standardized metadata
              metadata = {
                image: imageUrl,
                name: jsonMetadata.name || `NFT #${tokenId}`,
                description: jsonMetadata.description || "",
                attributes: jsonMetadata.attributes || []
              };
              
              console.log(`Metadata for token ${tokenId}:`, {
                name: metadata.name,
                imageUrl: metadata.image ? 'Found' : 'Missing'
              });
            } catch (err) {
              console.error(`Error fetching NFT metadata for token ${tokenId}:`, err);
              metadata = {
                image: "",
                name: `NFT #${tokenId}`,
                description: "Metadata unavailable",
                attributes: []
              };
            }
            
            // Get collection name
            let collectionName = "Unknown Collection";
            try {
              collectionName = await nftContract.name();
              console.log(`Collection name: ${collectionName}`);
            } catch (nameError) {
              console.warn("Could not fetch collection name", nameError);
            }
            
            // Format price with proper error handling
            let formattedPrice = "0";
            try {
              formattedPrice = ethers.utils.formatEther(pricePerToken.toString());
              
              // Validate the formatted price is a valid number
              if (isNaN(parseFloat(formattedPrice))) {
                console.warn(`Invalid formatted price for token ${tokenId}: ${formattedPrice}`);
                formattedPrice = "0";
              }
            } catch (priceError) {
              console.error("Error formatting price:", priceError);
              formattedPrice = "0";
            }
            
            return {
              listingId: id.toString(),
              tokenId: tokenId.toString(),
              quantity: quantity.toString(),
              pricePerToken: formattedPrice,
              startTimestamp: Number(startTime),
              endTimestamp: Number(endTime),
              listingCreator: creator,
              assetContract: assetContractAddress,
              currency: currency,
              tokenType: 0, // Assuming ERC721
              status: 1, // Assuming active
              reserved: false,
              metadata,
              collectionName,
              sellerAddress: creator
            } as IListingWithNFT;
          } catch (err) {
            console.error(`Error enhancing listing:`, err);
            return null;
          }
        })
      );
      
      // Filter out any null values from errors
      const finalListings = enhancedListings.filter(listing => listing !== null) as IListingWithNFT[];
      console.log(`Final processed listings: ${finalListings.length}`);
      return finalListings;
    }
  } catch (error) {
    console.error("Error fetching listings:", error);
    return [];
  }
};

/**
 * Function to get a single listing
 */
export const getListing = async (listingId: string): Promise<IListingWithNFT | null> => {
  try {
    console.log(`Getting listing ${listingId}...`);
    
    // Try using ThirdWeb v5 marketplace extensions first
    try {
      // Get the contract with ThirdWeb v5
      const contract = await getContract({
        client,
        chain: metisChain,
        address: CONTRACT_ADDRESS as `0x${string}`,
      }) as ContractWithCall;
      
      console.log(`Fetching listing ${listingId} using ThirdWeb v5 marketplace extension...`);
      const listing = await getThirdwebListing({ 
        contract, 
        listingId: BigInt(listingId) 
      });
      
      if (!listing) {
        console.warn(`No listing found with ID ${listingId}`);
        return null;
      }
      
      console.log(`Found listing for token ID ${listing.tokenId}:`, listing);
      
      // Fetch metadata
      let metadata: INFTMetadata;
      let collectionName = "Unknown Collection";
      let tokenURI = "";
      
      try {
        // Get token URI and collection name
        console.log(`Fetching tokenURI for token ${listing.tokenId}`);
        
        // Use ethers.js directly to call the contract
        try {
          console.log(`Fetching tokenURI for token ${listing.tokenId} using direct ethers call`);
          
          // Create a minimal ABI for the ERC721 contract
          const minimalABI = [
            "function tokenURI(uint256 tokenId) view returns (string)",
            "function name() view returns (string)"
          ];
          
          // Get provider
          const provider = getProvider();
          
          // Create contract instance with ethers
          const nftContractEthers = new ethers.Contract(
            listing.assetContractAddress,
            minimalABI,
            provider
          );
          
          // Get tokenURI and name
          try {
            tokenURI = await nftContractEthers.tokenURI(listing.tokenId);
            console.log(`Got tokenURI using direct ethers call: ${tokenURI}`);
            
            try {
              collectionName = await nftContractEthers.name();
              console.log(`Got collection name using direct ethers call: ${collectionName}`);
            } catch (nameErr) {
              console.log(`Failed to get collection name: ${nameErr}`);
              collectionName = "Unknown Collection";
            }
          } catch (uriErr) {
            console.log(`Failed to get tokenURI using direct ethers call: ${uriErr}`);
            
            // Try ERC1155 URI format as fallback
            try {
              const erc1155ABI = ["function uri(uint256 tokenId) view returns (string)"];
              const erc1155Contract = new ethers.Contract(
                listing.assetContractAddress,
                erc1155ABI,
                provider
              );
              
              tokenURI = await erc1155Contract.uri(listing.tokenId);
              console.log(`Got tokenURI using ERC1155 uri method: ${tokenURI}`);
              
              // For ERC1155, we might need to replace {id} with the tokenId in hex
              if (tokenURI.includes("{id}")) {
                const hexId = listing.tokenId.toString(16).padStart(64, '0');
                tokenURI = tokenURI.replace("{id}", hexId);
                console.log(`Replaced {id} placeholder: ${tokenURI}`);
              }
            } catch (uri1155Err) {
              console.log(`Failed to get URI using ERC1155 method: ${uri1155Err}`);
              throw new Error(`Could not fetch tokenURI using any method`);
            }
          }
        } catch (err) {
          console.error(`Error fetching token data using direct ethers: ${err}`);
          throw err;
        }
        
        console.log(`Token URI for ${listing.tokenId}: ${tokenURI}`);
        console.log(`Collection name: ${collectionName}`);
        
        if (!tokenURI) {
          throw new Error(`No tokenURI found for token ${listing.tokenId}`);
        }
        
        // Handle IPFS URI
        let formattedURI = formatIPFSUrl(tokenURI);
        console.log(`Formatted URI: ${formattedURI}`);
        
        // Fetch metadata
        console.log(`Fetching metadata from: ${formattedURI}`);
        const response = await fetch(formattedURI);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch metadata: ${response.status} ${response.statusText}`);
        }
        
        const jsonMetadata = await response.json();
        console.log(`Metadata for token ${listing.tokenId}:`, { name: jsonMetadata.name, imageUrl: jsonMetadata.image ? 'Found' : 'Missing' });
        
        // Format image URL if needed
        let imageUrl = formatIPFSUrl(jsonMetadata.image || "");
        console.log(`Formatted image URL: ${imageUrl}`);
        
        metadata = {
          image: imageUrl,
          name: jsonMetadata.name || `NFT #${listing.tokenId}`,
          description: jsonMetadata.description || "",
          attributes: jsonMetadata.attributes || []
        };
        
        console.log(`Final metadata for token ${listing.tokenId}:`, metadata);
      } catch (err) {
        console.error(`Error fetching NFT metadata for token ${listing.tokenId}:`, err);
        metadata = {
          image: "",
          name: `NFT #${listing.tokenId}`,
          description: "Metadata unavailable",
          attributes: []
        };
      }
      
      // Format price
      let formattedPrice = "0";
      try {
        // ThirdWeb v5 returns price in wei as BigInt
        formattedPrice = ethers.utils.formatEther(listing.pricePerToken.toString());
        console.log(`Formatted price for token ${listing.tokenId}: ${formattedPrice}`);
        
        // Validate the formatted price
        if (isNaN(parseFloat(formattedPrice))) {
          console.warn(`Invalid formatted price for token ${listing.tokenId}: ${formattedPrice}`);
          formattedPrice = "0";
        }
      } catch (priceError) {
        console.error(`Error formatting price for token ${listing.tokenId}:`, priceError);
        formattedPrice = "0";
      }
      
      // Return listing with metadata
      const enhancedListing = {
        listingId: listing.id.toString(),
        tokenId: listing.tokenId.toString(),
        quantity: listing.quantity.toString(),
        pricePerToken: formattedPrice,
        startTimestamp: Number(listing.startTimeInSeconds || 0),
        endTimestamp: Number(listing.endTimeInSeconds || 0),
        listingCreator: listing.creatorAddress,
        assetContract: listing.assetContractAddress,
        currency: listing.currencyContractAddress,
        tokenType: 0, // Assuming ERC721
        status: 1, // Assuming active
        reserved: false,
        metadata,
        collectionName,
        sellerAddress: listing.creatorAddress
      } as IListingWithNFT;
      
      console.log(`Enhanced listing created for ${listingId}:`, {
        listingId: enhancedListing.listingId,
        tokenId: enhancedListing.tokenId,
        hasMetadata: !!enhancedListing.metadata,
        imageUrl: enhancedListing.metadata?.image
      });
      
      return enhancedListing;
    } catch (v5Error) {
      console.warn("ThirdWeb v5 approach failed, falling back to legacy approach:", v5Error);
      
      // Legacy approach (v4)
      const marketplaceContract = getMarketplaceContract();
      const listing = await marketplaceContract.getListing(listingId);
      
      // Extract listing data
      const assetContractAddress = listing.assetContract;
      const tokenId = listing.tokenId;
      const quantity = listing.quantity;
      const currency = listing.currency;
      const pricePerToken = listing.pricePerToken;
      const startTime = listing.startTimestamp;
      const endTime = listing.endTimestamp;
      const creator = listing.listingCreator || listing.seller;
      
      // Get NFT metadata using ERC721 contract
      const nftContract = getERC721Contract(assetContractAddress);
      let metadata: INFTMetadata;
      
      try {
        // Try to get tokenURI
        const tokenURI = await nftContract.tokenURI(tokenId);
        
        // Fetch metadata from tokenURI
        let jsonMetadata;
        try {
          // Handle ipfs:// links
          const formattedURI = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/');
          const response = await fetch(formattedURI);
          jsonMetadata = await response.json();
        } catch (err) {
          console.error("Error fetching metadata from URI:", err);
          jsonMetadata = { name: `NFT #${tokenId}`, description: "", image: "" };
        }
        
        // Format image URL if needed
        let imageUrl = jsonMetadata.image || "";
        if (imageUrl.startsWith('ipfs://')) {
          imageUrl = imageUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
        }
        
        // Create standardized metadata
        metadata = {
          image: imageUrl,
          name: jsonMetadata.name || `NFT #${tokenId}`,
          description: jsonMetadata.description || "",
          attributes: jsonMetadata.attributes || []
        };
      } catch (err) {
        console.error("Error fetching NFT metadata:", err);
        metadata = {
          image: "",
          name: `NFT #${tokenId}`,
          description: "Metadata unavailable",
          attributes: []
        };
      }
      
      // Get collection name
      let collectionName = "Unknown Collection";
      try {
        collectionName = await nftContract.name();
      } catch (nameError) {
        console.warn("Could not fetch collection name", nameError);
      }
      
      // Format price with proper error handling
      let formattedPrice = "0";
      try {
        const priceString = pricePerToken.toString();
        formattedPrice = ethers.utils.formatEther(priceString);
        
        // Validate the formatted price is a valid number
        if (isNaN(parseFloat(formattedPrice))) {
          console.warn(`Invalid formatted price for token ${tokenId}: ${formattedPrice}`);
          formattedPrice = "0";
        }
      } catch (priceError) {
        console.error("Error formatting price:", priceError);
        formattedPrice = "0";
      }
      
      return {
        listingId: listingId.toString(),
        tokenId: tokenId.toString(),
        quantity: quantity.toString(),
        pricePerToken: formattedPrice,
        startTimestamp: Number(startTime),
        endTimestamp: Number(endTime),
        listingCreator: creator,
        assetContract: assetContractAddress,
        currency: currency,
        tokenType: 0, // Assuming ERC721
        status: 1, // Assuming active
        reserved: false,
        metadata,
        collectionName,
        sellerAddress: creator
      };
    }
  } catch (error) {
    console.error(`Error fetching listing ${listingId}:`, error);
    return null;
  }
};

/**
 * Buy an NFT from a listing using native METIS
 */
export async function buyWithMetis(listingId: string, wallet: any) {
  console.log(`Attempting to buy listing ${listingId} with METIS`);
  
  // Ensure wallet is provided
  if (!wallet) {
    throw new Error("Wallet not connected");
  }

  console.log("Wallet type:", wallet.walletType);
  console.log("Account:", wallet.account);
  
  try {
    // Get the listing
    const listing = await getListing(listingId);
    if (!listing) {
      throw new Error(`Listing ${listingId} not found or no longer available`);
    }
    
    console.log("Found listing:", {
      listingId,
      tokenId: listing.tokenId,
      pricePerToken: listing.pricePerToken
    });
    
    // Convert price to wei
    const priceInWei = ethers.utils.parseEther(listing.pricePerToken);
    console.log(`Price in wei: ${priceInWei.toString()}`);
    
    try {
      // Get the contract with ThirdWeb v5
      const contract = await getContract({
        client,
        chain: metisChain,
        address: CONTRACT_ADDRESS as `0x${string}`,
      }) as ContractWithCall;
      
      console.log(`Buying listing ${listingId} using ThirdWeb v5 marketplace extension...`);
      
      // Using the buyFromListing extension - cast to any temporarily to bypass type issues
      const result = await thirdwebBuyFromListing({
        contract,
        listingId: BigInt(listingId),
        quantity: BigInt(1),
        // Use the parameters that the marketplace extension accepts
        wallet
      } as any);
      
      // Access result safely with optional chaining and type assertions
      const txHash = (result as any)?.receipt?.transactionHash || 'Unknown transaction hash';
      console.log(`Transaction sent: ${txHash}`);
      
      return {
        transactionHash: txHash,
        listingId,
        success: true
      };
    } catch (v5Error: any) {
      console.warn("ThirdWeb v5 approach failed:", v5Error);
      const errorMessage = v5Error?.message || 'Unknown error';
      throw new Error(`Failed to buy listing with ThirdWeb v5: ${errorMessage}`);
    }
  } catch (error: any) {
    console.error("Error buying with METIS:", error);
    
    if (error.code === 4001 || error.code === "ACTION_REJECTED") {
      throw new Error("Transaction was rejected by the user");
    }
    
    if (error.message && error.message.includes("insufficient funds")) {
      throw new Error("You don't have enough METIS to complete this purchase");
    }
    
    throw new Error("Failed to buy listing: " + error.message);
  }
}

/**
 * Get the WMETIS balance of an address
 */
export const getWMetisBalance = async (address: string): Promise<string> => {
  console.log(`Fetching WMETIS balance for ${address}...`);
  
  try {
    // Try ThirdWeb v5 approach first
    try {
      const wmetisContract = await getContract({
        client,
        chain: metisChain,
        address: WMETIS_CONTRACT_ADDRESS as `0x${string}`,
      }) as ContractWithCall;
      
      if (wmetisContract.read && typeof wmetisContract.read.balanceOf === 'function') {
        const balance = await wmetisContract.read.balanceOf([address as `0x${string}`]);
        // Use ethers.utils.formatEther for v5 compatibility
        const formattedBalance = ethers.utils.formatEther(balance.toString());
        console.log(`WMETIS balance for ${address}: ${formattedBalance}`);
        return formattedBalance;
      } else {
        throw new Error("Contract doesn't have read.balanceOf method");
      }
    } catch (v5Error) {
      console.warn("ThirdWeb v5 approach failed for WMETIS balance, falling back to legacy approach:", v5Error);
      
      // Fallback to legacy approach
      const provider = getProvider();
      // Get signer from provider
      const signer = provider.getSigner();
      const wmetisContract = getWMetisContract(signer);
      
      if (typeof wmetisContract.balanceOf === 'function') {
        const balance = await wmetisContract.balanceOf(address);
        // Use ethers.utils.formatEther for v5 compatibility
        const formattedBalance = ethers.utils.formatEther(balance.toString());
        console.log(`WMETIS balance for ${address} (legacy): ${formattedBalance}`);
        return formattedBalance;
      } else {
        throw new Error("Legacy contract doesn't have balanceOf method");
      }
    }
  } catch (error) {
    console.error(`Error fetching WMETIS balance for ${address}:`, error);
    return "0";
  }
};

/**
 * Buy an NFT from a listing using WMETIS (wrapped METIS)
 */
export const buyWithWMetis = async (listingId: string, wallet: any): Promise<{transactionHash: string, listingId: string, success: boolean}> => {
  try {
    console.log(`Buying listing ${listingId} with WMETIS`);
    
    // Ensure wallet is provided
    if (!wallet) {
      throw new Error("Wallet not connected");
    }
    
    // Get the listing
    const listing = await getListing(listingId);
    if (!listing) {
      throw new Error(`Listing ${listingId} not found or no longer available`);
    }
    
    console.log("Found listing:", {
      listingId,
      tokenId: listing.tokenId,
      pricePerToken: listing.pricePerToken
    });
    
    // Convert price to wei
    const priceInWei = ethers.utils.parseEther(listing.pricePerToken);
    console.log(`Price in wei: ${priceInWei.toString()}`);
    
    try {
      // Get the WMETIS contract with ThirdWeb v5
      const wmetisContract = await getContract({
        client,
        chain: metisChain,
        address: WMETIS_CONTRACT_ADDRESS as `0x${string}`,
      }) as ContractWithCall;
      
      // Get marketplace contract
      const marketplaceContract = await getContract({
        client,
        chain: metisChain,
        address: CONTRACT_ADDRESS as `0x${string}`,
      }) as ContractWithCall;
      
      console.log(`Approving WMETIS for marketplace...`);
      
      // Approve the marketplace to spend WMETIS
      const approvalTx = await wmetisContract.call("approve", [
        CONTRACT_ADDRESS,
        priceInWei.toString()
      ]);
      
      console.log(`Approval transaction:`, approvalTx);
      
      // Using the buyFromListing extension for WMETIS
      const result = await thirdwebBuyFromListing({
        contract: marketplaceContract,
        listingId: BigInt(listingId),
        quantity: BigInt(1),
        currencyAddress: WMETIS_CONTRACT_ADDRESS,
        wallet
      } as any);
      
      // Access result safely with optional chaining and type assertions
      const txHash = (result as any)?.receipt?.transactionHash || 'Unknown transaction hash';
      console.log(`Transaction sent: ${txHash}`);
      
      return {
        transactionHash: txHash,
        listingId,
        success: true
      };
    } catch (v5Error: any) {
      console.warn("ThirdWeb v5 approach failed:", v5Error);
      throw new Error(`Failed to buy listing with WMETIS: ${v5Error.message || 'Unknown error'}`);
    }
  } catch (error: any) {
    console.error("Error buying with WMETIS:", error);
    
    if (error.code === 4001 || error.code === "ACTION_REJECTED") {
      throw new Error("Transaction was rejected by the user");
    }
    
    if (error.message && error.message.includes("insufficient funds")) {
      throw new Error("You don't have enough WMETIS to complete this purchase");
    }
    
    throw new Error("Failed to buy listing with WMETIS: " + error.message);
  }
};