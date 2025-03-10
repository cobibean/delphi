# tryAggregate

*Source: [https://portal.thirdweb.com/references/typescript/v5/multicall3/tryAggregate](https://portal.thirdweb.com/references/typescript/v5/multicall3/tryAggregate)*

* References
* tryAggregate

Prepares a transaction to call the "tryAggregate" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ tryAggregate }from"thirdweb/extensions/multicall3";consttransaction=tryAggregate({contract,requireSuccess:...,calls:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functiontryAggregate(options:BaseTransactionOptions<|TryAggregateParams|{asyncParams:()=>Promise<TryAggregateParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "tryAggregate" function.

### Type

`letoptions:BaseTransactionOptions<|TryAggregateParams|{asyncParams:()=>Promise<TryAggregateParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

