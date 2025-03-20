import { metisChain } from "@/app/config/chain";
import { WMETIS_CONTRACT_ADDRESS } from "@/app/constants/contracts";
import { createPublicClient, http } from "viem";

// Simple ERC20 ABI for allowance check
const ERC20_ABI = [
  {
    constant: true,
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_spender", type: "address" }
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];

// Create a public client for blockchain queries
const publicClient = createPublicClient({
  chain: metisChain as any, // Type assertion to handle compatibility with viem
  transport: http(metisChain.rpc),
});

export const checkMETISBalance = async (address: string, required: bigint) => {
  const balance = await publicClient.getBalance({ address });
  if (balance < required) throw new Error("Insufficient METIS balance");
};

export const checkWMETISAllowance = async (address: string, spender: string) => {
  return await publicClient.readContract({
    address: WMETIS_CONTRACT_ADDRESS,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: [address, spender]
  });
}; 