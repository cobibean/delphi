'use client';

import { Button } from '@/app/components/ui/Button';
import * as nftFactoryService from '@/app/features/nft/services/nftFactoryService';
import * as nftManagementService from '@/app/features/nft/services/nftManagementService';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiBarChart2, FiBox, FiEdit, FiGrid, FiImage, FiPackage, FiPlus } from 'react-icons/fi';
import { useActiveAccount } from 'thirdweb/react';

// Define WalletAddress type for consistency
type WalletAddress = `0x${string}`;

type Collection = {
  address: WalletAddress;
  name: string;
  symbol: string;
  type: 'ERC721' | 'ERC1155';
  imageUrl?: string;
  totalSupply?: number;
};

export default function MyCollectionsPage() {
  const account = useActiveAccount();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchCollections() {
      if (!account?.address) return;
      
      try {
        setLoading(true);
        
        // Get all deployed collections for this user
        const deployedCollections = await nftFactoryService.getDeployedCollections(account.address);
        
        // Fetch metadata for each collection
        const collectionsWithMetadata = await Promise.all(
          deployedCollections.map(async (address: WalletAddress) => {
            try {
              const collectionType = await nftFactoryService.getCollectionType(address);
              const metadata = await nftManagementService.getContractMetadata(address);
              const totalSupply = await nftManagementService.getTotalSupply(address, 0);
              
              // Ensure we have a valid type
              const type: 'ERC721' | 'ERC1155' = 
                collectionType === 'ERC721' || collectionType === 'ERC1155' 
                  ? collectionType 
                  : 'ERC721'; // Default to ERC721 if unknown
              
              return {
                address,
                name: metadata.name || 'Unnamed Collection',
                symbol: metadata.symbol || '???',
                type,
                imageUrl: metadata.image,
                totalSupply: totalSupply.toNumber(),
              };
            } catch (error) {
              console.error(`Error fetching metadata for ${address}:`, error);
              
              // Return basic info if metadata fetch fails
              return {
                address,
                name: 'Collection',
                symbol: '???',
                type: 'ERC721' as const,
              };
            }
          })
        );
        
        setCollections(collectionsWithMetadata);
      } catch (error) {
        console.error('Error fetching collections:', error);
      } finally {
        setLoading(false);
      }
    }
    
    if (account) {
      fetchCollections();
    }
  }, [account]);
  
  // Collection card component
  const CollectionCard = ({ collection }: { collection: Collection }) => {
    return (
      <Link href={`/dashboard/collections/${collection.address}`} className="block">
        <div className="bg-ancient-wisdom border border-oracle-orange/20 rounded-xl overflow-hidden hover:shadow-card-hover transition-all">
          {/* Card Header/Image */}
          <div className="h-40 bg-gradient-to-br from-cosmic-combustion/20 to-oracle-orange/20 relative">
            {collection.imageUrl ? (
              <Image 
                src={collection.imageUrl} 
                alt={collection.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FiImage className="text-oracle-orange/40 w-16 h-16" />
              </div>
            )}
          </div>
          
          {/* Card Content */}
          <div className="p-6">
            <div className="flex items-center mb-2">
              <div className="px-2 py-1 bg-oracle-black/30 rounded text-xs font-mono text-oracle-orange">{collection.type}</div>
              <div className="ml-2 text-xs text-oracle-white/60">{collection.symbol}</div>
            </div>
            
            <h3 className="font-heading text-xl text-oracle-turquoise mb-3 truncate">{collection.name}</h3>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center text-oracle-white/70 text-sm">
                <FiBox className="mr-1" />
                <span>{collection.totalSupply !== undefined ? collection.totalSupply : '?'} NFTs</span>
              </div>
              
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>
          </div>
        </div>
      </Link>
    );
  };
  
  // Empty state component
  const EmptyState = () => {
    return (
      <div className="bg-ancient-wisdom border border-oracle-orange/20 rounded-xl p-8 text-center">
        <div className="w-20 h-20 bg-cosmic-connection rounded-full mx-auto flex items-center justify-center mb-6">
          <FiGrid className="h-10 w-10 text-oracle-white" />
        </div>
        <h3 className="font-heading text-2xl text-oracle-turquoise mb-3">No Collections Yet</h3>
        <p className="text-oracle-white/70 mb-6 max-w-md mx-auto">
          You haven't created any NFT collections yet. Start by deploying your first collection contract.
        </p>
        <Link href="/features/nft/create">
          <Button variant="primary" rightIcon={<FiPlus />} animation="pulse" withShine>
            Create Your First Collection
          </Button>
        </Link>
      </div>
    );
  };
  
  return (
    <main className="bg-oracle-black min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <h1 className="font-heading text-4xl text-oracle-orange">My Collections</h1>
              
              <Link href="/features/nft/create">
                <Button variant="primary" rightIcon={<FiPlus />}>
                  Create New Collection
                </Button>
              </Link>
            </div>
            <p className="text-oracle-white/70 max-w-2xl">
              Manage your NFT collections, mint new tokens, and configure sales.
            </p>
          </header>
          
          {/* Content */}
          {loading ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 border-4 border-oracle-orange/30 border-t-oracle-orange rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-oracle-white">Loading your collections...</p>
            </div>
          ) : collections.length > 0 ? (
            <div>
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-ancient-wisdom border border-oracle-orange/20 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-cosmic-connection rounded-full flex items-center justify-center mr-3">
                      <FiPackage className="h-5 w-5 text-oracle-white" />
                    </div>
                    <h3 className="font-heading text-lg text-oracle-turquoise">Total Collections</h3>
                  </div>
                  <p className="text-3xl font-heading text-oracle-orange">{collections.length}</p>
                </div>
                
                <div className="bg-ancient-wisdom border border-oracle-orange/20 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-cosmic-connection rounded-full flex items-center justify-center mr-3">
                      <FiEdit className="h-5 w-5 text-oracle-white" />
                    </div>
                    <h3 className="font-heading text-lg text-oracle-turquoise">Latest Activity</h3>
                  </div>
                  <p className="text-sm text-oracle-white/70">Recently updated collections</p>
                </div>
                
                <div className="bg-ancient-wisdom border border-oracle-orange/20 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-cosmic-connection rounded-full flex items-center justify-center mr-3">
                      <FiBarChart2 className="h-5 w-5 text-oracle-white" />
                    </div>
                    <h3 className="font-heading text-lg text-oracle-turquoise">Analytics</h3>
                  </div>
                  <p className="text-sm text-oracle-white/70">View your collection stats</p>
                </div>
              </div>
              
              {/* Collection Grid */}
              <h2 className="font-heading text-2xl text-oracle-orange mb-6">Your Collections</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections.map((collection) => (
                  <CollectionCard key={collection.address} collection={collection} />
                ))}
              </div>
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </main>
  );
} 