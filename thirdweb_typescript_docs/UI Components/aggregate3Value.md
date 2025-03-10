# aggregate3Value

*Source: [https://portal.thirdweb.com/references/typescript/v5/multicall3/aggregate3Value](https://portal.thirdweb.com/references/typescript/v5/multicall3/aggregate3Value)*

* References
* aggregate3Value

Prepares a transaction to call the "aggregate3Value" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ aggregate3Value }from"thirdweb/extensions/multicall3";consttransaction=aggregate3Value({contract,calls:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionaggregate3Value(options:BaseTransactionOptions<|Aggregate3ValueParams|{asyncParams:()=>Promise<Aggregate3ValueParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "aggregate3Value" function.

### Type

`letoptions:BaseTransactionOptions<|Aggregate3ValueParams|{asyncParams:()=>Promise<Aggregate3ValueParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

