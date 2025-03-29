// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import OpenZeppelin contracts for ownership and pausing.
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

// Import ThirdWeb's ERC721Drop and ERC1155Drop contracts.
// (Assuming these paths are correct within your project structure)
import "lib/thirdweb-contracts/contracts/base/ERC721Drop.sol";
import "lib/thirdweb-contracts/contracts/base/ERC1155Drop.sol";

contract NFTFactory is Ownable, Pausable {
    // Fee variables (in native Metis)
    uint256 public deploymentFee;
    uint256 public lazyMintFee;

    // Default royalty info for new collections (could be used by the frontend)
    address public defaultRoyaltyRecipient;
    uint256 public defaultRoyaltyBps;

    // Mapping from deployer address to array of deployed collection addresses.
    mapping(address => address[]) public deployedCollections;
    // Quick lookup to verify if an address was deployed by this factory.
    mapping(address => bool) public isFactoryDeployed;

    // Events
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
    event DeploymentFeeUpdated(uint256 newFee);
    event LazyMintFeeUpdated(uint256 newFee);
    event FeesWithdrawn(address indexed owner, uint256 amount);
    event DefaultRoyaltyInfoUpdated(address recipient, uint256 bps);

    /**
     * @dev Constructor to set initial fees and default royalty info.
     */
    constructor(
        uint256 _deploymentFee,
        uint256 _lazyMintFee,
        address _defaultRoyaltyRecipient,
        uint256 _defaultRoyaltyBps
    ) {
        deploymentFee = _deploymentFee;
        lazyMintFee = _lazyMintFee;
        defaultRoyaltyRecipient = _defaultRoyaltyRecipient;
        defaultRoyaltyBps = _defaultRoyaltyBps;
    }

    /**
     * @dev Deploy a new ERC721Drop contract.
     * Requirements:
     * - Caller must send exactly `deploymentFee` in native tokens.
     */
    function deployERC721Drop(
        string memory name,
        string memory symbol,
        address defaultAdmin,
        address royaltyRecipient,
        uint256 royaltyBps,
        address primarySaleRecipient
    ) external payable whenNotPaused returns (address) {
        require(msg.value == deploymentFee, "Incorrect deployment fee");

        // Deploy the ERC721Drop contract.
        ERC721Drop newDrop = new ERC721Drop(
            name,
            symbol,
            defaultAdmin,
            royaltyRecipient,
            royaltyBps,
            primarySaleRecipient
        );
        address dropAddress = address(newDrop);

        // Record the deployed contract.
        deployedCollections[msg.sender].push(dropAddress);
        isFactoryDeployed[dropAddress] = true;

        emit ERC721DropDeployed(msg.sender, dropAddress, name, symbol, msg.value);
        return dropAddress;
    }

    /**
     * @dev Deploy a new ERC1155Drop contract.
     * Requirements:
     * - Caller must send exactly `deploymentFee` in native tokens.
     */
    function deployERC1155Drop(
        string memory name,
        string memory symbol,
        address defaultAdmin,
        address royaltyRecipient,
        uint256 royaltyBps,
        address primarySaleRecipient
    ) external payable whenNotPaused returns (address) {
        require(msg.value == deploymentFee, "Incorrect deployment fee");

        // Deploy the ERC1155Drop contract.
        ERC1155Drop newDrop = new ERC1155Drop(
            name,
            symbol,
            defaultAdmin,
            royaltyRecipient,
            royaltyBps,
            primarySaleRecipient
        );
        address dropAddress = address(newDrop);

        // Record the deployed contract.
        deployedCollections[msg.sender].push(dropAddress);
        isFactoryDeployed[dropAddress] = true;

        emit ERC1155DropDeployed(msg.sender, dropAddress, name, symbol, msg.value);
        return dropAddress;
    }

    /**
     * @dev Owner can update the flat deployment fee.
     */
    function setDeploymentFee(uint256 _deploymentFee) external onlyOwner {
        deploymentFee = _deploymentFee;
        emit DeploymentFeeUpdated(_deploymentFee);
    }

    /**
     * @dev Owner can update the fee charged per NFT lazy minted.
     */
    function setLazyMintFee(uint256 _lazyMintFee) external onlyOwner {
        lazyMintFee = _lazyMintFee;
        emit LazyMintFeeUpdated(_lazyMintFee);
    }

    /**
     * @dev Owner can update the default royalty information.
     */
    function setDefaultRoyaltyInfo(address _recipient, uint256 _bps) external onlyOwner {
        defaultRoyaltyRecipient = _recipient;
        defaultRoyaltyBps = _bps;
        emit DefaultRoyaltyInfoUpdated(_recipient, _bps);
    }

    /**
     * @dev Withdraw accumulated fees.
     */
    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        (bool success, ) = owner().call{value: balance}("");
        require(success, "Withdrawal failed");
        emit FeesWithdrawn(owner(), balance);
    }

    /**
     * @dev Returns the list of deployed collection addresses for a deployer.
     */
    function getDeployedCollections(address deployer) external view returns (address[] memory) {
        return deployedCollections[deployer];
    }

    /**
     * @dev Estimate the total fee for a deployment if you want to account for lazy mint fees.
     * For example, if a collection is expected to have `numberOfNFTs` NFTs lazy minted,
     * the total fee would be: deploymentFee + (lazyMintFee * numberOfNFTs).
     */
    function estimateFee(uint256 numberOfNFTs) external view returns (uint256) {
        return deploymentFee + (lazyMintFee * numberOfNFTs);
    }

    /**
     * @dev Prevent accidental native token transfers to this contract.
     */
    receive() external payable {
        revert("Direct transfers not allowed");
    }

    fallback() external payable {
        revert("Direct transfers not allowed");
    }

    /**
     * @dev Pause the contract (stops deployments).
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause the contract.
     */
    function unpause() external onlyOwner {
        _unpause();
    }
}