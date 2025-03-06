export const checkMETISBalance = async (address: string, required: bigint) => {
  const balance = await publicClient.getBalance({ address });
  if (balance < required) throw new Error("Insufficient METIS balance");
};

export const checkWMETISAllowance = async (address: string, spender: string) => {
  return await publicClient.readContract({
    address: WMETIS_CONTRACT_ADDRESS,
    abi: WMETIS_ABI,
    functionName: "allowance",
    args: [address, spender]
  });
}; 