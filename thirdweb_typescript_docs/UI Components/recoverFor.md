# recoverFor

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/recoverFor](https://portal.thirdweb.com/references/typescript/v5/farcaster/recoverFor)*

* References
* recoverFor

Prepares a transaction to call the "recoverFor" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ recoverFor }from"thirdweb/extensions/farcaster";consttransaction=recoverFor({contract,from:...,to:...,recoveryDeadline:...,recoverySig:...,toDeadline:...,toSig:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionrecoverFor(options:BaseTransactionOptions<|RecoverForParams|{asyncParams:()=>Promise<RecoverForParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "recoverFor" function.

### Type

`letoptions:BaseTransactionOptions<RecoverForParams|{asyncParams:()=>Promise<RecoverForParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

