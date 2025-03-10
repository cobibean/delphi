# transferOwnership

*Source: [https://portal.thirdweb.com/references/typescript/v5/modules/transferOwnership](https://portal.thirdweb.com/references/typescript/v5/modules/transferOwnership)*

* References
* transferOwnership

Prepares a transaction to call the "transferOwnership" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ transferOwnership }from"thirdweb/extensions/modules";consttransaction=transferOwnership({contract,newOwner:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functiontransferOwnership(options:BaseTransactionOptions<|TransferOwnershipParams|{asyncParams:()=>Promise<TransferOwnershipParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "transferOwnership" function.

### Type

`letoptions:BaseTransactionOptions<|TransferOwnershipParams|{asyncParams:()=>Promise<TransferOwnershipParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

