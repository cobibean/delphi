# getBuyWithFiatStatus

*Source: [https://portal.thirdweb.com/references/typescript/v5/getBuyWithFiatStatus](https://portal.thirdweb.com/references/typescript/v5/getBuyWithFiatStatus)*

* References
* getBuyWithFiatStatus

Once you get aquotefromgetBuyWithFiatQuoteand open thequote.onRampLinkin a new tab, you can start polling for the transaction status usinggetBuyWithFiatStatus

`quote``getBuyWithFiatQuote``quote.onRampLink``getBuyWithFiatStatus`You should keep calling this function at regular intervals while the status is in one of the pending states such as - "PENDING_PAYMENT", "PENDING_ON_RAMP_TRANSFER", "ON_RAMP_TRANSFER_IN_PROGRESS", "CRYPTO_SWAP_IN_PROGRESS" etc..

Ifquote.onRampTokenis same asquote.toToken(same chain + same token address) - This means that the token can be directly bought from the on-ramp provider.
But if they are different - On-ramp provider will send thequote.onRampTokento the user's wallet address and a swap is required to convert it to the desired token.
You can use theisSwapRequiredPostOnramputility function to check if a swap is required after the on-ramp is done.

`quote.onRampToken``quote.toToken``quote.onRampToken``isSwapRequiredPostOnramp`
#### When no swap is required

If there is no swap required - the status will become"ON_RAMP_TRANSFER_COMPLETED"once the on-ramp provider has sent the tokens to the user's wallet address.
Once you receive this status, the process is complete.

`"ON_RAMP_TRANSFER_COMPLETED"`
### When a swap is required

If a swap is required - the status will become"CRYPTO_SWAP_REQUIRED"once the on-ramp provider has sent the tokens to the user's wallet address.
Once you receive this status, you need to start the swap process.

`"CRYPTO_SWAP_REQUIRED"`On receiving the"CRYPTO_SWAP_REQUIRED"status, you can use thegetPostOnRampQuotefunction to get the quote for the swap of typeBuyWithCryptoQuote.

`"CRYPTO_SWAP_REQUIRED"``getPostOnRampQuote``BuyWithCryptoQuote`Once you have this quote - You can follow the same steps as mentioned in thegetBuyWithCryptoQuotedocumentation to perform the swap.

`getBuyWithCryptoQuote`
## Example

`// step 1 - get a quoteconstfiatQuote=awaitgetBuyWithFiatQuote(fiatQuoteParams);// step 2 - open the on-ramp provider UIwindow.open(quote.onRampLink,"_blank");// step 3 - keep calling getBuyWithFiatStatus while the status is in one of the pending statesconstfiatStatus=awaitgetBuyWithFiatStatus({client,intentId: fiatQuote.intentId,});// when the fiatStatus.status is "ON_RAMP_TRANSFER_COMPLETED" - the process is complete// when the fiatStatus.status is "CRYPTO_SWAP_REQUIRED" - start the swap process`
#### Signature

`functiongetBuyWithFiatStatus(params:GetBuyWithFiatStatusParams,):Promise<BuyWithFiatStatus>;`
## Parameters

#### params

Object of typeGetBuyWithFiatStatusParams

`GetBuyWithFiatStatusParams`
### Type

`letparams:{client:ThirdwebClient;intentId:string};`
## Returns

#### Return Type

`letreturnType:|{status:"NOT_FOUND"}|{destination?:PayOnChainTransactionDetails;failureMessage?:string;fromAddress:string;intentId:string;purchaseData?:object;quote:{createdAt:string;estimatedDurationSeconds?:number;estimatedOnRampAmount:string;estimatedOnRampAmountWei:string;estimatedToTokenAmount:string;estimatedToTokenAmountWei:string;fromCurrency:{amount:string;amountUnits:string;currencySymbol:string;decimals:number;};fromCurrencyWithFees:{amount:string;amountUnits:string;currencySymbol:string;decimals:number;};onRampToken:PayTokenInfo;toToken:PayTokenInfo;};source?:PayOnChainTransactionDetails;status:|"NONE"|"PENDING_PAYMENT"|"PAYMENT_FAILED"|"PENDING_ON_RAMP_TRANSFER"|"ON_RAMP_TRANSFER_IN_PROGRESS"|"ON_RAMP_TRANSFER_COMPLETED"|"ON_RAMP_TRANSFER_FAILED"|"CRYPTO_SWAP_REQUIRED"|"CRYPTO_SWAP_COMPLETED"|"CRYPTO_SWAP_FALLBACK"|"CRYPTO_SWAP_IN_PROGRESS"|"CRYPTO_SWAP_FAILED";toAddress:string;};`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

