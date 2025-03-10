# burnBatch

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc1155/burnBatch](https://portal.thirdweb.com/references/typescript/v5/erc1155/burnBatch)*

* References
* burnBatch

Prepares a transaction to call the "burnBatch" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ burnBatch }from"thirdweb/extensions/erc1155";consttransaction=burnBatch({contract,account:...,ids:...,values:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionburnBatch(options:BaseTransactionOptions<BurnBatchParams|{asyncParams:()=>Promise<BurnBatchParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "burnBatch" function.

### Type

`letoptions:BaseTransactionOptions<BurnBatchParams|{asyncParams:()=>Promise<BurnBatchParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

