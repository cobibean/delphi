# useWalletBalance

*Source: [https://portal.thirdweb.com/references/typescript/v5/useWalletBalance](https://portal.thirdweb.com/references/typescript/v5/useWalletBalance)*

* References
* useWalletBalance

Fetch the balance of a wallet in native currency or for a specific token.
LeavetokenAddressundefined to fetch the native token balance.

`tokenAddress`
## Example

### Fetching the native token balance

`import{ useWalletBalance }from"thirdweb/react";const{data,isLoading,isError}=useWalletBalance({chain,address,client,});console.log("balance", data?.displayValue, data?.symbol);`
### Fetching a specific token balance

`import{ useWalletBalance }from"thirdweb/react";consttokenAddress="0x...";// the ERC20 token addressconst{data,isLoading,isError}=useWalletBalance({chain,address,client,tokenAddress,});console.log("balance", data?.displayValue, data?.symbol);`
#### Signature

`functionuseWalletBalance(options:{address:undefined|string;chain:undefined|Readonly<ChainOptions&{rpc:string}>;client:ThirdwebClient;tokenAddress?:string;},queryOptions?:UseWalletBalanceQueryOptions,):UseQueryResult<GetWalletBalanceResult>;`
## Parameters

#### options

GetWalletBalanceOptions - The options for fetching the wallet balance.

### Type

`letoptions:{address:undefined|string;chain:undefined|Readonly<ChainOptions&{rpc:string}>;client:ThirdwebClient;tokenAddress?:string;};`
#### queryOptions

### Type

`letqueryOptions:UseWalletBalanceQueryOptions;`
## Returns

#### Return Type

`letreturnType:UseQueryResult<GetWalletBalanceResult>;`GetWalletBalanceResult The result of the query.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

