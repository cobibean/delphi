# buyFromListing

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/buyFromListing](https://portal.thirdweb.com/references/typescript/v5/marketplace/buyFromListing)*

* References
* buyFromListing

Buys a listing from the marketplace.

## Example

`import{ buyFromListing }from"thirdweb/extensions/marketplace";import{ sendTransaction }from"thirdweb";consttransaction=buyFromListing({contract,listingId:1n,quantity:1n,recipient:"0x...",});awaitsendTransaction({ transaction, account });`When usingbuyFromListingwith Pay, theerc20Valuewill be automatically set to the listing currency.

`buyFromListing``erc20Value`
#### Signature

`functionbuyFromListing(options:BaseTransactionOptions<BuyFromListingParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for buying from a listing.

### Type

`letoptions:BaseTransactionOptions<BuyFromListingParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A promise that resolves to the transaction result.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

