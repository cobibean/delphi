# castVote

*Source: [https://portal.thirdweb.com/references/typescript/v5/vote/castVote](https://portal.thirdweb.com/references/typescript/v5/vote/castVote)*

* References
* castVote

Prepares a transaction to call the "castVote" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ castVote }from"thirdweb/extensions/vote";consttransaction=castVote({contract,proposalId:...,support:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functioncastVote(options:BaseTransactionOptions<CastVoteParams|{asyncParams:()=>Promise<CastVoteParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "castVote" function.

### Type

`letoptions:BaseTransactionOptions<CastVoteParams|{asyncParams:()=>Promise<CastVoteParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

