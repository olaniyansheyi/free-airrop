require("@nomicfoundation/hardhat-toolbox");
// require("dotenv").config();
require("hardhat-gas-reporter");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27", // Make sure this matches your contract version

  gasReporter: {
    enabled: true,
    currency: "ETH",
    gasPrice: 25, // In gwei (example value)
  },

  networks: {
    // sepolia: {
    //   url: process.env.ALCHEMY_SEPOLIA_ENDPOINT,
    //   accounts: [process.env.PRIVATE_KEY], // Your private key
    // },
    // mainnet: {
    //   url: process.env.ALCHEMY_MAINNET_ENDPOINT,
    //   accounts: [process.env.PRIVATE_KEY], // Your private key
    // },
    hardhat: {
      chainId: 1337, // Hardhat Network chain ID
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY, // Your etherscan API key
  },
};
