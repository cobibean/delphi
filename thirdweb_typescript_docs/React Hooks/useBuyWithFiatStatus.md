# useBuyWithFiatStatus

*Source: [https://portal.thirdweb.com/references/typescript/v5/useBuyWithFiatStatus](https://portal.thirdweb.com/references/typescript/v5/useBuyWithFiatStatus)*

* References
* useBuyWithFiatStatus

A hook to get a status of a "Buy with Fiat" transaction to determine if the transaction is completed, failed or pending.

This hook is a React Query wrapper of thegetBuyWithFiatStatusfunction.
You can also use that function directly.

`getBuyWithFiatStatus`useBuyWithFiatStatusrefetches the status usinggetBuyWithFiatStatusevery 5 seconds.

`useBuyWithFiatStatus``getBuyWithFiatStatus`
## Example

`import{ useBuyWithFiatStatus }from"thirdweb/react";import{ client }from"./client";functionExample() {constfiatStatus=useBuyWithFiatStatus({client: client,// thirdweb clientintentId:"....",// get the intentId from quote ( quote.intentId )});console.log(fiatStatus.data);return<div>...</div>;}`
#### Signature

`functionuseBuyWithFiatStatus(params?:WithPickedOnceQueryOptions<GetBuyWithFiatStatusParams>,):UseQueryResult<BuyWithFiatStatus>;`
## Parameters

#### params

object of typeGetBuyWithFiatStatusParams

`GetBuyWithFiatStatusParams`
### Type

`letparams:WithPickedOnceQueryOptions<GetBuyWithFiatStatusParams>;`
## Returns

#### Return Type

`letreturnType:UseQueryResult<BuyWithFiatStatus>;`A react query object which contains the data of typeBuyWithFiatStatus

`BuyWithFiatStatus`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

