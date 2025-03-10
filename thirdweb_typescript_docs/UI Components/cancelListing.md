# cancelListing

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/cancelListing](https://portal.thirdweb.com/references/typescript/v5/marketplace/cancelListing)*

* References
* cancelListing

Prepares a transaction to call the "cancelListing" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ cancelListing }from"thirdweb/extensions/marketplace";consttransaction=cancelListing({contract,listingId:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functioncancelListing(options:BaseTransactionOptions<|CancelListingParams|{asyncParams:()=>Promise<CancelListingParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "cancelListing" function.

### Type

`letoptions:BaseTransactionOptions<|CancelListingParams|{asyncParams:()=>Promise<CancelListingParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

