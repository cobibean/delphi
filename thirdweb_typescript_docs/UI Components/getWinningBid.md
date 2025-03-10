# getWinningBid

*Source: [https://portal.thirdweb.com/references/typescript/v5/marketplace/getWinningBid](https://portal.thirdweb.com/references/typescript/v5/marketplace/getWinningBid)*

* References
* getWinningBid

Retrieves the winning bid information for a given auction.

## Example

`import{ getWinningBid }from"thirdweb/extensions/marketplace";constwinningBid=awaitgetWinningBid({contract,auctionId:0n,});`
#### Signature

`functiongetWinningBid(options:BaseTransactionOptions<GetWinningBidParams>,):Promise<|undefined|{bidAmountWei:bigint;bidderAddress:string;currencyAddress:string;currencyValue:CurrencyValue;}>;`
## Parameters

#### options

The options for retrieving the winning bid.

### Type

`letoptions:BaseTransactionOptions<GetWinningBidParams>;`
## Returns

#### Return Type

`letreturnType:Promise<|undefined|{bidAmountWei:bigint;bidderAddress:string;currencyAddress:string;currencyValue:CurrencyValue;}>;`The winning bid information, or undefined if there is no winning bid.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

