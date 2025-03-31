// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import OpenZeppelin contracts for pausing and reentrancy protection
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// Import Thirdweb contracts with consistent aliases for clarity
import { Ownable as TWOwnable } from "@thirdweb-dev/contracts/extension/Ownable.sol";
import { ERC721Drop as TWDropERC721 } from "@thirdweb-dev/contracts/base/ERC721Drop.sol";
import { ERC1155Drop as TWDropERC1155 } from "@thirdweb-dev/contracts/base/ERC1155Drop.sol";

/**
 * @title NFTFactory
 * @author Delphi Marketplace
 * @notice A factory contract that deploys ThirdWeb's ERC721Drop and ERC1155Drop contracts
 * @dev This contract allows users to deploy NFT collections and pays a fee to the contract owner
 */
contract NFTFactory is TWOwnable, Pausable, ReentrancyGuard {
    // Fee variables (in native Metis)
    uint256 public deploymentFee;

    // Default royalty info for new collections
    address public defaultRoyaltyRecipient;
    uint16 public defaultRoyaltyBps;

    /**
     * @notice Tracks all collections deployed by a specific user address
     * @dev Maps deployer address to an array of their deployed collection addresses
     */
    mapping(address => address[]) public deployedCollections;
    
    /**
     * @notice Quick lookup to verify if a contract was deployed by this factory
     * @dev Maps contract address to a boolean indicating if it was deployed by this factory
     */
    mapping(address => bool) public isFactoryDeployed;

    // Events
    /**
     * @notice Emitted when a new ERC721Drop contract is deployed
     * @param deployer The address that deployed the contract
     * @param dropAddress The address of the deployed contract
     * @param name The name of the collection
     * @param symbol The symbol of the collection
     * @param feePaid The fee paid to deploy the contract
     */
    event ERC721DropDeployed(
        address indexed deployer,
        address indexed dropAddress,
        string name,
        string symbol,
        uint256 feePaid
    );

    /**
     * @notice Emitted when a new ERC1155Drop contract is deployed
     * @param deployer The address that deployed the contract
     * @param dropAddress The address of the deployed contract
     * @param name The name of the collection
     * @param symbol The symbol of the collection
     * @param feePaid The fee paid to deploy the contract
     */
    event ERC1155DropDeployed(
        address indexed deployer,
        address indexed dropAddress,
        string name,
        string symbol,
        uint256 feePaid
    );

    /**
     * @notice Emitted when the deployment fee is updated
     * @param oldFee The previous fee amount
     * @param newFee The new fee amount
     */
    event DeploymentFeeUpdated(uint256 oldFee, uint256 newFee);
    
    /**
     * @notice Emitted when fees are withdrawn from the contract
     * @param owner The address that received the fees
     * @param amount The amount of fees withdrawn
     */
    event FeesWithdrawn(address indexed owner, uint256 amount);
    
    /**
     * @notice Emitted when default royalty info is updated
     * @param recipient The address to receive royalties
     * @param bps The basis points for royalties (e.g., 500 = 5%)
     */
    event DefaultRoyaltyInfoUpdated(address recipient, uint16 bps);

    /**
     * @dev Constructor to set initial fees and default royalty info.
     * @param _deploymentFee The initial fee for deploying a collection
     * @param _defaultRoyaltyRecipient The default address to receive royalties
     * @param _defaultRoyaltyBps The default royalty percentage in basis points
     */
    constructor(
        uint256 _deploymentFee,
        address _defaultRoyaltyRecipient,
        uint16 _defaultRoyaltyBps
    ) {
        require(_defaultRoyaltyBps <= 10000, "Royalty bps exceeds maximum (10000 = 100%)");
        require(_defaultRoyaltyRecipient != address(0), "Royalty recipient cannot be zero address");
        
        deploymentFee = _deploymentFee;
        defaultRoyaltyRecipient = _defaultRoyaltyRecipient;
        defaultRoyaltyBps = _defaultRoyaltyBps;
    }

    /**
     * @notice Deploy a new ERC721Drop contract using Thirdweb v5.
     * @dev Caller must send exactly `deploymentFee` in native tokens.
     * @param name Collection name
     * @param symbol Token symbol
     * @param defaultAdmin Address with admin privileges (usually caller)
     * @param royaltyRecipient Address for royalty payout
     * @param royaltyBps % of royalties (in basis points)
     * @param primarySaleRecipient Address to receive funds from primary sales
     * @return Address of the newly deployed contract
     */
    function deployERC721Drop(
        string memory name,
        string memory symbol,
        address defaultAdmin,
        address royaltyRecipient,
        uint16 royaltyBps,
        address primarySaleRecipient
    ) external payable whenNotPaused nonReentrant returns (address) {
        // Input validation
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(symbol).length > 0, "Symbol cannot be empty");
        require(msg.value == deploymentFee, "Incorrect deployment fee");
        require(royaltyBps <= 10000, "Royalty bps exceeds maximum (10000 = 100%)");
        require(defaultAdmin != address(0), "Default admin cannot be zero address");

        // Set default values if not provided
        address admin = defaultAdmin != address(0) ? defaultAdmin : msg.sender;
        address recipient = royaltyRecipient != address(0) ? royaltyRecipient : defaultRoyaltyRecipient;
        address saleRecipient = primarySaleRecipient != address(0) ? primarySaleRecipient : msg.sender;
        
        // Deploy the ERC721Drop contract.
        // Note the correct constructor parameter order as per ThirdWeb's latest documentation
        TWDropERC721 newDrop = new TWDropERC721(
            admin,
            name,
            symbol,
            recipient,
            royaltyBps,
            saleRecipient
        );
        address dropAddress = address(newDrop);

        // Record the deployed contract.
        deployedCollections[msg.sender].push(dropAddress);
        isFactoryDeployed[dropAddress] = true;

        emit ERC721DropDeployed(msg.sender, dropAddress, name, symbol, msg.value);
        return dropAddress;
    }

    /**
     * @notice Deploy a new ERC1155Drop contract using Thirdweb v5.
     * @dev Caller must send exactly `deploymentFee` in native tokens.
     * @param name Collection name
     * @param symbol Token symbol
     * @param defaultAdmin Address with admin privileges (usually caller)
     * @param royaltyRecipient Address for royalty payout
     * @param royaltyBps % of royalties (in basis points)
     * @param primarySaleRecipient Address to receive funds from primary sales
     * @return Address of the newly deployed contract
     */
    function deployERC1155Drop(
        string memory name,
        string memory symbol,
        address defaultAdmin,
        address royaltyRecipient,
        uint16 royaltyBps,
        address primarySaleRecipient
    ) external payable whenNotPaused nonReentrant returns (address) {
        // Input validation
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(symbol).length > 0, "Symbol cannot be empty");
        require(msg.value == deploymentFee, "Incorrect deployment fee");
        require(royaltyBps <= 10000, "Royalty bps exceeds maximum (10000 = 100%)");
        require(defaultAdmin != address(0), "Default admin cannot be zero address");

        // Set default values if not provided
        address admin = defaultAdmin != address(0) ? defaultAdmin : msg.sender;
        address recipient = royaltyRecipient != address(0) ? royaltyRecipient : defaultRoyaltyRecipient;
        address saleRecipient = primarySaleRecipient != address(0) ? primarySaleRecipient : msg.sender;
        
        // Deploy the ERC1155Drop contract.
        // Note the correct constructor parameter order as per ThirdWeb's latest documentation
        TWDropERC1155 newDrop = new TWDropERC1155(
            admin,
            name,
            symbol,
            recipient,
            royaltyBps,
            saleRecipient
        );
        address dropAddress = address(newDrop);

        // Record the deployed contract.
        deployedCollections[msg.sender].push(dropAddress);
        isFactoryDeployed[dropAddress] = true;

        emit ERC1155DropDeployed(msg.sender, dropAddress, name, symbol, msg.value);
        return dropAddress;
    }

    /**
     * @notice Owner can update the flat deployment fee.
     * @param _deploymentFee The new deployment fee
     */
    function setDeploymentFee(uint256 _deploymentFee) external onlyOwner {
        uint256 oldFee = deploymentFee;
        deploymentFee = _deploymentFee;
        emit DeploymentFeeUpdated(oldFee, _deploymentFee);
    }

    /**
     * @notice Owner can update the default royalty information.
     * @param _recipient The address to receive royalties
     * @param _bps The basis points for royalties (e.g., 500 = 5%)
     */
    function setDefaultRoyaltyInfo(address _recipient, uint16 _bps) external onlyOwner {
        require(_bps <= 10000, "Royalty bps exceeds maximum (10000 = 100%)");
        require(_recipient != address(0), "Royalty recipient cannot be zero address");
        
        defaultRoyaltyRecipient = _recipient;
        defaultRoyaltyBps = _bps;
        emit DefaultRoyaltyInfoUpdated(_recipient, _bps);
    }

    /**
     * @notice Withdraw accumulated fees.
     * @dev Only the contract owner can call this function
     */
    function withdrawFees() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        
        (bool success, ) = owner().call{value: balance}("");
        require(success, "Withdrawal failed");
        
        emit FeesWithdrawn(owner(), balance);
    }

    /**
     * @notice Returns the list of deployed collection addresses for a given deployer.
     * @param deployer The address to query
     * @return An array of contract addresses deployed by the given address
     */
    function getDeployedCollections(address deployer) external view returns (address[] memory) {
        return deployedCollections[deployer];
    }

    /**
     * @notice Estimate the fee required to deploy a collection
     * @return The current deployment fee
     */
    function estimateFee() external view returns (uint256) {
        return deploymentFee;
    }

    /**
     * @notice Pause the contract, stopping deployments.
     * @dev Only the contract owner can call this function
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @notice Unpause the contract.
     * @dev Only the contract owner can call this function
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @dev Implementation of the _canSetOwner function from ThirdWeb's Ownable contract
     * @return True if the caller is the owner, false otherwise
     */
    function _canSetOwner() internal view override returns (bool) {
        return msg.sender == owner();
    }
}