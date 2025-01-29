// /interfaces/interfaces.ts

/**
 * Represents the raw listing struct returned by the Marketplace contract.
 * This matches exactly what the contract returns for getAllValidListings / getListing.
 */
export interface IDirectListingRaw {
  listingId: bigint;      // or BigNumber in ethers v5
  tokenId: bigint;
  quantity: bigint;
  pricePerToken: bigint;
  startTimestamp: bigint;
  endTimestamp: bigint;
  listingCreator: string;
  assetContract: string;
  currency: string;
  tokenType: number; // enum as a number
  status: number;    // enum as a number
  reserved: boolean;
}

/**
 * A friendlier "parsed" version of the listing with more convenient types:
 */
export interface IDirectListing {
  listingId: string;       // converted from raw.listingId.toString()
  tokenId: string;         // same idea
  quantity: string;
  pricePerToken: string;   // typically we format using ethers.formatUnits(...)
  startTimestamp: number;  // e.g., Number(raw.startTimestamp)
  endTimestamp: number;    // e.g., Number(raw.endTimestamp)
  listingCreator: string;
  assetContract: string;
  currency: string;
  tokenType: number; // or you can define a TS enum to map these
  status: number;    // likewise
  reserved: boolean;
}

/**
 * NFT metadata fetched from the tokenURI.
 */
export interface INFTMetadata {
  image: string;       // Resolved HTTP or IPFS gateway URL
  name: string;
  description: string;
}

/**
 * A combined listing + NFT metadata, optionally includes a collectionName.
 */
export interface IListingWithNFT extends IDirectListing {
  metadata?: INFTMetadata;
  collectionName?: string;
}