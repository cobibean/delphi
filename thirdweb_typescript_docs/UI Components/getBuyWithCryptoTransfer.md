# getBuyWithCryptoTransfer

*Source: [https://portal.thirdweb.com/typescript/v5/getBuyWithCryptoTransfer](https://portal.thirdweb.com/typescript/v5/getBuyWithCryptoTransfer)*

Get a quote of typeBuyWithCryptoTransferto facilitate a token transfer transaction.
Using this instead of a native transfer allows you to receive status and webhooks about successful or failed payments.

`BuyWithCryptoTransfer`Once you have the quote, you can useprepareTransactionand prepare the transaction for submission.

`prepareTransaction`
## Example

`import{ getBuyWithCryptoTransfer }from"thirdweb/pay";consttransfer=awaitgetBuyWithCryptoTransfer({client,fromAddress:"0x...",// wallet addresstoAddress:"0x...",// recipient address - likely to be your walletchainId:10,// chain id of the tokentokenAddress:"0x...",// address of the tokenamount:"10",// amount of token to transferpurchaseData: {// any metadata for you to attribute this purchasecustomerId:"yourId",},});`
#### Signature

`functiongetBuyWithCryptoTransfer(params:GetBuyWithCryptoTransferParams,):Promise<BuyWithCryptoTransfer>;`
## Parameters

#### params

object of typeGetBuyWithCryptoTransferParams

`GetBuyWithCryptoTransferParams`
### Type

`letparams:{amount:string;chainId:number;client:ThirdwebClient;fromAddress:string;purchaseData?:object;toAddress:string;tokenAddress:string;};`
## Returns

#### Return Type

`letreturnType:{approvalData?:QuoteApprovalInfo;client:ThirdwebClient;estimatedGasCostUSDCents:number;fromAddress:string;paymentToken:QuotePaymentToken;processingFee:QuotePaymentToken;toAddress:string;transactionRequest:PrepareTransactionOptions;};`Object of typeBuyWithCryptoTransferwhich contains the information about the transfer

`BuyWithCryptoTransfer`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

