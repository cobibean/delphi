# safeTransferFrom

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc1155/safeTransferFrom](https://portal.thirdweb.com/references/typescript/v5/erc1155/safeTransferFrom)*

* References
* safeTransferFrom

Prepares a transaction to call the "safeTransferFrom" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ safeTransferFrom }from"thirdweb/extensions/erc1155";consttransaction=safeTransferFrom({contract,from:...,to:...,tokenId:...,value:...,data:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionsafeTransferFrom(options:BaseTransactionOptions<|SafeTransferFromParams|{asyncParams:()=>Promise<SafeTransferFromParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "safeTransferFrom" function.

### Type

`letoptions:BaseTransactionOptions<|SafeTransferFromParams|{asyncParams:()=>Promise<SafeTransferFromParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

