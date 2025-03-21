import { metisChain } from "@/app/config/chain";
import { client } from "@/app/config/client";
import { getContract } from "thirdweb";
import { getContractMetadata } from "thirdweb/extensions/common";
import { getActiveClaimCondition as getActiveClaimCondition1155, isERC1155 } from "thirdweb/extensions/erc1155";
import { getCurrencyMetadata } from "thirdweb/extensions/erc20";
import { getActiveClaimCondition as getActiveClaimCondition721, isERC721 } from "thirdweb/extensions/erc721";
import { MintCard } from "./components";

// Define the NFT contract address
const nftContractAddress = "0x8938fc030Df8780A479f393982890980A192c63f";
// Default token ID (for ERC1155)
const tokenId = BigInt(0);

// Function to fetch NFT info from the contract
async function fetchNFTInfo() {
  try {
    // Get the contract
    const contract = getContract({ address: nftContractAddress, chain: metisChain, client });
    
    // Determine ERC type
    const [isErc721Result, isErc1155Result] = await Promise.all([
      isERC721({ contract }).catch(() => false),
      isERC1155({ contract }).catch(() => false),
    ]);
    
    // Get contract metadata
    const metadata = await getContractMetadata({ contract }).catch(() => undefined);
    
    // Get claim conditions based on contract type
    let claimCondition;
    if (isErc1155Result) {
      claimCondition = await getActiveClaimCondition1155({ contract, tokenId }).catch(() => undefined);
    } else if (isErc721Result) {
      claimCondition = await getActiveClaimCondition721({ contract }).catch(() => undefined);
    }
    
    // Extract display name and description
    const displayName = metadata?.data?.name || metadata?.name || "NFT Collection";
    const description = metadata?.data?.description || metadata?.description || "Mint your NFT from this collection";
    
    // Get currency metadata and price
    let currencyMetadata;
    let pricePerToken = null;
    
    if (claimCondition?.currency) {
      const currencyContract = getContract({ 
        address: claimCondition.currency, 
        chain: metisChain, 
        client 
      });
      
      currencyMetadata = await getCurrencyMetadata({ contract: currencyContract }).catch(() => undefined);
      
      const priceInWei = claimCondition.pricePerToken;
      if (currencyMetadata && priceInWei) {
        // Convert to human-readable format
        pricePerToken = Number(priceInWei) / Math.pow(10, currencyMetadata.decimals);
      }
    }
    
    return {
      contract,
      displayName,
      description,
      contractImage: metadata?.data?.image || metadata?.image || "",
      currencySymbol: currencyMetadata?.symbol || "METIS",
      pricePerToken: pricePerToken || 0,
      isERC1155: isErc1155Result,
      isERC721: isErc721Result,
      tokenId,
    };
  } catch (error) {
    console.error("Error fetching NFT info:", error);
    throw error;
  }
}

export default async function MintZonePage() {
  // Fetch NFT info
  const nftInfo = await fetchNFTInfo();
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">NFT Minting Zone</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-300">
        Mint NFTs from our featured collections.
      </p>
      
      <div className="max-w-lg mx-auto">
        <MintCard
          contract={nftInfo.contract}
          displayName={nftInfo.displayName}
          description={nftInfo.description}
          contractImage={nftInfo.contractImage}
          pricePerToken={nftInfo.pricePerToken}
          currencySymbol={nftInfo.currencySymbol}
          isERC1155={nftInfo.isERC1155}
          isERC721={nftInfo.isERC721}
          tokenId={nftInfo.tokenId}
        />
      </div>
    </div>
  );
} 