"use client";

import React, { useState } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

export default function ConnectButton() {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount(); // Check if the user is connected
  const [buttonText, setButtonText] = useState("Connect Wallet");

  // Update button text dynamically based on connection status
  React.useEffect(() => {
    if (isConnected) {
      setButtonText("Connected, Claim Token Now!");
    } else {
      setButtonText("Connect Wallet");
    }
  }, [isConnected]);

  return (
    <button className="connect-button" onClick={() => open()}>
      {buttonText}
    </button>
  );
}
