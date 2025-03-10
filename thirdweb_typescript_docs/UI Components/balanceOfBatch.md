# balanceOfBatch

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc1155/balanceOfBatch](https://portal.thirdweb.com/references/typescript/v5/erc1155/balanceOfBatch)*

* References
* balanceOfBatch

Calls the "balanceOfBatch" function on the contract.

## Example

`import{ balanceOfBatch }from"thirdweb/extensions/erc1155";constresult=awaitbalanceOfBatch({contract,owners:...,tokenIds:...,});`
#### Signature

`functionbalanceOfBatch(options:BaseTransactionOptions<BalanceOfBatchParams>):Promise<readonlyArray<bigint>>`
## Parameters

#### options

The options for the balanceOfBatch function.

### Type

`letoptions:BaseTransactionOptions<BalanceOfBatchParams>;`
## Returns

#### Return Type

`letreturnType:Promise<readonlyArray<bigint>>`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

