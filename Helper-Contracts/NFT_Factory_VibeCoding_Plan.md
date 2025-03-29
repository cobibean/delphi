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
| `updateOwner(address newOwner)`      | Transfer ownership of the factory contract |
| `isDeployedByFactory(address)`       | Check if address was deployed by our factory |
| `emitEventsOnDeploy`                 | Events for UI indexers or frontends |

### Could-Have Functions
| Function                             | Description |
|--------------------------------------|-------------|
| `estimateFee(contractType)`          | Calculate dynamic fees based on contract type |
| `setDefaultRoyaltyInfo()`            | Set default royalty info for new collections |
| `pause()` / `unpause()`              | Emergency control |

---

## 3. Parameters for NFT Deployments

These are inputs users will provide when creating a collection from the frontend:

### For ERC721Drop:
- `name`: Collection name
- `symbol`: Token symbol
- `defaultAdmin`: Address with admin privileges (usually caller)
- `royaltyRecipient`: Address for royalty payout
- `royaltyBps`: % of royalties (in basis points)
- `primarySaleRecipient`: Address to receive funds from primary sales

### For ERC1155Drop:
- `name`: Collection name
- `symbol`: Token symbol
- `defaultAdmin`: Address with admin privileges (usually caller)
- `royaltyRecipient`: Address for royalty payout
- `royaltyBps`: % of royalties (in basis points)
- `primarySaleRecipient`: Address to receive funds from primary sales

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
- Test isDeployedByFactory correctly identifies contracts

#### 6. Integration Tests
- Test full workflow from deployment to minting
- Test interactions with deployed contracts

### Fuzz Testing
- Implement fuzz tests with randomized inputs to find edge cases

### Gas Optimization
- Measure gas usage for contract deployments
- Optimize factory contract for gas efficiency

### Deployment Script
- Create scripts for deploying to testnet and mainnet
- Include verification steps

---

## 6. Development Timeline

1. **Day 1 (Tonight):**
   - Set up Foundry project
   - Import ThirdWeb contracts
   - Implement NFTFactory contract
   - Write basic tests
   - Deploy to testnet

2. **Day 2 (Tomorrow):**
   - Develop UI components
   - Connect UI to deployed factory
   - Implement form validation
   - Test complete user flow
   - Deploy to production

---

## Vibe-Coding Rules
- No tutorials
- Trust your gut (but test EVERYTHING)
- Use Foundry for comprehensive testing
- Ask questions if stuck

---

Let's go.

