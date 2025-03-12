import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useActiveAccount } from "thirdweb/react";
import { getContract } from "thirdweb/contract";
import { getOwnedNFTs } from "thirdweb/extensions/erc721";
import { getNFT } from "thirdweb/extensions/erc1155";
import { client } from "@/app/config/client";
import { metisChain } from "@/app/config/chain";

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
  tokenURI: string;
  type: "ERC721" | "ERC1155";
  owner: string | null;
  contractAddress: string;
}

// List of known NFT contracts on Metis to scan
// This would ideally come from a database or API
const KNOWN_NFT_CONTRACTS: string[] = [
  "0x3d9a9BA8D73c81a754ebCCA6a2483A2F8C7a5403",
  "0x07b131a7bAd4bc21A898E8F9EeE530fdD8Ab9a03",
  "0xe292CE0Bef0e77F42B1A3A3f63cBAd9750aA60e2" 
];

export default function NFTCarousel({ onSelectNFT, contractAddress }: NFTCarouselProps) {
  const account = useActiveAccount();
  const [ownedNFTs, setOwnedNFTs] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasMoreNFTs, setHasMoreNFTs] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const PAGE_SIZE = 10; // Number of NFTs to load per page

  // Format IPFS URL helper
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

  // Fetch NFTs from a specific contract
  const fetchNFTsFromContract = async (contractAddr: string, ownerAddr: string) => {
    try {
      // Check if address is valid (basic validation)
      if (!contractAddr || !contractAddr.startsWith('0x') || contractAddr.length !== 42) {
        console.log(`Skipping invalid contract address: ${contractAddr}`);
        return [];
      }
      
      try {
        const contract = getContract({
          client,
          chain: metisChain,
          address: contractAddr,
        });
        
        // Try to get ERC721 NFTs
        try {
          const erc721NFTs = await getOwnedNFTs({
            contract,
            owner: ownerAddr,
          });
          
          return erc721NFTs.map(nft => ({
            ...nft,
            contractAddress: contractAddr
          }));
        } catch (err) {
          console.log(`Not an ERC721 contract or no NFTs found for ${contractAddr}`);
          return [];
        }
      } catch (err) {
        console.error(`Error fetching NFTs from contract ${contractAddr}:`, err);
        return [];
      }
    } catch (err) {
      console.error(`Error in fetchNFTsFromContract for ${contractAddr}:`, err);
      return [];
    }
  };

  // Load more NFTs when user reaches the end
  const loadMoreNFTs = async () => {
    if (!account || isLoadingMore) return;
    
    setIsLoadingMore(true);
    
    try {
      // If a specific contract is provided, only fetch from that contract
      if (contractAddress) {
        const newNFTs = await fetchNFTsFromContract(contractAddress, account.address);
        
        // Filter out NFTs we already have
        const uniqueNewNFTs = newNFTs.filter(newNft => 
          !ownedNFTs.some(existingNft => 
            existingNft.contractAddress === newNft.contractAddress && 
            existingNft.id.toString() === newNft.id.toString()
          )
        );
        
        if (uniqueNewNFTs.length > 0) {
          setOwnedNFTs(prev => [...prev, ...uniqueNewNFTs]);
          setHasMoreNFTs(uniqueNewNFTs.length >= PAGE_SIZE);
        } else {
          setHasMoreNFTs(false);
        }
      } else {
        // Calculate which contracts to fetch from based on the current page
        const startIdx = (page - 1) * PAGE_SIZE % KNOWN_NFT_CONTRACTS.length;
        const contractsToFetch = KNOWN_NFT_CONTRACTS.slice(startIdx, startIdx + 3); // Fetch from 3 contracts at a time
        
        let allNewNFTs: NFT[] = [];
        
        // Fetch NFTs from each contract in parallel
        const nftPromises = contractsToFetch.map(addr => fetchNFTsFromContract(addr, account.address));
        const nftResults = await Promise.all(nftPromises);
        
        // Combine all results
        nftResults.forEach(nfts => {
          allNewNFTs = [...allNewNFTs, ...nfts];
        });
        
        // Filter out NFTs we already have
        const uniqueNewNFTs = allNewNFTs.filter(newNft => 
          !ownedNFTs.some(existingNft => 
            existingNft.contractAddress === newNft.contractAddress && 
            existingNft.id.toString() === newNft.id.toString()
          )
        );
        
        if (uniqueNewNFTs.length > 0) {
          setOwnedNFTs(prev => [...prev, ...uniqueNewNFTs]);
          setPage(prev => prev + 1);
          setHasMoreNFTs(true); // Assume there might be more until we've checked all contracts
        } else if (page * PAGE_SIZE < KNOWN_NFT_CONTRACTS.length * 100) { // Arbitrary limit to prevent infinite loading
          // No new NFTs in this batch, but try the next page
          setPage(prev => prev + 1);
          setHasMoreNFTs(true);
        } else {
          setHasMoreNFTs(false);
        }
      }
    } catch (err: any) {
      console.error("Error loading more NFTs:", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    const fetchOwnedNFTs = async () => {
      if (!account) return;
      
      setIsLoading(true);
      setError("");
      setOwnedNFTs([]);
      setCurrentIndex(0);
      setPage(1);
      
      try {
        let nfts: NFT[] = [];
        
        // If a specific contract address is provided, only fetch NFTs from that contract
        if (contractAddress) {
          nfts = await fetchNFTsFromContract(contractAddress, account.address);
        } else {
          // Fetch from the first few known contracts to start
          const initialContracts = KNOWN_NFT_CONTRACTS.slice(0, 3); // Start with first 3 contracts
          
          // Fetch NFTs from each contract in parallel
          const nftPromises = initialContracts.map(addr => fetchNFTsFromContract(addr, account.address));
          const nftResults = await Promise.all(nftPromises);
          
          // Combine all results
          nftResults.forEach(contractNfts => {
            nfts = [...nfts, ...contractNfts];
          });
          
          // Set flag to indicate if there might be more NFTs to load
          setHasMoreNFTs(true);
        }
        
        setOwnedNFTs(nfts);
        
        if (nfts.length === 0) {
          setError(contractAddress 
            ? "No NFTs found for this contract" 
            : "No NFTs found in your wallet");
        }
      } catch (err: any) {
        console.error("Error fetching owned NFTs:", err);
        setError("Error fetching your NFTs: " + (err.message || "Unknown error"));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOwnedNFTs();
  }, [account, contractAddress]);
  
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? ownedNFTs.length - 1 : prevIndex - 1
    );
  };
  
  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    
    // If we're approaching the end and there might be more NFTs, try to load more
    if (nextIndex >= ownedNFTs.length - 3 && hasMoreNFTs && !isLoadingMore) {
      loadMoreNFTs();
    }
    
    setCurrentIndex((prevIndex) => 
      prevIndex === ownedNFTs.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const handleSelect = () => {
    if (ownedNFTs.length === 0) return;
    
    const selectedNFT = ownedNFTs[currentIndex];
    onSelectNFT(
      selectedNFT.contractAddress,
      selectedNFT.id.toString(),
      selectedNFT.metadata.name || `NFT #${selectedNFT.id.toString()}`,
      selectedNFT.metadata.image || ""
    );
  };
  
  if (isLoading) {
    return (
      <div className="bg-oracle-black-matter border border-oracle-orange/20 rounded-xl p-4 w-full">
        <h3 className="text-oracle-orange text-lg mb-2">Your NFTs</h3>
        <div className="flex justify-center items-center h-40">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-2 border-oracle-orange border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-oracle-white/70">Scanning your wallet for NFTs...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (error && ownedNFTs.length === 0) {
    return (
      <div className="bg-oracle-black-matter border border-oracle-orange/20 rounded-xl p-4 w-full">
        <h3 className="text-oracle-orange text-lg mb-2">Your NFTs</h3>
        <div className="text-oracle-white text-center p-4">
          {error}
          {!contractAddress && (
            <div className="mt-2">
              <p className="text-oracle-white/70 mb-2">Try entering a specific NFT contract address above</p>
              <motion.button
                onClick={() => setError("")}
                className="bg-oracle-orange/20 text-oracle-orange px-4 py-2 rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Retry Scan
              </motion.button>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  if (ownedNFTs.length === 0) {
    return (
      <div className="bg-oracle-black-matter border border-oracle-orange/20 rounded-xl p-4 w-full">
        <h3 className="text-oracle-orange text-lg mb-2">Your NFTs</h3>
        <div className="text-oracle-white text-center p-8">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-oracle-black-void rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-oracle-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-oracle-white/70 mb-2">No NFTs found in your wallet</p>
            <p className="text-oracle-white/50 text-sm mb-4">You don't appear to own any NFTs on the Metis blockchain</p>
            <a 
              href="https://metis.io/ecosystem/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-oracle-orange hover:underline"
            >
              Explore Metis NFT projects
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  const currentNFT = ownedNFTs[currentIndex];
  
  return (
    <div className="bg-oracle-black-matter border border-oracle-orange/20 rounded-xl p-4 w-full">
      <h3 className="text-oracle-orange text-lg mb-2">Your NFTs</h3>
      
      <div className="relative">
        <div className="flex justify-center items-center h-40 mb-2 overflow-hidden rounded-lg">
          {currentNFT.metadata.image ? (
            <img 
              src={formatIPFSUrl(currentNFT.metadata.image)} 
              alt={currentNFT.metadata.name || `NFT #${currentNFT.id.toString()}`}
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <div className="bg-oracle-black-void w-full h-full flex items-center justify-center">
              <span className="text-oracle-white/50">No Image</span>
            </div>
          )}
          
          {isLoadingMore && currentIndex === ownedNFTs.length - 1 && (
            <div className="absolute inset-0 bg-oracle-black-void/80 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-2 border-oracle-orange border-t-transparent rounded-full animate-spin mb-2"></div>
                <p className="text-oracle-white/70">Loading more NFTs...</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
          <motion.button
            onClick={handlePrevious}
            className="bg-oracle-black-void/80 text-oracle-white p-2 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </div>
        
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
          <motion.button
            onClick={handleNext}
            className="bg-oracle-black-void/80 text-oracle-white p-2 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </div>
      </div>
      
      <div className="text-center mb-2">
        <p className="text-oracle-white font-medium">
          {currentNFT.metadata.name || `NFT #${currentNFT.id.toString()}`}
        </p>
        <p className="text-oracle-white/70 text-sm">
          Token ID: {currentNFT.id.toString()}
        </p>
        <p className="text-oracle-white/50 text-xs">
          Contract: {`${currentNFT.contractAddress.substring(0, 6)}...${currentNFT.contractAddress.substring(currentNFT.contractAddress.length - 4)}`}
        </p>
      </div>
      
      <div className="flex justify-center">
        <motion.button
          onClick={handleSelect}
          className="bg-oracle-orange text-oracle-white px-4 py-2 rounded-lg font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Select This NFT
        </motion.button>
      </div>
      
      <div className="flex justify-center mt-2">
        <p className="text-oracle-white/50 text-sm">
          {currentIndex + 1} of {ownedNFTs.length}{hasMoreNFTs ? "+" : ""}
        </p>
      </div>
    </div>
  );
} 