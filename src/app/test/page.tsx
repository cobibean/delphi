import { getAllListingsWithMetadata } from "@/app/services/marketplace";
import { JsonRpcProvider } from "ethers";
import { CONTRACT_ADDRESS } from "@/app/constants/contracts";
import Link from "next/link";
import { IListingWithNFT } from "@/app/interfaces/interfaces";

const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Marketplace Test Page</h1>
      
      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>Error fetching listings: {error.message}</p>
        </div>
      ) : (
        <>
          <p className="mb-4">Total listings found: {listings.length}</p>
          
          {listings.length > 0 ? (
            <div className="space-y-6">
              {listings.map((listing) => (
                <div key={listing.listingId} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                  <h2 className="text-xl font-bold mb-2">
                    {listing.metadata?.name || `NFT #${listing.tokenId}`}
                  </h2>
                  <p className="mb-2">Listing ID: {listing.listingId}</p>
                  <p className="mb-2">Token ID: {listing.tokenId}</p>
                  <p className="mb-2">Price: {listing.pricePerToken} METIS</p>
                  
                  {listing.metadata?.image && (
                    <img 
                      src={listing.metadata.image} 
                      alt={listing.metadata.name} 
                      className="w-32 h-32 object-cover rounded-md mt-2 mb-4"
                    />
                  )}
                  
                  <Link 
                    href={`/nft/${listing.listingId}`}
                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>No listings found.</p>
          )}
        </>
      )}
      
      <div className="mt-8">
        <Link 
          href="/"
          className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
} 