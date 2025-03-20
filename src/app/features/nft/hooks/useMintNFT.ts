import { useState } from 'react';
import { useActiveAccount } from 'thirdweb/react';
import { getContract, prepareContractCall, sendTransaction } from 'thirdweb';
import { useToast } from '@/components/feedback/Toast/useToast';
import { client } from '@/config/client';
import { metisChain } from '@/config/chain';
import { useTransaction } from '@/providers/TransactionProvider';

/**
 * Hook for minting NFTs from a collection
 * 
 * @param contractAddress - The address of the NFT collection contract
 * @returns Object containing minting function and status
 */
export const useMintNFT = (contractAddress: string) => {
  const [isMinting, setIsMinting] = useState(false);
  const account = useActiveAccount();
  const { toast } = useToast();
  const { addTransaction } = useTransaction();
  
  const mint = async (quantity = 1) => {
    if (!contractAddress || !account) {
      toast.error(
        "Error",
        "Wallet not connected or invalid contract address"
      );
      return null;
    }

    setIsMinting(true);
    
    try {
      // Create a contract instance
      const contract = getContract({
        client,
        chain: metisChain,
        address: contractAddress as `0x${string}`,
      });
      
      // Add transaction to the transaction provider
      addTransaction(
        "loading",
        `Mint NFT`,
        "Preparing mint transaction..."
      );
      
      // Prepare the mint transaction
      // This is a placeholder implementation - actual parameters depend on the contract's mint function
      const transaction = await prepareContractCall({
        contract,
        method: "function mint(uint256 quantity)",
        params: [BigInt(quantity)]
      });
      
      // Send the transaction
      const result = await sendTransaction({
        transaction,
        account,
      });
      
      // Update transaction status
      addTransaction(
        "success",
        `Mint NFT`,
        result.transactionHash
      );
      
      toast.success(
        "Success",
        "Successfully minted NFT"
      );
      
      return result;
    } catch (error) {
      console.error("Failed to mint NFT:", error);
      
      // Update transaction status
      addTransaction(
        "error",
        `Mint NFT`,
        "Failed to mint NFT"
      );
      
      toast.error(
        "Error",
        "Failed to mint NFT. See console for details."
      );
      
      return null;
    } finally {
      setIsMinting(false);
    }
  };

  return {
    mint,
    isMinting,
  };
};

export default useMintNFT;