// app/page.tsx (Server Component)

import { getAllListingsWithMetadata } from "@/app/services/marketplace";
import { JsonRpcProvider } from "ethers";
import NFTMarketplaceDashboard from "./components/NFTMarketplaceDashboard";
import FeaturedSection from "@/app/components/FeaturedSection/FeaturedSection";

const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
const MARKETPLACE_ADDRESS = process.env.MARKETPLACE_ADDRESS!;

export default async function Home() {
  const listings = await getAllListingsWithMetadata(provider, MARKETPLACE_ADDRESS);

  return (
    <main>
      <FeaturedSection />
      <NFTMarketplaceDashboard listings={listings} />
    </main>
  );
}