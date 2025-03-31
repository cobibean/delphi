// Script to deploy the SimpleNFTFactory contract
const { ethers } = require('ethers');
require('dotenv').config();

async function main() {
  // Connect to the network
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  
  console.log('Deploying SimpleNFTFactory contract...');
  console.log('Deployer address:', wallet.address);
  
  // Compile the contract first
  console.log('Compiling contract...');
  const { execSync } = require('child_process');
  execSync('npx hardhat compile', { stdio: 'inherit' });
  
  // Load the compiled contract
  const NFTFactory = require('../artifacts/src/contracts/SimpleNFTFactory.sol/SimpleNFTFactory.json');
  
  // Deploy with constructor parameters
  const deploymentFee = ethers.utils.parseEther('0.01'); // 0.01 METIS deployment fee
  const lazyMintFee = ethers.utils.parseEther('0.001'); // 0.001 METIS per lazy mint
  const defaultRoyaltyRecipient = wallet.address; // Set deployer as default royalty recipient
  const defaultRoyaltyBps = 500; // 5% royalty by default
  
  // Create contract factory
  const factory = new ethers.ContractFactory(
    NFTFactory.abi,
    NFTFactory.bytecode,
    wallet
  );
  
  // Deploy contract
  console.log('Deploying with parameters:');
  console.log('- Deployment Fee:', ethers.utils.formatEther(deploymentFee), 'METIS');
  console.log('- Lazy Mint Fee:', ethers.utils.formatEther(lazyMintFee), 'METIS');
  console.log('- Default Royalty Recipient:', defaultRoyaltyRecipient);
  console.log('- Default Royalty BPS:', defaultRoyaltyBps, `(${defaultRoyaltyBps/100}%)`);
  
  const deployTx = await factory.deploy(
    deploymentFee,
    lazyMintFee,
    defaultRoyaltyRecipient,
    defaultRoyaltyBps
  );
  
  // Wait for deployment to complete
  console.log('Transaction sent:', deployTx.deployTransaction.hash);
  console.log('Waiting for confirmation...');
  await deployTx.deployed();
  console.log('SimpleNFTFactory deployed to:', deployTx.address);
  
  console.log('');
  console.log('Run this to verify:');
  console.log(`npx hardhat verify --network metissepolia ${deployTx.address} ${deploymentFee} ${lazyMintFee} ${defaultRoyaltyRecipient} ${defaultRoyaltyBps}`);
  
  // Save to .env file
  const fs = require('fs');
  let envContent = '';
  try {
    envContent = fs.readFileSync('.env', 'utf8');
  } catch (err) {
    // File doesn't exist, start with empty content
  }
  
  // Set the factory address
  if (envContent.includes('FACTORY_ADDRESS=')) {
    envContent = envContent.replace(/FACTORY_ADDRESS=.*/, `FACTORY_ADDRESS=${deployTx.address}`);
  } else {
    envContent += `\nFACTORY_ADDRESS=${deployTx.address}`;
  }
  
  fs.writeFileSync('.env', envContent);
  console.log('Updated .env file with FACTORY_ADDRESS');
  
  return deployTx.address;
}

main()
  .then((address) => {
    console.log('Deployment successful!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Deployment failed:', error);
    process.exit(1);
  }); 