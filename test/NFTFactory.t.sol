// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../src/app/constants/NFTFactory.sol";

/**
 * @title NFTFactoryTest
 * @notice Comprehensive test suite for the NFT Factory contract
 * @dev Tests constructor, deployment functionality, and admin functions
 */
contract NFTFactoryTest is Test {
    NFTFactory factory;
    
    // Test accounts
    address owner = address(1);
    address user1 = address(2);
    address user2 = address(3);
    address feeRecipient = address(4);
    
    // Initial parameters
    uint256 deploymentFee = 0.01 ether;
    uint16 defaultRoyaltyBps = 500; // 5%
    
    // Events to test against
    event ERC721DropDeployed(
        address indexed deployer,
        address indexed dropAddress,
        string name,
        string symbol,
        uint256 feePaid
    );
    
    event ERC1155DropDeployed(
        address indexed deployer,
        address indexed dropAddress,
        string name,
        string symbol,
        uint256 feePaid
    );
    
    event DeploymentFeeUpdated(uint256 oldFee, uint256 newFee);
    
    event DefaultRoyaltyInfoUpdated(address recipient, uint16 bps);
    
    event FeesWithdrawn(address indexed owner, uint256 amount);
    
    /**
     * @notice Set up the test environment before each test
     */
    function setUp() public {
        vm.startPrank(owner);
        factory = new NFTFactory(
            deploymentFee,
            feeRecipient,
            defaultRoyaltyBps
        );
        vm.stopPrank();
    }
    
    // ========== CONSTRUCTOR TESTS ==========
    
    /**
     * @notice Test constructor with valid parameters
     */
    function testConstructor() public {
        assertEq(factory.deploymentFee(), deploymentFee);
        assertEq(factory.defaultRoyaltyRecipient(), feeRecipient);
        assertEq(factory.defaultRoyaltyBps(), defaultRoyaltyBps);
        assertEq(factory.owner(), owner);
    }
    
    /**
     * @notice Test constructor with invalid royalty basis points
     */
    function testConstructorInvalidRoyaltyBps() public {
        uint16 invalidRoyaltyBps = 10001; // More than 100%
        
        vm.startPrank(owner);
        vm.expectRevert("Royalty bps exceeds maximum (10000 = 100%)");
        new NFTFactory(
            deploymentFee,
            feeRecipient,
            invalidRoyaltyBps
        );
        vm.stopPrank();
    }
    
    /**
     * @notice Test constructor with zero address for royalty recipient
     */
    function testConstructorZeroRoyaltyRecipient() public {
        vm.startPrank(owner);
        vm.expectRevert("Royalty recipient cannot be zero address");
        new NFTFactory(
            deploymentFee,
            address(0),
            defaultRoyaltyBps
        );
        vm.stopPrank();
    }
    
    // ========== ERC721 DEPLOYMENT TESTS ==========
    
    /**
     * @notice Test successful ERC721Drop deployment
     */
    function testDeployERC721Drop() public {
        vm.startPrank(user1);
        vm.deal(user1, 1 ether); // Give user1 some ETH
        
        string memory name = "Test Collection";
        string memory symbol = "TEST";
        address defaultAdmin = user1;
        address royaltyRecipient = address(0); // Use default
        uint16 royaltyBps = 500;
        address primarySaleRecipient = user1;
        
        // Expect the ERC721DropDeployed event to be emitted
        vm.expectEmit(true, true, false, false);
        emit ERC721DropDeployed(
            user1,
            address(0), // We don't know the address yet
            name,
            symbol,
            deploymentFee
        );
        
        address dropAddress = factory.deployERC721Drop{value: deploymentFee}(
            name,
            symbol,
            defaultAdmin,
            royaltyRecipient,
            royaltyBps,
            primarySaleRecipient
        );
        
        vm.stopPrank();
        
        // Verify deployment record keeping
        assertTrue(factory.isFactoryDeployed(dropAddress));
        
        // Verify collection is recorded for the user
        address[] memory collections = factory.getDeployedCollections(user1);
        assertEq(collections.length, 1);
        assertEq(collections[0], dropAddress);
        
        // Verify fee collection
        assertEq(address(factory).balance, deploymentFee);
    }
    
    /**
     * @notice Test ERC721Drop deployment with insufficient fee
     */
    function testDeployERC721DropInsufficientFee() public {
        vm.startPrank(user1);
        vm.deal(user1, 1 ether); // Give user1 some ETH
        
        string memory name = "Test Collection";
        string memory symbol = "TEST";
        address defaultAdmin = user1;
        address royaltyRecipient = address(0);
        uint16 royaltyBps = 500;
        address primarySaleRecipient = user1;
        
        uint256 insufficientFee = deploymentFee - 0.001 ether;
        
        vm.expectRevert("Incorrect deployment fee");
        factory.deployERC721Drop{value: insufficientFee}(
            name,
            symbol,
            defaultAdmin,
            royaltyRecipient,
            royaltyBps,
            primarySaleRecipient
        );
        
        vm.stopPrank();
    }
    
    /**
     * @notice Test ERC721Drop deployment with empty name
     */
    function testDeployERC721DropEmptyName() public {
        vm.startPrank(user1);
        vm.deal(user1, 1 ether);
        
        string memory name = "";
        string memory symbol = "TEST";
        address defaultAdmin = user1;
        address royaltyRecipient = address(0);
        uint16 royaltyBps = 500;
        address primarySaleRecipient = user1;
        
        vm.expectRevert("Name cannot be empty");
        factory.deployERC721Drop{value: deploymentFee}(
            name,
            symbol,
            defaultAdmin,
            royaltyRecipient,
            royaltyBps,
            primarySaleRecipient
        );
        
        vm.stopPrank();
    }
    
    /**
     * @notice Test ERC721Drop deployment with empty symbol
     */
    function testDeployERC721DropEmptySymbol() public {
        vm.startPrank(user1);
        vm.deal(user1, 1 ether);
        
        string memory name = "Test Collection";
        string memory symbol = "";
        address defaultAdmin = user1;
        address royaltyRecipient = address(0);
        uint16 royaltyBps = 500;
        address primarySaleRecipient = user1;
        
        vm.expectRevert("Symbol cannot be empty");
        factory.deployERC721Drop{value: deploymentFee}(
            name,
            symbol,
            defaultAdmin,
            royaltyRecipient,
            royaltyBps,
            primarySaleRecipient
        );
        
        vm.stopPrank();
    }
    
    /**
     * @notice Test ERC721Drop deployment with excessive royalty
     */
    function testDeployERC721DropExcessiveRoyalty() public {
        vm.startPrank(user1);
        vm.deal(user1, 1 ether);
        
        string memory name = "Test Collection";
        string memory symbol = "TEST";
        address defaultAdmin = user1;
        address royaltyRecipient = address(0);
        uint16 royaltyBps = 10001; // More than 100%
        address primarySaleRecipient = user1;
        
        vm.expectRevert("Royalty bps exceeds maximum (10000 = 100%)");
        factory.deployERC721Drop{value: deploymentFee}(
            name,
            symbol,
            defaultAdmin,
            royaltyRecipient,
            royaltyBps,
            primarySaleRecipient
        );
        
        vm.stopPrank();
    }
    
    // ========== ERC1155 DEPLOYMENT TESTS ==========
    
    /**
     * @notice Test successful ERC1155Drop deployment
     */
    function testDeployERC1155Drop() public {
        vm.startPrank(user1);
        vm.deal(user1, 1 ether); // Give user1 some ETH
        
        string memory name = "Test Collection";
        string memory symbol = "TEST";
        address defaultAdmin = user1;
        address royaltyRecipient = address(0); // Use default
        uint16 royaltyBps = 500;
        address primarySaleRecipient = user1;
        
        // Expect the ERC1155DropDeployed event to be emitted
        vm.expectEmit(true, true, false, false);
        emit ERC1155DropDeployed(
            user1,
            address(0), // We don't know the address yet
            name,
            symbol,
            deploymentFee
        );
        
        address dropAddress = factory.deployERC1155Drop{value: deploymentFee}(
            name,
            symbol,
            defaultAdmin,
            royaltyRecipient,
            royaltyBps,
            primarySaleRecipient
        );
        
        vm.stopPrank();
        
        // Verify deployment record keeping
        assertTrue(factory.isFactoryDeployed(dropAddress));
        
        // Verify collection is recorded for the user
        address[] memory collections = factory.getDeployedCollections(user1);
        assertEq(collections.length, 1);
        assertEq(collections[0], dropAddress);
        
        // Verify fee collection
        assertEq(address(factory).balance, deploymentFee);
    }
    
    // ========== ADMIN FUNCTION TESTS ==========
    
    /**
     * @notice Test setDeploymentFee as owner
     */
    function testSetDeploymentFee() public {
        uint256 newFee = 0.02 ether;
        
        vm.startPrank(owner);
        
        // Expect the DeploymentFeeUpdated event to be emitted
        vm.expectEmit(false, false, false, true);
        emit DeploymentFeeUpdated(deploymentFee, newFee);
        
        factory.setDeploymentFee(newFee);
        vm.stopPrank();
        
        assertEq(factory.deploymentFee(), newFee);
    }
    
    /**
     * @notice Test setDeploymentFee as non-owner (should fail)
     */
    function testSetDeploymentFeeNonOwner() public {
        uint256 newFee = 0.02 ether;
        
        vm.startPrank(user1);
        vm.expectRevert();
        factory.setDeploymentFee(newFee);
        vm.stopPrank();
        
        assertEq(factory.deploymentFee(), deploymentFee);
    }
    
    /**
     * @notice Test setDefaultRoyaltyInfo as owner
     */
    function testSetDefaultRoyaltyInfo() public {
        address newRecipient = address(5);
        uint16 newBps = 1000; // 10%
        
        vm.startPrank(owner);
        
        // Expect the DefaultRoyaltyInfoUpdated event to be emitted
        vm.expectEmit(false, false, false, true);
        emit DefaultRoyaltyInfoUpdated(newRecipient, newBps);
        
        factory.setDefaultRoyaltyInfo(newRecipient, newBps);
        vm.stopPrank();
        
        assertEq(factory.defaultRoyaltyRecipient(), newRecipient);
        assertEq(factory.defaultRoyaltyBps(), newBps);
    }
    
    /**
     * @notice Test setDefaultRoyaltyInfo with invalid params
     */
    function testSetDefaultRoyaltyInfoInvalidParams() public {
        address newRecipient = address(0);
        uint16 newBps = 1000;
        
        vm.startPrank(owner);
        vm.expectRevert("Royalty recipient cannot be zero address");
        factory.setDefaultRoyaltyInfo(newRecipient, newBps);
        
        newRecipient = address(5);
        newBps = 10001; // More than 100%
        
        vm.expectRevert("Royalty bps exceeds maximum (10000 = 100%)");
        factory.setDefaultRoyaltyInfo(newRecipient, newBps);
        vm.stopPrank();
    }
    
    /**
     * @notice Test withdrawFees as owner
     */
    function testWithdrawFees() public {
        // First deploy a collection to get some fees
        vm.startPrank(user1);
        vm.deal(user1, 1 ether);
        
        factory.deployERC721Drop{value: deploymentFee}(
            "Test Collection",
            "TEST",
            user1,
            address(0),
            500,
            user1
        );
        
        vm.stopPrank();
        
        // Verify fees are in the contract
        assertEq(address(factory).balance, deploymentFee);
        
        uint256 ownerBalanceBefore = address(owner).balance;
        
        // Withdraw fees as owner
        vm.startPrank(owner);
        
        // Expect the FeesWithdrawn event to be emitted
        vm.expectEmit(true, false, false, true);
        emit FeesWithdrawn(owner, deploymentFee);
        
        factory.withdrawFees();
        vm.stopPrank();
        
        // Verify fees were transferred to owner
        assertEq(address(factory).balance, 0);
        assertEq(address(owner).balance, ownerBalanceBefore + deploymentFee);
    }
    
    /**
     * @notice Test withdrawFees with no fees
     */
    function testWithdrawFeesNoFees() public {
        vm.startPrank(owner);
        vm.expectRevert("No fees to withdraw");
        factory.withdrawFees();
        vm.stopPrank();
    }
    
    /**
     * @notice Test pause/unpause functionality as owner
     */
    function testPauseUnpause() public {
        vm.startPrank(owner);
        
        // Initially not paused
        assertEq(factory.paused(), false);
        
        // Pause the contract
        factory.pause();
        assertEq(factory.paused(), true);
        
        // Unpause the contract
        factory.unpause();
        assertEq(factory.paused(), false);
        
        vm.stopPrank();
    }
    
    /**
     * @notice Test that deployments are rejected when contract is paused
     */
    function testDeploymentWhenPaused() public {
        // Pause the contract
        vm.startPrank(owner);
        factory.pause();
        vm.stopPrank();
        
        // Try to deploy while paused
        vm.startPrank(user1);
        vm.deal(user1, 1 ether);
        
        vm.expectRevert("Pausable: paused");
        factory.deployERC721Drop{value: deploymentFee}(
            "Test Collection",
            "TEST",
            user1,
            address(0),
            500,
            user1
        );
        
        vm.stopPrank();
    }
    
    /**
     * @notice Test that estimateFee returns the current deployment fee
     */
    function testEstimateFee() public {
        assertEq(factory.estimateFee(), deploymentFee);
        
        // Update the fee and check again
        vm.startPrank(owner);
        uint256 newFee = 0.02 ether;
        factory.setDeploymentFee(newFee);
        vm.stopPrank();
        
        assertEq(factory.estimateFee(), newFee);
    }
    
    /**
     * @notice Test that multiple deployments are tracked correctly
     */
    function testMultipleDeployments() public {
        vm.startPrank(user1);
        vm.deal(user1, 2 ether);
        
        // Deploy first collection
        address drop1 = factory.deployERC721Drop{value: deploymentFee}(
            "Collection 1",
            "ONE",
            user1,
            address(0),
            500,
            user1
        );
        
        // Deploy second collection
        address drop2 = factory.deployERC1155Drop{value: deploymentFee}(
            "Collection 2",
            "TWO",
            user1,
            address(0),
            500,
            user1
        );
        
        vm.stopPrank();
        
        // Verify both collections are recorded
        address[] memory collections = factory.getDeployedCollections(user1);
        assertEq(collections.length, 2);
        assertEq(collections[0], drop1);
        assertEq(collections[1], drop2);
        
        // Verify isFactoryDeployed works for both
        assertTrue(factory.isFactoryDeployed(drop1));
        assertTrue(factory.isFactoryDeployed(drop2));
        assertFalse(factory.isFactoryDeployed(address(0xdead)));
        
        // Verify fees were collected
        assertEq(address(factory).balance, deploymentFee * 2);
    }
} 