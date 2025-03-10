# setContractURI

*Source: [https://portal.thirdweb.com/references/typescript/v5/common/setContractURI](https://portal.thirdweb.com/references/typescript/v5/common/setContractURI)*

* References
* setContractURI

Prepares a transaction to call the "setContractURI" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ setContractURI }from"thirdweb/extensions/common";consttransaction=setContractURI({contract,uri:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionsetContractURI(options:BaseTransactionOptions<|SetContractURIParams|{asyncParams:()=>Promise<SetContractURIParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "setContractURI" function.

### Type

`letoptions:BaseTransactionOptions<|SetContractURIParams|{asyncParams:()=>Promise<SetContractURIParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

