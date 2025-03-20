"use client";

import { metisChain } from "@/app/config/chain";
import { client } from "@/app/config/client";
import { INFTAttribute, INFTMetadata } from "@/app/interfaces/interfaces";
import { useEffect, useState } from "react";
import { getContract } from "thirdweb";
import { getNFT } from "thirdweb/extensions/erc721";

// Helper function to handle IPFS URLs
const formatIPFSUrl = (url: string): string => {
  if (!url) return '';
  
  // Handle IPFS URLs
  if (url.startsWith('ipfs://')) {
    return url.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }
  
  // Handle URLs that might be stored with gateway already
  if (url.includes('/ipfs/')) {
    const ipfsHash = url.split('/ipfs/')[1];
    return `https://ipfs.io/ipfs/${ipfsHash}`;
  }
  
  // Handle direct CID format
  if (/^[a-zA-Z0-9]{46}/.test(url)) {
    return `https://ipfs.io/ipfs/${url}`;
  }
  
  return url;
};

interface UseNFTMetadataProps {
  assetContract: string;
  tokenId: string;
}

interface UseNFTMetadataReturn {
  metadata: INFTMetadata | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for fetching and managing NFT metadata
 * @param assetContract The NFT contract address
 * @param tokenId The token ID of the NFT
 */
export function useNFTMetadata({ 
  assetContract, 
  tokenId 
}: UseNFTMetadataProps): UseNFTMetadataReturn {
  const [metadata, setMetadata] = useState<INFTMetadata | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMetadata = async () => {
    if (!assetContract || !tokenId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Get contract instance
      const contract = getContract({
        client,
        chain: metisChain,
        address: assetContract,
      });

      // Fetch NFT data using ThirdWeb v5
      const nft = await getNFT({
        contract,
        tokenId: BigInt(tokenId),
      });

      if (!nft || !nft.metadata) {
        throw new Error("NFT metadata not found");
      }

      // Format the metadata
      const formattedMetadata: INFTMetadata = {
        name: nft.metadata.name || `NFT #${tokenId}`,
        description: nft.metadata.description || "",
        image: nft.metadata.image ? formatIPFSUrl(nft.metadata.image) : "",
        attributes: nft.metadata.attributes ? 
          // Convert attributes to the correct format
          (Array.isArray(nft.metadata.attributes) ? 
            nft.metadata.attributes.map((attr: any) => ({
              trait_type: attr.trait_type || attr.name || "Unknown",
              value: attr.value || attr.text || ""
            })) : 
            []
          ) as INFTAttribute[] : 
          undefined
      };

      setMetadata(formattedMetadata);
    } catch (err) {
      console.error("Error fetching NFT metadata:", err);
      setError(err instanceof Error ? err : new Error("Failed to fetch NFT metadata"));
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch metadata on mount and when dependencies change
  useEffect(() => {
    fetchMetadata();
  }, [assetContract, tokenId]);

  return {
    metadata,
    isLoading,
    error,
    refetch: fetchMetadata
  };
} 