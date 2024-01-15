import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { sepolia } from "viem/chains";

const projectId = process.env.WC_PROJECT_ID || "";

const metadata = {
  name: "NFT Factory",
  description: "NFT Factory",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const chains = [sepolia];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });

export default wagmiConfig;
