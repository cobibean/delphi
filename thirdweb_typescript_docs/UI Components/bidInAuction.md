# bidInAuction

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/bidInAuction](https://portal.thirdweb.com/references/typescript/v5/marketplace/bidInAuction)*

* References
* bidInAuction

Places a bid in an English auction.

## Example

`import{ bidInAuction }from"thirdweb/extensions/marketplace";import{ sendTransaction }from"thirdweb";consttransaction=bidInAuction({contract,auctionId:0n,bidAmount:"100",});awaitsendTransaction({ transaction, account });`
#### Signature

`functionbidInAuction(options:BaseTransactionOptions<BidInAuctionParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for placing the bid.

### Type

`letoptions:BaseTransactionOptions<BidInAuctionParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A transaction that can be sent to place the bid.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

