"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllListings } from "@/features/marketplace/services/marketplace-v5";
import { IListingWithNFT } from "@/interfaces/interfaces";
import { NFTMarketplaceDashboard } from "@/features/marketplace/components";
import LoadingIndicator from "@/components/feedback/LoadingIndicator";

// Define interface for market stats
interface MarketStats {
  totalListings: number;
  totalVolume: string;
  totalSales: number;
  averagePrice: string;
}

export default function HomePage() {
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
        console.log(`Fetched ${fetchedListings.length} listings from marketplace contract`);
        
        setListings(fetchedListings);
        
        // Select the first 3 listings as featured (or all if less than 3)
        setFeaturedListings(fetchedListings.slice(0, Math.min(3, fetchedListings.length)));
        
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError("Failed to load marketplace data. Please try again later.");
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
          {/* 1. Featured Carousel Section */}
          {featuredListings.length > 0 && (
            <section className="relative overflow-hidden pt-4 pb-12">
              <div className="container mx-auto px-4">
                <h2 className="font-heading text-3xl md:text-4xl text-oracle-orange mb-8 text-center uppercase tracking-wide">
                  Featured Creations
                </h2>
                
                <div className="relative max-w-5xl mx-auto">
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
              </div>
            </section>
          )}
          
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
                onClick={() => {
                  const event = new CustomEvent('openComingSoonModal', { detail: 'create' });
                  window.dispatchEvent(event);
                }}
                className="btn-primary"
              >
                <span className="relative z-10">Create NFT</span>
              </button>
              <Link href="/marketplace" className="btn-secondary">
                <span>Explore Marketplace</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 