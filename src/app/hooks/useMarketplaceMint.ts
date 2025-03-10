// src/app/hooks/useMarketplaceMint.ts

// This file contains the logic for wrapping and buying an NFT using WMETIS

// sequenceDiagram
//     participant User
//     participant dApp
//     participant WMETIS(WMETIS Contract)
//     participant Marketplace(Marketplace Contract)
    
    // User->>dApp: Clicks "Buy for 1 METIS"
    // dApp->>+WMETIS: deposit() [value=1 METIS]
    // WMETIS-->>-User: Mints 1 WMETIS  
    // dApp->>+Marketplace: buyFromListing(..., WMETIS_ADDRESS, 1 WMETIS)
    // Marketplace->>+WMETIS: transferFrom(user, marketplace, 1 WMETIS)
    // WMETIS-->>-Marketplace: Confirm transfer
    // Marketplace-->>-User: Transfer NFT

"use client";

import { useActiveAccount } from "thirdweb/react";
import { CONTRACT_ADDRESS, WMETIS_CONTRACT_ADDRESS } from "@/app/constants/contracts";
import { IDirectListing } from "@/app/interfaces/interfaces";
import { getContract, prepareContractCall, sendTransaction } from "thirdweb";
import { toWei } from "thirdweb/utils";
import { useToast } from "@/app/hooks/useToast";
import { useTransaction } from "@/app/providers/TransactionProvider";
import { client, metisChain } from "@/app/client";

// Native token address constant - often represented as address(0) in contracts
const NATIVE_TOKEN_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

export function useMarketplaceMint() {
  const account = useActiveAccount();
  const { toast } = useToast();
  const { addTransaction, updateTransaction } = useTransaction();

  const wrapAndBuy = async (listing: IDirectListing, quantity: number) => {
    if (!account) {
      toast({
        title: "Error",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      throw new Error("No connected wallet");
    }

    // Create an initial transaction notification
    const txId = addTransaction("loading", "Preparing to buy NFT...");

    try {
      updateTransaction(txId, "loading", "Step 1/2: Wrapping METIS...");
      
      // Step 1: Wrap METIS to WMETIS
      console.log("Wrapping METIS for direct listing:", listing);
      
      // Get contract instances
      const marketplaceContract = getContract({
        client,
        chain: metisChain,
        address: CONTRACT_ADDRESS,
      });
      
      // Calculate the total price (price per token * quantity)
      const pricePerToken = listing.pricePerToken;
      const totalPrice = (parseFloat(pricePerToken) * quantity).toString();
      const totalPriceWei = toWei(totalPrice);
      
      console.log("Total price in METIS:", totalPrice);
      console.log("Total price in Wei:", totalPriceWei);
      
      // Get the WMETIS contract
      const wmetisContract = getContract({
        client,
        chain: metisChain,
        address: WMETIS_CONTRACT_ADDRESS,
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
      updateTransaction(txId, "loading", "Approving WMETIS for marketplace...");
      
      const approveCall = prepareContractCall({
        contract: wmetisContract,
        method: "function approve(address spender, uint256 amount) external returns (bool)",
        params: [CONTRACT_ADDRESS, totalPriceWei],
      });
      
      const approveTx = await sendTransaction({
        transaction: approveCall,
        account,
      });
      
      console.log("Approve transaction:", approveTx);
      
      // Step 3: Buy the NFT from the marketplace
      console.log("Buying NFT from marketplace...");
      updateTransaction(txId, "loading", "Step 2/2: Buying NFT from marketplace...");
      
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
      
      // Update notification to completed
      updateTransaction(
        txId, 
        "success", 
        "Successfully purchased NFT!", 
        buyTx.transactionHash
      );
      
      return buyTx;
    } catch (error) {
      console.error("Error in wrapAndBuy:", error);
      // Update notification to error
      updateTransaction(
        txId, 
        "error", 
        error instanceof Error ? error.message : "Failed to purchase NFT"
      );
      throw error;
    }
  };

  return { wrapAndBuy };
} 