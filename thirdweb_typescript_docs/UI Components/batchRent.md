# batchRent

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/batchRent](https://portal.thirdweb.com/references/typescript/v5/farcaster/batchRent)*

* References
* batchRent

Prepares a transaction to call the "batchRent" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ batchRent }from"thirdweb/extensions/farcaster";consttransaction=batchRent({contract,fids:...,units:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionbatchRent(options:BaseTransactionOptions<BatchRentParams|{asyncParams:()=>Promise<BatchRentParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "batchRent" function.

### Type

`letoptions:BaseTransactionOptions<BatchRentParams|{asyncParams:()=>Promise<BatchRentParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

