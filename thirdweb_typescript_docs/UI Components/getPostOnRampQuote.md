# getPostOnRampQuote

*Source: [https://portal.thirdweb.com/references/typescript/v5/getPostOnRampQuote](https://portal.thirdweb.com/references/typescript/v5/getPostOnRampQuote)*

* References
* getPostOnRampQuote

When buying a token with fiat currency - It only involes doing on-ramp if the on-ramp provider supports buying the given destination token directly.

If the on-ramp provider does not support buying the destination token directly, user can be sent an intermediate token with fiat currency from the on-ramp provider which
can be swapped to destination token onchain.

getPostOnRampQuotefunction is used to get the quote for swapping the on-ramp token to destination token.

`getPostOnRampQuote`When you get a "Buy with Fiat" status of type "CRYPTO_SWAP_REQUIRED" from thegetBuyWithFiatStatusfunction,
you can usegetPostOnRampQuotefunction to get the quote of typeBuyWithCryptoQuotefor swapping the on-ramp token to destination token

`getBuyWithFiatStatus``getPostOnRampQuote``BuyWithCryptoQuote`Once you have the quote, you can start the Swap process by following the same steps as mentioned in thegetBuyWithCryptoQuotedocumentation.

`getBuyWithCryptoQuote`
## Example

`import{getPostOnRampQuote,getBuyWithFiatStatus,}from"thirdweb/pay";// previous stepsconstfiatQuote=awaitgetBuyWithFiatQuote(fiatQuoteParams);window.open(fiatQuote.onRampLink,"_blank");constbuyWithFiatStatus=awaitgetBuyWithFiatStatus({client,intentId,});// keep calling this until status is "settled" state// when a swap is required after onrampif(buyWithFiatStatus.status==="CRYPTO_SWAP_REQUIRED") {constbuyWithCryptoQuote=awaitgetPostOnRampQuote({client,buyWithFiatStatus,});}`
#### Signature

`functiongetPostOnRampQuote(params:GetPostOnRampQuoteParams,):Promise<BuyWithCryptoQuote>;`
## Parameters

#### params

object of typeGetPostOnRampQuoteParams

`GetPostOnRampQuoteParams`
### Type

`letparams:{buyWithFiatStatus:BuyWithFiatStatus;client:ThirdwebClient;};`
## Returns

#### Return Type

`letreturnType:{approvalData?:QuoteApprovalInfo;client:ThirdwebClient;paymentTokens:Array<QuotePaymentToken>;processingFees:Array<QuotePaymentToken>;swapDetails:{estimated:{durationSeconds?:number;feesUSDCents:number;fromAmountUSDCents:number;gasCostUSDCents?:number;slippageBPS:number;toAmountMinUSDCents:number;toAmountUSDCents:number;};fromAddress:string;fromAmount:string;fromAmountWei:string;fromToken:QuoteTokenInfo;maxSlippageBPS:number;toAddress:string;toAmount:string;toAmountMin:string;toAmountMinWei:string;toAmountWei:string;toToken:QuoteTokenInfo;};transactionRequest:PrepareTransactionOptions;};`Object of typeBuyWithCryptoQuotewhich contains the information about the quote such as processing fees, estimated time, converted token amounts, etc.

`BuyWithCryptoQuote`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

