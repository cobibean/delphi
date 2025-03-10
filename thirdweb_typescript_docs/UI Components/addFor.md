# addFor

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/addFor](https://portal.thirdweb.com/references/typescript/v5/farcaster/addFor)*

* References
* addFor

Prepares a transaction to call the "addFor" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ addFor }from"thirdweb/extensions/farcaster";consttransaction=addFor({contract,fidOwner:...,keyType:...,key:...,metadataType:...,metadata:...,deadline:...,sig:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionaddFor(options:BaseTransactionOptions<AddForParams|{asyncParams:()=>Promise<AddForParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "addFor" function.

### Type

`letoptions:BaseTransactionOptions<AddForParams|{asyncParams:()=>Promise<AddForParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

