# installModule

*Source: [https://portal.thirdweb.com/references/typescript/v5/modules/installModule](https://portal.thirdweb.com/references/typescript/v5/modules/installModule)*

* References
* installModule

Prepares a transaction to call the "installModule" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ installModule }from"thirdweb/extensions/modules";consttransaction=installModule({contract,moduleContract:...,data:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functioninstallModule(options:BaseTransactionOptions<|InstallModuleParams|{asyncParams:()=>Promise<InstallModuleParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "installModule" function.

### Type

`letoptions:BaseTransactionOptions<|InstallModuleParams|{asyncParams:()=>Promise<InstallModuleParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

