"use client";

import { getAllAuctions } from "@/app/features/marketplace/services/auctions";
import { getAllListings } from "@/app/features/marketplace/services/listings";
import { IListingWithNFT } from "@/app/features/marketplace/services/types";
import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";

export interface UserListingItem extends IListingWithNFT {
  isAuction: boolean;
}

interface UseUserListingsProps {
  includeAuctions?: boolean; // Whether to include auctions in the results
  includeDirect?: boolean;   // Whether to include direct listings in the results
}

interface UseUserListingsReturn {
  listings: UserListingItem[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  directListingsCount: number;
  auctionListingsCount: number;
}

/**
 * Custom hook for fetching marketplace listings created by the connected user
 */
export function useUserListings({
  includeAuctions = true,
  includeDirect = true,
}: UseUserListingsProps = {}): UseUserListingsReturn {
  const account = useActiveAccount();
  const [listings, setListings] = useState<UserListingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [directCount, setDirectCount] = useState(0);
  const [auctionCount, setAuctionCount] = useState(0);

  const fetchListings = async () => {
    if (!account) {
      setListings([]);
      setIsLoading(false);
      setDirectCount(0);
      setAuctionCount(0);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create array to hold all fetched listings
      let userListings: UserListingItem[] = [];
      
      // Fetch direct listings if requested
      if (includeDirect) {
        console.log("Fetching direct listings for profile");
        const directListings = await getAllListings();
        
        // Filter for the user's direct listings
        const userDirectListings = directListings
          .filter(listing => listing.listingCreator.toLowerCase() === account.address.toLowerCase())
          .map(listing => ({
            ...listing,
            isAuction: false
          }));
        
        console.log(`Found ${userDirectListings.length} user direct listings`);
        userListings = [...userListings, ...userDirectListings];
      }
      
      // Fetch auctions if requested
      if (includeAuctions) {
        console.log("Fetching auctions for profile");
        const auctions = await getAllAuctions();
        
        // Filter for the user's auctions
        const userAuctions = auctions
          .filter(auction => auction.listingCreator.toLowerCase() === account.address.toLowerCase())
          .map(auction => ({
            ...auction,
            isAuction: true
          }));
        
        console.log(`Found ${userAuctions.length} user auctions`);
        userListings = [...userListings, ...userAuctions];
      }
      
      // Count listing types
      const directListings = userListings.filter(listing => !listing.isAuction);
      const auctionListings = userListings.filter(listing => listing.isAuction);
      
      setListings(userListings);
      setDirectCount(directListings.length);
      setAuctionCount(auctionListings.length);
    } catch (err) {
      console.error("Error fetching user listings:", err);
      setError(err instanceof Error ? err : new Error("Failed to fetch user listings"));
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch listings when account changes
  useEffect(() => {
    fetchListings();
  }, [account]);

  return {
    listings,
    isLoading,
    error,
    refetch: fetchListings,
    directListingsCount: directCount,
    auctionListingsCount: auctionCount
  };
} 