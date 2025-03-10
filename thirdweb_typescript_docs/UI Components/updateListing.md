# updateListing

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/updateListing](https://portal.thirdweb.com/references/typescript/v5/marketplace/updateListing)*

* References
* updateListing

Updates an existing direct listing.

## Example

`import{ updateListing }from"thirdweb/extensions/marketplace";import{ sendTransaction }from"thirdweb";consttransaction=updateListing({...});awaitsendTransaction({ transaction, account });`
#### Signature

`functionupdateListing(options:BaseTransactionOptions<UpdateListingParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for updating the direct listing.

### Type

`letoptions:BaseTransactionOptions<UpdateListingParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`The result of updating the direct listing.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

