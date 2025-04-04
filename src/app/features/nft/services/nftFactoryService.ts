import { metisChain } from "@/app/config/chain";
import { client } from "@/app/config/client";
import { NFT_FACTORY_ADDRESS } from "@/app/constants/contracts";
import {
  getContract,
  prepareContractCall,
  sendTransaction
} from "thirdweb";
import { formatEther } from "viem";

// Use wallet address type since Account type may not be exported
type WalletAddress = `0x${string}`;

// Types for deployment params
export interface ERC721DeployParams {
  name: string;
  symbol: string;
  defaultAdmin: string; // Added to match ABI
  royaltyRecipient: string;
  royaltyBps: number; // Basis points (e.g., 500 = 5%)
  primarySaleRecipient: string;
}

export interface ERC1155DeployParams {
  name: string;
  symbol: string;
  defaultAdmin: string; // Added to match ABI
  royaltyRecipient: string;
  royaltyBps: number;
  primarySaleRecipient: string;
}

/**
 * Deploy an ERC721Drop collection
 * @param params Deployment parameters
 * @param account Account to deploy from
 * @returns Transaction result or null if failed
 */
export async function deployERC721Drop(
  params: ERC721DeployParams,
  account: any // Using any for now to bypass type checking issues
) {
  try {
    if (!NFT_FACTORY_ADDRESS) {
      throw new Error("NFT Factory address not configured");
    }

    // Get the factory contract instance
    const factoryContract = getContract({
      client,
      chain: metisChain,
      address: NFT_FACTORY_ADDRESS,
    });

    // Get the factory fee
    const fee = await getFactoryFee(factoryContract);

    // Prepare the deployment transaction
    const transaction = await prepareContractCall({
      contract: factoryContract,
      method: "function deployERC721Drop(string name, string symbol, address defaultAdmin, address royaltyRecipient, uint16 royaltyBps, address primarySaleRecipient) external payable returns (address)",
      params: [
        params.name,
        params.symbol,
        params.defaultAdmin as WalletAddress,
        params.royaltyRecipient as WalletAddress,
        params.royaltyBps,
        params.primarySaleRecipient as WalletAddress,
      ],
      value: fee, // Pass the deployment fee
    });

    // Send the transaction
    const result = await sendTransaction({
      transaction,
      account,
    });

    return result;
  } catch (error) {
    console.error("Failed to deploy ERC721Drop collection:", error);
    throw error;
  }
}

/**
 * Deploy an ERC1155Drop collection
 * @param params Deployment parameters
 * @param account Account to deploy from
 * @returns Transaction result or null if failed
 */
export async function deployERC1155Drop(
  params: ERC1155DeployParams,
  account: any // Using any for now to bypass type checking issues
) {
  try {
    if (!NFT_FACTORY_ADDRESS) {
      throw new Error("NFT Factory address not configured");
    }

    // Get the factory contract instance
    const factoryContract = getContract({
      client,
      chain: metisChain,
      address: NFT_FACTORY_ADDRESS,
    });

    // Get the factory fee
    const fee = await getFactoryFee(factoryContract);

    // Prepare the deployment transaction
    const transaction = await prepareContractCall({
      contract: factoryContract,
      method: "function deployERC1155Drop(string name, string symbol, address defaultAdmin, address royaltyRecipient, uint16 royaltyBps, address primarySaleRecipient) external payable returns (address)",
      params: [
        params.name,
        params.symbol,
        params.defaultAdmin as WalletAddress,
        params.royaltyRecipient as WalletAddress,
        params.royaltyBps,
        params.primarySaleRecipient as WalletAddress,
      ],
      value: fee, // Pass the deployment fee
    });

    // Send the transaction
    const result = await sendTransaction({
      transaction,
      account,
    });

    return result;
  } catch (error) {
    console.error("Failed to deploy ERC1155Drop collection:", error);
    throw error;
  }
}

/**
 * Get the current fee required to deploy a collection
 * @param factoryContract Optional factory contract instance (for reuse)
 * @returns Fee in native token (METIS) as a BigInt
 */
export async function getFactoryFee(factoryContract?: any) {
  try {
    if (!NFT_FACTORY_ADDRESS) {
      throw new Error("NFT Factory address not configured");
    }

    // Get or create factory contract instance
    const contract = factoryContract || getContract({
      client,
      chain: metisChain,
      address: NFT_FACTORY_ADDRESS,
    });

    // Call the fee function - using the correct function name from ABI
    const feeResponse = await (contract as any).call("deploymentFee");
    
    return feeResponse; // BigInt representing the fee in wei
  } catch (error) {
    console.error("Failed to get factory fee:", error);
    throw error;
  }
}

/**
 * Get formatted fee for UI display
 * @returns Fee as a formatted string (e.g. "0.01 METIS")
 */
export async function getFormattedFactoryFee() {
  try {
    const fee = await getFactoryFee();
    return `${formatEther(fee)} METIS`;
  } catch (error) {
    console.error("Failed to get formatted factory fee:", error);
    return "Unknown";
  }
}

/**
 * Get all collections deployed by an address
 * @param address Owner address to get collections for
 * @returns Array of collection addresses
 */
export async function getDeployedCollections(address: WalletAddress) {
  try {
    if (!NFT_FACTORY_ADDRESS) {
      throw new Error("NFT Factory address not configured");
    }

    // Get factory contract instance
    const factoryContract = getContract({
      client,
      chain: metisChain,
      address: NFT_FACTORY_ADDRESS,
    });

    // Get collections deployed by this address
    const collections = await (factoryContract as any).call("getDeployedCollections", [address]);
    
    return collections as string[];
  } catch (error) {
    console.error("Failed to get deployed collections:", error);
    return [];
  }
}

/**
 * Check if a contract was deployed by our factory
 * @param contractAddress Contract address to check
 * @returns Boolean indicating if contract was deployed by our factory
 */
export async function isFactoryDeployed(contractAddress: WalletAddress) {
  try {
    if (!NFT_FACTORY_ADDRESS) {
      throw new Error("NFT Factory address not configured");
    }

    // Get factory contract instance
    const factoryContract = getContract({
      client,
      chain: metisChain,
      address: NFT_FACTORY_ADDRESS,
    });

    // Check if the contract was deployed by our factory
    return await (factoryContract as any).call("isFactoryDeployed", [contractAddress]);
  } catch (error) {
    console.error("Failed to check if contract was factory deployed:", error);
    return false;
  }
}

/**
 * Get collection type (ERC721 or ERC1155)
 * @param collectionAddress Collection address to check
 * @returns "ERC721" or "ERC1155" or null if unknown
 */
export async function getCollectionType(collectionAddress: WalletAddress) {
  try {
    if (!NFT_FACTORY_ADDRESS) {
      throw new Error("NFT Factory address not configured");
    }

    // Get factory contract instance
    const factoryContract = getContract({
      client,
      chain: metisChain,
      address: NFT_FACTORY_ADDRESS,
    });

    // Check if collection is ERC721 - using dynamic approach
    const isERC721 = await (factoryContract as any).call("isERC721Collection", [collectionAddress]);
    if (isERC721) return "ERC721";
    
    // Check if collection is ERC1155 - using dynamic approach
    const isERC1155 = await (factoryContract as any).call("isERC1155Collection", [collectionAddress]);
    if (isERC1155) return "ERC1155";
    
    return null;
  } catch (error) {
    console.error("Failed to get collection type:", error);
    return null;
  }
} 