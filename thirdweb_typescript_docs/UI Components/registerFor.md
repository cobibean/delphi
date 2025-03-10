# registerFor

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/registerFor](https://portal.thirdweb.com/references/typescript/v5/farcaster/registerFor)*

* References
* registerFor

Prepares a transaction to call the "registerFor" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ registerFor }from"thirdweb/extensions/farcaster";consttransaction=registerFor({contract,to:...,recovery:...,deadline:...,sig:...,extraStorage:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionregisterFor(options:BaseTransactionOptions<|RegisterForParams|{asyncParams:()=>Promise<RegisterForParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "registerFor" function.

### Type

`letoptions:BaseTransactionOptions<|RegisterForParams|{asyncParams:()=>Promise<RegisterForParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

