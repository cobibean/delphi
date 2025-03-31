"use client";

import { metisChain } from "@/app/config/chain";
import { client } from "@/app/config/client";
import { INFTMetadata } from "@/app/interfaces/interfaces";
import { useEffect, useState } from "react";
import { getContract } from "thirdweb";
import { getOwnedNFTs } from "thirdweb/extensions/erc721";
import { useActiveAccount } from "thirdweb/react";

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

interface NFTItem {
  id: string;
  metadata: INFTMetadata;
  tokenURI: string;
  owner: string;
  type: "ERC721" | "ERC1155";
  contractAddress: string;
}

interface UseNFTCollectionProps {
  contractAddress: string;
  ownerAddress?: string; // Optional, defaults to connected wallet
}

interface UseNFTCollectionReturn {
  nfts: NFTItem[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for fetching NFTs from a collection
 * @param contractAddress The NFT contract address
 * @param ownerAddress Optional owner address, defaults to connected wallet
 */
export function useNFTCollection({
  contractAddress,
  ownerAddress
}: UseNFTCollectionProps): UseNFTCollectionReturn {
  const account = useActiveAccount();
  const [nfts, setNfts] = useState<NFTItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchNFTs = async () => {
    if (!contractAddress) {
      setIsLoading(false);
      return;
    }

    // Use provided owner address or fall back to connected wallet
    const owner = ownerAddress || account?.address;
    if (!owner) {
      setError(new Error("No owner address provided and no wallet connected"));
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
        address: contractAddress,
      });

      // Fetch NFTs using ThirdWeb v5
      const ownedNFTs = await getOwnedNFTs({
        contract,
        owner,
      });

      // Format the NFTs
      const formattedNFTs = ownedNFTs.map(nft => {
        // Format the image URL if it exists
        let formattedMetadata = { ...nft.metadata };
        if (formattedMetadata.image) {
          formattedMetadata.image = formatIPFSUrl(formattedMetadata.image);
        }

        return {
          id: nft.id.toString(),
          metadata: formattedMetadata as INFTMetadata,
          tokenURI: nft.tokenURI,
          owner,
          type: "ERC721" as const,
          contractAddress
        };
      });

      setNfts(formattedNFTs);
    } catch (err) {
      console.error("Error fetching NFTs:", err);
      setError(err instanceof Error ? err : new Error("Failed to fetch NFTs"));
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch NFTs on mount and when dependencies change
  useEffect(() => {
    fetchNFTs();
  }, [contractAddress, ownerAddress, account?.address]);

  return {
    nfts,
    isLoading,
    error,
    refetch: fetchNFTs
  };
} 