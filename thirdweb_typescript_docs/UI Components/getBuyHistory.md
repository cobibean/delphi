# getBuyHistory

*Source: [https://portal.thirdweb.com/references/typescript/v5/getBuyHistory](https://portal.thirdweb.com/references/typescript/v5/getBuyHistory)*

* References
* getBuyHistory

Get Buy transaction history for a given wallet address.

This includes both "Buy with Cryto" and "Buy with Fiat" transactions

## Example

`import{ createThirdwebClient }from"thirdweb";import{ getBuyHistory }from"thirdweb/pay";constclient=createThirdwebClient({ clientId:"..."});consthistory=awaitgetBuyHistory({client,walletAddress:"0x...",});`
#### Signature

`functiongetBuyHistory(params:BuyHistoryParams,):Promise<BuyHistoryData>;`
## Parameters

#### params

Object of typeBuyHistoryParams

`BuyHistoryParams`
### Type

`letparams:{client:ThirdwebClient;count:number;start:number;walletAddress:string;};`
## Returns

#### Return Type

`letreturnType:{hasNextPage:boolean;page:Array<|{buyWithFiatStatus:BuyWithFiatStatus}|{buyWithCryptoStatus:BuyWithCryptoStatus}>;};`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

