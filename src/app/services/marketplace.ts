import { ethers } from "ethers";
import { client, getProvider, getMarketplaceContract, getWMetisContract, getERC721Contract, getERC1155Contract } from "@/app/client";
import { CONTRACT_ADDRESS, WMETIS_CONTRACT_ADDRESS } from "@/app/constants/contracts";
import { IListingWithNFT, INFTMetadata } from "@/app/interfaces/interfaces";

/**
 * Function to get all active listings from the marketplace
 */
export const getAllListings = async (): Promise<IListingWithNFT[]> => {
  try {
    console.log("Getting marketplace contract at", CONTRACT_ADDRESS);
    // Get marketplace contract directly with ABI
    const marketplaceContract = getMarketplaceContract();
    console.log("Getting all listings...");
    
    // Get all valid listings from the contract using direct call
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
        if (listing && listing.status === 1 && 
            listing.tokenId && listing.assetContract && 
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
          
          // Format price with proper decimals
          let formattedPrice = "";
          try {
            formattedPrice = ethers.utils.formatEther(pricePerToken.toString());
            console.log(`Price per token: ${formattedPrice} METIS`);
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
    // Get marketplace contract with ABI
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
    
    return {
      listingId: listingId.toString(),
      tokenId: tokenId.toString(),
      quantity: quantity.toString(),
      pricePerToken: ethers.utils.formatEther(pricePerToken.toString()),
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
  } catch (error) {
    console.error(`Error fetching listing ${listingId}:`, error);
    return null;
  }
};

/**
 * Buy an NFT from a listing using native METIS
 */
export const buyWithMetis = async (listingId: string, signer: any) => {
  try {
    console.log(`Buying listing ${listingId} with METIS`);
    
    if (!signer) {
      throw new Error("No signer provided for transaction");
    }
    
    console.log("Signer type:", typeof signer);
    
    // Get the listing first to check the price
    const listing = await getListing(listingId);
    if (!listing) {
      throw new Error(`Listing ${listingId} not found or no longer available`);
    }
    
    console.log(`Found listing:`, {
      listingId: listing.listingId,
      tokenId: listing.tokenId,
      price: listing.pricePerToken
    });
    
    // Convert price to wei
    const priceInWei = ethers.utils.parseEther(listing.pricePerToken);
    console.log(`Price in wei: ${priceInWei.toString()}`);
    
    // Get signed marketplace contract
    const marketplaceContract = getMarketplaceContract(signer);
    console.log("Contract created with signer");
    
    // Ensure the contract is connected to a signer
    if (!marketplaceContract.signer) {
      throw new Error("Contract not connected to a signer");
    }
    
    // Get the buyer address
    const buyerAddress = await signer.getAddress();
    console.log("Buyer address:", buyerAddress);
    
    // Estimate gas to ensure transaction will succeed
    try {
      console.log("Estimating gas for transaction with parameters:", {
        listingId,
        buyerAddress,
        quantity: 1,
        currency: listing.currency,
        totalPrice: priceInWei.toString()
      });
      
      const gasEstimate = await marketplaceContract.estimateGas.buyFromListing(
        listingId,                // _listingId
        buyerAddress,             // _buyFor (the recipient of the NFT)
        1,                        // _quantity
        listing.currency,         // _currency
        priceInWei,               // _totalPrice
        { value: priceInWei }     // transaction options with value in wei
      );
      console.log(`Gas estimate: ${gasEstimate.toString()}`);
    } catch (gasError: any) {
      console.error("Gas estimation failed:", gasError);
      throw new Error(`Transaction is likely to fail: ${gasError.message}`);
    }
    
    // Buy from listing with native token
    console.log(`Executing transaction...`);
    const tx = await marketplaceContract.buyFromListing(
      listingId,                // _listingId
      buyerAddress,             // _buyFor (the recipient of the NFT)
      1,                        // _quantity
      listing.currency,         // _currency
      priceInWei,               // _totalPrice
      { value: priceInWei }     // transaction options with value in wei
    );
    
    console.log(`Transaction sent: ${tx.hash}`);
    
    // Wait for transaction
    console.log(`Waiting for transaction confirmation...`);
    const receipt = await tx.wait();
    console.log(`Transaction confirmed! Block: ${receipt.blockNumber}`);
    
    return {
      transactionHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      listingId,
      success: true
    };
  } catch (error: any) {
    console.error(`Error buying with METIS:`, error);
    
    // Enhance error messages
    if (error.message && error.message.includes("user rejected transaction")) {
      throw new Error("Transaction was rejected by the user");
    }
    
    if (error.message && error.message.includes("insufficient funds")) {
      throw new Error("Insufficient METIS balance to complete the purchase");
    }
    
    throw new Error(`Failed to buy NFT: ${error.message || 'Unknown error'}`);
  }
};

/**
 * Buy an NFT from a listing using WMETIS
 */
export const buyWithWMetis = async (listingId: string, signer: any) => {
  try {
    console.log(`Buying listing ${listingId} with WMETIS`);
    
    if (!signer) {
      throw new Error("No signer provided for transaction");
    }
    
    console.log("Signer type:", typeof signer);
    
    // Get the listing first to check the price
    const listing = await getListing(listingId);
    if (!listing) {
      throw new Error(`Listing ${listingId} not found or no longer available`);
    }
    
    console.log(`Found listing:`, {
      listingId: listing.listingId,
      tokenId: listing.tokenId,
      price: listing.pricePerToken
    });
    
    // Get contracts with signer
    const wmetisContract = getWMetisContract(signer);
    const marketplaceContract = getMarketplaceContract(signer);
    console.log("Contracts created with signer");
    
    // Ensure the contracts are connected to a signer
    if (!wmetisContract.signer || !marketplaceContract.signer) {
      throw new Error("Contracts not connected to a signer");
    }
    
    // Convert price to wei
    const priceInWei = ethers.utils.parseEther(listing.pricePerToken);
    console.log(`Price in wei: ${priceInWei.toString()}`);
    
    // Get signer address
    const userAddress = await signer.getAddress();
    console.log("User address:", userAddress);
    
    // Check if user has enough WMETIS
    const wmetisBalance = await wmetisContract.balanceOf(userAddress);
    console.log(`WMETIS balance: ${ethers.utils.formatEther(wmetisBalance)} WMETIS`);
    
    if (wmetisBalance.lt(priceInWei)) {
      throw new Error(`Insufficient WMETIS balance. You have ${ethers.utils.formatEther(wmetisBalance)} WMETIS but need ${listing.pricePerToken} WMETIS`);
    }
    
    // Check allowance
    const allowance = await wmetisContract.allowance(userAddress, CONTRACT_ADDRESS);
    console.log(`Current allowance: ${ethers.utils.formatEther(allowance)} WMETIS`);
    
    // Approve WMETIS tokens for marketplace if needed
    if (allowance.lt(priceInWei)) {
      console.log(`Approving WMETIS tokens for marketplace...`);
      const approveTx = await wmetisContract.approve(CONTRACT_ADDRESS, priceInWei);
      console.log(`Approval transaction sent: ${approveTx.hash}`);
      await approveTx.wait();
      console.log(`WMETIS approved for marketplace`);
    }
    
    // Estimate gas to ensure transaction will succeed
    try {
      console.log("Estimating gas for transaction with parameters:", {
        listingId,
        buyerAddress: userAddress,
        quantity: 1,
        currency: WMETIS_CONTRACT_ADDRESS,
        totalPrice: priceInWei.toString()
      });
      
      const gasEstimate = await marketplaceContract.estimateGas.buyFromListing(
        listingId,                 // _listingId
        userAddress,               // _buyFor (the recipient of the NFT)
        1,                         // _quantity
        WMETIS_CONTRACT_ADDRESS,   // _currency
        priceInWei                 // _totalPrice
      );
      console.log(`Gas estimate: ${gasEstimate.toString()}`);
    } catch (gasError: any) {
      console.error("Gas estimation failed:", gasError);
      throw new Error(`Transaction is likely to fail: ${gasError.message}`);
    }
    
    // Buy from listing with WMETIS
    console.log(`Executing transaction...`);
    const tx = await marketplaceContract.buyFromListing(
      listingId,                 // _listingId
      userAddress,               // _buyFor (the recipient of the NFT)
      1,                         // _quantity
      WMETIS_CONTRACT_ADDRESS,   // _currency
      priceInWei                 // _totalPrice
    );
    console.log(`Transaction sent: ${tx.hash}`);
    
    // Wait for transaction
    console.log(`Waiting for transaction confirmation...`);
    const receipt = await tx.wait();
    console.log(`Transaction confirmed! Block: ${receipt.blockNumber}`);
    
    return {
      transactionHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      listingId,
      success: true
    };
  } catch (error: any) {
    console.error(`Error buying with WMETIS:`, error);
    
    // Enhance error messages
    if (error.message && error.message.includes("user rejected transaction")) {
      throw new Error("Transaction was rejected by the user");
    }
    
    if (error.message && error.message.includes("insufficient funds")) {
      throw new Error("Insufficient METIS balance to pay gas fees");
    }
    
    throw new Error(`Failed to buy NFT: ${error.message || 'Unknown error'}`);
  }
};

/**
 * Function to wrap METIS into WMETIS
 */
export const wrapMetis = async (amount: string, signer: any) => {
  try {
    // Get signed contract
    const provider = new ethers.providers.Web3Provider(signer);
    const signerWallet = provider.getSigner();
    const wmetisContract = getWMetisContract(signerWallet);
    
    // Convert amount to Wei
    const amountInWei = ethers.utils.parseEther(amount);
    
    // Deposit METIS to get WMETIS
    const tx = await wmetisContract.deposit({ value: amountInWei });
    
    // Wait for transaction
    const receipt = await tx.wait();
    
    return {
      success: true,
      txHash: receipt.transactionHash,
      data: { receipt }
    };
  } catch (error) {
    console.error("Error wrapping METIS:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
};

/**
 * Function to get WMETIS balance
 */
export const getWMetisBalance = async (address: string): Promise<string> => {
  try {
    // Get WMETIS contract
    const wmetisContract = getWMetisContract();
    
    // Get balance
    const balance = await wmetisContract.balanceOf(address);
    
    // Format to ether units
    return ethers.utils.formatEther(balance);
  } catch (error) {
    console.error("Error getting WMETIS balance:", error);
    return "0";
  }
};

/**
 * Function to get all marketplace listings with metadata - needed for backwards compatibility
 * Uses direct contract calls instead of ThirdWeb abstraction
 */
export const getAllListingsWithMetadata = async (provider: any, contractAddress: string): Promise<IListingWithNFT[]> => {
  console.log("Using getAllListingsWithMetadata with contract:", contractAddress);
  // Simply delegate to our enhanced getAllListings function
  return getAllListings();
}; 