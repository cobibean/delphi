"use client";

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { useActiveAccount } from "thirdweb/react";
import { getContract } from "thirdweb/contract";
import { getOwnedNFTs } from "thirdweb/extensions/erc721";
import { getNFT } from "thirdweb/extensions/erc1155";
import { client } from "@/config/client";
import { metisChain } from "@/config/chain";
import { useToast } from '@/components/feedback/Toast/useToast';

interface NFTCarouselProps {
  onSelectNFT: (contractAddress: string, tokenId: string, name: string, image: string) => void;
  contractAddress?: string;
}

interface NFT {
  id: bigint;
  metadata: {
    name?: string;
    image?: string;
  };
  owner: string;
  type: string;
}

export function NFTCarousel({ onSelectNFT, contractAddress }: NFTCarouselProps) {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNFT, setSelectedNFT] = useState<string | null>(null);
  const [collections, setCollections] = useState<string[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNFTs, setFilteredNFTs] = useState<NFT[]>([]);
  
  const account = useActiveAccount();
  const { toast } = useToast();
  
  // Collection names mapping (for demo purposes)
  const collectionNames: Record<string, string> = {
    "0x1234567890123456789012345678901234567890": "Delphi Prophecies",
    "0x2345678901234567890123456789012345678901": "Metis Artifacts",
    "0x3456789012345678901234567890123456789012": "Oracle Visions",
    // Add more mappings as needed
  };
  
  // Format IPFS URLs
  const formatIPFSUrl = (url: string): string => {
    if (!url) return '';
    
    if (url.startsWith('ipfs://')) {
      return url.replace('ipfs://', 'https://ipfs.io/ipfs/');
    }
    
    return url;
  };
  
  // Fetch NFTs owned by the connected wallet
  useEffect(() => {
    const fetchNFTs = async () => {
      if (!account) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        
        // If a specific contract address is provided, only fetch NFTs from that contract
        if (contractAddress) {
          const contract = getContract({
            client,
            chain: metisChain,
            address: contractAddress as `0x${string}`,
          });
          
          const ownedNFTs = await getOwnedNFTs({
            contract,
            owner: account.address,
          });
          
          const formattedNFTs = ownedNFTs.map(nft => ({
            id: nft.id,
            metadata: {
              name: nft.metadata.name || `NFT #${nft.id.toString()}`,
              image: nft.metadata.image || '',
            },
            owner: account.address,
            type: 'ERC721',
          }));
          
          setNfts(formattedNFTs);
          setCollections([contractAddress]);
          setSelectedCollection(contractAddress);
        } else {
          // For demo purposes, we'll simulate fetching from multiple collections
          // In a real app, you would need to know which contracts to query
          const demoCollections = Object.keys(collectionNames);
          
          let allNFTs: NFT[] = [];
          
          for (const collectionAddress of demoCollections) {
            try {
              const contract = getContract({
                client,
                chain: metisChain,
                address: collectionAddress as `0x${string}`,
              });
              
              const ownedNFTs = await getOwnedNFTs({
                contract,
                owner: account.address,
              });
              
              const formattedNFTs = ownedNFTs.map(nft => ({
                id: nft.id,
                metadata: {
                  name: nft.metadata.name || `NFT #${nft.id.toString()}`,
                  image: nft.metadata.image || '',
                },
                owner: account.address,
                type: 'ERC721',
              }));
              
              allNFTs = [...allNFTs, ...formattedNFTs];
            } catch (err) {
              console.error(`Error fetching NFTs from ${collectionAddress}:`, err);
            }
          }
          
          setNfts(allNFTs);
          setCollections(demoCollections);
        }
      } catch (err) {
        console.error("Error fetching NFTs:", err);
        toast.error('Failed to fetch NFTs. Please try again later.');
        setError("Failed to load your NFTs. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchNFTs();
  }, [account, contractAddress]);
  
  // Filter NFTs based on search query and selected collection
  useEffect(() => {
    let filtered = [...nfts];
    
    // Filter by collection if one is selected
    if (selectedCollection) {
      // In a real app, you would filter by the contract address
      // This is just a placeholder for the demo
      filtered = filtered.filter(nft => true);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(nft => 
        nft.metadata.name?.toLowerCase().includes(query) ||
        nft.id.toString().includes(query)
      );
    }
    
    setFilteredNFTs(filtered);
  }, [nfts, selectedCollection, searchQuery]);
  
  // Handle NFT selection
  const handleSelectNFT = (nft: NFT) => {
    const tokenId = nft.id.toString();
    const contractAddr = selectedCollection || contractAddress || "";
    
    setSelectedNFT(tokenId);
    
    onSelectNFT(
      contractAddr,
      tokenId,
      nft.metadata.name || `NFT #${tokenId}`,
      formatIPFSUrl(nft.metadata.image || "")
    );
  };
  
  // Get collection name from address
  const getCollectionName = (address: string): string => {
    return collectionNames[address] || `Collection ${address.substring(0, 6)}...`;
  };

  // Update error handling in image loading
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    toast.warning("Failed to load NFT image, using placeholder");
    target.src = "https://via.placeholder.com/200?text=No+Image";
  };

  return (
    <div className="w-full">
      {/* Search and Filter Controls */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name or token ID..."
            className="w-full bg-sinister-black/50 border border-sinister-orange/30 rounded-md px-4 py-2 text-sinister-scroll focus:outline-none focus:ring-2 focus:ring-sinister-orange/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sinister-orange/50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        {collections.length > 1 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCollection(null)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                selectedCollection === null
                  ? "bg-sinister-orange text-sinister-black"
                  : "bg-sinister-black/40 text-sinister-scroll border border-sinister-orange/30"
              }`}
            >
              All Collections
            </button>
            
            {collections.map((collection) => (
              <button
                key={collection}
                onClick={() => setSelectedCollection(collection)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  selectedCollection === collection
                    ? "bg-sinister-orange text-sinister-black"
                    : "bg-sinister-black/40 text-sinister-scroll border border-sinister-orange/30"
                }`}
              >
                {getCollectionName(collection)}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin h-10 w-10 border-4 border-sinister-orange border-t-transparent rounded-full"></div>
        </div>
      )}
      
      {/* Error State */}
      {error && (
        <div className="bg-sinister-red/10 border border-sinister-red/30 rounded-md p-4 text-center">
          <p className="text-sinister-red">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-sinister-red/20 hover:bg-sinister-red/30 text-sinister-red rounded-md transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
      
      {/* Empty State */}
      {!loading && !error && filteredNFTs.length === 0 && (
        <div className="text-center py-12 border border-dashed border-sinister-scroll/30 rounded-md">
          <div className="text-sinister-scroll/70 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-heading text-sinister-orange mb-2">No NFTs Found</h3>
            <p className="text-sinister-scroll/70">
              {searchQuery
                ? "No NFTs match your search criteria."
                : "You don't own any NFTs in this collection yet."}
            </p>
          </div>
        </div>
      )}
      
      {/* NFT Grid */}
      {!loading && !error && filteredNFTs.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredNFTs.map((nft) => (
            <motion.div
              key={nft.id.toString()}
              className={`relative overflow-hidden border rounded-md cursor-pointer transition-all ${
                selectedNFT === nft.id.toString()
                  ? "border-sinister-orange shadow-glow-sm"
                  : "border-sinister-orange/20 hover:border-sinister-orange/60"
              }`}
              onClick={() => handleSelectNFT(nft)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="aspect-square bg-sinister-black/50 relative">
                {nft.metadata.image ? (
                  <img
                    src={formatIPFSUrl(nft.metadata.image)}
                    alt={nft.metadata.name || `NFT #${nft.id.toString()}`}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-sinister-black/30">
                    <span className="text-sinister-scroll/50 text-sm">No Image</span>
                  </div>
                )}
                
                {/* Selection Indicator */}
                {selectedNFT === nft.id.toString() && (
                  <div className="absolute top-2 right-2 bg-sinister-orange rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-sinister-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                
                {/* Token ID Badge */}
                <div className="absolute bottom-2 left-2 bg-sinister-black/70 px-2 py-1 text-xs font-mono text-sinister-teal rounded">
                  #{nft.id.toString()}
                </div>
              </div>
              
              <div className="p-2 bg-sinister-black/30">
                <p className="text-sinister-scroll text-sm truncate">
                  {nft.metadata.name || `NFT #${nft.id.toString()}`}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
} 