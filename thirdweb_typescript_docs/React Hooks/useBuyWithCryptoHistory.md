# useBuyWithCryptoHistory

*Source: [https://portal.thirdweb.com/references/typescript/v5/useBuyWithCryptoHistory](https://portal.thirdweb.com/references/typescript/v5/useBuyWithCryptoHistory)*

* References
* useBuyWithCryptoHistory

Hook to get the "Buy with crypto" transaction history for a given wallet address.

This hook is a React Query wrapper of thegetBuyWithCryptoHistoryfunction.
You can also use that function directly

`getBuyWithCryptoHistory`
## Example

`import{ useBuyWithCryptoHistory }from"thirdweb/react";functionComponent() {constbuyWithCryptoHistory=useBuyWithCryptoHistory(params);return<div> ... </div>;}`
#### Signature

`functionuseBuyWithCryptoHistory(params?:BuyWithCryptoHistoryParams,queryParams?:BuyWithCryptoHistoryQueryOptions,):UseQueryResult<BuyWithCryptoHistoryData>;`
## Parameters

#### params

object of typeBuyWithCryptoHistoryParams

`BuyWithCryptoHistoryParams`
### Type

`letparams:{client:ThirdwebClient;count:number;start:number;walletAddress:string;};`
#### queryParams

options to configure the react query

### Type

`letqueryParams:BuyWithCryptoHistoryQueryOptions;`
## Returns

#### Return Type

`letreturnType:UseQueryResult<BuyWithCryptoHistoryData>;`A React Query object which contains the data of typeBuyWithCryptoHistoryData

`BuyWithCryptoHistoryData`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

