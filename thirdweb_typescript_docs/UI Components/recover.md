# recover

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/recover](https://portal.thirdweb.com/references/typescript/v5/farcaster/recover)*

* References
* recover

Prepares a transaction to call the "recover" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ recover }from"thirdweb/extensions/farcaster";consttransaction=recover({contract,from:...,to:...,deadline:...,sig:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionrecover(options:BaseTransactionOptions<RecoverParams|{asyncParams:()=>Promise<RecoverParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "recover" function.

### Type

`letoptions:BaseTransactionOptions<RecoverParams|{asyncParams:()=>Promise<RecoverParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

