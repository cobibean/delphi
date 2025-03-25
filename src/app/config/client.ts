import { MARKETPLACE_ADDRESS } from "@/constants/contracts";
import MarketplaceABI from "@/constants/MarketplaceABI";
import { ethers } from "ethers";
import { createThirdwebClient } from "thirdweb";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { metisChain } from "./chain";

// Get client ID from environment
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "";

// Create the wallet configuration
export const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "discord",
        "telegram",
        "email",
        "x",
        "passkey",
        "phone",
        "coinbase",
      ],
    },
    smartAccount: {
      chain: metisChain,
      sponsorGas: true,
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("io.rabby"),
  createWallet("social.gm2"),
];

// Create a client with fallback handling for SSR
export const client = createThirdwebClient({
  clientId: clientId,
  // Note: secretKey is only needed for backend operations
  // secretKey: process.env.THIRDWEB_SECRET_KEY || "",
});

// Create a provider for Metis chain
export const getProvider = () => {
  return new ethers.JsonRpcProvider(metisChain.rpc);
};

// Get the marketplace contract using ethers.js
export const getMarketplaceContract = async (signerOrProvider = getProvider()) => {
  try {
    // Create ethers contract instance
    const contract = new ethers.Contract(
      MARKETPLACE_ADDRESS,
      MarketplaceABI,
      signerOrProvider
    );
    
    console.log("Contract interface created for marketplace at", MARKETPLACE_ADDRESS);
    return contract;
  } catch (error) {
    console.error("Failed to get marketplace contract", error);
    return null;
  }
};

// Get a signer for a connected wallet (to be used for transactions)
export const getSigner = async () => {
  try {
    // This is where we would integrate with ThirdwebClient for the wallet
    // For now, we'll use a simple provider signer
    const provider = getProvider();
    
    // In a real implementation, we would get the wallet from ThirdwebClient
    // and create an ethers signer from it
    const signer = await provider.getSigner();
    
    // Create contract interface using ethers.js
    const contract = new ethers.Contract(
      MARKETPLACE_ADDRESS,
      MarketplaceABI,
      signer
    );
    
    console.log("Contract interface created for marketplace at", MARKETPLACE_ADDRESS);
    return signer;
  } catch (error) {
    console.error("Failed to get signer", error);
    return null;
  }
};

// Get an ERC721 contract
export const getERC721Contract = async (address: string, signerOrProvider = getProvider()) => {
  try {
    // Simple ERC721 ABI - extend as needed
    const erc721Abi = [
      "function balanceOf(address owner) view returns (uint256)",
      "function ownerOf(uint256 tokenId) view returns (address)",
      "function tokenURI(uint256 tokenId) view returns (string)",
      "function isApprovedForAll(address owner, address operator) view returns (bool)",
      "function setApprovalForAll(address operator, bool approved)",
      "function transferFrom(address from, address to, uint256 tokenId)",
    ];
    
    return new ethers.Contract(address, erc721Abi, signerOrProvider);
  } catch (error) {
    console.error(`Failed to get ERC721 contract at ${address}`, error);
    return null;
  }
};

// Get an ERC1155 contract
export const getERC1155Contract = async (address: string, signerOrProvider = getProvider()) => {
  try {
    // Simple ERC1155 ABI - extend as needed
    const erc1155Abi = [
      "function balanceOf(address account, uint256 id) view returns (uint256)",
      "function balanceOfBatch(address[] accounts, uint256[] ids) view returns (uint256[])",
      "function isApprovedForAll(address account, address operator) view returns (bool)",
      "function setApprovalForAll(address operator, bool approved)",
      "function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data)",
      "function safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] amounts, bytes data)",
      "function uri(uint256 id) view returns (string)",
    ];
    
    return new ethers.Contract(address, erc1155Abi, signerOrProvider);
  } catch (error) {
    console.error(`Failed to get ERC1155 contract at ${address}`, error);
    return null;
  }
}; 