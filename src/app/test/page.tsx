import { getAllListingsWithMetadata } from "@/app/services/marketplace";
import { providers } from "ethers";
import { CONTRACT_ADDRESS } from "@/app/constants/contracts";
import Link from "next/link";
import { IListingWithNFT } from "@/app/interfaces/interfaces";

const provider = new providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);

export default async function TestPage() {
  let listings: IListingWithNFT[] = [];
  let error: Error | null = null;
  
  try {
    listings = await getAllListingsWithMetadata(provider, CONTRACT_ADDRESS);
  } catch (err) {
    error = err as Error;
    console.error("Error fetching listings:", err);
  }
  
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-anton text-gradient mb-8">MARKETPLACE TEST PAGE</h1>
      
      {error ? (
        <div className="bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-3 rounded mb-4">
          <p>Error fetching listings: {error.message}</p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-parchment">Total listings found: {listings.length}</p>
          
          {listings.length > 0 ? (
            <div className="space-y-6">
              {listings.map((listing) => (
                <div key={listing.listingId} className="bg-night/80 rounded-lg p-6 shadow-md">
                  <h2 className="text-xl font-anton text-orange mb-2">
                    {listing.metadata?.name || `NFT #${listing.tokenId}`}
                  </h2>
                  <p className="mb-2 text-parchment">Listing ID: {listing.listingId}</p>
                  <p className="mb-2 text-parchment">Token ID: {listing.tokenId}</p>
                  <p className="mb-2 text-parchment">Price: {listing.pricePerToken} METIS</p>
                  
                  {listing.metadata?.image && (
                    <img 
                      src={listing.metadata.image} 
                      alt={listing.metadata.name} 
                      className="w-32 h-32 object-cover rounded-md mt-2 mb-4"
                    />
                  )}
                  
                  <Link 
                    href={`/nft/${listing.listingId}`}
                    className="btn-primary rounded-md inline-block"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-parchment">No listings found.</p>
          )}
        </>
      )}
      
      <div className="mt-8">
        <Link 
          href="/"
          className="btn-secondary rounded-md inline-block"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
} 