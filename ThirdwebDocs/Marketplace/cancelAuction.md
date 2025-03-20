# cancelAuction

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/cancelAuction](https://portal.thirdweb.com/references/typescript/v5/marketplace/cancelAuction)*

* References
* cancelAuction

Cancels an auction by providing the necessary options.

## Example

`import{ cancelAuction }from"thirdweb/extensions/marketplace";import{ sendTransaction }from"thirdweb";consttransaction=cancelAuction({contract,auctionId:0n,});awaitsendTransaction({ transaction, account });`
#### Signature

`functioncancelAuction(options:BaseTransactionOptions<CancelAuctionParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for canceling the auction.

### Type

`letoptions:BaseTransactionOptions<CancelAuctionParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A transaction that can be sent to cancel the auction.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

