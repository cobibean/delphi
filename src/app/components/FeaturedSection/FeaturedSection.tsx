// app/components/FeaturedSection/FeaturedSection.tsx (Server Component)

import Carousel from "@/app/components/Carousel/Carousel";
import { JsonRpcProvider } from "ethers"; 
import FeaturedCard from "@/app/components/FeaturedCard/FeaturedCard";
import { getFeaturedCollectionListings } from "@/app/utils/featuredHelpers";

const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
const MARKETPLACE_ADDRESS = process.env.MARKETPLACE_ADDRESS!;

export default async function FeaturedSection() {
  // Fetch listings from featured collections
  const featuredListings = await getFeaturedCollectionListings(provider, MARKETPLACE_ADDRESS);
  console.log('Featured Listings:', featuredListings);

  // If no featured listings, don't show the section
  if (featuredListings.length === 0) {
    return null;
  }

  return (
    <section className="featured-section bg-gradient-to-b from-gray-900 to-gray-800 p-8 rounded-xl shadow-2xl mb-12 min-h-[500px]">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Collections</h2>
      <Carousel>
        {featuredListings.map((listing) => (
          <FeaturedCard 
            key={listing.listingId} 
            listing={listing}
            className="min-w-[800px] mx-auto"
          />
        ))}
      </Carousel>
    </section>
  );
}