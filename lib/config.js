import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { cookieStorage, createStorage } from "wagmi";
import { sepolia, mainnet } from "wagmi/chains";

const projectId = "9c52bbb96598e1c70a786d7d08f436e4";

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "free-airrop",
  description: "claim your token now",
  url: "https://free-airdrops-claim.vercel.app/",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const config = defaultWagmiConfig({
  chains: [sepolia, mainnet],
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

export { projectId, config };
