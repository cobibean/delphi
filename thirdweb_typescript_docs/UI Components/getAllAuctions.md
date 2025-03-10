# getAllAuctions

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/getAllAuctions](https://portal.thirdweb.com/references/typescript/v5/marketplace/getAllAuctions)*

* References
* getAllAuctions

Retrieves all auctions based on the provided options.

## Example

`import{ getAllAuctions }from"thirdweb/extensions/marketplace";constlistings=awaitgetAllAuctions({contract,start:0,count:10,});`
#### Signature

`functiongetAllAuctions(options:BaseTransactionOptions<GetAllAuctionParams>,):Promise<Array<EnglishAuction>>;`
## Parameters

#### options

The options for retrieving the auctions.

### Type

`letoptions:BaseTransactionOptions<GetAllAuctionParams>;`
## Returns

#### Return Type

`letreturnType:{asset:NFT;assetContractAddress:Address;bidBufferBps:bigint;buyoutBidAmount:bigint;buyoutCurrencyValue:GetBalanceResult;creatorAddress:Address;currencyContractAddress:Address;endTimeInSeconds:bigint;id:bigint;minimumBidAmount:bigint;minimumBidCurrencyValue:GetBalanceResult;quantity:bigint;startTimeInSeconds:bigint;status:ListingStatus;timeBufferInSeconds:bigint;tokenId:bigint;type:"english-auction";};`A promise that resolves to the auctions array.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

