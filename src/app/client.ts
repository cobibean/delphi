import { createThirdwebClient } from "thirdweb";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, THIRDWEB_CLIENT_ID, WMETIS_CONTRACT_ADDRESS } from "@/app/constants/contracts";
import MarketplaceABI from "@/app/constants/MarketplaceABI";
import ERC721ABI from "@/app/constants/ERC721ABI";
import ERC1155ABI from "@/app/constants/ERC1155ABI";

// Define Metis chain
export const metisChain = {
  id: 1088,
  name: "Metis Andromeda",
  rpc: "https://andromeda.metis.io/?owner=1088",
  nativeCurrency: {
    decimals: 18,
    name: "Metis",
    symbol: "METIS",
  },
  testnet: true,
} as const;

// Initialize ThirdWeb client with our client ID
export const client = createThirdwebClient({
  clientId: THIRDWEB_CLIENT_ID
});

// Create a JSON RPC provider for Metis
export const getProvider = () => {
  return new ethers.providers.JsonRpcProvider("https://andromeda.metis.io/?owner=1088");
};

// Helper to create direct contract instances with ABIs
export const createContract = (address: string, abi: any, signer?: ethers.Signer | any) => {
  try {
    const provider = signer || getProvider();
    return new ethers.Contract(address, abi, provider);
  } catch (err) {
    console.error("Error creating contract:", err);
    throw err;
  }
};

// Get the marketplace contract
export const getMarketplaceContract = (signer?: ethers.Signer) => {
  return createContract(CONTRACT_ADDRESS, MarketplaceABI, signer);
};

// Get the WMETIS contract
export const getWMetisContract = (signer?: ethers.Signer) => {
  return createContract(WMETIS_CONTRACT_ADDRESS, ['function deposit() external payable', 'function approve(address spender, uint256 amount) external returns (bool)'], signer);
};

// Get an ERC721 contract
export const getERC721Contract = (address: string, signer?: ethers.Signer) => {
  return createContract(address, ERC721ABI, signer);
};

// Get an ERC1155 contract
export const getERC1155Contract = (address: string, signer?: ethers.Signer) => {
  return createContract(address, ERC1155ABI, signer);
};
