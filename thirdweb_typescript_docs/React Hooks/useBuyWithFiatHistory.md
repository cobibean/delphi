# useBuyWithFiatHistory

*Source: [https://portal.thirdweb.com/references/typescript/v5/useBuyWithFiatHistory](https://portal.thirdweb.com/references/typescript/v5/useBuyWithFiatHistory)*

* References
* useBuyWithFiatHistory

Hook to get the "Buy with Fiat" transaction history for a given wallet address.

This hook is a React Query wrapper of thegetBuyWithFiatHistoryfunction.
You can also use that function directly

`getBuyWithFiatHistory`
## Example

`import{ useBuyWithFiatHistory }from"thirdweb/react";functionComponent() {consthistoryQuery=useBuyWithFiatHistory(params);return<div> ... </div>;}`
#### Signature

`functionuseBuyWithFiatHistory(params?:BuyWithFiatHistoryParams,queryParams?:BuyWithFiatHistoryQueryOptions,):UseQueryResult<BuyWithFiatHistoryData>;`
## Parameters

#### params

object of typeBuyWithFiatHistoryParams

`BuyWithFiatHistoryParams`
### Type

`letparams:{client:ThirdwebClient;count:number;start:number;walletAddress:string;};`
#### queryParams

options to configure the react query

### Type

`letqueryParams:BuyWithFiatHistoryQueryOptions;`
## Returns

#### Return Type

`letreturnType:UseQueryResult<BuyWithFiatHistoryData>;`A React Query object which contains the data of typeBuyWithFiatHistoryData

`BuyWithFiatHistoryData`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

