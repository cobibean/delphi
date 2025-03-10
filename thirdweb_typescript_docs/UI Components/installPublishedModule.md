# installPublishedModule

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/installPublishedModule](https://portal.thirdweb.com/references/typescript/v5/common/installPublishedModule)*

* References
* installPublishedModule

Install a published module on a modular contract

## Example

`import{ installPublishedModule }from"thirdweb/modules";consttransaction=installPublishedModule({client,chain,account,contract,moduleName:"MyModule",publisherAddress:"0x...",});awaitsendTransaction({ transaction, account });`
#### Signature

`functioninstallPublishedModule(options:InstallPublishedModuleOptions,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for installing a published module

### Type

`letoptions:{account:Account;constructorParams?:Record<string,unknown>;contract:ThirdwebContract;moduleData?:`0x${string}`;moduleName:string;nonce?:number;publisher?:string;version?:string;};`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction to send

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

