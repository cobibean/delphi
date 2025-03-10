# usePostOnRampQuote

*Source: [https://portal.thirdweb.com/references/typescript/v5/usePostOnRampQuote](https://portal.thirdweb.com/references/typescript/v5/usePostOnRampQuote)*

* References
* usePostOnRampQuote

When buying a token with fiat currency - It only involes doing on-ramp if the on-ramp provider supports buying the given destination token directly.

If the on-ramp provider does not support buying the destination token directly, user can be sent an intermediate token with fiat currency from the on-ramp provider which
can be swapped to destination token onchain.

usePostOnRampQuotehook is used to get the quote for swapping the on-ramp token to destination token.

`usePostOnRampQuote`When you get a "Buy with Fiat" status of type"CRYPTO_SWAP_REQUIRED"from theuseBuyWithFiatStatushook,
you can useusePostOnRampQuotehook to get the quote of typeBuyWithCryptoQuotefor swapping the on-ramp token to destination token to complete the step-2 of the process.

`"CRYPTO_SWAP_REQUIRED"``useBuyWithFiatStatus``usePostOnRampQuote``BuyWithCryptoQuote`Once you have the quote, you can start the Swap process by following the same steps as mentioned in theuseBuyWithCryptoQuotedocumentation.

`useBuyWithCryptoQuote`
#### Signature

`functionusePostOnRampQuote(params?:GetPostOnRampQuoteParams,queryOptions?:PostOnRampQuoteQueryOptions,):UseQueryResult<BuyWithCryptoQuote>;`
## Parameters

#### params

object of typeGetPostOnRampQuoteParams

`GetPostOnRampQuoteParams`
### Type

`letparams:{buyWithFiatStatus:BuyWithFiatStatus;client:ThirdwebClient;};`
#### queryOptions

### Type

`letqueryOptions:PostOnRampQuoteQueryOptions;`
## Returns

#### Return Type

`letreturnType:UseQueryResult<BuyWithCryptoQuote>;`Object of typeBuyWithCryptoQuotewhich contains the information about the quote such as processing fees, estimated time, converted token amounts, etc.

`BuyWithCryptoQuote`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

