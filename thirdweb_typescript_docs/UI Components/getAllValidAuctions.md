# getAllValidAuctions

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/getAllValidAuctions](https://portal.thirdweb.com/references/typescript/v5/marketplace/getAllValidAuctions)*

* References
* getAllValidAuctions

Retrieves all valid auctions based on the provided options.

## Example

`import{ getAllValidAuctions }from"thirdweb/extensions/marketplace";constvalidAuctions=awaitgetAllValidAuctions({contract,start:0,count:10,});`
#### Signature

`functiongetAllValidAuctions(options:BaseTransactionOptions<GetAllValidAuctionParams>,):Promise<Array<EnglishAuction>>;`
## Parameters

#### options

The options for retrieving the listing.

### Type

`letoptions:BaseTransactionOptions<GetAllValidAuctionParams>;`
## Returns

#### Return Type

`letreturnType:{asset:NFT;assetContractAddress:Address;bidBufferBps:bigint;buyoutBidAmount:bigint;buyoutCurrencyValue:GetBalanceResult;creatorAddress:Address;currencyContractAddress:Address;endTimeInSeconds:bigint;id:bigint;minimumBidAmount:bigint;minimumBidCurrencyValue:GetBalanceResult;quantity:bigint;startTimeInSeconds:bigint;status:ListingStatus;timeBufferInSeconds:bigint;tokenId:bigint;type:"english-auction";};`A promise that resolves to the valid auctions array.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

