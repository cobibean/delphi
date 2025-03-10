# getAuction

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/getAuction](https://portal.thirdweb.com/references/typescript/v5/marketplace/getAuction)*

* References
* getAuction

Retrieves an auction listing based on the provided options.

## Example

`import{ getListing }from"thirdweb/extensions/marketplace";constlisting=awaitgetListing({ contract, listingId:1n});`
#### Signature

`functiongetAuction(options:BaseTransactionOptions<GetAuctionParams>,):Promise<EnglishAuction>;`
## Parameters

#### options

The options for retrieving the listing.

### Type

`letoptions:BaseTransactionOptions<GetAuctionParams>;`
## Returns

#### Return Type

`letreturnType:{asset:NFT;assetContractAddress:Address;bidBufferBps:bigint;buyoutBidAmount:bigint;buyoutCurrencyValue:GetBalanceResult;creatorAddress:Address;currencyContractAddress:Address;endTimeInSeconds:bigint;id:bigint;minimumBidAmount:bigint;minimumBidCurrencyValue:GetBalanceResult;quantity:bigint;startTimeInSeconds:bigint;status:ListingStatus;timeBufferInSeconds:bigint;tokenId:bigint;type:"english-auction";};`A promise that resolves to the direct listing.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

