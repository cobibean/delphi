# useBuyWithFiatQuote

*Source: [https://portal.thirdweb.com/references/typescript/v5/useBuyWithFiatQuote](https://portal.thirdweb.com/references/typescript/v5/useBuyWithFiatQuote)*

* References
* useBuyWithFiatQuote

Hook to get a price quote for performing a "Buy with Fiat" transaction that allows users to buy a token with fiat currency.

The price quote is an object of typeBuyWithFiatQuote.
This quote contains the information about the purchase such as token amounts, processing fees, estimated time etc.

`BuyWithFiatQuote`This hook is a React Query wrapper of thegetBuyWithFiatQuotefunction.
You can also use that function directly

`getBuyWithFiatQuote`Once you have thequote, you can open a new window withquote.onRampLinkto allow the user to buy the token with fiat currency.
anduseBuyWithFiatStatusfunction to start polling for the status of this transaction.

`quote``quote.onRampLink``useBuyWithFiatStatus`
## Example

`import{ NATIVE_TOKEN_ADDRESS }from"thirdweb";import{ base }from"thirdweb/chains";import{ useBuyWithFiatQuote }from"thirdweb/react";// get a quote for buying 0.01 base native token with USD fiat currencyfunctionExample() {constquote=useBuyWithFiatQuote({client: client,// thirdweb clientfromCurrencySymbol:"USD",// fiat currency symboltoChainId: base.id,// base chain idtoAmount:"0.01",// amount of token to buytoTokenAddress:NATIVE_TOKEN_ADDRESS,// native tokentoAddress:"0x...",// user's wallet address});return(<div>{quote.data&& (<ahref={quote.data.onRampLink} target="_blank">openonrampprovider</a>)}</div>);}`
#### Signature

`functionuseBuyWithFiatQuote(params?:GetBuyWithFiatQuoteParams,queryOptions?:BuyWithFiatQuoteQueryOptions,):UseQueryResult<BuyWithFiatQuote>;`
## Parameters

#### params

object of typeGetBuyWithFiatQuoteParams

`GetBuyWithFiatQuoteParams`
### Type

`letparams:{client:ThirdwebClient;fromAddress:string;fromAmount?:string;fromCurrencySymbol:CurrencyMeta["shorthand"];isTestMode?:boolean;maxSlippageBPS?:number;preferredProvider?:FiatProvider;purchaseData?:object;toAddress:string;toAmount?:string;toChainId:number;toGasAmountWei?:string;toTokenAddress:string;};`
#### queryOptions

### Type

`letqueryOptions:BuyWithFiatQuoteQueryOptions;`
## Returns

#### Return Type

`letreturnType:UseQueryResult<BuyWithFiatQuote>;`A React Query object which contains the data of typeBuyWithFiatQuote

`BuyWithFiatQuote`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

