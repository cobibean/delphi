# getBuyWithCryptoQuote

*Source: [https://portal.thirdweb.com/references/typescript/v5/getBuyWithCryptoQuote](https://portal.thirdweb.com/references/typescript/v5/getBuyWithCryptoQuote)*

* References
* getBuyWithCryptoQuote

Get a quote of typeBuyWithCryptoQuoteto buy any given token with crypto.
This quote contains the information about the swap such as token amounts, processing fees, estimated time etc.

`BuyWithCryptoQuote`Once you have the quote, you can useprepareTransactionand prepare the transaction for submission.

`prepareTransaction`
## Example

`import{ getBuyWithCryptoQuote }from"thirdweb/pay";constquote=awaitgetBuyWithCryptoQuote({client,fromAddress:"0x...",// wallet addressfromChainId:137,// chain id of the source tokenfromTokenAddress:"0x...",// token address of the source tokenfromAmount:"10",// amount of source token to swap// optionally, you can use `toAmount` instead if you only want a certain amount of destination tokentoChainId:10,// chain id of the destination tokentoTokenAddress:"0x...",// token address of the destination tokentoAddress:"0x...",// optional: send the tokens to a different addressmaxSlippageBPS:50,// optional: max 0.5% slippage});`
#### Signature

`functiongetBuyWithCryptoQuote(params:GetBuyWithCryptoQuoteParams,):Promise<BuyWithCryptoQuote>;`
## Parameters

#### params

object of typeGetBuyWithCryptoQuoteParams

`GetBuyWithCryptoQuoteParams`
### Type

`letparams:{client:ThirdwebClient;fromAddress:string;fromChainId:number;fromTokenAddress:string;intentId?:string;maxSlippageBPS?:number;purchaseData?:object;toAddress:string;toChainId:number;toTokenAddress:string;}&(|{fromAmount:string;toAmount?:never}|{fromAmount?:never;toAmount:string});`
## Returns

#### Return Type

`letreturnType:{approvalData?:QuoteApprovalInfo;client:ThirdwebClient;paymentTokens:Array<QuotePaymentToken>;processingFees:Array<QuotePaymentToken>;swapDetails:{estimated:{durationSeconds?:number;feesUSDCents:number;fromAmountUSDCents:number;gasCostUSDCents?:number;slippageBPS:number;toAmountMinUSDCents:number;toAmountUSDCents:number;};fromAddress:string;fromAmount:string;fromAmountWei:string;fromToken:QuoteTokenInfo;maxSlippageBPS:number;toAddress:string;toAmount:string;toAmountMin:string;toAmountMinWei:string;toAmountWei:string;toToken:QuoteTokenInfo;};transactionRequest:PrepareTransactionOptions;};`Object of typeBuyWithCryptoQuotewhich contains the information about the quote such as processing fees, estimated time, converted token amounts, etc.

`BuyWithCryptoQuote`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

