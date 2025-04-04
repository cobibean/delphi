// app/page.tsx (Server Component)

"use client";

import FeaturedCard from "@/app/features/marketplace/components/FeaturedSection/FeaturedCard";
import { FEATURED_COLLECTION_ADDRESSES, filterFeaturedListings } from "@/app/utils/featuredHelpers";
import LoadingIndicator from "@/components/feedback/LoadingIndicator";
import { NFTMarketplaceDashboard } from "@/features/marketplace/components";
import { getAllListings } from "@/features/marketplace/services";
import { getAllAuctions } from "@/features/marketplace/services/auctions";
import { HomepageMintCard } from "@/features/nft/mintzone/components";
import { IListingWithNFT } from "@/interfaces/interfaces";
import Link from "next/link";
import { useEffect, useState } from "react";

// Define the contract address for the mint card
const MINT_CONTRACT_ADDRESS = "0x27ae488a309A3F7c57AEA80490dF7c1cDbD69525";

// Define interface for market stats
interface MarketStats {
  totalListings: number;
  totalVolume: string;
  totalSales: number;
  averagePrice: string;
}

// Add this constant at the top of your file (outside the component)
const PLACEHOLDER_IMAGE = `data:image/svg+xml;base64,${btoa(
  '<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#1a1a1a"/><text x="50%" y="50%" font-family="sans-serif" font-size="24" text-anchor="middle" fill="#666">Image Unavailable</text></svg>'
)}`;

// Add this constant near the top of your file
const MAX_CAROUSEL_ITEMS = 5; // Increased from 3 to 5

