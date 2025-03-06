// test-marketplace.ts
import { getAllListingsWithMetadata } from "./services/marketplace";
import { JsonRpcProvider } from "ethers";
import { CONTRACT_ADDRESS } from "./constants/contracts";

async function testMarketplace() {
  try {
    const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
    console.log("Provider initialized");
    
    console.log("Fetching listings from contract:", CONTRACT_ADDRESS);
    const listings = await getAllListingsWithMetadata(provider, CONTRACT_ADDRESS);
    
    console.log("Total listings found:", listings.length);
    
    if (listings.length > 0) {
      console.log("First listing:", {
        listingId: listings[0].listingId,
        tokenId: listings[0].tokenId,
        price: listings[0].pricePerToken,
        metadata: listings[0].metadata
      });
    }
  } catch (error) {
    console.error("Error testing marketplace:", error);
  }
}

// This will run when imported in a Node.js environment
// but not when imported in a browser environment
if (typeof window === 'undefined') {
  testMarketplace();
}

export { testMarketplace }; 