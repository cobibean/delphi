# buyoutAuction

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/buyoutAuction](https://portal.thirdweb.com/references/typescript/v5/marketplace/buyoutAuction)*

* References
* buyoutAuction

Buys out an English auction.

## Example

`import{ buyoutAuction }from"thirdweb/extensions/marketplace";import{ sendTransaction }from"thirdweb";consttransaction=buyoutAuction({contract,auctionId:0n,});awaitsendTransaction({ transaction, account });`
#### Signature

`functionbuyoutAuction(options:BaseTransactionOptions<BuyoutAuctionParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for buying out the auction.

### Type

`letoptions:BaseTransactionOptions<BuyoutAuctionParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A transaction that can be sent to buy out the auction.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

