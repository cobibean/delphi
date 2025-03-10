# deployProxyByImplementation

*Source: [https://portal.thirdweb.com/references/typescript/v5/thirdweb/deployProxyByImplementation](https://portal.thirdweb.com/references/typescript/v5/thirdweb/deployProxyByImplementation)*

* References
* deployProxyByImplementation

Prepares a transaction to call the "deployProxyByImplementation" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ deployProxyByImplementation }from"thirdweb/extensions/thirdweb";consttransaction=deployProxyByImplementation({contract,implementation:...,data:...,salt:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functiondeployProxyByImplementation(options:BaseTransactionOptions<|DeployProxyByImplementationParams|{asyncParams:()=>Promise<DeployProxyByImplementationParams>;}>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "deployProxyByImplementation" function.

### Type

`letoptions:BaseTransactionOptions<|DeployProxyByImplementationParams|{asyncParams:()=>Promise<DeployProxyByImplementationParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

