import { metisChain } from "@/app/config/chain";
import { client } from "@/app/config/client";
import { formatIPFSUrl } from "@/app/utils/format";
import { getContract } from "thirdweb";

// Define MAX_UINT256 constant
const MAX_UINT256 = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

// Types for management functions
export interface NFTMetadata {
  name: string;
  description: string;
  image: string; // URI pointing to the image
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

export interface ClaimCondition {
  startTime: Date;
  maxClaimableSupply: bigint;
  quantityLimitPerWallet: bigint;
  pricePerToken: bigint;
  currency: `0x${string}`; // Contract address of currency, use native token address for METIS
  merkleRootHash?: string; // Optional for allowlist-based claiming
}

/**
 * Lazy mint NFTs to a collection
 * @param contractAddress Collection contract address
 * @param metadataWithSupply Array of metadata with supply for each NFT
 * @param account Wallet account to sign the transaction
 * @returns Transaction result
 */
export async function lazyMintNFT(
  contractAddress: `0x${string}`,
  metadataWithSupply: {
    metadata: NFTMetadata;
    supply: bigint; // For ERC1155, typically 1n for ERC721
  }[],
  account: any
) {
  try {
    // Get contract instance
    const contract = getContract({
      client,
      chain: metisChain,
      address: contractAddress,
    });

    // Format metadata for batch upload
    const metadataFormatted = metadataWithSupply.map(item => ({
      metadata: {
        name: item.metadata.name,
        description: item.metadata.description,
        image: item.metadata.image, // Should be IPFS URI
        attributes: item.metadata.attributes || [],
      },
      supply: item.supply
    }));

    // Call lazy mint function on the contract
    const transaction = await (contract as any).prepare("lazyMint", [
      metadataFormatted.length, // baseURICount
      "ipfs://batchURI/", // baseURI - will be replaced by contract
      "0x", // data - optional extra data
      metadataFormatted // Actual metadata array
    ]);

    // Send the transaction
    const result = await (transaction as any).send({
      account,
    });

    return result;
  } catch (error) {
    console.error("Failed to lazy mint NFT:", error);
    throw error;
  }
}

/**
 * Set claim conditions for a token
 * @param contractAddress Collection contract address
 * @param tokenId Token ID (for ERC1155, null/undefined for ERC721)
 * @param conditions Claim conditions
 * @param account Wallet account to sign the transaction
 * @returns Transaction result
 */
export async function setClaimConditions(
  contractAddress: `0x${string}`,
  tokenId: bigint | null | undefined,
  conditions: ClaimCondition[],
  account: any
) {
  try {
    // Get contract instance
    const contract = getContract({
      client,
      chain: metisChain,
      address: contractAddress,
    });

    // Format conditions for the contract
    const formattedConditions = conditions.map(condition => ({
      startTimestamp: BigInt(Math.floor(condition.startTime.getTime() / 1000)),
      maxClaimableSupply: condition.maxClaimableSupply || MAX_UINT256,
      supplyClaimed: BigInt(0), // Start with 0 claimed
      quantityLimitPerWallet: condition.quantityLimitPerWallet,
      merkleRoot: condition.merkleRootHash || "0x0000000000000000000000000000000000000000000000000000000000000000",
      pricePerToken: condition.pricePerToken,
      currency: condition.currency,
      metadata: {} // Optional metadata
    }));

    // Prepare method name based on token type (ERC721 vs ERC1155)
    const methodName = tokenId !== null && tokenId !== undefined
      ? "setClaimConditionsForToken" // ERC1155
      : "setClaimConditions";       // ERC721

    // Prepare the transaction parameters
    const params = tokenId !== null && tokenId !== undefined
      ? [tokenId, formattedConditions, false] // ERC1155 includes tokenId
      : [formattedConditions, false];         // ERC721 doesn't include tokenId

    // Prepare the transaction
    const transaction = await (contract as any).prepare(methodName, params);

    // Send the transaction
    const result = await (transaction as any).send({
      account,
    });

    return result;
  } catch (error) {
    console.error("Failed to set claim conditions:", error);
    throw error;
  }
}

/**
 * Get metadata for a collection
 * @param contractAddress Collection contract address
 * @returns Collection metadata
 */
export async function getContractMetadata(contractAddress: `0x${string}`) {
  try {
    // Get contract instance
    const contract = getContract({
      client,
      chain: metisChain,
      address: contractAddress,
    });

    // Get metadata from contract
    const metadata = await (contract as any).call("contractURI");
    
    // Fetch and parse the metadata if it's an IPFS URI
    if (metadata && metadata.startsWith("ipfs://")) {
      const response = await fetch(formatIPFSUrl(metadata));
      if (!response.ok) {
        throw new Error(`Failed to fetch contract metadata: ${response.status}`);
      }
      return await response.json();
    }
    
    // Return parsed metadata
    return {
      name: await (contract as any).call("name"),
      symbol: await (contract as any).call("symbol"),
      // Other metadata fields from the contract
    };
  } catch (error) {
    console.error("Failed to get contract metadata:", error);
    throw error;
  }
}

/**
 * Get total supply of a token
 * @param contractAddress Collection contract address
 * @param tokenId Token ID (for ERC1155, null/undefined for ERC721)
 * @returns Total supply as a bigint
 */
export async function getTotalSupply(
  contractAddress: `0x${string}`,
  tokenId?: bigint
) {
  try {
    // Get contract instance
    const contract = getContract({
      client,
      chain: metisChain,
      address: contractAddress,
    });

    // Call different methods based on token type
    if (tokenId !== undefined) {
      // ERC1155 - specific token ID
      return await (contract as any).call("totalSupply", [tokenId]);
    } else {
      // ERC721 - entire collection
      return await (contract as any).call("totalSupply");
    }
  } catch (error) {
    console.error("Failed to get total supply:", error);
    return BigInt(0);
  }
}

/**
 * Get claim conditions for a token
 * @param contractAddress Collection contract address
 * @param tokenId Token ID (for ERC1155, null/undefined for ERC721)
 * @returns Array of active claim conditions
 */
export async function getClaimConditions(
  contractAddress: `0x${string}`,
  tokenId?: bigint
) {
  try {
    // Get contract instance
    const contract = getContract({
      client,
      chain: metisChain,
      address: contractAddress,
    });

    // Call different methods based on token type
    if (tokenId !== undefined) {
      // ERC1155 - specific token ID
      return await (contract as any).call("getClaimConditionsForToken", [tokenId]);
    } else {
      // ERC721 - entire collection
      return await (contract as any).call("getClaimConditions");
    }
  } catch (error) {
    console.error("Failed to get claim conditions:", error);
    return [];
  }
} 