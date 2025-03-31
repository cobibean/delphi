# NFT Factory Vibe Coding Plan

Welcome to the vibe-coding plan for building an NFT Factory Contract with a frontend for post-deployment management. This markdown doc outlines the entire strategy, components, and considerations for building a factory system that deploys ThirdWeb's ERC-721Drop and ERC-1155Drop contracts.

---

## Goal
Create an on-chain NFT Factory smart contract that can:
- Deploy ThirdWeb's ERC-721Drop or ERC-1155Drop contracts
- Accept parameters to customize the new collection
- Deploy the new collection under the caller's control
- Charge a deployment fee (in native token)
- Offer a UI for users to manage their deployed contracts

---

## 1. Contract Sources: ThirdWeb Drop Contracts

Instead of building our own implementation, we'll leverage ThirdWeb's audited contracts:

### Contract Sources:
- ERC721 base: `ThirdWeb ERC721Drop.sol` 
  - URL: https://github.com/thirdweb-dev/contracts/blob/main/contracts/base/ERC721Drop.sol
- ERC1155 base: `ThirdWeb ERC1155Drop.sol`
  - URL: https://github.com/thirdweb-dev/contracts/blob/main/contracts/base/ERC1155Drop.sol
- Required ThirdWeb dependencies

**Strategy:**
- Create our factory contract that will deploy these contracts directly
- Store deployed contract references for UI interaction

---

## 2. Define Required Functions

### Must-Have Functions
| Function                             | Description |
|--------------------------------------|-------------|
| `deployERC721Drop(params)`           | Deploys a new ERC721Drop contract with custom params |
| `deployERC1155Drop(params)`          | Deploys a new ERC1155Drop contract |
| `setDeploymentFee(uint256 fee)`      | Owner can set deployment fee |
| `withdrawFees()`                     | Withdraw native token fees |
| `getDeployedCollections(address)`    | Get list of collections deployed by a user |

### Should-Have Functions
| Function                             | Description |
|--------------------------------------|-------------|
| `transferOwnership(address newOwner)`| Transfer ownership of the factory contract |
| `isFactoryDeployed(address)`         | Check if address was deployed by this factory |
| `Events for tracking`                | Events for UI indexers or frontends |

### Could-Have Functions
| Function                             | Description |
|--------------------------------------|-------------|
| `estimateFee()`                      | Get current deployment fee |
| `setDefaultRoyaltyInfo()`            | Set default royalty info for new collections |
| `pause()` / `unpause()`              | Emergency control |

**Implementation Status:** ✅ All functions implemented in NFTFactory.sol

---

## 3. Parameters for NFT Deployments

These are inputs users will provide when creating a collection from the frontend:

### For ERC721Drop and ERC1155Drop (Updated March 2025):
- `name`: Collection name [string, required]
- `symbol`: Token symbol [string, required]
- `defaultAdmin`: Address with admin privileges (usually caller) [address, required]
- `royaltyRecipient`: Address for royalty payout [address, optional]
- `royaltyBps`: % of royalties in basis points (0-10000) [uint16, required]
- `primarySaleRecipient`: Address to receive funds from primary sales [address, optional]

**Contract Constructor Order (Updated March 2025):**
```solidity
ERC721Drop(
    defaultAdmin,  // Admin comes first in ThirdWeb's newest contracts
    name,
    symbol,
    royaltyRecipient,
    royaltyBps,
    primarySaleRecipient
)
```

**Validation Rules Added:**
- Name and symbol cannot be empty
- Royalty BPS must be <= 10000 (100%)
- Default admin cannot be zero address
- Default values provided if optional parameters are not specified

---

## 4. Post-Deployment UI Plan

UI will be built to:
- Let user deploy collection via form
- Display their past deployments
- Allow interfacing with deployed contracts to:
  - Lazy mint NFTs
  - Set claim conditions
  - Update contract metadata
  - Withdraw funds

We can use:
- Ethers.js or Viem for interacting
- Shadcn/Tailwind for UI
- Store collection addresses in a backend DB or index via events

