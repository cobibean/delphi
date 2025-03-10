# isSwapRequiredPostOnramp

*Source: [https://portal.thirdweb.com/references/typescript/v5/isSwapRequiredPostOnramp](https://portal.thirdweb.com/references/typescript/v5/isSwapRequiredPostOnramp)*

* References
* isSwapRequiredPostOnramp

Check if a Swap is required after on-ramp when buying a token with fiat currency.

Ifquote.toTokenandquote.onRampTokenare the same (same token and chain),
it means on-ramp provider can directly send the desired token to the user's wallet and no swap is required.

`quote.toToken``quote.onRampToken`Ifquote.toTokenandquote.onRampTokenare different (different token or chain), A swap is required to swap the on-ramp token to the desired token.

`quote.toToken``quote.onRampToken`
#### Signature

`functionisSwapRequiredPostOnramp(buyWithFiatQuote:Pick<BuyWithFiatQuote,"toToken"|"onRampToken">,):boolean;`
## Parameters

#### buyWithFiatQuote

The quote of typeBuyWithFiatQuotereturned
by thegetBuyWithFiatQuotefunction.

`BuyWithFiatQuote``getBuyWithFiatQuote`
### Type

`letbuyWithFiatQuote:Pick<BuyWithFiatQuote,"toToken"|"onRampToken">;`
## Returns

#### Return Type

`letreturnType:boolean;`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

