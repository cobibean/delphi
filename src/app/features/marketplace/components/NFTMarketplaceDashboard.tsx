"use client";

import LoadingIndicator from "@/app/components/feedback/LoadingIndicator";
import { IListingWithNFT } from "@/app/features/marketplace/services/types";
import { useToast } from "@/components/feedback";
import { NFTCard } from "@/features/nft/components";
import { useEffect, useRef, useState } from "react";
import {
    DEFAULT_PAGINATION,
    getSortOptionFromUrl,
    loadSortPreference,
    SortOption,
    updateUrlWithSort
} from "../services/Sorting";
import Pagination from "./Pagination";
import SortingDropdown from "./SortingDropdown";

interface NFTMarketplaceDashboardProps {
  initialListings?: IListingWithNFT[];
}

interface ServerResponse {
  listings: IListingWithNFT[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  sort: SortOption;
}

export default function NFTMarketplaceDashboard({ initialListings = [] }: NFTMarketplaceDashboardProps) {
  // Collection filtering
  const [activeTab, setActiveTab] = useState("all");
  
  // Sorting and pagination
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGINATION.currentPage);
  const [itemsPerPage] = useState(DEFAULT_PAGINATION.itemsPerPage);
  
  // Server state
  const [listings, setListings] = useState<IListingWithNFT[]>(initialListings);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Mobile responsiveness
  const [isMobileView, setIsMobileView] = useState(false);
  
  // Virtual scrolling refs
  const listingsContainerRef = useRef<HTMLDivElement>(null);
  
  // Collections state
  const [collections, setCollections] = useState<string[]>([]);
  
  // Notifications
  const { toast } = useToast();
  
