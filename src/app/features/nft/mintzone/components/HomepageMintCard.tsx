"use client";

import { metisChain } from "@/app/config/chain";
import { client } from "@/app/config/client";
import { useEffect, useState } from "react";
import { getContract } from "thirdweb";
import { getContractMetadata } from "thirdweb/extensions/common";
import { getActiveClaimCondition as getActiveClaimCondition1155, isERC1155 } from "thirdweb/extensions/erc1155";
import { getCurrencyMetadata } from "thirdweb/extensions/erc20";
import { getActiveClaimCondition, isERC721 } from "thirdweb/extensions/erc721";
import { MintCard } from "./MintCard";

interface HomepageMintCardProps {
  contractAddress: string;
  tokenId?: bigint;
  className?: string;
}

export function HomepageMintCard({
  contractAddress,
  tokenId = BigInt(0),
  className,
}: HomepageMintCardProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nftInfo, setNftInfo] = useState<any>(null);

  useEffect(() => {
    async function loadNFTData() {
      try {
        setLoading(true);
        setError(null);

        // Get the contract
        const contract = getContract({ address: contractAddress, chain: metisChain, client });
        
        // Determine ERC type
        const [isErc721Result, isErc1155Result] = await Promise.all([
          isERC721({ contract }).catch(() => false),
          isERC1155({ contract }).catch(() => false),
        ]);
        
        // Get contract metadata
        const metadata = await getContractMetadata({ contract }).catch(() => undefined);
        
        // Get claim conditions based on contract type
        let claimCondition;
        if (isErc1155Result) {
          claimCondition = await getActiveClaimCondition1155({ contract, tokenId }).catch(() => undefined);
        } else if (isErc721Result) {
          claimCondition = await getActiveClaimCondition({ contract }).catch(() => undefined);
        }
        
        // Extract display name and description
        const displayName = metadata?.data?.name || metadata?.name || "NFT Collection";
        const description = metadata?.data?.description || metadata?.description || "Mint your NFT from this collection";
        
        // Get currency metadata and price
        let currencyMetadata;
        let pricePerToken = null;
        
        if (claimCondition?.currency) {
          const currencyContract = getContract({ 
            address: claimCondition.currency, 
            chain: metisChain, 
            client 
          });
          
          currencyMetadata = await getCurrencyMetadata({ contract: currencyContract }).catch(() => undefined);
          
          const priceInWei = claimCondition.pricePerToken;
          if (currencyMetadata && priceInWei) {
            // Convert to human-readable format
            pricePerToken = Number(priceInWei) / Math.pow(10, currencyMetadata.decimals);
          }
        }
        
        setNftInfo({
          contract,
          displayName,
          description,
          contractImage: metadata?.data?.image || metadata?.image || "",
          currencySymbol: "METIS",
          pricePerToken: pricePerToken || 0,
          isERC1155: isErc1155Result,
          isERC721: isErc721Result,
          tokenId,
        });
      } catch (err: any) {
        setError(err.message || "Failed to load NFT data");
        console.error("Error loading NFT data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadNFTData();
  }, [contractAddress, tokenId]);

  if (loading) {
    return (
      <div className={`bg-gray-100 dark:bg-gray-800 rounded-xl p-4 animate-pulse ${className}`}>
        <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-6"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  if (error || !nftInfo) {
    return (
      <div className={`bg-gray-100 dark:bg-gray-800 rounded-xl p-4 ${className}`}>
        <p className="text-red-500">Failed to load NFT data</p>
      </div>
    );
  }

  return (
    <MintCard
      {...nftInfo}
      className={className}
    />
  );
} 