# getBuyWithFiatHistory

*Source: [https://portal.thirdweb.com/typescript/v5/getBuyWithFiatHistory](https://portal.thirdweb.com/typescript/v5/getBuyWithFiatHistory)*

Get the "Buy with fiat" transaction history for a given wallet address

## Example

`import{ createThirdwebClient }from"thirdweb";import{ getBuyWithFiatHistory }from"thirdweb/pay";constclient=createThirdwebClient({ clientId:"..."});// get the 10 latest "Buy with fiat" transactions dony by the walletconsthistory=awaitgetBuyWithFiatHistory({client: client,walletAddress:"0x...",start:0,count:10,});`
#### Signature

`functiongetBuyWithFiatHistory(params:BuyWithFiatHistoryParams,):Promise<BuyWithFiatHistoryData>;`
## Parameters

#### params

Object of typeBuyWithFiatHistoryParams

`BuyWithFiatHistoryParams`
### Type

`letparams:{client:ThirdwebClient;count:number;start:number;walletAddress:string;};`
## Returns

#### Return Type

`letreturnType:{hasNextPage:boolean;page:Array<BuyWithFiatStatus>;};`Object of typeBuyWithFiatHistoryData

`BuyWithFiatHistoryData`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

