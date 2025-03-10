# castVoteWithReason

*Source: [https://portal.thirdweb.com/references/typescript/v5/vote/castVoteWithReason](https://portal.thirdweb.com/references/typescript/v5/vote/castVoteWithReason)*

* References
* castVoteWithReason

Prepares a transaction to call the "castVoteWithReason" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ castVoteWithReason }from"thirdweb/extensions/vote";consttransaction=castVoteWithReason({contract,proposalId:...,support:...,reason:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functioncastVoteWithReason(options:BaseTransactionOptions<|CastVoteWithReasonParams|{asyncParams:()=>Promise<CastVoteWithReasonParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "castVoteWithReason" function.

### Type

`letoptions:BaseTransactionOptions<|CastVoteWithReasonParams|{asyncParams:()=>Promise<CastVoteWithReasonParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

