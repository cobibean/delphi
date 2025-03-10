# createAuction

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/createAuction](https://portal.thirdweb.com/references/typescript/v5/marketplace/createAuction)*

* References
* createAuction

Creates an auction.

## Example

`import{ createAuction }from"thirdweb/extensions/marketplace";import{ sendTransaction }from"thirdweb";consttransaction=createAuction({...});awaitsendTransaction({ transaction, account });`
#### Signature

`functioncreateAuction(options:BaseTransactionOptions<CreateAuctionParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for creating the auction.

### Type

`letoptions:BaseTransactionOptions<CreateAuctionParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`The result of creating the auction.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

