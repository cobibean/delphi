# getOffer

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/getOffer](https://portal.thirdweb.com/references/typescript/v5/marketplace/getOffer)*

* References
* getOffer

Retrieves an offer based on the provided options.

## Example

`import{ getOffer }from"thirdweb/extensions/marketplace";constlisting=awaitgetOffer({ contract, listingId:1n});`
#### Signature

`functiongetOffer(options:BaseTransactionOptions<GetOfferParams>,):Promise<Offer>;`
## Parameters

#### options

The options for retrieving the offer.

### Type

`letoptions:BaseTransactionOptions<GetOfferParams>;`
## Returns

#### Return Type

`letreturnType:{asset:NFT;assetContractAddress:Address;currencyContractAddress:Address;currencyValue:GetBalanceResult;endTimeInSeconds:bigint;id:bigint;offerorAddress:Address;quantity:bigint;status:ListingStatus;tokenId:bigint;totalPrice:bigint;};`A promise that resolves to the offer.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