---

## 5. Foundry Testing Plan

We'll use Foundry for comprehensive testing of our factory contract:

### Test Setup
- Create a `/test` directory in our Foundry project
- Use Forge Standard Library (forge-std) for enhanced testing capabilities
- Set up fixtures for common test scenarios

### Test Coverage

#### 1. Factory Deployment
- Test factory contract deployment
- Verify owner is set correctly
- Verify initial deployment fee is set

#### 2. ERC721Drop Deployment
- Test successful deployment with valid parameters
- Verify deployment fees are collected
- Verify ownership is correctly transferred to caller
- Test deployment with insufficient fees
- Test deployment with invalid parameters

#### 3. ERC1155Drop Deployment
- Similar tests as for ERC721Drop

#### 4. Admin Functions
- Test fee updates
- Test fee withdrawal
- Test ownership transfer
- Test pause/unpause functionality

#### 5. Record Keeping
- Test getDeployedCollections returns correct addresses
- Test isFactoryDeployed correctly identifies contracts

#### 6. Integration Tests
- Test full workflow from deployment to minting
- Test interactions with deployed contracts

### Fuzz Testing
- Implement fuzz tests with randomized inputs to find edge cases

### Gas Optimization
- Measure gas usage for contract deployments
- Optimize factory contract for gas efficiency

### Security Considerations (Added)
- Input validation for all parameters
- ReentrancyGuard for financial functions
- Owner-only access control for critical functions
- Pausable functionality for emergency scenarios

---

## 6. Deployment Plan



### 6.2 Direct Ethers.js Deployment (New)

We'll use ethers.js for direct deployment from our application or a deployment script:

#### Setup and Dependencies
```javascript
// Install required packages
// npm install ethers @openzeppelin/contracts @thirdweb-dev/contracts
```

#### Deployment Script
```javascript
import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';

// Load environment variables
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_URL = process.env.RPC_URL; // Metis Sepolia RPC URL for testnet
const DEPLOYMENT_FEE = ethers.parseEther('0.01'); // 0.01 Metis
const DEFAULT_ROYALTY_RECIPIENT = process.env.DEFAULT_ROYALTY_ADDRESS;
const DEFAULT_ROYALTY_BPS = 500; // 5%

async function deployNFTFactory() {
  try {
    // Setup provider and wallet
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    
    console.log(`Deploying from address: ${wallet.address}`);
    
    // Load compiled contract artifacts
    const factoryArtifact = JSON.parse(
      fs.readFileSync(path.resolve('./artifacts/contracts/NFTFactory.sol/NFTFactory.json'), 'utf8')
    );
    
    // Factory contract deployment
    const Factory = new ethers.ContractFactory(
      factoryArtifact.abi,
      factoryArtifact.bytecode,
      wallet
    );
    
    console.log('Deploying NFT Factory...');
    const factory = await Factory.deploy(
      DEPLOYMENT_FEE,
      DEFAULT_ROYALTY_RECIPIENT,
      DEFAULT_ROYALTY_BPS
    );
    
    // Wait for deployment to complete
    await factory.deploymentTransaction().wait();
    console.log(`NFT Factory deployed at: ${await factory.getAddress()}`);
    
    // Verify the contract if on a supported network
    console.log('To verify the contract:');
    console.log(`npx hardhat verify --network metis-sepolia ${await factory.getAddress()} ${DEPLOYMENT_FEE} ${DEFAULT_ROYALTY_RECIPIENT} ${DEFAULT_ROYALTY_BPS}`);
    
    return factory;
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

// Deploy function for frontend integration
export async function deployNFTCollection(
  provider, 
  collectionType, // 'ERC721' or 'ERC1155'
  name,
  symbol,
  defaultAdmin,
  royaltyRecipient,
  royaltyBps,
  primarySaleRecipient,
  factoryAddress
) {
  try {
    // Connect to factory contract
    const signer = await provider.getSigner();
    const factoryAbi = [/* Factory ABI functions */]; // Import from a separate file
    const factory = new ethers.Contract(factoryAddress, factoryAbi, signer);
    
    // Calculate fee
    const fee = await factory.estimateFee();
    
    // Prepare parameters
    const params = [
      name,
      symbol,
      defaultAdmin || await signer.getAddress(),
      royaltyRecipient,
      royaltyBps,
      primarySaleRecipient || await signer.getAddress()
    ];
    
    // Deploy the collection
    const tx = collectionType === 'ERC721' 
      ? await factory.deployERC721Drop(...params, { value: fee })
      : await factory.deployERC1155Drop(...params, { value: fee });
    
    // Wait for transaction to be mined
    const receipt = await tx.wait();
    
    // Parse the event to get the deployed contract address
    const eventData = collectionType === 'ERC721'
      ? factory.interface.parseLog(receipt.logs.find(log => log.topics[0] === factory.interface.getEventTopic('ERC721DropDeployed')))
      : factory.interface.parseLog(receipt.logs.find(log => log.topics[0] === factory.interface.getEventTopic('ERC1155DropDeployed')));
    
    return {
      success: true,
      contractAddress: eventData.args.dropAddress,
      transactionHash: receipt.hash
    };
  } catch (error) {
    console.error('NFT Collection deployment failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Run deployment if script is executed directly
if (require.main === module) {
  deployNFTFactory()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
}
```

