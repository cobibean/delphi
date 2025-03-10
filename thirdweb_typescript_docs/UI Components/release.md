# release

*Source: [https://portal.thirdweb.com/references/typescript/v5/split/release](https://portal.thirdweb.com/references/typescript/v5/split/release)*

* References
* release

Prepares a transaction to call the "release" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ release }from"thirdweb/extensions/split";consttransaction=release({contract,account:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionrelease(options:BaseTransactionOptions<ReleaseParams|{asyncParams:()=>Promise<ReleaseParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "release" function.

### Type

`letoptions:BaseTransactionOptions<ReleaseParams|{asyncParams:()=>Promise<ReleaseParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

