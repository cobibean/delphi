import { ethers } from "ethers";

/**
 * Fetches the collection name for a given NFT contract.
 * @param contractAddress - The address of the NFT contract.
 * @param provider - An instance of ethers.JsonRpcProvider.
 * @returns The name of the NFT collection.
 */
const fetchCollectionName = async (contractAddress: string, provider: ethers.JsonRpcProvider) => {
  try {
    const contract = new ethers.Contract(contractAddress, [
      "function name() view returns (string)",
    ], provider);

    const name = await contract.name();
    return name;
  } catch (error) {
    console.error(`Error fetching collection name for ${contractAddress}:`, error);
    throw error;
  }
};

export default fetchCollectionName;