# blockAndAggregate

*Source: [https://portal.thirdweb.com/references/typescript/v5/multicall3/blockAndAggregate](https://portal.thirdweb.com/references/typescript/v5/multicall3/blockAndAggregate)*

* References
* blockAndAggregate

Prepares a transaction to call the "blockAndAggregate" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ blockAndAggregate }from"thirdweb/extensions/multicall3";consttransaction=blockAndAggregate({contract,calls:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionblockAndAggregate(options:BaseTransactionOptions<|BlockAndAggregateParams|{asyncParams:()=>Promise<BlockAndAggregateParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "blockAndAggregate" function.

### Type

`letoptions:BaseTransactionOptions<|BlockAndAggregateParams|{asyncParams:()=>Promise<BlockAndAggregateParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

