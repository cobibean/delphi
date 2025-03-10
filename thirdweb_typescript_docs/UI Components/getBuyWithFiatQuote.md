# getBuyWithFiatQuote

*Source: [https://portal.thirdweb.com/typescript/v5/getBuyWithFiatQuote](https://portal.thirdweb.com/typescript/v5/getBuyWithFiatQuote)*

Get a quote of typeBuyWithFiatQuoteto buy given token with fiat currency.
This quote contains the information about the swap such as token amounts, processing fees, estimated time etc.

`BuyWithFiatQuote`
### Rendering the On-Ramp provider UI

Once you have thequote, you can open thequote.onRampLinkin a new tab - This will prompt the user to buy the token with fiat currency

`quote``quote.onRampLink`
### Determining the steps required

Ifquote.onRampToken.tokenis same asquote.toToken( same chain + same token address ) - This means that the token can be directly bought from the on-ramp provider.
But if they are different, On-ramp provider will send thequote.onRampTokento the user's wallet address and a swap is required to swap it to the desired token onchain.

`quote.onRampToken.token``quote.toToken``quote.onRampToken`You can use theisSwapRequiredPostOnramputility function to check if a swap is required after the on-ramp is done.

`isSwapRequiredPostOnramp`
### Polling for the status

Once you open thequote.onRampLinkin a new tab, you can start polling for the status usinggetBuyWithFiatStatusto get the status of the transaction.

`quote.onRampLink``getBuyWithFiatStatus`getBuyWithFiatStatusreturns a status object of typeBuyWithFiatStatus.

`getBuyWithFiatStatus``BuyWithFiatStatus`
* If no swap is required - the status will become"ON_RAMP_TRANSFER_COMPLETED"once the on-ramp provider has sent the desired token to the user's wallet address. Once you receive this status, the process is complete.
* If a swap is required - the status will become"CRYPTO_SWAP_REQUIRED"once the on-ramp provider has sent the tokens to the user's wallet address. Once you receive this status, you need to start the swap process.

If no swap is required - the status will become"ON_RAMP_TRANSFER_COMPLETED"once the on-ramp provider has sent the desired token to the user's wallet address. Once you receive this status, the process is complete.

`"ON_RAMP_TRANSFER_COMPLETED"`If a swap is required - the status will become"CRYPTO_SWAP_REQUIRED"once the on-ramp provider has sent the tokens to the user's wallet address. Once you receive this status, you need to start the swap process.

`"CRYPTO_SWAP_REQUIRED"`
### Swap Process

On receiving the"CRYPTO_SWAP_REQUIRED"status, you can use thegetPostOnRampQuotefunction to get the quote for the swap of typeBuyWithCryptoQuote.

`"CRYPTO_SWAP_REQUIRED"``getPostOnRampQuote``BuyWithCryptoQuote`Once you have this quote - You can follow the same steps as mentioned in thegetBuyWithCryptoQuotedocumentation to perform the swap.

`getBuyWithCryptoQuote`
## Example

Get a quote for buying 10 USDC on polygon chain (chainId: 137) with USD fiat currency:

`import{ getBuyWithFiatQuote }from"thirdweb/pay";constquote=awaitgetBuyWithFiatQuote({client: client,// thirdweb clientfromCurrencySymbol:"USD",// fiat currency symboltoChainId:137,// polygon chain idtoAmount:"10",// amount of USDC to buytoTokenAddress:"0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359"// USDC token address in polygon chaintoAddress:"0x...",// user's wallet addressisTestMode:false,// whether to use onramp in test mode for testing purpose (defaults to false)});window.open(quote.onRampLink,"_blank");`
#### Signature

`functiongetBuyWithFiatQuote(params:GetBuyWithFiatQuoteParams,):Promise<BuyWithFiatQuote>;`
## Parameters

#### params

object of typeGetBuyWithFiatQuoteParams

`GetBuyWithFiatQuoteParams`
### Type

`letparams:{client:ThirdwebClient;fromAddress:string;fromAmount?:string;fromCurrencySymbol:CurrencyMeta["shorthand"];isTestMode?:boolean;maxSlippageBPS?:number;preferredProvider?:FiatProvider;purchaseData?:object;toAddress:string;toAmount?:string;toChainId:number;toGasAmountWei?:string;toTokenAddress:string;};`
## Returns

#### Return Type

`letreturnType:{estimatedDurationSeconds:number;estimatedToAmountMin:string;estimatedToAmountMinWei:string;fromAddress:string;fromCurrency:{amount:string;amountUnits:string;currencySymbol:string;decimals:number;};fromCurrencyWithFees:{amount:string;amountUnits:string;currencySymbol:string;decimals:number;};intentId:string;maxSlippageBPS:number;onRampLink:string;onRampToken:{amount:string;amountUSDCents:number;amountWei:string;token:PayTokenInfo;};processingFees:Array<{amount:string;amountUnits:string;currencySymbol:string;decimals:number;feeType:"ON_RAMP"|"NETWORK";}>;provider:FiatProvider;routingToken?:{amount:string;amountUSDCents:number;amountWei:string;token:PayTokenInfo;};toAddress:string;toAmountMin:string;toAmountMinWei:string;toToken:PayTokenInfo;};`Object of typeBuyWithFiatQuotewhich contains the information about the quote such as processing fees, estimated time, converted token amounts, etc.

`BuyWithFiatQuote`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

