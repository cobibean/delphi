import 'dotenv/config';
import { ethers } from 'ethers';

// Constants
const PRIVATE_KEY = process.env.PRIVATE_KEY; // Your wallet's private key
const RPC_URL = process.env.RPC_URL; // Metis RPC URL
const MARKETPLACE_CONTRACT_ADDRESS = "0x7e9EE861e3721F9F3664C18A539e63aCb784a208"; // Marketplace contract address
const NFT_CONTRACT_ADDRESS = "0x3d9a9BA8D73c81a754ebCCA6a2483A2F8C7a5403"; // Your NFT contract address
const WMETIS_CONTRACT_ADDRESS = "0x75cb093E4D61d2A2e65D8e0BBb01DE8d89b53481"; // WMETIS contract address
const TOKEN_ID = 152; // Token ID of your NFT

// Initialize ethers.js
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// Marketplace ABI (simplified for createListing)
const MARKETPLACE_ABI = [
  "function createListing((address assetContract, uint256 tokenId, uint256 quantity, address currency, uint256 pricePerToken, uint128 startTimestamp, uint128 endTimestamp, bool reserved) _params) public returns (uint256)",
];

// ERC721 ABI for approval
const ERC721_ABI = [
  "function approve(address to, uint256 tokenId) public",
  "function getApproved(uint256 tokenId) public view returns (address)",
];

// WMETIS ABI for approval
const WMETIS_ABI = [
  "function approve(address spender, uint256 amount) public returns (bool)",
];

// Contract instances
const nftContract = new ethers.Contract(NFT_CONTRACT_ADDRESS, ERC721_ABI, wallet);
const marketplaceContract = new ethers.Contract(
  MARKETPLACE_CONTRACT_ADDRESS,
  MARKETPLACE_ABI,
  wallet
);
const wmetisContract = new ethers.Contract(
  WMETIS_CONTRACT_ADDRESS,
  WMETIS_ABI,
  wallet
);

// Approve NFT for Marketplace
const approveNFT = async () => {
  console.log("Checking NFT approval...");
  const approvedAddress = await nftContract.getApproved(TOKEN_ID);
  if (approvedAddress.toLowerCase() === MARKETPLACE_CONTRACT_ADDRESS.toLowerCase()) {
    console.log("NFT is already approved for marketplace.");
    return;
  }

  console.log("Approving NFT for marketplace...");
  const tx = await nftContract.approve(MARKETPLACE_CONTRACT_ADDRESS, TOKEN_ID);
  console.log("NFT approval transaction sent:", tx.hash);

  const receipt = await tx.wait();
  console.log("NFT approved:", receipt.hash);
};

// Approve WMETIS
const approveWMETIS = async () => {
  console.log("Approving WMETIS for marketplace...");
  const tx = await wmetisContract.approve(
    MARKETPLACE_CONTRACT_ADDRESS,
    ethers.MaxUint256
  );
  console.log("WMETIS approval transaction sent:", tx.hash);

  const receipt = await tx.wait();
  console.log("WMETIS approved:", receipt.hash);
};

// Create Listing
const createListing = async () => {
  const listingParams = {
    assetContract: NFT_CONTRACT_ADDRESS,
    tokenId: TOKEN_ID,
    quantity: 1, // Single NFT
    currency: WMETIS_CONTRACT_ADDRESS, // WMETIS as the currency
    pricePerToken: ethers.parseUnits("0.01", 18), // 0.01 WMETIS
    startTimestamp: Math.floor(Date.now() / 1000) + 60, // Start in 1 minute
    endTimestamp: Math.floor(Date.now() / 1000) + 86400, // End in 1 day
    reserved: false, // No reservation
  };

  console.log("Creating listing...");
  const tx = await marketplaceContract.createListing(listingParams);
  console.log("Listing transaction sent:", tx.hash);

  const receipt = await tx.wait();
  console.log("Listing created successfully:", receipt.hash);
};

// Main Function
const main = async () => {
  try {
    await approveNFT(); // Step 1: Approve the NFT
    await approveWMETIS(); // Step 2: Approve WMETIS
    await createListing(); // Step 3: Create the listing
  } catch (error) {
    console.error("Error during listing process:", error);
  }
};

// Execute the script
main();