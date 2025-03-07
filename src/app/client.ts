import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { CONTRACT_ADDRESS, THIRDWEB_CLIENT_ID, WMETIS_CONTRACT_ADDRESS } from "@/app/constants/contracts";
import MarketplaceABI from "@/app/constants/MarketplaceABI";
import ERC721ABI from "@/app/constants/ERC721ABI";
import ERC1155ABI from "@/app/constants/ERC1155ABI";
import { ethers } from "ethers";

// Define Metis Andromeda chain configuration
const metisChain = {
  chainId: 1088,
  rpc: ["https://andromeda.metis.io/?owner=1088"],
  nativeCurrency: {
    decimals: 18,
    name: "Metis",
    symbol: "METIS",
  },
  shortName: "metis",
  slug: "metis",
  testnet: false,
  chain: "Metis",
  name: "Metis Andromeda",
};

// Initialize ThirdwebSDK with Metis chain
export const client = new ThirdwebSDK(metisChain, {
  clientId: THIRDWEB_CLIENT_ID
});

// Export a function to get the SDK with a signer for transactions that require signing
export const getSignedSDK = async (signer: any) => {
  return ThirdwebSDK.fromSigner(signer, 1088, {
    clientId: THIRDWEB_CLIENT_ID
  });
};

// Create a JSON RPC provider for Metis
export const getProvider = () => {
  return new ethers.providers.JsonRpcProvider("https://andromeda.metis.io/?owner=1088");
};

// Helper to create direct contract instances with ABIs
export const createContract = (address: string, abi: any, signer?: ethers.Signer | any) => {
  try {
    // If signer is from ThirdWeb, handle it appropriately
    if (signer && typeof signer !== 'string' && '_signTypedData' in signer) {
      console.log('Using ThirdWeb signer');
      return new ethers.Contract(address, abi, signer);
    } 
    
    // Regular case where signer is an ethers signer
    if (signer && signer.provider) {
      console.log('Using ethers signer with provider');
      return new ethers.Contract(address, abi, signer);
    }
    
    // Fallback to read-only provider
    console.log('Using read-only provider');
    const provider = getProvider();
    return new ethers.Contract(address, abi, provider);
  } catch (error) {
    console.error("Error creating contract:", error);
    // Fallback to read-only in case of error
    const provider = getProvider();
    return new ethers.Contract(address, abi, provider);
  }
};

// Create contract instances with ABIs
export const getMarketplaceContract = (signer?: ethers.Signer) => {
  return createContract(CONTRACT_ADDRESS, MarketplaceABI, signer);
};

export const getWMetisContract = (signer?: ethers.Signer) => {
  // Load WMETIS ABI directly since it might not be exported as default
  const WMETISABI = require("@/app/constants/WMETISABI");
  return createContract(WMETIS_CONTRACT_ADDRESS, WMETISABI, signer);
};

export const getERC721Contract = (address: string, signer?: ethers.Signer) => {
  return createContract(address, ERC721ABI, signer);
};

export const getERC1155Contract = (address: string, signer?: ethers.Signer) => {
  return createContract(address, ERC1155ABI, signer);
};
