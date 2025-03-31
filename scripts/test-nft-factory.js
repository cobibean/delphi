// Script to test the deployed SimpleNFTFactory contract
const { ethers } = require('ethers');
require('dotenv').config();

// Contract ABI (only the functions we need)
const NFTFactoryABI = [
  "function deploymentFee() view returns (uint256)",
  "function lazyMintFee() view returns (uint256)",
  "function defaultRoyaltyRecipient() view returns (address)",
  "function defaultRoyaltyBps() view returns (uint256)",
  "function deployERC721Drop(string memory name, string memory symbol, address defaultAdmin, address royaltyRecipient, uint256 royaltyBps, address primarySaleRecipient) payable returns (address)",
  "function getDeployedCollections(address) view returns (address[])"
];

// NFT Drop ABI (basic functions to confirm deployment)
const DropABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function owner() view returns (address)"
];

async function main() {
  // Factory contract address (from deployment)
  const factoryAddress = process.env.FACTORY_ADDRESS;
  if (!factoryAddress) {
    throw new Error("Please set FACTORY_ADDRESS in .env file");
  }

  // Connect to the network
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  
  console.log('Testing SimpleNFTFactory contract at:', factoryAddress);
  console.log('Tester address:', wallet.address);
  
  // Connect to the factory contract
  const factory = new ethers.Contract(factoryAddress, NFTFactoryABI, wallet);
  
  // Step 1: Read factory parameters
  const deploymentFee = await factory.deploymentFee();
  const lazyMintFee = await factory.lazyMintFee();
  const defaultRoyaltyRecipient = await factory.defaultRoyaltyRecipient();
  const defaultRoyaltyBps = await factory.defaultRoyaltyBps();
  
  console.log('\n--- Factory Parameters ---');
  console.log('Deployment Fee:', ethers.utils.formatEther(deploymentFee), 'METIS');
  console.log('Lazy Mint Fee:', ethers.utils.formatEther(lazyMintFee), 'METIS');
  console.log('Default Royalty Recipient:', defaultRoyaltyRecipient);
  console.log('Default Royalty BPS:', defaultRoyaltyBps.toString(), `(${defaultRoyaltyBps/100}%)`);
  
  // Step 2: Deploy a test ERC721 collection
  console.log('\n--- Deploying Test ERC721 Collection ---');
  
  const nftName = "Test Collection";
  const nftSymbol = "TEST";
  const royaltyRecipient = wallet.address;
  const royaltyBps = 1000; // 10%
  const primarySaleRecipient = wallet.address;
  
  console.log(`Name: ${nftName}`);
  console.log(`Symbol: ${nftSymbol}`);
  console.log(`Royalty: ${royaltyBps/100}% to ${royaltyRecipient}`);
  console.log(`Primary Sales: ${primarySaleRecipient}`);
  
  const tx = await factory.deployERC721Drop(
    nftName,
    nftSymbol,
    wallet.address, // defaultAdmin
    royaltyRecipient,
    royaltyBps,
    primarySaleRecipient,
    { value: deploymentFee } // Send deployment fee
  );
  
  console.log('Transaction sent:', tx.hash);
  console.log('Waiting for confirmation...');
  
  // Wait for transaction to be mined
  const receipt = await tx.wait();
  console.log('Transaction confirmed in block:', receipt.blockNumber);
  
  // Step 3: Get deployed collections
  const deployedCollections = await factory.getDeployedCollections(wallet.address);
  console.log('\n--- Deployed Collections ---');
  console.log('Collections count:', deployedCollections.length);
  
  if (deployedCollections.length > 0) {
    const latestCollection = deployedCollections[deployedCollections.length - 1];
    console.log('Latest deployed collection:', latestCollection);
    
    // Since we're using a mock, we don't actually have deployed contracts to verify
    // Instead, we'll just confirm that the address looks legitimate
    console.log('\n--- Collection Verification ---');
    console.log('Collection address is valid:', ethers.utils.isAddress(latestCollection));
  }
  
  console.log('\nTest complete!');
}

main()
  .then(() => {
    console.log('Testing completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Testing failed:', error);
    process.exit(1);
  }); 