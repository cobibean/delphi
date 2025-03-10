# currencyPriceForListing

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/currencyPriceForListing](https://portal.thirdweb.com/references/typescript/v5/marketplace/currencyPriceForListing)*

* References
* currencyPriceForListing

Retrieves the currency price for a listing.

## Example

`import{ currencyPriceForListing }from"thirdweb/extensions/marketplace";constprice=awaitcurrencyPriceForListing({contract,listingId:1n,currency:"0x...",});`
#### Signature

`functioncurrencyPriceForListing(options:BaseTransactionOptions<CurrencyPriceForListingParams>,):Promise<bigint>;`
## Parameters

#### options

The options for retrieving the currency price.

### Type

`letoptions:BaseTransactionOptions<CurrencyPriceForListingParams>;`
## Returns

#### Return Type

`letreturnType:Promise<bigint>;`A promise that resolves to the currency price as a bigint.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

