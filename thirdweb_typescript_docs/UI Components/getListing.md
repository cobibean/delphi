# getListing

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/getListing](https://portal.thirdweb.com/references/typescript/v5/marketplace/getListing)*

* References
* getListing

Retrieves a direct listing based on the provided options.

## Example

`import{ getListing }from"thirdweb/extensions/marketplace";constlisting=awaitgetListing({ contract, listingId:1n});`
#### Signature

`functiongetListing(options:BaseTransactionOptions<GetListingParams>,):Promise<DirectListing>;`
## Parameters

#### options

The options for retrieving the listing.

### Type

`letoptions:BaseTransactionOptions<GetListingParams>;`
## Returns

#### Return Type

`letreturnType:{asset:NFT;assetContractAddress:Address;creatorAddress:Address;currencyContractAddress:Address;currencyValuePerToken:GetBalanceResult;endTimeInSeconds:bigint;id:bigint;isReservedListing:boolean;pricePerToken:bigint;quantity:bigint;startTimeInSeconds:bigint;status:ListingStatus;tokenId:bigint;type:"direct-listing";};`A promise that resolves to the direct listing.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

