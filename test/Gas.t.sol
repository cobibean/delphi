// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../src/app/constants/NFTFactory.sol";

/**
 * @title GasTest
 * @notice Measures gas usage for various operations in the NFT Factory contract
 * @dev Used to identify potential gas optimization opportunities
 */
contract GasTest is Test {
    NFTFactory factory;
    
    // Test accounts
    address owner = address(1);
    address user1 = address(2);
    address user2 = address(3);
    address feeRecipient = address(4);
    
    // Initial parameters
    uint256 deploymentFee = 0.01 ether;
    uint16 defaultRoyaltyBps = 500; // 5%
    
    // Test collection parameters
    string collectionName = "Gas Test Collection";
    string collectionSymbol = "GTC";
    
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
        
        // Fund test accounts
        vm.deal(owner, 10 ether);
        vm.deal(user1, 10 ether);
        vm.deal(user2, 10 ether);
    }
    
    /**
     * @notice Measure gas usage for factory deployment
     */
    function testGasFactoryDeployment() public {
        // Create a new factory and measure gas usage
        uint256 gasBefore = gasleft();
        
        vm.startPrank(owner);
        NFTFactory newFactory = new NFTFactory(
            deploymentFee,
            feeRecipient,
            defaultRoyaltyBps
        );
        vm.stopPrank();
        
        uint256 gasUsed = gasBefore - gasleft();
        console.log("Gas used for factory deployment:", gasUsed);
    }
    
    /**
     * @notice Measure gas usage for ERC721Drop deployment
     */
    function testGasERC721Deployment() public {
        vm.startPrank(user1);
        
        // Measure gas usage
        uint256 gasBefore = gasleft();
        
        address dropAddress = factory.deployERC721Drop{value: deploymentFee}(
            collectionName,
            collectionSymbol,
            user1,
            address(0), // royaltyRecipient (use default)
            1000, // royaltyBps (10%)
            user1 // primarySaleRecipient
        );
        
        uint256 gasUsed = gasBefore - gasleft();
        console.log("Gas used for ERC721Drop deployment:", gasUsed);
        
        vm.stopPrank();
    }
    
    /**
     * @notice Measure gas usage for ERC1155Drop deployment
     */
    function testGasERC1155Deployment() public {
        vm.startPrank(user1);
        
        // Measure gas usage
        uint256 gasBefore = gasleft();
        
        address dropAddress = factory.deployERC1155Drop{value: deploymentFee}(
            collectionName,
            collectionSymbol,
            user1,
            address(0), // royaltyRecipient (use default)
            1000, // royaltyBps (10%)
            user1 // primarySaleRecipient
        );
        
        uint256 gasUsed = gasBefore - gasleft();
        console.log("Gas used for ERC1155Drop deployment:", gasUsed);
        
        vm.stopPrank();
    }
    
    /**
     * @notice Measure gas usage for setDeploymentFee
     */
    function testGasSetDeploymentFee() public {
        vm.startPrank(owner);
        
        // Measure gas usage
        uint256 gasBefore = gasleft();
        
        factory.setDeploymentFee(0.02 ether);
        
        uint256 gasUsed = gasBefore - gasleft();
        console.log("Gas used for setDeploymentFee:", gasUsed);
        
        vm.stopPrank();
    }
    
    /**
     * @notice Measure gas usage for setDefaultRoyaltyInfo
     */
    function testGasSetDefaultRoyaltyInfo() public {
        vm.startPrank(owner);
        
        // Measure gas usage
        uint256 gasBefore = gasleft();
        
        factory.setDefaultRoyaltyInfo(address(5), 1000);
        
        uint256 gasUsed = gasBefore - gasleft();
        console.log("Gas used for setDefaultRoyaltyInfo:", gasUsed);
        
        vm.stopPrank();
    }
    
    /**
     * @notice Measure gas usage for withdrawFees
     */
    function testGasWithdrawFees() public {
        // First deploy a collection to get some fees
        vm.startPrank(user1);
        factory.deployERC721Drop{value: deploymentFee}(
            collectionName,
            collectionSymbol,
            user1,
            address(0),
            1000,
            user1
        );
        vm.stopPrank();
        
        vm.startPrank(owner);
        
        // Measure gas usage
        uint256 gasBefore = gasleft();
        
        factory.withdrawFees();
        
        uint256 gasUsed = gasBefore - gasleft();
        console.log("Gas used for withdrawFees:", gasUsed);
        
        vm.stopPrank();
    }
    
    /**
     * @notice Measure gas usage for pause/unpause
     */
    function testGasPauseUnpause() public {
        vm.startPrank(owner);
        
        // Measure gas usage for pause
        uint256 gasBefore = gasleft();
        
        factory.pause();
        
        uint256 gasUsedPause = gasBefore - gasleft();
        console.log("Gas used for pause:", gasUsedPause);
        
        // Measure gas usage for unpause
        gasBefore = gasleft();
        
        factory.unpause();
        
        uint256 gasUsedUnpause = gasBefore - gasleft();
        console.log("Gas used for unpause:", gasUsedUnpause);
        
        vm.stopPrank();
    }
    
    /**
     * @notice Measure gas usage for getting deployed collections
     */
    function testGasGetDeployedCollections() public {
        // First deploy some collections
        vm.startPrank(user1);
        factory.deployERC721Drop{value: deploymentFee}(
            "Collection 1",
            "ONE",
            user1,
            address(0),
            1000,
            user1
        );
        factory.deployERC721Drop{value: deploymentFee}(
            "Collection 2",
            "TWO",
            user1,
            address(0),
            1000,
            user1
        );
        vm.stopPrank();
        
        // Measure gas usage
        uint256 gasBefore = gasleft();
        
        address[] memory collections = factory.getDeployedCollections(user1);
        
        uint256 gasUsed = gasBefore - gasleft();
        console.log("Gas used for getDeployedCollections:", gasUsed);
        console.log("Number of collections:", collections.length);
    }
    
    /**
     * @notice Compare gas usage for different operation scenarios
     */
    function testGasComparisonReport() public {
        console.log("");
        console.log("======= GAS USAGE COMPARISON REPORT =======");
        console.log("");
        
        // Test factory deployment
        uint256 gasBefore = gasleft();
        vm.startPrank(owner);
        NFTFactory newFactory = new NFTFactory(
            deploymentFee,
            feeRecipient,
            defaultRoyaltyBps
        );
        vm.stopPrank();
        uint256 factoryDeployGas = gasBefore - gasleft();
        
        // Test ERC721 deployment
        vm.startPrank(user1);
        gasBefore = gasleft();
        address drop721 = factory.deployERC721Drop{value: deploymentFee}(
            "Gas Report 721",
            "GR721",
            user1,
            address(0),
            1000,
            user1
        );
        uint256 erc721DeployGas = gasBefore - gasleft();
        vm.stopPrank();
        
        // Test ERC1155 deployment
        vm.startPrank(user1);
        gasBefore = gasleft();
        address drop1155 = factory.deployERC1155Drop{value: deploymentFee}(
            "Gas Report 1155",
            "GR1155",
            user1,
            address(0),
            1000,
            user1
        );
        uint256 erc1155DeployGas = gasBefore - gasleft();
        vm.stopPrank();
        
        // Test admin functions
        vm.startPrank(owner);
        
        gasBefore = gasleft();
        factory.setDeploymentFee(0.02 ether);
        uint256 setFeeGas = gasBefore - gasleft();
        
        gasBefore = gasleft();
        factory.setDefaultRoyaltyInfo(address(5), 1000);
        uint256 setRoyaltyGas = gasBefore - gasleft();
        
        gasBefore = gasleft();
        factory.pause();
        uint256 pauseGas = gasBefore - gasleft();
        
        gasBefore = gasleft();
        factory.unpause();
        uint256 unpauseGas = gasBefore - gasleft();
        
        gasBefore = gasleft();
        factory.withdrawFees();
        uint256 withdrawGas = gasBefore - gasleft();
        
        vm.stopPrank();
        
        // Print the comparison report
        console.log("Factory Deployment Gas:     ", factoryDeployGas);
        console.log("ERC721Drop Deployment Gas:  ", erc721DeployGas);
        console.log("ERC1155Drop Deployment Gas: ", erc1155DeployGas);
        console.log("setDeploymentFee Gas:       ", setFeeGas);
        console.log("setDefaultRoyaltyInfo Gas:  ", setRoyaltyGas);
        console.log("pause Gas:                  ", pauseGas);
        console.log("unpause Gas:                ", unpauseGas);
        console.log("withdrawFees Gas:           ", withdrawGas);
        console.log("");
        console.log("========================================");
    }
} 