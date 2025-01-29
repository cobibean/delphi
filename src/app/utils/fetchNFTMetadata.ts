import { fetchTokenURI } from "./fetchTokenURI";
import { ethers } from "ethers";
import { Contract } from "ethers";
import  ERC721ABI from "../constants/ERC721ABI";

interface NFTMetadata {
  image: string; // URL for the NFT's media
  name: string; // Human-readable NFT name
  description: string; // Description
}

export async function fetchNFTMetadata(
  tokenId: string,
  assetContract: string,
  provider: ethers.JsonRpcProvider
): Promise<NFTMetadata> {
  try {
    const contract = new Contract(assetContract, ERC721ABI, provider);
    const tokenURI = await contract.tokenURI(tokenId);
    
    // Replace custom gateway with fallback public gateways
    const resolvedURI = tokenURI
      .replace('ipfs://', 'https://ipfs.io/ipfs/')
      .replace('https://delphigateway.mypinata.cloud', 'https://ipfs.io');

    const response = await fetch(resolvedURI);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const metadata = await response.json();
    
    // Ensure image URL uses public gateway
    if (metadata.image) {
      metadata.image = metadata.image
        .replace('ipfs://', 'https://ipfs.io/ipfs/')
        .replace('https://delphigateway.mypinata.cloud', 'https://ipfs.io');
    }
    
    return metadata;
  } catch (error) {
    console.error(`Error fetching metadata for token ID ${tokenId}:`, error);
    // Return fallback metadata
    return {
      name: `Unknown NFT #${tokenId}`,
      description: "NFT metadata unavailable",
      image: "/placeholder-nft.png" // Add this image to your public folder
    };
  }
}