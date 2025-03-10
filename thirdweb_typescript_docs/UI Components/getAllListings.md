# getAllListings

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/getAllListings](https://portal.thirdweb.com/references/typescript/v5/marketplace/getAllListings)*

* References
* getAllListings

Retrieves all direct listings based on the provided options.

## Example

`import{ getAllListings }from"thirdweb/extensions/marketplace";constlistings=awaitgetAllListings({contract,start:0,count:10,});`
#### Signature

`functiongetAllListings(options:BaseTransactionOptions<GetAllListingParams>,):Promise<Array<DirectListing>>;`
## Parameters

#### options

The options for retrieving the listing.

### Type

`letoptions:BaseTransactionOptions<GetAllListingParams>;`
## Returns

#### Return Type

`letreturnType:{asset:NFT;assetContractAddress:Address;creatorAddress:Address;currencyContractAddress:Address;currencyValuePerToken:GetBalanceResult;endTimeInSeconds:bigint;id:bigint;isReservedListing:boolean;pricePerToken:bigint;quantity:bigint;startTimeInSeconds:bigint;status:ListingStatus;tokenId:bigint;type:"direct-listing";};`A promise that resolves to the direct listings array.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

