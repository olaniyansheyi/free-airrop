"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";

export default function ConnectButton() {
  const { open } = useWeb3Modal();

  return (
    <button
      className="mt-1 text-primary bg-accent rounded-xl py-3 px-6 font-semibold hover:bg-accent-hover tracking-wider"
      onClick={() => open()}
    >
      Connect Wallet
    </button>
  );
}
