# setVotingDelay

*Source: [https://portal.thirdweb.com/references/typescript/v5/vote/setVotingDelay](https://portal.thirdweb.com/references/typescript/v5/vote/setVotingDelay)*

* References
* setVotingDelay

Prepares a transaction to call the "setVotingDelay" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ setVotingDelay }from"thirdweb/extensions/vote";consttransaction=setVotingDelay({contract,newVotingDelay:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionsetVotingDelay(options:BaseTransactionOptions<|SetVotingDelayParams|{asyncParams:()=>Promise<SetVotingDelayParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "setVotingDelay" function.

### Type

`letoptions:BaseTransactionOptions<|SetVotingDelayParams|{asyncParams:()=>Promise<SetVotingDelayParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

