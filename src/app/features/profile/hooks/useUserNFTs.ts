"use client";

import { useNFTCollection } from "@/app/features/nft/hooks/useNFTCollection";
import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";

// Use a default NFT contract address - should be replaced with actual contract from your config
const DEFAULT_NFT_CONTRACT_ADDRESS = "0x8378411F6EDC0CC42A162c844617E7f8b533CAAC";

// Types for NFT items
export interface NFTItem {
  id: string;
  name: string;
  description: string;
  image: string;
  attributes: any[];
  contractAddress: string;
}

// Hook parameters
interface UseUserNFTsProps {
  contractAddresses?: string[];
}

// Hook return value
interface UseUserNFTsReturn {
  nfts: NFTItem[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  totalCount: number;
}

/**
 * Custom hook for fetching NFTs owned by the connected user
 */
export function useUserNFTs({ 
  contractAddresses = [DEFAULT_NFT_CONTRACT_ADDRESS] 
}: UseUserNFTsProps = {}): UseUserNFTsReturn {
  const account = useActiveAccount();
  const [allNfts, setAllNfts] = useState<NFTItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Use main collection hook for primary NFT contract
  const primaryCollection = useNFTCollection({
    contractAddress: DEFAULT_NFT_CONTRACT_ADDRESS,
    ownerAddress: account?.address
  });

  useEffect(() => {
    const fetchAllNFTs = async () => {
      if (!account) {
        setAllNfts([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // For now, just use the primary collection NFTs
        // In the future, we could fetch from multiple contracts
        const formattedNfts = primaryCollection.nfts.map(nft => ({
          id: nft.id,
          name: nft.metadata.name || `NFT #${nft.id}`,
          description: nft.metadata.description || "",
          image: nft.metadata.image || "",
          attributes: nft.metadata.attributes || [],
          contractAddress: nft.contractAddress
        }));

        setAllNfts(formattedNfts);
      } catch (err) {
        console.error("Error in useUserNFTs:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch user NFTs"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllNFTs();
  }, [account, primaryCollection.nfts]);

  // Refetch function that combines all refetches
  const refetch = () => {
    primaryCollection.refetch();
  };

  return {
    nfts: allNfts,
    isLoading: isLoading || primaryCollection.isLoading,
    error: error || primaryCollection.error,
    refetch,
    totalCount: allNfts.length
  };
} 