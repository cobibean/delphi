import { metisChain } from "@/app/config/chain";
import { client } from "@/app/config/client";
import { NFT_FACTORY_ADDRESS } from "@/app/constants/contracts";
import { MarketplaceTransactionResult } from "@/app/features/marketplace/services/types";
import { executeThirdwebTransaction } from "@/app/features/marketplace/services/utils";
import { WalletAccount } from "@/app/features/wallet/types";
import {
  getContract,
  prepareContractCall,
  readContract
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

// Contract ABI fragments for read operations
const DEPLOYMENT_FEE_ABI = [
  {
    inputs: [],
    name: "deploymentFee",
    outputs: [{ type: "uint256", name: "" }],
    stateMutability: "view",
    type: "function"
  }
];

const DEPLOYED_COLLECTIONS_ABI = [
  {
    inputs: [{ type: "address", name: "deployer" }],
    name: "getDeployedCollections",
    outputs: [{ type: "address[]", name: "" }],
    stateMutability: "view",
    type: "function"
  }
];

const IS_FACTORY_DEPLOYED_ABI = [
  {
    inputs: [{ type: "address", name: "collection" }],
    name: "isFactoryDeployed",
    outputs: [{ type: "bool", name: "" }],
    stateMutability: "view",
    type: "function"
  }
];

const SUPPORTS_INTERFACE_ABI = [
  {
    inputs: [{ type: "bytes4", name: "interfaceId" }],
    name: "supportsInterface",
    outputs: [{ type: "bool", name: "" }],
    stateMutability: "view",
    type: "function"
  }
];

/**
 * Get contract instance for factory
 * Centralizes contract instantiation
 */
function getFactoryContract() {
  if (!NFT_FACTORY_ADDRESS) {
    throw new Error("NFT Factory address not configured");
  }
  
  return getContract({
    client,
    chain: metisChain,
    address: NFT_FACTORY_ADDRESS,
  });
}

/**
 * Deploy an ERC721Drop collection
 * @param params Deployment parameters
 * @param account Account to deploy from
 * @returns Transaction result or null if failed
 */
export async function deployERC721Drop(
  params: ERC721DeployParams,
  account: WalletAccount
): Promise<MarketplaceTransactionResult> {
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
    const fee = await getFactoryFee();

    // Prepare the deployment transaction using string method format
    const transaction = await prepareContractCall({
      contract: factoryContract,
      method: `function deployERC721Drop(string,string,address,address,uint16,address)`,
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

    // Use executeThirdwebTransaction instead of sendTransaction directly
    const result = await executeThirdwebTransaction(transaction, account);

    return result;
  } catch (error: any) {
    console.error("Failed to deploy ERC721Drop collection:", error);
    return {
      transactionHash: error.transactionHash || "",
      success: false,
      error: error.message || "Unknown error creating ERC721 collection",
    };
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
  account: WalletAccount
): Promise<MarketplaceTransactionResult> {
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
    const fee = await getFactoryFee();

    // Prepare the deployment transaction using string method format
    const transaction = await prepareContractCall({
      contract: factoryContract,
      method: `function deployERC1155Drop(string,string,address,address,uint16,address)`,
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

    // Use executeThirdwebTransaction instead of sendTransaction directly
    const result = await executeThirdwebTransaction(transaction, account);

    return result;
  } catch (error: any) {
    console.error("Failed to deploy ERC1155Drop collection:", error);
    return {
      transactionHash: error.transactionHash || "",
      success: false,
      error: error.message || "Unknown error creating ERC1155 collection",
    };
  }
}

/**
 * Get the current fee required to deploy a collection
 * @returns Fee in native token (METIS) as a BigInt
 */
export async function getFactoryFee() {
  try {
    if (!NFT_FACTORY_ADDRESS) {
      throw new Error("NFT Factory address not configured");
    }

    // Use readContract from thirdweb SDK for view functions
    const feeResult = await readContract({
      client,
      chain: metisChain,
      address: NFT_FACTORY_ADDRESS,
      abi: DEPLOYMENT_FEE_ABI,
      functionName: "deploymentFee",
      args: [],
    });
    
    return feeResult; // BigInt representing the fee in wei
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

    // Use readContract from thirdweb SDK
    const collections = await readContract({
      client,
      chain: metisChain,
      address: NFT_FACTORY_ADDRESS,
      abi: DEPLOYED_COLLECTIONS_ABI,
      functionName: "getDeployedCollections",
      args: [address],
    });
    
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

    // Use readContract from thirdweb SDK
    const isDeployed = await readContract({
      client,
      chain: metisChain,
      address: NFT_FACTORY_ADDRESS,
      abi: IS_FACTORY_DEPLOYED_ABI,
      functionName: "isFactoryDeployed",
      args: [contractAddress],
    });
    
    return isDeployed as boolean;
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
    // First check if the contract was deployed by our factory
    const deployed = await isFactoryDeployed(collectionAddress);
    
    if (!deployed) {
      console.log("Contract was not deployed by our factory");
      return null;
    }
    
    // Use ERC165 interface detection to determine the token standard
    try {
      // Check for ERC721 interface (0x80ac58cd)
      const isERC721 = await readContract({
        client,
        chain: metisChain,
        address: collectionAddress,
        abi: SUPPORTS_INTERFACE_ABI,
        functionName: "supportsInterface",
        args: ["0x80ac58cd"],
      });
      
      if (isERC721) return "ERC721";
      
      // Check for ERC1155 interface (0xd9b67a26)
      const isERC1155 = await readContract({
        client,
        chain: metisChain,
        address: collectionAddress,
        abi: SUPPORTS_INTERFACE_ABI,
        functionName: "supportsInterface",
        args: ["0xd9b67a26"],
      });
      
      if (isERC1155) return "ERC1155";
      
      return null;
    } catch (e) {
      console.error("Error checking interfaces:", e);
      return null;
    }
  } catch (error) {
    console.error("Failed to get collection type:", error);
    return null;
  }
} 