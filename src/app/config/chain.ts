import { defineChain } from "thirdweb";

// Define Metis chain using the chain ID
export const metisChain = defineChain(1088);

// Also export as chain for backward compatibility
export const chain = metisChain;
