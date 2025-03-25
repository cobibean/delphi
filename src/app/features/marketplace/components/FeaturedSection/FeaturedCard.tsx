"use client";
import { formatIPFSUrl } from "@/app/utils/format";
import { useToast } from "@/components/feedback/Toast/useToast";
import { IListingWithNFT } from "@/interfaces/interfaces";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useActiveAccount } from "thirdweb/react";

interface FeaturedCardProps {
  listing: IListingWithNFT;
  className?: string;
  onAcquire?: (listing: IListingWithNFT) => Promise<void>;
}

export default function FeaturedCard({ listing, className, onAcquire }: FeaturedCardProps) {
  const { metadata, collectionName, pricePerToken, listingId, tokenId, assetContract } = listing;
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [glitchText, setGlitchText] = useState(false);
  const { toast } = useToast();
  const account = useActiveAccount();
  const router = useRouter();
  
  // Get all possible image URLs to try
  const imageUrls = useMemo(() => {
    if (!metadata?.image) return [];
    
    const originalUrl = metadata.image;
    const ipfsUrl = formatIPFSUrl(originalUrl);
    
    // Try multiple IPFS gateways
    const gateways = [
      'https://ipfs.io/ipfs/',
      'https://cloudflare-ipfs.com/ipfs/',
      'https://gateway.pinata.cloud/ipfs/'
    ];
    
    const gatewayUrls = gateways.map(gateway => {
      // Extract CID
      let cid = originalUrl;
      if (originalUrl.startsWith('ipfs://')) {
        cid = originalUrl.substring(7);
      } else if (originalUrl.includes('/ipfs/')) {
        cid = originalUrl.split('/ipfs/')[1];
      }
      
      return `${gateway}${cid}`;
    });
    
    return [ipfsUrl, ...gatewayUrls];
  }, [metadata]);
  
  // Track which URL is being used
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  
  // Format NFT name, adding fallback
  const displayName = useMemo(() => {
    return metadata?.name || `NFT #${tokenId}`;
  }, [metadata, tokenId]);
  
  // Apply random glitch effect to card text
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchText(true);
        setTimeout(() => setGlitchText(false), 150);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleAcquire = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!account) {
      toast.error("Please connect your wallet to proceed");
      return;
    }
    
    if (isBuying) {
      toast.warning("Transaction in progress, please wait");
      return;
    }
    
    try {
      setIsBuying(true);
      
      if (onAcquire) {
        await onAcquire(listing);
      } else {
        // Navigate to details page by default
        router.push(`/nft/${listingId}`);
      }
    } catch (error) {
      console.error("Error acquiring NFT:", error);
      toast.custom({
        title: "Failed to Acquire NFT",
        description: error instanceof Error ? error.message : "An error occurred while trying to acquire this NFT. Please try again.",
        variant: "error"
      });
    } finally {
      setIsBuying(false);
    }
  };
  
  // Handle image loading complete
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  
  // Handle image loading error by trying the next URL
  const handleImageError = () => {
    console.error(`Failed to load NFT image (${currentUrlIndex + 1}/${imageUrls.length}):`, imageUrls[currentUrlIndex]);
    
    if (currentUrlIndex < imageUrls.length - 1) {
      // Try the next URL
      setCurrentUrlIndex(currentUrlIndex + 1);
    } else {
      // We've tried all URLs, show error state
      setImageError(true);
    }
  };
  
  // Current image URL to display
  const currentImageUrl = imageUrls[currentUrlIndex] || "";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden bg-sinister-black border border-sinister-orange/20 shadow-card rounded-lg transition-all duration-300 hover:shadow-card-hover hover:border-sinister-orange/60">
        <div className="bg-ancient-wisdom p-3">
          {/* Header with name and collection */}
          <div className="mb-2">
            <h3 className={`text-lg font-heading text-oracle-white truncate ${glitchText ? 'text-glitch' : ''}`}>
              {displayName}
            </h3>
            {collectionName && (
              <p className="text-xs text-sinister-scroll truncate">
                {collectionName}
              </p>
            )}
          </div>
          
          {/* Image with more horizontal aspect ratio */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-md mb-3">
            {/* Loading Skeleton */}
            {isLoading && (
              <div className="absolute inset-0 bg-sinister-black/40 flex items-center justify-center">
                <div className="animate-pulse h-full w-full bg-gradient-to-br from-sinister-black/40 to-sinister-black/60"></div>
              </div>
            )}
            
            {/* Actual Image */}
            {!imageError ? (
              <img
                src={currentImageUrl}
                alt={displayName}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isHovered ? "scale-110" : "scale-100"
                } ${isLoading ? "opacity-0" : "opacity-100"}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-sinister-black/80">
                <span className="text-sinister-teal text-sm">Image Unavailable</span>
              </div>
            )}
            
            {/* Token ID Badge */}
            <div className="absolute bottom-2 left-2 bg-sinister-black/70 border border-sinister-teal/30 px-1.5 py-0.5 text-xs font-mono text-sinister-teal rounded">
              #{tokenId || "0"}
            </div>
          </div>
          
          {/* Price and action */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-sinister-scroll">Price</p>
              <p className="text-oracle-orange font-mono text-base">
                {pricePerToken} METIS
              </p>
            </div>
            
            <button
              onClick={handleAcquire}
              disabled={isBuying}
              className="bg-gradient-to-r from-sinister-orange to-sinister-orange/80 text-sinister-black font-bold py-1.5 px-4 rounded-sm hover:from-sinister-orange/90 hover:to-sinister-orange/70 transition-all text-sm"
            >
              {isBuying ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin h-3 w-3 border-2 border-sinister-black border-t-transparent rounded-full mr-1"></div>
                  Processing...
                </div>
              ) : (
                "View"
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}