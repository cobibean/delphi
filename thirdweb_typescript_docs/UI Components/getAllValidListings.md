# getAllValidListings

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/getAllValidListings](https://portal.thirdweb.com/references/typescript/v5/marketplace/getAllValidListings)*

* References
* getAllValidListings

Retrieves all valid direct listings based on the provided options.

## Example

`import{ getAllValidListings }from"thirdweb/extensions/marketplace";constvalidListings=awaitgetAllValidListings({contract,start:0,count:10,});`
#### Signature

`functiongetAllValidListings(options:BaseTransactionOptions<GetAllValidListingParams>,):Promise<Array<DirectListing>>;`
## Parameters

#### options

The options for retrieving the valid listing.

### Type

`letoptions:BaseTransactionOptions<GetAllValidListingParams>;`
## Returns

#### Return Type

`letreturnType:{asset:NFT;assetContractAddress:Address;creatorAddress:Address;currencyContractAddress:Address;currencyValuePerToken:GetBalanceResult;endTimeInSeconds:bigint;id:bigint;isReservedListing:boolean;pricePerToken:bigint;quantity:bigint;startTimeInSeconds:bigint;status:ListingStatus;tokenId:bigint;type:"direct-listing";};`A promise that resolves to the direct listings array.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

