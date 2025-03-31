// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title MockThirdWebContracts
 * @notice Minimal implementation of ThirdWeb contracts for testing
 * @dev These mocks simulate just enough functionality to test NFTFactory interactions
 */

// Mock Ownable extension to simulate ThirdWeb's Ownable
contract MockOwnable {
    address private _owner;

    event OwnerUpdated(address indexed prevOwner, address indexed newOwner);

    constructor() {
        _owner = msg.sender;
        emit OwnerUpdated(address(0), msg.sender);
    }

    function owner() public view returns (address) {
        return _owner;
    }

    function setOwner(address _newOwner) public {
        if (msg.sender != _owner) {
            revert("OwnableUnauthorized");
        }
        emit OwnerUpdated(_owner, _newOwner);
        _owner = _newOwner;
    }

    function _canSetOwner() internal view virtual returns (bool) {
        return msg.sender == _owner;
    }
}

// Mock ERC721Drop to simulate ThirdWeb's ERC721Drop without full implementation
contract MockERC721Drop is MockOwnable {
    string public name;
    string public symbol;
    address public royaltyRecipient;
    uint16 public royaltyBps;
    address public primarySaleRecipient;
    mapping(uint256 => string) public tokenURI;
    uint256 public nextTokenId;
    mapping(uint256 => uint256) public batchIds;
    mapping(uint256 => address) public tokenOwners;
    uint256 public nextBatchId;
    
    event TokensMinted(
        address indexed mintedTo,
        uint256 indexed tokenIdMinted,
        string tokenURI
    );
    
    event TokensClaimed(
        address indexed claimer,
        address indexed receiver,
        uint256 indexed tokenId,
        uint256 quantityClaimed
    );

    constructor(
        address _defaultAdmin,
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint16 _royaltyBps,
        address _primarySaleRecipient
    ) {
        name = _name;
        symbol = _symbol;
        royaltyRecipient = _royaltyRecipient;
        royaltyBps = _royaltyBps;
        primarySaleRecipient = _primarySaleRecipient;
        setOwner(_defaultAdmin);
    }
    
    function lazyMint(
        uint256 amount,
        string calldata baseURIForTokens,
        bytes calldata data
    ) external returns (uint256) {
        require(msg.sender == owner(), "Not authorized");
        
        uint256 batchId = nextBatchId;
        nextBatchId += 1;
        
        for (uint256 i = 0; i < amount; i++) {
            uint256 tokenId = nextTokenId;
            nextTokenId += 1;
            
            tokenURI[tokenId] = string(abi.encodePacked(baseURIForTokens, "/", tokenId));
            batchIds[tokenId] = batchId;
        }
        
        return batchId;
    }
    
    function claim(
        address receiver,
        uint256 quantity,
        address currency,
        uint256 pricePerToken,
        bytes32[] calldata proofs,
        uint256 proofMaxQuantityPerTransaction
    ) external payable returns (uint256) {
        require(quantity > 0, "Quantity must be greater than 0");
        
        if (currency == address(0)) {
            require(msg.value >= quantity * pricePerToken, "Insufficient funds");
        }
        
        uint256 startTokenId = nextTokenId - quantity;
        
        for (uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = startTokenId + i;
            tokenOwners[tokenId] = receiver;
            
            emit TokensClaimed(msg.sender, receiver, tokenId, 1);
        }
        
        if (currency == address(0) && pricePerToken > 0) {
            (bool success, ) = primarySaleRecipient.call{value: msg.value}("");
            require(success, "Transfer failed");
        }
        
        return startTokenId;
    }
    
    function getRoyaltyInfoForToken(uint256 tokenId) external view returns (address recipient, uint16 bps) {
        return (royaltyRecipient, royaltyBps);
    }
}

// Mock ERC1155Drop to simulate ThirdWeb's ERC1155Drop without full implementation
contract MockERC1155Drop is MockOwnable {
    string public name;
    string public symbol;
    address public royaltyRecipient;
    uint16 public royaltyBps;
    address public primarySaleRecipient;
    mapping(uint256 => string) public tokenURI;
    mapping(uint256 => uint256) public tokenSupply;
    mapping(uint256 => mapping(address => uint256)) public tokenBalances;
    uint256 public nextTokenId;
    mapping(uint256 => uint256) public batchIds;
    uint256 public nextBatchId;
    
    event TokensMinted(
        address indexed mintedTo,
        uint256 indexed tokenIdMinted,
        string tokenURI
    );
    
    event TokensClaimed(
        address indexed claimer,
        address indexed receiver,
        uint256 indexed tokenId,
        uint256 quantityClaimed
    );

    constructor(
        address _defaultAdmin,
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint16 _royaltyBps,
        address _primarySaleRecipient
    ) {
        name = _name;
        symbol = _symbol;
        royaltyRecipient = _royaltyRecipient;
        royaltyBps = _royaltyBps;
        primarySaleRecipient = _primarySaleRecipient;
        setOwner(_defaultAdmin);
    }
    
    function lazyMint(
        uint256 amount,
        string calldata baseURIForTokens,
        bytes calldata data
    ) external returns (uint256) {
        require(msg.sender == owner(), "Not authorized");
        
        uint256 batchId = nextBatchId;
        nextBatchId += 1;
        
        for (uint256 i = 0; i < amount; i++) {
            uint256 tokenId = nextTokenId;
            nextTokenId += 1;
            
            tokenURI[tokenId] = string(abi.encodePacked(baseURIForTokens, "/", tokenId));
            batchIds[tokenId] = batchId;
        }
        
        return batchId;
    }
    
    function claim(
        address receiver,
        uint256 tokenId,
        uint256 quantity,
        address currency,
        uint256 pricePerToken,
        bytes32[] calldata proofs,
        uint256 proofMaxQuantityPerTransaction
    ) external payable returns (uint256) {
        require(quantity > 0, "Quantity must be greater than 0");
        
        if (currency == address(0)) {
            require(msg.value >= quantity * pricePerToken, "Insufficient funds");
        }
        
        tokenBalances[tokenId][receiver] += quantity;
        tokenSupply[tokenId] += quantity;
        
        emit TokensClaimed(msg.sender, receiver, tokenId, quantity);
        
        if (currency == address(0) && pricePerToken > 0) {
            (bool success, ) = primarySaleRecipient.call{value: msg.value}("");
            require(success, "Transfer failed");
        }
        
        return tokenId;
    }
    
    function getRoyaltyInfoForToken(uint256 tokenId) external view returns (address recipient, uint16 bps) {
        return (royaltyRecipient, royaltyBps);
    }
    
    function balanceOf(address account, uint256 tokenId) external view returns (uint256) {
        return tokenBalances[tokenId][account];
    }
} 