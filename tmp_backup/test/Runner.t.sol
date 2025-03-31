// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "./NFTFactory.t.sol";
import "./ERC721Integration.t.sol";
import "./Security.t.sol";

/**
 * @title TestRunner
 * @notice Runs all test suites for the NFT Factory contract
 * @dev Use this as the main entry point for running all tests
 */
contract TestRunner is Test {
    function testRunAll() public {
        // Create and run NFTFactoryTest suite
        NFTFactoryTest factoryTests = new NFTFactoryTest();
        factoryTests.setUp();
        factoryTests.testConstructor();
        factoryTests.testConstructorInvalidRoyaltyBps();
        factoryTests.testConstructorZeroRoyaltyRecipient();
        factoryTests.testDeployERC721Drop();
        factoryTests.testDeployERC721DropInsufficientFee();
        factoryTests.testDeployERC721DropEmptyName();
        factoryTests.testDeployERC721DropEmptySymbol();
        factoryTests.testDeployERC721DropExcessiveRoyalty();
        factoryTests.testDeployERC1155Drop();
        factoryTests.testSetDeploymentFee();
        factoryTests.testSetDeploymentFeeNonOwner();
        factoryTests.testSetDefaultRoyaltyInfo();
        factoryTests.testSetDefaultRoyaltyInfoInvalidParams();
        factoryTests.testWithdrawFees();
        factoryTests.testWithdrawFeesNoFees();
        factoryTests.testPauseUnpause();
        factoryTests.testDeploymentWhenPaused();
        factoryTests.testEstimateFee();
        factoryTests.testMultipleDeployments();
        
        console.log("");
        console.log("✅ NFTFactoryTest completed successfully");
        
        // Create and run ERC721IntegrationTest suite
        ERC721IntegrationTest integrationTests = new ERC721IntegrationTest();
        integrationTests.setUp();
        integrationTests.testDeployedCollectionProperties();
        integrationTests.testLazyMint();
        integrationTests.testClaimNFT();
        integrationTests.testRoyaltyInfo();
        integrationTests.testFullUserFlow();
        
        console.log("");
        console.log("✅ ERC721IntegrationTest completed successfully");
        
        // Create and run SecurityTest suite
        SecurityTest securityTests = new SecurityTest();
        securityTests.setUp();
        securityTests.testReentrancyProtection();
        securityTests.testAccessControl();
        securityTests.testInputValidation();
        securityTests.testFeeHandlingSecurity();
        securityTests.testFeePaymentSecurity();
        securityTests.testPauseSecurityFeature();
        securityTests.testOwnershipTransferSecurity();
        
        console.log("");
        console.log("✅ SecurityTest completed successfully");
        
        console.log("");
        console.log("🎉 All tests completed successfully!");
    }
} 