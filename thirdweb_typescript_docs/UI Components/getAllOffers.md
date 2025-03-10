# getAllOffers

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/getAllOffers](https://portal.thirdweb.com/references/typescript/v5/marketplace/getAllOffers)*

* References
* getAllOffers

Retrieves all offers based on the provided options.

## Example

`import{ getAllOffers }from"thirdweb/extensions/marketplace";constlistings=awaitgetAllOffers({contract,start:0,count:10,});`
#### Signature

`functiongetAllOffers(options:BaseTransactionOptions<GetAllOffersParams>,):Promise<Array<Offer>>;`
## Parameters

#### options

The options for retrieving the offers.

### Type

`letoptions:BaseTransactionOptions<GetAllOffersParams>;`
## Returns

#### Return Type

`letreturnType:{asset:NFT;assetContractAddress:Address;currencyContractAddress:Address;currencyValue:GetBalanceResult;endTimeInSeconds:bigint;id:bigint;offerorAddress:Address;quantity:bigint;status:ListingStatus;tokenId:bigint;totalPrice:bigint;};`A promise that resolves to the offers array.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

