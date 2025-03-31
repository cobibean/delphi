// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../src/app/constants/NFTFactory.sol";

/**
 * @title BenchmarkFuzzingTest
 * @notice Fuzzing tests to detect edge cases in the NFT Factory contract
 * @dev Uses random inputs to find potential vulnerabilities
 */
contract BenchmarkFuzzingTest is Test {
    NFTFactory factory;
    
    // Test accounts
    address owner = address(1);
    address user1 = address(2);
    address user2 = address(3);
    address feeRecipient = address(4);
    
    // Initial parameters
    uint256 deploymentFee = 0.01 ether;
    uint16 defaultRoyaltyBps = 500; // 5%
    
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
        vm.deal(owner, 100 ether);
        vm.deal(user1, 100 ether);
        vm.deal(user2, 100 ether);
    }
    
    /**
     * @notice Fuzz test the constructor with random royalty BPS values
     * @param royaltyBps Random royalty basis points value
     */
    function testFuzzConstructorRoyaltyBps(uint16 royaltyBps) public {
        vm.startPrank(owner);
        
        if (royaltyBps <= 10000) {
            // Should succeed if royaltyBps <= 10000
            NFTFactory newFactory = new NFTFactory(
                deploymentFee,
                feeRecipient,
                royaltyBps
            );
            assertEq(newFactory.defaultRoyaltyBps(), royaltyBps);
        } else {
            // Should revert if royaltyBps > 10000
            vm.expectRevert("Royalty bps exceeds maximum (10000 = 100%)");
            new NFTFactory(
                deploymentFee,
                feeRecipient,
                royaltyBps
            );
        }
        
        vm.stopPrank();
    }
    
    /**
     * @notice Fuzz test the constructor with random fee recipient addresses
     * @param recipient Random address for royalty recipient
     */
    function testFuzzConstructorRoyaltyRecipient(address recipient) public {
        vm.startPrank(owner);
        
        if (recipient != address(0)) {
            // Should succeed if recipient is not zero address
            NFTFactory newFactory = new NFTFactory(
                deploymentFee,
                recipient,
                defaultRoyaltyBps
            );
            assertEq(newFactory.defaultRoyaltyRecipient(), recipient);
        } else {
            // Should revert if recipient is zero address
            vm.expectRevert("Royalty recipient cannot be zero address");
            new NFTFactory(
                deploymentFee,
                recipient,
                defaultRoyaltyBps
            );
        }
        
        vm.stopPrank();
    }
    
    /**
     * @notice Fuzz test ERC721Drop deployment with random parameters
     * @param nameLength Length of collection name
     * @param symbolLength Length of collection symbol
     * @param admin Admin address
     * @param royaltyRecipient Royalty recipient address
     * @param royaltyBps Royalty basis points
     * @param primaryRecipient Primary sale recipient address
     * @param feeValue Amount to send for deployment fee
     */
    function testFuzzERC721Deployment(
        uint8 nameLength,
        uint8 symbolLength,
        address admin,
        address royaltyRecipient,
        uint16 royaltyBps,
        address primaryRecipient,
        uint256 feeValue
    ) public {
        // Bound inputs to reasonable ranges
        nameLength = uint8(bound(nameLength, 0, 50));
        symbolLength = uint8(bound(symbolLength, 0, 10));
        royaltyBps = uint16(bound(royaltyBps, 0, 20000)); // Allow values that should fail
        feeValue = bound(feeValue, 0, 1 ether); // Reasonable range for testing
        
        // Generate random strings for name and symbol
        string memory name = nameLength > 0 ? _generateRandomString(nameLength) : "";
        string memory symbol = symbolLength > 0 ? _generateRandomString(symbolLength) : "";
        
        vm.startPrank(user1);
        vm.deal(user1, feeValue);
        
        // Conditions for success
        bool shouldSucceed = 
            nameLength > 0 && 
            symbolLength > 0 && 
            admin != address(0) && 
            royaltyBps <= 10000 && 
            feeValue == deploymentFee;
        
        if (shouldSucceed) {
            address dropAddress = factory.deployERC721Drop{value: feeValue}(
                name,
                symbol,
                admin,
                royaltyRecipient,
                royaltyBps,
                primaryRecipient
            );
            
            // Verify deployment
            assertTrue(factory.isFactoryDeployed(dropAddress));
            
            address[] memory collections = factory.getDeployedCollections(user1);
            assertEq(collections[collections.length - 1], dropAddress);
        } else {
            // Should revert - determine expected revert reason
            if (nameLength == 0) {
                vm.expectRevert("Name cannot be empty");
            } else if (symbolLength == 0) {
                vm.expectRevert("Symbol cannot be empty");
            } else if (admin == address(0)) {
                vm.expectRevert("Default admin cannot be zero address");
            } else if (royaltyBps > 10000) {
                vm.expectRevert("Royalty bps exceeds maximum (10000 = 100%)");
            } else if (feeValue != deploymentFee) {
                vm.expectRevert("Incorrect deployment fee");
            }
            
            factory.deployERC721Drop{value: feeValue}(
                name,
                symbol,
                admin,
                royaltyRecipient,
                royaltyBps,
                primaryRecipient
            );
        }
        
        vm.stopPrank();
    }
    
    /**
     * @notice Fuzz test ERC1155Drop deployment with random parameters
     * @param nameLength Length of collection name
     * @param symbolLength Length of collection symbol
     * @param admin Admin address
     * @param royaltyRecipient Royalty recipient address
     * @param royaltyBps Royalty basis points
     * @param primaryRecipient Primary sale recipient address
     * @param feeValue Amount to send for deployment fee
     */
    function testFuzzERC1155Deployment(
        uint8 nameLength,
        uint8 symbolLength,
        address admin,
        address royaltyRecipient,
        uint16 royaltyBps,
        address primaryRecipient,
        uint256 feeValue
    ) public {
        // Bound inputs to reasonable ranges
        nameLength = uint8(bound(nameLength, 0, 50));
        symbolLength = uint8(bound(symbolLength, 0, 10));
        royaltyBps = uint16(bound(royaltyBps, 0, 20000)); // Allow values that should fail
        feeValue = bound(feeValue, 0, 1 ether); // Reasonable range for testing
        
        // Generate random strings for name and symbol
        string memory name = nameLength > 0 ? _generateRandomString(nameLength) : "";
        string memory symbol = symbolLength > 0 ? _generateRandomString(symbolLength) : "";
        
        vm.startPrank(user1);
        vm.deal(user1, feeValue);
        
        // Conditions for success
        bool shouldSucceed = 
            nameLength > 0 && 
            symbolLength > 0 && 
            admin != address(0) && 
            royaltyBps <= 10000 && 
            feeValue == deploymentFee;
        
        if (shouldSucceed) {
            address dropAddress = factory.deployERC1155Drop{value: feeValue}(
                name,
                symbol,
                admin,
                royaltyRecipient,
                royaltyBps,
                primaryRecipient
            );
            
            // Verify deployment
            assertTrue(factory.isFactoryDeployed(dropAddress));
            
            address[] memory collections = factory.getDeployedCollections(user1);
            assertEq(collections[collections.length - 1], dropAddress);
        } else {
            // Should revert - determine expected revert reason
            if (nameLength == 0) {
                vm.expectRevert("Name cannot be empty");
            } else if (symbolLength == 0) {
                vm.expectRevert("Symbol cannot be empty");
            } else if (admin == address(0)) {
                vm.expectRevert("Default admin cannot be zero address");
            } else if (royaltyBps > 10000) {
                vm.expectRevert("Royalty bps exceeds maximum (10000 = 100%)");
            } else if (feeValue != deploymentFee) {
                vm.expectRevert("Incorrect deployment fee");
            }
            
            factory.deployERC1155Drop{value: feeValue}(
                name,
                symbol,
                admin,
                royaltyRecipient,
                royaltyBps,
                primaryRecipient
            );
        }
        
        vm.stopPrank();
    }
    
    /**
     * @notice Fuzz test setDefaultRoyaltyInfo with random parameters
     * @param caller Address calling the function
     * @param recipient New royalty recipient
     * @param bps New royalty basis points
     */
    function testFuzzSetDefaultRoyaltyInfo(
        address caller,
        address recipient,
        uint16 bps
    ) public {
        vm.startPrank(caller);
        
        if (caller == owner) {
            if (recipient != address(0) && bps <= 10000) {
                // Should succeed
                factory.setDefaultRoyaltyInfo(recipient, bps);
                assertEq(factory.defaultRoyaltyRecipient(), recipient);
                assertEq(factory.defaultRoyaltyBps(), bps);
            } else if (recipient == address(0)) {
                // Should revert with zero address error
                vm.expectRevert("Royalty recipient cannot be zero address");
                factory.setDefaultRoyaltyInfo(recipient, bps);
            } else if (bps > 10000) {
                // Should revert with excessive bps error
                vm.expectRevert("Royalty bps exceeds maximum (10000 = 100%)");
                factory.setDefaultRoyaltyInfo(recipient, bps);
            }
        } else {
            // Should revert with unauthorized error
            vm.expectRevert();
            factory.setDefaultRoyaltyInfo(recipient, bps);
        }
        
        vm.stopPrank();
    }
    
    /**
     * @notice Fuzz test setDeploymentFee with random parameters
     * @param caller Address calling the function
     * @param newFee New deployment fee
     */
    function testFuzzSetDeploymentFee(
        address caller,
        uint256 newFee
    ) public {
        vm.startPrank(caller);
        
        if (caller == owner) {
            // Should succeed regardless of fee value
            factory.setDeploymentFee(newFee);
            assertEq(factory.deploymentFee(), newFee);
        } else {
            // Should revert with unauthorized error
            vm.expectRevert();
            factory.setDeploymentFee(newFee);
        }
        
        vm.stopPrank();
    }
    
    /**
     * @notice Fuzz test multiple deployments with random parameters
     * @param deployerCount Number of deployers to simulate
     * @param deploymentsPerUser Number of deployments per user
     */
    function testFuzzMultipleDeployments(
        uint8 deployerCount,
        uint8 deploymentsPerUser
    ) public {
        // Bound inputs to reasonable ranges to avoid excessive gas usage
        deployerCount = uint8(bound(deployerCount, 1, 5));
        deploymentsPerUser = uint8(bound(deploymentsPerUser, 1, 5));
        
        // Create multiple deployers and perform multiple deployments
        for (uint256 i = 0; i < deployerCount; i++) {
            address deployer = address(uint160(i + 100));
            vm.deal(deployer, deploymentsPerUser * deploymentFee * 2);
            
            vm.startPrank(deployer);
            
            for (uint256 j = 0; j < deploymentsPerUser; j++) {
                // Alternate between ERC721 and ERC1155
                if (j % 2 == 0) {
                    factory.deployERC721Drop{value: deploymentFee}(
                        string(abi.encodePacked("Collection ", i, "-", j)),
                        string(abi.encodePacked("COL", i, j)),
                        deployer,
                        address(0),
                        500,
                        deployer
                    );
                } else {
                    factory.deployERC1155Drop{value: deploymentFee}(
                        string(abi.encodePacked("Collection ", i, "-", j)),
                        string(abi.encodePacked("COL", i, j)),
                        deployer,
                        address(0),
                        500,
                        deployer
                    );
                }
            }
            
            // Verify deployments for this user
            address[] memory collections = factory.getDeployedCollections(deployer);
            assertEq(collections.length, deploymentsPerUser);
            
            vm.stopPrank();
        }
        
        // Verify total fees collected
        assertEq(address(factory).balance, uint256(deployerCount) * uint256(deploymentsPerUser) * deploymentFee);
    }
    
    /**
     * @notice Helper function to generate random strings
     * @param length Length of the string to generate
     * @return Random string of specified length
     */
    function _generateRandomString(uint256 length) internal pure returns (string memory) {
        bytes memory characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        bytes memory result = new bytes(length);
        
        for (uint256 i = 0; i < length; i++) {
            // Use a simple deterministic algorithm based on i
            result[i] = characters[uint8(uint256(keccak256(abi.encodePacked(i))) % characters.length)];
        }
        
        return string(result);
    }
} 