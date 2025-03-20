"use client";

import { useToast } from "@/components/feedback/Toast/useToast";
import { metisChain } from "@/config/chain";
import { client } from "@/config/client";
import { CONTRACT_ADDRESS, WMETIS_CONTRACT_ADDRESS } from "@/constants/contracts";
import { useTransaction } from "@/features/wallet/hooks";
import { IDirectListing } from "@/interfaces/interfaces";
import { getContract, prepareContractCall, sendTransaction } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { toWei } from "thirdweb/utils";

// Native token address constant - often represented as address(0) in contracts
const NATIVE_TOKEN_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

/**
 * Custom hook for marketplace minting operations with WMETIS
 * Handles the process of wrapping METIS tokens and buying NFTs
 */
export function useMarketplaceMint() {
  const account = useActiveAccount();
  const { toast } = useToast();
  const { 
    handleTransactionStart, 
    handleTransactionSuccess, 
    handleTransactionError, 
    isLoading 
  } = useTransaction();

  /**
   * Wraps METIS to WMETIS and uses it to buy an NFT from a listing
   * @param listing The direct listing information
   * @param quantity The quantity of NFTs to purchase
   */
  const wrapAndBuy = async (listing: IDirectListing, quantity: number) => {
    if (!account) {
      toast.error("Error", "Please connect your wallet first");
      throw new Error("No connected wallet");
    }

    // Start transaction tracking
    handleTransactionStart();

    try {
      // Step 1: Wrap METIS to WMETIS
      console.log("Wrapping METIS for direct listing:", listing);
      
      // Get contract instances
      const marketplaceContract = await getContract({
        client,
        chain: metisChain,
        address: CONTRACT_ADDRESS.MARKETPLACE_V5,
      });
      
      // Calculate the total price (price per token * quantity)
      const pricePerToken = listing.pricePerToken;
      const totalPrice = (parseFloat(pricePerToken) * quantity).toString();
      const totalPriceWei = toWei(totalPrice);
      
      console.log("Total price in METIS:", totalPrice);
      console.log("Total price in Wei:", totalPriceWei);
      
      // Get the WMETIS contract
      const wmetisContract = await getContract({
        client,
        chain: metisChain,
        address: WMETIS_CONTRACT_ADDRESS as `0x${string}`,
      });
      
      // Call deposit on WMETIS contract with value equal to total price
      // This wraps the METIS into WMETIS
      console.log("Calling deposit() on WMETIS contract with value:", totalPriceWei);
      
      const depositCall = prepareContractCall({
        contract: wmetisContract,
        method: "function deposit() external payable",
        params: [],
        value: totalPriceWei,
      });
      
      const depositTx = await sendTransaction({
        transaction: depositCall,
        account,
      });
      
      console.log("Deposit transaction:", depositTx);
      
      // Step 2: Approve WMETIS for marketplace (allowance)
      console.log("Approving WMETIS for marketplace...");
      
      const approveCall = prepareContractCall({
        contract: wmetisContract,
        method: "function approve(address spender, uint256 amount) external returns (bool)",
        params: [CONTRACT_ADDRESS.MARKETPLACE_V5, totalPriceWei],
      });
      
      const approveTx = await sendTransaction({
        transaction: approveCall,
        account,
      });
      
      console.log("Approve transaction:", approveTx);
      
      // Step 3: Buy the NFT from the marketplace
      console.log("Buying NFT from marketplace...");
      
      const buyCall = prepareContractCall({
        contract: marketplaceContract,
        method: "function buyFromListing(uint256 _listingId, address _buyer, uint256 _quantity, address _currency, uint256 _totalPrice) external",
        params: [
          BigInt(listing.listingId), 
          account.address, 
          BigInt(quantity), 
          WMETIS_CONTRACT_ADDRESS, 
          totalPriceWei
        ],
      });
      
      const buyTx = await sendTransaction({
        transaction: buyCall,
        account,
      });
      
      console.log("Buy transaction:", buyTx);
      
      // Handle successful transaction
      handleTransactionSuccess(buyTx);
      
      return buyTx;
    } catch (error) {
      console.error("Error in wrapAndBuy:", error);
      // Handle transaction error
      handleTransactionError(error as Error);
      throw error;
    }
  };

  return { 
    wrapAndBuy,
    isProcessing: isLoading
  };
} 