### 6.3 Frontend Integration

The frontend will call the `deployNFTCollection` function when a user submits the collection creation form:

```javascript
import { deployNFTCollection } from '@/services/nftFactoryService';

// Collection creation component
function CreateCollection() {
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    royaltyRecipient: '',
    royaltyBps: 500, // 5% default
    primarySaleRecipient: '',
    collectionType: 'ERC721' // or 'ERC1155'
  });
  
  const { provider } = useWeb3Provider();
  const FACTORY_ADDRESS = process.env.NEXT_PUBLIC_NFT_FACTORY_ADDRESS;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDeploying(true);
    
    try {
      const result = await deployNFTCollection(
        provider,
        formData.collectionType,
        formData.name,
        formData.symbol,
        null, // defaultAdmin (will use connected wallet)
        formData.royaltyRecipient,
        formData.royaltyBps,
        formData.primarySaleRecipient,
        FACTORY_ADDRESS
      );
      
      if (result.success) {
        toast.success(`Collection deployed at ${result.contractAddress}`);
        // Navigate to collection management page
        router.push(`/dashboard/collections/${result.contractAddress}`);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Failed to deploy collection');
      console.error(error);
    } finally {
      setDeploying(false);
    }
  };
  
  // ... form JSX
}
```

---

## 7. Development Timeline (Updated)

1. **Day 1 (Complete):**
   - ✅ Set up Foundry project
   - ✅ Import ThirdWeb contracts
   - ✅ Implement NFTFactory contract
   - ✅ Add security features (ReentrancyGuard, input validation)
   - ✅ Update parameter order for 2025 compatibility

2. **Day 2:**
   - Set up ethers.js deployment script
   - Write tests for all contract functions
   - Deploy to Metis Sepolia testnet
   - Verify contract on testnet

3. **Day 3:**
   - Develop UI components
   - Connect UI to deployed factory
   - Implement form validation
   - Test complete user flow

4. **Day 4:**
   - Conduct security audit
   - Final testing on testnet
   - Prepare mainnet deployment

5. **Week 3:**
   - Deploy to Metis Andromeda mainnet
   - Launch feature in production

---

## Deployed Contract Status

| Environment | Chain | Contract Address | Status |
|-------------|-------|------------------|--------|
| Development | Local | -                | 🟢 Ready |
| Testing     | Metis Sepolia | TBD     | 🟡 Pending |
| Production  | Metis Andromeda | TBD   | 🔴 Not Started |

---

## Vibe-Coding Rules
- No tutorials
- Trust your gut (but test EVERYTHING)
- Use Foundry for comprehensive testing
- Ask questions if stuck

---

Let's go.

