# NFT Factory Contract Testing Plan

## Overview

This plan outlines a comprehensive testing strategy for our NFT Factory contract, focusing on backend tests to ensure the contract functions as expected before integrating with the frontend. The testing will cover contract deployment, functionality verification, and edge cases.

## Testing Goals

1. Verify correct deployment of the NFT Factory contract
2. Test all contract functions to ensure proper behavior
3. Validate the user flow from NFT creation to listing
4. Ensure post-deployment management functions work correctly
5. Test error handling and edge cases

## Testing Environment

We'll use Foundry for Solidity testing and Hardhat for TypeScript-based testing:

- **Foundry**: For comprehensive Solidity-based unit and integration tests
- **Hardhat**: For TypeScript-based tests that simulate real-world interactions

## Test Structure

### 1. Unit Tests (Foundry)

#### 1.1 Factory Deployment Tests
- Test constructor parameters validation
- Verify initial state (owner, fee, royalty settings)
- Test ownership and access control

#### 1.2 ERC721Drop Deployment Tests
- Test successful deployment with valid parameters
- Verify deployment fee collection
- Validate collection parameters are set correctly
- Test record keeping (deployedCollections, isFactoryDeployed)
- Test event emission (ERC721DropDeployed)

#### 1.3 ERC1155Drop Deployment Tests
- Same tests as ERC721Drop but for ERC1155Drop contract

#### 1.4 Administrative Function Tests
- Test setDeploymentFee (authorization, validation, events)
- Test setDefaultRoyaltyInfo (authorization, validation, events)
- Test withdrawFees (authorization, amount, events)
- Test pause/unpause (authorization, state change)

#### 1.5 Query Function Tests
- Test getDeployedCollections
- Test estimateFee
- Test isFactoryDeployed

### 2. Integration Tests (Foundry)

#### 2.1 End-to-End ERC721 Flow
- Deploy factory
- Deploy ERC721Drop
- Lazy mint an NFT
- Set claim conditions
- Claim NFT
- List NFT on marketplace

#### 2.2 End-to-End ERC1155 Flow
- Deploy factory
- Deploy ERC1155Drop
- Lazy mint multiple NFTs
- Set claim conditions
- Claim NFT
- List NFT on marketplace

#### 2.3 Post-Deployment Management
- Test updating collection metadata
- Test updating royalty information
- Test multiple claim phases
- Test batch minting

### 3. Fuzz Testing (Foundry)

- Test with randomized inputs to find edge cases
- Test with malicious inputs to verify security measures
- Test with boundary values to validate constraints

### 4. Gas Optimization Analysis

- Measure gas usage for contract deployments
- Identify potential gas optimization opportunities
- Compare gas usage with benchmarks

### 5. Security Tests

- Test reentrancy protection
- Test input validation
- Test access control mechanisms
- Test fee collection and withdrawal security

## Test Implementation

### Foundry Test File Structure

```
test/
├── NFTFactory.t.sol           # Main factory unit tests
├── ERC721Integration.t.sol    # ERC721 integration tests
├── ERC1155Integration.t.sol   # ERC1155 integration tests
├── AdminFunctions.t.sol       # Administrative function tests  
├── Security.t.sol             # Security-focused tests
└── utils/
    ├── TestHelpers.sol        # Test utilities
    └── Mocks.sol              # Mock contracts
```

### Sample Unit Test (Foundry)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../src/NFTFactory.sol";

contract NFTFactoryTest is Test {
    NFTFactory factory;
    address owner = address(1);
    address user1 = address(2);
    address user2 = address(3);
    address feeRecipient = address(4);
    
    uint256 deploymentFee = 0.01 ether;
    uint16 defaultRoyaltyBps = 500; // 5%
    
    function setUp() public {
        vm.startPrank(owner);
        factory = new NFTFactory(
            deploymentFee,
            feeRecipient,
            defaultRoyaltyBps
        );
        vm.stopPrank();
    }
    
    function testDeployERC721Drop() public {
        vm.startPrank(user1);
        vm.deal(user1, 1 ether); // Give user1 some ETH
        
        string memory name = "Test Collection";
        string memory symbol = "TEST";
        address defaultAdmin = user1;
        address royaltyRecipient = address(0); // Use default
        uint16 royaltyBps = 500;
        address primarySaleRecipient = user1;
        
        address dropAddress = factory.deployERC721Drop{value: deploymentFee}(
            name,
            symbol,
            defaultAdmin,
            royaltyRecipient,
            royaltyBps,
            primarySaleRecipient
        );
        
        vm.stopPrank();
        
        // Verify deployment
        assertTrue(factory.isFactoryDeployed(dropAddress));
        
        // Verify collection is recorded for the user
        address[] memory collections = factory.getDeployedCollections(user1);
        assertEq(collections.length, 1);
        assertEq(collections[0], dropAddress);
        
        // Verify fee collection
        assertEq(address(factory).balance, deploymentFee);
    }
    
    // More tests...
}
```

## Specific Test Cases

### Factory Deployment

1. Test with valid parameters
2. Test with invalid parameters (zero address, excessive royalty)
3. Test with zero deployment fee

### ERC721/ERC1155 Deployment

1. Test with all parameters provided
2. Test with minimal parameters (using defaults)
3. Test with insufficient fee
4. Test with empty name/symbol
5. Test with excessive royalty bps

### Admin Functions

1. Test setDeploymentFee as owner
2. Test setDeploymentFee as non-owner (should fail)
3. Test withdrawFees as owner
4. Test withdrawFees as non-owner (should fail)
5. Test with zero balance withdrawal

### Post-Deployment Management

1. Test lazily minting NFTs to deployed contract
2. Test setting claim conditions with various parameters
3. Test updating metadata
4. Test delayed reveals

## Environment Variables

The tests will use the following environment variables:
- `FACTORY_ADDRESS`: The deployed factory contract address
- `FEE_RECIPIENT`: The address to receive deployment fees

## Timeline

1. **Day 1**: Set up test environment and implement basic unit tests
2. **Day 2**: Implement integration tests and fuzz tests
3. **Day 3**: Implement security tests and gas optimization analysis
4. **Day 4**: Review and refine test coverage, fix any issues
5. **Day 5**: Document test results and prepare for frontend integration

## Execution Strategy

1. Run unit tests first to verify basic functionality
2. Run integration tests to verify end-to-end flows
3. Run fuzz tests to catch edge cases
4. Run security tests to validate security measures
5. Run gas optimization analysis to identify improvement opportunities

## Success Criteria

1. All tests pass
2. 100% function coverage
3. >95% line coverage
4. No critical security issues
5. Gas usage within acceptable limits

## Continuous Integration

Tests will be integrated into CI/CD pipeline to ensure:
1. All tests pass on every commit
2. No regression is introduced
3. Coverage maintains or improves with changes

## Conclusion

This testing plan provides a comprehensive approach to validating the NFT Factory contract. By focusing on backend tests before frontend integration, we can ensure the contract functionality is solid before users interact with it. 