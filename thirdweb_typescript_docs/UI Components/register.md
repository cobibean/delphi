# register

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/register-2](https://portal.thirdweb.com/references/typescript/v5/farcaster/register-2)*

* References
* register

Prepares a transaction to call the "register" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ register }from"thirdweb/extensions/farcaster";consttransaction=register({contract,recovery:...,extraStorage:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionregister(options:BaseTransactionOptions<RegisterParams|{asyncParams:()=>Promise<RegisterParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "register" function.

### Type

`letoptions:BaseTransactionOptions<RegisterParams|{asyncParams:()=>Promise<RegisterParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

