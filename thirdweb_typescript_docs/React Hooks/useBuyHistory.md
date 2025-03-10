# useBuyHistory

*Source: [https://portal.thirdweb.com/references/typescript/v5/useBuyHistory](https://portal.thirdweb.com/references/typescript/v5/useBuyHistory)*

* References
* useBuyHistory

Hook to get the history of Buy transactions for a given wallet - This includes both "buy with crypto" and "buy with fiat" transactions.

This hook is a React Query wrapper of thegetBuyHistoryfunction.
You can also use that function directly

`getBuyHistory`
## Example

`import{ useBuyHistory }from"thirdweb/react";functionComponent() {constbuyHistoryQuery=useBuyHistory(params);return<div> ... </div>;}`
#### Signature

`functionuseBuyHistory(params?:BuyHistoryParams,queryParams?:BuyHistoryQueryOptions,):UseQueryResult<BuyHistoryData>;`
## Parameters

#### params

object of typeBuyHistoryParams

`BuyHistoryParams`
### Type

`letparams:{client:ThirdwebClient;count:number;start:number;walletAddress:string;};`
#### queryParams

options to configure the react query

### Type

`letqueryParams:BuyHistoryQueryOptions;`
## Returns

#### Return Type

`letreturnType:UseQueryResult<BuyHistoryData>;`A React Query object which contains the data of typeBuyHistoryData

`BuyHistoryData`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

