# getBuyWithCryptoStatus

*Source: [https://portal.thirdweb.com/typescript/v5/getBuyWithCryptoStatus](https://portal.thirdweb.com/typescript/v5/getBuyWithCryptoStatus)*

Gets the status of a buy with crypto transaction

## Example

`import{ sendTransaction }from"thirdweb";import{ getBuyWithCryptoStatus, getBuyWithCryptoQuote }from"thirdweb/pay";// get a quote between two tokensconstquote=awaitgetBuyWithCryptoQuote(quoteParams);// if approval is required, send the approval transactionif(quote.approval) {consttxResult=awaitsendTransaction({transaction: quote.approval,account: account,// account from connected wallet});awaitwaitForReceipt(txResult);}// send the quoted transactionconstswapTxResult=awaitsendTransaction({transaction: quote.transactionRequest,account: account,// account from connected wallet});awaitwaitForReceipt(swapTxResult);// keep polling the status of the quoted transaction until it returns a success or failure statusconststatus=awaitgetBuyWithCryptoStatus({client,transactionHash: swapTxResult.transactionHash,}});`
#### Signature

`functiongetBuyWithCryptoStatus(buyWithCryptoTransaction:BuyWithCryptoTransaction,):Promise<BuyWithCryptoStatus>;`
## Parameters

#### buyWithCryptoTransaction

Object of typeBuyWithCryptoTransaction

`BuyWithCryptoTransaction`
### Type

`letbuyWithCryptoTransaction:{chainId:number;client:ThirdwebClient;transactionHash:string;};`
## Returns

#### Return Type

`letreturnType:|{status:"NOT_FOUND"}|{bridge?:string;destination?:PayOnChainTransactionDetails;failureMessage?:string;fromAddress:string;purchaseData?:object;quote:BuyWithCryptoQuoteSummary;source?:PayOnChainTransactionDetails;status:BuyWithCryptoStatuses;subStatus:BuyWithCryptoSubStatuses;swapType:SwapType;toAddress:string;};`Object of typeBuyWithCryptoStatus

`BuyWithCryptoStatus`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

