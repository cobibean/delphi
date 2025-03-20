# approveCurrencyForListing

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/approveCurrencyForListing](https://portal.thirdweb.com/references/typescript/v5/marketplace/approveCurrencyForListing)*

* References
* approveCurrencyForListing

Prepares a transaction to call the "approveCurrencyForListing" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ approveCurrencyForListing }from"thirdweb/extensions/marketplace";consttransaction=approveCurrencyForListing({contract,listingId:...,currency:...,pricePerTokenInCurrency:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionapproveCurrencyForListing(options:BaseTransactionOptions<|ApproveCurrencyForListingParams|{asyncParams:()=>Promise<ApproveCurrencyForListingParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "approveCurrencyForListing" function.

### Type

`letoptions:BaseTransactionOptions<|ApproveCurrencyForListingParams|{asyncParams:()=>Promise<ApproveCurrencyForListingParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

