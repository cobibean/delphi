# rent

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/rent](https://portal.thirdweb.com/references/typescript/v5/farcaster/rent)*

* References
* rent

Prepares a transaction to call the "rent" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ rent }from"thirdweb/extensions/farcaster";consttransaction=rent({contract,fid:...,units:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionrent(options:BaseTransactionOptions<RentParams|{asyncParams:()=>Promise<RentParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "rent" function.

### Type

`letoptions:BaseTransactionOptions<RentParams|{asyncParams:()=>Promise<RentParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

