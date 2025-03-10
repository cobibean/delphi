# remove

*Source: [https://portal.thirdweb.com/references/typescript/v5/thirdweb/remove](https://portal.thirdweb.com/references/typescript/v5/thirdweb/remove)*

* References
* remove

Prepares a transaction to call the "remove" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ remove }from"thirdweb/extensions/thirdweb";consttransaction=remove({contract,deployer:...,deployment:...,chainId:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionremove(options:BaseTransactionOptions<RemoveParams|{asyncParams:()=>Promise<RemoveParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "remove" function.

### Type

`letoptions:BaseTransactionOptions<RemoveParams|{asyncParams:()=>Promise<RemoveParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

