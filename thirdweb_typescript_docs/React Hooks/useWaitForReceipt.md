# useWaitForReceipt

*Source: [https://portal.thirdweb.com/references/typescript/v5/useWaitForReceipt](https://portal.thirdweb.com/references/typescript/v5/useWaitForReceipt)*

* References
* useWaitForReceipt

A hook to wait for a transaction receipt.

## Example

`import{ useWaitForReceipt }from"thirdweb/react";const{data:receipt,isLoading}=useWaitForReceipt({client,chain,transactionHash,});`
#### Signature

`functionuseWaitForReceipt(options:|undefined|{chain:Readonly;client:ThirdwebClient;maxBlocksWaitTime?:number;readonlytransactionHash:`0x${string}`;},):UseQueryResult<TransactionReceipt>;`
## Parameters

#### options

The options for waiting for a transaction receipt.

### Type

`letoptions:|undefined|{chain:Readonly;client:ThirdwebClient;maxBlocksWaitTime?:number;readonlytransactionHash:`0x${string}`;};`
## Returns

#### Return Type

`letreturnType:UseQueryResult<TransactionReceipt>;`a query object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

