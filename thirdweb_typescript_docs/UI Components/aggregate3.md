# aggregate3

*Source: [https://portal.thirdweb.com/references/typescript/v5/multicall3/aggregate3](https://portal.thirdweb.com/references/typescript/v5/multicall3/aggregate3)*

* References
* aggregate3

Prepares a transaction to call the "aggregate3" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ aggregate3 }from"thirdweb/extensions/multicall3";consttransaction=aggregate3({contract,calls:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionaggregate3(options:BaseTransactionOptions<|Aggregate3Params|{asyncParams:()=>Promise<Aggregate3Params> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "aggregate3" function.

### Type

`letoptions:BaseTransactionOptions<Aggregate3Params|{asyncParams:()=>Promise<Aggregate3Params> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

