# add

*Source: [https://portal.thirdweb.com/references/typescript/v5/thirdweb/add](https://portal.thirdweb.com/references/typescript/v5/thirdweb/add)*

* References
* add

Prepares a transaction to call the "add" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ add }from"thirdweb/extensions/thirdweb";consttransaction=add({contract,deployer:...,deployment:...,chainId:...,metadataUri:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionadd(options:BaseTransactionOptions<AddParams|{asyncParams:()=>Promise<AddParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "add" function.

### Type

`letoptions:BaseTransactionOptions<AddParams|{asyncParams:()=>Promise<AddParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

