// app/FeaturedSection.tsx (Server Component)

import { getFeaturedListings } from "@/app/services/marketplace";
import Carousel from "@/app/components/Carousel/Carousel";
import { JsonRpcProvider } from "ethers"; 
import FeaturedCard from "@/app/components/FeaturedCard/FeaturedCard";

const provider = new JsonRpcProvider("https://metis-mainnet.g.alchemy.com/v2/dJTzX3TNNfA8novvmZoKCuyPQbzY_AT3");

// Example featured IDs
const FEATURED_IDS = ["0", "1"];
const MARKETPLACE_ADDRESS = "0x7e9EE861e3721F9F3664C18A539e63aCb784a208";

export default async function FeaturedSection() {
  // Server-side fetch at build or request time
  const featuredListings = await getFeaturedListings(provider, MARKETPLACE_ADDRESS, FEATURED_IDS);
  console.log('Featured Listings:', featuredListings); // Check browser/server logs

  return (
    <section className="featured-section bg-gradient-to-b from-gray-900 to-gray-800 p-8 rounded-xl shadow-2xl mb-12 min-h-[500px]">
      <Carousel>
        {featuredListings.map((listing) => (
          <FeaturedCard 
            key={listing.listingId} 
            listing={listing}
            className="min-w-[800px] mx-auto"  // Increased width and centered
          />
        ))}
      </Carousel>
    </section>
  );
}