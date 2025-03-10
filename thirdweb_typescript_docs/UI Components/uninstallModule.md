# uninstallModule

*Source: [https://portal.thirdweb.com/references/typescript/v5/modules/uninstallModule](https://portal.thirdweb.com/references/typescript/v5/modules/uninstallModule)*

* References
* uninstallModule

Prepares a transaction to call the "uninstallModule" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ uninstallModule }from"thirdweb/extensions/modules";consttransaction=uninstallModule({contract,moduleContract:...,data:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionuninstallModule(options:BaseTransactionOptions<|UninstallModuleParams|{asyncParams:()=>Promise<UninstallModuleParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "uninstallModule" function.

### Type

`letoptions:BaseTransactionOptions<|UninstallModuleParams|{asyncParams:()=>Promise<UninstallModuleParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

