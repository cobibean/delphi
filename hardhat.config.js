require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    metissepolia: {
      url: process.env.RPC_URL || "https://sepolia.metisdevops.link",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    metisandromeda: {
      url: process.env.MAINNET_RPC_URL || "https://andromeda.metis.io/?owner=1088",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    }
  },
  paths: {
    sources: "./src/contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  etherscan: {
    apiKey: {
      metissepolia: "not-needed", // Metis doesn't require API key for verification
      metisandromeda: "not-needed",
    },
    customChains: [
      {
        network: "metissepolia",
        chainId: 59902, // Metis Sepolia testnet chain ID
        urls: {
          apiURL: "https://sepolia.explorer.metisdevops.link/api",
          browserURL: "https://sepolia.explorer.metisdevops.link"
        }
      },
      {
        network: "metisandromeda",
        chainId: 1088, // Metis Andromeda mainnet chain ID
        urls: {
          apiURL: "https://andromeda-explorer.metis.io/api",
          browserURL: "https://andromeda-explorer.metis.io"
        }
      }
    ]
  }
}; 