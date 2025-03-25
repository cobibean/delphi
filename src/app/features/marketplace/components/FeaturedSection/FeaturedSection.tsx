"use client";

import { getAllListings } from "@/app/features/marketplace/services";
import { formatIPFSUrl } from "@/app/utils/format";
import { useToast } from "@/components/feedback/Toast/useToast";
import { IListingWithNFT } from "@/interfaces/interfaces";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FeaturedCard from "./FeaturedCard";

export default function FeaturedSection() {
  const [glitchText, setGlitchText] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [featuredListings, setFeaturedListings] = useState<IListingWithNFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const router = useRouter();
  const { toast } = useToast();
  
  // Fetch featured listings
  useEffect(() => {
    const fetchFeaturedListings = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all listings using the same function used in the detail page
        const listings = await getAllListings();
        
        // Detailed logging
        console.log("Raw listings from API:", listings);
        console.log("First listing metadata:", listings[0]?.metadata);
        console.log("First listing image URL:", listings[0]?.metadata?.image);
        
        // Check if metadata is properly loaded
        const hasMetadata = listings.every(listing => listing.metadata);
        console.log("All listings have metadata:", hasMetadata);
        
        // Check if images are properly set 
        const hasImages = listings.filter(listing => listing.metadata?.image).length;
        console.log("Listings with images:", hasImages, "out of", listings.length);
        
        if (listings && listings.length > 0) {
          // Choose listings with images
          const validListings = listings.filter(listing => listing && listing.metadata && listing.metadata.image);
          console.log("Valid listings with images:", validListings.length);
          
          if (validListings.length > 0) {
            // Randomly select 2 for featured display
            const randomListings = validListings
              .sort(() => 0.5 - Math.random())
              .slice(0, 2);
              
            console.log("Selected featured listings:", randomListings);
            randomListings.forEach((listing, i) => {
              console.log(`Featured listing ${i + 1} image:`, listing.metadata?.image);
              console.log(`Featured listing ${i + 1} formatted image:`, formatIPFSUrl(listing.metadata?.image || ""));
            });
            
            setFeaturedListings(randomListings);
          }
        }
      } catch (error) {
        console.error("Error fetching featured listings:", error);
        toast.custom({
          title: "Loading Error",
          description: "Failed to load featured items. Please try again later.",
          variant: "error"
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (isMounted) {
      fetchFeaturedListings();
    }
  }, [isMounted, toast]);
  
  // Trigger glitch text effect randomly
  useEffect(() => {
    setIsMounted(true);
    
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchText(true);
        setTimeout(() => setGlitchText(false), 500);
      }
    }, 5000);
    
    return () => clearInterval(glitchInterval);
  }, []);
  
  const handleExplore = () => {
    try {
      router.push("/marketplace/explore");
      toast.custom({
        title: "Entering the Unknown",
        description: "Prepare to discover unique digital artifacts in the marketplace.",
        variant: "success"
      });
    } catch (error) {
      console.error("Navigation error:", error);
      toast.custom({
        title: "Navigation Failed",
        description: "Failed to navigate to the explore page. Please try again.",
        variant: "error"
      });
    }
  };
  
  const handleConsult = () => {
    toast.custom({
      title: "Oracle Consultation",
      description: "The Oracle is preparing to reveal its wisdom. This feature will be available soon.",
      variant: "info",
      action: {
        label: "Learn More",
        onClick: () => window.open("/about", "_blank")
      }
    });
  };
  
  // Simple placeholder during SSR
  if (!isMounted) {
    return <div className="h-screen bg-sinister-black"></div>;
  }
  
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            className={`text-5xl md:text-6xl lg:text-7xl font-heading uppercase mb-8 ${
              glitchText ? 'glitch-text' : 'text-gradient-oracle'
            }`}
            data-text="DARK DEGEN ORACLE"
          >
            DARK DEGEN ORACLE
          </h1>
          
          <p className="text-xl text-cosmic-grey-300 mb-10 max-w-3xl mx-auto">
            A mysterious marketplace where digital fortunes are foretold. The Oracle reveals authentic digital artistry from beyond the veil.
          </p>
          
          <div className="flex justify-center space-x-6">
            <button 
              className="btn-primary-glow text-lg px-8 py-3"
              onClick={handleExplore}
            >
              Explore the Unknown
            </button>
            <button 
              className="btn-secondary text-lg px-8 py-3"
              onClick={handleConsult}
            >
              Consult the Oracle
            </button>
          </div>
        </div>
        
        {/* Featured Listings Section */}
        {!isLoading && featuredListings.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-heading text-center text-oracle-orange mb-10">Featured Artifacts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredListings.map((listing) => (
                <FeaturedCard 
                  key={listing.listingId} 
                  listing={listing} 
                  className="h-full"
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Loading state */}
        {isLoading && (
          <div className="mt-16 flex justify-center">
            <div className="animate-spin h-12 w-12 border-4 border-oracle-orange border-t-transparent rounded-full"></div>
          </div>
        )}
        
        {/* No items state */}
        {!isLoading && featuredListings.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-cosmic-grey-300">No featured artifacts available at this time.</p>
          </div>
        )}
      </div>
      
      {/* Background effects */}
      <div className="absolute inset-0 -z-10 opacity-40 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-oracle-orange blur-[150px] rotate-12"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-turquoise-400 blur-[150px] -rotate-12"></div>
      </div>
    </section>
  );
} 