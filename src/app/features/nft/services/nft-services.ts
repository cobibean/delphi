import { metisChain } from "@/app/config/chain";
import { client } from "@/app/config/client";
import { formatIPFSUrl } from "@/app/utils/format";
import { getContract } from "thirdweb";
import { getContractMetadata } from "thirdweb/extensions/common";
import { getNFT as getNFTThirdweb, ownerOf } from "thirdweb/extensions/erc721";

/**
 * Get NFT metadata and ownership information
 * @param contractAddress NFT contract address
 * @param tokenId Token ID
 * @returns NFT metadata including owner and collection info
 */
export async function getNFTMetadata(contractAddress: string, tokenId: string) {
  try {
    console.log(`Fetching NFT metadata for ${contractAddress}/${tokenId}`);
    
    // Get contract instance
    const nftContract = getContract({
      client,
      chain: metisChain,
      address: contractAddress,
    });
    
    // Get NFT data
    const nft = await getNFTThirdweb({
      contract: nftContract,
      tokenId: BigInt(tokenId)
    });
    
    // Get contract metadata for collection info
    const contractMetadata = await getContractMetadata({
      contract: nftContract
    });
    
    // Get NFT owner
    let owner = null;
    try {
      owner = await ownerOf({
        contract: nftContract,
        tokenId: BigInt(tokenId)
      });
    } catch (error) {
      console.error("Error fetching NFT owner:", error);
    }
    
    // Format attributes to match our interface
    const attributes = Array.isArray(nft.metadata.attributes) 
      ? nft.metadata.attributes.map(attr => ({
          trait_type: attr.trait_type?.toString() || "",
          value: attr.value?.toString() || ""
        }))
      : [];
    
    // Construct metadata response
    return {
      name: nft.metadata.name || `NFT #${tokenId}`,
      description: nft.metadata.description || "",
      image: formatIPFSUrl(nft.metadata.image || ""),
      attributes: attributes,
      owner: owner,
      collectionName: contractMetadata.name || "Unknown Collection",
      collectionSymbol: contractMetadata.symbol || "",
      tokenId: tokenId,
      contractAddress: contractAddress
    };
  } catch (error) {
    console.error("Error fetching NFT metadata:", error);
    throw error;
  }
}

/**
 * Check if an address owns a specific NFT
 * @param contractAddress NFT contract address
 * @param tokenId Token ID
 * @param address Address to check ownership for
 * @returns Boolean indicating if the address owns the NFT
 */
export async function isOwnerOf(contractAddress: string, tokenId: string, address: string): Promise<boolean> {
  try {
    // Get contract instance
    const nftContract = getContract({
      client,
      chain: metisChain,
      address: contractAddress,
    });
    
    // Get NFT owner
    const owner = await ownerOf({
      contract: nftContract,
      tokenId: BigInt(tokenId)
    });
    
    // Check if the address matches
    return owner.toLowerCase() === address.toLowerCase();
  } catch (error) {
    console.error("Error checking NFT ownership:", error);
    return false;
  }
}

/**
 * Get ownership information for an NFT
 * @param contractAddress NFT contract address
 * @param tokenId Token ID
 * @returns Ownership information
 */
export async function getOwnership(contractAddress: string, tokenId: string) {
  try {
    // Get contract instance
    const nftContract = getContract({
      client,
      chain: metisChain,
      address: contractAddress,
    });
    
    // Get NFT owner
    const owner = await ownerOf({
      contract: nftContract,
      tokenId: BigInt(tokenId)
    });
    
    return {
      owner,
      tokenId,
      contractAddress
    };
  } catch (error) {
    console.error("Error fetching NFT ownership:", error);
    throw error;
  }
} 