export default function Page() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [listings, setListings] = useState<IListingWithNFT[]>([]);
  const [featuredListings, setFeaturedListings] = useState<IListingWithNFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch real marketplace listings and auctions
  useEffect(() => {
    async function fetchMarketplaceData() {
      try {
        setIsLoading(true);
        console.log("Fetching marketplace data (listings and auctions)...");
        
        // Fetch all listings and auctions concurrently for efficiency
        const [fetchedListings, fetchedAuctions] = await Promise.all([
          getAllListings(),
          getAllAuctions()
        ]);
        
        console.log(`Fetched ${fetchedListings?.length || 0} listings from marketplace contract`);
        console.log(`Fetched ${fetchedAuctions?.length || 0} auctions from marketplace contract`);
        
        // Combine listings and auctions into a single array
        const allItems = [
          ...(fetchedListings || []),
          ...(fetchedAuctions || [])
        ];
        
        if (allItems.length === 0) {
          console.log("No listings or auctions were found, showing empty state");
          setListings([]);
          setFeaturedListings([]);
          setError("No active listings or auctions found on the marketplace. Check back later for new items.");
          setIsLoading(false);
          return;
        }
        
        // Set all items for the main marketplace section
        setListings(allItems);
        
        // Get featured listings using the helper function
        console.log("Filtering for featured collections:", FEATURED_COLLECTION_ADDRESSES);
        const featured = filterFeaturedListings(allItems);

        // Add these detailed logs
        console.log("All available contract addresses in items:", 
          [...new Set(allItems.map(item => item.assetContract))]);
        console.log("Featured items by collection:", 
          featured.reduce((acc, item) => {
            acc[item.assetContract] = (acc[item.assetContract] || 0) + 1;
            return acc;
          }, {} as Record<string, number>));

        console.log(`Found ${featured.length} items from featured collections`);
        
        if (featured.length > 0) {
          // Group items by collection address
          const itemsByCollection = featured.reduce((groups, item) => {
            const contract = item.assetContract;
            if (!groups[contract]) groups[contract] = [];
            groups[contract].push(item);
            return groups;
          }, {} as Record<string, IListingWithNFT[]>);
          
          // Take one from each collection first, then fill remaining slots
          let selectedFeatured: IListingWithNFT[] = [];
          
          // First pass: Take one from each collection
          Object.values(itemsByCollection).forEach(items => {
            if (selectedFeatured.length < MAX_CAROUSEL_ITEMS && items.length > 0) {
              selectedFeatured.push(items[0]);
            }
          });
          
          // Second pass: Fill remaining slots with additional items
          let remainingSlots = MAX_CAROUSEL_ITEMS - selectedFeatured.length;
          if (remainingSlots > 0) {
            let additionalItems: IListingWithNFT[] = [];
            Object.values(itemsByCollection).forEach(items => {
              if (items.length > 1) {
                additionalItems = [...additionalItems, ...items.slice(1)];
              }
            });
            
            // Add additional items up to the remaining slot count
            selectedFeatured = [
              ...selectedFeatured, 
              ...additionalItems.slice(0, remainingSlots)
            ];
          }
          
          setFeaturedListings(selectedFeatured);
          console.log("Featured items set for carousel:", selectedFeatured);
        } else {
          // If no featured listings found, fall back to using regular items
          console.log("No featured collection items found, using regular items as fallback");
          setFeaturedListings(allItems.slice(0, Math.min(MAX_CAROUSEL_ITEMS, allItems.length)));
        }
        
        setIsLoading(false);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Error fetching marketplace data:", err);
        setError("Failed to load marketplace data. Please try again later.");
        setListings([]);
        setFeaturedListings([]);
        setIsLoading(false);
      }
    }
    
    fetchMarketplaceData();
  }, []);
  
  useEffect(() => {
    const handleComingSoonEvent = (e: CustomEvent) => {
      setActiveModal(e.detail);
    };
    
    window.addEventListener('openComingSoonModal', handleComingSoonEvent as EventListener);
    
    return () => {
      window.removeEventListener('openComingSoonModal', handleComingSoonEvent as EventListener);
    };
  }, []);

  // Marketplace stats
  const marketStats: MarketStats = {
    totalListings: listings.length,
    totalVolume: "156,420", // This could be calculated based on real data in the future
    totalSales: 3256, // This could be calculated based on real data in the future
    averagePrice: listings.length > 0 
      ? (listings.reduce((sum, listing) => {
          // For auctions, use current bid or minimum bid amount
          if ((listing as any).isAuction) {
            const auctionListing = listing as any;
            const price = parseFloat(
              auctionListing.currentBid || 
              auctionListing.minimumBidAmount || 
              "0"
            ); 
            return sum + price;
          }
          // For direct listings, use pricePerToken
          return sum + parseFloat(listing.pricePerToken);
        }, 0) / listings.length).toFixed(2)
      : "0.00"
  };
  
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  
  const nextSlide = () => {
    setCarouselIndex((prevIndex) => 
      prevIndex === featuredListings.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevSlide = () => {
    setCarouselIndex((prevIndex) => 
      prevIndex === 0 ? featuredListings.length - 1 : prevIndex - 1
    );
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (featuredListings.length > 1) {
        nextSlide();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Add a handler for the "Acquire this NFT" action
  const handleAcquireNFT = async (listing: IListingWithNFT) => {
    // Include the listing type in the URL to correctly identify auctions vs direct listings
    const isAuction = (listing as any).isAuction || (listing as any).type === 'auction';
    const detailUrl = isAuction ? 
      `/nft/auction-${listing.listingId}` : 
      `/nft/direct-${listing.listingId}`;
    
    // Navigate to the detail page with the type prefix
    window.location.href = detailUrl;
    
    // In the future, you could implement direct purchase functionality here
  };

  return (
    <main className="bg-oracle-black min-h-screen">
      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <LoadingIndicator size="large" />
          <span className="ml-3 text-oracle-orange">Loading marketplace data...</span>
        </div>
      )}
      
      {/* Error State */}
      {error && !isLoading && (
        <div className="container mx-auto px-4 py-20">
          <div className="bg-sinister-black/50 border border-sinister-orange/30 p-6 rounded-lg text-center">
            <h2 className="text-2xl font-heading text-sinister-orange mb-4">Error Loading Marketplace</h2>
            <p className="text-sinister-scroll mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              <span className="relative z-10">Retry</span>
            </button>
          </div>
        </div>
      )}
      
      {/* Content when loaded successfully */}
      {!isLoading && !error && (
        <>
          {/* Two-Column Hero Section with Featured Carousel and Mint Card */}
          <section className="relative overflow-hidden pt-4 pb-12">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column: Featured Carousel (65-70%) */}
                <div className="w-full lg:w-2/3">
                  {featuredListings.length > 0 && (
                    <>
                      <div className="relative max-w-full mx-auto h-full flex flex-col">
                        <h2 className="font-heading text-3xl md:text-4xl text-oracle-orange mt-4 mb-6 text-center uppercase tracking-wide">
                          Featured Creations
                        </h2>
                        
                        <div className="overflow-hidden rounded-xl flex-grow flex flex-col">
                          <div className="flex transition-transform duration-500 ease-in-out flex-grow" 
                            style={{ transform: `translateX(-${carouselIndex * 100}%)` }}>
                            {featuredListings.map((item) => (
                              <div key={item.listingId} className="w-full flex-shrink-0 px-4 flex items-end">
                                <div className="bg-ancient-wisdom rounded-xl overflow-hidden shadow-card-normal border border-oracle-orange/20 w-full">
                                  <FeaturedCard 
                                    listing={item}
                                    className="featured-carousel-card"
                                    onAcquire={handleAcquireNFT}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {featuredListings.length > 1 && (
                          <>
                            <button 
                              onClick={prevSlide}
                              className="absolute top-1/2 left-6 transform -translate-y-1/2 w-10 h-10 rounded-full bg-oracle-black/50 flex items-center justify-center text-oracle-white hover:bg-oracle-orange hover:text-oracle-black transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                            </button>
                            <button 
                              onClick={nextSlide}
                              className="absolute top-1/2 right-6 transform -translate-y-1/2 w-10 h-10 rounded-full bg-oracle-black/50 flex items-center justify-center text-oracle-white hover:bg-oracle-orange hover:text-oracle-black transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </>
                        )}
                        
                        {featuredListings.length > 1 && (
                          <div className="flex justify-center mt-4">
                            {featuredListings.map((_, index) => (
                              <button 
                                key={index}
                                onClick={() => setCarouselIndex(index)}
                                className={`w-3 h-3 mx-1 rounded-full ${index === carouselIndex ? 'bg-oracle-orange' : 'bg-oracle-white/30'}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
                
                {/* Right Column: HomepageMintCard (30-35%) */}
                <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
                  <h2 className="font-heading text-2xl md:text-3xl text-oracle-orange mb-8 text-center uppercase tracking-wide">
                    Mint Your &quot;Delphi Pioneer&quot; Now
                  </h2>
                  <div className="bg-gradient-to-br from-oracle-orange/50 via-oracle-orange/40 to-oracle-black shadow-lg shadow-oracle-turquoise/30 rounded-xl p-4 overflow-hidden border border-oracle-orange/20">
                    <HomepageMintCard 
                      contractAddress={MINT_CONTRACT_ADDRESS}
                      className="hover-lift"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Main marketplace section with all listings and auctions */}
          {listings.length > 0 ? (
            <NFTMarketplaceDashboard listings={listings} />
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-heading text-sinister-orange mb-4">NO PROPHECIES FOUND</h3>
              <p className="text-sinister-scroll/70">
                There are no prophecies available in the marketplace yet.
              </p>
            </div>
          )}
        </>
      )}
      
      {/* 2. Hero/Info Section */}
      <section className="py-16 bg-cosmic-connection animate-cosmic-flow bg-[length:200%_200%]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-oracle-white mb-6 leading-tight">
              DELPHI: THE CENTER OF THE WORLD
            </h1>
            <p className="text-oracle-white text-lg md:text-xl mb-8">
              Where artists, weirdos, and degens converge on Metis and beyond. 
              Discover unique digital collectibles in a vibrant marketplace built for creative expression.
            </p>
            <p className="text-oracle-white/80 text-sm font-accent italic mb-6">
              Built by Vesta & Yeti-Apes
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('openComingSoonModal', { detail: 'Create Listing' }))}
                className="btn-primary"
              >
                <span className="relative z-10">CREATE LISTING</span>
              </button>
              <button 
                onClick={() => setStatsVisible(true)}
                className="btn-secondary"
              >
                <span>VIEW STATS</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* 3. New Listings Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-heading text-2xl md:text-3xl text-oracle-orange uppercase tracking-wide">
              New Listings
            </h2>
            <Link href="/explore" className="text-oracle-turquoise hover:text-oracle-orange transition-colors">
              View All <span className="ml-1">→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Implementation of new listings section */}
          </div>
        </div>
      </section>
      
      {/* 4. All Listings Section */}
      <section className="py-16 bg-ancient-wisdom">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-3xl text-oracle-orange mb-8 uppercase tracking-wide">
            All Listings
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Implementation of all listings section */}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/explore" className="btn-primary">
              <span className="relative z-10">EXPLORE ALL</span>
            </Link>
          </div>
        </div>
      </section>
      
      {/* 5. Coming Soon Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-oracle-black/80">
          <div className="bg-ancient-wisdom border border-oracle-orange/20 rounded-xl w-full max-w-md shadow-card-hover animate-digital-glitch" style={{animationDuration: '0.2s'}}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading text-2xl text-oracle-orange">Coming Soon</h3>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="text-oracle-white/70 hover:text-oracle-orange"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mb-6">
                <p className="text-oracle-white mb-4">
                  We&apos;re working on bringing you amazing {activeModal.toLowerCase()} features.
                </p>
                <div className="flex justify-center my-6">
                  <div className="w-24 h-24 bg-cosmic-connection rounded-full flex items-center justify-center animate-oracle-pulse overflow-hidden">
                    <span className="font-heading text-4xl text-oracle-white glitch-text" data-text={activeModal[0]}>
                      {activeModal[0]}
                    </span>
                  </div>
                </div>
                <p className="text-oracle-white/70 text-sm">
                  Stay tuned for updates! Built by Vesta & Yeti-Apes.
                </p>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="btn-primary w-full"
              >
                <span className="relative z-10">Got it</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* 6. Stats Modal */}
      {statsVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-oracle-black/80">
          <div className="bg-ancient-wisdom border border-oracle-orange/20 rounded-xl w-full max-w-xl shadow-card-hover">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-heading text-2xl text-oracle-orange">Marketplace Stats</h3>
                <button 
                  onClick={() => setStatsVisible(false)}
                  className="text-oracle-white/70 hover:text-oracle-orange"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="stat-card">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-oracle-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2M7 7h10" />
                  </svg>
                  <div className="stat-number">{marketStats.totalListings}</div>
                  <div className="stat-label">Total Listings</div>
                </div>
                
                <div className="stat-card">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-oracle-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="stat-number">{marketStats.totalVolume}</div>
                  <div className="stat-label">Trading Volume</div>
                </div>
                
                <div className="stat-card">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-oracle-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <div className="stat-number">{marketStats.totalSales}</div>
                  <div className="stat-label">Total Sales</div>
                </div>
                
                <div className="stat-card">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-oracle-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <div className="stat-number">{marketStats.averagePrice}</div>
                  <div className="stat-label">Avg. Price (METIS)</div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-heading text-xl text-oracle-turquoise mb-3">Activity Chart</h4>
                <div className="bg-oracle-black/30 rounded-lg p-4 h-48 flex items-center justify-center">
                  <p className="text-oracle-white/50 text-center">
                    Advanced analytics coming soon! <br />
                    <span className="text-sm">Built by Vesta & Yeti-Apes</span>
                  </p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <button 
                  onClick={() => setStatsVisible(false)}
                  className="btn-primary"
                >
                  <span className="relative z-10">Close</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}