"use client";

import { formatIPFSUrl } from '@/app/utils/ipfs';
import { useToast } from '@/components/feedback/Toast/useToast';
import { metisChain } from '@/config/chain';
import { ethers } from 'ethers';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useActiveAccount } from 'thirdweb/react';

interface MintCardProps {
  contractAddress: string;
  tokenId?: string;
  className?: string;
}

/**
 * MintCard component for displaying and minting NFTs from a collection
 * 
 * This component allows users to mint NFTs from a newly deployed collection,
 * displaying collection metadata and minting controls.
 */
export const MintCard: React.FC<MintCardProps> = ({ 
  contractAddress,
  tokenId,
  className = '',
}) => {
  const account = useActiveAccount();
  const { toast } = useToast();
  const [metadata, setMetadata] = useState<any>(null);
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch contract metadata
  useEffect(() => {
    const fetchContractMetadata = async () => {
      if (!contractAddress) {
        setIsLoadingMetadata(false);
        return;
      }

      try {
        setIsLoadingMetadata(true);
        setError(null);

        // Try to get contract metadata (name, image, description)
        try {
          // Using ethers directly 
          const provider = new ethers.JsonRpcProvider(metisChain.rpc);
          const abi = ["function name() view returns (string)"];
          const ethersContract = new ethers.Contract(contractAddress, abi, provider);
          
          // Use ethers to make the call
          const name = await ethersContract.name();
          
          // For image and description, we'll try to use a standard metadata URI if available
          let image = '';
          let description = '';
          
          try {
            // Try to get contractURI if available
            const uriAbi = ["function contractURI() view returns (string)"];
            const uriContract = new ethers.Contract(contractAddress, uriAbi, provider);
            const contractURI = await uriContract.contractURI();
            
            if (contractURI) {
              const formattedURI = formatIPFSUrl(contractURI);
              const response = await fetch(formattedURI);
              const data = await response.json();
              
              image = formatIPFSUrl(data.image || '');
              description = data.description || '';
            }
          } catch (metadataError) {
            console.warn('Could not fetch contract URI metadata:', metadataError);
          }
          
          setMetadata({
            name: name || 'Unnamed Collection',
            image,
            description
          });
        } catch (err) {
          console.warn('Error fetching contract metadata with standard methods, using fallbacks:', err);
          
          // Fallback: Set default values
          setMetadata({
            name: 'Unnamed Collection',
            image: '',
            description: 'No description available'
          });
        }
      } catch (err) {
        console.error('Error initializing contract:', err);
        setError(err instanceof Error ? err : new Error('Failed to load collection data'));
        
        // Set fallback metadata even on error
        setMetadata({
          name: 'Unnamed Collection',
          image: '',
          description: 'Failed to load collection data'
        });
      } finally {
        setIsLoadingMetadata(false);
      }
    };

    fetchContractMetadata();
  }, [contractAddress]);

  // Placeholder for minting function
  const handleMint = () => {
    // TODO: Implement minting functionality when needed
    toast.success(
      "Mint Feature Coming Soon",
      "This is a placeholder for the minting functionality"
    );
  };

  if (isLoadingMetadata) {
    return (
      <div className={`bg-gray-100 dark:bg-gray-800 rounded-xl p-4 animate-pulse ${className}`}>
        <div className="w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden ${className}`}>
      <div className="relative w-full aspect-square">
        {metadata?.image ? (
          <Image
            src={metadata.image}
            alt={metadata?.name || "NFT Collection"}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{metadata?.name || "Unnamed Collection"}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{metadata?.description || "No description"}</p>
        
        <button
          onClick={handleMint}
          disabled={!account}
          className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {account ? "Mint NFT" : "Connect Wallet to Mint"}
        </button>
      </div>
    </div>
  );
};

export default MintCard;