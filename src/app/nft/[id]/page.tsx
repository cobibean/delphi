import { getAllListingsWithMetadata } from "@/app/services/marketplace";
import { JsonRpcProvider } from "ethers";
import { notFound } from "next/navigation";
import NFTDetailView from "@/app/components/NFTDetailView";
import { CONTRACT_ADDRESS } from "@/app/constants/contracts";

const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);

export default async function NFTDetailPage({ params }: { params: { id: string } }) {
  const listingId = params.id;
  
  // Fetch all listings (in a real app, you'd fetch just the one listing by ID)
  const listings = await getAllListingsWithMetadata(provider, CONTRACT_ADDRESS);
  
  // Find the specific listing
  const listing = listings.find(l => l.listingId === listingId);
  
  // If listing not found, show 404
  if (!listing) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <NFTDetailView listing={listing} />
    </div>
  );
} 