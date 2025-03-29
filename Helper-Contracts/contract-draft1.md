// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title FeeCollector - A simple contract to collect fees with adjustable parameters
/// @notice This contract collects fees (flat + per image) and immediately forwards them to a fee recipient.
///         The owner can update fee parameters and change the fee recipient.
contract FeeCollector {
    // Fee parameters stored in wei
    uint256 public baseFee;
    uint256 public feePerImage;
    address public feeRecipient;
    address public owner;

    // Events for transparency
    event FeePaid(address indexed payer, uint256 amount, uint256 numImages);
    event FeeParametersUpdated(uint256 newBaseFee, uint256 newFeePerImage);
    event FeeRecipientUpdated(address newFeeRecipient);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /// @notice Sets the initial fee parameters and fee recipient.
    /// @param _baseFee The flat fee (in wei) required for any fee payment.
    /// @param _feePerImage The fee (in wei) for each image.
    /// @param _feeRecipient The address that will receive the fees.
    constructor(
        uint256 _baseFee,
        uint256 _feePerImage,
        address _feeRecipient
    ) {
        baseFee = _baseFee;
        feePerImage = _feePerImage;
        feeRecipient = _feeRecipient;
        owner = msg.sender;
    }

    /// @notice Modifier to restrict functions to only the owner.
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    /// @notice Accepts a fee payment for a given number of images.
    /// @param numImages The number of images being processed.
    /// @dev The sender must send exactly (baseFee + feePerImage * numImages) wei.
    function payFee(uint256 numImages) external payable {
        uint256 required = baseFee + (numImages * feePerImage);
        require(msg.value == required, "Fee amount must be exact");
        emit FeePaid(msg.sender, msg.value, numImages);
        // Immediately forward the fee to the feeRecipient.
        (bool success, ) = feeRecipient.call{value: msg.value}("");
        require(success, "Fee transfer failed");
    }

    /// @notice Updates the fee parameters. Only callable by the owner.
    /// @param _newBaseFee The new flat fee in wei.
    /// @param _newFeePerImage The new fee per image in wei.
    function updateFeeParameters(uint256 _newBaseFee, uint256 _newFeePerImage) external onlyOwner {
        baseFee = _newBaseFee;
        feePerImage = _newFeePerImage;
        emit FeeParametersUpdated(_newBaseFee, _newFeePerImage);
    }

    /// @notice Updates the fee recipient. Only callable by the owner.
    /// @param _newFeeRecipient The new address that will receive fees.
    function updateFeeRecipient(address _newFeeRecipient) external onlyOwner {
        feeRecipient = _newFeeRecipient;
        emit FeeRecipientUpdated(_newFeeRecipient);
    }

    /// @notice Transfers ownership of the contract to a new account. Only callable by the owner.
    /// @param _newOwner The address of the new owner.
    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "New owner cannot be zero address");
        emit OwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
    }

    /// @notice Allows the owner to withdraw any Ether accidentally left in the contract.
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        (bool success, ) = owner.call{value: balance}("");
        require(success, "Withdraw failed");
    }
}