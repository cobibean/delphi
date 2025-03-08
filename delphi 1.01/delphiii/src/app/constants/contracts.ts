/**
 * Contract addresses for the Delphi marketplace
 * 
 * These addresses can be easily updated when deploying to different networks
 * or when updating contract versions.
 */

// Metis Andromeda Network (Chain ID: 1088)
export const METIS_CONTRACTS = {
  // Replace with your actual marketplace contract address
  MARKETPLACE: "0x0000000000000000000000000000000000000000",
  
  // Replace with your actual NFT collection contract address if you have one
  NFT_COLLECTION: "0x0000000000000000000000000000000000000000",
};

// Default to Metis network
export const CONTRACTS = METIS_CONTRACTS;

// Network configuration
export const SUPPORTED_NETWORKS = {
  METIS: {
    id: 1088,
    name: "Metis Andromeda",
    rpc: ["https://andromeda.metis.io/?owner=1088"],
    nativeCurrency: {
      name: "Metis",
      symbol: "METIS",
      decimals: 18,
    },
    blockExplorers: [
      {
        name: "Metis Explorer",
        url: "https://andromeda-explorer.metis.io",
      },
    ],
  },
}; 