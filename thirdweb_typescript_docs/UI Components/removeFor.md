# removeFor

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/removeFor](https://portal.thirdweb.com/references/typescript/v5/farcaster/removeFor)*

* References
* removeFor

Prepares a transaction to call the "removeFor" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ removeFor }from"thirdweb/extensions/farcaster";consttransaction=removeFor({contract,fidOwner:...,key:...,deadline:...,sig:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionremoveFor(options:BaseTransactionOptions<RemoveForParams|{asyncParams:()=>Promise<RemoveForParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "removeFor" function.

### Type

`letoptions:BaseTransactionOptions<RemoveForParams|{asyncParams:()=>Promise<RemoveForParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

