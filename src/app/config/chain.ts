import { defineChain } from "thirdweb";

// Define Metis Andromeda Mainnet chain using chain ID
export const metisChain = defineChain(1088);

// Also export as chain for backward compatibility
export const chain = metisChain;
