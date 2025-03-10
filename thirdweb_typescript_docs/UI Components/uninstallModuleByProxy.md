# uninstallModuleByProxy

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/uninstallModuleByProxy](https://portal.thirdweb.com/references/typescript/v5/common/uninstallModuleByProxy)*

* References
* uninstallModuleByProxy

Uninstall an module by proxy

## Example

`import{ uninstallModuleByProxy }from"thirdweb/modules";consttransaction=uninstallModuleByProxy({client,chain,contract,moduleProxyAddress:"0x...",});awaitsendTransaction({ transaction, account });`
#### Signature

`functionuninstallModuleByProxy(options:UninstallModuleByProxyOptions,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for uninstalling an module by proxy

### Type

`letoptions:{chain:Chain;client:ThirdwebClient;contract:ThirdwebContract;moduleData?:`0x${string}`;moduleProxyAddress:string;};`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction to send

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

