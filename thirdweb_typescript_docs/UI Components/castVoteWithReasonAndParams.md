# castVoteWithReasonAndParams

*Source: [https://portal.thirdweb.com/references/typescript/v5/vote/castVoteWithReasonAndParams](https://portal.thirdweb.com/references/typescript/v5/vote/castVoteWithReasonAndParams)*

* References
* castVoteWithReasonAndParams

Prepares a transaction to call the "castVoteWithReasonAndParams" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ castVoteWithReasonAndParams }from"thirdweb/extensions/vote";consttransaction=castVoteWithReasonAndParams({contract,proposalId:...,support:...,reason:...,params:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functioncastVoteWithReasonAndParams(options:BaseTransactionOptions<|CastVoteWithReasonAndParamsParams|{asyncParams:()=>Promise<CastVoteWithReasonAndParamsParams>;}>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "castVoteWithReasonAndParams" function.

### Type

`letoptions:BaseTransactionOptions<|CastVoteWithReasonAndParamsParams|{asyncParams:()=>Promise<CastVoteWithReasonAndParamsParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