  // Initialize from URL parameters and localStorage
  useEffect(() => {
    // Check for URL parameters first (they take precedence)
    const urlSortOption = getSortOptionFromUrl();
    if (urlSortOption) {
      setSortOption(urlSortOption);
    } else {
      // Otherwise, check for localStorage preference
      const savedSortOption = loadSortPreference();
      if (savedSortOption) {
        setSortOption(savedSortOption);
      }
    }
    
    // Get page from URL if available
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    if (pageParam) {
      const pageNumber = parseInt(pageParam, 10);
      if (!isNaN(pageNumber) && pageNumber > 0) {
        setCurrentPage(pageNumber);
      }
    }
    
    // Get collection from URL if available
    const collectionParam = urlParams.get('collection');
    if (collectionParam) {
      setActiveTab(collectionParam.toLowerCase());
    }
    
    // Check if we're in mobile view
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 640); // Match sm: breakpoint
    };
    
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    
    return () => {
      window.removeEventListener('resize', checkMobileView);
    };
  }, []);
  
  // Fetch collections
  useEffect(() => {
    // Fetch all collections for the tabs
    // This could be optimized by having a dedicated API endpoint
    const fetchCollections = async () => {
      try {
        const response = await fetch('/api/marketplace/collections');
        const data = await response.json();
        setCollections(data.collections);
      } catch (err) {
        console.error('Error fetching collections:', err);
      }
    };
    
    if (initialListings.length > 0) {
      // Extract collections from initial listings if available
      const uniqueCollections = Array.from(
        new Set(initialListings.map(listing => listing.collectionName || "Unknown"))
      );
      setCollections(uniqueCollections);
    } else {
      fetchCollections();
    }
  }, [initialListings]);
  
  // Fetch listings with server-side pagination and sorting
  const fetchListings = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Construct URL with all parameters
      const url = new URL('/api/marketplace/listings', window.location.origin);
      url.searchParams.set('page', currentPage.toString());
      url.searchParams.set('limit', itemsPerPage.toString());
      url.searchParams.set('sort', sortOption);
      
      if (activeTab !== 'all') {
        url.searchParams.set('collection', activeTab);
      }
      
      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }
      
      const data: ServerResponse = await response.json();
      setListings(data.listings);
      setTotalItems(data.pagination.total);
      setTotalPages(data.pagination.totalPages);
      
      // Update URL with current parameters
      updateUrlWithSort(sortOption, currentPage);
      
      // Only show empty state toast if we changed filters and got no results
      if (data.listings.length === 0 && !isLoading) {
        toast.custom({
          title: "No NFTs Found",
          description: `No NFTs found with the current filters. Try changing your sort or collection.`,
          variant: "info"
        });
      }
    } catch (err) {
      console.error('Error fetching listings:', err);
      setError('Failed to load NFTs. Please try again later.');
      toast.custom({
        title: "Error",
        description: "Failed to load NFTs. Please try again later.",
        variant: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Add an initial auto-fetch with a slight delay to ensure the component is fully mounted
  useEffect(() => {
    // Don't auto-fetch if we already have initialListings
    if (initialListings.length > 0) {
      setListings(initialListings);
      setTotalItems(initialListings.length);
      setTotalPages(Math.ceil(initialListings.length / itemsPerPage));
      return;
    }
    
    // Only auto-fetch if we don't have data
    const timer = setTimeout(() => {
      fetchListings();
    }, 1000); // Increased to 1000ms to reduce chance of rate limiting
    
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Fetch listings when parameters change - with debouncing
  useEffect(() => {
    // Skip the initial fetch if we already have initialListings
    if (initialListings.length > 0 && 
        listings.length === 0 && 
        currentPage === DEFAULT_PAGINATION.currentPage && 
        sortOption === "newest" && 
        activeTab === "all") {
      return;
    }
    
    const debounceTimer = setTimeout(() => {
      fetchListings();
    }, 500);
    
    return () => clearTimeout(debounceTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, sortOption, activeTab, itemsPerPage]);
  
  // Handle collection tab change
  const handleTabChange = (collection: string) => {
    setActiveTab(collection.toLowerCase());
    setCurrentPage(1); // Reset to first page when changing tab
    
    // Toast will be shown in the fetchListings function if needed
  };
  
  // Handle sort change
  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
    setCurrentPage(1); // Reset to first page when changing sort
    
    // Only show a toast if the sort option actually changed
    if (option !== sortOption) {
      // Format the sort option for display
      const optionText = option.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      
      toast.custom({
        title: "Sorting Updated",
        description: `NFTs are now sorted by ${optionText}`,
        variant: "info"
      });
    }
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    
    // Scroll to top when changing page
    if (listingsContainerRef.current) {
      listingsContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    // No toast for pagination changes to reduce notification fatigue
  };
  
  // Handle refresh - add request throttling
  const handleRefresh = () => {
    // Prevent refresh if already loading
    if (isLoading) return;
    
    fetchListings();
    toast.custom({
      title: "Refreshing",
      description: "Fetching latest NFT listings...",
      variant: "info"
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 space-y-4" ref={listingsContainerRef}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-3xl font-heading text-oracle-white">Explore NFTs</h2>
          
          {/* Sorting Dropdown - Always at the top in mobile view */}
          <div className={`w-full sm:w-auto ${isMobileView ? 'order-1' : ''}`}>
            <SortingDropdown 
              selectedSort={sortOption} 
              onChange={handleSortChange}
              className="w-full sm:w-auto"
            />
          </div>
        </div>
        
        {/* Collection filter tabs */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => handleTabChange("all")}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === "all"
                ? "bg-cosmic-combustion text-oracle-white"
                : "bg-oracle-black-void text-oracle-white/60 hover:bg-oracle-black-matter"
            }`}
          >
            All
          </button>
          
          {collections.map((collection) => (
            <button
              key={collection}
              onClick={() => handleTabChange(collection)}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === collection.toLowerCase()
                  ? "bg-cosmic-combustion text-oracle-white"
                  : "bg-oracle-black-void text-oracle-white/60 hover:bg-oracle-black-matter"
              }`}
            >
              {collection}
            </button>
          ))}
        </div>
        
        {/* Refresh button and results summary */}
        <div className="flex justify-between items-center">
          <div className="text-oracle-white/60 text-sm mt-2">
            Showing {listings.length} of {totalItems} NFTs
            {activeTab !== "all" && ` in "${activeTab}"`}
            {sortOption !== "newest" && ` • Sorted by ${sortOption.replace(/-/g, ' ')}`}
          </div>
          
          <button
            onClick={handleRefresh}
            className="text-oracle-orange hover:text-oracle-orange/80 transition-colors"
            aria-label="Refresh listings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Loading and Error states */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <LoadingIndicator />
        </div>
      )}
      
      {error && !isLoading && (
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-oracle-orange text-oracle-black rounded-md hover:bg-oracle-orange/80 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
      
      {/* NFT Grid */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <NFTCard key={listing.listingId} listing={listing} />
          ))}
          
          {listings.length === 0 && (
            <div className="col-span-full py-12 text-center text-oracle-white/60">
              <p className="text-xl">No NFTs found with the current filters</p>
              <button 
                onClick={() => {
                  setActiveTab("all");
                  setSortOption("newest");
                  setCurrentPage(1);
                }}
                className="mt-4 px-4 py-2 bg-oracle-orange text-oracle-black rounded-md hover:bg-oracle-orange/80 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Pagination */}
      {totalPages > 1 && !isLoading && !error && (
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          className="mt-8"
        />
      )}
    </div>
  );
} 