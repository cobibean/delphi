# aggregate

*Source: [https://portal.thirdweb.com/references/typescript/v5/multicall3/aggregate](https://portal.thirdweb.com/references/typescript/v5/multicall3/aggregate)*

* References
* aggregate

Prepares a transaction to call the "aggregate" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ aggregate }from"thirdweb/extensions/multicall3";consttransaction=aggregate({contract,calls:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionaggregate(options:BaseTransactionOptions<AggregateParams|{asyncParams:()=>Promise<AggregateParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "aggregate" function.

### Type

`letoptions:BaseTransactionOptions<AggregateParams|{asyncParams:()=>Promise<AggregateParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

