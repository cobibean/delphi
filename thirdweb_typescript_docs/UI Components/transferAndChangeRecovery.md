# transferAndChangeRecovery

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/transferAndChangeRecovery](https://portal.thirdweb.com/references/typescript/v5/farcaster/transferAndChangeRecovery)*

* References
* transferAndChangeRecovery

Prepares a transaction to call the "transferAndChangeRecovery" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ transferAndChangeRecovery }from"thirdweb/extensions/farcaster";consttransaction=transferAndChangeRecovery({contract,to:...,recovery:...,deadline:...,sig:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functiontransferAndChangeRecovery(options:BaseTransactionOptions<|TransferAndChangeRecoveryParams|{asyncParams:()=>Promise<TransferAndChangeRecoveryParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "transferAndChangeRecovery" function.

### Type

`letoptions:BaseTransactionOptions<|TransferAndChangeRecoveryParams|{asyncParams:()=>Promise<TransferAndChangeRecoveryParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

