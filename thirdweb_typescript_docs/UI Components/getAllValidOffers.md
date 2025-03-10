# getAllValidOffers

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/getAllValidOffers](https://portal.thirdweb.com/references/typescript/v5/marketplace/getAllValidOffers)*

* References
* getAllValidOffers

Retrieves all valid offers based on the provided options.

## Example

`import{ getAllValidOffers }from"thirdweb/extensions/marketplace";constvalidOffers=awaitgetAllValidOffers({contract,start:0,count:10,});`
#### Signature

`functiongetAllValidOffers(options:BaseTransactionOptions<GetAllValidOffersParams>,):Promise<Array<Offer>>;`
## Parameters

#### options

The options for retrieving the valid offers.

### Type

`letoptions:BaseTransactionOptions<GetAllValidOffersParams>;`
## Returns

#### Return Type

`letreturnType:{asset:NFT;assetContractAddress:Address;currencyContractAddress:Address;currencyValue:GetBalanceResult;endTimeInSeconds:bigint;id:bigint;offerorAddress:Address;quantity:bigint;status:ListingStatus;tokenId:bigint;totalPrice:bigint;};`A promise that resolves to the offers array.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

