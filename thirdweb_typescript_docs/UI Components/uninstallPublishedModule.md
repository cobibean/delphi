# uninstallPublishedModule

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/uninstallPublishedModule](https://portal.thirdweb.com/references/typescript/v5/common/uninstallPublishedModule)*

* References
* uninstallPublishedModule

Uninstall a published module

## Example

`import{ uninstallPublishedModule }from"thirdweb/modules";consttransaction=uninstallPublishedModule({client,chain,contract,moduleName:"MyModule",publisherAddress:"0x...",});awaitsendTransaction({ transaction, account });`
#### Signature

`functionuninstallPublishedModule(options:UninstallPublishedModuleOptions,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for uninstalling a published module

### Type

`letoptions:{contract:ThirdwebContract;moduleData?:`0x${string}`;moduleName:string;publisherAddress?:string;version?:string;};`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction to send

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

