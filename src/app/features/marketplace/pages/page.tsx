// app/page.tsx (Server Component)

"use client";

import LoadingIndicator from "@/components/feedback/LoadingIndicator";
import { NFTMarketplaceDashboard } from "@/features/marketplace/components";
import { getAllListings } from "@/features/marketplace/services/marketplace-v5";
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

export default function Page() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [listings, setListings] = useState<IListingWithNFT[]>([]);
  const [featuredListings, setFeaturedListings] = useState<IListingWithNFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch real marketplace listings
  useEffect(() => {
    async function fetchListings() {
      try {
        setIsLoading(true);
        console.log("Fetching real marketplace listings...");
        const fetchedListings = await getAllListings();
        console.log(`Fetched ${fetchedListings?.length || 0} listings from marketplace contract`);
        
        if (!fetchedListings || fetchedListings.length === 0) {
          console.log("No listings were found, showing empty state");
          setListings([]);
          setFeaturedListings([]);
          setError("No active listings found on the marketplace. Check back later for new listings.");
          setIsLoading(false);
          return;
        }
        
        setListings(fetchedListings);
        
        // Select the first 3 listings as featured (or all if less than 3)
        setFeaturedListings(fetchedListings.slice(0, Math.min(3, fetchedListings.length)));
        
        setIsLoading(false);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError("Failed to load marketplace data. Please try again later.");
        setListings([]);
        setFeaturedListings([]);
        setIsLoading(false);
      }
    }
    
    fetchListings();
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
      ? (listings.reduce((sum, listing) => sum + parseFloat(listing.pricePerToken), 0) / listings.length).toFixed(2)
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
  }, [featuredListings.length]);

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
                      <h2 className="font-heading text-3xl md:text-4xl text-oracle-orange mb-8 text-center uppercase tracking-wide">
                        Featured Creations
                      </h2>
                      
                      <div className="relative max-w-full mx-auto">
                        {/* Carousel slider */}
                        <div className="overflow-hidden rounded-xl">
                          <div className="flex transition-transform duration-500 ease-in-out" 
                            style={{ transform: `translateX(-${carouselIndex * 100}%)` }}>
                            {featuredListings.map((item) => (
                              <div key={item.listingId} className="w-full flex-shrink-0 px-4">
                                <div className="bg-ancient-wisdom rounded-xl overflow-hidden shadow-card-normal border border-oracle-orange/20 hover-lift">
                                  <div className="aspect-[1.5/1] relative overflow-hidden">
                                    <img 
                                      src={item.metadata?.image || "/images/placeholder.jpg"} 
                                      alt={item.metadata?.name || `NFT #${item.tokenId}`} 
                                      className="w-full h-full object-cover" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-oracle-black/80 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 w-full p-6">
                                      <h3 className="font-heading text-3xl text-oracle-white mb-2">
                                        {item.metadata?.name || `NFT #${item.tokenId}`}
                                      </h3>
                                      <div className="flex justify-between items-end">
                                        <div className="flex items-center">
                                          <span className="text-oracle-white/70 text-sm">
                                            {item.collectionName || "Metis Collection"}
                                          </span>
                                        </div>
                                        <span className="text-oracle-orange text-2xl font-bold">
                                          {item.pricePerToken} METIS
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="p-6 flex justify-between items-center">
                                    <Link href={`/nft/${item.listingId}`} className="btn-primary py-2 px-6">
                                      <span className="relative z-10">View Details</span>
                                    </Link>
                                    <button className="btn-icon">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Carousel controls - only show if more than one listing */}
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
                        
                        {/* Carousel indicators */}
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
                  <h2 className="font-heading text-2xl md:text-3xl text-oracle-orange mb-4 text-center uppercase tracking-wide">
                    Mint Your "Delphi Pioneer" Now
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
          
          {/* Main marketplace section with all listings */}
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
                  We're working on bringing you amazing {activeModal.toLowerCase()} features.
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