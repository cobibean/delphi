# castVoteWithReasonAndParamsBySig

*Source: [https://portal.thirdweb.com/references/typescript/v5/vote/castVoteWithReasonAndParamsBySig](https://portal.thirdweb.com/references/typescript/v5/vote/castVoteWithReasonAndParamsBySig)*

* References
* castVoteWithReasonAndParamsBySig

Prepares a transaction to call the "castVoteWithReasonAndParamsBySig" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ castVoteWithReasonAndParamsBySig }from"thirdweb/extensions/vote";consttransaction=castVoteWithReasonAndParamsBySig({contract,proposalId:...,support:...,reason:...,params:...,v:...,r:...,s:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functioncastVoteWithReasonAndParamsBySig(options:BaseTransactionOptions<|CastVoteWithReasonAndParamsBySigParams|{asyncParams:()=>Promise<CastVoteWithReasonAndParamsBySigParams>;}>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "castVoteWithReasonAndParamsBySig" function.

### Type

`letoptions:BaseTransactionOptions<|CastVoteWithReasonAndParamsBySigParams|{asyncParams:()=>Promise<CastVoteWithReasonAndParamsBySigParams>;}>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

