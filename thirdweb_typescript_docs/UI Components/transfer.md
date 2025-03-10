# transfer

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/transfer](https://portal.thirdweb.com/references/typescript/v5/farcaster/transfer)*

* References
* transfer

Prepares a transaction to call the "transfer" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ transfer }from"thirdweb/extensions/farcaster";consttransaction=transfer({contract,to:...,deadline:...,sig:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functiontransfer(options:BaseTransactionOptions<TransferParams|{asyncParams:()=>Promise<TransferParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "transfer" function.

### Type

`letoptions:BaseTransactionOptions<TransferParams|{asyncParams:()=>Promise<TransferParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

