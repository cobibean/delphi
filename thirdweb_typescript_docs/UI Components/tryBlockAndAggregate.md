# tryBlockAndAggregate

*Source: [https://portal.thirdweb.com/references/typescript/v5/multicall3/tryBlockAndAggregate](https://portal.thirdweb.com/references/typescript/v5/multicall3/tryBlockAndAggregate)*

* References
* tryBlockAndAggregate

Prepares a transaction to call the "tryBlockAndAggregate" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ tryBlockAndAggregate }from"thirdweb/extensions/multicall3";consttransaction=tryBlockAndAggregate({contract,requireSuccess:...,calls:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functiontryBlockAndAggregate(options:BaseTransactionOptions<|TryBlockAndAggregateParams|{asyncParams:()=>Promise<TryBlockAndAggregateParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "tryBlockAndAggregate" function.

### Type

`letoptions:BaseTransactionOptions<|TryBlockAndAggregateParams|{asyncParams:()=>Promise<TryBlockAndAggregateParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

