// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../src/app/constants/NFTFactory.sol";

/**
 * @title ReentrancyAttacker
 * @notice Contract that attempts to perform a reentrancy attack on the NFT Factory
 * @dev Used in security tests to ensure the ReentrancyGuard is working properly
 */
contract ReentrancyAttacker {
    NFTFactory public target;
    uint256 public attackCount;
    bool public attackActive;
    address public owner;
    
    event AttackAttempted(uint256 count, uint256 balance);
    
    constructor(address _targetFactory) {
        target = NFTFactory(_targetFactory);
        owner = msg.sender;
    }
    
    // Function to start the attack by making the attacker the owner
    function prepareAttack() external {
        // This would be done by transferring ownership in a real attack
        // For testing purposes, we simulate having ownership
    }
    
    // Function to deploy a collection as a normal user first (to add funds)
    function addFundsToTarget() external payable {
        // Deploy a collection to add funds to the factory
        require(msg.value >= target.deploymentFee(), "Insufficient funds to add");
        
        target.deployERC721Drop{value: target.deploymentFee()}(
            "Attack Collection",
            "ATTACK",
            address(this),
            address(0),
            500,
            address(this)
        );
    }
    
    // Function to start the attack attempt
    function startAttack() external {
        require(msg.sender == owner, "Only owner can start attack");
        attackActive = true;
        attackCount = 0;
        
        // First withdrawal attempt
        target.withdrawFees();
    }
    
    // Fallback function for the reentrancy attack
    receive() external payable {
        if (attackActive) {
            attackCount++;
            emit AttackAttempted(attackCount, address(target).balance);
            
            // Try to reenter if there are still funds and we haven't tried too many times
            if (address(target).balance > 0 && attackCount < 3) {
                // This should fail if reentrancy protection is working
                target.withdrawFees();
            } else {
                attackActive = false;
            }
        }
    }
    
    // Helper function to get the contract's balance
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    // Helper function to withdraw funds after attack
    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }
} 