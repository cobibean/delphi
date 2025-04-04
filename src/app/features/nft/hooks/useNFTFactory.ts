"use client";

import { useToast } from "@/app/components/feedback";
import { useTransaction } from "@/app/providers/TransactionProvider";
import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import {
    deployERC1155Drop,
    deployERC721Drop,
    getFormattedFactoryFee,
    type ERC1155DeployParams,
    type ERC721DeployParams
} from "../services/nftFactoryService";

/**
 * Hook for interacting with the NFT Factory contract
 * Provides functions to deploy ERC721 and ERC1155 contracts
 */
export function useNFTFactory() {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedAddress, setDeployedAddress] = useState<string | null>(null);
  const [deploymentFee, setDeploymentFee] = useState<string | null>(null);
  const [isLoadingFee, setIsLoadingFee] = useState(false);
  
  const { toast } = useToast();
  const account = useActiveAccount();
  const { addTransaction } = useTransaction();
  
  /**
   * Fetch the current deployment fee
   */
  const fetchDeploymentFee = async () => {
    try {
      setIsLoadingFee(true);
      const formattedFee = await getFormattedFactoryFee();
      setDeploymentFee(formattedFee);
      return formattedFee;
    } catch (error) {
      console.error("Failed to fetch deployment fee:", error);
      toast.error(
        "Error",
        "Could not fetch the deployment fee"
      );
      return null;
    } finally {
      setIsLoadingFee(false);
    }
  };
  
  /**
   * Deploy a new ERC721 collection
   * @param params ERC721 deployment parameters
   * @returns Deployed contract address or null if failed
   */
  const deployERC721Collection = async (params: Omit<ERC721DeployParams, "defaultAdmin">) => {
    if (!account) {
      toast.error(
        "Error",
        "Please connect your wallet to deploy a collection"
      );
      return null;
    }
    
    setIsDeploying(true);
    setDeployedAddress(null);
    
    try {
      // Add transaction to provider
      addTransaction(
        "loading",
        "Deploying ERC721 Collection",
        `Deploying collection "${params.name}" (${params.symbol})`
      );
      
      // Set the defaultAdmin to the connected wallet
      const deployParams: ERC721DeployParams = {
        ...params,
        defaultAdmin: account.address,
      };
      
      // Deploy the collection
      const result = await deployERC721Drop(deployParams, account);
      
      if (!result?.transactionHash) {
        throw new Error("Transaction failed");
      }
      
      // Transaction was successful, but we need to extract the deployed address
      // This would typically come from transaction events/logs
      // For now, we'll track it manually after the fact
      
      // Update transaction status
      addTransaction(
        "success",
        "ERC721 Collection Deployed",
        result.transactionHash
      );
      
      toast.success(
        "Success",
        "Your ERC721 collection has been deployed"
      );
      
      // Set deployed address (ideally this would come from events)
      // setDeployedAddress(deployedAddress);
      
      return true;
    } catch (error) {
      console.error("Failed to deploy ERC721 collection:", error);
      
      // Update transaction status
      addTransaction(
        "error",
        "ERC721 Collection Deployment Failed",
        error instanceof Error ? error.message : "Unknown error"
      );
      
      toast.error(
        "Deployment Failed",
        error instanceof Error ? error.message : "Unknown error occurred"
      );
      
      return null;
    } finally {
      setIsDeploying(false);
    }
  };
  
  /**
   * Deploy a new ERC1155 collection
   * @param params ERC1155 deployment parameters
   * @returns Deployed contract address or null if failed
   */
  const deployERC1155Collection = async (params: Omit<ERC1155DeployParams, "defaultAdmin">) => {
    if (!account) {
      toast.error(
        "Error",
        "Please connect your wallet to deploy a collection"
      );
      return null;
    }
    
    setIsDeploying(true);
    setDeployedAddress(null);
    
    try {
      // Add transaction to provider
      addTransaction(
        "loading",
        "Deploying ERC1155 Collection",
        `Deploying collection "${params.name}" (${params.symbol})`
      );
      
      // Set the defaultAdmin to the connected wallet
      const deployParams: ERC1155DeployParams = {
        ...params,
        defaultAdmin: account.address,
      };
      
      // Deploy the collection
      const result = await deployERC1155Drop(deployParams, account);
      
      if (!result?.transactionHash) {
        throw new Error("Transaction failed");
      }
      
      // Update transaction status
      addTransaction(
        "success",
        "ERC1155 Collection Deployed",
        result.transactionHash
      );
      
      toast.success(
        "Success",
        "Your ERC1155 collection has been deployed"
      );
      
      // Set deployed address (ideally this would come from events)
      // setDeployedAddress(deployedAddress);
      
      return true;
    } catch (error) {
      console.error("Failed to deploy ERC1155 collection:", error);
      
      // Update transaction status
      addTransaction(
        "error",
        "ERC1155 Collection Deployment Failed",
        error instanceof Error ? error.message : "Unknown error"
      );
      
      toast.error(
        "Deployment Failed",
        error instanceof Error ? error.message : "Unknown error occurred"
      );
      
      return null;
    } finally {
      setIsDeploying(false);
    }
  };
  
  return {
    // State
    isDeploying,
    deployedAddress,
    deploymentFee,
    isLoadingFee,
    
    // Functions
    fetchDeploymentFee,
    deployERC721Collection,
    deployERC1155Collection,
  };
} 