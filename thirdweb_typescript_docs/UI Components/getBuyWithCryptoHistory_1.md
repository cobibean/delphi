# getBuyWithCryptoHistory

*Source: [https://portal.thirdweb.com/references/typescript/v5/getBuyWithCryptoHistory](https://portal.thirdweb.com/references/typescript/v5/getBuyWithCryptoHistory)*

* References
* getBuyWithCryptoHistory

Gets the History of purchases for a given wallet address

## Example

`import{ createThirdwebClient }from"thirdweb";import{ BuyWithCryptoHistoryData }from"thirdweb/pay";constclient=createThirdwebClient({ clientId:"..."});constwalletAddress="0x...";constparams={client,walletAddress,};// grabs the history of purchase transactions for the wallet addressconststatus=awaitgetBuyWithCryptoHistory(params);`
#### Signature

`functiongetBuyWithCryptoHistory(params:BuyWithCryptoHistoryParams,):Promise<BuyWithCryptoHistoryData>;`
## Parameters

#### params

Object of typeBuyWithCryptoHistoryParams

`BuyWithCryptoHistoryParams`
### Type

`letparams:{client:ThirdwebClient;count:number;start:number;walletAddress:string;};`
## Returns

#### Return Type

`letreturnType:{hasNextPage:boolean;page:Array<BuyWithCryptoStatus>;};`Object of typeBuyWithCryptoHistoryData

`BuyWithCryptoHistoryData`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

