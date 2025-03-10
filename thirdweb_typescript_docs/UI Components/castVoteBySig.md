# castVoteBySig

*Source: [https://portal.thirdweb.com/references/typescript/v5/vote/castVoteBySig](https://portal.thirdweb.com/references/typescript/v5/vote/castVoteBySig)*

* References
* castVoteBySig

Prepares a transaction to call the "castVoteBySig" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ castVoteBySig }from"thirdweb/extensions/vote";consttransaction=castVoteBySig({contract,proposalId:...,support:...,v:...,r:...,s:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functioncastVoteBySig(options:BaseTransactionOptions<|CastVoteBySigParams|{asyncParams:()=>Promise<CastVoteBySigParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "castVoteBySig" function.

### Type

`letoptions:BaseTransactionOptions<|CastVoteBySigParams|{asyncParams:()=>Promise<CastVoteBySigParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

