# collectAuctionTokens

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/collectAuctionTokens](https://portal.thirdweb.com/references/typescript/v5/marketplace/collectAuctionTokens)*

* References
* collectAuctionTokens

Prepares a transaction to call the "collectAuctionTokens" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ collectAuctionTokens }from"thirdweb/extensions/marketplace";consttransaction=collectAuctionTokens({contract,auctionId:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functioncollectAuctionTokens(options:BaseTransactionOptions<|CollectAuctionTokensParams|{asyncParams:()=>Promise<CollectAuctionTokensParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "collectAuctionTokens" function.

### Type

`letoptions:BaseTransactionOptions<|CollectAuctionTokensParams|{asyncParams:()=>Promise<CollectAuctionTokensParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

