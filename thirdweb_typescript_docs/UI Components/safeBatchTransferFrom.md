# safeBatchTransferFrom

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc1155/safeBatchTransferFrom](https://portal.thirdweb.com/references/typescript/v5/erc1155/safeBatchTransferFrom)*

* References
* safeBatchTransferFrom

Prepares a transaction to call the "safeBatchTransferFrom" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ safeBatchTransferFrom }from"thirdweb/extensions/erc1155";consttransaction=safeBatchTransferFrom({contract,from:...,to:...,tokenIds:...,values:...,data:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionsafeBatchTransferFrom(options:BaseTransactionOptions<|SafeBatchTransferFromParams|{asyncParams:()=>Promise<SafeBatchTransferFromParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "safeBatchTransferFrom" function.

### Type

`letoptions:BaseTransactionOptions<|SafeBatchTransferFromParams|{asyncParams:()=>Promise<SafeBatchTransferFromParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

