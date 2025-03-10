# collectAuctionPayout

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/collectAuctionPayout](https://portal.thirdweb.com/references/typescript/v5/marketplace/collectAuctionPayout)*

* References
* collectAuctionPayout

Prepares a transaction to call the "collectAuctionPayout" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ collectAuctionPayout }from"thirdweb/extensions/marketplace";consttransaction=collectAuctionPayout({contract,auctionId:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functioncollectAuctionPayout(options:BaseTransactionOptions<|CollectAuctionPayoutParams|{asyncParams:()=>Promise<CollectAuctionPayoutParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "collectAuctionPayout" function.

### Type

`letoptions:BaseTransactionOptions<|CollectAuctionPayoutParams|{asyncParams:()=>Promise<CollectAuctionPayoutParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

