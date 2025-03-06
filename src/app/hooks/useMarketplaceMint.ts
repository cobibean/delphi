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
import { chain } from "@/app/constants/chain";
import { client } from "@/app/client";
import { getContract, prepareContractCall, sendTransaction } from "thirdweb";
import { toWei } from "thirdweb/utils";
import { useToast } from "@/app/hooks/useToast";
import { useTransaction } from "@/app/providers/TransactionProvider";

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
      // Step 1: Get both contract instances
      const marketplaceContract = getContract({
        client,
        chain,
        address: CONTRACT_ADDRESS,
      });

      // Check listing currency
      const currencyAddress = listing.currency;
      const isNativeCurrency = currencyAddress === NATIVE_TOKEN_ADDRESS;
      
      // Calculate the total cost
      const totalCost = parseFloat(listing.pricePerToken) * quantity;
      const totalCostWei = toWei(totalCost.toString());
      
      // If payment is not in native currency (METIS), we need to wrap
      if (isNativeCurrency) {
        // Direct purchase with native token (METIS)
        updateTransaction(txId, "loading", "Preparing to buy with METIS...");
        
        // Prepare direct buyFromListing transaction with native token
        const buyTx = prepareContractCall({
          contract: marketplaceContract,
          method: "function buyFromListing(uint256 _listingId, address _buyFor, uint256 _quantity, address _currency, uint256 _totalPrice)",
          params: [
            BigInt(listing.listingId),
            account.address,
            BigInt(quantity),
            currencyAddress,
            totalCostWei,
          ],
          value: totalCostWei, // Pass native currency value directly
        });

        // Send buy transaction
        const buyResult = await sendTransaction({
          transaction: buyTx,
          account,
        });

        // Final success notification
        updateTransaction(
          txId, 
          "success", 
          `Successfully purchased ${quantity} NFT${quantity > 1 ? 's' : ''}!`, 
          buyResult.transactionHash
        );

        return {
          transactionHash: buyResult.transactionHash,
        };
      } else if (currencyAddress.toLowerCase() === WMETIS_CONTRACT_ADDRESS.toLowerCase()) {
        // Payment with WMETIS token
        const wmetisContract = getContract({
          client,
          chain,
          address: WMETIS_CONTRACT_ADDRESS,
        });
        
        // Step 2: Wrap METIS into WMETIS
        updateTransaction(txId, "loading", "Wrapping METIS to WMETIS...");
        
        // Create the deposit transaction to wrap METIS to WMETIS
        const depositTx = prepareContractCall({
          contract: wmetisContract,
          method: "function deposit()",
          value: totalCostWei,
        });

        // Send the deposit transaction
        const depositResult = await sendTransaction({
          transaction: depositTx,
          account,
        });

        // Update notification with transaction hash
        updateTransaction(txId, "loading", "Waiting for METIS wrapping confirmation...", depositResult.transactionHash);

        // Step 3: Approve WMETIS for marketplace
        updateTransaction(txId, "loading", "Approving WMETIS for marketplace...");

        // Prepare approval transaction
        const approveTx = prepareContractCall({
          contract: wmetisContract,
          method: "function approve(address spender, uint256 amount)",
          params: [CONTRACT_ADDRESS, totalCostWei],
        });

        // Send approval transaction
        const approveResult = await sendTransaction({
          transaction: approveTx,
          account,
        });

        // Update notification with transaction hash
        updateTransaction(txId, "loading", "Waiting for approval confirmation...", approveResult.transactionHash);

        // Step 4: Buy from listing
        updateTransaction(txId, "loading", "Purchasing NFT...");

        // Prepare buyFromListing transaction
        const buyTx = prepareContractCall({
          contract: marketplaceContract,
          method: "function buyFromListing(uint256 _listingId, address _buyFor, uint256 _quantity, address _currency, uint256 _totalPrice)",
          params: [
            BigInt(listing.listingId),
            account.address,
            BigInt(quantity),
            WMETIS_CONTRACT_ADDRESS,
            totalCostWei,
          ],
        });

        // Send buy transaction
        const buyResult = await sendTransaction({
          transaction: buyTx,
          account,
        });

        // Final success notification
        updateTransaction(
          txId, 
          "success", 
          `Successfully purchased ${quantity} NFT${quantity > 1 ? 's' : ''}!`, 
          buyResult.transactionHash
        );

        return {
          transactionHash: buyResult.transactionHash,
        };
      } else {
        // ERC20 token other than WMETIS
        updateTransaction(
          txId, 
          "error", 
          `This listing requires payment in a token that is not currently supported: ${currencyAddress}`
        );
        throw new Error(`Unsupported payment currency: ${currencyAddress}`);
      }
    } catch (error) {
      console.error("Error in wrapAndBuy:", error);
      
      // Update notification with error
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