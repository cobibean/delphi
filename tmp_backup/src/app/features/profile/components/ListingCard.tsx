"use client";

import { getNFTMetadata } from "@/app/features/nft/services/nft-services";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserListingItem } from "../hooks/useUserListings";
import "./styles.css";

interface ListingCardProps {
  listing: UserListingItem;
  onCancelClick: (listingId: string, isAuction: boolean) => void;
}

// Multiple IPFS gateways for fallback
const IPFS_GATEWAYS = [
  process.env.NEXT_PUBLIC_IPFS_GATEWAY || "https://delphigateway.mypinata.cloud/ipfs/",
  "https://ipfs.io/ipfs/",
  "https://gateway.ipfs.io/ipfs/",
  "https://cloudflare-ipfs.com/ipfs/"
];

export default function ListingCard({ listing, onCancelClick }: ListingCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [nftMetadata, setNftMetadata] = useState<any>(null);
  const [currentGatewayIndex, setCurrentGatewayIndex] = useState(0);
  const [imageUrl, setImageUrl] = useState<string>("");

  const priceDisplay = listing.isAuction 
    ? `Min Bid: ${listing.minimumBidAmount || "0"} METIS` 
    : `${listing.pricePerToken || "0"} METIS`;

  // Format IPFS URL with multiple gateway fallbacks
  const formatIPFSUrl = (url: string, gatewayIndex = 0): string => {
    if (!url) return '';
    
    const gateway = IPFS_GATEWAYS[gatewayIndex];
    
    // Handle ipfs:// protocol
    if (url.startsWith('ipfs://')) {
      return url.replace('ipfs://', gateway);
    }
    
    // Handle URLs with /ipfs/ path
    if (url.includes('/ipfs/')) {
      const parts = url.split('/ipfs/');
      return `${gateway}${parts[1]}`;
    }
    
    // If already a valid HTTP URL, return as is
    return url;
  };

  // Fetch NFT metadata on component mount
  useEffect(() => {
    const fetchNFTMetadata = async () => {
      try {
        if (listing.assetContract && listing.tokenId) {
          setImageLoading(true);
          const metadata = await getNFTMetadata(listing.assetContract, listing.tokenId);
          setNftMetadata(metadata);
          
          if (metadata?.image) {
            const url = formatIPFSUrl(metadata.image, currentGatewayIndex);
            setImageUrl(url);
          }
          
          setImageLoading(false);
        }
      } catch (error) {
        console.error("Error fetching NFT metadata:", error);
        setImageError(true);
        setImageLoading(false);
      }
    };

    fetchNFTMetadata();
  }, [listing.assetContract, listing.tokenId, currentGatewayIndex]);

  // Handle image error - try next gateway
  const handleImageError = () => {
    // If we have more gateways to try
    if (currentGatewayIndex < IPFS_GATEWAYS.length - 1) {
      const nextGatewayIndex = currentGatewayIndex + 1;
      console.log(`Trying next IPFS gateway: ${IPFS_GATEWAYS[nextGatewayIndex]}`);
      
      // Update the gateway index which will trigger the useEffect
      setCurrentGatewayIndex(nextGatewayIndex);
      
      // Update the image URL with the new gateway
      if (nftMetadata?.image) {
        const newUrl = formatIPFSUrl(nftMetadata.image, nextGatewayIndex);
        setImageUrl(newUrl);
      }
    } else {
      console.error("All IPFS gateways failed, showing fallback");
      setImageError(true);
      setImageLoading(false);
    }
  };

  return (
    <div className="bg-night/80 rounded-xl shadow-md overflow-hidden nft-card-hover">
      <div className="h-48 bg-gradient-to-br from-oracle-orange/20 to-nebula-energy/20 relative">
        {/* Loading state */}
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-night/40">
            <div className="animate-pulse w-full h-full bg-gradient-to-br from-night/40 to-night/60"></div>
          </div>
        )}

        {/* Image display */}
        {imageUrl && !imageError ? (
          <img 
            src={imageUrl}
            alt={nftMetadata?.name || `NFT #${listing.tokenId}`} 
            className={`w-full h-full object-cover ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
            onError={handleImageError}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-oracle-orange">
              {nftMetadata?.name || listing.metadata?.name || `NFT #${listing.tokenId}`}
            </span>
          </div>
        )}

        {/* Price badge */}
        <div className="absolute top-2 right-2 bg-oracle-orange/90 text-night px-2 py-1 rounded-md text-xs font-medium">
          {priceDisplay}
        </div>

        {/* Listing type badge */}
        <div className="absolute top-2 left-2 bg-night/90 px-2 py-1 rounded-md text-xs font-medium">
          {listing.isAuction ? "Auction" : "Direct Sale"}
        </div>

        {/* Token ID badge */}
        <div className="absolute bottom-2 left-2 bg-night/90 px-2 py-1 rounded-md text-xs font-medium">
          #{listing.tokenId}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-heading text-oracle-orange mb-2">
          {nftMetadata?.name || listing.metadata?.name || `NFT #${listing.tokenId}`}
        </h3>
        <p className="text-oracle-white/70 text-sm mb-3 line-clamp-2">
          {nftMetadata?.description || listing.metadata?.description?.substring(0, 100) || "No description available"}
          {nftMetadata?.description?.length > 100 || (listing.metadata?.description && listing.metadata.description.length > 100) ? "..." : ""}
        </p>
        <div className="flex justify-between items-center mt-4">
          <Link 
            href={`/nft/${listing.assetContract}/${listing.tokenId}`} 
            className="btn-secondary text-sm py-2 px-4 rounded-md inline-block"
          >
            View Details
          </Link>
          <button
            onClick={() => onCancelClick(listing.listingId, listing.isAuction)}
            className="text-cosmic-connection hover:text-cosmic-connection/80 text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
