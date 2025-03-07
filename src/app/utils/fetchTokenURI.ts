import { ethers, providers, Contract } from "ethers";
import ERC721ABI from "@/app/constants/ERC721ABI"; // Import your standard ERC721 ABI

export const fetchTokenURI = async (
  tokenId: string,
  contractAddress: string,
  provider: providers.JsonRpcProvider
): Promise<string> => {
  try {
    const contract = new Contract(contractAddress, ERC721ABI, provider);
    const tokenURI = await contract.tokenURI(tokenId);

    // Use the gateway from the .env file or fallback to a public gateway
    const ipfsGateway = process.env.NEXT_PUBLIC_IPFS_GATEWAY || "https://ipfs.io/ipfs/";

    // Handle IPFS URLs
    if (tokenURI.startsWith("ipfs://")) {
      return tokenURI.replace("ipfs://", ipfsGateway);
    }

    return tokenURI; // Return the HTTP or already-resolved URI
  } catch (error) {
    console.error(`Error fetching token URI for token ID ${tokenId}:`, error);
    throw new Error("Failed to fetch token URI.");
  }
};